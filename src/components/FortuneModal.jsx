import React, { useState, useEffect } from 'react';
import styles from '../styles/FortuneModal.module.css'; // 경로 정확히 확인!
import { useFortune } from '../features/get-fortune/useFortune.js';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/Input.jsx';

export default function FortuneModal({ onClose }) {
   useEffect(() => {
  // 현재 스크롤 위치 저장
  const scrollY = window.scrollY;
  
  // body에 고정 스타일 부여
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';

  return () => {
    // 닫힐 때 원상복구
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };
}, []);

  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const { category, setCategory, fortune, isLoading, handleSubmit, reset } = useFortune();

  const zodiacTimes = [
    { name: "자시(子時)", detail: "23:00 ~ 01:00" },
    { name: "축시(丑時)", detail: "01:00 ~ 03:00" },
    { name: "인시(寅時)", detail: "03:00 ~ 05:00" },
    { name: "묘시(卯時)", detail: "05:00 ~ 07:00" },
    { name: "진시(辰時)", detail: "07:00 ~ 09:00" },
    { name: "사시(巳時)", detail: "09:00 ~ 11:00" },
    { name: "오시(午時)", detail: "11:00 ~ 13:00" },
    { name: "미시(未時)", detail: "13:00 ~ 15:00" },
    { name: "신시(申時)", detail: "15:00 ~ 17:00" },
    { name: "유시(酉時)", detail: "17:00 ~ 19:00" },
    { name: "술시(戌時)", detail: "19:00 ~ 21:00" },
    { name: "해시(亥時)", detail: "21:00 ~ 23:00" },
    { name: "모름", detail: "시간을 모름" }
  ];

  const handleDeepSubmit = () => {
    if (!birthDate || !category) return alert("날짜와 궁금한 점은 적어야 천기를 읽을 것 아니냐!");
    handleSubmit(`[태어난 날: ${birthDate}] [태어난 시각: ${birthTime || '모름'}] [분야: ${category}]`);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.glassCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeX} onClick={onClose}>×</button>
        
        {!fortune ? (
          <>
            <h1 className={styles.title}>영묘한 신령 운세</h1>
            <p className={styles.subtitle}>인간아, 네가 태어난 때를 적어 하늘의 뜻을 물어보아라.</p>
            <div className={styles.inputContainer}>
              <div className={styles.field}>
                <label className={styles.label}>태어난 날짜</label>
                <input type="date" className={styles.dateInput} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>태어난 시(時)</label>
                <select className={styles.dateInput} value={birthTime} onChange={(e) => setBirthTime(e.target.value)}>
                  <option value="">태어난 시를 선택하라</option>
                  {zodiacTimes.map((t) => <option key={t.name} value={t.name}>{t.name} ({t.detail})</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>무엇이 궁금하느냐</label>
                <Input className={styles.dateInput}value={category} onChange={(e) => setCategory(e.target.value)} placeholder="예: 재물운, 연애운" />
              </div>
              <Button className={styles.Button} onClick={handleDeepSubmit} disabled={isLoading}>{isLoading ? '천기를 읽는 중...' : '하늘의 뜻 확인하기'}</Button>
            </div>
          </>
        ) : (
          <div className={styles.result}>
            <h2>🐺 신령님의 전언 🐺</h2>
            <p className={styles.fortuneText}>{fortune}</p>
            <Button className={styles.Button} onClick={reset}>다시 물어보기</Button>
          </div>
        )}
      </div>
    </div>
  );
}