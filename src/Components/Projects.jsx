import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Reveal } from './Reveal';

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
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

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" id="projects">
            <Reveal>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
                        My <span className='text-blue-500'>Projects</span>
                    </h2>

                    <div className="flex flex-col gap-16">
                        {Array.isArray(projects) && projects.map((project, index) => (
                            <div
                                key={project._id || index}
                                className={`group relative bg-[#180228] rounded-3xl border border-gray-800 hover:border-blue-500 p-6 md:p-10 flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse text-right self-end' : 'md:flex-row text-left self-start'} gap-8 md:gap-12 items-center transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500 w-full md:w-[90%]`}
                            >

                                <div className="hidden md:flex items-center justify-center">
                                    <span className="text-8xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300">
                                        {index + 1}
                                    </span>
                                </div>


                                <div className="relative w-full md:w-[300px] h-[250px] shrink-0 rounded-xl overflow-hidden border border-white/10">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                    <img
                                        src={project.thumbnail || 'https://via.placeholder.com/400x250'}
                                        alt={project.title || 'Project'}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />

                                    <div className="md:hidden absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        <span className="text-blue-400 font-bold text-lg">#{index + 1}</span>
                                    </div>
                                </div>


                                <div className="flex-1 flex flex-col w-full">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {project.title || 'Untitled Project'}
                                        </h3>


                                        <div className="flex gap-3">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/5 hover:border-white/20"
                                                >
                                                    <Icon icon="mdi:github" className="text-xl" />
                                                    <span className="text-sm font-medium">Code</span>
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 transition-all border border-blue-500/20 hover:border-blue-500/40"
                                                >
                                                    <Icon icon="mdi:external-link" className="text-xl" />
                                                    <span className="text-sm font-medium">Live Demo</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                        {project.description || 'No description available.'}
                                    </p>


                                    <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-gray-800 pt-6">
                                        <div className="flex flex-wrap gap-2">
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
                                                        className="text-sm px-3 py-1 rounded-md bg-blue-500/5 text-blue-400/80 border border-blue-500/10"
                                                    >
                                                        {typeof tag === 'string' ? tag.trim() : tag}
                                                    </span>
                                                ));
                                            })()}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500 text-sm shrink-0">
                                            <Icon icon="fluent:people-team-20-regular" className="text-lg" />
                                            <span>{project.team || 'Solo Project'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
