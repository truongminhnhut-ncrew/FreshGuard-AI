import React from 'react';
import { AlertCircle, TrendingUp, RefreshCw, Layers, ShieldAlert, Award } from 'lucide-react';
import CostBalancer from './CostBalancer';

export default function Introduction() {
  return (
    <div id="about">
      {/* Chapter 1 */}
      <section className="section">
        <div className="section-header">
          <span className="section-num">Chương 1</span>
          <h2 className="section-title">Phân Tích Bài Toán Kinh Tế - Kinh Doanh</h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid-2" style={{ marginBottom: '5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
              1.1. Bối cảnh & Tính cấp thiết
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
              Ngành bán lẻ thực phẩm tại Việt Nam đang tăng trưởng mạnh mẽ, kéo theo yêu cầu ngày càng khắt khe về quản lý hàng tươi sống. 
              Nhóm hàng này có đặc tính <strong>thời hạn sử dụng ngắn, dễ hư hỏng, khó lưu kho</strong>, và nhu cầu tiêu dùng biến động mạnh theo thời tiết, cuối tuần, lễ Tết.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
              Chỉ cần sai sót nhỏ trong dự báo nhu cầu sẽ dẫn đến hai kịch bản cực đoan: hao hụt lớn do hủy hàng hoặc mất doanh thu do thiếu hàng. Do đó, việc ứng dụng AI là cấp thiết để tối ưu hóa quyết định nhập hàng hằng ngày.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              background: 'var(--bg-tertiary)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '4px solid var(--primary)',
              marginTop: '1.5rem'
            }}>
              <AlertCircle className="text-primary" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--primary-hover)' }}>
                Định hướng giải pháp: Xây dựng FreshGuard AI – hệ thống hỗ trợ quyết định (Decision Support System) ứng dụng mô hình Prophet kết hợp các chỉ số quản trị tồn kho.
              </p>
            </div>
          </div>
          <div className="card" style={{ background: 'var(--bg-secondary)', border: 'none' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Khoảng trống trong phương pháp hiện tại</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>✕</span>
                <div>
                  <strong>Phụ thuộc vào kinh nghiệm:</strong> Việc đặt hàng phụ thuộc vào cảm tính của quản lý cửa hàng, thiếu tính nhất quán.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>✕</span>
                <div>
                  <strong>Dữ liệu bị phân tán:</strong> Chưa tận dụng tốt nguồn dữ liệu lịch sử bán hàng và tồn kho.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>✕</span>
                <div>
                  <strong>Bỏ qua các yếu tố ngoại cảnh:</strong> Các phương pháp thống kê cũ không tính đến các sự kiện đặc biệt, lịch âm, chương trình khuyến mãi hay tính mùa vụ đặc thù.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 1.2 Cost Tradeoff Simulator */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', fontWeight: 700, color: 'var(--primary)', textAlign: 'center' }}>
            1.2. Sự đánh đổi giữa Nhập dư (Overstock) & Nhập thiếu (Understock)
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 2.5rem', textAlign: 'center', fontSize: '1.05rem' }}>
            Mục tiêu cốt lõi của FreshGuard AI không chỉ là giảm tồn kho, mà là <strong>tối thiểu hóa tổng chi phí</strong>. Hãy kéo thanh trượt bên dưới để tự mình trải nghiệm bài toán tối ưu hóa này.
          </p>
          <CostBalancer />
        </div>
      </section>

      {/* Chapter 3 */}
      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section-header">
          <span className="section-num">Chương 3</span>
          <h2 className="section-title">Đánh Giá Tính Khả Thi & Lộ Trình Triển Khai</h2>
          <div className="section-divider"></div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '2rem', fontWeight: 700, color: 'var(--primary)', textAlign: 'center' }}>
            Lộ trình triển khai 4 giai đoạn
          </h3>
          <div className="roadmap-timeline">
            <div className="roadmap-step active">
              <div className="roadmap-icon">1</div>
              <div className="roadmap-content">
                <div className="roadmap-duration">Tháng 1</div>
                <h3>Chuẩn bị dữ liệu</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Thu thập, làm sạch dữ liệu lịch sử bán hàng, tồn kho hiện tại, lead time và tích hợp lịch âm/dương, các ngày lễ lớn.
                </p>
              </div>
            </div>

            <div className="roadmap-step active">
              <div className="roadmap-icon">2</div>
              <div className="roadmap-content">
                <div className="roadmap-duration">Tháng 2 - 3</div>
                <h3>Phát triển mô hình</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Huấn luyện mô hình Prophet với dữ liệu lịch sử và xây dựng Dashboard hiển thị đề xuất nhập hàng cho người quản trị.
                </p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="roadmap-icon">3</div>
              <div className="roadmap-content">
                <div className="roadmap-duration">Tháng 4 - 6</div>
                <h3>Thử nghiệm (Pilot)</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Triển khai thực tế tại 10 cửa hàng Bách Hóa Xanh mẫu để kiểm chứng sai số dự báo và tối ưu hóa tham số thực tế.
                </p>
              </div>
            </div>

            <div className="roadmap-step">
              <div className="roadmap-icon">4</div>
              <div className="roadmap-content">
                <div className="roadmap-duration">Dài hạn</div>
                <h3>Mở rộng hệ thống (Scale-up)</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Tích hợp trực tiếp vào hệ thống ERP cốt lõi và nhân rộng ra toàn bộ chuỗi hệ thống cửa hàng Bách Hóa Xanh toàn quốc.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs & Benefits */}
        <div className="grid-2" style={{ marginBottom: '5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
              Hiệu quả kinh tế & Chỉ số đo lường (KPI)
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              FreshGuard AI tác động trực tiếp đến biên lợi nhuận trước thuế (EBIT) của doanh nghiệp thông qua tác động kép:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{
                  width: '40px', height: '40px', background: 'var(--bg-tertiary)', color: 'var(--primary)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700 }}>Tăng doanh thu (Tránh đứt hàng)</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hạn chế tối đa tình trạng hết hàng đột xuất đối với sản phẩm bán chạy.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{
                  width: '40px', height: '40px', background: 'var(--danger-light)', color: 'var(--danger)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <RefreshCw size={20} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700 }}>Giảm chi phí hao hụt (Hủy hàng)</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Không nhập quá nhiều các sản phẩm có vòng đời ngắn (rau xanh, thịt tươi) trong ngày nhu cầu thấp.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award className="text-primary" /> Cam kết cải thiện các chỉ số KPI
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>FORECAST ACCURACY</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>+15-20%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Độ chính xác dự báo</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>WASTE RATE</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--danger)' }}>-25%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tỷ lệ hủy hàng tươi</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>OUT OF STOCK</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--warning)' }}>-30%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tỷ lệ đứt hàng</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>STOCK TURNOVER</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>+1.5x</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Vòng quay hàng tồn kho</div>
              </div>
            </div>
          </div>
        </div>

        {/* Risks & Mitigation */}
        <div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '2rem', fontWeight: 700, color: 'var(--primary)', textAlign: 'center' }}>
            Quản trị rủi ro vận hành
          </h3>
          <div className="risks-grid">
            <div className="card risk-card red">
              <div className="risk-meta">
                <span>Rủi ro</span>
                <span style={{ color: 'var(--danger)' }}>Cao</span>
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Sự kiện bất thường (Black Swan)</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Thời tiết bão lũ, dịch bệnh bùng phát hoặc đứt gãy cung ứng đột ngột khiến dữ liệu lịch sử mất tính chính xác.
              </p>
              <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', padding: '0.75rem', background: 'var(--danger-light)', borderRadius: '4px', color: '#b91c1c', fontWeight: 600 }}>
                Giải pháp: Kích hoạt quyền quyết định thủ công (Human Override) từ Quản lý.
              </div>
            </div>

            <div className="card risk-card orange">
              <div className="risk-meta">
                <span>Rủi ro</span>
                <span style={{ color: 'var(--warning)' }}>Trung bình</span>
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Lỗi hệ thống & Dữ liệu</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Mất kết nối API truyền tải số liệu tồn kho POS hoặc mất điện cục bộ tại cửa hàng.
              </p>
              <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', padding: '0.75rem', background: 'var(--warning-light)', borderRadius: '4px', color: '#b45309', fontWeight: 600 }}>
                Giải pháp: Sử dụng Backup Server độc lập và quy trình Data Validation tự động.
              </div>
            </div>

            <div className="card risk-card">
              <div className="risk-meta">
                <span>Rủi ro</span>
                <span style={{ color: 'var(--text-muted)' }}>Thấp</span>
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Sai số mô hình (Model Drift)</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Hành vi mua sắm của khách hàng thay đổi dần theo thời gian làm mô hình Prophet dự báo kém chính xác hơn.
              </p>
              <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '4px', color: 'var(--primary)', fontWeight: 600 }}>
                Giải pháp: Thiết lập cơ chế tự động huấn luyện lại (Retrain) mô hình định kỳ mỗi tháng.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
