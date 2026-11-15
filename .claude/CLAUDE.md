# Nano Learning – Kiến trúc & Quy tắc dự án

Trang landing page cho nền tảng học tập trực tuyến **Nano Learning** (Trường Cao đẳng Điện lực TP Hồ Chí Minh – EVNSPC).
Slogan: *Tri thức · Sáng tạo · Đạo đức · Trách nhiệm*.

## Công nghệ

- HTML5 + CSS3 + JavaScript thuần (vanilla), **không framework, không build step**.
- Font: Google Fonts **Be Vietnam Pro** (400–800).
- Mở trực tiếp `index.html` trên trình duyệt, hoặc dùng Live Server để xem.

## Cấu trúc thư mục

```
.
├── .claude/
│   ├── CLAUDE.md          # Kiến trúc & quy tắc dự án (file này)
│   └── skills/
│       └── create-page/
│           └── SKILL.md   # Skill + lệnh /create-page: quy trình tạo trang mới
├── assets/
│   ├── css/
│   │   ├── style.css      # Style dùng chung: biến màu, layout, component, responsive
│   │   └── pages/         # Style riêng từng trang con (<slug>.css)
│   │       └── gioi-thieu.css
│   ├── js/
│   │   ├── main.js        # Tương tác trang chủ: menu mobile, slider, đếm số, hiệu ứng cuộn
│   │   └── pages/         # Script riêng từng trang con (<slug>.js)
│   │       └── gioi-thieu.js
│   └── images/            # Ảnh, logo (logo.png)
├── index.html             # Trang chủ – chỉ chứa markup
├── gioi-thieu.html        # Trang Giới thiệu Nano Learning
├── README.md              # Tài liệu dự án (cập nhật khi thêm trang/tính năng)
└── <slug>.html            # Các trang con tạo bằng /create-page
```

## Tạo trang mới

Gõ `/create-page <mô tả>`. Mỗi trang gồm: Banner giới thiệu, Thông tin nổi bật, Tiện ích/Giá trị, Kêu gọi hành động/Liên hệ.
Trang con chỉ nạp `style.css` + CSS/JS riêng của nó; **không nạp `main.js`**.

## Các phần của trang (`index.html`)

| Thứ tự | Phần | Class / id |
|---|---|---|
| 1 | Header + menu điều hướng | `.header#header` |
| 2 | Hero + banner slider | `.hero`, `#slider` |
| 3 | Thống kê (đếm số) | `.stats`, `[data-count]` |
| 4 | Khóa học nổi bật | `#featured` |
| 5 | Dành cho bạn | `#for-you` |
| 6 | Tính năng | `#features` |
| 7 | Hành trình / đánh giá | `#proof` |
| 8 | Footer (liên hệ, bản quyền) | `footer` |

## Quy tắc code

### Chung
- Nội dung hiển thị viết **tiếng Việt có dấu**; `<html lang="vi">`.
- Không viết CSS/JS inline trong `index.html` — CSS vào `assets/css/`, JS vào `assets/js/`.
- Đường dẫn tài nguyên luôn là đường dẫn tương đối (`assets/...`).
- Thụt lề 2 dấu cách.

### HTML
- Dùng thẻ ngữ nghĩa: `header`, `nav`, `main`, `section`, `footer`.
- Mọi `<img>` phải có `alt`; nút chỉ có icon phải có `aria-label`.
- Giữ skip link "Bỏ qua tới nội dung chính" ở đầu `body`.
- Phần tử cần hiệu ứng xuất hiện khi cuộn: thêm class `reveal`.
- Số cần hiệu ứng đếm: dùng thuộc tính `data-count="<số>"`.

### CSS
- Dùng biến màu trong `:root` (`--primary`, `--accent`, `--text`, `--muted`, ...); **không hard-code mã màu mới** — nếu cần màu mới thì thêm biến.
- Màu thương hiệu: xanh `#0b4ea2` (primary), cam `#f59e0b` (accent).
- Bo góc dùng `--radius`, đổ bóng dùng `--shadow` / `--shadow-hover`.
- Nút dùng các class có sẵn: `.btn` + `.btn-primary` / `.btn-outline` / `.btn-accent`.
- Bọc nội dung trong `.container` (tối đa 1200px, lề 16px).
- Thiết kế responsive, mobile-first; media query đặt cuối `style.css`.

### JavaScript
- Vanilla JS, không thêm thư viện ngoài nếu không thật cần thiết.
- Script nạp bằng `defer` ở cuối `body`.
- Dùng `const`/`let`, arrow function; ưu tiên `IntersectionObserver` cho hiệu ứng cuộn.

## Thông tin liên hệ

- Điện thoại: **0972 752 228** (`tel:0972752228`) – nằm ở footer `index.html`.
