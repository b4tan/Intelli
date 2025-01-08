import React from 'react';

const Hiw = () => {
    return (
        <div className="relative text-[#FAF9F6]/80 font-geneva py-12 md:py-16 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-x-0 top-[80px] md:top-[100px] w-[80%] md:w-[50%] lg:w-[35%] mx-auto bg-[#25897a]/30 rounded-2xl" style={{ height: 'calc(100% - 160px)'}}></div>

            <div className="relative flex flex-col items-center mb-6">
                <div
                    className="relative w-[90%] sm:w-[80%] md:w-[50%] lg:w-[32%] h-14 sm:h-16 md:h-20 shadow-lg flex justify-center items-center"
                    style={{
                        clipPath: 'polygon(10% 50%, 0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%)',
                        background: "radial-gradient(circle, #206c8c, #1d997c)",
                    }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl z-10">Requirements</h1>
                </div>
            </div>

            <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mt-6 md:mt-10">
                <div className="bg-white p-4 sm:p-5 md:p-6 opacity-80 rounded-2xl shadow-lg w-56 sm:w-64 md:w-72 lg:w-80 transform hover:scale-105 transition duration-300 relative text-center">
                    <img src="./public/grading.png" alt="Rubric Sample" className="w-full h-auto rounded-lg" />
                    <img src="./public/docx.png" alt="DOCX Icon" className="absolute top-[-8px] sm:top-[-10px] md:top-[-15px] right-[-8px] sm:right-[-10px] md:right-[-15px] w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                    <h3 className="text-md sm:text-lg font-semibold text-gray-700 mt-3 md:mt-4">Grading Guideline</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Includes rubrics, points rewarded, and question type.</p>
                </div>

                <div className="flex justify-center items-center transform hover:scale-110 transition duration-300 opacity-80">
                    <img src="./public/plus.svg" alt="Plus Sign" className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12" />
                </div>

                <div className="bg-white p-4 sm:p-5 md:p-6 opacity-80 rounded-2xl shadow-lg w-56 sm:w-64 md:w-72 lg:w-80 transform hover:scale-105 transition duration-300 relative text-center">
                    <img src="./public/student.png" alt="Student Submission" className="w-full h-auto rounded-lg" />
                    <img src="./public/docx.png" alt="DOCX Icon" className="absolute top-[-8px] sm:top-[-10px] md:top-[-15px] right-[-8px] sm:right-[-10px] md:right-[-15px] w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                    <h3 className="text-md sm:text-lg font-semibold text-gray-700 mt-3 md:mt-4">Student Submission</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Automatically analyzed with AI for accuracy.</p>
                </div>
            </div>

            <div className="relative flex justify-center items-center rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto mx-auto shadow-lg p-6 sm:p-7 md:p-8 mt-8 md:mt-10 z-10 border-2 border-[#FAF9F6]/70" style={{
                background: "radial-gradient(circle, #206c8c, #1d997c)",
            }}>
                <p className="text-center text-[#FAF9F6]/80 text-sm sm:text-md leading-relaxed font-light">
                    Intelli. is able to parse student submissions and grading guidelines in any format. However, to achieve maximum accuracy, the submitted document needs to be in docx format. Don't have a docx grading guideline? Our dedicated autograder section can help you create one and review scores that may need revision. Just give it a go!
                </p>
            </div>
        </div>
    );
};

export default Hiw;
