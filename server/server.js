const express = require('express');
const multer = require('multer'); // Multer is used for handling file uploads
const app = express();

// Set up multer storage (optional configuration)
const storage = multer.memoryStorage(); // This will store files in memory as a buffer
const upload = multer({ storage }); // Initialize multer with storage settings

// POST route to handle file uploads and text data
app.post('/api/upload', upload.single('file'), (req, res) => {
    // Access the file and input data from the request
    const file = req.file;         // Access uploaded file (available due to multer)
    const input1 = req.body.input1; // Access text inputs sent from frontend
    const input2 = req.body.input2;
    const input3 = req.body.input3;

    // Check if file and inputs are present
    if (!file || !input1 || !input2 || !input3) {
        return res.status(400).json({ message: "File or inputs are missing" });
    }

    // Process the file and inputs as needed
    console.log("File received:", file);
    console.log("Input 1:", input1);
    console.log("Input 2:", input2);
    console.log("Input 3:", input3);

    // Send a response back to the client
    res.status(200).json({ message: "File and inputs received successfully", fileInfo: file });
});

// Start the server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});

// TODO: handle api call with inputs from front end