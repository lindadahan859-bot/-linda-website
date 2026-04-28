document.addEventListener('DOMContentLoaded', function () {
  injectFixStyles();
  setupMenu();
  addFloatingButtons();
  addTopButton();
  reduceVideoOverlay();

  function injectFixStyles() {
    var old = document.getElementById('linda-menu-fixes');
    if (old) old.remove();

    var s = document.createElement('style');
    s.id = 'linda-menu-fixes';
    s.textContent = `
      .site-tools-floating{
        position:fixed!important;
        left:18px!important;
        bottom:18px!important;
        z-index:99999!important;
        display:flex!important;
        flex-direction:column!important;
        gap:8px!important;
        align-items:flex-start!important;
        pointer-events:auto!important;
      }
      .site-tools-btn{
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        text-decoration:none!important;
        font-family:Heebo,Arial,sans-serif!important;
        font-weight:700!important;
        pointer-events:auto!important;
      }
      .site-tools-btn-whatsapp{
        width:58px!important;
        height:58px!important;
        min-width:58px!important;
        min-height:58px!important;
        border-radius:16px!important;
        background:#25D366!important;
        color:#fff!important;
        box-shadow:0 12px 26px rgba(37,211,102,.28)!important;
        border:1px solid rgba(255,255,255,.45)!important;
      }
      .site-tools-btn-whatsapp svg{
        width:34px!important;
        height:34px!important;
        fill:#fff!important;
        display:block!important;
      }
      .site-tools-btn-contact{
        padding:0 18px!important;
        min-height:46px!important;
        border-radius:999px!important;
        font-size:16px!important;
        background:#9a642f!important;
        color:#fff!important;
        box-shadow:0 12px 26px rgba(80,45,15,.26)!important;
      }
      .site-back-to-top{
        position:fixed!important;
        right:12px!important;
        bottom:18px!important;
        z-index:99999!important;
        display:none!important;
        width:50px!important;
        height:50px!important;
        border-radius:50%!important;
        background:#9a642f!important;
        color:#fff!important;
        border:0!important;
        box-shadow:0 12px 26px rgba(80,45,15,.28)!important;
        font-size:27px!important;
        line-height:1!important;
        font-weight:700!important;
        pointer-events:auto!important;
      }
      .site-back-to-top.show{
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
      }
      .menu-toggle{
        display:block!important;
        position:relative!important;
        z-index:10001!important;
        pointer-events:auto!important;
        cursor:pointer!important;
      }
      .main-menu.open{
        display:flex!important;
      }
      .video-container::after,
      .hero-video::after,
      .video-wrap::after{
        content:''!important;
        position:absolute!important;
        inset:0!important;
        z-index:5!important;
        background:transparent!important;
        pointer-events:auto!important;
      }
      .video-container,
      .hero-video,
      .video-wrap{
        position:relative!important;
      }
      .video-container iframe,
      .hero-video iframe,
      .video-wrap iframe{
        pointer-events:none!important;
      }
      @media(max-width:900px){
        .site-tools-floating{left:18px!important;bottom:14px!important;}
        .site-back-to-top{right:8px!important;bottom:14px!important;}
      }
    `;
    document.head.appendChild(s);
  }

  function setupMenu() {
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      var btn = document.getElementById('menuToggle');
      var menu = document.getElementById('mainMenu');
      if (btn && menu) {
        clearInterval(timer);
        btn.dataset.ready = '1';
        btn.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          var open = menu.classList.toggle('open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        };

        menu.querySelectorAll('.menu-item-has-submenu').forEach(function (wrap) {
          var toggle = wrap.querySelector('.submenu-toggle');
          if (!toggle) return;
          var label = toggle.textContent.replace(/[▼▲]/g, '').trim() || 'תפריט';
          function paint(isOpen) {
            toggle.innerHTML = label + ' <span class="submenu-arrow">' + (isOpen ? '▲' : '▼') + '</span>';
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          }
          paint(false);
          toggle.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var isOpen = !wrap.classList.contains('open');
            menu.querySelectorAll('.menu-item-has-submenu').forEach(function (other) {
              if (other !== wrap) other.classList.remove('open');
            });
            wrap.classList.toggle('open', isOpen);
            paint(isOpen);
          };
        });
      }
      if (tries > 60) clearInterval(timer);
    }, 100);
  }

  function addFloatingButtons() {
    if (document.getElementById('site-tools-floating')) return;
    var box = document.createElement('div');
    box.id = 'site-tools-floating';
    box.className = 'site-tools-floating';

    var msg = 'היי לינדה, ראיתי את האתר ואשמח לבדוק התאמה לפרויקט שלי';
    if (window.location.pathname.indexOf('faq') > -1) {
      msg = 'היי לינדה, קראתי את שאלות ותשובות באתר ואשמח לבדוק התאמה לפרויקט שלי';
    }

    var w = document.createElement('a');
    w.className = 'site-tools-btn site-tools-btn-whatsapp';
    w.href = 'https://wa.me/972507555667?text=' + encodeURIComponent(msg);
    w.target = '_blank';
    w.rel = 'noopener';
    w.setAttribute('aria-label', 'WhatsApp');
    w.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.11 17.21c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.59.13-.17.26-.67.84-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.08-1.29-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45h-.5c-.17 0-.46.07-.7.33-.24.26-.91.89-.91 2.2s.93 2.56 1.06 2.73c.13.17 1.82 2.78 4.4 3.9.61.26 1.09.42 1.47.54.62.2 1.18.17 1.63.1.49-.07 1.53-.63 1.74-1.23.22-.61.22-1.14.15-1.24-.06-.11-.24-.17-.5-.3ZM16 5C10 5 5.14 9.77 5.14 15.66c0 1.9.5 3.75 1.45 5.39L5 27l5.62-1.48c1.58.86 3.36 1.31 5.19 1.31H16c5.99 0 10.86-4.77 10.86-10.66C26.86 9.77 21.99 5 16 5Z"/></svg>';

    var c = document.createElement('a');
    c.className = 'site-tools-btn site-tools-btn-contact';
    c.href = 'process.html#contact';
    c.textContent = 'צור קשר';

    box.appendChild(w);
    box.appendChild(c);
    document.body.appendChild(box);
  }

  function addTopButton() {
    if (document.getElementById('site-back-to-top')) return;
    var b = document.createElement('button');
    b.id = 'site-back-to-top';
    b.className = 'site-back-to-top';
    b.type = 'button';
    b.innerHTML = '↑';
    b.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
    document.body.appendChild(b);
    function show() { b.classList.toggle('show', window.scrollY > 220); }
    window.addEventListener('scroll', show, { passive: true });
    show();
  }

  function reduceVideoOverlay() {
    document.querySelectorAll('iframe').forEach(function (f) {
      var src = f.getAttribute('src') || '';
      if (src.indexOf('youtube.com') > -1 && src.indexOf('controls=0') === -1) {
        f.setAttribute('src', src + (src.indexOf('?') > -1 ? '&' : '?') + 'controls=0&modestbranding=1&rel=0');
      }
      if (src.indexOf('facebook.com') > -1) {
        f.style.pointerEvents = 'none';
      }
    });
  }
});
