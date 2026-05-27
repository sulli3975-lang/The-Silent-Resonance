import React, { useState, useEffect, useRef } from 'react'; // 💡 useEffect, useRef 임포트 완료!
import { imageData } from '../data/ProjectData';
import '../styles/ImageGridModal.css'; 

const ImageGridModal = ({ isOpen, onClose }) => {
  // 💡 이중 모달(라이트박스)에서 현재 열린 이미지의 인덱스를 관리 (null이면 닫힘)
  const [viewIdx, setViewIdx] = useState(null);

  // 📌 튕김 방지용 스크롤 Y축 좌표 비밀 금고 생성
  const savedScrollY = useRef(0);

  // 🔒 배경 스크롤 락 및 원래 위치 정밀 복구 로직
  useEffect(() => {
    if (isOpen) {
      // 모달이 열리는 순간의 브라우저 스크롤 위치를 감지하여 금고에 박제
      const currentScroll = window.scrollY || window.pageYOffset;
      savedScrollY.current = currentScroll; 
      
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // 유령 튕김 현상 방지
    } else {
      // 모달이 완전히 닫히면 고정 스타일 해제
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // 금고에 백업해둔 원래 스크롤 좌표로 원래 위치 복구
      if (savedScrollY.current > 0) {
        window.scrollTo(0, savedScrollY.current);
      }
    }

    // 컴포넌트가 언마운트될 때를 위한 클린업 안전장치
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);

  // 💡 [리액트 규칙] 모든 useEffect 선언이 무조건 다 끝난 직후에 탈출 조건문이 와야 정상 작동합니다!
  if (!isOpen) return null;

  // ◀ 이전 이미지 이동 (처음 이미지에서 누르면 마지막 이미지로)
  const handlePrev = (e) => {
    e.stopPropagation(); // 부모 모달 닫힘 이벤트 방지
    setViewIdx((prev) => (prev === 0 ? imageData.length - 1 : prev - 1));
  };

  // ▶ 다음 이미지 이동 (마지막 이미지에서 누르면 처음 이미지로)
  const handleNext = (e) => {
    e.stopPropagation(); // 부모 모달 닫힘 이벤트 방지
    setViewIdx((prev) => (prev === imageData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="common-modal type-image active" onClick={onClose}>
      <div className="top-visual-content glass-image-card" onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2 className="modal-title">VISUAL STORYTELLING</h2>
        
        {/* 내부 스크롤이 발생하는 전용 매거진 그리드 영역 */}
        <div className="top-photo-grid">
          {imageData && imageData.map((img, index) => (
            /* 1단계: 외곽 카드 틀 (클릭 시 해당 인덱스로 라이트박스 오픈) */
            <div key={img.id} className="top-grid-item" onClick={() => setViewIdx(index)}>
              {/* 2단계: 이미지 크기를 잡아주는 안쪽 프레임 */}
              <div className="inner-frame">
                <img src={img.src} alt={`Project ${img.id}`} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔍 이중 모달: 라이트박스 레이어 */}
      {viewIdx !== null && (
        /* 💡 핵심 수정: 첫 번째 모달의 onClick={onClose}가 발동하지 않도록 e.stopPropagation()을 걸고, 
           오직 라이트박스 상태(viewIdx)만 null로 만들어 1중 모달 레이어는 유지시킵니다. */
        <div 
          className="lightbox-overlay" 
          onClick={(e) => {
            e.stopPropagation(); // 부모 모달(onClose)로 이벤트가 전파되는 것을 완벽히 차단!
            setViewIdx(null);    // 라이트박스만 닫기
          }}
        >
          {/* 닫기 버튼 */}
          <button className="lightbox-close" onClick={() => setViewIdx(null)}>&times;</button>
          
          {/* 왼쪽 화살표 */}
          <button className="nav-btn prev" onClick={handlePrev}>&#10094;</button>
          
          {/* 메인 이미지 콘텐츠 박스 */}
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={imageData[viewIdx].src} alt="enlarged" />
            <div className="lightbox-info">
              {viewIdx + 1} / {imageData.length}
            </div>
          </div>

          {/* 오른쪽 화살표 */}
          <button className="nav-btn next" onClick={handleNext}>&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default ImageGridModal;