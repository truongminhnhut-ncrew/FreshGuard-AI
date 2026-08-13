import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function CostBalancer() {
  const [orderRatio, setOrderRatio] = useState(120); // 120% of demand

  const baseDemand = 100; // 100kg
  const costPrice = 15000; // 15,000 VND/kg
  const profitMargin = 10000; // 10,000 VND/kg profit
  
  const orderQuantity = Math.round((baseDemand * orderRatio) / 100);
  
  // Simple expected cost calculation for overstock and understock
  // In a real system, these are integrals over the normal distribution.
  // We can approximate them with simple non-linear formulas for interactive feel:
  const diff = orderQuantity - baseDemand;
  let overstockCost = 0;
  let understockCost = 0;

  if (diff > 0) {
    overstockCost = diff * costPrice;
    understockCost = Math.max(0, (20 - diff)) * profitMargin * 0.1; // small residual stockout risk
  } else {
    understockCost = Math.abs(diff) * profitMargin;
    overstockCost = Math.max(0, (20 - Math.abs(diff))) * costPrice * 0.1; // small residual waste risk
  }

  overstockCost = Math.round(overstockCost);
  understockCost = Math.round(understockCost);
  const totalCost = overstockCost + understockCost;

  // Balance scale tilt angle based on cost difference
  // max tilt of 15 degrees
  const costDiff = overstockCost - understockCost;
  const maxCost = Math.max(overstockCost, understockCost, 1);
  const angle = Math.min(15, Math.max(-15, (costDiff / maxCost) * 15));

  // Determine explanation message
  let message = "";
  let messageClass = "";
  if (orderRatio < 85) {
    message = "⚠️ NHẬP THIẾU NGHIÊM TRỌNG: Cửa hàng liên tục đứt hàng, mất doanh thu lớn và làm giảm trải nghiệm mua sắm của khách hàng.";
    messageClass = "warning-text";
  } else if (orderRatio >= 85 && orderRatio < 98) {
    message = "📉 NHẬP HƠI THIẾU: Tồn kho ở mức thấp, giảm thiểu hao hụt nhưng vẫn có nguy cơ đứt hàng vào khung giờ cao điểm hoặc cuối ngày.";
    messageClass = "warning-text-light";
  } else if (orderRatio >= 98 && orderRatio <= 112) {
    message = "✅ ĐIỂM TỐI ƯU KINH TẾ: Tổng chi phí (Hủy hàng + Mất doanh thu) đạt mức thấp nhất. Tồn kho vừa đủ để phục vụ khách hàng với độ tin cậy cao.";
    messageClass = "success-text";
  } else if (orderRatio > 112 && orderRatio <= 140) {
    message = "📈 NHẬP HƠI DƯ: Đảm bảo không đứt hàng nhưng phát sinh chi phí hủy hàng và giảm giá xả kho vào cuối ngày.";
    messageClass = "danger-text-light";
  } else {
    message = "🚨 NHẬP DƯ NGHIÊM TRỌNG: Hao hụt và hủy hàng tăng vọt, ăn mòn toàn bộ lợi nhuận của sản phẩm. Chi phí lưu kho và xử lý rác thải tăng cao.";
    messageClass = "danger-text";
  }

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="cost-balancer-container">
      <div className="simulator-controls">
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Bảng điều khiển quyết định nhập hàng
        </h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Thay đổi tỷ lệ nhập hàng so với nhu cầu thực tế (100 kg) để xem tác động trực quan đến chi phí.
        </p>

        <div className="slider-group" style={{ marginTop: '1rem' }}>
          <div className="slider-label">
            <span>Tỷ lệ lượng hàng nhập:</span>
            <span className="slider-value">{orderRatio}% ({orderQuantity} kg)</span>
          </div>
          <input
            type="range"
            min="50"
            max="180"
            value={orderRatio}
            onChange={(e) => setOrderRatio(parseInt(e.target.value))}
          />
        </div>

        <div className="cost-results">
          <div className="cost-box">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Chi phí hao hụt (Hủy hàng)
            </div>
            <div className="cost-box-val" style={{ color: 'var(--danger)' }}>
              {formatVND(overstockCost)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Do nhập dư thừa
            </div>
          </div>

          <div className="cost-box">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Chi phí cơ hội (Mất sales)
            </div>
            <div className="cost-box-val" style={{ color: 'var(--warning)' }}>
              {formatVND(understockCost)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Do đứt hàng, thiếu hàng
            </div>
          </div>

          <div className="cost-box total">
            <div style={{ fontSize: '0.85rem', color: 'var(--primary-hover)', fontWeight: 700 }}>
              TỔNG CHI PHÍ PHÁT SINH
            </div>
            <div className="cost-box-val">
              {formatVND(totalCost)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-hover)' }}>
              {orderRatio >= 98 && orderRatio <= 112 ? "🎉 Đã đạt điểm tối ưu chi phí!" : "Cần điều chỉnh để tối ưu hóa"}
            </div>
          </div>
        </div>
      </div>

      <div className="trade-off-visualization">
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Cán cân chi phí (Trade-off)
        </h4>
        
        <div className="scale-wrapper">
          {/* Main Stand */}
          <div className="scale-base">
            <div className="scale-pillar"></div>
          </div>
          {/* Beam that tilts */}
          <div className="scale-beam" style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}>
            {/* Left Pan */}
            <div className="scale-pan scale-pan-left" style={{ transform: `rotate(${-angle}deg)` }}>
              <div className="scale-string-left"></div>
              <div className="pan-label pan-left-label" style={{ fontWeight: 800 }}>
                Hao hụt<br />{formatVND(overstockCost)}
              </div>
            </div>
            {/* Right Pan */}
            <div className="scale-pan scale-pan-right" style={{ transform: `rotate(${-angle}deg)` }}>
              <div className="scale-string-right"></div>
              <div className="pan-label pan-right-label" style={{ fontWeight: 800 }}>
                Mất sales<br />{formatVND(understockCost)}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '2.5rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          width: '100%',
          fontSize: '0.85rem',
          lineHeight: '1.5'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary)' }} />
            <div className={messageClass} style={{ fontWeight: 600 }}>{message}</div>
          </div>
        </div>
      </div>

      <style>{`
        .success-text { color: var(--primary); }
        .warning-text { color: var(--danger); }
        .warning-text-light { color: var(--warning); }
        .danger-text-light { color: var(--warning); }
        .danger-text { color: var(--danger); }
      `}</style>
    </div>
  );
}
