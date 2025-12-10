import React, { useState, useEffect } from 'react'
import API_BASE_URL from '../config';
import { Reveal } from './Reveal';
import { Icon } from '@iconify/react';
import LogoLoop from '../T.Components/Skillsloop';
import {
    SiReact, SiTailwindcss,
    SiJavascript, SiHtml5,
    SiNodedotjs, SiExpress, SiMongodb, SiMysql,
    SiGit, SiDocker, SiPostman,
    SiCanva,
    SiRender,
    SiVercel
} from 'react-icons/si';



const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiJavascript />, title: "Javascript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiHtml5 />, title: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    // { node: <SiCss />, title: "CSS", href: "https://tailwindcss.com" },

];

const backendLogos = [
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiExpress />, title: "Express", href: "https://expressjs.com" },
    { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiMysql />, title: "MySQL", href: "https://www.postgresql.org" },

];

const toolsLogos = [
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
    { node: <SiPostman />, title: "Postman", href: "https://www.postman.com" },
    { node: <SiCanva />, title: "Canva", href: "https://www.canva.com" },
    { node: <SiRender />, title: "Render", href: "https://render.com" },
    { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
    // { node: <SiVisualstudiocode />, title: "VS Code", href: "https://code.visualstudio.com" },
];

export default function Skill() {
    const [frontendSkills, setFrontendSkills] = useState([]);
    const [backendSkills, setBackendSkills] = useState([]);
    const [toolsSkills, setToolsSkills] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsExpanded(true);
            } else {
                setIsExpanded(false);
            }
        };


        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/skills`)
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(skill => ({
                    src: skill.image,
                    alt: skill.name,
                    title: skill.name,
                    category: skill.category || 'frontend' || 'backend' || 'tools'
                }));

                setFrontendSkills([...techLogos, ...formatted.filter(s => s.category === 'frontend')]);
                setBackendSkills([...backendLogos, ...formatted.filter(s => s.category === 'backend')]);
                setToolsSkills([...toolsLogos, ...formatted.filter(s => s.category === 'tools')]);
            })
            .catch(err => {
                console.error('Error fetching skills:', err);

                setFrontendSkills(techLogos);
                setBackendSkills(backendLogos);
                setToolsSkills(toolsLogos);
            });
    }, []);

    const SkillCard = ({ item }) => (
        <div className="group relative flex flex-col items-center justify-center w-28 h-32 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-2 cursor-pointer overflow-hidden">

            {/* Inner Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 mb-3 opacity-90 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                {item.node ? (
                    <div className="text-4xl text-gray-300 group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-md">{item.node}</div>
                ) : (
                    <img src={item.src} alt={item.alt} className="w-10 h-10 object-contain drop-shadow-md" />
                )}
            </div>

            <span className="relative z-10 text-[11px] font-bold text-gray-400 group-hover:text-white tracking-widest uppercase text-center transition-colors duration-300">
                {item.title}
            </span>
        </div>
    );

    const renderSkillSection = (title, skills, direction = 'left') => {
        const parts = title.split(' ');
        const firstPart = parts.slice(0, -1).join(' ');
        const lastPart = parts[parts.length - 1];

        return (
            <div className="mb-8">
                <h3 className="text-xl font-bold text-center mb-6">
                    <span className="text-blue-500 text-2xl">{firstPart}</span>{' '}
                    <span className=" text-white text-2xl">{lastPart}</span>
                </h3>
                <div className="relative w-full max-w-7xl mx-auto">
                    <div className="relative w-full flex items-center justify-center" style={{ height: '160px', overflow: 'hidden' }}>
                        <div className="w-full mask-linear-fade">
                            <LogoLoop
                                logos={skills}
                                speed={35}
                                direction={direction}
                                logoHeight={140}
                                gap={24}
                                hoverSpeed={10}
                                scaleOnHover={false}
                                fadeOut={true}
                                fadeOutColor="#000000"
                                ariaLabel={`${title} logos`}
                                renderItem={(item) => <SkillCard item={item} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const allSkills = [...frontendSkills, ...backendSkills, ...toolsSkills];

    return (
        <div className="text-white w-full py-20 pb-40 relative group/section">
            <div className="relative w-full max-w-6xl mx-auto min-h-[600px] transition-all duration-500">
                <Reveal width="100%">
                    <div className="flex justify-center mb-16">

                    </div>

                    {!isExpanded ? (
                        <>
                            {renderSkillSection('Frontend Development', frontendSkills, 'left')}
                            {renderSkillSection('Backend Development', backendSkills, 'right')}
                            {renderSkillSection('Tools & Others', toolsSkills, 'left')}
                        </>
                    ) : (
                        <div className="animate-fadeIn flex flex-col gap-12 pb-20">

                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-bold text-center mb-8">
                                    <span className="text-blue-500 text-2xl">Frontend</span>{' '}
                                    <span className=" text-white text-2xl">Development</span>
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
                                    {frontendSkills.map((skill, index) => (
                                        <SkillCard key={`front-${index}`} item={skill} />
                                    ))}
                                </div>
                            </div>


                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-bold text-center mb-8">
                                    <span className="text-blue-500 text-2xl">Backend</span>{' '}
                                    <span className=" text-white text-2xl">Development</span>
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center place-content-center">
                                    {backendSkills.map((skill, index) => (
                                        <SkillCard key={`back-${index}`} item={skill} />
                                    ))}
                                </div>
                            </div>


                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-bold text-center mb-8">
                                    <span className="text-blue-500 text-2xl">Tools</span>{' '}
                                    <span className=" text-white text-2xl">& Others</span>
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
                                    {toolsSkills.map((skill, index) => (
                                        <SkillCard key={`tool-${index}`} item={skill} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Reveal>
            </div>


            <div
                className={`absolute top-4 right-4 md:right-10 cursor-pointer transition-all duration-500 z-30 flex items-center gap-3 group/btn ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover/section:opacity-100'}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="relative flex items-center justify-center">
                    <div className="absolute  rounded-full blur opacity-40 group-hover/btn:opacity-70 transition-opacity duration-300 hover:opacity-70"></div>
                    <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-full px-3 py-3 flex items-center gap-3 transition-all duration-300 group-hover/btn:border-cyan-500/60 group-hover/btn:bg-black/60">
                        <span className="text-2xl text-cyan-400">
                            {isExpanded ? <Icon icon="ic:round-arrow-drop-up" className='text-1xl' /> : <Icon icon="ic:round-arrow-drop-down" className='text-1xl' />}
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}
