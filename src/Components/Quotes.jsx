import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import API_BASE_URL from '../config';

export default function Quotes(props) {
    const [quotes, setQuotes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/quotes`)
            .then(res => res.json())
            .then(data => setQuotes(data))
            .catch(err => console.error('Error fetching quotes:', err));
    }, []);

    useEffect(() => {
        if (quotes.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % quotes.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [quotes]);

    if (quotes.length === 0) return <div className="absolute bottom-10 left-10 z-50 text-white">Creativity Is Loading......</div>;

    return (
        <div className={`w-full max-w-xs sm:max-w-sm bg-black/1 backdrop-blur-[4px] p-4 rounded-xl border border-white/10 overflow-hidden min-h-[120px] flex flex-col justify-center pointer-events-auto ${props.className || ''}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex flex-col gap-2 w-full mb-2"
                >
                    <p className="text-sm text-gray-200 italic">"{quotes[currentIndex].text}"</p>
                    <div className="flex items-center gap-3">
                        <img
                            src={quotes[currentIndex].image
                                ? `${API_BASE_URL}${quotes[currentIndex].image}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(quotes[currentIndex].author)}&background=random`}
                            alt={quotes[currentIndex].author}
                            className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 shrink-0 mt-8"
                        />
                        <h4 className="text-xs font-bold text-blue-400 mt-8">- {quotes[currentIndex].author}</h4>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex gap-1 self-end mt-1">
                {quotes.map((_, idx) => (
                    <motion.div
                        key={idx}
                        className={`h-1.5 rounded-full ${idx === currentIndex ? 'bg-blue-500' : 'bg-gray-600'}`}
                        animate={{ width: idx === currentIndex ? 20 : 6 }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
        </div>
    );
}
