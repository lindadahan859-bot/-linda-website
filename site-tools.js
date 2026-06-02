(function(){
  if(!window.fbq){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','127944994281591');
    fbq('track','PageView');
  }

  function px(type,name,data){
    if(window.fbq){try{fbq(type,name,data||{});}catch(e){}}
  }

  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a');
    if(!a)return;
    var h=a.getAttribute('href')||'';
    var page=(location.pathname.split('/').pop()||'index.html').replace('.html','')||'home';
    if(h.indexOf('wa.me/')>-1||h.indexOf('api.whatsapp.com')>-1){
      px('track','Lead',{source:'whatsapp',page:page});
    }else if(h.indexOf('tel:')===0){
      px('track','Contact',{source:'phone',page:page});
    }else if(h.indexOf('mailto:')===0){
      px('track','Contact',{source:'email',page:page});
    }else if(h.indexOf('facebook.com/reel')>-1||h.indexOf('youtube.com')>-1||h.indexOf('youtu.be')>-1){
      px('trackCustom','VideoClick',{source:'video',page:page});
    }else if(h.indexOf('.html')>-1){
      px('trackCustom','ViewImportantPageClick',{destination:h,page:page});
    }
  },true);

  var fired={50:0,75:0,90:0};
  function scrollCheck(){
    var d=document.documentElement,b=document.body,top=window.pageYOffset||d.scrollTop||0,total=Math.max(b.scrollHeight,d.scrollHeight)-innerHeight;
    if(total<=0)return;
    var p=Math.round(top/total*100);
    [50,75,90].forEach(function(m){
      if(!fired[m]&&p>=m){
        fired[m]=1;
        px('trackCustom','ScrollDepth',{percent:m,page:(location.pathname.split('/').pop()||'index.html')});
      }
    });
  }
  var stimer;
  addEventListener('scroll',function(){clearTimeout(stimer);stimer=setTimeout(scrollCheck,200);},{passive:true});
})();

