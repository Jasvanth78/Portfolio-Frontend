import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch(`${API_BASE_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col transition-colors duration-300">
            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-20 p-6">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <Icon icon="mdi:arrow-left" className="text-xl" />
                    <span>Back to Home</span>
                </Link>
            </nav>

            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl w-full"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                            <span className="text-blue-400">Contact</span> Me
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            I'm currently available for freelance work or full-time positions.
                            If you have a project that needs some creative touch, let's talk.
                        </p>
                    </div>

                    <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8 md:p-12 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="Enter your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                        placeholder="Enter your Email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                                    placeholder="Tell me about your project"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <span>Sending...</span>
                                ) : (
                                    <>
                                        <Icon icon="mdi:send" className="text-xl" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center"
                                >
                                    <p className="text-green-400">Message sent successfully! I'll get back to you soon.</p>
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center"
                                >
                                    <p className="text-red-400">Something went wrong. Please try again later.</p>
                                </motion.div>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
