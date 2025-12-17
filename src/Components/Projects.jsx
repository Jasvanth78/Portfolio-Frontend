import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence, easeInOut } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const ProjectImage = ({ project }) => {
    const [imgError, setImgError] = useState(false);

    // Construct valid image source
    const imgSource = (() => {
        if (!project.thumbnail) return null;
        if (project.thumbnail.startsWith('http')) return project.thumbnail;
        return `${API_BASE_URL}${project.thumbnail}`;
    })();

    if (imgError || !imgSource) {
        return (
            <div className="w-full h-full flex items-center justify-center text-slate-700 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                <Icon icon="solar:code-square-bold" className="text-6xl text-blue-400/30" />
            </div>
        );
    }

    return (
        <img
            src={imgSource}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
    );
};

export default function Projects({ isPreview = false }) {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        fetch(`${API_BASE_URL}/api/projects`)
            .then(res => res.json())
            .then(data => {

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


    useEffect(() => {
        if (!isPreview || projects.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % projects.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [isPreview, projects.length]);

    const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);
    };

    const displayedProjects = isPreview ? (projects.length > 0 ? [projects[currentIndex]] : []) : projects;

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="projects">

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-300 dark:to-gray-300">Projects</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Explore a collection of my recent work, showcasing my journey in web development and design.
                    </p>
                </motion.div>

                <div className="space-y-24">
                    {Array.isArray(displayedProjects) && displayedProjects.map((project, index) => (
                        <motion.div
                            key={project._id || currentIndex}
                            initial={{ opacity: 0, x: isPreview ? 200 : 0, y: isPreview ? 0 : 50 }}
                            animate={isPreview ? { opacity: 1, x: 0, y: 0 } : undefined}
                            whileInView={!isPreview ? { opacity: 1, y: 0 } : undefined}
                            exit={isPreview ? { opacity: 0, x: -200 } : undefined}
                            viewport={!isPreview ? { once: true, margin: "-100px" } : undefined}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="flex flex-col md:flex-row gap-12 items-center"
                        >

                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-white rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                                    <ProjectImage project={project} />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all hover:scale-110"
                                                title="View Code"
                                            >
                                                <Icon icon="mdi:github" className="text-2xl" />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-md border border-blue-400/30 rounded-full text-white transition-all hover:scale-110"
                                                title="Live Demo"
                                            >
                                                <Icon icon="mdi:external-link" className="text-2xl" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-gray-200 dark:to-gray-400">
                                    {project.title || 'Untitled Project'}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                                    {project.description || 'No description available.'}
                                </p>


                                <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                                    {(() => {
                                        if (!project.tags) return null;
                                        const tagsArray = Array.isArray(project.tags)
                                            ? project.tags
                                            : typeof project.tags === 'string'
                                                ? project.tags.split(',')
                                                : [];

                                        return tagsArray.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20 rounded-full"
                                            >
                                                {typeof tag === 'string' ? tag.trim() : tag}
                                            </span>
                                        ));
                                    })()}
                                </div>


                                <div className="flex items-center gap-6 justify-center md:justify-start text-gray-500 dark:text-gray-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="fluent:people-team-20-regular" className="text-lg text-blue-500 dark:text-blue-400" />
                                        <span>{project.team || 'Solo Project'}</span>
                                    </div>
                                    <div className="w-1 h-1 bg-gray-400 dark:bg-gray-700 rounded-full" />
                                    <div className="flex items-center gap-2">
                                        <Icon icon="mdi:code-tags" className="text-lg text-purple-500 dark:text-purple-400" />
                                        <span>Full Stack</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {isPreview && Array.isArray(projects) && projects.length > 1 && (
                    <div className="flex justify-center mt-20 relative z-30">
                        {/* Optional: Add Dots Indicator */}
                        <div className="absolute -top-10 flex gap-2">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-400/50 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => navigate('/projects')}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl transition duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-blue-500/50"
                        >
                            View All Projects
                            <Icon icon="mdi:arrow-right" className="text-xl" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
