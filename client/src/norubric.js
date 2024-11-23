import React, { useState } from 'react';
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun } from 'docx';

function NoRubric() {
    const [submissionFile, setSubmissionFile] = useState(null);
    const [rubricFile, setRubricFile] = useState(null);
    const [gradingData, setGradingData] = useState(null);
    const [msg, setMsg] = useState(null);


    // Handle file upload
    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };
    const saveAsDocx = async (response) => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(response),
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
    }
    // Handle form submission
    const handleSubmit = async () => {
        if (!rubricFile || !submissionFile) {
            setMsg('Please upload both files.');
            return;
        }

        const formData = new FormData();
        formData.append('rubric', rubricFile);
        formData.append('submission', submissionFile);

        setMsg('Uploading and processing...');
        try {
            const response = await axios.post('http://localhost:4000/grade', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setGradingData(response.data); // Store API response
            setMsg('Grading complete!');
        } catch (error) {
            console.error('Error submitting files:', error);
            setMsg('Error during submission. Please try again.');
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-5">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Grade Submission
                </h1>

                {/* File Upload Inputs */}
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="submissionFile"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Upload Student Submission
                        </label>
                        <input
                            id="submissionFile"
                            type="file"
                            onChange={(e) => handleFileChange(e, setSubmissionFile)}
                            accept=".docx"
                            className="block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="rubricFile"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Upload Grading Rubric
                        </label>
                        <input
                            id="rubricFile"
                            type="file"
                            onChange={(e) => handleFileChange(e, setRubricFile)}
                            accept=".docx"
                            className="block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
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
            {gradingData?.gptResponse && (
    <button
        onClick={() => saveAsDocx(gradingData.gptResponse)}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
    >
        Download Full Response
    </button>
)}
            {/* Grading Data Display */}
            {gradingData && (
                <div className="bg-white shadow-md rounded-lg p-8 mt-10 w-full max-w-4xl">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Overall Grade: {gradingData.overallGrade}
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
                            {gradingData.csvData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.question}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.grade}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.reason}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Display Full GPT Response */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            Full GPT Response
                        </h3>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                            {gradingData.gptResponse}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NoRubric;