import React from 'react';
import { Leaf, BookOpen } from 'lucide-react';

export default function Header({ onOpenGuide }) {
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
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={onOpenGuide}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            border: '1px solid #a7f3d0',
            padding: '7px 14px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
          className="header-guide-btn"
          title="Mở tài liệu hướng dẫn sử dụng hệ thống"
        >
          <BookOpen size={16} />
          <span>Hướng Dẫn Sử Dụng</span>
        </button>

        <div style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          background: 'var(--bg-secondary)',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid var(--border)'
        }}>
          Hệ Thống Ra Quyết Định Nhập Hàng Tối Ưu
        </div>
      </div>
    </header>
  );
}
