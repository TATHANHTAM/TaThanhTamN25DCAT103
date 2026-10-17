# Lab React Hooks cơ bản – Bảng quản lý công việc

Bài làm của **Tạ Thanh Tâm – N25DCAT103**. Dự án sử dụng React, Vite và `useState` để quản lý form nhiều trường và danh sách công việc.

## Chạy dự án

Yêu cầu Node.js 20.19+ hoặc 22.12+ và npm.

```bash
npm install
npm run dev
```

Mở địa chỉ được Vite hiển thị trong terminal.

```bash
npm test
npm run build
npm run preview
```

## Chức năng

- Thêm tên công việc và mức ưu tiên Cao, Trung bình hoặc Thấp.
- Chặn tên rỗng hoặc chỉ chứa khoảng trắng; loại khoảng trắng ở hai đầu tên.
- Hiển thị danh sách, gạch ngang tên công việc đã hoàn thành.
- Đổi trạng thái qua lại giữa Chưa làm và Hoàn thành.
- Xóa riêng từng công việc.
- Tự cập nhật tổng số, số đã hoàn thành và số chưa làm.
- Xóa tất cả công việc đã hoàn thành bằng một nút.
- Giao diện tiếng Việt, thích ứng với màn hình nhỏ.

Logic chính nằm trong `src/App.jsx`. Các phép cập nhật mảng dùng `map`, `filter` và spread, không sửa trực tiếp state. Thống kê được tính từ danh sách trong mỗi lần render. Dữ liệu lưu trong state và đặt lại khi tải lại trang.

Repo ban đầu trống, nên bài làm có bổ sung khung ứng dụng Vite để có thể chạy độc lập.
