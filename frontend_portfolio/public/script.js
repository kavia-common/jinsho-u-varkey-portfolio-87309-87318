(function(){
  'use strict';

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scrolling for anchor links with [data-scroll]
  const scrollLinks = document.querySelectorAll('[data-scroll]');
  const smoothScroll = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target){
      const offset = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - (offset + 8);
      window.scrollTo({ top, behavior: 'smooth' });
      closeMenu();
    }
  };
  scrollLinks.forEach(a => a.addEventListener('click', smoothScroll));

  // Mobile nav toggle
  const toggleBtn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  function openMenu(){
    menu.classList.add('open');
    toggleBtn.setAttribute('aria-expanded','true');
    toggleBtn.setAttribute('aria-label','Close menu');
  }
  function closeMenu(){
    menu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded','false');
    toggleBtn.setAttribute('aria-label','Open menu');
  }
  toggleBtn?.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });
  document.addEventListener('click', (e)=>{
    if (!menu || !toggleBtn) return;
    if (menu.classList.contains('open')){
      const within = menu.contains(e.target) || toggleBtn.contains(e.target);
      if (!within) closeMenu();
    }
  });

  // Reveal on scroll using IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Project Modals
  const modalMap = {
    p1: document.getElementById('modal-p1'),
    p2: document.getElementById('modal-p2'),
    p3: document.getElementById('modal-p3'),
  };
  function openModal(id){
    const m = modalMap[id];
    if (!m) return;
    m.classList.add('active');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModalByEl(el){
    el.classList.remove('active');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-project-open]').forEach(btn=>{
    btn.addEventListener('click', (e)=> {
      const id = e.currentTarget.getAttribute('data-project-open');
      openModal(id);
    });
  });
  document.querySelectorAll('[data-modal]').forEach(backdrop=>{
    backdrop.addEventListener('click', (e)=>{
      const isBackdrop = e.target === e.currentTarget;
      if (isBackdrop) closeModalByEl(e.currentTarget);
    });
    backdrop.querySelectorAll('[data-modal-close]').forEach(close=>{
      close.addEventListener('click', ()=> closeModalByEl(backdrop));
    });
    // ESC key to close
    backdrop.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') closeModalByEl(backdrop);
    });
  });

  // Demo form handler
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    if(!name || !email || !message){
      alert('Please fill out all fields.');
      return;
    }
    // Simulate sending
    form.reset();
    alert('Thanks! This is a demo. Wire this form to your backend/email service.');
  });
})();
