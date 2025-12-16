import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

const TimelineItem = ({ item, type, index }) => {
    const isEducation = type === 'education';

    return (
        <motion.div
            initial={{ opacity: 0, x: isEducation ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex flex-col md:flex-row items-center justify-between w-full mb-8 relative ${isEducation ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Content Card */}
            <div className={`w-full md:w-5/12 ${isEducation ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
                <div className="p-6 bg-white/80 dark:bg-neutral-900/10 backdrop-blur-md border border-gray-200 dark:border-neutral-800/30 rounded-2xl hover:border-blue-600/50 hover:bg-neutral-100 dark:hover:bg-neutral-800/30 transition-all duration-300 shadow-xl group">
                    <div className={`flex flex-col gap-2 ${isEducation ? 'items-center md:items-end' : 'items-center md:items-start'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            {!isEducation && item.icon && <Icon icon={item.icon} className="text-blue-600 dark:text-blue-400 text-xl hidden md:block" />}
                            <span className="text-blue-600 dark:text-blue-300 font-mono text-sm border border-blue-500/30 px-2 py-1 rounded bg-blue-500/10">
                                {item.year}
                            </span>
                            {isEducation && item.icon && <Icon icon={item.icon} className="text-blue-600 dark:text-blue-400 text-xl hidden md:block" />}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                            {item.title || item.name}
                        </h3>

                        {item.institution && (
                            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                {item.institution}
                            </h4>
                        )}

                        <p className="text-gray-600 dark:text-gray-500 text-sm mt-2 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Timeline Center Point - Hidden on Mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
            </div>

            {/* Empty Space for the other side - Hidden on Mobile */}
            <div className="hidden md:block w-full md:w-5/12"></div>
        </motion.div>
    );
};

export default function Journey() {
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/journey`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Sort by order if available
                    const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
                    const edu = sorted.filter(item => item.type === 'education');
                    const exp = sorted.filter(item => item.type === 'experience');
                    setEducation(edu);
                    setExperience(exp);
                }
            })
            .catch(err => console.error('Error fetching journey data:', err));
    }, []);

    return (
        <div className="min-h-screen py-20 px-4 relative overflow-hidden flex flex-col items-center justify-center" id="journey">

            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16 relative z-10"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    My <span className="text-blue-600 dark:text-blue-400">Journey</span>
                </h2>

            </motion.div>

            <div className="w-full max-w-6xl relative">

                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 hidden md:block"></div>


                <div className="relative mb-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex justify-center md:justify-start md:ml-[calc(50%-80px)] md:mb-8 mb-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 backdrop-blur-sm inline-flex items-center gap-2">
                            <Icon icon="mdi:school" className="text-purple-500 dark:text-purple-400" /> Education
                        </h3>
                    </motion.div>

                    <div className="flex flex-col gap-4">
                        {education.map((edu, index) => (
                            <TimelineItem key={edu.id || index} item={edu} type="education" index={index} />
                        ))}
                        {education.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-center italic">Loading Education data...</p>}
                    </div>
                </div>


                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex justify-center md:justify-end md:mr-[calc(50%-80px)] md:mb-8 mb-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 backdrop-blur-sm inline-flex items-center gap-2">
                            <Icon icon="mdi:briefcase" className="text-blue-600 dark:text-blue-400" /> Experience
                        </h3>
                    </motion.div>

                    <div className="flex flex-col gap-4">
                        {experience.map((exp, index) => (
                            <TimelineItem key={exp._id || exp.id || index} item={exp} type="experience" index={index} />
                        ))}
                        {experience.length === 0 && <p className="text-gray-400 text-center italic">Loading Experience data...</p>}
                    </div>
                </div>

            </div>
        </div>
    );
}
