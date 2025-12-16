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
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Brand & Copyright */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Jasvanth
                        </h3>
                        <p className="text-gray-500 text-sm">
                            © {currentYear} All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                                aria-label={link.name}
                            >
                                <Icon icon={link.icon} className="text-2xl" />
                            </a>
                        ))}
                    </div>

                    {/* Back to Top */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                        <span className="text-sm font-medium">Back to Top</span>
                        <Icon
                            icon="mdi:arrow-up"
                            className="text-xl group-hover:-translate-y-1 transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
