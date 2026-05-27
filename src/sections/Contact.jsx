import React, { useEffect, useRef, useState } from 'react';
import '../styles/Contact.css'; 

const Contact = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  
  const [hideInitial, setHideInitial] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  
  // ✅ useState로 수정했습니다.
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const isLight = document.body.getAttribute('data-theme') === 'Light';
      setIsLightMode(isLight);
    };

    updateTheme();

    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    let fadeOutTimer, fadeInTimer;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // ✅ 상태(isLightMode)를 직접 참조하거나, 
        // 클로저 문제를 피하기 위해 보관된 값을 사용해야 합니다.
        const currentIsLight = document.body.getAttribute('data-theme') === 'Light';
        
        if (entry.isIntersecting && !currentIsLight) {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(err => console.log(err));
          }
          fadeOutTimer = setTimeout(() => setHideInitial(true), 3500);
          fadeInTimer = setTimeout(() => setShowFinal(true), 6500);
        } else if (!entry.isIntersecting) {
          clearTimeout(fadeOutTimer);
          clearTimeout(fadeInTimer);
          setHideInitial(false);
          setShowFinal(false);
        }
      });
    }, { threshold: 0.5 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      themeObserver.disconnect();
      observer.disconnect();
      clearTimeout(fadeOutTimer);
      clearTimeout(fadeInTimer);
    };
  }, []); // 의존성 배열을 비워두고, 내부에서 body 속성을 직접 확인하는 방식입니다.

 return (
   <section id="contact" ref={sectionRef} className="contact-section">
    {/* 💡 라이트 모드이면 영상 컴포넌트가 아예 생성되지 않음 */}
    {isLightMode ? null : (
      <video ref={videoRef} className="bg-video" muted playsInline>
        <source src="/video/5page.mp4" type="video/mp4" />
      </video>
    )}

      {/* 💡 isLightMode일 때 'light-mode-active' 클래스 추가 */}
      <div className={`contact-content-wrapper ${isLightMode ? 'light-mode-active' : ''}`}>
        
        <div className={`initial-layer ${!isLightMode && hideInitial ? 'fade-out' : ''}`}>
          <h1 className="initial-title">4. CONTACT</h1>
        </div>

        {/* 💡 라이트 모드면 'visible' 클래스를 강제로 붙임 */}
        <div className={`final-layer ${showFinal || isLightMode ? 'fade-in' : ''}`}>
          <h1 className="main-title">“Let’s Create Light Together”</h1>
          <div className="info-list">
            <div className="info-item"><i className="fas fa-envelope"></i> <span>9229a@NAVER.COM</span></div>
            <div className="info-item"><i className="fas fa-phone"></i> <span>010 - 3677 - 3675</span></div>
          </div>
          <p className="thanks-msg">"Thank you for watching."</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;