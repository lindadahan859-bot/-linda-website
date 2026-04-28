document.addEventListener('DOMContentLoaded',function(){
  injectFixStyles();
  injectHeaderFallback();
  setupMenu();
  enhanceYavneHomeCard();
  addFloatingButtons();
  addTopButton();

  function injectHeaderFallback(){
    setTimeout(function(){
      var holder=document.getElementById('site-header');
      if(!holder)return;
      if(holder.querySelector('.site-header'))return;
      holder.innerHTML='<header class="site-header"><div class="header-wrap"><a class="brand" href="index.html" aria-label="לינדה דהן - דף הבית"><img src="logo-black.png" alt="לינדה דהן"></a><button class="menu-toggle" id="menuToggle" aria-label="פתחי תפריט" aria-expanded="false" aria-controls="mainMenu" type="button">☰</button><nav class="main-menu" id="mainMenu" aria-label="תפריט ראשי"><a href="index.html">בית</a><div class="menu-item-has-submenu"><button class="submenu-toggle" type="button" aria-expanded="false">הסיפור שלי</button><div class="submenu"><a href="story.html">הסיפור שלי</a><a href="index.html#testimonials">המלצות</a></div></div><a href="process.html">תהליך העבודה</a><a href="unique-art.html">אומנות ייחודית</a><div class="menu-item-has-submenu"><button class="submenu-toggle" type="button" aria-expanded="false">פרויקטים</button><div class="submenu"><a href="leiba-yavne.html">בית פרטי ביבנה</a><a href="blenheim-rehovot.html">רחובות דופלקס</a><a href="rehovot-eisenberg-project.html">מגדלי אייזינברג רחובות</a><a href="bnei-brak-jewelry-store.html">חנות תכשיטים בבני ברק</a><a href="karmia-house-permit.html">כרמיה תכנון והיתר בניה</a></div></div><a href="index.html#permits">היתרי בנייה</a><a href="faq.html">שאלות ותשובות</a><a href="index.html#contact" class="header-cta">צור קשר</a></nav></div></header>';
      var btn=document.getElementById('menuToggle');
      if(btn)btn.dataset.ready='';
      setupMenu();
    },1200);
  }

  function injectFixStyles(){
    if(document.getElementById('linda-menu-fixes'))return;
    var s=document.createElement('style');
    s.id='linda-menu-fixes';
    s.textContent=".site-header{background:#fff!important}.header-wrap{max-width:1280px!important;width:100%!important;margin:0 auto!important;padding:18px 42px!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:34px!important;direction:rtl!important}.brand{flex:0 0 auto!important;display:flex!important;align-items:center!important}.brand img{height:64px!important;width:auto!important}.main-menu{flex:1 1 auto!important;min-width:0!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:28px!important;direction:rtl!important}.main-menu a,.submenu-toggle{font-size:17px!important;font-weight:500!important;white-space:nowrap!important;color:#1f1f1f!important;line-height:1.2!important}.menu-item-has-submenu{position:relative!important}.submenu-toggle{display:inline-flex!important;align-items:center!important;gap:6px!important;border:0!important;background:transparent!important;font-family:Heebo,Arial,sans-serif!important;cursor:pointer!important}.submenu{position:absolute!important;top:calc(100% + 12px)!important;right:0!important;z-index:10000!important;display:none!important;min-width:285px!important;padding:16px 20px!important;background:#fff!important;border-radius:18px!important;box-shadow:0 18px 40px rgba(0,0,0,.12)!important}.menu-item-has-submenu.open .submenu{display:flex!important;flex-direction:column!important;gap:0!important}.submenu a{display:block!important;width:100%!important;white-space:normal!important;padding:9px 0!important;line-height:1.45!important;text-align:right!important}.submenu-arrow{font-size:12px!important;margin-inline-start:4px!important}.menu-toggle{color:#111!important}.site-tools-floating{position:fixed!important;left:18px!important;bottom:18px!important;z-index:99999!important;display:flex!important;flex-direction:column!important;gap:10px!important;direction:rtl!important}.site-tools-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:48px!important;padding:0 18px!important;border-radius:999px!important;background:rgba(255,255,255,.98)!important;color:#111!important;border:1px solid rgba(0,0,0,.22)!important;box-shadow:0 14px 34px rgba(0,0,0,.24)!important;text-decoration:none!important;font-family:Heebo,Arial,sans-serif!important;font-size:15px!important;font-weight:600!important}.site-tools-btn-contact{background:#9a642f!important;color:#fff!important;border-color:#9a642f!important;box-shadow:0 14px 34px rgba(80,45,15,.3)!important}.site-back-to-top{position:fixed!important;right:18px!important;bottom:18px!important;z-index:99999!important;display:none!important;align-items:center!important;justify-content:center!important;min-height:46px!important;padding:0 16px!important;border-radius:999px!important;background:#9a642f!important;color:#fff!important;border:1px solid rgba(255,255,255,.35)!important;box-shadow:0 14px 34px rgba(80,45,15,.32)!important;font-family:Heebo,Arial,sans-serif!important;font-weight:700!important}.site-back-to-top.show{display:inline-flex!important}@media(max-width:1100px){.header-wrap{padding:16px 24px!important;gap:20px!important}.brand img{height:56px!important}.main-menu{gap:16px!important}.main-menu a,.submenu-toggle{font-size:15px!important}}@media(max-width:900px){.header-wrap{padding:14px 18px!important}.brand img{height:52px!important}.menu-toggle{display:block!important}.main-menu{position:absolute!important;top:84px!important;right:18px!important;left:18px!important;flex:none!important;width:auto!important;display:none!important;flex-direction:column!important;align-items:flex-start!important;gap:14px!important;background:#fff!important;border-radius:18px!important;padding:18px!important;box-shadow:0 20px 40px rgba(0,0,0,.08)!important}.main-menu.open{display:flex!important}.main-menu a,.submenu-toggle{width:100%!important;text-align:right!important;font-size:16px!important}.menu-item-has-submenu{width:100%!important}.submenu{position:static!important;top:auto!important;right:auto!important;width:100%!important;min-width:0!important;box-shadow:none!important;margin-top:10px!important;padding:8px 14px!important;border:1px solid rgba(0,0,0,.06)!important;background:#fafaf8!important}.site-tools-floating{left:12px!important;bottom:12px!important}.site-back-to-top{right:12px!important;bottom:12px!important}}";
    document.head.appendChild(s);
  }

  function setupMenu(){
    var tries=0;
    var timer=setInterval(function(){
      tries++;
      var btn=document.getElementById('menuToggle');
      var menu=document.getElementById('mainMenu');
      if(btn&&menu){
        clearInterval(timer);
        if(btn.dataset.ready==='1')return;
        btn.dataset.ready='1';
        btn.onclick=function(e){e.preventDefault();e.stopPropagation();var open=menu.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false');};
        menu.querySelectorAll('.menu-item-has-submenu').forEach(function(wrap){
          var toggle=wrap.querySelector('.submenu-toggle');
          if(!toggle)return;
          var label=toggle.textContent.replace(/[▼▲]/g,'').trim()||'תפריט';
          function paint(open){toggle.innerHTML=label+' <span class="submenu-arrow">'+(open?'▲':'▼')+'</span>';toggle.setAttribute('aria-expanded',open?'true':'false');}
          paint(false);
          toggle.onclick=function(e){e.preventDefault();e.stopPropagation();var open=!wrap.classList.contains('open');menu.querySelectorAll('.menu-item-has-submenu').forEach(function(other){if(other!==wrap)other.classList.remove('open');});wrap.classList.toggle('open',open);menu.querySelectorAll('.menu-item-has-submenu .submenu-toggle').forEach(function(otherToggle){var otherLabel=otherToggle.textContent.replace(/[▼▲]/g,'').trim()||'תפריט';var otherOpen=otherToggle.closest('.menu-item-has-submenu').classList.contains('open');otherToggle.innerHTML=otherLabel+' <span class="submenu-arrow">'+(otherOpen?'▲':'▼')+'</span>';otherToggle.setAttribute('aria-expanded',otherOpen?'true':'false');});};
        });
        menu.querySelectorAll('a').forEach(function(a){a.onclick=function(){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');};});
        document.addEventListener('click',function(e){if(!menu.contains(e.target)&&!btn.contains(e.target)){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');menu.querySelectorAll('.menu-item-has-submenu').forEach(function(w){w.classList.remove('open');});}});
      }
      if(tries>60)clearInterval(timer);
    },100);
  }

  function enhanceYavneHomeCard(){
    if(!document.body.classList.contains('home-page'))return;
    var img=document.querySelector('img[src="leiba-house.jpg"]');
    if(!img)return;
    var card=img.closest('.project-card');
    if(!card)return;
    var h3=card.querySelector('h3');
    var p=card.querySelector('p');
    var btn=card.querySelector('.outline-btn');
    if(h3)h3.textContent='בית פרטי ביבנה';
    if(p)p.textContent='בית שתוכנן למשפחה חמה, עם שפה נקייה, נגרות מדויקת ופתרונות שנועדו לחיים אמיתיים.';
    if(btn){btn.textContent='לצפייה בפרויקט';btn.setAttribute('href','leiba-yavne.html');}
    if(card.tagName.toLowerCase()!=='a'){
      card.style.cursor='pointer';
      card.setAttribute('role','link');
      card.setAttribute('tabindex','0');
      card.addEventListener('click',function(e){if(e.target.closest('a'))return;window.location.href='leiba-yavne.html';});
      card.addEventListener('keydown',function(e){if(e.key==='Enter')window.location.href='leiba-yavne.html';});
    }
  }

  function addFloatingButtons(){
    if(document.getElementById('site-tools-floating'))return;
    var box=document.createElement('div');
    box.id='site-tools-floating';
    box.className='site-tools-floating';
    var msg='היי לינדה, ראיתי את האתר ואשמח לבדוק התאמה לפרויקט שלי';
    if(window.location.pathname.indexOf('faq')>-1)msg='היי לינדה, קראתי את שאלות ותשובות באתר ואשמח לבדוק התאמה לפרויקט שלי';
    var w=document.createElement('a');
    w.className='site-tools-btn site-tools-btn-whatsapp';
    w.href='https://wa.me/972507555667?text='+encodeURIComponent(msg);
    w.target='_blank';w.rel='noopener';w.textContent='WhatsApp';
    var c=document.createElement('a');
    c.className='site-tools-btn site-tools-btn-contact';
    c.href='process.html#contact';c.textContent='צור קשר';
    box.appendChild(w);box.appendChild(c);document.body.appendChild(box);
  }

  function addTopButton(){
    if(document.getElementById('site-back-to-top'))return;
    var b=document.createElement('button');
    b.id='site-back-to-top';b.className='site-back-to-top';b.type='button';b.textContent='↑ למעלה';
    b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
    document.body.appendChild(b);
    function show(){b.classList.toggle('show',window.scrollY>520);}
    window.addEventListener('scroll',show,{passive:true});show();
  }
});
