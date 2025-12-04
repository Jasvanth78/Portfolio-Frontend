import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';

const EducationData = [
    {
        id: 1,
        year: "2023 - 2026",
        title: "Bachelor of Computer Applications",
        institution: "Bharathiar University",
        description: "Bharathidasan College of Arts and Science",

    },
    {
        id: 2,
        year: "2018 - 2020",
        title: "Higher Secondary Education",
        institution: "Govt.Higher Secondary School - Bunglowpudur",
        description: "Completed with a focus on Commerce  and Computer Science.",

    }
];

const ExperienceData = [
    {
        _id: "1",
        name: "Full Stack Developer Intern",
        description: "Worked on developing scalable web applications using React and Node.js.",
        year: "2025 - Present"
    }
];

const JourneyCard = ({ item, type }) => {
    return (
        <div className="group relative flex items-center mb-8 w-full">

            <div className={`absolute top-0 bottom-0 w-1 bg-gray-700 group-hover:bg-blue-500 transition-colors duration-300 ${type === 'education' ? 'right-0 mr-[-2px]' : 'left-0 ml-[-2px]'}`}></div>


            <div className={`absolute w-4 h-4 rounded-full border-2 border-blue-500 bg-gray-900 group-hover:bg-blue-500 transition-all duration-300 z-10 ${type === 'education' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}></div>


            <div className={`relative w-[90%] p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 ease-out hover:w-full hover:bg-white/10 hover:border-blue-500/50 ${type === 'education' ? 'mr-8 text-right' : 'ml-8 text-left'}`}>
                <div className={`flex flex-col ${type === 'education' ? 'items-end' : 'items-start'}`}>
                    <span className="text-blue-400 font-mono text-sm mb-1">{item.year || "202X - 202X"}</span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title || item.name}</h3>
                    {item.institution && <h4 className="text-gray-400 text-sm mb-3">{item.institution}</h4>}
                    <p className="text-gray-400 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Journey() {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data used since backend route /api/experience does not exist
        setExperience(ExperienceData);
        setLoading(false);
    }, []);

    return (
        <div className="min-h-screen w-full py-20 px-4 md:px-10 flex flex-col items-center overflow-x-hidden">
            <h1 className='text-5xl font-bold mb-20 text-center text-white'>
                <span className="text-blue-500">My</span> Journey
            </h1>

            <Reveal width="100%">
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 relative ">

                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2"></div>


                    <div className="flex flex-col items-end">
                        <h2 className="text-3xl font-bold text-white mb-12 pr-8 border-r-4 border-blue-500">Education</h2>
                        <div className="w-full flex flex-col items-end">
                            {EducationData.map((edu) => (
                                <JourneyCard key={edu.id} item={edu} type="education" />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-start">
                        <h2 className="text-3xl font-bold text-white mb-12 pl-8 border-l-4 border-blue-500">Experience</h2>
                        <div className="w-full flex flex-col items-start">
                            {experience.map((exp) => (
                                <JourneyCard key={exp._id || exp.id} item={exp} type="experience" />
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    )
}