document.addEventListener('DOMContentLoaded',function(){
  var st=document.createElement('style');
  st.textContent='html,body{max-width:100%!important;overflow-x:hidden!important}.site-tools-floating{position:fixed!important;left:18px!important;bottom:18px!important;z-index:99999!important;display:flex!important;flex-direction:column!important;gap:8px!important;align-items:flex-start!important}.site-tools-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;text-decoration:none!important;font-family:Heebo,Arial,sans-serif!important;font-weight:700!important}.site-tools-btn-whatsapp{width:72px!important;height:72px!important;border-radius:50%!important;background:#25D366!important;color:#fff!important;font-size:0!important;line-height:1!important;box-shadow:0 12px 28px rgba(37,211,102,.28)!important;border:1px solid rgba(255,255,255,.6)!important}.site-tools-btn-whatsapp img{width:42px!important;height:42px!important;display:block!important;filter:brightness(0) invert(1)!important}.site-tools-btn-contact{padding:0 18px!important;min-height:46px!important;border-radius:999px!important;font-size:16px!important;background:#9a642f!important;color:#fff!important}.site-back-to-top{position:fixed!important;right:12px!important;bottom:18px!important;z-index:99999!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;width:50px!important;height:50px!important;border-radius:50%!important;background:#9a642f!important;color:#fff!important;border:0!important;font-size:27px!important}.menu-toggle,.submenu-toggle{display:flex!important;pointer-events:auto!important;cursor:pointer!important;z-index:10001!important}.main-menu.open{display:flex!important}.menu-item-has-submenu.open .submenu{display:flex!important}.ld-page-image{margin:0 0 24px!important;background:#fff!important;border-radius:28px!important;padding:14px!important;box-shadow:0 10px 30px rgba(0,0,0,.08)!important}.ld-page-image img{display:block!important;width:100%!important;height:360px!important;object-fit:cover!important;border-radius:20px!important}.ld-page-gallery{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;margin-top:18px!important}.ld-page-gallery figure{margin:0!important;background:#faf8f4!important;border-radius:20px!important;padding:10px!important;border:1px solid rgba(0,0,0,.06)!important}.ld-page-gallery img{display:block!important;width:100%!important;height:190px!important;object-fit:cover!important;border-radius:14px!important}.ld-page-gallery figcaption{font:700 15px Heebo,Arial,sans-serif!important;color:#333!important;text-align:center!important;margin-top:8px!important}@media(max-width:850px){.ld-page-image img{height:230px!important}.ld-page-gallery{grid-template-columns:1fr!important}.ld-page-gallery img{height:210px!important}}';
  document.head.appendChild(st);

  function closeAllSubmenus(except){
    var items=document.querySelectorAll('.menu-item-has-submenu');
    for(var j=0;j<items.length;j++){
      var item=items[j];
      if(item===except)continue;
      item.classList.remove('open');
      var btn=item.querySelector('.submenu-toggle');
      if(btn){
        btn.setAttribute('aria-expanded','false');
        var ar=btn.querySelector('.submenu-arrow');
        if(ar)ar.textContent='▼';
      }
    }
  }

  function bindMenus(){
    var b=document.getElementById('menuToggle');
    var m=document.getElementById('mainMenu');
    if(b&&m&&b.dataset.bound!=='1'){
      b.dataset.bound='1';
      b.onclick=function(e){
        e.preventDefault();
        e.stopPropagation();
        m.classList.toggle('open');
        b.setAttribute('aria-expanded',m.classList.contains('open')?'true':'false');
      };
    }
    var toggles=document.querySelectorAll('.submenu-toggle');
    for(var k=0;k<toggles.length;k++){
      var t=toggles[k];
      if(t.dataset.bound==='1')continue;
      t.dataset.bound='1';
      var label=t.textContent.replace(/[▼▲]/g,'').trim();
      t.innerHTML=label+' <span class="submenu-arrow">▼</span>';
      t.onclick=function(e){
        e.preventDefault();
        e.stopPropagation();
        var p=this.closest('.menu-item-has-submenu');
        if(!p)return;
        var willOpen=!p.classList.contains('open');
        closeAllSubmenus(p);
        p.classList.toggle('open',willOpen);
        this.setAttribute('aria-expanded',willOpen?'true':'false');
        var ar=this.querySelector('.submenu-arrow');
        if(ar)ar.textContent=willOpen?'▲':'▼';
      };
    }
  }

  document.addEventListener('click',function(e){
    if(!e.target.closest||!e.target.closest('.main-menu'))closeAllSubmenus(null);
  },true);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAllSubmenus(null);});

  function addFaviconIfMissing(){
    if(!document.querySelector('link[rel="icon"]')){var l=document.createElement('link');l.rel='icon';l.type='image/png';l.href='favicon.png';document.head.appendChild(l);}
    if(!document.querySelector('link[rel="shortcut icon"]')){var s=document.createElement('link');s.rel='shortcut icon';s.type='image/png';s.href='favicon.png';document.head.appendChild(s);}
    if(!document.querySelector('link[rel="apple-touch-icon"]')){var a=document.createElement('link');a.rel='apple-touch-icon';a.href='favicon.png';document.head.appendChild(a);}
  }

  function addSpamProtection(){
    if(window.ldSpamProtectionBound==='1')return;
    window.ldSpamProtectionBound='1';

    function prepareForms(){
      var forms=document.querySelectorAll('form[action*="formsubmit.co"]');
      for(var i=0;i<forms.length;i++){
        var form=forms[i];
        var captcha=form.querySelector('input[name="_captcha"]');
        if(captcha)captcha.value='true';
        else{
          captcha=document.createElement('input');
          captcha.type='hidden';
          captcha.name='_captcha';
          captcha.value='true';
          form.insertBefore(captcha,form.firstChild);
        }
        if(!form.querySelector('input[name="_honey"]')){
          var honey=document.createElement('input');
          honey.type='text';
          honey.name='_honey';
          honey.tabIndex=-1;
          honey.autocomplete='off';
          honey.setAttribute('aria-hidden','true');
          honey.style.display='none';
          form.insertBefore(honey,form.firstChild);
        }
      }
    }

    function getValue(form,name){
      var el=form.querySelector('[name="'+name+'"]');
      return el&&el.value?String(el.value):'';
    }

    document.addEventListener('submit',function(e){
      var form=e.target;
      if(!form||!form.matches||!form.matches('form[action*="formsubmit.co"]'))return;

      var nameValue=getValue(form,'name').toLowerCase();
      var emailValue=getValue(form,'email').toLowerCase();
      var messageValue=getValue(form,'message').toLowerCase();
      var feelingValue=getValue(form,'feeling').toLowerCase();
      var honeyValue=getValue(form,'_honey').trim();
      var phoneValue=getValue(form,'phone');
      var phoneDigits=phoneValue.replace(/\D/g,'');
      var combinedText=[nameValue,emailValue,messageValue,feelingValue].join(' ');
      var spamWords=['sex','porn','casino','crypto','viagra','loan','girl','girlfriend','escort','http','https','www','.com','.org','.net','.ru','.xyz','graph.org'];
      var hasSpam=honeyValue!==''||phoneDigits.length<9||phoneDigits.length>12;

      for(var i=0;i<spamWords.length;i++){
        if(combinedText.indexOf(spamWords[i])>-1){hasSpam=true;break;}
      }

      if(hasSpam){
        e.preventDefault();
        e.stopImmediatePropagation();
        var status=form.parentElement&&form.parentElement.querySelector('.small-note, .process-small-note, #formStatus');
        if(status){
          status.className=(status.className||'')+' error-message process-error-message';
          status.textContent='נראה שהפרטים לא תקינים. אפשר לפנות אליי ישירות ב-WhatsApp.';
        }
        var btn=form.querySelector('button[type="submit"], input[type="submit"]');
        if(btn){btn.disabled=false;if(btn.tagName.toLowerCase()==='button')btn.textContent='שליחה';}
        return false;
      }
    },true);

    prepareForms();
    var timer=setInterval(prepareForms,500);
    setTimeout(function(){clearInterval(timer);prepareForms();},8000);
  }

  function addContextImages(){
    if(document.body.dataset.contextImagesAdded==='1')return;
    var page=(location.pathname.split('/').pop()||'index.html');
    var map={
      'nahala-planning-before-permit.html':{hero:'nahala-before-permit-plans-helmet.jpg',alt:'בדיקות לפני היתר בנחלה'},
      'rmi-hivun-nahala.html':{hero:'rmi-nahala-fees-calculator-plans.jpg',alt:'היוון ודמי רכישה בנחלה'},
      'plach-moshavim.html':{hero:'plach-moshav-rural-business.jpg',alt:'פלח במושבים ונחלות',gallery:[['plach-moshav-boutique-winery.jpg','יקב בוטיק'],['plach-moshav-carpentry-workshop.jpg','נגרייה וסדנת מלאכה'],['plach-moshav-equestrian-business.jpg','חווה לרכיבה טיפולית']]},
      'third-house-nahala.html':{hero:'third-house-ben-mamshich-nahala.jpg',alt:'בית שלישי ובן ממשיך בנחלה'},
      'parcelatzia-nahala.html':{hero:'parcelatzia-nahala-site-planning-clean.jpg',alt:'פרצלציה ופיצול מגרש בנחלה'},
      'nahala-betterment-tax.html':{hero:'rmi-nahala-fees-calculator-plans.jpg',alt:'היטל השבחה ומס שבח בנחלות'}
    };
    var cfg=map[page];
    if(!cfg)return;
    document.body.dataset.contextImagesAdded='1';
    var hero=document.querySelector('.hero-card');
    if(hero&&!document.querySelector('.ld-page-image')){
      var wrap=document.createElement('div');
      wrap.className='ld-page-image';
      wrap.innerHTML='<img src="'+cfg.hero+'" alt="'+cfg.alt+'" loading="eager">';
      hero.insertAdjacentElement('afterend',wrap);
    }
    if(cfg.gallery){
      var cards=document.querySelectorAll('.content-card');
      var target=null;
      for(var i=0;i<cards.length;i++){
        var h=cards[i].querySelector('h2');
        if(h&&h.textContent.indexOf('אילו שימושים')>-1){target=cards[i];break;}
      }
      if(target&&!target.querySelector('.ld-page-gallery')){
        var g=document.createElement('div');
        g.className='ld-page-gallery';
        var html='';
        for(var j=0;j<cfg.gallery.length;j++){
          html+='<figure><img src="'+cfg.gallery[j][0]+'" alt="'+cfg.gallery[j][1]+'" loading="lazy"><figcaption>'+cfg.gallery[j][1]+'</figcaption></figure>';
        }
        g.innerHTML=html;
        target.appendChild(g);
      }
    }
  }

  function bindProjectImages(){
    var cards=document.querySelectorAll('.home-page .project-card');
    for(var i=0;i<cards.length;i++){
      var card=cards[i];
      if(card.dataset.imageClickBound==='1')continue;
      var mainLink=card.querySelector('.project-buttons a[href$=".html"], .project-buttons a[href*=".html"], a.outline-btn[href$=".html"], a.outline-btn[href*=".html"]');
      var img=card.querySelector('img');
      if(!img||!mainLink)continue;
      card.dataset.imageClickBound='1';
      img.setAttribute('tabindex','0');
      img.setAttribute('role','link');
      img.setAttribute('aria-label','כניסה לפרויקט');
      img.addEventListener('click',function(link){return function(ev){ev.preventDefault();ev.stopPropagation();window.location.href=link.getAttribute('href');};}(mainLink));
      img.addEventListener('keydown',function(link){return function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();window.location.href=link.getAttribute('href');}};}(mainLink));
    }
  }

  function bindArtImage(){
    var art=document.querySelector('.home-page .featured-art');
    if(!art||art.dataset.imageClickBound==='1')return;
    var link=art.querySelector('a[href*="unique-art.html"]');
    var img=art.querySelector('img');
    if(!link||!img)return;
    art.dataset.imageClickBound='1';
    img.setAttribute('tabindex','0');
    img.setAttribute('role','link');
    img.setAttribute('aria-label','כניסה לעמוד אומנות ייחודית');
    img.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();window.location.href=link.getAttribute('href');});
    img.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();window.location.href=link.getAttribute('href');}});
  }

  function initTools(){
    bindMenus();
    bindProjectImages();
    bindArtImage();
    addFaviconIfMissing();
    addContextImages();
    addSpamProtection();
  }

  var i=setInterval(initTools,200);
  setTimeout(function(){clearInterval(i);initTools();},8000);
  initTools();

  if(!document.getElementById('site-tools-floating')){
    var box=document.createElement('div');
    box.id='site-tools-floating';
    box.className='site-tools-floating';
    var text=encodeURIComponent('היי לינדה, ראיתי את האתר ואשמח לבדוק התאמה לפרויקט שלי');
    var w=document.createElement('a');
    w.className='site-tools-btn site-tools-btn-whatsapp';
    w.href='https://wa.me/972507555667?text='+text;
    w.target='_blank';
    w.rel='noopener';
    w.setAttribute('aria-label','WhatsApp');
    w.innerHTML='<img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg" alt="">';
    var c=document.createElement('a');
    c.className='site-tools-btn site-tools-btn-contact';
    c.href='process.html#contact';
    c.textContent='צור קשר';
    box.appendChild(w);
    box.appendChild(c);
    document.body.appendChild(box);
  }

  if(!document.getElementById('site-back-to-top')){
    var up=document.createElement('button');
    up.id='site-back-to-top';
    up.className='site-back-to-top';
    up.type='button';
    up.textContent='↑';
    up.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
    document.body.appendChild(up);
  }
});
