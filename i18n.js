// Языки сайта: определение, запоминание, переключатель с глобусом.
// Порядок выбора: ?lang= в адресе → сохранённый выбор → язык браузера → английский.

const LANGS = [
  ['ru', 'Русский'], ['en', 'English'], ['es', 'Español'], ['pt', 'Português'], ['fr', 'Français'],
  ['de', 'Deutsch'], ['it', 'Italiano'], ['tr', 'Türkçe'], ['ar', 'العربية'], ['hi', 'हिन्दी'],
  ['zh', '中文'], ['ja', '日本語'], ['ko', '한국어'], ['uk', 'Українська'],
];
const RTL = ['ar'];

const UI = {
  ru: { back: 'К картине', happened: 'Что произошло', picture: 'На картине', sources: 'Источники', outlets: 'Изданий, написавших о событии: {n} — поэтому рисунок такого размера.', missing: 'Это событие не найдено.', parts: ['утро', 'день', 'вечер'], language: 'Язык', alt: 'Картина мира' },
  en: { back: 'Back to the picture', happened: 'What happened', picture: 'In the picture', sources: 'Sources', outlets: 'Outlets that covered this story: {n} — that is why the drawing is this size.', missing: 'This event was not found.', parts: ['morning', 'afternoon', 'evening'], language: 'Language', alt: 'Picture of the world' },
  es: { back: 'Volver al cuadro', happened: 'Qué pasó', picture: 'En el cuadro', sources: 'Fuentes', outlets: 'Medios que cubrieron esta noticia: {n}; por eso el dibujo tiene este tamaño.', missing: 'No se encontró este evento.', parts: ['mañana', 'tarde', 'noche'], language: 'Idioma', alt: 'Cuadro del mundo' },
  pt: { back: 'Voltar à pintura', happened: 'O que aconteceu', picture: 'Na pintura', sources: 'Fontes', outlets: 'Veículos que noticiaram o fato: {n} — por isso o desenho tem este tamanho.', missing: 'Este evento não foi encontrado.', parts: ['manhã', 'tarde', 'noite'], language: 'Idioma', alt: 'Pintura do mundo' },
  fr: { back: 'Retour au tableau', happened: 'Ce qui s’est passé', picture: 'Sur le tableau', sources: 'Sources', outlets: 'Médias ayant couvert cet événement : {n} — d’où la taille du dessin.', missing: 'Cet événement est introuvable.', parts: ['matin', 'après-midi', 'soir'], language: 'Langue', alt: 'Tableau du monde' },
  de: { back: 'Zurück zum Bild', happened: 'Was geschah', picture: 'Auf dem Bild', sources: 'Quellen', outlets: 'Medien, die darüber berichtet haben: {n} – daher die Größe der Zeichnung.', missing: 'Dieses Ereignis wurde nicht gefunden.', parts: ['Morgen', 'Mittag', 'Abend'], language: 'Sprache', alt: 'Bild der Welt' },
  it: { back: 'Torna al quadro', happened: 'Cosa è successo', picture: 'Nel quadro', sources: 'Fonti', outlets: 'Testate che hanno coperto la notizia: {n} — per questo il disegno ha queste dimensioni.', missing: 'Evento non trovato.', parts: ['mattina', 'pomeriggio', 'sera'], language: 'Lingua', alt: 'Quadro del mondo' },
  tr: { back: 'Resme dön', happened: 'Ne oldu', picture: 'Resimde', sources: 'Kaynaklar', outlets: 'Bu haberi veren yayın sayısı: {n} — çizimin boyutu bu yüzden böyle.', missing: 'Bu olay bulunamadı.', parts: ['sabah', 'öğle', 'akşam'], language: 'Dil', alt: 'Dünyanın resmi' },
  ar: { back: 'العودة إلى اللوحة', happened: 'ماذا حدث', picture: 'في اللوحة', sources: 'المصادر', outlets: 'عدد وسائل الإعلام التي تناولت الحدث: {n}، ولذلك جاء الرسم بهذا الحجم.', missing: 'لم يُعثر على هذا الحدث.', parts: ['صباحًا', 'ظهرًا', 'مساءً'], language: 'اللغة', alt: 'لوحة العالم' },
  hi: { back: 'चित्र पर लौटें', happened: 'क्या हुआ', picture: 'चित्र में', sources: 'स्रोत', outlets: 'इस ख़बर को कवर करने वाले प्रकाशन: {n} — इसीलिए चित्र इस आकार का है।', missing: 'यह घटना नहीं मिली।', parts: ['सुबह', 'दोपहर', 'शाम'], language: 'भाषा', alt: 'दुनिया का चित्र' },
  zh: { back: '返回画面', happened: '发生了什么', picture: '画中', sources: '来源', outlets: '报道此事的媒体数量：{n}，因此图像是这个大小。', missing: '未找到此事件。', parts: ['早上', '下午', '晚上'], language: '语言', alt: '世界之画' },
  ja: { back: '絵に戻る', happened: '何が起きたか', picture: '絵の中では', sources: '情報源', outlets: 'この出来事を報じたメディア数：{n}。そのためこの大きさで描かれています。', missing: 'この出来事は見つかりませんでした。', parts: ['朝', '昼', '夜'], language: '言語', alt: '世界の絵' },
  ko: { back: '그림으로 돌아가기', happened: '무슨 일이 있었나', picture: '그림 속에서', sources: '출처', outlets: '이 사건을 보도한 매체 수: {n} — 그래서 그림이 이 크기입니다.', missing: '이 사건을 찾을 수 없습니다.', parts: ['아침', '낮', '저녁'], language: '언어', alt: '세계의 그림' },
  uk: { back: 'До картини', happened: 'Що сталося', picture: 'На картині', sources: 'Джерела', outlets: 'Видань, що написали про подію: {n} — тому малюнок такого розміру.', missing: 'Цю подію не знайдено.', parts: ['ранок', 'день', 'вечір'], language: 'Мова', alt: 'Картина світу' },
};

