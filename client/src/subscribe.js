import React from 'react';

const Subscribe = () => {
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
                <div className="absolute top-0 right-0 h-20 bg-gradient-to-l from-[#206c8c] to-[#1d997c] shadow-lg w-[50%] sm:w-[95%] md:w-[75%] lg:w-[65%] flex justify-center items-center" 
                    style={{
                        clipPath: "polygon(100% 0, 0 0, 20% 50%, 0 100%, 100% 100%)"
                    }}>
                </div>

                <h1
                    className="relative text-3xl font-semibold z-10 pl-4 sm:text-2xl md:text-3xl lg:text-5xl"
                    style={{
                        lineHeight: '5rem',
                        marginRight: '15px'
                    }}
                >
                    Subscription
                </h1>
            </div>

            <div className="relative">
                <p className="mr-6 text-md opacity-80 text-right font-lighter sm:text-sm md:text-md lg:text-lg" 
                   style={{ marginRight: "10px" }}>
                    Our live-demo product is available now! <br></br> Stay updated with our latest features and announcements. 
                    <br></br>Contact us or sign up for more details.
                </p>
            </div>
        </div>
    );
}

export default Subscribe;
