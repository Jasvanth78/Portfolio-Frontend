import React, { useState, useEffect } from 'react';
import Dock from '../T.Components/Navbar.jsx';
import { VscHome, VscAccount, VscTools, VscBriefcase, VscRepo, VscMail, VscColorMode } from 'react-icons/vsc';
import { GiJourney } from "react-icons/gi";
import { useTheme } from '../context/ThemeContext';

export default function Nav() {
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = ['home', 'about', 'skill', 'journey', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const items = [
    { icon: <VscAccount size={18} color="white" />, label: 'About', id: 'home' },
    { icon: <VscTools size={18} color="white" />, label: 'Skill', id: 'skill' },
    { icon: <GiJourney size={18} color="white" />, label: 'Journey', id: 'journey' },
    { icon: <VscRepo size={18} color="white" />, label: 'Projects', id: 'projects' },
    { icon: <VscMail size={18} color="white" />, label: 'Contact', id: 'contact' },
    {
      icon: <VscColorMode size={18} color="white" />,
      label: theme === 'light' ? 'Dark Mode' : 'Light Mode',
      id: 'theme',
      customOnClick: toggleTheme
    },
  ].map(item => ({
    ...item,
    onClick: item.customOnClick || (() => scrollToSection(item.id)),
    className: activeSection === item.id ? '!border-blue-500 !shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''
  }));

  const [dockConfig, setDockConfig] = useState({
    panelHeight: 68,
    baseItemSize: 50,
    magnification: 60,
    className: ''
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDockConfig({
          panelHeight: 50,
          baseItemSize: 35,
          magnification: 50,
          className: 'gap-2 px-2'
        });
      } else {
        setDockConfig({
          panelHeight: 68,
          baseItemSize: 50,
          magnification: 60,
          className: ''
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto">
      <div className="pointer-events-auto">
        <Dock
          items={items}
          panelHeight={dockConfig.panelHeight}
          baseItemSize={dockConfig.baseItemSize}
          magnification={dockConfig.magnification}
          className={dockConfig.className}
        />
      </div>
    </div>
  );
}
