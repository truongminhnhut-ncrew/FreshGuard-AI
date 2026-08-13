import React, { useState, useEffect } from 'react';
import { Package, ShieldCheck, AlertTriangle, ArrowRight, RefreshCw, HelpCircle, Check, Edit3, HeartPulse, Settings } from 'lucide-react';
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

  // Recommendation Card states
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [customQuantity, setCustomQuantity] = useState(0);
  const [approved, setApproved] = useState(false);
  const [approvedQuantity, setApprovedQuantity] = useState(0);

  // Model Health States
  const [modelStatus, setModelStatus] = useState('STABLE'); // STABLE, RETRAINING
  const [mape, setMape] = useState('8.4%');

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
    
    // Reset states for the new product
    setIsAdjusting(false);
    setApproved(false);
    
    // Set specific MAPE for each product
    if (prod.id === 'ba-roi-heo-cp') setMape('8.4%');
    else if (prod.id === 'dui-heo-cp') setMape('7.8%');
    else if (prod.id === 'ca-dieu-hong') setMape('10.2%');
    else if (prod.id === 'trung-ga-10') setMape('5.2%');
    else if (prod.id === 'tom-the-cp') setMape('9.1%');
  };

  // Recalculate indicators when inputs change locally
  useEffect(() => {
    if (!selectedProduct) return;
    const res = calculateInventory(D, sigmaD, L, Z, Icurrent);
    setResults(res);
    if (!isAdjusting) {
      setCustomQuantity(res.Q);
    }
  }, [D, sigmaD, L, Z, Icurrent, selectedProduct, isAdjusting]);

  // Retrain simulation logic
  const handleRetrain = () => {
    if (modelStatus === 'RETRAINING') return;
    setModelStatus('RETRAINING');
    
    setTimeout(() => {
      setModelStatus('STABLE');
      // Slightly improve MAPE to show result of retraining
      const currentMapeNum = parseFloat(mape);
      const improvedMape = (currentMapeNum * 0.95).toFixed(1) + '%';
      setMape(improvedMape);
    }, 2500);
  };

  const handleApprove = () => {
    setApprovedQuantity(isAdjusting ? customQuantity : results.Q);
    setApproved(true);
    setTimeout(() => {
      setApproved(false);
    }, 4000);
  };

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

  // Get status color for overview panel dots
  const getOverviewColor = (prod) => {
    const res = calculateInventory(prod.D, prod.sigma_d, prod.L, prod.Z, prod.I_current);
    if (res.status === 'REORDER_NOW') return 'red';
    if (res.status === 'REORDER_SOON') return 'yellow';
    if (res.status === 'OVERSTOCK') return 'orange';
    return 'green';
  };

  const getOverviewStatusText = (prod) => {
    const res = calculateInventory(prod.D, prod.sigma_d, prod.L, prod.Z, prod.I_current);
    return res.statusText;
  };

  // Get explainability text (Region 3)
  const getExplainabilityText = () => {
    if (!selectedProduct) return '';
    switch (selectedProduct.id) {
      case 'ba-roi-heo-cp':
        return 'Đề xuất tăng 20% thịt heo cho ngày mai do Thứ Sáu cuối tuần trùng Mùng 1 Âm lịch — hai yếu tố lịch sử cho thấy sức mua tăng đồng thời.';
      case 'ca-dieu-hong':
        return 'Đề xuất giảm 10% do dự báo thời tiết mưa lớn — lịch sử cho thấy lượng khách ghé cửa hàng giảm vào ngày mưa.';
      case 'trung-ga-10':
        return 'Đề xuất tăng 15% lượng trứng gà nhập kho nhằm duy trì tỷ lệ phục vụ khách hàng (Service Level) đạt mục tiêu 99% tránh hết hàng buổi tối.';
      case 'dui-heo-cp':
        return 'Đề xuất giảm 12% lượng nhập do tồn kho thực tế hiện tại cao hơn điểm ROP, giảm thiểu rủi ro hao hụt cuối ngày.';
      case 'tom-the-cp':
        return 'Đề xuất giữ ổn định lượng tôm thẻ chân trắng C.P do các chương trình khuyến mãi cuối tuần đang được triển khai đồng loạt.';
      default:
        return 'Hệ thống đánh giá lượng cầu ổn định, khuyến nghị duy trì tồn kho theo kế hoạch đặt trước.';
    }
  };

  return (
    <section className="section" id="demo" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', padding: '4rem 1.5rem' }}>
      <div className="section-header">
        <span className="section-num">Trải nghiệm</span>
        <h2 className="section-title">Hệ Thống Ra Quyết Định Nhập Hàng DSS</h2>
        <div className="section-divider"></div>
      </div>

      <div className="dashboard-grid">
        
        {/* Khu vực 1 — Bảng tổng quan (Overview Panel) */}
        <div className="dashboard-sidebar">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
            <Package size={18} /> KHU VỰC 1: BẢNG TỔNG QUAN
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Giám sát danh sách mặt hàng tươi sống theo trạng thái tồn kho thực tế.
          </p>
          
          <div className="product-selector" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {products.map(prod => {
              const statusColor = getOverviewColor(prod);
              const statusText = getOverviewStatusText(prod);
              
              let dotColor = '#10b981'; // green
              if (statusColor === 'red') dotColor = '#ef4444';
              else if (statusColor === 'yellow') dotColor = '#f59e0b';
              else if (statusColor === 'orange') dotColor = '#f97316';
              
              return (
                <div 
                  key={prod.id} 
                  className={`product-option ${selectedProduct && selectedProduct.id === prod.id ? 'active' : ''}`}
                  onClick={() => selectProduct(prod)}
                  style={{
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    borderLeft: selectedProduct && selectedProduct.id === prod.id ? '4px solid var(--primary)' : '1px solid var(--border)',
                  }}
                >
                  {/* Color Status Dot */}
                  <span style={{
                    position: 'absolute', left: '8px', top: '20px',
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: dotColor, boxShadow: `0 0 6px ${dotColor}`
                  }} />
                  
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{prod.name}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: dotColor, fontWeight: 600 }}>{statusText}</span>
                    <strong>Tồn: {prod.I_current} {prod.unit}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Color Legend */}
          <div style={{
            marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)',
            borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.75rem'
          }}>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Chú giải trạng thái:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                <span>Đỏ: Dưới ROP, cần nhập gấp</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                <span>Vàng: Cận ngưỡng tồn kho</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span>Xanh: Tồn kho an toàn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Workspace */}
        {selectedProduct && (
          <div className="dashboard-main">
            {/* Header + Model Health Widget (Khu vực 4) */}
            <div className="db-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="db-title" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedProduct.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Nhóm hàng: <strong>{selectedProduct.category}</strong> | Đơn vị tính: <strong>{selectedProduct.unit}</strong>
                </div>
              </div>
              
              {/* KHU VỰC 4: Chỉ số giám sát mô hình (Model Health Widget) */}
              <div style={{
                background: 'white', padding: '1rem 1.25rem', borderRadius: '12px',
                border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
                display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '320px'
              }}>
                <div style={{
                  background: 'var(--bg-secondary)', color: 'var(--primary)',
                  width: '40px', height: '40px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center'
                }}>
                  <HeartPulse size={20} className={modelStatus === 'RETRAINING' ? 'spin-icon' : ''} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>KHU VỰC 4: GIÁM SÁT AI</span>
                    <span style={{
                      color: modelStatus === 'RETRAINING' ? 'var(--warning)' : 'var(--primary)',
                      fontWeight: 800
                    }}>
                      {modelStatus === 'RETRAINING' ? 'Đang retrain...' : 'Đang ổn định'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sai số (MAPE):</span>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{mape}</strong>
                  </div>
                </div>
                <button 
                  onClick={handleRetrain}
                  disabled={modelStatus === 'RETRAINING'}
                  style={{
                    background: 'var(--primary-light)', color: 'var(--primary)',
                    border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: modelStatus === 'RETRAINING' ? 0.6 : 1
                  }}
                  title="Yêu cầu huấn luyện lại mô hình"
                >
                  <RefreshCw size={14} className={modelStatus === 'RETRAINING' ? 'spin-icon' : ''} />
                </button>
              </div>
            </div>

            {/* Dashboard Workspace Grid (2 Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              {/* Left Column: Region 2 + Region 3 + Parameter tuning */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* KHU VỰC 2: Đề xuất nhập hàng (Order Recommendation Card) */}
                <div className="card" style={{
                  borderLeft: '5px solid var(--primary)', background: 'white', position: 'relative',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>
                    KHU VỰC 2: ĐỀ XUẤT NHẬP HÀNG (ORDER RECOMMENDATION)
                  </h4>
                  
                  {approved ? (
                    <div style={{
                      background: 'var(--primary-light)', color: 'var(--primary-hover)',
                      padding: '1rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem',
                      display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0'
                    }}>
                      <Check size={18} strokeWidth={3} />
                      Đã phê duyệt lượng nhập Q = {approvedQuantity} {selectedProduct.unit} gửi lên ERP thành công!
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Lượng đề xuất (Q):</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
                          <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {isAdjusting ? customQuantity : results.Q}
                          </span>
                          <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                            {selectedProduct.unit}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={handleApprove}
                          style={{
                            background: 'var(--primary)', color: 'white', border: 'none',
                            padding: '0.6rem 1.25rem', borderRadius: '30px', fontWeight: 700,
                            fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
                          }}
                        >
                          <Check size={16} /> Phê duyệt
                        </button>
                        <button 
                          onClick={() => setIsAdjusting(!isAdjusting)}
                          style={{
                            background: isAdjusting ? 'var(--primary-light)' : 'white',
                            color: isAdjusting ? 'var(--primary)' : 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                            padding: '0.6rem 1.25rem', borderRadius: '30px', fontWeight: 700,
                            fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
                          }}
                        >
                          <Edit3 size={14} /> {isAdjusting ? 'Hủy chỉnh' : 'Điều chỉnh'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Manual adjustment input */}
                  {isAdjusting && !approved && (
                    <div style={{
                      marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed var(--border)',
                      display: 'flex', alignItems: 'center', gap: '1rem'
                    }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        Nhập thủ công lượng hàng:
                      </label>
                      <input 
                        type="number"
                        className="db-param-input"
                        value={customQuantity}
                        onChange={e => setCustomQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                        style={{ maxWidth: '120px', padding: '0.4rem' }}
                      />
                    </div>
                  )}
                </div>

                {/* KHU VỰC 3: Giải thích lý do (Explainability Box) */}
                <div className="card" style={{
                  background: '#fafdfb', border: '1px solid var(--border)',
                  padding: '1.25rem 1.5rem'
                }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <HelpCircle size={16} /> KHU VỰC 3: GIẢI THÍCH LÝ DO
                  </h4>
                  <p style={{
                    fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5',
                    fontStyle: 'italic', fontWeight: 500
                  }}>
                    "{getExplainabilityText()}"
                  </p>
                </div>

                {/* Parameters adjustments */}
                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    Bộ điều chỉnh tham số nhu cầu & an toàn
                  </h4>
                  <div className="db-params-grid" style={{ gap: '1rem' }}>
                    <div className="db-param-card" style={{ padding: '0.75rem 1rem' }}>
                      <span className="db-param-label" style={{ fontSize: '0.75rem' }}>Nhu cầu TB (D)</span>
                      <input type="number" className="db-param-input" value={D} onChange={e => setD(Math.max(0, parseInt(e.target.value) || 0))} />
                    </div>

                    <div className="db-param-card" style={{ padding: '0.75rem 1rem' }}>
                      <span className="db-param-label" style={{ fontSize: '0.75rem' }}>Biến động (σd)</span>
                      <input type="number" className="db-param-input" value={sigmaD} onChange={e => setSigmaD(Math.max(0, parseInt(e.target.value) || 0))} />
                    </div>

                    <div className="db-param-card" style={{ padding: '0.75rem 1rem' }}>
                      <span className="db-param-label" style={{ fontSize: '0.75rem' }}>Chờ hàng (L)</span>
                      <input type="number" className="db-param-input" value={L} onChange={e => setL(Math.max(1, parseInt(e.target.value) || 1))} />
                    </div>

                    <div className="db-param-card" style={{ padding: '0.75rem 1rem' }}>
                      <span className="db-param-label" style={{ fontSize: '0.75rem' }}>Hệ số an toàn (Z)</span>
                      <select className="db-param-input" value={Z} onChange={e => setZ(parseFloat(e.target.value))} style={{ padding: '0.2rem 0.5rem' }}>
                        <option value="1.28">90% (Z=1.28)</option>
                        <option value="1.65">95% (Z=1.65)</option>
                        <option value="2.05">98% (Z=2.05)</option>
                        <option value="2.33">99% (Z=2.33)</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Visual stock level & indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Visual Stock Level progress bar */}
                <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    Trực quan hóa mức tồn kho thực tế
                  </h5>

                  <div style={{ position: 'relative', height: '24px', background: '#e2e8f0', borderRadius: '12px', margin: '2rem 0' }}>
                    {/* Zone 1: Safety Stock (Red zone) */}
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: `${Math.min(100, (results.SS / Math.max(1, D + results.SS)) * 60)}%`,
                      background: '#ef4444',
                      opacity: 0.3,
                      borderRight: '2px dashed #ef4444',
                      borderRadius: '12px 0 0 12px',
                    }} />

                    {/* Zone 2: Reorder Zone (Yellow zone between SS and ROP) */}
                    <div style={{
                      position: 'absolute', 
                      left: `${Math.min(100, (results.SS / Math.max(1, D + results.SS)) * 60)}%`, 
                      top: 0, bottom: 0,
                      width: `${Math.max(0, Math.min(100, ((results.ROP - results.SS) / Math.max(1, D + results.SS)) * 60))}%`,
                      background: '#f59e0b',
                      opacity: 0.2,
                      borderRight: '2px dashed #f59e0b',
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
                      background: results.statusColor === 'red' ? '#ef4444' : 'var(--primary)',
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
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: results.statusColor === 'red' ? '#ef4444' : 'var(--primary)' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tồn thực tế:</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{Icurrent} {selectedProduct.unit}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ngưỡng đặt lại (ROP):</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{results.ROP} {selectedProduct.unit}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', opacity: 0.6 }} />
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
                </div>

                {/* Step 2 parameters indicator metrics */}
                <div style={{
                  padding: '1.25rem', borderRadius: '12px', border: '1px dashed var(--primary-light)',
                  background: 'white'
                }}>
                  <div className="slider-label" style={{ marginBottom: '0.5rem' }}>
                    <span>Tồn kho thực tế hiện tại (Icurrent):</span>
                    <span className="slider-value" style={{ color: results.statusColor === 'red' ? '#ef4444' : 'var(--primary)' }}>
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

            </div>

          </div>
        )}
      </div>

      <style>{`
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
