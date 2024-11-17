import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  // Scroll to the specified section
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="flex items-center justify-between p-3 w-full overflow-x-hidden"
      style={{
        backgroundColor: '#25897a',
      }}
    >
      {/* App Name */}
      <h1
        className="text-3xl font-bold cursor-pointer flex-shrink-0"
        style={{ color: '#FAF9F6', fontFamily: 'Optima', marginLeft: '10px' }}
        onClick={() => navigate('/')}
      >
        Intelli.
      </h1>

      {/* Center Navigation Buttons - Hidden on Small Screens */}
      <div className="hidden md:flex items-center gap-8 flex-grow justify-center">
        <button
          onClick={() => scrollToSection('autograder')}
          className="relative text-[#FAF9F6] text-lg font-bold hover:underline transition-all duration-300 hover:-translate-y-1"
          style={{ fontFamily: 'Optima' }}
        >
          Autograder
        </button>
        <button
          onClick={() => scrollToSection('how-it-works')}
          className="relative text-[#FAF9F6] text-lg font-bold hover:underline transition-all duration-300 hover:-translate-y-1"
          style={{ fontFamily: 'Optima' }}
        >
          How It Works
        </button>
        <button
          onClick={() => scrollToSection('subscribe')}
          className="relative text-[#FAF9F6] text-lg font-bold hover:underline transition-all duration-300 hover:-translate-y-1"
          style={{ fontFamily: 'Optima' }}
        >
          Subscribe
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className="relative text-[#FAF9F6] text-lg font-bold hover:underline transition-all duration-300 hover:-translate-y-1"
          style={{ fontFamily: 'Optima' }}
        >
          Contact
        </button>
      </div>

      {/* Login/Sign Up Button - Always Visible */}
      <button
        onClick={() => scrollToSection('login')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border text-[#FAF9F6] hover:bg-[#6BB1A6] hover:text-[#FAF9F6] transition font-medium text-sm"
        style={{
          borderColor: '#FAF9F6',
          fontFamily: 'Optima',
          fontWeight: 'bold',
          marginRight: '10px',
        }}
      >
        Login/Sign Up
      </button>
    </nav>
  );
}

export default Navbar;
