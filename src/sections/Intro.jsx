import React from 'react';
import '../styles/Intro.css';

const Intro = () => {
  return (
    <section id="intro" className="section first-page intro-section">
      {/* 💡 영상 컨테이너 클래스 지정 */}
      <div className="video-container hero-video">
        <video autoPlay muted loop playsInline id="bg-video">
          <source src="/video/1page.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>
      
      {/* 💡 라이트 모드에서 사라질 텍스트 그룹 클래스 추가 */}
      <div className="hero-section intro-text-group">
        <div className="title-group">
          <a href="#about-video" className="about-video">
            <h1 className="main-name">LEE JONG SEON</h1>
            <h2 className="sub-title">VISUAL STORY DESIGNER</h2>
            <p className="description">I DESIGN EMOTIONS THROUGH VISUALS</p>
          </a>
        </div>
      </div>
      
      <div className="fixed-glass-frame"></div>
    </section>
  );
};

export default Intro;