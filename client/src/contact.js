import React from 'react';

const Contact = () => {
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
            <div className="absolute top-0 left-0 h-20 bg-gradient-to-r from-[#206c8c] to-[#1d997c] shadow-lg w-[50%] sm:w-[95%] md:w-[75%] lg:w-[65%] flex justify-center items-center" 
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)',
                    }}
                ></div>

                <h1
                    className="relative text-3xl font-semibold z-10 pl-4 sm:text-2xl md:text-3xl lg:text-5xl"
                    style={{
                        lineHeight: '5rem',
                    }}
                >
                   Contact Us
                </h1>
            </div>

            <div className="relative">
                <p className="mr-6 text-md opacity-80 text-left font-lighter sm:text-sm md:text-md lg:text-lg" 
                   style={{ marginLeft: '10px' }}>
                    Team: Bryant Tan, Christopherian Sulaiman, <br></br>Christophian Sulaiman
                    <br></br>
                    Reach us through:<br></br>
                    bryant.tan2103@gmail.com <br></br>
                    sulaimanrian04@gmail.com <br></br>
                    chsulaiman@ucsd.edu
                </p>
            </div>
        </div>
    );
}

export default Contact;
