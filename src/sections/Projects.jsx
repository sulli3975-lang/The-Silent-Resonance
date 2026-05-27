import React, { useState } from 'react';
import '../styles/Projects.css'; // 각 섹션별 분리된 CSS 로드
import ImageGridModal from '../components/ImageGridModal';
import VideoPlayerModal from '../components/VideoPlayerModal';
import ProjectDetailModal from '../components/ProjectDetailModal';

const Projects = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [centerId, setCenterId] = useState('project2');
  const [projectsData] = useState([
    { id: 'project1', category: "APP DESIGN", title: "PET CONNECT", desc: "반려동물 통합 플랫폼", folder: "project-1", images: ["01.png", "02.png", "03.png", "04.png"] },
    { id: 'project2', category: "GRAPHIC", title: "CENTER PROJECT", desc: "Beyond the Light", folder: "project-2", images: ["01.png", "02.png"] },
    { id: 'project3', category: "WEB DESIGN", title: "SOAP FLOWER", desc: "감성 상세페이지", folder: "project-3", images: ["01.png"] },
    { id: 'project4', category: "TEAM PROJECT", title:"THE DOOR: 단절의세계", desc:"CAMPAIGN VIDEO", folder:"project-4", images:["01.png"]}
  ]);   
     
  const closeModal = () => setActiveModal(null);

  // 카드를 클릭했을 때 해당 카드를 중앙(Center)으로 배치하는 함수
  const handleCardClick = (id) => {
    setCenterId(id);
  };

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/image/4page2.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h1 className="project-title">3. PROJECTS</h1>

        {/* 1️⃣ 상단 고정 그리드 카드 영역 */}
        <div className="fixed-grid-container">
          <div className="small-card glass-card">
            <span className="category-1">PHOTOSHOP / ILLUSTRATOR</span>
            <h3>VISUAL STORYTELLING</h3>
            <button className="view-btn" onClick={() => setActiveModal('image')}>View Details</button>
          </div>
          <div className="small-card glass-card">
            <span className="category-1">PREMIERE PRO / AFTER EFFECTS</span>
            <h3>MOTION EXPERIENCE</h3>
            <button className="view-btn" onClick={() => setActiveModal('video')}>View Details</button>
          </div>
        </div>

        {/* 2️⃣ 하단 3D 큐브 로테이션 프로젝트 카드 영역 */}
        <div className="project-list-container">
          {projectsData.map((project) => {
            const centerIndex = projectsData.findIndex(item => item.id === centerId);
            const currentIndex = projectsData.findIndex(item => item.id === project.id);
            const total = projectsData.length;

            let positionClass = '';

            // 순환 구조 계산 로직을 통한 클래스 부여
            if (currentIndex === centerIndex) {
              positionClass = 'center-card';
            } else if (currentIndex === (centerIndex - 1 + total) % total) {
              positionClass = 'left-card';
            } else if (currentIndex === (centerIndex + 1) % total) {
              positionClass = 'right-card';
            } else {
              positionClass = 'hidden-card';
            }

            return (
              <div 
                key={project.id} 
                className={`large-card glass-card ${positionClass}`}
                onClick={() => handleCardClick(project.id)}
              >
                {/* 텍스트 정보 구역 */}
                <div className="card-info">
                  <span className="category-2">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  
                  <button 
                    className="view-btn" 
                    onClick={(e) => {
                      e.stopPropagation(); // 💡 부모 카드의 회전 클릭 이벤트와 겹치지 않도록 차단
                      setActiveModal(project.id); // 해당 프로젝트 ID 모달 트리거
                    }}
                  >
                    View details
                  </button>
                </div>

                {/* 하단 비주얼 이미지 구역 */}
                <div className="card-visual">
                  {project.images && project.images.map((imgName, imgIdx) => (
                    <img 
                      key={imgIdx} 
                      src={`/image/${project.folder}/${imgName}`} 
                      alt="project visual" 
                      className="visual-img" 
                    />
                  ))}
                </div> 
              </div>
            );
          })}
        </div>
      </div>

      {/* 팝업 모달 통합 매핑 라인 */}
      <ImageGridModal isOpen={activeModal === 'image'} onClose={closeModal} />
      <VideoPlayerModal isOpen={activeModal === 'video'} onClose={closeModal} />
      
      {/* 상세 프로젝트 케이스스터디 모달 공용 슬롯 */}
      <ProjectDetailModal 
        isOpen={activeModal !== null && activeModal.startsWith('project')} 
        type={activeModal} 
        onClose={closeModal} 
      />
    </section>
  );
};

export default Projects;