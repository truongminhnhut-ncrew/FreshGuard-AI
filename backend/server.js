import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Bách Hóa Xanh simulated products
const initialProducts = [
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
const calculateInventory = (D, sigma_d, L, Z, I_current) => {
  // SS = Z * sigma_d * sqrt(L)
  const SS = Math.round(Z * sigma_d * Math.sqrt(L));
  
  // ROP = (D * L) + SS
  const ROP = Math.round((D * L) + SS);
  
  // Q = D + SS - I_current (assuming ordering for 1 day demand buffer + SS, or standard daily replenishment cycle)
  // Let's use formula from PDF: Q = (D + SS) - I_current. 
  // However, normally order quantity is at least to reach target inventory level (D * L + SS or D + SS depending on replenishment frequency)
  // Let's respect the PDF formula exactly: Q = (D + SS) - I_current
  let Q = Math.round((D + SS) - I_current);
  if (Q < 0) Q = 0; // cannot order negative quantity

  let status = 'NORMAL';
  let statusText = 'Ổn định';
  let statusColor = 'green';

  if (I_current < ROP) {
    status = 'REORDER_NOW';
    statusText = 'Đặt hàng khẩn cấp';
    statusColor = 'red';
  } else if (I_current < ROP * 1.25) {
    status = 'REORDER_SOON';
    statusText = 'Cảnh báo sắp hết hàng';
    statusColor = 'yellow';
  } else if (I_current > (D + SS) * 2.5) {
    status = 'OVERSTOCK';
    statusText = 'Tồn kho quá cao';
    statusColor = 'orange';
  }

  return { SS, ROP, Q, status, statusText, statusColor };
};

// API: Get products
app.get('/api/products', (req, res) => {
  const productsWithCalcs = initialProducts.map(p => {
    const calcs = calculateInventory(p.D, p.sigma_d, p.L, p.Z, p.I_current);
    return { ...p, ...calcs };
  });
  res.json(productsWithCalcs);
});

// API: Perform calculations dynamically
app.post('/api/calculate', (req, res) => {
  const { D, sigma_d, L, Z, I_current } = req.body;
  if (D === undefined || sigma_d === undefined || L === undefined || Z === undefined || I_current === undefined) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const results = calculateInventory(
    parseFloat(D),
    parseFloat(sigma_d),
    parseFloat(L),
    parseFloat(Z),
    parseFloat(I_current)
  );
  res.json(results);
});

// API: Generate simulated Prophet forecast data
app.get('/api/forecast/:productId', (req, res) => {
  const { productId } = req.params;
  const trendScale = parseFloat(req.query.trend) || 1.0;
  const seasonalityScale = parseFloat(req.query.seasonality) || 1.0;
  const holidayScale = parseFloat(req.query.holiday) || 1.0;
  const noiseScale = parseFloat(req.query.noise) || 1.0;

  const product = initialProducts.find(p => p.id === productId) || initialProducts[0];
  const D = product.D;

  const data = [];
  const now = new Date();
  
  // Generate last 30 days (actual values) and next 7 days (forecasted values)
  for (let i = -30; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    
    const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
    const dayOfMonth = date.getDate();
    
    // Components of Prophet: y(t) = g(t) + s(t) + h(t) + e(t)
    
    // 1. Trend: gradual change + growth factor
    const baseTrend = D * (1 + (i / 100) * 0.2 * trendScale); 
    
    // 2. Seasonality: weekends demand increases for groceries
    let weeklySeasonality = 0;
    if (dayOfWeek === 6 || dayOfWeek === 0) { // Saturday, Sunday
      weeklySeasonality = D * 0.35 * seasonalityScale;
    } else if (dayOfWeek === 5) { // Friday
      weeklySeasonality = D * 0.15 * seasonalityScale;
    } else {
      weeklySeasonality = -D * 0.12 * seasonalityScale; // lower weekday demand
    }
    
    // 3. Holidays/Events: Lunar 1st/15th (Rằm), or random events
    let holidayEffect = 0;
    // Assume a simulated Rằm event around middle of time series or specific days
    if (dayOfMonth === 15 || dayOfMonth === 1) {
      // Veggies spike on Rằm (1st/15th lunar), meat decreases.
      if (product.id === 'ba-roi-heo-cp' || product.id === 'dui-heo-cp') {
        // Thịt có xu hướng giảm nhẹ vào mùng 1, rằm âm lịch do ăn chay
        holidayEffect = -D * 0.25 * holidayScale;
      } else if (product.id === 'trung-ga-10') {
        // Trứng tăng nhẹ
        holidayEffect = D * 0.15 * holidayScale;
      } else {
        holidayEffect = D * 0.2 * holidayScale;
      }
    }
    
    // 4. Noise: Random fluctuation
    const noise = (Math.random() - 0.5) * D * 0.15 * noiseScale;
    
    // Total y(t)
    const y = Math.max(0, Math.round(baseTrend + weeklySeasonality + holidayEffect + (i <= 0 ? noise : 0)));
    
    // Forecast components
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

  res.json({
    productId: product.id,
    productName: product.name,
    baseDemand: D,
    data
  });
});

app.listen(PORT, () => {
  console.log(`FreshGuard API server running on port ${PORT}`);
});
