// Счётчик посещений без куки.
//
// Отправляет в наш приёмник одну строку: день, страница, язык и откуда пришёл
// человек. Ни куки, ни адреса, ни чего-либо, по чему можно узнать человека, не
// пишется — поэтому баннер согласия для него не нужен.
//
// Числа нужны, чтобы понимать, стоит ли вообще заводить рекламу на сайте.
(function () {
  var INBOX = 'https://script.google.com/macros/s/AKfycbyhyR7J4X7loYL20pxz4a8PN0bl3oMDYrI6XzD7Z521usFOvbn5roPldfjIruqzj0uI8w/exec';

  function where() {
    try {
      if (!document.referrer) return '';
      var host = new URL(document.referrer).hostname;
      return host === location.hostname ? '' : host;   // переходы внутри сайта не считаем приходом
    } catch (e) {
      return '';
    }
  }

  function page() {
    var path = location.pathname.replace(/^\/+/, '') || 'index';
    var day = new URLSearchParams(location.search).get('day');
    return day ? path + '?day=' + day : path;
  }

  function lang() {
    try {
      return (localStorage.getItem('lang') || navigator.language || '').slice(0, 5);
    } catch (e) {
      return (navigator.language || '').slice(0, 5);
    }
  }

  function send() {
    var url = INBOX + '?hit=1'
      + '&p=' + encodeURIComponent(page())
      + '&l=' + encodeURIComponent(lang())
      + '&r=' + encodeURIComponent(where());
    try {
      fetch(url, { mode: 'no-cors', keepalive: true, cache: 'no-store' });
    } catch (e) {
      new Image().src = url;        // запасной путь для старых браузеров
    }
  }

  // Считаем, только когда страницу действительно смотрят: предзагрузки и
  // скрытые вкладки пропускаем.
  if (document.visibilityState === 'hidden') {
    document.addEventListener('visibilitychange', function once() {
      if (document.visibilityState === 'visible') {
        document.removeEventListener('visibilitychange', once);
        send();
      }
    });
  } else {
    send();
  }
})();
