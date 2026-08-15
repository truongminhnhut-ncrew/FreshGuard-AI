# 🌿 FreshGuard AI — Frontend Application

Giao diện Web Hệ Thống Hỗ Trợ Ra Quyết Định Nhập Hàng Tươi Sống (DSS) xây dựng bằng **React + Vite**.

## 🚀 Tính Năng Chính

- **Bảng Tổng Quan Tồn Kho Thực Tế:** Giám sát trạng thái tồn kho các mặt hàng tươi sống (Thịt ba rọi, Đùi heo, Cá điêu hồng, Tôm thẻ, Trứng gà) bằng hệ thống đèn cảnh báo Đỏ - Vàng - Xanh.
- **Đề Xuất Nhập Hàng Tự Động (Q):** Tính toán lượng đặt hàng tối ưu kết hợp mô hình AI Prophet và các chỉ số quản trị tồn kho ($SS, ROP, Q$).
- **Hộp Giải Thích AI Minh Bạch (Explainability):** Diễn giải lý do đề xuất tăng/giảm số lượng dựa trên lịch Âm/Dương, thời tiết và khuyến mãi.
- **Bộ Mô Phỏng & Tùy Biến Tham Số:** Cho phép kéo trượt điều chỉnh nhu cầu $D$, biến động $\sigma_d$, Lead time $L$, Hệ số an toàn $Z$ và Tồn kho thực tế $I_{current}$ theo thời gian thực.
- **Hộp Thoại Hướng Dẫn Sử Dụng Trực Tuyến (Interactive User Guide):** Hướng dẫn 4 bước thao tác, ý nghĩa 4 phân vùng, bảng tra cứu công thức và câu hỏi thường gặp.

## 🛠️ Cài Đặt & Khởi Chạy

```bash
# Cài đặt thư viện
npm install

# Chạy môi trường phát triển (Dev)
npm run dev

# Đóng gói sản phẩm (Production Build)
npm run build
```
