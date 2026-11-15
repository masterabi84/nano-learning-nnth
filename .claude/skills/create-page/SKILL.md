---
name: create-page
description: Tạo một trang web mới hoàn chỉnh, responsive cho dự án Nano Learning (HTML + CSS + JS thuần) gồm Banner giới thiệu, Thông tin nổi bật, Tiện ích/Giá trị và Kêu gọi hành động/Liên hệ. Dùng khi người dùng gõ /create-page hoặc nhờ "tạo trang", "làm landing page", "thêm trang mới".
argument-hint: "[mô tả trang cần tạo]"
---

# Skill: create-page – Tạo trang mới cho dự án

Yêu cầu của người dùng: **$ARGUMENTS**

Nếu không có mô tả, tạo trang giới thiệu chung cho Nano Learning và nói rõ điều đó khi bàn giao.

## Bước 1 – Đọc bối cảnh dự án

1. Đọc `.claude/CLAUDE.md` để nắm kiến trúc, quy tắc, biến màu.
2. Xem nhanh `index.html` (header, footer) và các biến `:root`, class dùng chung trong `assets/css/style.css`.
3. Từ yêu cầu, xác định:
   - **slug** trang: chữ thường, không dấu, nối bằng gạch ngang (vd. "Khóa học AI cho giáo viên" → `khoa-hoc-ai-giao-vien`).
   - Đối tượng người xem, thông điệp chính, hành động mong muốn (đăng ký, liên hệ, tải tài liệu...).
4. Nếu file `<slug>.html` đã tồn tại, **hỏi người dùng** trước khi ghi đè.

## Bước 2 – Tạo các file theo cấu trúc

```
<slug>.html                       # Markup trang (ở thư mục gốc, cạnh index.html)
assets/css/pages/<slug>.css       # Style riêng của trang
assets/js/pages/<slug>.js         # Tương tác riêng của trang
```

- Trong `<head>` nạp theo thứ tự: Google Font Be Vietnam Pro → `assets/css/style.css` (dùng chung) → `assets/css/pages/<slug>.css`.
- Cuối `<body>`: `<script src="assets/js/pages/<slug>.js" defer></script>`.
- **Không nạp `assets/js/main.js`** – file đó chỉ dành cho trang chủ (slider, đếm số của index sẽ báo lỗi khi thiếu phần tử).
- Không viết CSS/JS inline.

## Bước 3 – Bố cục HTML bắt buộc

Dùng thẻ ngữ nghĩa, `lang="vi"`, có `<title>` và `<meta name="description">` theo nội dung.

| # | Phần | Yêu cầu |
|---|---|---|
| 0 | Skip link + Header | Sao chép header từ `index.html` (logo `assets/images/logo.png`, nút ☰ `#menuToggle`). Link "Trang chủ" trỏ về `index.html`; các mục menu trỏ tới anchor của trang mới. |
| 1 | **Banner giới thiệu** (`#hero`) | Badge nhỏ, tiêu đề H1 (duy nhất trên trang), mô tả ngắn 1–2 câu, 2 nút (`.btn-accent` chính + `.btn-outline` phụ) cuộn tới phần CTA/thông tin. Có minh họa bằng khối gradient/emoji (không dùng ảnh ngoài). |
| 2 | **Thông tin nổi bật** (`#highlights`) | 3–4 thẻ số liệu/điểm nhấn, số dùng `data-count="<số>"` để chạy hiệu ứng đếm. |
| 3 | **Tiện ích / Giá trị** (`#benefits`) | 4–6 thẻ: icon emoji + tiêu đề + mô tả. Có thể thêm 1 khối phụ phù hợp nội dung (lộ trình, FAQ dạng accordion, bảng giá, lịch học...). |
| 4 | **Kêu gọi hành động / Liên hệ** (`#contact`) | Tiêu đề thuyết phục + form (họ tên, điện thoại, email, nội dung/lựa chọn phù hợp) **và** thông tin liên hệ: 📞 `0972 752 228` (`tel:0972752228`), ✉️ email, 📍 địa chỉ lấy từ footer `index.html`. |
| 5 | Footer | Sao chép footer từ `index.html`. |

- Viết nội dung **tiếng Việt có dấu**, cụ thể, sát với yêu cầu – không dùng "Lorem ipsum".
- Mọi `<img>` có `alt`; nút chỉ có icon có `aria-label`; input có `<label>`.
- Phần tử cần hiệu ứng xuất hiện khi cuộn: thêm class `reveal`.

## Bước 4 – CSS (`assets/css/pages/<slug>.css`)

- **Tái sử dụng** từ `style.css`: biến `:root` (`--primary`, `--accent`, `--radius`, `--shadow`...), `.container`, `.btn*`, `.header*`, `.footer*`, `.reveal`, `.section-head`. Không định nghĩa lại các class này.
- Class riêng của trang đặt tiền tố `pg-` (vd. `.pg-hero`, `.pg-card`) để tránh đụng style trang chủ.
- Không hard-code màu mới; cần màu mới thì khai báo biến trong `:root` của file trang.
- **Mobile-first**, dùng CSS Grid/Flex, `clamp()` cho cỡ chữ tiêu đề. Breakpoint: 640px, 960px.
- Kiểm tra: không cuộn ngang ở 360px; vùng bấm tối thiểu 44px; có `:focus-visible` rõ ràng.
- Thêm `@media (prefers-reduced-motion: reduce)` tắt animation/transition.

## Bước 5 – JavaScript (`assets/js/pages/<slug>.js`)

Vanilla JS, `const`/`let`, arrow function. Mỗi tính năng **kiểm tra phần tử tồn tại** trước khi gắn sự kiện. Tối thiểu có:

1. **Menu mobile**: bật/tắt `.header.open`, cập nhật `aria-expanded`, đổi ☰/✕, tự đóng khi bấm link hoặc nhấn `Esc`.
2. **Header khi cuộn**: thêm class (vd. `scrolled`) để đổ bóng header khi `scrollY > 10`.
3. **Cuộn mượt** cho link `href="#..."`, trừ chiều cao header.
4. **Reveal on scroll** bằng `IntersectionObserver` (thêm class `visible`).
5. **Đếm số** cho `[data-count]` khi vào màn hình (dùng `requestAnimationFrame`).
6. **Form liên hệ**: chặn submit, kiểm tra họ tên, số điện thoại VN (`/^(0|\+84)\d{9}$/` sau khi bỏ khoảng trắng), email; hiện lỗi dưới từng ô (`aria-invalid`, `aria-describedby`); khi hợp lệ hiện thông báo thành công và reset form (chưa gửi đi đâu – ghi chú `// TODO: kết nối API`).
7. **Nút lên đầu trang** xuất hiện khi cuộn quá 600px.
8. Cập nhật năm ở `#year`.
9. Tương tác thêm nếu có khối phụ (accordion FAQ, tab...).

## Bước 6 – Hoàn tất

1. Thêm link tới trang mới vào menu `.nav` của `index.html` nếu người dùng muốn trang xuất hiện trên menu (hỏi nếu chưa rõ).
2. Cập nhật mục "Cấu trúc thư mục" trong `.claude/CLAUDE.md`, ghi thêm trang mới.
3. Tự rà soát: đường dẫn tương đối đúng, HTML đóng thẻ đầy đủ, không lỗi JS hiển nhiên, đủ 4 phần bắt buộc.
4. Bàn giao ngắn gọn bằng tiếng Việt: danh sách file đã tạo (dạng link), tóm tắt các phần của trang, cách mở xem (mở `<slug>.html` hoặc Live Server), và những chỗ người dùng cần thay (email, địa chỉ, ảnh thật...).
