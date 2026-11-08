/* ── NAV scroll & float CTA ── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    const fc = document.getElementById('floatCta');
    if (fc) fc.classList.toggle('visible', window.scrollY > 400);
  });
}

/* ── Mobile nav ── */
let mobileNavOpen = false;
function toggleMobileNav() {
  mobileNavOpen = !mobileNavOpen;
  document.getElementById('mobileNav').classList.toggle('open', mobileNavOpen);
  const bars = document.querySelectorAll('.nav-hamburger span');
  if (mobileNavOpen) {
    bars[0].style.cssText = 'transform: translateY(6.5px) rotate(45deg)';
    bars[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
    bars[2].style.cssText = 'transform: translateY(-6.5px) rotate(-45deg)';
  } else {
    bars.forEach(b => b.style.cssText = '');
  }
}
function closeMobileNav() {
  mobileNavOpen = false;
  document.getElementById('mobileNav').classList.remove('open');
  document.querySelectorAll('.nav-hamburger span').forEach(b => b.style.cssText = '');
}

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Counter animation ── */
function animateCounter(el, target) {
  const dur = 1500;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.childNodes[0].textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.count));
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── FAQ accordion ── */
function toggleFaq(btn) {
  const item = btn.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ── Form submit ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-form-submit');
  btn.textContent = '送信しました。1営業日以内にご連絡します。';
  btn.style.background = '#2fae5c';
  btn.style.cursor = 'default';
  btn.disabled = true;
}
