import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SoulSpirit from './components/SoulSpirit';
import FortuneModal from './components/FortuneModal'; // 모달 불러오기
import './App.css';

function App() {
  const [isFortuneOpen, setIsFortuneOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); 

  // 테마 토글 함수
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'Light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="portfolio-container">
      <SoulSpirit onClick={() => setIsFortuneOpen(true)} />
      <Navbar toggleTheme={toggleTheme} />
      <Home />
      {isFortuneOpen && (
        <FortuneModal onClose={() => setIsFortuneOpen(false)} />
      )}
    </div>
  );
}

export default App;