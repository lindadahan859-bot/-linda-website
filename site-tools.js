document.addEventListener('DOMContentLoaded',function(){
  setupMenu();
  addFloatingButtons();
  addTopButton();

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
