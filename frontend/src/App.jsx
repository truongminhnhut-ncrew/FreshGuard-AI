import React from 'react';
import Header from './components/Header';
import DecisionDashboard from './components/DecisionDashboard';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ flexGrow: 1 }}>
        <DecisionDashboard />
      </main>
      <footer className="app-footer">
        <div className="footer-content">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>FreshGuard AI</h3>
          <p style={{ maxWidth: '600px', fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
            Hệ thống hỗ trợ ra quyết định (Decision Support System) ứng dụng AI Prophet tối ưu hóa nhập hàng tươi sống tại chuỗi siêu thị Bách Hóa Xanh.
          </p>
          <div className="footer-text" style={{ marginTop: '1rem', borderTop: '1px solid #334155', paddingTop: '1rem', width: '100%' }}>
            © {new Date().getFullYear()} FreshGuard AI. Phát triển phục vụ mục đích nghiên cứu & thực nghiệm.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
