// Bách Hóa Xanh real product data and price points
export const initialProducts = [
  {
    id: 'ba-roi-heo-cp',
    name: 'Ba rọi heo C.P (Khay 300g)',
    category: 'Thịt heo',
    unit: 'khay',
    D: 150,          // Nhu cầu trung bình/ngày
    sigma_d: 25,     // Độ lệch chuẩn nhu cầu
    L: 1,            // Lead time (ngày)
    Z: 2.05,         // Hệ số dịch vụ (98%)
    I_current: 110,  // Tồn kho hiện tại
    cost_price: 28000,
    selling_price: 41000,
  },
  {
    id: 'dui-heo-cp',
    name: 'Thịt đùi heo C.P (Khay 400g)',
    category: 'Thịt heo',
    unit: 'khay',
    D: 120,
    sigma_d: 18,
    L: 1,
    Z: 1.65,         // Hệ số dịch vụ (95%)
    I_current: 85,
    cost_price: 30000,
    selling_price: 43600,
  },
  {
    id: 'ca-dieu-hong',
    name: 'Cá diêu hồng làm sạch (Con 500g)',
    category: 'Cá tươi',
    unit: 'con',
    D: 65,
    sigma_d: 12,
    L: 2,
    Z: 1.65,         // Hệ số dịch vụ (95%)
    I_current: 40,
    cost_price: 30000,
    selling_price: 43000,
  },
  {
    id: 'trung-ga-10',
    name: 'Trứng gà công nghiệp (Hộp 10 quả)',
    category: 'Trứng',
    unit: 'hộp',
    D: 210,
    sigma_d: 30,
    L: 3,
    Z: 2.33,         // Hệ số dịch vụ (99%)
    I_current: 310,
    cost_price: 18000,
    selling_price: 26000,
  },
  {
    id: 'tom-the-cp',
    name: 'Tôm thẻ chân trắng C.P (Khay 200g)',
    category: 'Hải sản',
    unit: 'khay',
    D: 80,
    sigma_d: 15,
    L: 2,
    Z: 2.05,         // Hệ số dịch vụ (98%)
    I_current: 55,
    cost_price: 23000,
    selling_price: 33000,
  }
];

// Helper to calculate inventory indicators
export const calculateInventory = (D, sigma_d, L, Z, I_current) => {
  // SS = Z * sigma_d * sqrt(L)
  const SS = Math.round(Z * sigma_d * Math.sqrt(L));
  
  // ROP = (D * L) + SS
  const ROP = Math.round((D * L) + SS);
  
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

  return { SS, ROP, Q, status, statusText, statusColor };
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
