import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Projects from './Projects';

export default function ProjectsPage() {
    return (
        <div className="min-h-screen text-gray-900 dark:text-white relative overflow-hidden flex flex-col transition-colors duration-300">
            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-20 p-6">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Icon icon="mdi:arrow-left" className="text-xl" />
                    <span>Back to Home</span>
                </Link>
            </nav>

            <div className="flex-1 relative z-10">
                <Projects isPreview={false} />
            </div>
        </div>
    );
}
