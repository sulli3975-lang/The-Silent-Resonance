import React, { useState, useEffect, useRef } from 'react'; 
import { videoData } from '../data/ProjectData'; 
import '../styles/VideoPlayerModal.css'; 

const VideoPlayerModal = ({ isOpen, onClose }) => {
  const [currentVideo, setCurrentVideo] = useState(videoData ? videoData : null);
  
  // 💡 슬라이더 DOM과 스크롤 위치 금고 레퍼런스 생성
  const sliderRef = useRef(null);
  const savedScrollY = useRef(0); // 📌 [오류 해결] 빠져있던 스크롤 비밀 금고 선언 완료!

  // 🔒 1. 배경 스크롤 락 및 원래 위치 정밀 복구 로직
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 Y축 위치 정확히 측정 후 금고에 보관
      const currentScroll = window.scrollY || window.pageYOffset;
      savedScrollY.current = currentScroll; // 📌 [오타 해결] scrollY와 eurrentScroll 꼬인 부분 정상화!
      
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; 
    } else {
      // 모달이 닫히면 고정 스타일 리셋
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // 금고에 백업해둔 원래 스크롤 좌표로 튕김 없이 완벽 텔레포트
      if (savedScrollY.current > 0) {
        window.scrollTo(0, savedScrollY.current);
      }
    }

    // 컴포넌트 언마운트 시 안전 복구 브레이크
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);

  // 🔄 2. 썸네일 트랙 가로 마우스 휠 스크롤 인터랙션
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      // 썸네일 영역 위에서 휠을 굴릴 때 브라우저의 기본 세로 스크롤 동작 차단
      e.preventDefault(); 
      // 세로 휠 수치(deltaY)를 가로 스크롤 수치로 치환
      slider.scrollLeft += e.deltaY;
    };

    if (isOpen) {
      slider.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (slider) {
        slider.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isOpen]);

  // 💡 리액트 훅 규칙: 모든 useEffect 선언이 끝난 직후에 탈출 조건문 배치
  if (!isOpen || !currentVideo) return null;

  return (
    <div className="common-modal type-video active" onClick={onClose}>
      <div className="modal-content glass-video-card video-layout" onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2 className="modal-title">MOTION EXPERIENCE</h2>

        {/* 🎬 1. 비디오 플레이어 스크린 구역 */}
        <div className="main-video-container">
          <video key={currentVideo.src} controls autoPlay className="main-video">
            <source src={currentVideo.src} type="video/mp4" />
          </video>
        </div>

        {/* 🎞️ 2. 하단 썸네일 가로 트랙 트레이 (ref={sliderRef} 연결) */}
        <div 
          ref={sliderRef} 
          className="video-thumb-slider horizontal-scroll"
        >
          {videoData && videoData.map((video) => (
            <div 
              key={video.id} 
              className={`video-item ${currentVideo.id === video.id ? 'active' : ''}`}
              onClick={() => setCurrentVideo(video)}
            >
              <div className="video-thumb-frame">
                <img src={video.thumb} alt={`thumb ${video.id}`} loading="lazy" />
                <div className="play-icon">▶</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;