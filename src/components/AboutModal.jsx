import React, { useState, useEffect, useRef } from 'react'; // 💡 useEffect, useRef 임포트 완료!
import '../styles/AboutModal.css';

const AboutModal = ({ isOpen, onClose }) => {
  const [current, setCurrent] = useState(0);

  // 📌 튕김 방지용 스크롤 Y축 좌표 비밀 금고 생성
  const savedScrollY = useRef(0);

  const slides = [
    {
      title: "1. ORIGIN",
      subtitle: "멈춤의 시간 속에서 찾아낸 선명한 지향점",
      text: "쉼 없이 달려오던 걸음을 잠시 멈추었을 때, 비로소 제가 진정으로 갈망하던 목소리가 들리기 시작했습니다. 외부의 소음이 사라진 고요한 성찰의 시간은 방황이 아닌, 나만의 감각을 채우는 응축의 과정이었습니다. 인생의 쉼표(Comma)를 통해 얻은 이 깊은 통찰은 저에게 새로운 프레임을 구성하는 에너지가 되었습니다. 가장 고요할 때 발견한 집요한 관찰력과 뜨거운 몰입을 바탕으로, 이제는 프레임 너머의 본질을 꿰뚫는 영상 언어를 통해 보는 이의 마음에 깊은 공명을 전하고자 합니다."
    },
    {
      title: "2. ATTITUDE",
      subtitle: "학습에 대한 정직함 & 디테일 집착",
      text: "빠른 훑기보다 깊은 이해를 지향합니다. 학습 속도가 남들보다 빠르지 않을지라도, 한 번 배운 기술은 원리부터 완벽히 내 것으로 만듭니다. 상태 관리 하나도 '왜' 그렇게 작동하는지 증명될 때까지 파고드는 이 정직한 속도가 결국 흔들리지 않는 결과물을 만든다고 믿습니다. 겉모양을 넘어 원리를 설계하는 개발자가 되겠습니다."
    },
    {
      title: "3. VISION",
      subtitle: "자기주도 문제 해결 & 든든한 동료",
      text: "모호한 요구사항 속에서도 기술적 해답을 찾아내는 나침반 같은 개발자가 되겠습니다. 제미나이(Gemini)와 같은 최신 AI 도구를 능숙하게 활용하여, 어떤 난관 앞에서도 스스로 길을 만들어내며 팀과 함께 성장하겠습니다. 회사의 서비스가 사용자의 손끝에서 가장 매끄럽게 작동하도록 끊임없이 기술을 연마하는 든든한 해결사가 되겠습니다."
    }
  ];

  // 🔒 배경 스크롤 락 및 원래 위치 정밀 복구 로직
  useEffect(() => {
    if (isOpen) {
      const currentScroll = window.scrollY || window.pageYOffset;
      savedScrollY.current = currentScroll; 
      
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      if (savedScrollY.current > 0) {
        window.scrollTo(0, savedScrollY.current);
      }
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);

  const handlePrev = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  // 💡 리액트 규칙: 모든 훅 선언이 끝난 직후에 탈출 조건문 배치
  if (!isOpen) return null;

  return (
    <div id="about-modal" className="common-modal type-about active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        
        {/* 슬라이더 바구니 */}
        <div className="modal-slider">
          {slides.map((slide, idx) => (
            <div key={idx} className={`slide ${current === idx ? 'active' : ''}`}>
              <h2 className="slide-title">{slide.title}</h2>
              <h3 className="slide-subtitle">{slide.subtitle}</h3>
              <p className="slide-text">{slide.text}</p>
            </div>
          ))}
        </div>

        {/* 좌우 화살표 */}
        <button className="prev-btn" onClick={handlePrev}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="next-btn" onClick={handleNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* 하단 도트 */}
        <div className="modal-dots">
          {slides.map((_, idx) => (
            <span 
              key={idx} 
              className={`dot ${current === idx ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutModal;