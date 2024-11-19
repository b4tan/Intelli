import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './navbar';
import Rubric from './rubric';
import NoRubric from './norubric';
import Hero from './Hero';
import Home from './Home';
import Autograder from './Autograder'
import Hiw from './hiw'

function HomePage() {

  return (
  
    <div className="home-container">
      <div id ="home">
        <Hero />
        <Home />
        </div>

      <div id="how-it-works">
        <Hiw />
      </div>

      <div id="autograder">
        <Autograder/>
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