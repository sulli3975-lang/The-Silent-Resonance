import React, { useState, useEffect } from 'react';

// App.jsx에서 전달받은 toggleTheme 함수를 인자로 받습니다.
const Navbar = ({ toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      
      {/* 💡 로고 클릭 시 테마 변경 함수 실행 */}
      <div 
        className='navbar-logo' 
        onClick={toggleTheme} 
        style={{ cursor: 'pointer' }}
      >
        <img src="/image/Logo02.png" alt="로고" />
      </div>    
      
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#intro" className='underline-animation'>INTRO</a></li>
          <li><a href="#about" className='underline-animation'>ABOUT ME</a></li>
          <li><a href="#skills" className='underline-animation'>SKILLS</a></li>
          <li><a href="#projects" className='underline-animation'>PROJECTS</a></li>
          <li><a href="#contact" className='underline-animation'>CONTACT</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;