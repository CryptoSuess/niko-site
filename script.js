// --- Dynamic year (hardcoded to creation year)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = '2025';

// --- Single source of truth for links
const CONTRACT = '0x422273666d77f504e30e2573c063c7c50cce8453';
const URLS = {
  uniswap: `https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=${CONTRACT}&chain=base`,
  dextools: 'https://www.dextools.io/app/token/noki',
  dexscreener: 'https://dexscreener.com/base/0x422273666d77f504e30e2573c063c7c50cce8453',
  gecko: 'https://www.geckoterminal.com/base/pools/0x422273666d77f504e30e2573c063c7c50cce8453',
  coinbase: 'https://www.coinbase.com/price/base-niko-8453',
  basealpha: 'https://www.basealpha.fun',
  forgeshield: 'https://forge-shield-main.vercel.app',
  telegram: 'https://t.me/+2pnnko2IHooxMjcx',
  x: 'https://x.com/NikoToken',
  uncx: 'https://app.uncx.network/lockers/token/chain/8453/address/0x422273666d77f504e30e2573c063c7c50cce8453',
  wolfpaper: '/wolfpaper.html'
};

// --- Wire CTAs
const byId = (id) => document.getElementById(id);
const tradeLink = byId('tradeLink');
const chartLink = byId('chartLink');
const buyBtn = byId('buyBtn');

if (tradeLink) tradeLink.href = URLS.uniswap;
if (chartLink) chartLink.href = URLS.dextools;
if (buyBtn) buyBtn.href = URLS.uniswap;

const tgLink = byId('tgLink');
const xLink = byId('xLink');
const dexsLink = byId('dexsLink');
const dextLink = byId('dextLink');
const geckoLink = byId('geckoLink');
const uncxLink = byId('uncxLink');
const baseAlphaLink = byId('baseAlphaLink');
const forgeShieldLink = byId('forgeShieldLink');
const coinbaseLink = byId('coinbaseLink');
const tgCta = byId('tgCta');

[tgLink, tgCta].forEach(el => { if (el) { el.href = URLS.telegram; el.target = '_blank'; el.rel = 'noopener'; } });
if (xLink) { xLink.href = URLS.x; xLink.target = '_blank'; xLink.rel = 'noopener'; }
if (dexsLink) { dexsLink.href = URLS.dexscreener; dexsLink.target = '_blank'; dexsLink.rel = 'noopener'; }
if (dextLink) { dextLink.href = URLS.dextools; dextLink.target = '_blank'; dextLink.rel = 'noopener'; }
if (geckoLink) { geckoLink.href = URLS.gecko; geckoLink.target = '_blank'; geckoLink.rel = 'noopener'; }
if (uncxLink) { uncxLink.href = URLS.uncx; uncxLink.target = '_blank'; uncxLink.rel = 'noopener'; }
if (baseAlphaLink) { baseAlphaLink.href = URLS.basealpha; baseAlphaLink.target = '_blank'; baseAlphaLink.rel = 'noopener'; }
if (forgeShieldLink) { forgeShieldLink.href = URLS.forgeshield; forgeShieldLink.target = '_blank'; forgeShieldLink.rel = 'noopener'; }
if (coinbaseLink) { coinbaseLink.href = URLS.coinbase; coinbaseLink.target = '_blank'; coinbaseLink.rel = 'noopener'; }

// --- Contract display
const contractDisplay = byId('contractDisplay');
if (contractDisplay) contractDisplay.textContent = CONTRACT;

// --- Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);
      }
    }
  });
});

