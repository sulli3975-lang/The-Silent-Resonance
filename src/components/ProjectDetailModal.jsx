import React, { useState, useEffect } from 'react';
import '../styles/ProjectDetailModal.css';

const ProjectDetailModal = ({ isOpen, type, onClose }) => {
  // 🎬 4번 캠페인 프로젝트를 위한 상태 관리
  const [selectedVideo, setSelectedVideo] = useState('/video/main-project-4/video-1min.mp4'); 
  const [isExpanded, setIsExpanded] = useState(false); // 영상 대화면 확장 여부

  // 🔒 [1번 해결] 각각의 모달창이 켜질 때 메인 페이지 배경 스크롤 완벽 고정
  useEffect(() => {
    if (isOpen) {
      // 현재 메인 화면의 스크롤 위치를 픽셀 단위로 기억
      const scrollY = window.scrollY || window.pageYOffset;
      
      // 메인 페이지(body) 전체를 화면에 fixed로 박제
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll'; // 스크롤바가 빠지면서 좌우 꿀렁임 방지
    }

    // 모달이 완전히 다 닫힐 때(unmount) 원래 상태로 완벽 복구
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [isOpen]);

  // 모달이 닫히거나 프로젝트가 스위칭될 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setSelectedVideo('/video/main-project-4/video-1min.mp4');
      setIsExpanded(false);
    }
  }, [isOpen, type]);

  const handleVideoSelect = (videoPath) => {
    if (selectedVideo === videoPath && isExpanded) {
      setIsExpanded(false);
    } else {
      setSelectedVideo(videoPath);
      setIsExpanded(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="common-modal active" onClick={onClose}>
      <div className="modal-content glass-Detail-card" onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        
        {/* ========================================================
            📱 1. project1 : 유기동물 통합 플랫폼 (PET CONNECT)
           ======================================================== */}
        {type === 'project1' && (
          <div className="project-detail-layout type-pet">
            <div className="detail-visual-zone">
              <div className="mockup-phone-frame">
                <video src="/video/main-project-1/pet-app.mp4" autoPlay loop muted playsInline className="mockup-media" />
              </div>
            </div>
            
            {/* 💡 [3번 해결] Flex 정렬을 위해 텍스트 묶음 랩핑 완료 */}
            <div className="detail-info-zone">
              <div className="detail-text-content-wrapper">
                <span className="detail-category">APP DESIGN</span>
                <h2 className="detail-title">PET CONNECT</h2>
                <div className="detail-summary-box">
                  "보호·실종·입양의 복잡한 과정을 하나의 호흡으로 연결한 반려동물 통합 플랫폼입니다."
                </div>
                <div className="detail-description">
                  <h3>PAIN POINT & GOAL</h3>
                  <p>유기동물 신고와 실종 찾기 과정에서의 파편화된 정보를 단일화하고 원스톱 프로세스를 구축하고자 했습니다.</p>
                  <h3>KEY FEATURE</h3>
                  <p>→ 위치 기반 실종 동물 실시간 알림 서비스</p>
                  <p>→ 직관적인 UI를 통한 유기신고 접수 간소화</p>
                </div>
              </div>

              <a href="https://www.figma.com/proto/HnTbntRRwghdUNXrBxi9VS/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=18-73&starting-point-node-id=18%3A73&t=Vnnwyn0rhSBHjsvE-1" className="detail-btn link-btn" target="_blank" rel="noopener noreferrer">
                <span className="btn-icon">❖</span> VIEW FIGMA PROTOTYPE
              </a>
            </div>
          </div>
        )}

        {/* ========================================================
            💐 2. project2 : 시들지 않는 선물 (Beyond the Light)
           ======================================================== */}
        {type === 'project2' && (
          <div className="project-detail-layout type-flower">
            <div className="detail-visual-zone scroll-mockup-box">
              <img src="/video/main-project-2/project-2.gif" alt="Flower Detail" className="scroll-inner-media" />
            </div>
            
            {/* 💡 [3번 해결] 내용물이 뭉치거나 튀지 않게 정렬 랩핑 완료 */}
            <div className="detail-info-zone">
              <div className="detail-text-content-wrapper">
                <span className="detail-category">GRAPHIC DESIGN</span>
                <h2 className="detail-title">CENTER PROJECT : Beyond the Light</h2>
                <div className="detail-summary-box">
                  "빛의 경계를 넘어 시들지 않는 영원의 가치를 시각화한 모션 그래픽 및 브랜딩 웍스입니다."
                </div>
                <div className="detail-description">
                  <h3>CONCEPT</h3>
                  <p>어둠 속에서 가장 밝게 빛나는 오브제를 통해 프리미엄 브랜드 감성을 왜곡 없이 전달하고자 했습니다.</p>
                  <h3>DESIGN STRATEGY</h3>
                  <p>→ 매끄러운 3D 질감 표현과 하이엔드 골드 메탈릭 텍스처 조합</p>
                  <p>→ 빛의 굴절과 반사를 극대화한 시네마틱 라이팅 연출</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            🌸 3. project3 : SOAP FLOWER (감성 상세페이지)
           ======================================================== */}
        {type === 'project3' && (
          <div className="project-detail-layout type-makgeolli">
            <div className="detail-visual-zone scroll-mockup-box">
              <img src="/image/project-3/01.png" alt="Soap Flower 01" className="scroll-inner-media" />
              <img src="/image/project-3/02.png" alt="Soap Flower 02" className="scroll-inner-media" />
              <img src="/image/project-3/03.png" alt="Soap Flower 03" className="scroll-inner-media" />
              <img src="/image/project-3/04.png" alt="Soap Flower 04" className="scroll-inner-media" />
              <img src="/image/project-3/05.png" alt="Soap Flower 05" className="scroll-inner-media" />
              <img src="/image/project-3/06.png" alt="Soap Flower 05" className="scroll-inner-media" />
              <img src="/image/project-3/07.png" alt="Soap Flower 05" className="scroll-inner-media" />
            </div>
            
            {/* 💡 [3번 해결] 완벽한 바닥 매칭 정렬 랩핑 완료 */}
            <div className="detail-info-zone">
              <div className="detail-text-content-wrapper">
                <span className="detail-category">WEB DESIGN</span>
                <h2 className="detail-title">SOAP FLOWER 상세페이지</h2>
                <div className="detail-summary-box">
                  "은은한 자연의 향과 고급스러운 톤앤매너를 담아낸 프리미엄 소프플라워 상세페이지입니다."
                </div>
                <div className="detail-description">
                  <h3>MARKETING POINT</h3>
                  <p>단순한 상품 정보 나열을 넘어 제품의 헤리티지와 무드를 직관적으로 느낄 수 있도록 감성 스토리텔링을 적용했습니다.</p>
                  <h3>VISUAL LAYOUT</h3>
                  <p>→ 여백의 미를 살린 미니멀리즘 뷰티 레이아웃 구성</p>
                  <p>→ 제품 원재료의 청량함을 전하는 고해상도 매거진 스타일 스타일링</p>
                </div>
              </div>
              
              <a href="https://resplendent-kringle-8ebdbc.netlify.app" className="detail-btn link-btn soap-flower-btn" target="_blank" rel="noopener noreferrer">
                <span className="btn-icon">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="50" cy="50" r="4.5" fill="currentColor"/>
                    <path d="M50,14 C35,25 25,35 25,50 C25,65 35,75 50,86 C65,75 75,65 75,50 C75,35 65,25 50,14 Z"/>
                    <path d="M14,50 C25,35 35,25 50,25 C65,25 75,35 86,50 C75,65 65,75 50,75 C35,75 25,65 14,50 Z" opacity="0.7"/>
                  </svg>
                </span> 
                VIEW LIVE WEBSITE
              </a>
            </div>
          </div>
        )}

        {/* ========================================================
            🎬 4. project4 : THE DOOR (단절의 세계 캠페인 영상)
           ======================================================== */}
        {type === 'project4' && (
          <div className={`project-detail-layout type-campaign ${isExpanded ? 'sidebar-collapsed' : ''}`}>
            
            {/* 왼쪽 영상 구역 */}
            <div className="detail-visual-zone">
              <div className="campaign-player-frame">
                <video className="campaign-media" 
                       src={selectedVideo} controls autoPlay muted playsInline 
                       key={selectedVideo} 
                       poster='/image/project-4/02.png'
                />
              </div>
              
              {/* 3단 타임라인 버튼 */}
              <div className="campaign-duration-selector">
                <button 
                  className={selectedVideo.includes('/60.mp4') ? 'active' : ''} 
                  onClick={() => handleVideoSelect('/video/main-project-4/60.mp4')}
                >
                  1분 영상
                </button>
                <button 
                  className={selectedVideo.includes('/180.mp4') ? 'active' : ''} 
                  onClick={() => handleVideoSelect('/video/main-project-4/180.mp4')}
                >
                  3분 영상
                </button>
                <button 
                  className={selectedVideo.includes('/300.mp4') ? 'active' : ''} 
                  onClick={() => handleVideoSelect('/video/main-project-4/300.mp4')}
                >
                  5분 영상
                </button>
              </div>
            </div>

            {/* 💡 [2번 해결] PC 풀모드 전용 세로형 open 버튼 (CSS에서 모바일일 땐 숨김처리) */}
            {isExpanded && (
              <button className="sidebar-open-toggle-btn pc-only-toggle" onClick={() => setIsExpanded(false)}>
                <span>│&lt;</span>
                <span>o</span>
                <span>p</span>
                <span>e</span>
                <span>n</span>
              </button>
            )}
            
            {/* 💡 [2번 해결] 창모드/모바일 전용 하단 와이드 오픈 버튼 (영상 밑에서 업 애니메이션으로 등장) */}
            {isExpanded && (
              <button className="mobile-bottom-open-btn" onClick={() => setIsExpanded(false)}>
                ▲ CONTENT OPEN (내용 보기)
              </button>
            )}
            
            {/* 오른쪽 내용 정보 구역 */}
            <div className="detail-info-zone">
              <div className="detail-text-content-wrapper">
                <span className="detail-category">TEAM PROJECT</span>
                <h2 className="detail-title">THE DOOR : 단절의 세계</h2>
                <div className="detail-summary-box">
                  "우리는 연결되었는가, 혹은 격리되었는가." 스마트폰 화면 속에 중독된 현대인들의 현실을 고발하는 공익 캠페인 영상입니다.
                </div>
                <div className="detail-description">
                  <h3>CONCEPT & PURPOSE</h3>
                  <p>차가운 블루라이트에 갇혀 진짜 일상을 잃어버린 사람들의 심리적 모순과 단절을 감각적인 미장센으로 표현하고자 기획되었습니다.</p>
                  <h3>KEY STRATEGY</h3>
                  <p><strong>→ Fast & Match Cut:</strong> 도파민 중독의 순간들을 리드미컬한 패스트 컷 연출</p>
                  <p><strong>→ UI Overlay Effect:</strong> 스마트폰 인터페이스가 인물의 현실 시야를 감금하는 연출 효과</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectDetailModal;