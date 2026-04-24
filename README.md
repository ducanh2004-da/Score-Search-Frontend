# 🎓 G-Scores THPT - Hệ Thống Tra Cứu Điểm Thi

![G-Scores Banner](https://via.placeholder.com/1200x400/2E4F42/FFFFFF?text=G-Scores+THPT)

## 📖 Giới thiệu dự án

**G-Scores THPT** là một nền tảng web hiện đại, cung cấp công cụ tra cứu điểm thi THPT Quốc Gia nhanh chóng, chính xác cùng với hệ thống phân tích phổ điểm trực quan. Giao diện được thiết kế tối ưu hóa (responsive) cho mọi thiết bị từ điện thoại, máy tính bảng đến desktop, mang lại trải nghiệm mượt mà nhất cho người dùng.

Dự án được xây dựng và phát triển bởi **Lê Minh Nguyệt** - Fullstack Web Developer.

### ✨ Các tính năng chính

- 🔍 **Tra cứu điểm thi:** Tìm kiếm điểm chi tiết các môn học bằng Số báo danh (SBD).
- 📊 **Phân tích phổ điểm:** Biểu đồ trực quan thống kê phân bố điểm của từng môn học, giúp đánh giá mức độ cạnh tranh.
- 🏆 **Bảng vàng (Leaderboard):** Vinh danh Top 10 thí sinh có tổng điểm 3 môn Khối A (Toán, Vật lí, Hóa học) cao nhất toàn quốc.
- 📱 **Giao diện Responsive:** Trải nghiệm hoàn hảo trên Mobile, Tablet và Desktop với hệ thống Menu và Dashboard thông minh.
- ⚡ **Tối ưu UX/UI:** Sử dụng Skeleton loading, Mock data placeholder và hiệu ứng chuyển đổi mượt mà.

---

## 🛠 Công nghệ sử dụng

- **Core:** ReactJS (v18+) với TypeScript.
- **Routing:** React Router v6.
- **Styling:** Tailwind CSS.
- **Biểu đồ (Charts):** Recharts.
- **Icons:** Lucide React.
- **Xử lý API:** Fetch API / Axios (thông qua `scoreService`).

---

## ⚙️ Hướng dẫn cài đặt môi trường và chạy dự án

Để chạy dự án này trên máy cá nhân, hãy đảm bảo máy tính của bạn đã cài đặt sẵn **Node.js** (phiên bản 16.x trở lên) và **npm**.

### Bước 1: Clone mã nguồn
Mở terminal và clone repository này về máy của bạn:
```bash
git clone <đường-dẫn-repository-của-bạn>
cd <tên-thư-mục-dự-án>
```
### Bước 2: Tải thư viện
```bash
npm install
```
### Bước 3: Thêm biến môi trường url backend vào env


### Bước 4: Chạy dự án
```bash
npm run dev
```