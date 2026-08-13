import React, { useState, useEffect } from 'react';
import { Package, ShieldCheck, AlertTriangle, ArrowRight, RefreshCw, HelpCircle } from 'lucide-react';
import { initialProducts, calculateInventory } from '../data/products';

export default function DecisionDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editable parameters for active product
  const [D, setD] = useState(0);
  const [sigmaD, setSigmaD] = useState(0);
  const [L, setL] = useState(0);
  const [Z, setZ] = useState(1.65);
  const [Icurrent, setIcurrent] = useState(0);

  // Calculation results from local helpers
  const [results, setResults] = useState({
    SS: 0,
    ROP: 0,
    Q: 0,
    status: 'NORMAL',
    statusText: 'Ổn định',
    statusColor: 'green'
  });

  // Load initial products locally
  useEffect(() => {
    setProducts(initialProducts);
    if (initialProducts.length > 0) {
      selectProduct(initialProducts[0]);
    }
    setLoading(false);
  }, []);

  const selectProduct = (prod) => {
    setSelectedProduct(prod);
    setD(prod.D);
    setSigmaD(prod.sigma_d);
    setL(prod.L);
    setZ(prod.Z);
    setIcurrent(prod.I_current);
  };

  // Recalculate indicators when inputs change locally
  useEffect(() => {
    if (!selectedProduct) return;
    const res = calculateInventory(D, sigmaD, L, Z, Icurrent);
    setResults(res);
  }, [D, sigmaD, L, Z, Icurrent, selectedProduct]);

  if (loading) {
    return (
      <section className="section" id="demo">
        <div className="section-header">
          <span className="section-num">Trải nghiệm</span>
          <h2 className="section-title">Hệ Thống Ra Quyết Định Nhập Hàng DSS</h2>
          <div className="section-divider"></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '300px', alignItems: 'center' }}>
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  const getStatusBadgeClass = () => {
    switch (results.status) {
      case 'REORDER_NOW': return 'db-badge badge-red';
      case 'REORDER_SOON': return 'db-badge badge-yellow';
      case 'OVERSTOCK': return 'db-badge badge-orange';
      default: return 'db-badge badge-green';
    }
  };

  return (
    <section className="section" id="demo" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
      <div className="section-header">
        <span className="section-num">Trải nghiệm</span>
        <h2 className="section-title">Hệ Thống Ra Quyết Định Nhập Hàng DSS</h2>
        <div className="section-divider"></div>
      </div>

      <div className="dashboard-grid">
        {/* Sidebar Product List */}
        <div className="dashboard-sidebar">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={18} className="text-primary" /> Sản phẩm tươi sống BHX
          </h3>
          <div className="product-selector">
            {products.map(prod => (
              <div 
                key={prod.id} 
                className={`product-option ${selectedProduct && selectedProduct.id === prod.id ? 'active' : ''}`}
                onClick={() => selectProduct(prod)}
              >
                <div style={{ fontSize: '0.95rem' }}>{prod.name}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{prod.category}</span>
                  <strong>Tồn: {prod.I_current} {prod.unit}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main calculation workspace */}
        {selectedProduct && (
          <div className="dashboard-main">
            <div className="db-header">
              <div>
                <div className="db-title">{selectedProduct.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Đơn vị tính: <strong>{selectedProduct.unit}</strong> | Nhóm hàng: {selectedProduct.category}
                </div>
              </div>
              <div className={getStatusBadgeClass()}>
                {results.statusText}
              </div>
            </div>

            {/* Step 1: Input Parameters */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>
                1. Bộ tham số đầu vào (Cập nhật từ AI & Cửa hàng)
              </h4>
              <div className="db-params-grid">
                <div className="db-param-card">
                  <span className="db-param-label">
                    Dự báo nhu cầu/ngày (D)
                  </span>
                  <input 
                    type="number" 
                    className="db-param-input"
                    value={D} 
                    onChange={e => setD(Math.max(0, parseInt(e.target.value) || 0))} 
                  />
                </div>

                <div className="db-param-card">
                  <span className="db-param-label">
                    Độ biến động nhu cầu (σd)
                  </span>
                  <input 
                    type="number" 
                    className="db-param-input"
                    value={sigmaD} 
                    onChange={e => setSigmaD(Math.max(0, parseInt(e.target.value) || 0))} 
                  />
                </div>

                <div className="db-param-card">
                  <span className="db-param-label">
                    Thời gian chờ hàng (L ngày)
                  </span>
                  <input 
                    type="number" 
                    className="db-param-input"
                    value={L} 
                    onChange={e => setL(Math.max(1, parseInt(e.target.value) || 1))} 
                  />
                </div>

                <div className="db-param-card">
                  <span className="db-param-label">
                    Hệ số dịch vụ (Z)
                  </span>
                  <select 
                    className="db-param-input"
                    value={Z}
                    onChange={e => setZ(parseFloat(e.target.value))}
                    style={{ padding: '0.45rem' }}
                  >
                    <option value="1.28">90% (Z = 1.28)</option>
                    <option value="1.65">95% (Z = 1.65)</option>
                    <option value="2.05">98% (Z = 2.05)</option>
                    <option value="2.33">99% (Z = 2.33)</option>
                  </select>
                </div>
              </div>

              {/* Current stock slider */}
              <div className="card" style={{ padding: '1.25rem', marginTop: '1.5rem', background: '#fafdfb', border: '1px dashed var(--primary-light)' }}>
                <div className="slider-label" style={{ marginBottom: '0.5rem' }}>
                  <span>Tồn kho thực tế hiện tại (Icurrent):</span>
                  <span className="slider-value" style={{ color: results.statusColor === 'red' ? 'var(--danger)' : 'var(--primary)' }}>
                    {Icurrent} {selectedProduct.unit}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={Math.max(D * 4, Icurrent * 1.5)} 
                  value={Icurrent} 
                  onChange={e => setIcurrent(parseInt(e.target.value) || 0)} 
                />
              </div>
            </div>

            {/* Step 2: Formulas & Outputs */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>
                2. Kết quả tính toán tồn kho tối ưu & Đề xuất hành động
              </h4>
              <div className="db-results">
                {/* Safety Stock Card */}
                <div className="db-result-card">
                  <div className="db-result-icon green">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="db-result-content">
                    <span className="db-result-label">Tồn kho an toàn (SS)</span>
                    <span className="db-result-value">{results.SS} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>{selectedProduct.unit}</span></span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Formula: Z × σd × √L</span>
                  </div>
                </div>

                {/* Reorder Point Card */}
                <div className="db-result-card rop">
                  <div className="db-result-icon yellow">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="db-result-content">
                    <span className="db-result-label">Điểm đặt hàng lại (ROP)</span>
                    <span className="db-result-value" style={{ color: 'var(--warning)' }}>{results.ROP} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>{selectedProduct.unit}</span></span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Formula: (D × L) + SS</span>
                  </div>
                </div>

                {/* Suggested Order Card */}
                <div className="db-result-card order">
                  <div className="db-result-icon accent">
                    <Package size={24} />
                  </div>
                  <div className="db-result-content">
                    <span className="db-result-label">Khuyến nghị nhập hàng (Q)</span>
                    <span className="db-result-value" style={{ color: 'var(--primary)' }}>{results.Q} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>{selectedProduct.unit}</span></span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Formula: (D + SS) - Icurrent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Stock Level representation */}
            <div className="card" style={{ padding: '1.5rem', background: '#fafdfb', border: '1px solid var(--border)' }}>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
                Trực quan hóa mức tồn kho & Ngưỡng quyết định
              </h5>
              
              <div style={{ position: 'relative', height: '24px', background: '#e2e8f0', borderRadius: '12px', margin: '2rem 0' }}>
                {/* Zone 1: Safety Stock (Red zone) */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${Math.min(100, (results.SS / Math.max(1, D + results.SS)) * 60)}%`,
                  background: 'var(--danger)',
                  opacity: 0.3,
                  borderRight: '2px dashed var(--danger)',
                  borderRadius: '12px 0 0 12px',
                }} />

                {/* Zone 2: Reorder Zone (Yellow zone between SS and ROP) */}
                <div style={{
                  position: 'absolute', 
                  left: `${Math.min(100, (results.SS / Math.max(1, D + results.SS)) * 60)}%`, 
                  top: 0, bottom: 0,
                  width: `${Math.max(0, Math.min(100, ((results.ROP - results.SS) / Math.max(1, D + results.SS)) * 60))}%`,
                  background: 'var(--warning)',
                  opacity: 0.2,
                  borderRight: '2px dashed var(--warning)',
                }} />

                {/* Zone 3: Target Zone Marker */}
                <div style={{
                  position: 'absolute',
                  left: `${Math.min(100, ((D + results.SS) / Math.max(1, D + results.SS)) * 60)}%`,
                  top: 0, bottom: 0, width: '2px',
                  background: 'var(--primary)', zIndex: 5
                }} />

                {/* Current Stock Pointer */}
                <div style={{
                  position: 'absolute',
                  left: `${Math.min(100, (Icurrent / Math.max(1, D + results.SS)) * 60)}%`,
                  top: '50%', transform: 'translate(-50%, -50%)',
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: results.statusColor === 'red' ? 'var(--danger)' : 'var(--primary)',
                  border: '3px solid white', boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  zIndex: 20, transition: 'left 0.3s ease'
                }} />
              </div>

              {/* Clean metrics grid below to display all details clearly and avoid overlaps */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
                marginTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                paddingTop: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: results.statusColor === 'red' ? 'var(--danger)' : 'var(--primary)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tồn thực tế:</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{Icurrent} {selectedProduct.unit}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ngưỡng đặt lại (ROP):</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{results.ROP} {selectedProduct.unit}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--danger)', opacity: 0.6 }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tồn an toàn (SS):</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{results.SS} {selectedProduct.unit}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mức tồn mục tiêu:</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{D + results.SS} {selectedProduct.unit}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2.5rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <HelpCircle size={18} style={{ flexShrink: 0, color: 'var(--primary)' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {results.status === 'REORDER_NOW' ? (
                    <span>🚨 <strong>Cửa hàng trưởng lưu ý:</strong> Tồn kho thực tế ({Icurrent} {selectedProduct.unit}) đã tụt xuống dưới Điểm đặt lại ROP ({results.ROP} {selectedProduct.unit}). Hệ thống đề xuất nhập khẩn cấp lượng hàng <strong>Q = {results.Q} {selectedProduct.unit}</strong> để phục hồi tồn kho an toàn trước khi chuyến xe giao hàng kế tiếp đến.</span>
                  ) : results.status === 'REORDER_SOON' ? (
                    <span>⚠️ <strong>Cảnh báo:</strong> Tồn kho thực tế gần chạm tới điểm đặt hàng lại ROP. Hãy sẵn sàng chuẩn bị đơn hàng tiếp theo.</span>
                  ) : results.status === 'OVERSTOCK' ? (
                    <span>💡 <strong>Đề xuất:</strong> Tồn kho hiện tại đang ở mức rất cao ({Icurrent} {selectedProduct.unit}) so với nhu cầu thực tế. Không cần thiết nhập thêm (Khuyến nghị Q = 0) để giảm hao hụt chi phí hủy hàng cuối ngày.</span>
                  ) : (
                    <span>✅ <strong>Mức tồn kho an toàn:</strong> Tồn kho hiện tại đủ duy trì bán hàng và duy trì hệ số dịch vụ trên 95% không lo đứt hàng. Không cần hành động nhập thêm.</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
