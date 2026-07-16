(() => {
  'use strict';

  /* ---------- Theme toggle (light / dark, persisted) ---------- */
  const root = document.documentElement;
  const THEME_KEY = 'siow-theme';

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0A0A0F' : '#FFFFFF');
  };

  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme) applyTheme(storedTheme);

  const initThemeToggle = () => {
    const btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  };

  /* ---------- Mobile navigation ---------- */
  const initMobileNav = () => {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-mobile-nav]');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.hasAttribute('data-open');
      if (isOpen) {
        nav.removeAttribute('data-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        nav.setAttribute('data-open', '');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.removeAttribute('data-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  };

  /* ---------- Scroll reveal ---------- */
  const initScrollReveal = () => {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el) => observer.observe(el));
  };

  /* ---------- Footer year ---------- */
  const initYear = () => {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  };

  /* ---------- Contact form (static site: routes via mailto, no backend) ---------- */
  const initContactForm = () => {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    const status = form.querySelector('[data-form-status]');
    const subjectMap = {
      general: 'contact@seeitownit.site',
      support: 'support@seeitownit.site',
      privacy: 'privacy@seeitownit.site',
      legal: 'legal@seeitownit.site',
      security: 'security@seeitownit.site',
      press: 'press@seeitownit.site',
      careers: 'careers@seeitownit.site',
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const subjectKey = data.get('subject');
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const appName = (data.get('app') || '').toString().trim();

      if (!subjectKey || !name || !email || !message) {
        status.textContent = 'Please fill in all required fields.';
        status.dataset.state = 'error';
        return;
      }

      const to = subjectMap[subjectKey] || 'contact@seeitownit.site';
      const subjectLine = encodeURIComponent(
        `[Website] ${subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1)} enquiry from ${name}`
      );
      const bodyLines = [
        appName ? `App: ${appName}` : null,
        '',
        message,
        '',
        `— ${name} (${email})`,
      ].filter((line) => line !== null);
      const body = encodeURIComponent(bodyLines.join('\n'));

      window.location.href = `mailto:${to}?subject=${subjectLine}&body=${body}`;

      status.textContent = 'Opening your email client to send this message…';
      status.dataset.state = 'success';
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initScrollReveal();
    initYear();
    initContactForm();
  });
})();
