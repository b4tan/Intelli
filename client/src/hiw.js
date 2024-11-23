import React from 'react';

const hiw = () => {
    return (
        <div
            className="text-[#FAF9F6]/80 relative"
            style={{
                fontFamily: 'Geneva',
            }}
        >
            {/* Title Section */}
            <div
                className="relative mb-8"
                style={{
                    marginTop: '50px',
                }}
            >
                <div
                    className="absolute top-0 left-0 h-20 bg-red-600/65"
                    style={{
                        width: '50%',
                        clipPath: 'polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)',
                    }}
                ></div>

                <h1
                    className="relative text-5xl font-semibold z-10 pl-4"
                    style={{
                        lineHeight: '5rem',
                    }}
                >
                    How it works?
                </h1>
            </div>

            {/* Main Content Section */}
            <div
                className="flex justify-center items-center space-x-8 mt-12 relative"
                style={{
                    marginBottom: '50px',
                }}
            >
                {/* Left Image (Grading Guideline) */}
                <div className="w-1/4 relative">
                    <img
                        src="/grading.png"
                        alt="Rubric Sample"
                        className="w-full h-auto rounded-lg shadow-lg"
                        style = {{
                            opacity: 0.9,
                        }}
                    />

                    {/* DOCX Icon for Grading Guideline */}
                    <img
                        src="/docx.png"
                        alt="DOCX Icon"
                        className="absolute"
                        style={{
                            top: '-10px', // Positioned to overlap the top-right corner
                            right: '-10px',
                            width: '50px',
                            height: '50px',
                        }}
                    />
                </div>

                {/* Plus Icon */}
                <div
                    className="w-1/8 flex justify-center"
                    style={{
                        position: 'relative',
                        opacity: '0.85',
                    }}
                >
                    <img
                        src="/plus.svg"
                        alt="Plus Sign"
                        className="w-12 h-12"
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>

                {/* Right Image (Student Submission) */}
                <div className="w-1/4 relative">
                    <img
                        src="/student.png"
                        alt="Student Submission"
                        className="w-full h-auto rounded-lg shadow-lg"
                        style = {{
                            opacity: 0.9,
                        }}
                    />
                    {/* DOCX Icon for Student Submission */}
                    <img
                        src="/docx.png"
                        alt="DOCX Icon"
                        className="absolute"
                        style={{
                            top: '-10px',
                            right: '-10px',
                            width: '50px',
                            height: '50px',
                        }}
                    />
                </div>
            </div>

            {/* Description Section */}
            <div
                className="relative flex justify-center items-center border"
                style={{
                    marginTop: '50px',
                    width: '65%', 
                    height: '150px', 
                    background: 'radial-gradient(circle, #206c8c, #1d997c)',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    opacity: '0.8',
                    top: "-10px",
                }}
            >
                <p
                    className="font-md"
                    style={{
                        margin: '10px',
                        fontWeight: 'lighter', 
                        textAlign: 'justify', 
                        lineHeight: '1.8rem', 
                    }}
                >
                    Intelli. is able to parse student submissions and grading guidelines in any
                    forms. However, to achieve maximum accuracy, the submitted document needs to be
                    in docx. format. Don't have a docx. grading guideline? Our dedicated autograder
                    section will handle that for you!
                </p>
            </div>
        </div>
    );
};

export default hiw;
