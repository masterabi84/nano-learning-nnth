// Trang Giới thiệu – tương tác
(() => {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menuToggle');

  // 1. Menu mobile
  const closeMenu = () => {
    if (!header || !toggle) return;
    header.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Mở menu');
    toggle.textContent = '☰';
  };
  if (header && toggle) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
      toggle.textContent = open ? '✕' : '☰';
    });
    header.querySelectorAll('.nav a, .header-actions a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  // 2. Header đổ bóng khi cuộn + 7. Nút lên đầu trang
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 10);
    toTop?.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 3. Cuộn mượt tới anchor, trừ chiều cao header
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (header?.offsetHeight || 0) + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  // Đánh dấu menu theo phần đang xem
  if ('IntersectionObserver' in window && navLinks.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(a => {
      const sec = document.querySelector(a.getAttribute('href'));
      if (sec) spy.observe(sec);
    });
  }

  // 4. Hiện dần khi cuộn
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => revObs.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // 5. Đếm số
  const formatNum = n => n.toLocaleString('vi-VN');
  const countUp = el => {
    const target = Number(el.dataset.count) || 0;
    const duration = 1400;
    const start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        countUp(e.target);
        countObs.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObs.observe(c));
  } else {
    counters.forEach(c => { c.textContent = formatNum(Number(c.dataset.count) || 0); });
  }

  // 9. FAQ accordion
  document.querySelectorAll('.pg-faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.hidden = open;
    });
  });

  // 6. Form liên hệ
  const form = document.getElementById('contactForm');
  if (form) {
    const success = document.getElementById('formSuccess');
    const rules = {
      fullname: v => (v.trim().length >= 2 ? '' : 'Vui lòng nhập họ và tên.'),
      phone: v => (/^(0|\+84)\d{9}$/.test(v.replace(/[\s.-]/g, '')) ? '' : 'Số điện thoại không hợp lệ (vd. 0972 752 228).'),
      email: v => (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Email không hợp lệ.'),
    };
    const check = field => {
      const msg = rules[field.name]?.(field.value) || '';
      const err = document.getElementById(`${field.name}-error`);
      field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
      return !msg;
    };
    Object.keys(rules).forEach(name => {
      const field = form.elements[name];
      field?.addEventListener('blur', () => check(field));
      field?.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') check(field); });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fields = Object.keys(rules).map(n => form.elements[n]).filter(Boolean);
      const results = fields.map(check);
      const firstInvalid = fields[results.indexOf(false)];
      if (firstInvalid) { firstInvalid.focus(); return; }
      // TODO: kết nối API gửi dữ liệu đăng ký
      form.reset();
      fields.forEach(f => f.removeAttribute('aria-invalid'));
      if (success) {
        success.hidden = false;
        setTimeout(() => { success.hidden = true; }, 6000);
      }
    });
  }

  // 8. Năm hiện tại
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