const store = {
  get: () => { try { return localStorage.getItem('lang'); } catch { return null; } },
  set: v => { try { localStorage.setItem('lang', v); } catch {} },
};
const supported = code => LANGS.some(([c]) => c === code);

function detectLang() {
  const url = new URLSearchParams(location.search).get('lang');
  if (supported(url)) { store.set(url); return url; }
  const saved = store.get();
  if (supported(saved)) return saved;
  for (const l of navigator.languages || [navigator.language || '']) {
    const code = l.toLowerCase().split('-')[0];
    if (supported(code)) return code;
  }
  return 'en';
}

let LANG = detectLang();
const t = (key, vars = {}) => {
  const v = UI[LANG][key] ?? UI.en[key];
  return typeof v === 'string' ? v.replace(/\{(\w+)\}/g, (_, k) => vars[k]) : v;
};

// Язык всегда виден в адресе — ссылкой можно поделиться
function applyLang() {
  const u = new URL(location.href);
  u.searchParams.set('lang', LANG);
  history.replaceState(null, '', u);
  document.documentElement.lang = LANG;
  document.documentElement.dir = RTL.includes(LANG) ? 'rtl' : 'ltr';
}
applyLang();

const GLOBE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5M12 2.5C9.4 5.3 8.1 8.5 8.1 12s1.3 6.7 3.9 9.5"/></svg>';

// Переключатель: глобус + код языка, по нажатию — список языков на их собственных названиях
function langPicker(onChange) {
  const box = document.createElement('div');
  box.className = 'lang';
  box.innerHTML = `<button type="button" class="lang-btn" aria-haspopup="listbox"></button>
    <ul class="lang-menu" role="listbox" hidden>${LANGS.map(([c, n]) =>
      `<li role="option" data-code="${c}" lang="${c}">${n}</li>`).join('')}</ul>`;
  const btn = box.querySelector('.lang-btn'), menu = box.querySelector('.lang-menu');
  const paint = () => {
    btn.innerHTML = `${GLOBE}<span>${LANG.toUpperCase()}</span>`;
    btn.setAttribute('aria-label', t('language'));
    menu.querySelectorAll('li').forEach(li => li.setAttribute('aria-selected', li.dataset.code === LANG));
  };
  btn.onclick = e => { e.stopPropagation(); menu.hidden = !menu.hidden; };
  menu.onclick = e => {
    const li = e.target.closest('li');
    if (!li) return;
    LANG = li.dataset.code; store.set(LANG); applyLang(); paint(); menu.hidden = true; onChange();
  };
  document.addEventListener('click', () => menu.hidden = true);
  paint();
  return box;
}

const LANG_CSS = `
  .lang { position: relative; }
  .lang-btn { display: flex; align-items: center; gap: 6px; font: 600 13px/1 system-ui, sans-serif; color: #f1e8dc;
    background: #000000a8; border: 1px solid #ffffff2a; border-radius: 999px; padding: 7px 11px; cursor: pointer; }
  .lang-btn:hover { border-color: #ffffff60; }
  .lang-menu { position: absolute; inset-inline-end: 0; top: calc(100% + 6px); margin: 0; padding: 6px; list-style: none;
    background: #1a1512; border: 1px solid #33291f; border-radius: 12px; min-width: 170px; max-height: 70vh; overflow: auto;
    box-shadow: 0 12px 40px #000c; z-index: 50; }
  .lang-menu li { padding: 8px 12px; border-radius: 8px; cursor: pointer; font: 15px/1.2 system-ui, sans-serif; color: #f1e8dc; }
  .lang-menu li:hover { background: #ffffff12; }
  .lang-menu li[aria-selected="true"] { color: #e9a75a; font-weight: 600; }`;
document.head.insertAdjacentHTML('beforeend', `<style>${LANG_CSS}</style>`);

function formatDate(iso, withTime = false) {
  const d = withTime ? new Date(iso) : new Date(iso + 'T12:00:00');
  const opts = withTime ? { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }
                        : { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat(LANG, opts).format(d);
}
