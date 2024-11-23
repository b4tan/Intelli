import React from 'react';

function Footer() {
  return (
    <footer
      className="w-full text-[#FAF9F6] py-6 text-center"
      style={{
        backgroundColor: '#121312', 
        fontFamily: 'Optima',
        opactiy: "0.8"
      }}
    >
      <p
        style={{
          color: '#FAF9F6', 
          fontSize: '1rem', 
          marginBottom: '8px',
          opacity: "0.8"
        }}
      >
        &copy; {new Date().getFullYear()} Intelli. All Rights Reserved.
      </p>
      <p
        style={{
          color: '#FAF9F6',
          fontSize: '1rem',
          opacity: "0.8"
        }}
      >
        Made with ❤️ by the Intelli Team.
      </p>
    </footer>
  );
}

export default Footer;
