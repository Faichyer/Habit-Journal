"use client"

import React from 'react';

const Card = ({ iconPath, title, description }: {iconPath: string, title: string, description: string}) => {
    const [hover, setHover] = React.useState(false);

    return (
        <div className="bg-gray-900 shadow-lg shadow-gray-800 p-14 rounded-lg cursor-pointer relative transition-shadow duration-300 hover:shadow-2xl"
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}>
            <div className="absolute inset-0 bg-opacity-5 rounded-lg"></div>
            <div className="relative z-10 p-2">
                <div className="absolute inset-4.5 bg-opacity-20 rounded-full border border-gray-200 backdrop-blur-md"></div>
                <svg className="relative block h-6 w-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    {iconPath}
                </svg>
            </div>
            <h4 className="relative z-10 mt-3 text-white font-semibold text-lg">{title}</h4>
            <p className="relative z-10 text-gray-400 text-base">{description}</p>
            <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div className={`absolute top-0 left-0 w-1/4 h-1/4 bg-green-500 ${hover ? 'animate-pulse' : ''}`}></div>
                <div className={`absolute top-0 right-0 w-1/4 h-1/4 bg-green-500 ${hover ? 'animate-pulse' : ''}`}></div>
                {/* Add more tiles as needed */}
                <div className={`absolute bottom-0 w-full h-px bg-green-500 scale-x-0 ${hover ? 'animate-scale-x' : ''}`}></div>
            </div>
        </div>
    );
};

export default Card;