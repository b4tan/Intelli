import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Rubric() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [generatedFileUrl, setGeneratedFileUrl] = useState(null);

  function handleUpload() {
    if (!file && !generatedFileUrl) {
      setMsg("No file selected or no questions added");
      return;
    }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('questions', JSON.stringify(questions));

    if (generatedFileUrl) {
      fd.append('questionsTextFile', generatedFileUrl, 'questions.txt');
    }

    setMsg("Uploading...");
    setProgress({ started: true, pc: 0 });

    axios.post('http://localhost:5000/api/upload', fd, {
      onUploadProgress: (progressEvent) => { 
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(prevState => ({
          ...prevState,
          pc: percentCompleted
        }));
      }, 
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then(res => {
      setMsg("Upload successful");
      console.log(res.data);
    })
    .catch(err => {
      setMsg("Upload failed");
      console.error(err);
    });
  }

  const addQuestion = () => {
    setQuestions([...questions, { type: '', question: '', rubric: '', sampleAnswer: '', points: '', answer: '' }]);
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

  const generateTextFileContent = () => {
    let content = "Instructor Questions\n===================\n";
    questions.forEach((q, i) => {
      content += `Question ${i + 1}:\n`;
      content += `Type: ${q.type}\n`;
      if (q.type === 'short') {
        content += `Question: ${q.question}\n`;
        content += `Context (accepted answers): ${q.rubric}\n`;
        content += `Sample Answer: ${q.sampleAnswer}\n`;
      } else {
        content += `Answer: ${q.answer}\n`;
      }
      content += `Points: ${q.points}\n`;
      content += "-------------------\n";
    });
    return content;
  };

  const handleSaveToFile = () => {
    const content = generateTextFileContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    setGeneratedFileUrl(url);
  };

  return (
    <div className="rubric-container">
      <h1>Welcome to our free response autograder</h1>
      <h2>Please upload the submission below</h2>

      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={index} className="question-row">
            <label>Question Type:</label>
            <select
              value={question.type}
              onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
            >
              <option value="">Select Question Type</option>
              <option value="mcq">Multiple Choice</option>
              <option value="truefalse">True or False</option>
              <option value="short">Short Answer</option>
            </select>

            {question.type === 'short' && (
              <>
                <label>Question:</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                />
                <label>Context (accepted answers):</label>
                <input
                  type="text"
                  value={question.rubric}
                  onChange={(e) => handleQuestionChange(index, 'rubric', e.target.value)}
                />
                <label>Sample Answer:</label>
                <input
                  type="text"
                  value={question.sampleAnswer}
                  onChange={(e) => handleQuestionChange(index, 'sampleAnswer', e.target.value)}
                />
              </>
            )}
            {(question.type === 'mcq' || question.type === 'truefalse') && (
              <>
                <label>Answer:</label>
                <input
                  type="text"
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                />
              </>
            )}

            {question.type && (
              <>
                <label>Points:</label>
                <input
                  type="number"
                  value={question.points}
                  onChange={(e) => handleQuestionChange(index, 'points', e.target.value)}
                />
              </>
            )}

            <button onClick={() => removeQuestion(index)}>-</button>
          </div>
        ))}
      </div>

      <button onClick={addQuestion}>Add Question</button>

      <div className="upload-section">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </div>

      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleSaveToFile}>Save as Text File</button>

      {generatedFileUrl && (
        <a href={generatedFileUrl} download="questions.txt">
          Download Questions File
        </a>
      )}

      {progress.started && <progress max="100" value={progress.pc}></progress>}
      
      {msg && <span>{msg}</span>}

      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default Rubric;
