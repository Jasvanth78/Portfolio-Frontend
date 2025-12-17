import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
// import Particles from '../T.Components/HomeID';
import { motion, AnimatePresence } from 'motion/react';
import Quotes from './Quotes';
import img from '../assets/jasvanth1.png';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';

export default function Home() {
    const words = ["MERN Stack Developer", "Designer", "Content Creator"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useNavigate();
    const navigate = useNavigate(Contact);


    return (
        <div className="relative w-full min-h-screen overflow-hidden" id="home">
{/* 
            <div className="absolute inset-0 z-0 hidden light:block dark:visible">
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={300}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={80}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div> */}


            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-center w-full py-20 gap-20 md:gap-70">

                        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
                            <h1 className="text-gray-900 dark:text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                I'm <span className='text-blue-600 dark:text-blue-400'>Jasvanth</span>
                            </h1>

                            <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl h-[50px] flex items-center justify-center md:justify-start overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="block"
                                    >
                                        {words[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
                                I’m a fresher learning full-stack development, turning curiosity into code and ideas into impact.
                                Every bug I fix, every project I build, shapes my future.
                                I’m not at the top yet — but I’m on the rise.
                            </p>




                            <div className="flex gap-6 mt-1 justify-center md:justify-start">
                                <a href="https://www.linkedin.com/in/jasvanth-s-55400b37a target='_blank'" className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110">
                                    <Icon icon="mdi:linkedin" className="text-3xl" />
                                </a>
                                <a href="https://github.com/Jasvanth78?tab=repositories" target='_blank' className="text-gray-400 hover:text-white transition duration-300 transform hover:scale-110">
                                    <Icon icon="mdi:github" className="text-3xl" />
                                </a>
                                <a href="mailto:mailtojasvanth88@gmail.com" target='_blank' className="text-gray-400 hover:text-red-400 transition duration-300 transform hover:scale-110">
                                    <Icon icon="mdi:email" className="text-3xl" />
                                </a>
                            </div>


                            <div className="flex justify-center md:justify-start gap-4 mt-4">
                                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-blue-500/50 sm:py-3">
                                    <Icon icon="bitcoin-icons:share-filled" className='text-xl' /> Get In Touch
                                </button>

                                <button onClick={() => window.open('https://drive.google.com/file/d/1FXmnknxxVOH5JkpP9347dPuNOaAFDthI/view', '_blank')} className="bg-white hover:bg-gray-200 text-gray-900 py-2 px-6 rounded-md transition duration-300 cursor-pointer flex items-center gap-2 shadow-lg hover:shadow-white/50">
                                    <Icon icon="line-md:downloading-loop" className='text-xl' /> Resume
                                </button>


                            </div>
                        </div>


                        <div className="flex justify-center md:justify-end">
                            <div className="relative group">
                                <div className=" bg-gradient-to-r from-blue-500 to-white rounded-xl blur-xl opacity-45 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
                                <motion.img
                                    src={img}
                                    alt="Jasvanth"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative w-80 h-80 md:w-96 md:h-96 object-cover object-top rounded-2xl shadow-sm hover:scale-105 transition duration-300"
                                />
                            </div>
                        </div>


                    </div>
                </Reveal>
            </div>
        </div>
    );
}
