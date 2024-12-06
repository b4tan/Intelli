import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import './rubric.css'; 

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
      { type: 'mcq', question: '', rubric: '', sampleAnswer: '', points: '' },
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
    // setMsg(generatedFile);
  };

  // const saveAsDocx = async (response) => {
  //   const doc = new Document({
  //     sections: [
  //       {
  //         children: [
  //           new Paragraph({
  //             children: [
  //               new TextRun(response),
  //             ],
  //           }),
  //         ],
  //       },
  //     ],
  //   });
  //   const blob = await Packer.toBlob(doc);
  //   const link = document.createElement('a');
  //   link.href = URL.createObjectURL(blob);
  //   link.download = 'GPT_Response.docx';
  //   link.click();
  // };

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
      setGradingData(response.data);
      console.log('Response from server:', response.data);
    } catch (error) {
      setMsg('Error during submission. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-5">
      <div className="fixed inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#3070b0]/30 to-transparent z-0 pointer-events-none"></div>

      <div className="mt-16 bg-[#FAF9F6] shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create and Submit Grading Guideline
        </h1>

        {/* Question Input Section */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <label className="block text-gray-700 font-semibold">Question Type:</label>
              <select
                value={question.type}
                onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="mcq">Multiple Choice</option>
                <option value="truefalse">True/False</option>
                <option value="short">Short Answer</option>
              </select>

              <label className="block text-gray-700 font-semibold">Question:</label>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              />

              <label className="block text-gray-700 font-semibold">Rubric:</label>
              <input
                type="text"
                value={question.rubric}
                onChange={(e) => handleQuestionChange(index, 'rubric', e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              />

              <label className="block text-gray-700 font-semibold">Sample Answer:</label>
              <input
                type="text"
                value={question.sampleAnswer}
                onChange={(e) => handleQuestionChange(index, 'sampleAnswer', e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              />

              <label className="block text-gray-700 font-semibold">Points:</label>
              <input
                type="number"
                value={question.points}
                onChange={(e) => handleQuestionChange(index, 'points', e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2"
              />

              <button
                onClick={() => removeQuestion(index)}
                className="px-4 py-2 rounded-lg border bg-[#FF6057] text-[#FAF9F6] hover:bg-[#FF8986] hover:text-[#FAF9F6] font-medium"
              >
                Remove Question
              </button>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={addQuestion}
            className="px-6 py-3 rounded-lg border bg-[#25897a] text-[#FAF9F6] hover:bg-[#6BB1A6] hover:text-[#FAF9F6] font-medium"
          >
            Add Question
          </button>
        </div>

        {/* File Upload */}
        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-2">Upload Student Submission:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-[35%] py-3 rounded-lg border bg-[#25897a] text-[#FAF9F6] hover:bg-[#6BB1A6] hover:text-[#FAF9F6] font-medium"
          >
            Submit for Grading
          </button>
        </div>

        {/* Status Message */}
        {msg && (
          <p className="mt-4 text-center text-gray-700 font-medium">
            {msg}
          </p>
        )}
      </div>


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
                {editedData.csvData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{row.question}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    value={row.grade}
                                    onChange={(e) =>
                                        handleEditChange(index, 'grade', e.target.value)
                                    }
                                    className="w-16 border border-gray-300 rounded-md p-1"
                                />
                            </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                            <textarea
                                value={row.reason}
                                onChange={(e) =>
                                    handleEditChange(index, 'reason', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </td>
                    </tr>
                ))}
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

  );
}

export default Rubric;
