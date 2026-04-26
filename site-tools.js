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

        menu.querySelectorAll("a").forEach(function (link) {
          link.addEventListener("click", function () {
            menu.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
          });
        });

        document.addEventListener("click", function (event) {
          const clickedInsideMenu = menu.contains(event.target);
          const clickedButton = btn.contains(event.target);

          if (!clickedInsideMenu && !clickedButton) {
            menu.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
          }
        });

        window.addEventListener("resize", function () {
          if (window.innerWidth > 900) {
            menu.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
          }
        });
      }

      if (attempts > 60) {
        window.clearInterval(timer);
      }
    }, 100);
  }

  function trackGA(eventName, params = {}) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  }

  function trackPixel(eventName, params = {}) {
    if (typeof window.fbq === "function") {
      window.fbq("track", eventName, params);
    }
  }

  function injectSiteToolsStyles() {
    if (document.getElementById("site-tools-styles")) return;

    const style = document.createElement("style");
    style.id = "site-tools-styles";
    style.textContent = `
      .site-tools-floating {
        position: fixed;
        left: 18px;
        bottom: 18px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        direction: rtl;
      }

      .site-tools-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        min-height: 46px;
        padding: 0 16px;
        border-radius: 999px;
        border: 1px solid rgba(0,0,0,0.08);
        background: rgba(255,255,255,0.96);
        color: #1f1f1f;
        box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        backdrop-filter: blur(8px);
        text-decoration: none;
        font-family: 'Heebo', sans-serif;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
      }

      .site-tools-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 34px rgba(0,0,0,0.16);
      }

      .site-tools-btn svg {
        width: 18px;
        height: 18px;
        flex: 0 0 18px;
        stroke-width: 1.8;
      }

      .site-tools-btn-whatsapp {
        background: #ffffff;
      }

      .site-tools-btn-contact {
        background: #9f6e38;
        color: #ffffff;
        border-color: rgba(159,110,56,0.4);
      }

      .site-tools-btn-contact svg {
        color: #ffffff;
      }

      .site-back-to-top {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 99999;
        min-height: 44px;
        padding: 0 15px;
        border-radius: 999px;
        border: 1px solid rgba(0,0,0,0.1);
        background: rgba(255,255,255,0.96);
        color: #111;
        box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        backdrop-filter: blur(8px);
        font-family: 'Heebo', sans-serif;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: none;
        align-items: center;
        gap: 7px;
      }

      .site-back-to-top.show {
        display: inline-flex;
      }

      .site-cookie-banner {
        position: fixed;
        right: 18px;
        left: 18px;
        bottom: 18px;
        z-index: 99998;
        max-width: 980px;
        margin: 0 auto;
        background: rgba(28, 26, 24, 0.96);
        color: #f7f1e8;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        box-shadow: 0 18px 40px rgba(0,0,0,0.22);
        padding: 16px 18px;
        font-family: 'Heebo', sans-serif;
        display: none;
      }

      .site-cookie-banner.show {
        display: block;
      }

      .site-cookie-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .site-cookie-text {
        font-size: 14px;
        line-height: 1.6;
      }

      .site-cookie-text a {
        color: #f0dec2;
        text-decoration: none;
      }

      .site-cookie-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
      }

      .site-cookie-btn {
        min-height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.16);
        background: transparent;
        color: #f7f1e8;
        font-family: 'Heebo', sans-serif;
        font-size: 14px;
        cursor: pointer;
      }

      .site-cookie-btn-accept {
        background: #9f6e38;
        border-color: rgba(159,110,56,0.4);
        color: #ffffff;
      }

      @media (max-width: 900px) {
        .site-tools-floating {
          left: 12px;
          bottom: 12px;
          gap: 8px;
        }

        .site-tools-btn {
          min-height: 42px;
          padding: 0 14px;
          font-size: 14px;
        }

        .site-back-to-top {
          right: 12px;
          bottom: 12px;
          min-height: 42px;
          padding: 0 13px;
        }

        .site-cookie-banner {
          right: 12px;
          left: 12px;
          bottom: 12px;
          border-radius: 16px;
          padding: 14px;
        }

        .site-cookie-inner {
          flex-direction: column;
          align-items: stretch;
        }

        .site-cookie-actions {
          justify-content: flex-start;
          flex-wrap: wrap;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createFloatingButtons() {
    if (document.getElementById("site-tools-floating")) return;

    const wrapper = document.createElement("div");
    wrapper.id = "site-tools-floating";
    wrapper.className = "site-tools-floating";

    const whatsappUrl =
      "https://wa.me/" +
      SITE_CONFIG.whatsappNumber +
      "?text=" +
      encodeURIComponent(SITE_CONFIG.whatsappMessage);

    const whatsappBtn = document.createElement("a");
    whatsappBtn.href = whatsappUrl;
    whatsappBtn.target = "_blank";
    whatsappBtn.rel = "noopener";
    whatsappBtn.className = "site-tools-btn site-tools-btn-whatsapp";
    whatsappBtn.setAttribute("aria-label", "שלחי הודעת וואטסאפ");
    whatsappBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.57 7.5L3 21l2.08-5.12A8.5 8.5 0 1 1 21 11.5z"></path>
        <path d="M9.5 9.5c.3-.7.6-.7.9-.7h.5c.2 0 .5.1.6.4l.8 1.8c.1.2.1.5 0 .7l-.4.6c-.1.2-.2.3-.1.5.4.8 1 1.5 1.8 2 .2.1.3.1.5-.1l.5-.5c.2-.2.5-.3.8-.2l1.7.8c.3.1.4.3.4.6v.5c0 .3 0 .6-.6.9-.5.2-1 .3-1.5.2-1.2-.2-2.6-.9-4-2.2-1.3-1.3-2.1-2.7-2.3-4-.1-.5 0-1 .2-1.3z"></path>
      </svg>
      <span>WhatsApp</span>
    `;
    whatsappBtn.addEventListener("click", function () {
      trackGA("whatsapp_click", {
        event_category: "engagement",
        event_label: window.location.pathname
      });
      trackPixel("Contact", { method: "whatsapp" });
    });

    const contactBtn = document.createElement("a");
    contactBtn.href = "#contact";
    contactBtn.className = "site-tools-btn site-tools-btn-contact";
    contactBtn.setAttribute("aria-label", "מעבר לצור קשר");
    contactBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="5" width="18" height="14" rx="2"></rect>
        <path d="m4 7 8 6 8-6"></path>
      </svg>
      <span>צור קשר</span>
    `;
    contactBtn.addEventListener("click", function () {
      trackGA("contact_click", {
        event_category: "engagement",
        event_label: window.location.pathname
      });
      trackPixel("Contact", { method: "contact_button" });
    });

    wrapper.appendChild(whatsappBtn);
    wrapper.appendChild(contactBtn);
    document.body.appendChild(wrapper);
  }

  function createBackToTopButton() {
    if (document.getElementById("site-back-to-top")) return;

    const btn = document.createElement("button");
    btn.id = "site-back-to-top";
    btn.className = "site-back-to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "חזרה לראש העמוד");
    btn.innerHTML = "↑ למעלה";

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      trackGA("back_to_top_click", {
        event_category: "navigation",
        event_label: window.location.pathname
      });
    });

    document.body.appendChild(btn);

    function toggleButton() {
      if (window.scrollY > 520) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    }

    window.addEventListener("scroll", toggleButton, { passive: true });
    toggleButton();
  }

  function createCookieBanner() {
    if (document.getElementById("site-cookie-banner")) return;

    const consent = localStorage.getItem(SITE_CONFIG.cookieKey);

    const banner = document.createElement("div");
    banner.id = "site-cookie-banner";
    banner.className = "site-cookie-banner";
    banner.innerHTML = `
      <div class="site-cookie-inner">
        <div class="site-cookie-text">
          האתר משתמש בעוגיות ובכלי מדידה כמו Google Analytics ו-Meta Pixel
          לצורך שיפור חוויית הגלישה, ניתוח תנועה ושיווק.
          <a href="${SITE_CONFIG.privacyUrl}">מדיניות פרטיות</a>
          ·
          <a href="${SITE_CONFIG.cookiesUrl}">מדיניות עוגיות</a>
        </div>
        <div class="site-cookie-actions">
          <button type="button" class="site-cookie-btn" id="site-cookie-decline">לא עכשיו</button>
          <button type="button" class="site-cookie-btn site-cookie-btn-accept" id="site-cookie-accept">מאשרת</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    if (!consent) {
      requestAnimationFrame(() => {
        banner.classList.add("show");
      });
    }

    const acceptBtn = document.getElementById("site-cookie-accept");
    const declineBtn = document.getElementById("site-cookie-decline");

    acceptBtn.addEventListener("click", function () {
      localStorage.setItem(SITE_CONFIG.cookieKey, "accepted");
      banner.classList.remove("show");

      trackGA("cookie_consent_accept", {
        event_category: "consent",
        event_label: window.location.pathname
      });
      trackPixel("ConsentGranted", { source: "cookie_banner" });
    });

    declineBtn.addEventListener("click", function () {
      localStorage.setItem(SITE_CONFIG.cookieKey, "declined");
      banner.classList.remove("show");

      trackGA("cookie_consent_decline", {
        event_category: "consent",
        event_label: window.location.pathname
      });
    });
  }
});
