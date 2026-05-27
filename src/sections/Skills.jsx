import React, { useState } from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, targetIdx: null });

  const skillData = [
    { icon: "fa-solid fa-clapperboard", title: "VIDEO EDITING", list: ["컷 편집", "자막 및 텍스트 애니메이션", "색보정 (Color Grading)", "사운드 편집", "화면 전환 효과"], tool: "Premiere Pro" },
    { icon: "fa-solid fa-wand-magic-sparkles", title: "MOTION GRAPHICS", list: ["텍스트 애니메이션", "인트로 영상제작", "간단한 모션그래픽", "자막 모션 효과", "로고 모션 기초 작업"], tool: "After Effects" },
    { icon: "fa-solid fa-palette", title: "DESIGN", list: ["상세페이지 디자인", "배너 및 카드뉴스 디자인", "썸네일 디자인", "이미지 보정 및 합성", "영상 그래픽 제작"], tool: "Photoshop / Illustrator" },
    { icon: "fa-solid fa-code", title: "WEB", list: ["HTML / CSS", "JAVASCRIPT / jQuery", "웹사이트 퍼블리싱", "기본적인 인터랙션 구현"], tool: "VS Code" }
  ];

  // 3D 틸트 핸들러
  const handleMouseMove = (e, idx) => {
    if (activeIndex === idx) return; // 뒤집힌 상태에선 틸트 중지
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTilt({
      x: (centerY - y) / 10, // 기울기 강도
      y: (x - centerX) / 10,
      targetIdx: idx
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0, targetIdx: null });

  return (
    <section id="skills" className="skills-section">
      <div className="video-container">
        <video autoPlay muted loop playsInline id="bg-video">
          <source src="/video/3page.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      <div className="skills-container">
        <h2 className="section-title">2. SKILLS</h2>
        <div className="skills-grid">
          {skillData.map((skill, idx) => (
            <div 
              key={idx} 
              className={`skill-card ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => { setActiveIndex(activeIndex === idx ? null : idx); resetTilt(); }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={resetTilt}
              style={{
                transform: tilt.targetIdx === idx && activeIndex !== idx
                  ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
                  : 'none'
              }}
            >
              <div className="card-inner">
                {/* 앞면 */}
                <div className="skill-front">
                  <i className={`${skill.icon} front-main-icon`}></i>
                  <h3 dangerouslySetInnerHTML={{ __html: skill.title }}></h3>
                  <span className="plus-icon">+</span>
                </div>

                {/* 뒷면: 15% | 70% | 15% 비율 */}
                <div className="skill-back">
                  <div className='skill-back-header'>
                    <i className={`${skill.icon} back-main-icon`}></i>
                    <h3 dangerouslySetInnerHTML={{ __html: skill.title }}></h3>
                  </div>
                  <div className="divider-line"></div>
                  <ul className="skill-list">
                    {skill.list.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <div className="divider-line"></div>
                  <p className="skill-tool">tool : {skill.tool}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;