// ===== STARFIELD CANVAS =====
(function initStarfield() {
  const canvas = byId('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  const STAR_COUNT = 120;
  const SHOOTING_STAR_CHANCE = 0.002;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        alpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }

  let shootingStars = [];

  function spawnShootingStar() {
    shootingStars.push({
      x: Math.random() * w * 0.8,
      y: Math.random() * h * 0.4,
      len: Math.random() * 60 + 40,
      speed: Math.random() * 6 + 4,
      alpha: 1,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3
    });
  }

  let time = 0;

  function resumeDraw() {
    if (!document.hidden) requestAnimationFrame(draw);
  }

  function draw() {
    if (document.hidden) {
      document.addEventListener('visibilitychange', resumeDraw, { once: true });
      return;
    }

    ctx.clearRect(0, 0, w, h);
    time += 0.016;

    // Draw stars with twinkle
    for (const s of stars) {
      const flicker = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha * flicker})`;
      ctx.fill();
    }

    // Shooting stars
    if (Math.random() < SHOOTING_STAR_CHANCE) spawnShootingStar();

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      const dx = Math.cos(ss.angle) * ss.speed;
      const dy = Math.sin(ss.angle) * ss.speed;
      ss.x += dx;
      ss.y += dy;
      ss.alpha -= 0.012;

      if (ss.alpha <= 0) {
        shootingStars.splice(i, 1);
        continue;
      }

      const tailX = ss.x - Math.cos(ss.angle) * ss.len;
      const tailY = ss.y - Math.sin(ss.angle) * ss.len;
      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      grad.addColorStop(0, `rgba(103, 232, 249, 0)`);
      grad.addColorStop(1, `rgba(103, 232, 249, ${ss.alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
})();

// ===== SCROLL REVEAL =====
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

// ===== PARALLAX ORBS ON SCROLL =====
(function initParallax() {
  const orbs = document.querySelectorAll('.parallax-bg .orb');
  if (!orbs.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, i) => {
          const speed = (i % 3 + 1) * 0.04;
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ===== NAV SHRINK ON SCROLL =====
(function initNavShrink() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(10, 16, 32, .92)';
    } else {
      nav.style.background = '';
    }
  });
})();

// ===== HAMBURGER MENU TOGGLE =====
(function initHamburger() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

// --- Copy buttons (show toast)
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1100);
}

document.querySelectorAll('.copy[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    try {
      const target = btn.getAttribute('data-copy');
      const el = document.querySelector(target);
      if (!el) return;
      await navigator.clipboard.writeText(el.textContent.trim());
      showToast('Copied to clipboard');
    } catch (e) {
      showToast('Copy failed');
    }
  });
});

// --- Floating CTA (mobile)
(function mountFloatCTA() {
  const cta = document.createElement('a');
  cta.className = 'float-cta';
  cta.href = URLS.wolfpaper;
  cta.innerHTML = '📜 Wolf Paper';
  document.body.appendChild(cta);
})();

// --- Keyboard shortcuts: W = Wolf Paper, B = Buy, C = Chart
document.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
  const k = e.key.toLowerCase();
  if (k === 'w') window.location.href = URLS.wolfpaper;
  if (k === 'b') window.open(URLS.uniswap, '_blank', 'noopener');
  if (k === 'c') window.open(URLS.dextools, '_blank', 'noopener');
});

// --- Supply counter animation
(function animateSupplyWhenVisible() {
  const supplyCard = Array.from(document.querySelectorAll('#token .card'))
    .find(c => /Total Supply/i.test(c.textContent));
  if (!supplyCard) return;
  const p = supplyCard.querySelector('p');
  if (!p) return;
  const finalText = p.textContent.trim();
  const numMatch = finalText.replace(/[^0-9]/g, '');
  const finalNum = parseInt(numMatch || '0', 10);

  const obs = new IntersectionObserver((ents) => {
    ents.forEach(ent => {
      if (!ent.isIntersecting) return;
      obs.disconnect();
      const start = performance.now(), dur = 1200;
      const step = (t) => {
        const pct = Math.min((t - start) / dur, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - pct, 3);
        const val = Math.floor(finalNum * eased);
        p.textContent = val.toLocaleString() + ' $NIKO';
        if (pct < 1) requestAnimationFrame(step);
        else p.textContent = finalText;
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  obs.observe(supplyCard);
})();
