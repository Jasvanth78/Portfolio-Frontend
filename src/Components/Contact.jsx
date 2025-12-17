import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function Contact() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="contact">
            
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl w-full text-center relative z-10"
            >
                <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                    <span className="text-blue-600 dark:text-blue-400">Get</span> In Touch
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
                    Have a project in mind or just want to connect? I'm always open to discussing new ideas and opportunities.
                </p>

                <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white dark:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-600/25 transform hover:-translate-y-1"
                >
                    <Icon icon="mdi:email-outline" className="text-2xl" />
                    <span>Contact Me</span>
                </Link>

                <p className="text-gray-600 dark:text-gray-400 text-sm mt-12 max-w-md mx-auto">
                    Click the button above to send me a message directly.
                    I usually respond within 24 hours.
                </p>
            </motion.div>
        </div>
    );
}
