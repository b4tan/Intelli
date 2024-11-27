import React from 'react';

export const Hero = () => {
    return (
        <section
            className="relative h-[550px] flex flex-col items-center justify-center"
            style={{
                backgroundImage: 'url(/stars.png)',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute h-80 w-80 bg-[#20B2AA] rounded-full border border-white/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(105,250,206,0.37),rgb(1,148,118))] shadow-[-20px_-20px_50px_rgba(255,255,255,0.5),-20px_-20px_80px_rgba(255,255,255,0.1),0_0_50px_rgba(9,250,217,1)] z-10"></div>
            <div className="fixed inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#3070b0]/30 to-transparent z-0 pointer-events-none"></div>

            <div className="container relative z-10 text-center">
                <h1
                    className="text-6xl font-semibold tracking-tighter bg-white bg-[radial-gradient(110%_90%_at_top_left,#1a6156,#FAF9F6,rgb(110,250,217,.5))] bg-clip-text text-transparent"
                    style={{ fontFamily: "Geneva" }}
                >
                    Automate grading <br /> with AI
                </h1>
            </div>

            <div className="container relative z-10 text-center mt-5 max-w-3xl">
                <p
                    className="text-lg text-[#FAF9F6]/70"
                    style={{ fontFamily: "Geneva" }}
                >
                    Smart technology meets user-friendly platform. Effortlessly evaluate student
                    submissions with the power of natural language processing which uses semantic
                    comparison to accurately and effectively grade answers based on your own
                    guidelines.
                </p>
            </div>
        </section>
    );
};

export default Hero;
