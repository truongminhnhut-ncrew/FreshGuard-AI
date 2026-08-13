import React, { useState } from 'react';
import { Database, Cpu, BrainCircuit, Monitor, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Architecture() {
  const [activeTab, setActiveTab] = useState(0);

  const layers = [
    {
      title: "1. Data Layer (Đầu vào)",
      icon: <Database size={24} />,
      desc: "Thu thập và tiền xử lý toàn bộ dữ liệu thô từ hệ thống POS của Bách Hóa Xanh.",
      points: [
        "Dữ liệu lịch sử bán hàng theo ngày của từng sản phẩm.",
        "Thông số Lead time (thời gian vận chuyển từ nhà cung cấp).",
        "Dữ liệu lịch âm/dương, các ngày lễ đặc thù (Rằm, Tết, nghỉ lễ).",
        "Lịch chạy chương trình khuyến mãi, xả hàng."
      ],
      color: "var(--primary)"
    },
    {
      title: "2. AI Layer (Thuật toán)",
      icon: <Cpu size={24} />,
      desc: "Lõi xử lý dữ liệu và chạy mô hình học máy Prophet để dự báo nhu cầu.",
      points: [
        "Tự động loại bỏ nhiễu và điền các giá trị tồn kho bị thiếu.",
        "Phân rã chuỗi thời gian thành: Xu hướng dài hạn, Mùa vụ (tuần/năm) và Sự kiện đột xuất.",
        "Xuất kết quả dự báo nhu cầu tương lai kèm khoảng tin cậy (Upper/Lower bounds)."
      ],
      color: "var(--primary)"
    },
    {
      title: "3. Decision Layer (Bộ chỉ số quản trị)",
      icon: <BrainCircuit size={24} />,
      desc: "Chuyển đổi số liệu dự báo thô thành các chỉ số quản trị tồn kho có thể hành động.",
      points: [
        "Tính toán Tồn kho an toàn (Safety Stock - SS) phòng ngừa rủi ro đứt gãy.",
        "Xác định Điểm đặt hàng lại (Reorder Point - ROP) để phát cảnh báo.",
        "Đề xuất Lượng đặt hàng tối ưu (Order Quantity - Q) dựa trên tồn thực tế."
      ],
      color: "var(--primary)"
    },
    {
      title: "4. Presentation Layer (Đầu ra)",
      icon: <Monitor size={24} />,
      desc: "Giao diện hiển thị trực quan hỗ trợ đắc lực cho Quản lý cửa hàng ra quyết định.",
      points: [
        "Dashboard cập nhật thời gian thực các đề xuất đặt hàng hằng ngày.",
        "Hệ thống cảnh báo thông minh: Đỏ (Đặt khẩn cấp), Cam (Tồn quá cao), Xanh (Ổn định).",
        "Cơ chế phê duyệt đơn hàng một chạm chuyển tiếp trực tiếp đến ERP."
      ],
      color: "var(--primary)"
    }
  ];

  return (
    <section className="section" id="architecture" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="section-header">
        <span className="section-num">Chương 2</span>
        <h2 className="section-title">2.2. Kiến Trúc Hệ Thống & Luồng Dữ Liệu</h2>
        <div className="section-divider"></div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem' }}>
          Hệ thống FreshGuard AI vận hành khép kín qua <strong>4 lớp liền mạch</strong> giúp chuyển hóa dữ liệu lịch sử thô thành các quyết định đặt hàng chính xác.
        </p>
      </div>

      <div className="architecture-tabs">
        {layers.map((layer, idx) => (
          <button
            key={idx}
            className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            Lớp {idx + 1}
          </button>
        ))}
      </div>

      <div className="arch-card">
        <div className="arch-details">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {layers[activeTab].icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{layers[activeTab].title}</h3>
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {layers[activeTab].desc}
          </p>

          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Nhiệm vụ chính thực thi:
          </h4>
          <div className="arch-list">
            {layers[activeTab].points.map((pt, pIdx) => (
              <div className="arch-item" key={pIdx}>
                <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Small conceptual diagram */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          background: 'var(--bg-secondary)',
          padding: '2.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Luồng vận hành
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', width: '100%'
          }}>
            {layers.map((l, lIdx) => (
              <React.Fragment key={lIdx}>
                <div style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: activeTab === lIdx ? 'var(--primary)' : 'white',
                  color: activeTab === lIdx ? 'white' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  boxShadow: activeTab === lIdx ? 'var(--shadow-md)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {l.title.split(' ')[1]} {l.title.split(' ')[2]}
                </div>
                {lIdx < 3 && (
                  <ArrowRight size={16} style={{ transform: 'rotate(90deg)', color: 'var(--text-muted)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
