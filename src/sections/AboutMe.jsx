import React, { useState } from 'react';
import '../styles/AboutMe.css';
import AboutModal from '../components/AboutModal';

const AboutMe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <section className="about-me-section" id="about">
      <div className="about-container">
        {/* 왼쪽: 프로필 사진 */}
        <div className="left-column">
          <div className="profile-image-slot">
            {/* ✅ public/image/AboutMe/me.jpg 파일이 있는지 확인하세요! */}
            <img src="/image/AboutMe/me.jpg" alt="프로필 사진" className="profile-photo" />
          </div>
          <div className="profile-info">
              <p className="p-name">이종선 / INFJ </p>
              <p className="p-mbti"> 1989. 11. 02</p>
          </div>
        </div>

        {/* 오른쪽: 텍스트 정보 */}
        <div className="right-column">
          <h2 className="section-title">1. ABOUT ME</h2>
          <p className="subtitle">THE SILENT RESONANCE</p>
          
          <div className="desc-group">
            <p className="eng-desc">A moment of stillness was not an end, but a time to face the essence. Emotions condensed in silence now find life through visuals. In the time others call late, I discovered the deepest colors. I now design fleeting emotions that move the heart, beyond mere technique.</p>
            <p className="kor-desc">한때의 멈춤은 저에게 끝이 아닌, 본질을 마주하는 시간이었습니다. 고요 속에서 응축된 감정들은 이제 영상을 통해 생명력을 얻습니다. 남드보다 늦었다고 말하는 시간 속에서, 저는 오히려 가장 깊은 색채를 발견했습니다. 이제 저는 단순한 기술을 넘어 마음을 움직이는 찰나의 감정을 설계합니다.</p>
          </div>
          
          <button className="btn-read-more" onClick={()=>setIsModalOpen(true)}>
            # READ MORE ABOUT ME
            <span>+</span>
          </button>
        </div>
      </div>
      <AboutModal
          isOpen={isModalOpen}
          onClose={()=>setIsModalOpen(false)}
      />
    </section>
  );
};

export default AboutMe;