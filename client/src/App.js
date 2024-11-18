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
        <div className="relative flex justify-center items-center -mt-20 space-x-10" style = {{
          marginLeft: "35px", marginRight:"35px",
        }}>

          <div
          className="w-[300px] h-[200px] bg-gradient-to-r from-[#206c8c] to-[#1d997c] shadow-lg rounded-lg flex items-center justify-center"
        >
          <p
            className="text-[#FAF9F6] text-md text-justify"
            style={{
              fontFamily: "Geneva",
              opacity: 0.7, 
              margin:"10px",
            }}
          > Simply upload a grading guideline and a student submission to start grading! Intelli. also supports the creation of your own grading guideline in-site.</p>
        </div>

        <div
        className="w-[300px] h-[200px] shadow-lg rounded-lg flex items-center justify-center"
        style={{
          background: "radial-gradient(circle, #206c8c, #1d997c)",
        }}
      >
        <p
          className="text-[#FAF9F6] font-semibold text-lg text-center"
          style={{
            fontFamily: "Geneva",
            opacity: 0.7,
            margin: "10px",
          }}
        >
          High accuracy! No need to worry
        </p>
      </div>

          <div
          className="w-[300px] h-[200px] bg-gradient-to-l from-[#206c8c] to-[#1d997c] shadow-lg rounded-lg flex items-center justify-center"
        >
          <p
            className="text-[#FAF9F6] font-semibold text-lg text-center"
            style={{
              fontFamily: "Geneva",
              opacity: 0.7,
              margin: "10px",
            }}
          >
            Saves time and effort by automation
          </p>
        </div>
        </div>
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