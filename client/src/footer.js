import React from 'react';

function Footer() {
  return (
    <footer
      className="w-full text-[#FAF9F6] py-6 text-center"
      style={{
        backgroundColor: '#25897a', 
        fontFamily: 'Optima',
        opacity: 0.8, 
      }}
    >
      <p
        style={{
          color: '#FAF9F6',
          fontSize: '1rem',
          marginBottom: '8px',
        }}
      >
        &copy; {new Date().getFullYear()} Intelli. All Rights Reserved.
      </p>
      <p
        style={{
          color: '#FAF9F6',
          fontSize: '1rem',
        }}
      >
        Made with ❤️ by the Intelli Team.
      </p>
    </footer>
  );
}

export default Footer;
