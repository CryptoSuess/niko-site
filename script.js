// --- Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Single source of truth for links
const CONTRACT = '0x422273666d77f504e30e2573c063c7c50cce8453';
const URLS = {
  uniswap: `https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=${CONTRACT}&chain=base`,
  dextools: 'https://www.dextools.io/app/en/base/pair-explorer/0x422273666d77f504e30e2573c063c7c50cce8453',
  dexscreener: 'https://dexscreener.com/base/0x422273666d77f504e30e2573c063c7c50cce8453',
  telegram: 'https://t.me/+2pnnko2IHooxMjcx', // your real TG invite
  x: 'https://x.com/NikoToken',
  uncx: 'https://app.uncx.network/lockers/token/chain/8453/address/0x422273666d77f504e30e2573c063c7c50cce8453',
  wolfpaper: '/wolfpaper.html'
};

// --- Wire CTAs (header/hero/links)
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
const uncxLink = byId('uncxLink');
const tgCta = byId('tgCta');

[tgLink, tgCta].forEach(el => { if (el) { el.href = URLS.telegram; el.target = '_blank'; el.rel = 'noopener'; } });
if (xLink) { xLink.href = URLS.x; xLink.target = '_blank'; xLink.rel = 'noopener'; }
if (dexsLink) { dexsLink.href = URLS.dexscreener; dexsLink.target = '_blank'; dexsLink.rel = 'noopener'; }
if (dextLink) { dextLink.href = URLS.dextools; dextLink.target = '_blank'; dextLink.rel = 'noopener'; }
if (uncxLink) { uncxLink.href = URLS.uncx; uncxLink.target = '_blank'; uncxLink.rel = 'noopener'; }

// --- Contract display (keeps your original element)
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

// --- Reveal on scroll (cards, sections)
const revealables = [];
document.querySelectorAll('.card, .section h2, .pill, .badge').forEach(el => {
  el.classList.add('reveal');
  revealables.push(el);
});
const robs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.14 });
revealables.forEach(el => robs.observe(el));

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

// --- Floating CTA (mobile): “Read the Wolf Paper”
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

// --- Optional counter animation for Total Supply (parses the card text)
(function animateSupplyWhenVisible() {
  const supplyCard = Array.from(document.querySelectorAll('#token .card'))
    .find(c => /Total Supply/i.test(c.textContent));
  if (!supplyCard) return;
  const p = supplyCard.querySelector('p');
  if (!p) return;
  const finalText = p.textContent.trim(); // "1,000,000,000 $NIKO"
  const numMatch = finalText.replace(/[^0-9]/g, '');
  const finalNum = parseInt(numMatch || '0', 10);

  const obs = new IntersectionObserver((ents) => {
    ents.forEach(ent => {
      if (!ent.isIntersecting) return;
      obs.disconnect();
      const start = performance.now(), dur = 1100;
      const step = (t) => {
        const pctx = Math.min((t - start) / dur, 1);
        const val = Math.floor(finalNum * pctx);
        p.textContent = val.toLocaleString() + ' $NIKO';
        if (pctx < 1) requestAnimationFrame(step);
        else p.textContent = finalText; // restore exact original
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  obs.observe(supplyCard);
})();

