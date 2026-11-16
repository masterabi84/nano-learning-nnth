# NANO ELEARNING – TTNNTH

Website giới thiệu nền tảng học tập trực tuyến **Nano Learning** – Trường Cao đẳng Điện lực TP Hồ Chí Minh (EVNSPC).

> *Tri thức · Sáng tạo · Đạo đức · Trách nhiệm*

![Phiên bản](https://img.shields.io/badge/phi%C3%AAn%20b%E1%BA%A3n-1.0.0-0b4ea2)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ](#công-nghệ)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Cài đặt & chạy](#cài-đặt--chạy)
- [Các trang](#các-trang)
- [Tạo trang mới với `/create-page`](#tạo-trang-mới-với-create-page)
- [Quy ước phát triển](#quy-ước-phát-triển)
- [Tùy biến nhanh](#tùy-biến-nhanh)
- [Việc cần làm](#việc-cần-làm)
- [Liên hệ](#liên-hệ)

---

## Giới thiệu

Nano Learning chia kiến thức thành các bài học ngắn 5–10 phút, giúp cán bộ, người lao động ngành điện học mọi lúc, mọi nơi và áp dụng ngay vào công việc.
Dự án này là phần **giao diện web tĩnh** (landing page): trang chủ giới thiệu khóa học và trang giới thiệu nền tảng.

## Tính năng

- 📱 **Responsive** – hiển thị tốt trên điện thoại, máy tính bảng, máy tính.
- 🍔 **Menu mobile** – mở/đóng bằng nút ☰, tự đóng khi chọn mục hoặc nhấn `Esc`.
- 🖼️ **Banner slider** tự chuyển (trang chủ).
- 🔢 **Hiệu ứng đếm số** khi phần thống kê xuất hiện.
- ✨ **Hiệu ứng hiện dần** khi cuộn trang.
- ❓ **FAQ dạng accordion**, **lộ trình học** (trang Giới thiệu).
- 📝 **Form đăng ký tư vấn** – kiểm tra họ tên, số điện thoại Việt Nam, email ngay trên trình duyệt.
- ⬆️ **Nút lên đầu trang**, cuộn mượt tới từng phần, menu tự đánh dấu phần đang xem.
- ♿ **Truy cập tốt** – skip link, `aria-*`, `alt` cho ảnh, hỗ trợ `prefers-reduced-motion`.

## Công nghệ

| Thành phần | Sử dụng |
|---|---|
| Giao diện | HTML5, CSS3 (CSS Variables, Grid, Flexbox) |
| Tương tác | JavaScript thuần (ES6+, `IntersectionObserver`) |
| Font chữ | [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) – Google Fonts |
| Build | Không cần – mở trực tiếp bằng trình duyệt |

## Cấu trúc thư mục

```
.
├── .claude/
│   ├── CLAUDE.md                  # Kiến trúc & quy tắc dự án (cho Claude Code)
│   └── skills/
│       └── create-page/
│           └── SKILL.md           # Skill /create-page – quy trình tạo trang mới
├── assets/
│   ├── css/
│   │   ├── style.css              # Style dùng chung: biến màu, header, footer, nút...
│   │   └── pages/
│   │       └── gioi-thieu.css     # Style riêng trang Giới thiệu
│   ├── js/
│   │   ├── main.js                # Tương tác trang chủ
│   │   └── pages/
│   │       └── gioi-thieu.js      # Tương tác trang Giới thiệu
│   └── images/
│       └── logo.png               # Logo Nano Learning
├── index.html                     # Trang chủ
├── gioi-thieu.html                # Trang Giới thiệu
└── README.md
```

## Cài đặt & chạy

Không cần cài đặt thư viện.

**Cách 1 – Mở trực tiếp:** nhấp đúp `index.html` để mở bằng trình duyệt.

**Cách 2 – Live Server (khuyên dùng khi phát triển):**
1. Mở thư mục dự án bằng **VS Code**.
2. Cài extension **Live Server**.
3. Chuột phải `index.html` → **Open with Live Server**. Trang tự tải lại khi lưu file.

**Cách 3 – Dòng lệnh:**
```bash
npx serve .
# hoặc
python -m http.server 8000
```
Sau đó mở `http://localhost:8000` (hoặc địa chỉ được in ra).

**Triển khai:** chép toàn bộ thư mục (trừ `.claude/`) lên bất kỳ web hosting tĩnh nào – GitHub Pages, Netlify, Vercel, IIS, Nginx...

## Các trang

| Trang | File | Nội dung chính | CSS / JS |
|---|---|---|---|
| Trang chủ | `index.html` | Banner slider, thống kê, khóa học nổi bật, dành cho bạn, tính năng, hành trình | `style.css` · `main.js` |
| Giới thiệu | `gioi-thieu.html` | Banner, con số nổi bật, giá trị, lộ trình 4 bước, FAQ, form liên hệ | `style.css` + `pages/gioi-thieu.css` · `pages/gioi-thieu.js` |

**Menu dùng chung**, giống hệt nhau trên mọi trang để chuyển trang không bị nhảy giao diện:
**Trang chủ → Giới thiệu → Khám phá → Học của tôi → Nhóm → Hành trình**. Chỉ khác mục đang xem (`class="active" aria-current="page"`).
Link tới phần của trang chủ luôn viết đầy đủ `index.html#...`. Dưới 1200px menu chuyển sang dạng ☰.

## Tạo trang mới với `/create-page`

Dự án có sẵn skill cho **Claude Code** để sinh trang mới đúng cấu trúc:

```
/create-page Trang giới thiệu khóa học "5S & Kaizen" cho nhân viên mới
```

Skill sẽ tạo `<slug>.html`, `assets/css/pages/<slug>.css`, `assets/js/pages/<slug>.js` với đủ 4 phần: **Banner giới thiệu · Thông tin nổi bật · Tiện ích/Giá trị · Kêu gọi hành động/Liên hệ**, kèm JavaScript tương tác. Chi tiết xem [.claude/skills/create-page/SKILL.md](.claude/skills/create-page/SKILL.md).

**Tạo trang thủ công:** sao chép `gioi-thieu.html` cùng cặp CSS/JS của nó, đổi tên theo slug mới, rồi thêm link vào menu `.nav` của các trang.

## Quy ước phát triển

**Chung**
- Nội dung tiếng Việt có dấu, `<html lang="vi">`, thụt lề 2 dấu cách.
- Không viết CSS/JS inline trong HTML; đường dẫn tài nguyên dùng đường dẫn tương đối.
- Tên file trang: chữ thường, không dấu, nối bằng gạch ngang (`gioi-thieu.html`).

**HTML**
- Dùng thẻ ngữ nghĩa `header`, `nav`, `main`, `section`, `footer`; mỗi trang một `<h1>`.
- Ảnh có `alt`, nút chỉ có icon có `aria-label`, ô nhập có `<label>`.
- Thêm class `reveal` để phần tử hiện dần khi cuộn; dùng `data-count="<số>"` để đếm số.

**CSS**
- Dùng biến trong `:root` – không hard-code màu mới:

  | Biến | Giá trị | Dùng cho |
  |---|---|---|
  | `--primary` | `#0b4ea2` | Màu thương hiệu, nút chính, link |
  | `--accent` | `#f59e0b` | Nút kêu gọi hành động, điểm nhấn |
  | `--text` / `--muted` | `#1f2937` / `#6b7280` | Chữ chính / chữ phụ |
  | `--radius` | `14px` | Bo góc |
  | `--shadow`, `--shadow-hover` | — | Đổ bóng thẻ |

- Nút: `.btn` + `.btn-primary` / `.btn-outline` / `.btn-accent`. Bố cục: `.container` (tối đa 1200px).
- Class riêng của trang con đặt tiền tố `pg-`. Breakpoint: `960px`, `820px` (menu mobile), `640px`.

**JavaScript**
- Vanilla JS, `const`/`let`, arrow function; kiểm tra phần tử tồn tại trước khi gắn sự kiện.
- `main.js` chỉ dùng cho trang chủ – trang con dùng script riêng trong `assets/js/pages/`.

## Tùy biến nhanh

| Muốn đổi | Sửa ở đâu |
|---|---|
| Màu thương hiệu | Biến `:root` trong `assets/css/style.css` |
| Logo | Thay `assets/images/logo.png` (ảnh vuông, nền trong suốt) |
| Tên hiển thị cạnh logo | `.logo-text` trong header/footer của từng trang |
| Thông tin liên hệ | Footer mỗi trang + khối `#contact` trong `gioi-thieu.html` |
| Thời gian chuyển banner | `setInterval(..., 4000)` trong `assets/js/main.js` |

## Việc cần làm

- [ ] Kết nối form đăng ký với API/hệ thống nhận dữ liệu (`// TODO` trong `gioi-thieu.js`).
- [ ] Cập nhật địa chỉ thật (hiện là địa chỉ mẫu).
- [ ] Thay số liệu thống kê mẫu bằng số liệu thực tế.
- [ ] Gắn link thật cho Đăng nhập / Đăng ký và các trang chính sách ở footer.
- [ ] Thêm favicon và thẻ Open Graph để chia sẻ mạng xã hội.

## Liên hệ

- 🏫 Hệ thống đào tạo **NANO LEARNING** – Trường Cao đẳng Điện lực TP Hồ Chí Minh
- 📞 [0972 752 228](tel:0972752228)
- ✉️ [contact@lms.hepc.edu.vn](mailto:contact@lms.hepc.edu.vn)
- 🌐 lms.hepc.edu.vn

---

© 2026 Nano Learning. All rights reserved.
