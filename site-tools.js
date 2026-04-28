document.addEventListener('DOMContentLoaded',function(){
  injectFixStyles();
  injectHeaderFallback();
  setupMenu();
  enhanceYavneHomeCard();
  addFloatingButtons();
  addTopButton();

  function injectHeaderFallback(){setTimeout(function(){var holder=document.getElementById('site-header');if(!holder)return;if(holder.querySelector('.site-header'))return;},10)}

  function injectFixStyles(){
    if(document.getElementById('linda-menu-fixes'))return;
    var s=document.createElement('style');s.id='linda-menu-fixes';
    s.textContent='.site-tools-floating{position:fixed!important;left:10px!important;bottom:18px!important;z-index:99999!important;display:flex!important;flex-direction:column!important;gap:8px!important}.site-tools-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;border-radius:999px!important;text-decoration:none!important;font-family:Heebo,Arial,sans-serif!important;font-weight:700!important}.site-tools-btn-whatsapp{width:48px!important;height:48px!important;border-radius:50%!important;background:#25D366!important;box-shadow:0 10px 22px rgba(37,211,102,.22)!important}.site-tools-btn-whatsapp svg{width:24px!important;height:24px!important;fill:#fff!important}.site-tools-btn-contact{padding:0 14px!important;min-height:42px!important;font-size:14px!important;background:#9a642f!important;color:#fff!important}.site-back-to-top{position:fixed!important;right:12px!important;bottom:18px!important;z-index:99999!important;display:none!important;width:46px!important;height:46px!important;border-radius:50%!important;background:#9a642f!important;color:#fff!important;border:0!important;box-shadow:0 12px 24px rgba(80,45,15,.28)!important;font-size:24px!important;font-weight:700!important}.site-back-to-top.show{display:inline-flex!important;align-items:center!important;justify-content:center!important}@media(max-width:900px){.site-tools-floating{left:8px!important;bottom:14px!important}.site-back-to-top{right:8px!important;bottom:14px!important}}';document.head.appendChild(s);
  }
  function setupMenu(){}
  function enhanceYavneHomeCard(){}
  function addFloatingButtons(){if(document.getElementById('site-tools-floating'))return;var box=document.createElement('div');box.id='site-tools-floating';box.className='site-tools-floating';var w=document.createElement('a');w.className='site-tools-btn site-tools-btn-whatsapp';w.href='https://wa.me/972507555667';w.target='_blank';w.innerHTML='<svg viewBox="0 0 32 32"><path d="M16.02 3.2c-7.02 0-12.73 5.7-12.73 12.71 0 2.25.59 4.45 1.72 6.39L3.2 28.8l6.66-1.75c1.87 1.02 3.98 1.56 6.16 1.56h.01c7.01 0 12.71-5.7 12.72-12.71 0-3.4-1.32-6.59-3.72-8.99A12.63 12.63 0 0 0 16.02 3.2Z"/></svg>';var c=document.createElement('a');c.className='site-tools-btn site-tools-btn-contact';c.href='process.html#contact';c.textContent='צור קשר';box.appendChild(w);box.appendChild(c);document.body.appendChild(box);} 
  function addTopButton(){if(document.getElementById('site-back-to-top'))return;var b=document.createElement('button');b.id='site-back-to-top';b.className='site-back-to-top';b.innerHTML='↑';b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};document.body.appendChild(b);function show(){b.classList.toggle('show',window.scrollY>520);}window.addEventListener('scroll',show,{passive:true});show();}
});