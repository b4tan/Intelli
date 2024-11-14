import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Rubric from './rubric';
import NoRubric from './norubric';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Hello, welcome to our landing page!</h1>
      <p>This app allows instructors to grade student answers using artificial intelligence.</p>
      <p>Do you have a grading scheme/rubric to start with?</p>

      <div className="button-container">
        <button onClick={() => navigate('/rubric')}>Make a Rubric</button>
        <button onClick={() => navigate('/norubric')}>I Have a Rubric</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rubric" element={<Rubric />} />
        <Route path="/norubric" element={<NoRubric />} />
      </Routes>
    </Router>
  );
}

export default App;
