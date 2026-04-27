document.addEventListener("DOMContentLoaded", function () {
  const SITE_CONFIG = {
    whatsappNumber: "972507555667",
    whatsappMessage: "היי לינדה, אשמח לשמוע פרטים",
    phoneNumber: "0507555667",
    email: "lindadahan859@gmail.com",
    privacyUrl: "privacy.html",
    cookiesUrl: "cookies.html",
    cookieKey: "lindaarch_cookie_consent_v1"
  };

  setupHeaderMenuWhenReady();
  injectSiteToolsStyles();
  createFloatingButtons();
  createBackToTopButton();
  createCookieBanner();

  function setupHeaderMenuWhenReady() {
    let attempts = 0;
    const timer = window.setInterval(function () {
      attempts += 1;
      const btn = document.getElementById("menuToggle");
      const menu = document.getElementById("mainMenu");
      if (btn && menu) {
        window.clearInterval(timer);
        if (btn.dataset.menuReady === "true") return;
        btn.dataset.menuReady = "true";

        btn.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          const isOpen = menu.classList.toggle("open");
          btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        const subToggle = menu.querySelector('.submenu-toggle');
        const subWrap = menu.querySelector('.menu-item-has-submenu');
        if (subToggle && subWrap) {
          subToggle.innerHTML = 'פרויקטים <span style="font-size:12px">▼</span>';
          subToggle.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            const open = subWrap.classList.toggle('open');
            subToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            subToggle.innerHTML = open ? 'פרויקטים <span style="font-size:12px">▲</span>' : 'פרויקטים <span style="font-size:12px">▼</span>';
          });
        }

        menu.querySelectorAll("a").forEach(function (link) {
          link.addEventListener("click", function () {
            menu.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
          });
        });
      }
      if (attempts > 60) window.clearInterval(timer);
    }, 100);
  }

  function trackGA(){}
  function trackPixel(){}
  function injectSiteToolsStyles(){}
  function createFloatingButtons(){}
  function createBackToTopButton(){}
  function createCookieBanner(){}
});