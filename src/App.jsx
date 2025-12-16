import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './Components/Nav';
import Home from './Components/Home';

import Skill from './Components/Skill';
import Journey from './Components/Journey';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import ContactPage from './Components/ContactPage';
import ProjectsPage from './Components/ProjectsPage';
import Footer from './Components/Footer';

function Portfolio() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Global Background Elements for Dark Mode */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 hidden dark:block">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <Nav />
      <div className="w-full relative z-10">
        <section id="home" className="min-h-screen w-full relative">
          <Home />
        </section>


        <section id="skill" className="min-h-screen w-full">
          <Skill />
        </section>
        <section id="journey" className="min-h-screen w-full">
          <Journey />
        </section>
        <section id="projects" className="min-h-screen w-full">
          <Projects isPreview={true} />
        </section>
        <section id="contact" className="min-h-screen w-full">
          <Contact />
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  )
}
