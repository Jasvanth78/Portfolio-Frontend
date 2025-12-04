import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react';

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        console.log('Fetching projects...');
        fetch('http://localhost:5000/api/projects')
            .then(res => {
                console.log('Response status:', res.status);
                return res.json();
            })
            .then(data => {
                console.log('Projects data:', data);
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error('Invalid projects data:', data);
                    setProjects([]);
                }
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
                setProjects([]);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="projects">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Projects</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore a collection of my recent work, showcasing my journey in web development and design.
                    </p>
                </motion.div>

                <motion.div
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {Array.isArray(projects) && projects.map((project, index) => (
                        <motion.div
                            key={project._id || index}
                            variants={itemVariants}
                            className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col h-full"
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60 z-10" />
                                <img
                                    src={project.thumbnail || 'https://via.placeholder.com/400x250'}
                                    alt={project.title || 'Project'}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <span className="text-blue-400 font-bold text-sm">#{index + 1}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {project.title || 'Untitled Project'}
                                </h3>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                    {project.description || 'No description available.'}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {(() => {
                                        if (!project.tags) return null;
                                        const tagsArray = Array.isArray(project.tags)
                                            ? project.tags
                                            : typeof project.tags === 'string'
                                                ? project.tags.split(',')
                                                : [];

                                        return tagsArray.slice(0, 3).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
                                            >
                                                {typeof tag === 'string' ? tag.trim() : tag}
                                            </span>
                                        ));
                                    })()}
                                    {project.tags && (Array.isArray(project.tags) ? project.tags.length : project.tags.split(',').length) > 3 && (
                                        <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/10">
                                            +{(Array.isArray(project.tags) ? project.tags.length : project.tags.split(',').length) - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                    <div className="flex gap-3">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/5 hover:border-white/20"
                                                title="View Code"
                                            >
                                                <Icon icon="mdi:github" className="text-xl" />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 transition-all border border-blue-500/20 hover:border-blue-500/40"
                                                title="Live Demo"
                                            >
                                                <Icon icon="mdi:external-link" className="text-xl" />
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                        <Icon icon="fluent:people-team-20-regular" className="text-base" />
                                        <span>{project.team || 'Solo'}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
