import React from 'react';
import img from '../assets/jasvanth1.png';
import Quotes from './Quotes';

export default function About() {
  return (
    <div className="w-full py-20 px-4 sm:px-8 lg:px-16" id="about">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
            About <span className="text-blue-400">Me</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            I'm a fresher learning full-stack development, turning curiosity into code and ideas into impact.
            Every bug I fix, every project I build, shapes my future.
            <span className="block mt-4 font-semibold text-white">
              I’m not at the top yet — but I’m on the rise.
            </span>
          </p>
        </div>

        
        
        <div className="pt-4">
                            <Quotes />
                        </div>
      </div>
    </div>
  );
}
