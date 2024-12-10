import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun } from 'docx';

function Rubric() {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [generatedFile, setGeneratedFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [gradingData, setGradingData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [downloadGeneratedFile, setDownloadGeneratedFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: '', question: '', rubric: '', sampleAnswer: '', points: '' },
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEditChange = (index, field, value) => {
    const updatedData = [...editedData.csvData];
    updatedData[index][field] = field === 'grade' ? parseFloat(value) || 0 : value;
    const updatedOverallGrade = updatedData.reduce(
      (sum, item) => sum + (parseFloat(item.grade) || 0),
      0
    );
    setEditedData({ ...editedData, csvData: updatedData, overallGrade: updatedOverallGrade });
  };

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

    setGeneratedFile(file);
    setDownloadGeneratedFile(fileURL);
    setMsg('Rubric file generated successfully! Now Grading...');
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

  const handleSubmit = async () => {
    generateDocxFile();
    if (!file || !generatedFile) {
      setMsg('Please upload the student submission and generate the rubric.');
      return;
    }

    setMsg('Uploading and processing...');
    const formData = new FormData();
    formData.append('rubric', generatedFile);
    formData.append('submission', file);

    try {
      const response = await axios.post('http://localhost:4000/grade', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.csvData) {
        const csvDataWithGrades = response.data.csvData.map((item) => ({
          question: item.question || '',
          grade: item.grade || 0,
          reason: item.reason || '',
        }));

        const initialOverallGrade = csvDataWithGrades.reduce(
          (sum, item) => sum + parseFloat(item.grade || 0),
          0
        );

        setGradingData({ ...response.data, csvData: csvDataWithGrades, overallGrade: initialOverallGrade });
        setEditedData({ csvData: csvDataWithGrades, overallGrade: initialOverallGrade });
        setMsg('Grading complete!');
      } else {
        setMsg('Error: No grading data received from the server.');
      }
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
          Create and Submit Rubric
        </h1>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="question-row border-b pb-4 mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Question Type</label>
              <select
                value={question.type}
                onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                className="w-full border rounded-md p-2 mb-4"
              >
                <option value="">Select Question Type</option>
                <option value="mcq">Multiple Choice</option>
                <option value="truefalse">True/False</option>
                <option value="short">Short Answer</option>
              </select>

              <label className="block text-gray-700 font-semibold mb-2">Question</label>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                className="w-full border rounded-md p-2 mb-4"
              />

              <label className="block text-gray-700 font-semibold mb-2">Rubric</label>
              <input
                type="text"
                value={question.rubric}
                onChange={(e) => handleQuestionChange(index, 'rubric', e.target.value)}
                className="w-full border rounded-md p-2 mb-4"
              />

              <label className="block text-gray-700 font-semibold mb-2">Sample Answer</label>
              <input
                type="text"
                value={question.sampleAnswer}
                onChange={(e) => handleQuestionChange(index, 'sampleAnswer', e.target.value)}
                className="w-full border rounded-md p-2 mb-4"
              />

              <label className="block text-gray-700 font-semibold mb-2">Points</label>
              <input
                type="number"
                value={question.points}
                onChange={(e) => handleQuestionChange(index, 'points', e.target.value)}
                className="w-full border rounded-md p-2 mb-4"
              />

              <button
                onClick={() => removeQuestion(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove Question
              </button>
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Add Question
          </button>
        </div>

        <div className="mt-8">
          <label htmlFor="file" className="block text-gray-700 font-semibold mb-2">
            Upload Student Submission
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit for Grading
          </button>
        </div>

        {msg && (
          <p className="mt-4 text-center text-gray-700 font-medium">{msg}</p>
        )}

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
                                const grade = typeof row.grade === "string" ? row.grade : `${row.grade}/5`; 
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
                                                    value={numerator} 
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
                                                rows={Math.max(2, Math.ceil(row.reason.length / 60))} 
                                                style={{ resize: "none" }} 
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
            </table>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => saveAsDocx(editedData)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Download Full Response
              </button>
              <a
                href={downloadGeneratedFile}
                download="rubric.docx"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Download Rubric
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rubric;
