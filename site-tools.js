document.addEventListener('DOMContentLoaded',function(){
  injectFixStyles();
  setupMenu();
  addFloatingButtons();
  addTopButton();

  function injectFixStyles(){
    if(document.getElementById('linda-menu-fixes'))return;
    var s=document.createElement('style');
    s.id='linda-menu-fixes';
    s.textContent=".header-wrap{max-width:1280px!important;width:100%!important;box-sizing:border-box!important}.brand{flex:0 0 auto!important}.brand img{height:58px!important;width:auto!important}.main-menu{flex:1 1 auto!important;min-width:0!important;justify-content:flex-start!important;gap:18px!important}.main-menu a,.submenu-toggle{font-size:16px!important;white-space:nowrap!important}.menu-item-has-submenu{position:relative!important}.submenu{position:absolute!important;top:100%!important;right:0!important;z-index:10000!important;display:none!important;min-width:260px!important;padding:14px!important;background:#fff!important;border-radius:18px!important;box-shadow:0 18px 40px rgba(0,0,0,.12)!important}.menu-item-has-submenu.open .submenu{display:flex!important}.submenu a{display:block!important;width:100%!important;white-space:normal!important;padding:8px 0!important;line-height:1.45!important}.submenu-arrow{font-size:12px!important;margin-inline-start:6px!important}.menu-toggle{color:#111!important}.site-tools-floating{position:fixed!important;left:18px!important;bottom:18px!important;z-index:99999!important;display:flex!important;flex-direction:column!important;gap:10px!important;direction:rtl!important}.site-tools-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:46px!important;padding:0 16px!important;border-radius:999px!important;background:#fff!important;color:#111!important;border:1px solid rgba(0,0,0,.08)!important;box-shadow:0 10px 30px rgba(0,0,0,.12)!important;text-decoration:none!important;font-family:Heebo,Arial,sans-serif!important;font-size:15px!important}.site-tools-btn-contact{background:#9f6e38!important;color:#fff!important}.site-back-to-top{position:fixed!important;right:18px!important;bottom:18px!important;z-index:99999!important;display:none!important;align-items:center!important;justify-content:center!important;min-height:44px!important;padding:0 15px!important;border-radius:999px!important;background:#fff!important;color:#111!important;border:1px solid rgba(0,0,0,.1)!important;box-shadow:0 10px 30px rgba(0,0,0,.12)!important;font-family:Heebo,Arial,sans-serif!important;font-weight:600!important}.site-back-to-top.show{display:inline-flex!important}@media(max-width:900px){.header-wrap{padding:14px 18px!important}.brand img{height:52px!important}.main-menu{position:absolute!important;top:84px!important;right:18px!important;left:18px!important;flex:none!important;width:auto!important;display:none!important;flex-direction:column!important;align-items:flex-start!important;gap:14px!important}.main-menu.open{display:flex!important}.submenu{position:static!important;top:auto!important;right:auto!important;width:100%!important;box-shadow:none!important}.site-tools-floating{left:12px!important;bottom:12px!important}.site-back-to-top{right:12px!important;bottom:12px!important}}";
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
        var wrap=menu.querySelector('.menu-item-has-submenu');
        var toggle=menu.querySelector('.submenu-toggle');
        if(wrap&&toggle){
          var label=toggle.textContent.replace(/[▼▲]/g,'').trim()||'פרויקטים';
          function paint(open){toggle.innerHTML=label+' <span class="submenu-arrow">'+(open?'▲':'▼')+'</span>';toggle.setAttribute('aria-expanded',open?'true':'false');}
          paint(false);
          toggle.onclick=function(e){e.preventDefault();e.stopPropagation();paint(wrap.classList.toggle('open'));};
        }
        menu.querySelectorAll('a').forEach(function(a){a.onclick=function(){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');};});
        document.addEventListener('click',function(e){if(!menu.contains(e.target)&&!btn.contains(e.target)){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
      }
      if(tries>60)clearInterval(timer);
    },100);
  }

  function addFloatingButtons(){
    if(document.getElementById('site-tools-floating'))return;
    var box=document.createElement('div');
    box.id='site-tools-floating';
    box.className='site-tools-floating';
    var w=document.createElement('a');
    w.className='site-tools-btn site-tools-btn-whatsapp';
    w.href='https://wa.me/972507555667';
    w.target='_blank';
    w.rel='noopener';
    w.textContent='WhatsApp';
    var c=document.createElement('a');
    c.className='site-tools-btn site-tools-btn-contact';
    c.href='#contact';
    c.textContent='צור קשר';
    box.appendChild(w);box.appendChild(c);document.body.appendChild(box);
  }

  function addTopButton(){
    if(document.getElementById('site-back-to-top'))return;
    var b=document.createElement('button');
    b.id='site-back-to-top';
    b.className='site-back-to-top';
    b.type='button';
    b.textContent='↑ למעלה';
    b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
    document.body.appendChild(b);
    function show(){b.classList.toggle('show',window.scrollY>520);}
    window.addEventListener('scroll',show,{passive:true});show();
  }
});
