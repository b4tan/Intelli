import React from 'react';
import { useState } from "react";
import axios from "axios";

// Main component
function App() {
  // State to store the selected file
  const [file, setFile] = useState(null);
  
  // State to manage progress of file upload (whether started and percentage complete)
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  
  // State to store a message (e.g., success or failure)
  const [msg, setMsg] = useState(null);

  // State for text inputs
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  // Function to handle file upload
  function handleUpload() {
    // Check if a file has been selected
    if (!file) {
      setMsg("No file selected");
      return;
    }

    // Create a new FormData object to send the file
    const fd = new FormData();
    fd.append('file', file);    
    fd.append('input1', input1);
    fd.append('input2', input2);
    fd.append('input3', input3);

    // Update the message to indicate upload has started
    setMsg("Uploading...");
    
    // Set progress to started
    setProgress(prevState => {
      return { ...prevState, started: true };
    });

    // Make POST request to server to upload the file
    axios.post('http://localhost:5000/api/upload', fd, {
      // Track the progress of the upload and update the progress state
      onUploadProgress: (progressEvent) => { 
        setProgress(prevState => {
          return { ...prevState, pc: progressEvent.progress * 100 };
        }); 
      }, 
      headers: {
        "Content-Type": "multipart/form-data",  // Add a custom header if needed
      }
    })
    .then(res => {
      // If successful, update message and log the response
      setMsg("Upload successful");
      console.log(res.data);
    })
    .catch(err => {
      // If error occurs, update message and log the error
      setMsg("Upload failed");
      console.error(err);
    });
  }

  return (
    <div className="App">
      <h1> Welcome to our free response autograder </h1>
      <h2> Please upload the submission below </h2>

       {/* Text inputs to be sent with the file */}
       <div>
       <h3> What is the question?</h3>
       <input 
        type="text" 
        placeholder="Input 1" 
        value={input1} 
        onChange={(e) => setInput1(e.target.value)} 
      />
       </div>
       
      <div>
      <h3> Provide a sample answer: </h3>
      <input 
        type="text" 
        placeholder="Input 2" 
        value={input2} 
        onChange={(e) => setInput2(e.target.value)} 
      />
      </div>

      <div>
      <h3> What is given rubric?</h3>
      {/* TO DO: PROVIDE SAMPLE RUBRIC*/}
      <input 
        type="text" 
        placeholder="Input 3" 
        value={input3} 
        onChange={(e) => setInput3(e.target.value)} 
      />
      </div>

      {/* File input to select a file */}
      <div>
      <input onChange={(e) => { setFile(e.target.files[0]); }} type="file" />
      
      {/* Button to trigger upload */}
      <button onClick={handleUpload}> Upload </button>
      </div>
      
      {/* Display progress bar if upload has started */}
      {progress.started && <progress max="100" value={progress.pc}></progress>}
      
      {/* Display message if there is one */}
      {msg && <span>{msg}</span>}
    </div>
  );
}

export default App;
