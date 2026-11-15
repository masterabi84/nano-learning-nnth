// Mobile menu
const header = document.getElementById('header');
const toggle = document.getElementById('menuToggle');
toggle.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? '✕' : '☰';
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  header.classList.remove('open'); toggle.textContent = '☰';
}));

// Banner slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dots button');
let current = 0;
function show(i) {
  slides[current].classList.remove('active'); dots[current].classList.remove('active');
  current = i;
  slides[current].classList.add('active'); dots[current].classList.add('active');
}
dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
setInterval(() => show((current + 1) % slides.length), 4000);

// Count-up stats
const counters = document.querySelectorAll('[data-count]');
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let n = 0; const step = Math.max(1, Math.ceil(target / 40));
    const t = setInterval(() => {
      n = Math.min(target, n + step); el.textContent = n;
      if (n >= target) clearInterval(t);
    }, 30);
    countObs.unobserve(el);
  });
}, { threshold: .5 });
counters.forEach(c => countObs.observe(c));

// Reveal on scroll
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
