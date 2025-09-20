(function () {
  'use strict';

  // Helpers
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Mobile nav toggle
  const navToggle = $('.nav-toggle');
  const navLinks = $('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for anchor links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      try {
        if (id && id.startsWith('#') && $(id)) {
          e.preventDefault();
          $(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
          navLinks?.classList.remove('open');
          navToggle?.setAttribute('aria-expanded', 'false');
        }
      } catch(_) {}
    });
  });

  // Magnetic button hover effect
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--mx', `${x}px`);
      btn.style.setProperty('--my', `${y}px`);
    });
  });

  // Scroll reveal
  const revealEls = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Parallax light touch for sections marked .parallax
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    $$('.parallax').forEach((sec, idx) => {
      sec.style.transform = `translateY(${(y * 0.02) * (idx % 2 === 0 ? 1 : -1)}px)`;
    });
  }, { passive: true });

  // Project modals
  const openModal = (id) => {
    const m = $(id);
    if (!m) return;
    m.classList.add('active');
    m.setAttribute('aria-hidden', 'false');
  };
  const closeModal = (m) => {
    m.classList.remove('active');
    m.setAttribute('aria-hidden', 'true');
  };
  $$('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-modal');
      if (id) openModal(`#${id}`);
    });
  });
  $$('.modal').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m || e.target.classList.contains('modal-close')) {
        closeModal(m);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && m.classList.contains('active')) closeModal(m);
    });
  });

  // Contact form mock submission
  const form = $('#contactForm');
  const status = $('#formStatus');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Thanks! I will get back to you shortly.';
      form.reset();
      setTimeout(() => status.textContent = '', 4000);
    }, 800);
  });

  // Current year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
