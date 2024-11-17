import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Rubric from './rubric';
import NoRubric from './norubric';
import Hero from './Hero';

function HomePage() {
  const navigate = useNavigate();

  return (
  
    <div className="home-container">
      <div id ="home">
        <Hero />
      </div>

      <div id="autograder">
        <h2>Try our product now!</h2>
        <p>Links to autograder below</p>
          <div className="button-container">
          <button onClick={() => navigate('/rubric')}>No, Make a rubric</button>
          <button onClick={() => navigate('/norubric')}>Yes, I Have a Rubric</button>
          </div>
      </div>

      <div id="how-it-works">
        <h2>How It Works Section</h2>
        <p>Explain how the app works.</p>
      </div>

      <div id="subscribe">
        <h2>Subscribe Section</h2>
        <p>Subscription details here.</p>
      </div>

      <div id="contact">
        <h2>Contact Section</h2>
        <p>Contact information and form.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rubric" element={<Rubric />} />
        <Route path="/norubric" element={<NoRubric />} />
      </Routes>
    </Router>
  );
}

export default App;