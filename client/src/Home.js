import React from 'react';

const Home = () => {
  return (
    <div className="relative flex flex-col lg:flex-row justify-center items-center -mt-20 gap-6 px-4">
      {/* Box 1 */}
      <div className="w-[300px] h-[225px] bg-gradient-to-r from-[#206c8c] to-[#1d997c] shadow-lg rounded-lg flex flex-col justify-center items-start p-4">
        <div className="flex items-center space-x-2 mb-2">
          <p className="text-[#FAF9F6] font-extrabold text-2xl sm:text-xl xs:text-sm opacity-70">
            A click away from grading
          </p>
          <img src="/click.svg" alt="Grading Icon" className="w-12 h-12 sm:w-10 sm:h-10 opacity-70" />
        </div>
        <p className="text-[#FAF9F6] text-sm sm:text-xs opacity-70 font-light break-words">
          Simply upload an existing grading guideline or create one and a student submission to start grading.
        </p>
      </div>

      {/* Box 2 */}
      <div className="w-[300px] h-[225px] shadow-lg rounded-lg flex flex-col justify-center items-start p-4"
        style={{ background: "radial-gradient(circle, #206c8c, #1d997c)" }}>
        <div className="flex items-center space-x-2 mb-2">
          <p className="text-[#FAF9F6] font-extrabold text-2xl sm:text-xl xs:text-sm opacity-70">
            High accuracy and comprehensive reasoning
          </p>
          <img src="/target.svg" alt="Target Icon" className="w-12 h-12 sm:w-10 sm:h-10 opacity-70" />
        </div>
        <p className="text-[#FAF9F6] text-sm sm:text-xs opacity-70 font-light break-words">
          Intelli. uses state-of-the-art LLM which is capable of producing high-quality reasoning and accuracy.
        </p>
      </div>

      {/* Box 3 */}
      <div className="w-[300px] h-[225px] bg-gradient-to-l from-[#206c8c] to-[#1d997c] shadow-lg rounded-lg flex flex-col justify-center items-start p-4">
        <div className="flex items-center space-x-2 mb-2">
          <p className="text-[#FAF9F6] font-extrabold text-2xl sm:text-xl xs:text-sm opacity-70">
            Automation that saves time
          </p>
          <img src="/clock.svg" alt="Clock Icon" className="w-12 h-12 sm:w-10 sm:h-10 opacity-70" />
        </div>
        <p className="text-[#FAF9F6] text-sm sm:text-xs opacity-70 font-light break-words">
          Intelli. is powered by a powerful model and grades papers in minutes. Sit back and relax!
        </p>
      </div>
    </div>
  );
};

export default Home;
