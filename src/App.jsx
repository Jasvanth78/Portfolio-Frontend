import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './Components/Nav';
import Home from './Components/Home';

import AdminQuotes from './Components/Admin/AdminQuotes';
import AdminSkills from './Components/Admin/AdminSkills';

import Skill from './Components/Skill';
import Journey from './Components/Journey';
import Projects from './Components/Projects';
import Contact from './Components/Contact';

function Portfolio() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Nav />
      <div className="w-full">
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
          <Projects />
        </section>
        <section id="contact" className="min-h-screen w-full">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/quotes" element={<AdminQuotes />} />
        <Route path="/admin/skills" element={<AdminSkills />} />
      </Routes>
    </Router>
  )
}
