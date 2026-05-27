import React from 'react';
import Navbar from '../components/Navbar.jsx'; 
import Intro from '../sections/Intro.jsx';
import AboutVideo from '../sections/AboutVideo.jsx';
import AboutMe from '../sections/AboutMe.jsx';
import Skills from '../sections/Skills.jsx';
import Projects from '../sections/Projects.jsx';
import Contact from '../sections/Contact.jsx';
import SoulSpirit from '../components/SoulSpirit';

import '../styles/main.css'; 



function Home() {
  
  return (
    <div className="portfolio-container">
      <main>
        <Intro />
        <AboutVideo />
        <AboutMe />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default Home;