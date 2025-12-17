import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: 'mdi:linkedin',
            url: 'https://www.linkedin.com/in/jasvanth-s-55400b37a'
        },
        {
            name: 'GitHub',
            icon: 'mdi:github',
            url: 'https://github.com/Jasvanth78?tab=repositories'
        },
        {
            name: 'Email',
            icon: 'mdi:email',
            url: 'mailto:mailtojasvanth88@gmail.com'
        }
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative bg-white/80 dark:bg-black/20 backdrop-blur-lg border-t border-gray-200 dark:border-neutral-900/40 mt-20 overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">


                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <div className="flex items-center gap-2">
                            <Icon icon="mdi:code-braces" className="text-3xl text-blue-600 dark:text-blue-500" />
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Jasvanth
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                            Building digital experiences that blend design and technology.
                        </p>
                    </div>


                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            {[
                                { name: 'Home', id: 'home' },
                                { name: 'Skills', id: 'skill' },
                                { name: 'Journey', id: 'journey' },
                                { name: 'Projects', id: 'projects' },
                                { name: 'Contact', id: 'contact' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById(link.id);
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm text-left"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gray-100 dark:bg-white/5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 transform hover:scale-110"
                                    aria-label={link.name}
                                >
                                    <Icon icon={link.icon} className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-500 text-sm text-center md:text-left">
                        © {currentYear} Jasvanth. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
                    >
                        Back to Top
                        <Icon
                            icon="mdi:arrow-up"
                            className="text-lg group-hover:-translate-y-1 transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
