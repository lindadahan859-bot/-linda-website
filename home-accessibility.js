(function () {
  const welcome = document.getElementById('lindaPopup');
  if (welcome && typeof welcome.showModal === 'function') {
    const closeButton = welcome.querySelector('button');
    closeButton.addEventListener('click', () => welcome.close());
    welcome.addEventListener('close', () => {
      try { localStorage.setItem('lindaPopupShown', 'true'); } catch {}
      if (document.activeElement === document.body) {
        document.querySelector('.skip-link').focus();
      }
    });
    window.addEventListener('load', () => {
      let alreadyShown = false;
      try { alreadyShown = localStorage.getItem('lindaPopupShown') === 'true'; } catch {}
      if (!alreadyShown) {
        window.setTimeout(() => {
          if (document.activeElement === document.body) welcome.showModal();
        }, 2000);
      }
    }, { once: true });
  }

  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;
  const track = slider.querySelector('.testimonial-track');
  const slides = Array.from(track.children);
  const dotContainer = slider.querySelector('.testimonial-dots');
  const dots = slides.map((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testimonial-dot';
    dot.setAttribute('aria-label', 'מעבר לתשבוחת ' + (index + 1));
    dot.addEventListener('click', () => showSlide(index));
    dotContainer.appendChild(dot);
    return dot;
  });
  let current = 0;
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = 'translateX(' + current * 100 + '%)';
    slides.forEach((slide, i) => {
      slide.inert = i !== current;
      if (slide.inert) slide.setAttribute('aria-hidden', 'true');
      else slide.removeAttribute('aria-hidden');
      dots[i].classList.toggle('active', i === current);
      if (i === current) dots[i].setAttribute('aria-current', 'true');
      else dots[i].removeAttribute('aria-current');
    });
  }
  slider.querySelector('.prev').addEventListener('click', () => showSlide(current - 1));
  slider.querySelector('.next').addEventListener('click', () => showSlide(current + 1));
  showSlide(0);
})();
