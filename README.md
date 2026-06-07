# BÀI THI CUỐI KỲ MINH HOẠ - MÔN NỀN TẢNG PHÁT TRIỂN WEB

- **Tên sinh viên:** Trần Thị Minh Duyên
- **Mã sinh viên:** 2451170884
- **Mã đề:** 2024.Minhhoa
- **Tên thư mục bài làm:** EXAM2024.Minhhoa

---

## 📝 TỔNG QUAN TIẾN ĐỘ THỰC HIỆN

Hiện tại dự án đã hoàn thành **Câu 1** và **Câu 2** với các chi tiết cụ thể sau:

- [x] **Câu 1 (4 điểm):** Xây dựng hoàn chỉnh giao diện ứng dụng **Tasks List** bằng HTML, CSS và Bootstrap[cite: 1].
- [x] **Câu 2 (3 điểm):** Thiết lập tệp dữ liệu giả lập `data.json` và xử lý logic kiểm tra dữ liệu đầu vào (Validation) bằng JavaScript[cite: 1].

## 🛠️ CHI TIẾT CÁC PHẦN ĐÃ HOÀN THÀNH

### Câu 1: Xây dựng giao diện Tasks List (HTML, CSS, Bootstrap)[cite: 1]

- **Cấu trúc giao diện:** Tái hiện chính xác layout ứng dụng quản lý công việc bao gồm thanh tiêu đề, nút `+ Add Task`, danh sách các nhiệm vụ và Form thêm mới.
- **Thành phần hiển thị:**
  - Thiết kế các thẻ công việc (Task Card) hiển thị rõ ràng nội dung, mức độ ưu tiên (`Priority`) và trạng thái (`To Do`, `In Progress`, `Done`)[cite: 1].
  - Định dạng màu sắc trực quan cho các mức độ ưu tiên: Đỏ (`High`), Vàng (`Medium`), Xanh lá (`Low`) theo đúng yêu cầu đề bài[cite: 1].
  - Tích hợp đầy đủ các icon chức năng (Sửa, Xóa, Thay đổi trạng thái).
- **Form Add Task:** Thiết kế giao diện nhập liệu trực quan, có các nút bấm chọn nhanh mức độ ưu tiên và nút `Add`.

### Câu 2: Giả lập dữ liệu & Kiểm tra Validation (JavaScript)

- **Cơ sở dữ liệu giả lập (`data.json`):**
  - Thiết lập tệp tin `data.json` cấu trúc chuẩn dữ liệu JSON[cite: 1].
  - Lưu trữ danh sách gồm **tối thiểu 5 Tasks** mẫu ban đầu phục vụ cho việc hiển thị và kiểm thử.
- **Logic Kiểm tra dữ liệu (Validation):**
  - Xử lý kiểm tra dữ liệu người dùng nhập vào Form `Add Task`.
  - Đảm bảo ràng buộc: **Tên Task không được quá 100 ký tự**.
  - Nếu dữ liệu vượt quá giới hạn hoặc không hợp lệ, hệ thống sẽ thực hiện ngăn chặn và đưa ra phản hồi/thông báo lỗi kịp thời cho người dùng.

---

## 📂 CẤU TRÚC THƯ MỤC BÀI LÀM (`EXAM2024.Minhhoa`)

```text
EXAM2024.Minhhoa/
│
├── index.html          # Giao diện chính của ứng dụng (Câu 1)
├── style.css           # Các tùy chỉnh CSS bổ sung cho giao diện
├── app.js              # Xử lý logic validation (Câu 2)
├── data.json           # Tệp dữ liệu giả lập tối thiểu 5 tasks (Câu 2)
├── css/                # Thư mục css của bootstrap
├── js/                 # Thư mục js của bootstrap
├── webfonts            # Thư mục chứa các icon dùng trong bài
└── README.md           # Thông tin sinh viên, tiến độ làm bài
```
