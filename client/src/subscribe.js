import React from 'react';

const subscribe = () => {
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
                    Subscription
                </h1>
            </div>

            <div className="relative">

                <p classname="font-lg"
                style={{
                    marginBottom: '20px',
                    marginLeft: '30px',
                    marginTop: '-10px',
                    fontWeight: 'lighter',
                    opacity: "0.8",
                }}
                >
               For now, our product is for live-demo only! Please scroll to contact section to reach out to us.
                </p>
            </div>

        </div>
    )
}

export default subscribe;