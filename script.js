// --- EDIT THESE LINKS ---
const CONTRACT = '0x422273666d77f504e30e2573c063c7c50cce8453';  // << paste real contract here
const BASE_CHAIN_PARAM = 'base';
const DEXTOOLS_PAIR = 'https://www.dextools.io/app/en/base/pair-explorer/0x422273666d77f504e30e2573c063c7c50cce8453'; // replace PAIRSTUB
const DEXSCREENER = 'https://dexscreener.com/base/0xa800f8f40afe96c15eab496c7194f84cae486990'; // replace PAIRSTUB
const TELEGRAM = 'https://t.me/YOUR_TELEGRAM';
const X_TWITTER = 'https://x.com/YOUR_HANDLE';
const UNCX_LOCK = 'https://app.uncx.network/lockers/token/chain/8453/address/0x422273666d77f504e30e2573c063c7c50cce8453';

// --- AUTO SET LINKS ---
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contractDisplay').textContent = CONTRACT;
document.getElementById('tradeLink').href =
  `https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=${CONTRACT}&chain=${BASE_CHAIN_PARAM}`;
document.getElementById('chartLink').href = DEXTOOLS_PAIR;

document.getElementById('tgLink').href = TELEGRAM;
document.getElementById('xLink').href = X_TWITTER;
document.getElementById('dexsLink').href = DEXSCREENER;
document.getElementById('dextLink').href = DEXTOOLS_PAIR;
document.getElementById('uncxLink').href = UNCX_LOCK;

document.getElementById('buyBtn').href =
  `https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=${CONTRACT}&chain=${BASE_CHAIN_PARAM}`;

// Copy to clipboard
document.querySelectorAll('.copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetSel = btn.getAttribute('data-copy');
    const el = document.querySelector(targetSel);
    if (!el) return;
    navigator.clipboard.writeText(el.textContent.trim()).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = 'Copy'), 1200);
    });
  });
});
