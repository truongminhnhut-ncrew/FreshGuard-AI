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
    </header>
  );
}
