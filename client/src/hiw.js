import React from 'react';

const hiw = () => {
    return (
        <div
        className="text-[#FAF9F6]/80 relative"
        style={{
            fontFamily: 'Geneva',
        }}
        >
        
            <div className="relative mb-8" style = {{
                marginTop: "45px",
            }}>
            {/* Bookmark Background */}
                <div
                className="absolute top-0 left-0 h-20 bg-red-600/65 "
                style={{
                    width: '50%',
                    clipPath: 'polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)',
                }}
                ></div>

                {/* Text inside the bookmark */}
                <h1
                className="relative text-5xl font-semibold z-10 pl-4"
                style={{
                    lineHeight: '5rem',
                }}
                >
                How it works?
                </h1>
            </div>

            <div
                className="flex justify-center items-center space-x-8 mt-8"
                style={{
                    marginBottom: '50px',
                }}
            >
               <div
                className="absolute rounded-lg shadow-lg"
                style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    background: "radial-gradient(circle, #206c8c, #1d997c)",
                    width: '42%',
                    height: '60%',
                    left: '50%',
                    transform: 'translateX(-50%)', 
                    opacity: 1, 
                    zIndex: -1, 
                }}
            ></div>

                {/* Left Image */}
                <div className="w-1/4">
                    <img
                        src="/grading.png"
                        alt="Rubric Sample"
                        className="w-90 h-110 rounded-lg shadow-lg"
                    />
                </div>

                <div className="w-1/8 flex justify-center" style= {{
                    position: "relative",
                }}>
                    <img
                        src="/docx.png"
                        alt="Plus Sign"
                        className="w-12 h-12"
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>

                {/* Right Image */}
                <div className="w-1/4">
                    <img
                        src="/student.png"
                        alt="student submission"
                        className="w-90 h-110 rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <div className="relative">

                <p classname="font-lg"
                style={{
                    marginLeft: '30px',
                    marginTop: '-10px',
                    fontWeight: 'lighter',
                }}
                >
                Intelli. is able to parse a student submissions and grading guidelines in any forms. <br></br>However, to achieve maximum accuracy, the submitted document needs to be in docx formatting. <br></br> Don't have a docx grading guideline? A dedicated autograder section will handle that for you!
                </p>
            </div>

    </div>
    );
};

export default hiw;