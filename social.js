// Подписка на Telegram-канал и окно «Поделиться» с мессенджерами.
// Подключается после i18n.js: берёт LANG и стили панели оттуда.

const TELEGRAM_CHANNEL = 'https://t.me/zhizn_v_kartinkah_world';

const SOCIAL_UI = {
  ru: { subscribe: 'Подписаться', share: 'Поделиться', copy: 'Скопировать ссылку', copied: 'Ссылка скопирована', more: 'Другие приложения', close: 'Закрыть' },
  en: { subscribe: 'Subscribe', share: 'Share', copy: 'Copy link', copied: 'Link copied', more: 'Other apps', close: 'Close' },
  es: { subscribe: 'Suscribirse', share: 'Compartir', copy: 'Copiar enlace', copied: 'Enlace copiado', more: 'Otras apps', close: 'Cerrar' },
  pt: { subscribe: 'Inscrever-se', share: 'Compartilhar', copy: 'Copiar link', copied: 'Link copiado', more: 'Outros apps', close: 'Fechar' },
  fr: { subscribe: 'S’abonner', share: 'Partager', copy: 'Copier le lien', copied: 'Lien copié', more: 'Autres applis', close: 'Fermer' },
  de: { subscribe: 'Abonnieren', share: 'Teilen', copy: 'Link kopieren', copied: 'Link kopiert', more: 'Andere Apps', close: 'Schließen' },
  it: { subscribe: 'Iscriviti', share: 'Condividi', copy: 'Copia link', copied: 'Link copiato', more: 'Altre app', close: 'Chiudi' },
  tr: { subscribe: 'Abone ol', share: 'Paylaş', copy: 'Bağlantıyı kopyala', copied: 'Bağlantı kopyalandı', more: 'Diğer uygulamalar', close: 'Kapat' },
  ar: { subscribe: 'اشترك', share: 'مشاركة', copy: 'نسخ الرابط', copied: 'تم نسخ الرابط', more: 'تطبيقات أخرى', close: 'إغلاق' },
  hi: { subscribe: 'सब्सक्राइब करें', share: 'साझा करें', copy: 'लिंक कॉपी करें', copied: 'लिंक कॉपी हो गया', more: 'अन्य ऐप', close: 'बंद करें' },
  zh: { subscribe: '订阅', share: '分享', copy: '复制链接', copied: '链接已复制', more: '其他应用', close: '关闭' },
  ja: { subscribe: '購読する', share: '共有', copy: 'リンクをコピー', copied: 'リンクをコピーしました', more: 'その他のアプリ', close: '閉じる' },
  ko: { subscribe: '구독하기', share: '공유', copy: '링크 복사', copied: '링크가 복사되었습니다', more: '다른 앱', close: '닫기' },
  uk: { subscribe: 'Підписатися', share: 'Поділитися', copy: 'Скопіювати посилання', copied: 'Посилання скопійовано', more: 'Інші застосунки', close: 'Закрити' },
};
const st = key => (SOCIAL_UI[LANG] || SOCIAL_UI.en)[key];

const ICONS = {
  telegram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M21.6 3.3 2.9 10.5c-1.3.5-1.3 1.3-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.3-1.5zM8.6 13.3l9.4-5.9c.5-.3.8-.1.5.2l-7.9 7.1-.3 3.3-1.7-4.7z"/></svg>',
  share: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.3 10.8 7.4-4.4M8.3 13.2l7.4 4.4"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 5-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3z"/></svg>',
  tg: '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M21.6 3.3 2.9 10.5c-1.3.5-1.3 1.3-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.3-1.5zM8.6 13.3l9.4-5.9c.5-.3.8-.1.5.2l-7.9 7.1-.3 3.3-1.7-4.7z"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>',
  vk: '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12.8 17.5c-5.6 0-8.8-3.8-8.9-10.2h2.8c.1 4.7 2.2 6.6 3.8 7V7.3h2.6v4c1.6-.2 3.3-2 3.8-4h2.6a7.7 7.7 0 0 1-3.5 5c1.3.6 3.3 2.2 4.1 5.2h-2.9c-.6-2-2.2-3.5-4.1-3.7v3.7h-.3z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/></svg>',
  more: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
};

