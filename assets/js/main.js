document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Fix background images: CSS custom-property url() is resolved relative to
  // the stylesheet, not the HTML document, so we set it via JS instead.
  const gradient = 'linear-gradient(100deg,rgba(0,0,0,.80) 0%,rgba(0,0,0,.45) 55%,rgba(0,0,0,.72) 100%)';
  const pageGradient = 'linear-gradient(0deg,rgba(0,0,0,.65) 0%,rgba(0,0,0,.22) 60%,rgba(0,0,0,.10) 100%)';

  const hero = document.querySelector('.hero');
  if (hero) {
    const heroUrl = getComputedStyle(hero).getPropertyValue('--hero').trim();
    if (heroUrl) {
      hero.style.backgroundImage = gradient + ', ' + heroUrl;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center top';
      hero.style.backgroundRepeat = 'no-repeat';
    }
  }

  document.querySelectorAll('.page-hero').forEach(el => {
    const coverUrl = getComputedStyle(el).getPropertyValue('--cover').trim();
    if (coverUrl) {
      el.style.backgroundImage = pageGradient + ', ' + coverUrl;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.backgroundRepeat = 'no-repeat';
    }
  });

  // Bidirectional sticky map: top when scrolling down, bottom when scrolling up
  const stickyMap = document.querySelector('.side-sticky');
  if (stickyMap) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      if (currentY > lastY) {
        stickyMap.style.top = '80px';
        stickyMap.style.bottom = '';
      } else {
        stickyMap.style.top = '';
        stickyMap.style.bottom = '20px';
      }
      lastY = currentY;
    }, { passive: true });
  }

  // Segment carousel navigation arrows
  const grid = document.querySelector('.segment-grid');
  if (grid) {
    const wrap = grid.parentElement;
    wrap.classList.add('carousel-wrap');
    const prev = document.createElement('button');
    prev.className = 'carousel-btn prev';
    prev.innerHTML = '&#8250;';
    prev.setAttribute('aria-label', 'הקודם');
    const next = document.createElement('button');
    next.className = 'carousel-btn next';
    next.innerHTML = '&#8249;';
    next.setAttribute('aria-label', 'הבא');
    wrap.appendChild(prev);
    wrap.appendChild(next);
    const scrollBy = dir => {
      const cardW = grid.querySelector('.segment-card').offsetWidth + 18;
      grid.scrollBy({ left: dir * cardW * 2, behavior: 'smooth' });
    };
    prev.addEventListener('click', () => scrollBy(-1));
    next.addEventListener('click', () => scrollBy(1));
  }
});
