import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import { Reveal } from './Reveal';
import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import Quotes from './Quotes';

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/about`)
      .then(res => res.json())
      .then(data => {
        const aboutData = Array.isArray(data) ? data[0] : data;
        setAbout(aboutData);
      })
      .catch(err => {
        console.error('Error fetching about data:', err);
        setAbout(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center" id="about">
        <Icon icon="line-md:loading-loop" className="text-6xl text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="about">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center md:justify-start"
            >
              {about?.image ? (
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-white rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                  <img
                    src={about.image.startsWith('http') ? about.image : `${API_BASE_URL}${about.image}`}
                    alt={about.title}
                    className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                  <Icon icon="solar:user-bold" className="text-8xl text-blue-400/30" />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {about?.title || 'About Me'}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {about?.bio || 'Loading...'}
              </p>

              {about?.highlights && about.highlights.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Highlights</h3>
                  {about.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Icon icon="solar:check-circle-bold" className="text-2xl text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-6">
                {about?.resumeUrl && (
                  <a
                    href={about.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-500/50"
                  >
                    <Icon icon="solar:download-bold" className="text-xl" />
                    Download Resume
                  </a>
                )}
                <a
                  href="#contact"
                  className="border border-gray-600 hover:border-blue-500 text-white hover:text-blue-400 px-8 py-3 rounded-lg font-semibold transition duration-300 flex items-center gap-2"
                >
                  <Icon icon="solar:arrow-right-bold" className="text-xl" />
                  Get In Touch
                </a>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <div className="mt-24">
          <Quotes />
        </div>
      </div>
    </div>
  );
}
