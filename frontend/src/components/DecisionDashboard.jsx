import React, { useState, useEffect } from 'react';
import { Package, ShieldCheck, AlertTriangle, ArrowRight, RefreshCw, HelpCircle, Check, Edit3, HeartPulse, Settings, BookOpen, ChevronUp, ChevronDown } from 'lucide-react';
import { initialProducts, calculateInventory } from '../data/products';

export default function DecisionDashboard({ onOpenGuide }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

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
    const mapeMap = {
      'ba-roi-heo-cp': '8.4%', 'dui-heo-cp': '7.8%', 'ca-dieu-hong': '10.2%',
      'trung-ga-10': '5.2%',  'tom-the-cp': '9.1%',  'nac-vai-heo': '8.9%',
      'bo-than-cp':  '11.3%', 'uc-ga-cn':   '7.5%',  'ca-basa-fillet': '12.1%',
      'ca-thu-cat-khuc': '10.8%', 'tom-su-tuoi': '9.7%', 'muc-ong-tuoi': '13.2%',
      'ngheu-trang': '14.5%', 'rau-muong': '16.2%',  'cai-ngot': '15.8%',
      'ca-chua': '12.4%',    'dua-leo': '13.7%',     'xa-lach-lolo': '17.1%',
      'ca-rot': '11.9%',     'khoai-tay': '9.3%',    'hanh-la': '18.5%',
    };
    setMape(mapeMap[prod.id] || '10.0%');
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
      <div className="section-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="section-num">Trải nghiệm</span>
        <h2 className="section-title">Hệ Thống Ra Quyết Định Nhập Hàng DSS</h2>
        <div className="section-divider"></div>
        {onOpenGuide && (
          <button
            onClick={onOpenGuide}
            style={{
              marginTop: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'white',
              color: 'var(--primary)',
              border: '1px solid var(--border)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.background = 'var(--bg-secondary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'white';
            }}
          >
            <BookOpen size={16} />
            <span>Xem Hướng Dẫn Vận Hành 4 Bước & Công Thức</span>
          </button>
        )}
      </div>

      <div className="dashboard-grid">

        {/* Khu vực 1 — Bảng tổng quan (Overview Panel) */}
        <div className="dashboard-sidebar">

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', margin: 0 }}>
              <Package size={16} style={{ flexShrink: 0 }} /> BẢNG TỔNG QUAN TỒN KHO
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '99px', padding: '2px 8px', fontWeight: 700 }}>
              {carouselIndex + 1} / {products.length}
            </span>
          </div>

          {/* Carousel Card */}
          {products.length > 0 && (() => {
            const prod = products[carouselIndex];
            const statusColor = getOverviewColor(prod);
            const statusText = getOverviewStatusText(prod);
            let dotColor = '#10b981';
            if (statusColor === 'red') dotColor = '#ef4444';
            else if (statusColor === 'yellow') dotColor = '#f59e0b';
            else if (statusColor === 'orange') dotColor = '#f97316';
            const { SS, ROP, Q } = calculateInventory(prod.D, prod.sigma_d, prod.L, prod.Z, prod.I_current);
            const isSelected = selectedProduct && selectedProduct.id === prod.id;

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                {/* Up button */}
                <button
                  onClick={() => {
                    const idx = (carouselIndex - 1 + products.length) % products.length;
                    setCarouselIndex(idx);
                    selectProduct(products[idx]);
                  }}
                  style={{
                    width: '100%', padding: '0.4rem', border: '1px solid var(--border)',
                    borderRadius: '8px', background: 'var(--bg-secondary)', cursor: 'pointer',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    color: 'var(--text-secondary)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <ChevronUp size={18} />
                </button>

                {/* Product Card */}
                <div
                  onClick={() => { selectProduct(prod); }}
                  style={{
                    border: `2px solid ${isSelected ? 'var(--primary)' : dotColor + '55'}`,
                    borderRadius: '12px',
                    padding: '1.25rem',
                    background: isSelected ? 'var(--primary-light)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    boxShadow: `0 4px 16px ${dotColor}22`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Color accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '4px', background: dotColor, borderRadius: '12px 12px 0 0'
                  }} />

                  {/* Emoji + Name */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '2rem', lineHeight: 1 }}>{prod.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, lineHeight: 1.3, color: 'var(--text-primary)' }}>{prod.name}</div>
                      <div style={{ marginTop: '0.3rem' }}>
                        <span style={{
                          fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px',
                          borderRadius: '99px', background: dotColor + '22', color: dotColor,
                          border: `1px solid ${dotColor}44`
                        }}>● {statusText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                    {[
                      { label: 'Tồn kho', value: `${prod.I_current} ${prod.unit}`, highlight: true },
                      { label: 'Đề xuất nhập Q', value: `${Q} ${prod.unit}`, highlight: Q > 0 },
                      { label: 'ROP', value: ROP },
                      { label: 'SS (an toàn)', value: SS },
                    ].map(({ label, value, highlight }) => (
                      <div key={label} style={{
                        background: highlight ? dotColor + '11' : 'var(--bg-secondary)',
                        border: `1px solid ${highlight ? dotColor + '33' : 'var(--border)'}`,
                        borderRadius: '8px', padding: '0.5rem 0.6rem'
                      }}>
                        <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: highlight ? dotColor : 'var(--text-primary)', marginTop: '0.1rem' }}>{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Phân tích button */}
                  <button
                    onClick={e => { e.stopPropagation(); selectProduct(prod); }}
                    style={{
                      marginTop: '0.85rem', width: '100%', padding: '0.5rem',
                      background: isSelected ? 'var(--primary)' : 'white',
                      color: isSelected ? 'white' : 'var(--primary)',
                      border: '1.5px solid var(--primary)', borderRadius: '8px',
                      fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {isSelected ? '✓ Đang phân tích' : '→ Chọn để phân tích'}
                  </button>
                </div>

                {/* Down button */}
                <button
                  onClick={() => {
                    const idx = (carouselIndex + 1) % products.length;
                    setCarouselIndex(idx);
                    selectProduct(products[idx]);
                  }}
                  style={{
                    width: '100%', padding: '0.4rem', border: '1px solid var(--border)',
                    borderRadius: '8px', background: 'var(--bg-secondary)', cursor: 'pointer',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    color: 'var(--text-secondary)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <ChevronDown size={18} />
                </button>

                {/* Dot progress indicator */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap', padding: '0 0.5rem' }}>
                  {products.map((p, i) => {
                    const sc = getOverviewColor(p);
                    let dc = '#10b981';
                    if (sc === 'red') dc = '#ef4444';
                    else if (sc === 'yellow') dc = '#f59e0b';
                    return (
                      <button
                        key={p.id}
                        onClick={() => { setCarouselIndex(i); selectProduct(products[i]); }}
                        title={p.name}
                        style={{
                          width: i === carouselIndex ? '20px' : '8px',
                          height: '8px',
                          borderRadius: '99px',
                          background: i === carouselIndex ? dc : dc + '44',
                          border: 'none', cursor: 'pointer',
                          transition: 'all 0.25s', padding: 0,
                        }}
                      />
                    );
                  })}
                </div>

              </div>
            );
          })()}

          {/* Color Legend */}
          <div style={{
            padding: '0.75rem', background: 'var(--bg-secondary)',
            borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.72rem'
          }}>
            <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Chú giải trạng thái:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {[
                { color: '#ef4444', label: 'Đỏ: Cần nhập gấp' },
                { color: '#f59e0b', label: 'Vàng: Cân nhắc nhập' },
                { color: '#10b981', label: 'Xanh: Chưa cần nhập' },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Workspace */}
        {selectedProduct && (
          <div className="dashboard-main">
            {/* Header + Model Health Widget (Khu vực 4) */}
            <div className="db-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
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
                    <span>GIÁM SÁT MÔ HÌNH AI</span>
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

            {/* Main Action Grid: Direct Inventory Input & Order Recommendation */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              
              {/* KHU VỰC 1: ĐIỀN TỒN KHO THỰC TẾ (Thay vì kéo thanh trượt) */}
              <div className="card" style={{
                background: 'white', padding: '1.75rem', borderRadius: '12px',
                border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                      Tồn kho thực tế hiện tại (I<sub>current</sub>)
                    </h4>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px',
                      background: results.statusColor === 'red' ? '#fee2e2' : (results.statusColor === 'yellow' ? '#fef3c7' : '#dcfce7'),
                      color: results.statusColor === 'red' ? '#dc2626' : (results.statusColor === 'yellow' ? '#d97706' : '#16a34a'),
                      border: `1px solid ${results.statusColor === 'red' ? '#fca5a5' : (results.statusColor === 'yellow' ? '#fde68a' : '#86efac')}`
                    }}>
                      ● {results.statusText}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Điền số lượng thực tế kiểm kê tại quầy để hệ thống tự động tính toán lại lượng hàng cần nhập ngay lập tức.
                  </p>
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: '10px',
                  border: '1px solid var(--border)', flexWrap: 'wrap', gap: '0.75rem'
                }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Nhập số tồn kho:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="0"
                      className="db-param-input"
                      value={Icurrent}
                      onChange={e => setIcurrent(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0"
                      style={{
                        width: '120px',
                        padding: '0.5rem 0.75rem',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        color: results.statusColor === 'red' ? '#ef4444' : 'var(--primary)',
                        background: 'white',
                        borderRadius: '8px',
                        border: `2px solid ${results.statusColor === 'red' ? '#ef4444' : 'var(--primary)'}`
                      }}
                    />
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                      {selectedProduct.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* KHU VỰC 2: ĐỀ XUẤT NHẬP HÀNG (Order Recommendation Card) */}
              <div className="card" style={{
                borderLeft: '5px solid var(--primary)', background: 'white', position: 'relative',
                padding: '1.75rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Đề xuất nhập hàng (Order Recommendation)
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Khối lượng khuyến nghị do AI tính toán để tối ưu doanh thu và hạn chế tối đa hủy hàng.
                  </p>
                </div>

                {approved ? (
                  <div style={{
                    background: 'var(--primary-light)', color: 'var(--primary-hover)',
                    padding: '1.25rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem',
                    display: 'flex', alignItems: 'center', gap: '0.6rem'
                  }}>
                    <Check size={20} strokeWidth={3} />
                    Đã phê duyệt lượng nhập Q = {approvedQuantity} {selectedProduct.unit} gửi lên ERP thành công!
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Lượng đề xuất (Q):</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
                          <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {isAdjusting ? customQuantity : results.Q}
                          </span>
                          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                            {selectedProduct.unit}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <button
                          onClick={handleApprove}
                          style={{
                            background: 'var(--primary)', color: 'white', border: 'none',
                            padding: '0.7rem 1.4rem', borderRadius: '30px', fontWeight: 700,
                            fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
                            boxShadow: '0 4px 12px rgba(0, 139, 69, 0.25)'
                          }}
                        >
                          <Check size={18} /> Phê duyệt
                        </button>
                        <button
                          onClick={() => setIsAdjusting(!isAdjusting)}
                          style={{
                            background: isAdjusting ? 'var(--primary-light)' : 'white',
                            color: isAdjusting ? 'var(--primary)' : 'var(--text-secondary)',
                            border: '1px solid var(--border)',
                            padding: '0.7rem 1.4rem', borderRadius: '30px', fontWeight: 700,
                            fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
                          }}
                        >
                          <Edit3 size={16} /> {isAdjusting ? 'Hủy chỉnh' : 'Điều chỉnh'}
                        </button>
                      </div>
                    </div>

                    {/* Manual adjustment input */}
                    {isAdjusting && !approved && (
                      <div style={{
                        marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed var(--border)',
                        display: 'flex', alignItems: 'center', gap: '0.75rem'
                      }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                          Nhập thủ công lượng hàng:
                        </label>
                        <input
                          type="number"
                          className="db-param-input"
                          value={customQuantity}
                          onChange={e => setCustomQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                          style={{ maxWidth: '110px', padding: '0.4rem 0.6rem', textAlign: 'center', fontWeight: 800 }}
                        />
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                          {selectedProduct.unit}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* KHU VỰC 3: GIẢI THÍCH LÝ DO (Explainability Box) */}
            <div className="card" style={{
              background: '#fafdfb', border: '1px solid var(--border)',
              padding: '1.5rem 1.75rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
                <HelpCircle size={18} /> Giải thích lý do (Explainability)
              </h4>
              <p style={{
                fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: '1.6',
                fontStyle: 'italic', fontWeight: 500
              }}>
                "{getExplainabilityText()}"
              </p>
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
