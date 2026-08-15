// Bách Hóa Xanh real product data and price points
export const initialProducts = [
  // ── THỊT HEO ─────────────────────────────────────
  {
    id: 'ba-roi-heo-cp',
    name: 'Ba rọi heo C.P (Khay 300g)',
    category: 'Thịt', emoji: '🥓',
    unit: 'khay',
    D: 150, sigma_d: 25, L: 1, Z: 2.05, I_current: 110,
    in_transit: 11,
    cost_price: 28000, selling_price: 41000,
  },
  {
    id: 'dui-heo-cp',
    name: 'Thịt đùi heo C.P (Khay 400g)',
    category: 'Thịt', emoji: '🍖',
    unit: 'khay',
    D: 120, sigma_d: 18, L: 1, Z: 1.65, I_current: 85,
    in_transit: 15,
    cost_price: 30000, selling_price: 43600,
  },
  {
    id: 'nac-vai-heo',
    name: 'Thịt heo nạc vai (Khay 400g)',
    category: 'Thịt', emoji: '🍖',
    unit: 'khay',
    D: 100, sigma_d: 20, L: 1, Z: 1.65, I_current: 60,
    in_transit: 10,
    cost_price: 32000, selling_price: 46000,
  },
  // ── THỊT BÒ & GÀ ─────────────────────────────────
  {
    id: 'bo-than-cp',
    name: 'Thịt bò thăn (Khay 300g)',
    category: 'Thịt', emoji: '🥩',
    unit: 'khay',
    D: 60, sigma_d: 15, L: 1, Z: 2.05, I_current: 30,
    in_transit: 5,
    cost_price: 120000, selling_price: 169000,
  },
  {
    id: 'uc-ga-cn',
    name: 'Ức gà công nghiệp (Khay 500g)',
    category: 'Thịt', emoji: '🍗',
    unit: 'khay',
    D: 130, sigma_d: 22, L: 1, Z: 1.65, I_current: 95,
    in_transit: 18,
    cost_price: 25000, selling_price: 36000,
  },
  // ── CÁ TƯƠI ──────────────────────────────────────
  {
    id: 'ca-dieu-hong',
    name: 'Cá diêu hồng làm sạch (Con 500g)',
    category: 'Cá', emoji: '🐠',
    unit: 'con',
    D: 65, sigma_d: 12, L: 2, Z: 1.65, I_current: 40,
    in_transit: 8,
    cost_price: 30000, selling_price: 43000,
  },
  {
    id: 'ca-basa-fillet',
    name: 'Cá basa fillet (Khay 400g)',
    category: 'Cá', emoji: '🐟',
    unit: 'khay',
    D: 55, sigma_d: 10, L: 2, Z: 1.65, I_current: 25,
    in_transit: 6,
    cost_price: 38000, selling_price: 55000,
  },
  {
    id: 'ca-thu-cat-khuc',
    name: 'Cá thu cắt khúc (Khay 400g)',
    category: 'Cá', emoji: '🐟',
    unit: 'khay',
    D: 45, sigma_d: 8, L: 2, Z: 1.65, I_current: 35,
    in_transit: 4,
    cost_price: 55000, selling_price: 79000,
  },
  // ── HẢI SẢN ──────────────────────────────────────
  {
    id: 'tom-the-cp',
    name: 'Tôm thẻ chân trắng C.P (Khay 200g)',
    category: 'Hải sản', emoji: '🦐',
    unit: 'khay',
    D: 80, sigma_d: 15, L: 2, Z: 2.05, I_current: 55,
    in_transit: 12,
    cost_price: 23000, selling_price: 33000,
  },
  {
    id: 'tom-su-tuoi',
    name: 'Tôm sú tươi (Khay 300g)',
    category: 'Hải sản', emoji: '🦐',
    unit: 'khay',
    D: 50, sigma_d: 12, L: 2, Z: 2.05, I_current: 20,
    in_transit: 7,
    cost_price: 65000, selling_price: 93000,
  },
  {
    id: 'muc-ong-tuoi',
    name: 'Mực ống tươi (Khay 300g)',
    category: 'Hải sản', emoji: '🦑',
    unit: 'khay',
    D: 40, sigma_d: 10, L: 2, Z: 1.65, I_current: 28,
    in_transit: 5,
    cost_price: 45000, selling_price: 65000,
  },
  {
    id: 'ngheu-trang',
    name: 'Nghêu trắng (Túi 500g)',
    category: 'Hải sản', emoji: '🦪',
    unit: 'túi',
    D: 35, sigma_d: 8, L: 2, Z: 1.65, I_current: 18,
    in_transit: 10,
    cost_price: 22000, selling_price: 32000,
  },
  // ── TRỨNG ────────────────────────────────────────
  {
    id: 'trung-ga-10',
    name: 'Trứng gà công nghiệp (Hộp 10 quả)',
    category: 'Trứng', emoji: '🥚',
    unit: 'hộp',
    D: 210, sigma_d: 30, L: 3, Z: 2.33, I_current: 310,
    in_transit: 30,
    cost_price: 18000, selling_price: 26000,
  },
  // ── RAU CỦ ────────────────────────────────────────
  {
    id: 'rau-muong',
    name: 'Rau muống (Bó)',
    category: 'Rau củ', emoji: '🥬',
    unit: 'bó',
    D: 80, sigma_d: 20, L: 1, Z: 1.28, I_current: 55,
    in_transit: 15,
    cost_price: 5000, selling_price: 8000,
  },
  {
    id: 'cai-ngot',
    name: 'Cải ngọt (Bó)',
    category: 'Rau củ', emoji: '🥬',
    unit: 'bó',
    D: 70, sigma_d: 18, L: 1, Z: 1.28, I_current: 48,
    in_transit: 12,
    cost_price: 5500, selling_price: 8500,
  },
  {
    id: 'ca-chua',
    name: 'Cà chua (Túi 500g)',
    category: 'Rau củ', emoji: '🍅',
    unit: 'túi',
    D: 90, sigma_d: 22, L: 1, Z: 1.28, I_current: 70,
    in_transit: 18,
    cost_price: 12000, selling_price: 18000,
  },
  {
    id: 'dua-leo',
    name: 'Dưa leo (Túi 500g)',
    category: 'Rau củ', emoji: '🥒',
    unit: 'túi',
    D: 75, sigma_d: 18, L: 1, Z: 1.28, I_current: 55,
    in_transit: 14,
    cost_price: 10000, selling_price: 15000,
  },
  {
    id: 'xa-lach-lolo',
    name: 'Xà lách lolo (Bó)',
    category: 'Rau củ', emoji: '🥗',
    unit: 'bó',
    D: 40, sigma_d: 12, L: 1, Z: 1.28, I_current: 15,
    in_transit: 8,
    cost_price: 8000, selling_price: 12000,
  },
  {
    id: 'ca-rot',
    name: 'Cà rốt (Túi 500g)',
    category: 'Rau củ', emoji: '🥕',
    unit: 'túi',
    D: 60, sigma_d: 15, L: 1, Z: 1.28, I_current: 45,
    in_transit: 10,
    cost_price: 9000, selling_price: 14000,
  },
  {
    id: 'khoai-tay',
    name: 'Khoai tây (Túi 1kg)',
    category: 'Rau củ', emoji: '🥔',
    unit: 'túi',
    D: 85, sigma_d: 20, L: 1, Z: 1.28, I_current: 62,
    in_transit: 12,
    cost_price: 18000, selling_price: 26000,
  },
  {
    id: 'hanh-la',
    name: 'Hành lá (Bó)',
    category: 'Rau củ', emoji: '🌿',
    unit: 'bó',
    D: 50, sigma_d: 15, L: 1, Z: 1.28, I_current: 38,
    in_transit: 5,
    cost_price: 4000, selling_price: 6500,
  },
];

