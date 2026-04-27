document.addEventListener('DOMContentLoaded',function(){
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
});
