import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // App.jsx를 불러옴
import './index.css'        // (필요 없다면 이 줄만 지우세요)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)