import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun } from 'docx';

function Rubric() {
  const [file, setFile] = useState(null); // Student submission file
  const [questions, setQuestions] = useState([]); // Rubric questions
  const [generatedFile, setGeneratedFile] = useState(null); // Generated rubric file
  const [msg, setMsg] = useState(null);
  const [gradingData, setGradingData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [downloadGeneratedFile, setDownloadGeneratedFile] = useState(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: '', question: '', rubric: '', sampleAnswer: '', points: '' },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Handle question changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  // Handle student file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEditChange = (index, field, value) => {
        const updatedData = [...editedData.csvData];
        updatedData[index][field] = field === 'grade' ? parseFloat(value) || 0 : value;
        const updatedOverallGrade = updatedData.reduce((sum, item) => sum + (parseFloat(item.grade) || 0), 0);
        setEditedData({ ...editedData, csvData: updatedData, overallGrade: updatedOverallGrade });
  };

  // Generate rubric file (.docx)
  const generateDocxFile = async () => {
    if (questions.length === 0) {
      setMsg('Please add at least one question to generate the rubric.');
      return;
    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Rubric Questions', bold: true, size: 28 }),
              ],
            }),
            ...questions.map((q, i) => [
              new Paragraph({ text: `Question ${i + 1}:`, bold: true }),
              new Paragraph({ text: `Type: ${q.type}` }),
              new Paragraph({ text: `Question: ${q.question}` }),
              new Paragraph({ text: `Rubric: ${q.rubric}` }),
              new Paragraph({ text: `Sample Answer: ${q.sampleAnswer}` }),
              new Paragraph({ text: `Points: ${q.points}` }),
            ]).flat(),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const fileURL = URL.createObjectURL(blob);
    const file = new File([blob], 'rubric.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    setGeneratedFile(file); // Save generated file
    setDownloadGeneratedFile(fileURL);
    setMsg('Rubric file generated successfully! Now Grading.....');
  };
  const saveAsDocx = async (data) => {
    const tableData = data.csvData.map(row => {
        return `Question: ${row.question}, Grade: ${row.grade}, Reason: ${row.reason}`;
    }).join('\n\n');

    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        children: [
                            new TextRun(tableData),
                        ],
                    }),
                ],
            },
        ],
    });
    const blob = await Packer.toBlob(doc);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'GPT_Response.docx';
    link.click();
};

  // Submit rubric and student answer to backend
  const handleSubmit = async () => {
    generateDocxFile();
    if (!file || !generatedFile) {
      setMsg('Please upload the student submission and generate the rubric.');
      return;
    }

    setMsg('Uploading and processing...');

    const formData = new FormData();
    formData.append('rubric', generatedFile); // Generated rubric file
    formData.append('submission', file); // Student submission file

    try {
      const response = await axios.post('http://localhost:4000/grade', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMsg('Grading complete!');
      const initialOverallGrade = response.data.csvData.reduce((sum, item) => sum + parseFloat(item.grade || 0), 0);
      setGradingData({ ...response.data, overallGrade: initialOverallGrade });
      setEditedData({ ...response.data, overallGrade: initialOverallGrade });
      console.log('Response from server:', response.data);
    } catch (error) {
      setMsg('Error during submission. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-5">
            <div className="fixed inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#3070b0]/30 to-transparent z-0 pointer-events-none"></div>
        <div className="rubric-container text-gray-800 min-h-screen flex flex-col items-center py-10 px-5 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Create and Submit Rubric
      </h1>
          {/* Question Input Section */}
          <div className="questions-container w-full max-w-3xl">
            {questions.map((question, index) => (
              <div key={index} className="question-row border-b pb-4 mb-4">
                <label className="block font-semibold mb-2 text-white">Question Type:</label>
                <select
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionChange(index, 'type', e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 mb-4"
                >
                  <option value="">Select Question Type</option>
                  <option value="mcq">Multiple Choice</option>
                  <option value="truefalse">True/False</option>
                  <option value="short">Short Answer</option>
                </select>

                <label className="block font-semibold mb-2 text-white">Question:</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(index, 'question', e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 mb-4"
                />

                <label className="block font-semibold mb-2 text-white">Rubric:</label>
                <input
                  type="text"
                  value={question.rubric}
                  onChange={(e) =>
                    handleQuestionChange(index, 'rubric', e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 mb-4"
                />

                <label className="block font-semibold mb-2 text-white">Sample Answer:</label>
                <input
                  type="text"
                  value={question.sampleAnswer}
                  onChange={(e) =>
                    handleQuestionChange(index, 'sampleAnswer', e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 mb-4"
                />

                <label className="block font-semibold mb-2 text-white"> Points:</label>
                <input
                  type="number"
                  value={question.points}
                  onChange={(e) =>
                    handleQuestionChange(index, 'points', e.target.value)
                  }
                  className="w-full border rounded px-2 py-1 mb-4"
                />

                <button
                  onClick={() => removeQuestion(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove Question
                </button>
              </div>
            ))}
          </div>

          {/* Add Question Button */}
          <button
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mb-6"
          >
            Add Question
          </button>

          {/* Generate Rubric File */}
          {/* <button
            onClick={generateDocxFile}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded mb-6"
          >
            Generate Rubric File
          </button> */}

          {/* Upload Student Answer */}
          <div className="upload-section w-full max-w-3xl">
            <label className="block font-semibold mb-2 text-white">Upload Student Submission:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded mt-6"
          >
            Submit for Grading
          </button>

          {/* Status Message */}
          {msg && <p className="mt-4 text-center text-gray-700 text-white">{msg}</p>}
          
          {editedData && (
                    <div className="bg-white shadow-md rounded-lg p-8 mt-10 w-full max-w-4xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Overall Grade: {editedData.overallGrade}
                        </h2>
                        <table className="w-full text-left border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Question</th>
                                    <th className="border border-gray-300 px-4 py-2">Grade</th>
                                    <th className="border border-gray-300 px-4 py-2">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {editedData.csvData.map((row, index) => {
                                    // Ensure the grade is always treated as a string
                                    const grade = typeof row.grade === "string" ? row.grade : `${row.grade}/5`; // Default to 5 as denominator
                                    const [numerator, denominator] = grade.split("/");

                                    return (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">
                                                {row.question}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex items-center">
                                                    <input
                                                        type="number"
                                                        value={numerator} // Editable numerator
                                                        onChange={(e) =>
                                                            handleEditChange(
                                                                index,
                                                                "grade",
                                                                `${e.target.value}/${denominator}`
                                                            )
                                                        }
                                                        className="w-16 border border-gray-300 rounded-md p-1 mr-1"
                                                    />
                                                    <span>/ {denominator}</span> {/* Static denominator */}
                                                </div>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <textarea
                                                    value={row.reason}
                                                    onChange={(e) =>
                                                        handleEditChange(index, "reason", e.target.value)
                                                    }
                                                    className="w-full border border-gray-300 rounded-md p-2"
                                                    rows={Math.max(2, Math.ceil(row.reason.length / 60))} // Dynamic row size
                                                    style={{ resize: "none" }} // Prevent manual resizing
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => saveAsDocx(editedData || gradingData)}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
                            >
                                Download Full Response
                            </button>
                        </div>
                    </div>
                )}
                {/* Download Rubric */}
          {gradingData?.gptResponse && (

    <a
      href={downloadGeneratedFile}
      download="rubric.docx"
      className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
    >
      Download Rubric
    </a>

    )}
            </div>

            </div>
    
    
    
  );
}

export default Rubric;
