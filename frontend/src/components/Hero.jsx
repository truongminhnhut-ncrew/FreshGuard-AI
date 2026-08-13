import React from 'react';
import { Play, Sparkles, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-tag">
        <Sparkles size={16} fill="currentColor" />
        Giải pháp hỗ trợ quyết định ứng dụng Trí Tuệ Nhân Tạo
      </div>
      <h1 className="hero-title">
        Tối ưu hóa nhập hàng tươi sống cùng <br />
        <span>FreshGuard AI</span>
      </h1>
      <p className="hero-desc">
        Hệ thống hỗ trợ ra quyết định (DSS) tiên tiến dành cho chuỗi Bách Hóa Xanh. 
        Kết hợp sức mạnh dự báo của mô hình Prophet và các chỉ số quản trị tồn kho động để giảm thiểu hao hụt, 
        tránh đứt hàng và nâng cao hiệu quả vận hành thực tế.
      </p>
      <div className="hero-actions">
        <a href="#demo" className="btn btn-primary">
          <Play size={18} fill="currentColor" />
          Trải nghiệm tính toán tồn kho
        </a>
        <a href="#about" className="btn btn-secondary">
          <ShieldCheck size={18} />
          Tìm hiểu bài toán kinh tế
        </a>
      </div>
    </section>
  );
}
