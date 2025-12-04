import React from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function Contact() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="contact">
            {/* Background Elements */}
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
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                    <span className="text-blue-600">Get</span> In Touch
                </h2>

                <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
                    Have a project in mind or just want to connect? I'm always open to discussing new ideas and opportunities.
                </p>

                <Link
                    to="/login"
                    className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1"
                >
                    <Icon icon="mdi:login" className="text-2xl" />
                    <span>Contact Me</span>
                </Link>

                <p className="text-gray-500 text-sm mt-12 max-w-md mx-auto">
                    The best way to ensure I see your message is through the portal.
                    It's quick, secure, and helps me keep track of all our conversations.
                </p>
            </motion.div>
        </div>
    );
}
