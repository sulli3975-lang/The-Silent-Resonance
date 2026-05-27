import React, { useEffect, useRef } from 'react';
import '../styles/AboutVideo.css';

const AboutVideo = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            // 비디오 로드를 명시적으로 명령
            videoRef.current.load(); 
            
            // 재생 시도 (브라우저 에러 방지)
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("재생이 일시적으로 차단됨 (스크롤 전):", error);
                });
            }
        }
    }, []);

    return (
        <section className="video-section" id="about-video">
            <div className="about-page-video-wrap">
                <video 
                    ref={videoRef}
                    muted 
                    loop 
                    playsInline
                    preload="auto"
                    /* public/video/about/about.mp4 파일이 있는지 다시 확인! */
                    src="/video/About/About.mp4" 
                />
            </div>
        </section>
    );
};

export default AboutVideo;