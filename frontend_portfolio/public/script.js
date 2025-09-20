(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // Mobile menu toggle
  const menuBtn = $('.menu');
  const drawer = $('.drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close drawer on link click (mobile)
  $$('.drawer a').forEach(a => {
    a.addEventListener('click', () => {
      drawer?.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll for anchor links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.startsWith('#') && $(id)) {
        e.preventDefault();
        $(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Contact form mock
  const form = $('#contactForm');
  const status = $('#formStatus');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (status) status.textContent = 'Sending...';
    setTimeout(() => {
      if (status) status.textContent = 'Thanks! I will get back to you shortly.';
      form.reset();
      setTimeout(() => { if (status) status.textContent = ''; }, 3000);
    }, 600);
  });

  // Year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