// Helper to calculate inventory indicators
export const calculateInventory = (D, sigma_d, L, Z, I_current) => {
  // SS = Z * sigma_d * sqrt(L)
  const SS = Math.round(Z * sigma_d * Math.sqrt(L));
  
  // ROP = (D * L) + SS
  const ROP = Math.round((D * L) + SS);

  // Target Stock = ROP + (D * 0.5)
  const targetStock = Math.round(ROP + (D * 0.5));
  
  // Q = (D + SS) - I_current
  let Q = Math.round((D + SS) - I_current);
  if (Q < 0) Q = 0;

  let status = 'NORMAL';
  let statusText = 'Chưa cần nhập thêm';
  let statusColor = 'green';

  if (I_current < ROP) {
    status = 'REORDER_NOW';
    statusText = 'Cần nhập gấp';
    statusColor = 'red';
  } else if (I_current < ROP * 1.25) {
    status = 'REORDER_SOON';
    statusText = 'Cân nhắc nhập số lượng phù hợp';
    statusColor = 'yellow';
  } else if (I_current > (D + SS) * 2.5) {
    status = 'OVERSTOCK';
    statusText = 'Chưa cần nhập thêm';
    statusColor = 'green';
  }

  return { SS, ROP, targetStock, Q, status, statusText, statusColor };
};

// Generate simulated Prophet forecast data locally
export const generateLocalForecast = (productId, trendScale = 1.0, seasonalityScale = 1.0, holidayScale = 1.0, noiseScale = 0.5) => {
  const product = initialProducts.find(p => p.id === productId) || initialProducts[0];
  const D = product.D;

  const data = [];
  const now = new Date();
  
  for (let i = -30; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    
    // 1. Trend
    const baseTrend = D * (1 + (i / 100) * 0.2 * trendScale); 
    
    // 2. Seasonality
    let weeklySeasonality = 0;
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      weeklySeasonality = D * 0.35 * seasonalityScale;
    } else if (dayOfWeek === 5) {
      weeklySeasonality = D * 0.15 * seasonalityScale;
    } else {
      weeklySeasonality = -D * 0.12 * seasonalityScale;
    }
    
    // 3. Holidays/Events
    let holidayEffect = 0;
    if (dayOfMonth === 15 || dayOfMonth === 1) {
      if (product.id === 'ba-roi-heo-cp' || product.id === 'dui-heo-cp') {
        holidayEffect = -D * 0.25 * holidayScale;
      } else if (product.id === 'trung-ga-10') {
        holidayEffect = D * 0.15 * holidayScale;
      } else {
        holidayEffect = D * 0.2 * holidayScale;
      }
    }
    
    // 4. Noise
    const noise = (Math.random() - 0.5) * D * 0.15 * noiseScale;
    
    const y = Math.max(0, Math.round(baseTrend + weeklySeasonality + holidayEffect + (i <= 0 ? noise : 0)));
    const forecast_y = Math.max(0, Math.round(baseTrend + weeklySeasonality + holidayEffect));
    
    const dateString = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    
    data.push({
      date: dateString,
      isForecast: i > 0,
      actual: i <= 0 ? y : null,
      forecast: forecast_y,
      trend: Math.round(baseTrend),
      weekly: Math.round(weeklySeasonality),
      holiday: Math.round(holidayEffect),
      upperBound: Math.round(forecast_y + (1.96 * product.sigma_d)),
      lowerBound: Math.max(0, Math.round(forecast_y - (1.96 * product.sigma_d)))
    });
  }

  return {
    productId: product.id,
    productName: product.name,
    baseDemand: D,
    data
  };
};
