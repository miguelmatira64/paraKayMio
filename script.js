document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize minimal icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Dark Mode / Light Mode Toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    html.classList.remove('dark');
  } else {
    html.classList.add('dark');
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (window.lucide) window.lucide.createIcons();
  });

  // 3. Dropdown Accordion Toggle
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownContent = document.getElementById('dropdownContent');
  const chevron = document.getElementById('chevron');

  dropdownBtn?.addEventListener('click', () => {
    const isOpen = dropdownContent.classList.toggle('open');
    dropdownBtn.setAttribute('aria-expanded', String(isOpen));
    chevron?.classList.toggle('rotate', isOpen);

    // Trigger reveal check once opened
    if (isOpen) {
      setTimeout(() => {
        checkScrollReveals();
      }, 100);
    }
  });

  // 4. Scroll Reveal Observer (Only reveals when scrolled into view)
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  function checkScrollReveals() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight - 30 && rect.bottom > 0;
      if (inView) {
        el.classList.add('is-revealed');
      }
    });
  }

  // Listen for scroll events to ensure immediate responsive triggering
  window.addEventListener('scroll', checkScrollReveals, { passive: true });
});