const SOCIAL_CSS = `
  .social { display: flex; align-items: center; gap: 8px; }
  .pill { display: inline-flex; align-items: center; gap: 6px; font: 600 13px/1 system-ui, sans-serif; color: #f1e8dc; text-decoration: none;
    background: #000000a8; border: 1px solid #ffffff2a; border-radius: 999px; padding: 7px 11px; cursor: pointer; white-space: nowrap; }
  .pill:hover { border-color: #ffffff60; }
  .pill.tg { background: #229ed9; border-color: #229ed9; color: #fff; }
  @media (max-width: 560px) { .pill .txt { display: none; } .pill { padding: 7px 9px; } }
  .share-back { position: fixed; inset: 0; background: #000b; z-index: 100; display: grid; place-items: end center; }
  @media (min-width: 561px) { .share-back { place-items: center; } }
  .share-box { width: min(440px, 100%); background: #1a1512; color: #f1e8dc; border: 1px solid #33291f; border-radius: 18px;
    padding: 18px 18px 22px; box-shadow: 0 20px 60px #000c; font: 15px/1.4 system-ui, sans-serif; }
  @media (max-width: 560px) { .share-box { border-radius: 18px 18px 0 0; } }
  .share-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .share-head b { font: 600 18px/1.2 Georgia, serif; }
  .share-x { all: unset; cursor: pointer; font-size: 26px; line-height: 1; padding: 0 6px; color: #a8998a; }
  .share-preview { display: flex; gap: 12px; align-items: center; background: #ffffff0a; border-radius: 12px; padding: 10px; margin-bottom: 16px; }
  .share-preview img { width: 56px; height: 56px; border-radius: 8px; object-fit: cover; flex: none; }
  .share-preview span { font-size: 14px; color: #d9cdbf; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .share-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px 8px; }
  .share-grid a, .share-grid button { all: unset; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 6px;
    font-size: 12px; color: #d9cdbf; text-align: center; }
  .share-grid i { width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; color: #fff; }
  .share-toast { text-align: center; color: #e9a75a; font-size: 14px; margin-top: 14px; min-height: 1.2em; }`;
document.head.insertAdjacentHTML('beforeend', `<style>${SOCIAL_CSS}</style>`);

// Кнопки для панели: «Подписаться» (Telegram) и «Поделиться». getShare() → {url, title, image}
function socialButtons(getShare) {
  const box = document.createElement('div');
  box.className = 'social';
  const paint = () => {
    box.innerHTML = `
      <a class="pill tg" href="${TELEGRAM_CHANNEL}" target="_blank" rel="noopener" title="Telegram">${ICONS.telegram}<span class="txt">${st('subscribe')}</span></a>
      <button type="button" class="pill share" title="${st('share')}">${ICONS.share}<span class="txt">${st('share')}</span></button>`;
    box.querySelector('.share').onclick = () => openShare(getShare());
  };
  paint();
  box.repaint = paint;
  return box;
}

function openShare({ url, title, image }) {
  const u = encodeURIComponent(url), tx = encodeURIComponent(title);
  const targets = [
    ['WhatsApp', ICONS.whatsapp, '#25d366', `https://wa.me/?text=${tx}%20${u}`],
    ['Telegram', ICONS.tg, '#229ed9', `https://t.me/share/url?url=${u}&text=${tx}`],
    ['X', ICONS.x, '#000', `https://twitter.com/intent/tweet?url=${u}&text=${tx}`],
    ['Facebook', ICONS.facebook, '#1877f2', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['VK', ICONS.vk, '#0077ff', `https://vk.com/share.php?url=${u}&title=${tx}`],
    ['Email', ICONS.mail, '#6b5b4d', `mailto:?subject=${tx}&body=${u}`],
  ];
  const back = document.createElement('div');
  back.className = 'share-back';
  back.innerHTML = `
    <div class="share-box" role="dialog" aria-modal="true" aria-label="${st('share')}">
      <div class="share-head"><b>${st('share')}</b><button class="share-x" aria-label="${st('close')}">×</button></div>
      <div class="share-preview">${image ? `<img src="${image}" alt="">` : ''}<span></span></div>
      <div class="share-grid">
        ${targets.map(([n, ic, bg, href]) => `<a href="${href}" target="_blank" rel="noopener"><i style="background:${bg}">${ic}</i>${n}</a>`).join('')}
        <button type="button" class="copy"><i style="background:#3a2f26">${ICONS.link}</i>${st('copy')}</button>
        ${navigator.share ? `<button type="button" class="native"><i style="background:#3a2f26">${ICONS.more}</i>${st('more')}</button>` : ''}
      </div>
      <div class="share-toast"></div>
    </div>`;
  back.querySelector('.share-preview span').textContent = title;
  const close = () => back.remove();
  back.onclick = e => { if (e.target === back) close(); };
  back.querySelector('.share-x').onclick = close;
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  back.querySelector('.copy').onclick = async () => {
    try { await navigator.clipboard.writeText(url); } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: url });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    back.querySelector('.share-toast').textContent = st('copied');
  };
  const nat = back.querySelector('.native');
  if (nat) nat.onclick = () => navigator.share({ title, url }).catch(() => {});
  document.body.appendChild(back);
}
