import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const SoulSpirit = ({ onClick }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 화면 크기 내에서 위치 랜덤 생성
    const move = () => {
      setPos({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100)
      });
    };
    move();
    const interval = setInterval(move, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 20 }}
      style={{
        position: 'fixed', // 화면 기준 고정 (가장 중요)
        top: 0,
        left: 0,
        width: '70px',
        height: '70px',
        zIndex: 999999, // 다른 어떤 것보다 위에 배치
        cursor: 'pointer',
        background: 'radial-gradient(circle, rgba(233, 153, 153, 0.8) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'auto' // 클릭 가능하게 설정
      }}
    />
  );
};

export default SoulSpirit;