import React from 'react';
import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo-container">
        <div style={{
          background: '#008b45',
          color: 'white',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Leaf size={24} fill="currentColor" />
        </div>
        <div className="logo-text">
          FreshGuard<span>AI</span>
          <span className="logo-badge">BHX DSS</span>
        </div>
      </div>
      <nav>
        <ul className="nav-menu">
          <li><a href="#about" className="nav-link">Bối cảnh & Bài toán</a></li>
          <li><a href="#architecture" className="nav-link">Kiến trúc giải pháp</a></li>
          <li><a href="#prophet" className="nav-link">Thuật toán Prophet</a></li>
          <li><a href="#demo" className="nav-link btn-demo-link">Trải nghiệm Demo</a></li>
        </ul>
      </nav>
    </header>
  );
}
