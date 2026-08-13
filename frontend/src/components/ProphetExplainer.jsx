import React, { useState, useEffect, useRef } from 'react';
import { Sliders, HelpCircle, Activity } from 'lucide-react';
import { generateLocalForecast } from '../data/products';

export default function ProphetExplainer() {
  const [trend, setTrend] = useState(1.0);
  const [seasonality, setSeasonality] = useState(1.0);
  const [holiday, setHoliday] = useState(1.0);
  const [noise, setNoise] = useState(0.5);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState('combined'); // combined, trend, weekly, holiday

  useEffect(() => {
    setLoading(true);
    // Generate simulated forecast client-side for serverless deployment
    const result = generateLocalForecast('ba-roi-heo-cp', trend, seasonality, holiday, noise);
    setForecastData(result.data || []);
    setLoading(false);
  }, [trend, seasonality, holiday, noise]);

  // SVG Chart parameters
  const width = 600;
  const height = 280;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Find Min and Max values for scaling
  let minVal = 0;
  let maxVal = 250; // default max

  if (forecastData.length > 0) {
    const allValues = forecastData.flatMap(d => [
      d.actual, d.forecast, d.trend, d.upperBound, d.lowerBound
    ].filter(v => v !== null));
    maxVal = Math.max(...allValues) * 1.1;
  }

  const getX = (index) => {
    return paddingLeft + (index / (forecastData.length - 1)) * chartWidth;
  };

  const getY = (val) => {
    if (val === null) return null;
    return paddingTop + chartHeight - (val / maxVal) * chartHeight;
  };

  // Generate SVG elements
  const renderChartElements = () => {
    if (forecastData.length === 0) return null;

    // 1. Grid & Axes
    const gridLines = [];
    const numGridLines = 5;
    for (let i = 0; i <= numGridLines; i++) {
      const val = (maxVal / numGridLines) * i;
      const y = getY(val);
      gridLines.push(
        <g key={`grid-${i}`}>
          <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e2e8f0" strokeDasharray="4 4" />
          <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">{Math.round(val)}</text>
        </g>
      );
    }

    // Date Labels (every 7 days)
    const dateLabels = [];
    forecastData.forEach((d, idx) => {
      if (idx % 6 === 0 || idx === forecastData.length - 1) {
        const x = getX(idx);
        dateLabels.push(
          <text key={`date-${idx}`} x={x} y={height - paddingBottom + 18} textAnchor="middle" fontSize="10" fill="#94a3b8">
            {d.date}
          </text>
        );
      }
    });

    // 2. Uncertainty Band (Confidence Interval)
    const upperPoints = [];
    const lowerPoints = [];
    forecastData.forEach((d, idx) => {
      if (d.isForecast) {
        upperPoints.push(`${getX(idx)},${getY(d.upperBound)}`);
        lowerPoints.unshift(`${getX(idx)},${getY(d.lowerBound)}`);
      }
    });
    const confidencePath = upperPoints.concat(lowerPoints).join(' ');

    // 3. Line Paths
    let actualPath = [];
    let forecastPath = [];
    let trendPath = [];
    let seasonalPath = [];

    forecastData.forEach((d, idx) => {
      const x = getX(idx);
      if (d.actual !== null) {
        actualPath.push(`${x},${getY(d.actual)}`);
      }
      forecastPath.push(`${x},${getY(d.forecast)}`);
      trendPath.push(`${x},${getY(d.trend)}`);
      
      // Weekly seasonality plotted around middle line
      const middle = maxVal / 2;
      seasonalPath.push(`${x},${getY(middle + d.weekly)}`);
    });

    // Vertical line divider between history and forecast
    const forecastStartIndex = forecastData.findIndex(d => d.isForecast);
    const dividerX = getX(forecastStartIndex);

    return (
      <>
        {gridLines}
        {dateLabels}

        {/* Divider line for history vs forecast */}
        <line x1={dividerX} y1={paddingTop} x2={dividerX} y2={height - paddingBottom} stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 3" />
        <text x={dividerX - 6} y={paddingTop + 12} textAnchor="end" fontSize="10" fontWeight="600" fill="var(--primary)">QUÁ KHỨ</text>
        <text x={dividerX + 6} y={paddingTop + 12} textAnchor="start" fontSize="10" fontWeight="600" fill="var(--primary)">DỰ BÁO AI</text>

        {/* Combined View */}
        {activeComponent === 'combined' && (
          <>
            {/* Confidence Interval Polygon */}
            {confidencePath && (
              <polygon points={confidencePath} fill="rgba(0, 139, 69, 0.08)" stroke="none" />
            )}

            {/* Forecast Line */}
            <path d={`M ${forecastPath.join(' L ')}`} fill="none" stroke="var(--primary)" strokeWidth="2.5" />
            
            {/* Historical Actual Points */}
            {forecastData.map((d, idx) => {
              if (d.actual !== null) {
                return (
                  <circle key={`act-${idx}`} cx={getX(idx)} cy={getY(d.actual)} r="3" fill="#64748b" />
                );
              }
              return null;
            })}
          </>
        )}

        {/* Trend Component View */}
        {activeComponent === 'trend' && (
          <path d={`M ${trendPath.join(' L ')}`} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
        )}

        {/* Weekly Seasonality Component View */}
        {activeComponent === 'weekly' && (
          <>
            <line x1={paddingLeft} y1={getY(maxVal / 2)} x2={width - paddingRight} y2={getY(maxVal / 2)} stroke="#94a3b8" strokeWidth="1" />
            <path d={`M ${seasonalPath.join(' L ')}`} fill="none" stroke="#3b82f6" strokeWidth="2" />
          </>
        )}

        {/* Holiday Events View */}
        {activeComponent === 'holiday' && (
          <>
            {forecastData.map((d, idx) => {
              if (d.holiday !== 0) {
                return (
                  <g key={`hol-${idx}`}>
                    <line x1={getX(idx)} y1={getY(0)} x2={getX(idx)} y2={getY(d.holiday)} stroke="var(--accent)" strokeWidth="2" />
                    <circle cx={getX(idx)} cy={getY(d.holiday)} r="5" fill="var(--accent)" />
                    <text x={getX(idx)} y={getY(d.holiday) - 8} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-primary)">
                      {d.holiday > 0 ? `+${d.holiday}` : d.holiday}
                    </text>
                  </g>
                );
              }
              return null;
            })}
          </>
        )}
      </>
    );
  };

  return (
    <section className="section" id="prophet" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="section-header">
        <span className="section-num">Chương 2</span>
        <h2 className="section-title">Thuật Toán Dự Báo Prophet & Cơ Chế Hoạt Động</h2>
        <div className="section-divider"></div>
      </div>

      <div className="prophet-layout">
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>
            2.3. Lựa chọn mô hình Prophet
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Prophet (do Facebook phát triển) được tối ưu cho các chuỗi thời gian bán lẻ có tính mùa vụ mạnh và chịu ảnh hưởng lớn từ các sự kiện đặc biệt (ngày Lễ, Tết, lịch âm).
          </p>

          <div className="formula-card">
            y(t) = g(t) + s(t) + h(t) + εₜ
          </div>

          <div className="formula-breakdown">
            <div className="formula-part" style={{ borderLeft: activeComponent === 'trend' ? '4px solid #64748b' : 'none' }}>
              <span className="math">g(t)</span>
              <strong>Xu hướng (Trend):</strong> Thành phần tăng trưởng dài hạn. Hãy chỉnh thanh trượt Trend để xem xu hướng tăng/giảm.
            </div>
            <div className="formula-part" style={{ borderLeft: activeComponent === 'weekly' ? '4px solid #3b82f6' : 'none' }}>
              <span className="math">s(t)</span>
              <strong>Mùa vụ (Seasonality):</strong> Quy luật lặp lại (cuối tuần đông khách hơn thứ 2, thứ 3).
            </div>
            <div className="formula-part" style={{ borderLeft: activeComponent === 'holiday' ? '4px solid var(--accent)' : 'none' }}>
              <span className="math">h(t)</span>
              <strong>Sự kiện (Holidays):</strong> Tác động đột biến từ các ngày lễ, ngày rằm (mùng 1, 15 âm lịch ảnh hưởng lớn đến hành vi mua thịt cá).
            </div>
            <div className="formula-part">
              <span className="math">εₜ</span>
              <strong>Sai số ngẫu nhiên (Noise):</strong> Biến động không thể đoán trước từ thời tiết, giao thông.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '30px', border: '1px solid var(--border)' }}>
            <button 
              className={`btn ${activeComponent === 'combined' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveComponent('combined')}
              style={{ flexGrow: 1, padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Dự báo Tổng hợp y(t)
            </button>
            <button 
              className={`btn ${activeComponent === 'trend' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveComponent('trend')}
              style={{ flexGrow: 1, padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Xu hướng g(t)
            </button>
            <button 
              className={`btn ${activeComponent === 'weekly' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveComponent('weekly')}
              style={{ flexGrow: 1, padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Mùa vụ s(t)
            </button>
            <button 
              className={`btn ${activeComponent === 'holiday' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveComponent('holiday')}
              style={{ flexGrow: 1, padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Sự kiện h(t)
            </button>
          </div>

          <div className="chart-container">
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <div className="spinner"></div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Đang tính toán dự báo...</span>
              </div>
            ) : (
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
                {renderChartElements()}
              </svg>
            )}
          </div>

          {/* Sliders to modify simulation */}
          <div className="card" style={{ padding: '1.5rem', background: 'var(--bg-secondary)', border: 'none' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={16} /> Điều chỉnh tham số mô phỏng AI
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="slider-group">
                <div className="slider-label" style={{ fontSize: '0.85rem' }}>
                  <span>Xu hướng g(t):</span>
                  <span className="slider-value">{trend.toFixed(1)}x</span>
                </div>
                <input type="range" min="0.2" max="2.0" step="0.1" value={trend} onChange={e => setTrend(parseFloat(e.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-label" style={{ fontSize: '0.85rem' }}>
                  <span>Mùa vụ cuối tuần s(t):</span>
                  <span className="slider-value">{seasonality.toFixed(1)}x</span>
                </div>
                <input type="range" min="0.0" max="2.0" step="0.1" value={seasonality} onChange={e => setSeasonality(parseFloat(e.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-label" style={{ fontSize: '0.85rem' }}>
                  <span>Tác động sự kiện h(t):</span>
                  <span className="slider-value">{holiday.toFixed(1)}x</span>
                </div>
                <input type="range" min="0.0" max="2.0" step="0.1" value={holiday} onChange={e => setHoliday(parseFloat(e.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-label" style={{ fontSize: '0.85rem' }}>
                  <span>Độ nhiễu εₜ:</span>
                  <span className="slider-value">{noise.toFixed(1)}x</span>
                </div>
                <input type="range" min="0.0" max="1.5" step="0.1" value={noise} onChange={e => setNoise(parseFloat(e.target.value))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
