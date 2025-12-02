import React from 'react'
import { useState, useEffect } from 'react'

export default function Journey() {
    const [experience, setExperience] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/experience')
            .then(res => res.json())
            .then(data => setExperience(data))
            .catch(err => console.error('Error fetching experience:', err));
    }, []);
    return (
        <div className="text-white w-full py-20 px-4 min-h-screen flex flex-col items-center">
            <h1 className='text-4xl font-bold mb-12 text-center'>
                <span className="text-cyan-400">My</span> Journey
            </h1>

            <div className="w-full max-w-4xl flex flex-col gap-8">
                {experience.map(exp => (
                    <div key={exp._id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-cyan-300 mb-2">{exp.name}</h2>
                        <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}
