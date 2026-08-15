import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle, 
  Layers, Sliders, RefreshCw, Check, Edit3, ShieldAlert, Sparkles,
  Package, ChevronDown, ChevronUp, Info, Activity, Terminal
} from 'lucide-react';

export default function UserGuide({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('workflow'); // workflow, regions, formulas, faq
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!isOpen) return null;

  return (
    <div className="guide-modal-overlay" onClick={onClose}>
      <div className="guide-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="guide-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="guide-icon-badge">
              <BookOpen size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Hướng Dẫn Sử Dụng Hệ Thống DSS FreshGuard AI
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Cẩm nang vận hành dành cho Quản lý cửa hàng Bách Hóa Xanh
              </p>
            </div>
          </div>
          <button className="guide-close-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="guide-tabs-nav">
          <button 
            className={`guide-tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
            onClick={() => setActiveTab('workflow')}
          >
            <Sparkles size={16} /> 1. Quy Trình 4 Bước
          </button>
          <button 
            className={`guide-tab-btn ${activeTab === 'regions' ? 'active' : ''}`}
            onClick={() => setActiveTab('regions')}
          >
            <Layers size={16} /> 2. Ý Nghĩa 4 Phân Vùng
          </button>
          <button 
            className={`guide-tab-btn ${activeTab === 'formulas' ? 'active' : ''}`}
            onClick={() => setActiveTab('formulas')}
          >
            <Sliders size={16} /> 3. Công Thức & Tham Số
          </button>
          <button 
            className={`guide-tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <HelpCircle size={16} /> 4. Tình Huống Thực Tế
          </button>
        </div>

        {/* Content Body */}
        <div className="guide-modal-body">
          {/* TAB 1: WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="guide-section">
              <div className="guide-callout">
                <Info size={20} className="guide-callout-icon" />
                <div>
                  <strong>Mục tiêu:</strong> Giúp Quản lý cửa hàng hoàn thành việc rà soát và ra quyết định đặt hàng tươi sống cho ngày hôm sau chỉ trong <strong>dưới 3 phút</strong> với độ chính xác tối ưu.
                </div>
              </div>

              <div className="guide-timeline">
                {/* Step 1 */}
                <div className="guide-step-card">
                  <div className="guide-step-num">1</div>
                  <div className="guide-step-content">
                    <div className="guide-step-title">
                      <span>Bước 1: Chọn sản phẩm & Kiểm tra cảnh báo tồn kho</span>
                      <span className="guide-tag red">Ưu tiên hàng Đỏ</span>
                    </div>
                    <p className="guide-step-desc">
                      Tại <strong>Bảng Tổng Quan Tồn Kho (Khu vực 1 bên trái)</strong>, hệ thống tự động gắn nhãn trạng thái theo mã màu:
                    </p>
                    <div className="guide-badge-list">
                      <div className="guide-status-item">
                        <span className="dot dot-red"></span>
                        <div><strong>Màu Đỏ (Cần nhập gấp):</strong> Tồn kho thực tế đang dưới điểm đặt hàng lại (<code>I_current &lt; ROP</code>). Phải xử lý đặt hàng ngay.</div>
                      </div>
                      <div className="guide-status-item">
                        <span className="dot dot-yellow"></span>
                        <div><strong>Màu Vàng (Cận ngưỡng):</strong> Tồn kho đang tiệm cận ROP, cần theo dõi sát sức mua trong ngày.</div>
                      </div>
                      <div className="guide-status-item">
                        <span className="dot dot-green"></span>
                        <div><strong>Màu Xanh (Ổn định):</strong> Tồn kho đang ở mức an toàn, không có nguy cơ đứt hàng.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="guide-step-card">
                  <div className="guide-step-num">2</div>
                  <div className="guide-step-content">
                    <div className="guide-step-title">
                      <span>Bước 2: Xem xét đề xuất số lượng nhập (Q)</span>
                      <span className="guide-tag green">Tự động tính toán</span>
                    </div>
                    <p className="guide-step-desc">
                      Tại <strong>Khu vực Đề Xuất Nhập Hàng</strong>, hệ thống tự động hiển thị số lượng nhập khuyến nghị $Q$ (kg hoặc hộp) dựa trên thuật toán:
                    </p>
                    <div className="guide-code-box">
                      <code>Q = Max(0, Nhu cầu dự báo (D) + Tồn an toàn (SS) - Tồn thực tế (I_current))</code>
                    </div>
                    <p className="guide-step-desc" style={{ marginTop: '0.5rem' }}>
                      Quan sát thanh đo tồn kho trực quan bên phải để thấy vị trí chấm tròn (Tồn thực tế) so với vạch ROP và Tồn an toàn.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="guide-step-card">
                  <div className="guide-step-num">3</div>
                  <div className="guide-step-content">
                    <div className="guide-step-title">
                      <span>Bước 3: Đọc giải thích AI (Explainability) & Tinh chỉnh kịch bản</span>
                      <span className="guide-tag blue">Minh bạch AI</span>
                    </div>
                    <p className="guide-step-desc">
                      Đọc hộp <strong>"Giải thích lý do"</strong> để hiểu rõ các yếu tố ảnh hưởng:
                    </p>
                    <ul className="guide-bullet-list">
                      <li><strong>Yếu tố thời tiết:</strong> Mưa bão làm giảm lượt khách ghé mua hải sản/thịt.</li>
                      <li><strong>Yếu tố lịch Âm / Lễ Tết:</strong> Mùng 1 Âm lịch, ngày Rằm làm tăng nhu cầu ăn chay hoặc thịt heo cúng.</li>
                      <li><strong>Chương trình khuyến mãi:</strong> Chiến dịch giảm giá cuối tuần kích cầu.</li>
                    </ul>
                    <p className="guide-step-desc" style={{ marginTop: '0.5rem' }}>
                      <em>(Tùy chọn)</em> Bạn có thể điều chỉnh tham số nhu cầu $D$, độ biến động $\sigma_d$, thời gian chờ hàng $L$ hoặc kéo thanh trượt $I_{current}$ để mô phỏng kịch bản thực tế phát sinh tại cửa hàng.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="guide-step-card">
                  <div className="guide-step-num">4</div>
                  <div className="guide-step-content">
                    <div className="guide-step-title">
                      <span>Bước 4: Phê duyệt hoặc Điều chỉnh thủ công</span>
                      <span className="guide-tag purple">Chuyển tiếp ERP</span>
                    </div>
                    <p className="guide-step-desc">
                      Người quản lý có 2 lựa chọn:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
                      <div className="guide-action-box approve">
                        <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)' }}>
                          <Check size={16} /> Nút "Phê duyệt"
                        </div>
                        <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                          Đồng ý với số lượng đề xuất $Q$ của AI và chuyển tiếp đơn hàng sang ERP/Kho tổng.
                        </p>
                      </div>
                      <div className="guide-action-box edit">
                        <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6366f1' }}>
                          <Edit3 size={16} /> Nút "Điều chỉnh"
                        </div>
                        <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                          Gõ trực tiếp số lượng bạn mong muốn nếu có thông tin đặc biệt tại chỗ (ví dụ: khách đặt sỉ), sau đó bấm Phê duyệt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGIONS */}
          {activeTab === 'regions' && (
            <div className="guide-section">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>
                4 Vùng Chức Năng Cốt Lõi Trên Màn Hình DSS
              </h3>
              <div className="guide-regions-grid">
                <div className="guide-region-card">
                  <div className="guide-region-header">
                    <Package size={18} className="text-primary" />
                    <h4>Khu vực 1: Bảng tổng quan tồn kho</h4>
                  </div>
                  <p>
                    Hiển thị danh sách toàn bộ mặt hàng tươi sống (Thịt ba rọi, Đùi heo, Cá điêu hồng, Tôm thẻ, Trứng gà). 
                    Cung cấp cái nhìn tức thì về trạng thái kho thông qua hệ thống đèn giao thông (Đỏ - Vàng - Xanh).
                  </p>
                </div>

                <div className="guide-region-card">
                  <div className="guide-region-header">
                    <CheckCircle2 size={18} className="text-primary" />
                    <h4>Khu vực 2: Khối đề xuất nhập hàng (Recommendation)</h4>
                  </div>
                  <p>
                    Trung tâm ra quyết định. Tính toán chính xác lượng cần đặt $Q$, hỗ trợ phê duyệt một chạm hoặc kích hoạt chế độ tinh chỉnh thủ công để ghi đè số lượng.
                  </p>
                </div>

                <div className="guide-region-card">
                  <div className="guide-region-header">
                    <HelpCircle size={18} className="text-primary" />
                    <h4>Khu vực 3: Hộp giải thích lý do (Explainability)</h4>
                  </div>
                  <p>
                    Tạo sự tin tưởng cho người quản lý bằng việc giải thích bằng văn bản tự nhiên lý do tại sao AI đưa ra con số $Q$ (dựa trên phân tích ngày lễ, thời tiết, sự kiện).
                  </p>
                </div>

                <div className="guide-region-card">
                  <div className="guide-region-header">
                    <Activity size={18} className="text-primary" />
                    <h4>Khu vực 4: Giám sát mô hình (Model Health Widget)</h4>
                  </div>
                  <p>
                    Theo dõi độ chính xác qua chỉ số MAPE (Mean Absolute Percentage Error). Có nút <strong>Retrain</strong> để chủ động huấn luyện lại mô hình khi dữ liệu thực tế có biến động lớn.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FORMULAS */}
          {activeTab === 'formulas' && (
            <div className="guide-section">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>
                Bộ Chỉ Số Quản Trị Tồn Kho & Công Thức Toán Học
              </h3>

              <div className="guide-formula-table">
                <div className="formula-row header">
                  <div>Chỉ số</div>
                  <div>Ý nghĩa quản trị</div>
                  <div>Công thức tính toán</div>
                </div>

                <div className="formula-row">
                  <div>
                    <strong style={{ color: 'var(--primary)' }}>SS</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Safety Stock</div>
                  </div>
                  <div>
                    <strong>Tồn kho an toàn:</strong> Lượng hàng đệm để phòng ngừa các biến động nhu cầu bất thường hoặc nhà cung cấp giao trễ.
                  </div>
                  <div>
                    <code>SS = Z × σ_d × √L</code>
                  </div>
                </div>

                <div className="formula-row">
                  <div>
                    <strong style={{ color: 'var(--warning)' }}>ROP</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Reorder Point</div>
                  </div>
                  <div>
                    <strong>Điểm đặt hàng lại:</strong> Ngưỡng tồn kho mà khi thực tế chạm tới mức này, hệ thống sẽ phát cảnh báo đặt hàng ngay.
                  </div>
                  <div>
                    <code>ROP = (D × L) + SS</code>
                  </div>
                </div>

                <div className="formula-row">
                  <div>
                    <strong style={{ color: '#0284c7' }}>Q</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Order Quantity</div>
                  </div>
                  <div>
                    <strong>Lượng đặt hàng đề xuất:</strong> Khối lượng hàng cần nhập bổ sung để bù đắp tồn kho về mức mục tiêu an toàn.
                  </div>
                  <div>
                    <code>Q = Max(0, (D × L) + SS - I_current)</code>
                  </div>
                </div>

                <div className="formula-row">
                  <div>
                    <strong style={{ color: '#8b5cf6' }}>Z-Score</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Service Level</div>
                  </div>
                  <div>
                    <strong>Hệ số an toàn:</strong> Xác suất không bị đứt hàng trong chu kỳ nhập hàng.
                  </div>
                  <div>
                    <code>Z=1.28 (90%) | Z=1.65 (95%) | Z=2.05 (98%) | Z=2.33 (99%)</code>
                  </div>
                </div>
              </div>

              <div className="guide-callout" style={{ marginTop: '1.5rem' }}>
                <Info size={20} className="guide-callout-icon" />
                <div style={{ fontSize: '0.85rem' }}>
                  <strong>Ý nghĩa các biến đầu vào:</strong><br />
                  • <code>D</code>: Nhu cầu tiêu thụ trung bình mỗi ngày (kg hoặc hộp).<br />
                  • <code>σ_d</code>: Độ lệch chuẩn biến động nhu cầu hằng ngày.<br />
                  • <code>L</code>: Thời gian chờ giao hàng từ kho tổng / nhà cung cấp (Lead time tính bằng ngày).<br />
                  • <code>I_current</code>: Mức tồn kho thực tế đang có tại cửa hàng.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQ & USE CASES */}
          {activeTab === 'faq' && (
            <div className="guide-section">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>
                Các Tình Huống Xử Lý Thực Tế & Câu Hỏi Thường Gặp
              </h3>

              <div className="guide-faq-list">
                {[
                  {
                    q: '1. Khi nào tôi nên điều chỉnh thủ công (Override) số lượng Q của AI?',
                    a: 'Bạn nên sử dụng tính năng "Điều chỉnh" khi có các thông tin phát sinh cục bộ mà hệ thống AI chưa thể nhận biết, ví dụ: một nhà hàng gần đó đặt sỉ 50kg thịt heo, hoặc tủ mát bảo quản của cửa hàng bị sự cố cần giảm lượng tồn để tránh hư hỏng.'
                  },
                  {
                    q: '2. Khi nào cần nhấn nút "Retrain" mô hình AI?',
                    a: 'Mô hình AI vận hành tự động, nhưng bạn nên chủ động nhấn nút Retrain (biểu tượng xoay tròn tại Khu vực 4) khi thấy chỉ số sai số MAPE vượt ngưỡng 10%, hoặc sau các dịp lễ lớn khi thói quen mua sắm của khách hàng có sự dịch chuyển mạnh.'
                  },
                  {
                    q: '3. Tại sao hệ thống đề xuất lượng đặt Q = 0?',
                    a: 'Khi mức tồn kho thực tế hiện tại (I_current) lớn hơn hoặc bằng mức tồn kho mục tiêu (D + SS), hệ thống sẽ tính ra Q = 0 để tránh tình trạng nhập dư thừa (Overstock), giảm thiểu nguy cơ phải hủy hàng cận date cuối ngày.'
                  },
                  {
                    q: '4. Nên chọn hệ số an toàn (Service Level) nào cho từng nhóm hàng?',
                    a: 'Với mặt hàng tươi sống có hạn dùng cực ngắn (như Thủy hải sản tươi, Thịt sơ chế), khuyến nghị chọn mức 90% - 95% (Z=1.28 hoặc 1.65) để hạn chế hủy hàng. Với mặt hàng bảo quản lâu hơn (như Trứng gà), nên chọn 98% - 99% (Z=2.05 hoặc 2.33) để đảm bảo không bao giờ hết hàng.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="guide-faq-item">
                    <button className="guide-faq-question" onClick={() => toggleFaq(idx)}>
                      <span>{item.q}</span>
                      {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {openFaq === idx && (
                      <div className="guide-faq-answer">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="guide-modal-footer">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            FreshGuard AI © {new Date().getFullYear()} — Hỗ trợ vận hành chuỗi bán lẻ thực phẩm
          </div>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} onClick={onClose}>
            Đã hiểu & Bắt đầu trải nghiệm
          </button>
        </div>
      </div>
    </div>
  );
}
