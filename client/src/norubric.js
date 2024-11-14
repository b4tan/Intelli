import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function NoRubric() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  // Function to handle file upload
  function handleUpload() {
    if (!file) {
      setMsg("No file selected");
      return;
    }

    const fd = new FormData();
    fd.append('file', file);

    setMsg("Uploading...");
    setProgress({ started: true, pc: 0 });

    axios.post('http://localhost:5000/api/upload', fd, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress({ started: true, pc: percentCompleted });
      },
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then(res => {
      setMsg("Upload successful");
    })
    .catch(err => {
      setMsg("Upload failed");
    });
  }

  return (
    <div className="no-rubric-container">
      <h2>Upload Files</h2>

      <div className="upload-section">
        <p>Student Submission/Answer</p>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <div className="upload-section">
        <p>Grading Scheme</p>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <button onClick={handleUpload}>Upload</button>

      {progress.started && <progress max="100" value={progress.pc}></progress>}
      {msg && <span>{msg}</span>}

      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default NoRubric;
