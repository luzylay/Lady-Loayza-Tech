/**
 * @file scroll-spy.controller.js
 * @module presentation/scroll-spy.controller
 * @description Controlador de observador de scroll para resaltar la navegación activa.
 */

export class ScrollSpyController {
  constructor({
    sectionsSelector = 'section[id]',
    navLinksSelector = '.nav-links a'
  } = {}) {
    this.sections = document.querySelectorAll(sectionsSelector);
    this.navLinks = document.querySelectorAll(navLinksSelector);
  }

  init() {
    if (!('IntersectionObserver' in window) || this.sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          this.setActiveNavLink(sectionId);
        }
      });
    }, observerOptions);

    this.sections.forEach((sec) => sectionObserver.observe(sec));
  }

  setActiveNavLink(sectionId) {
    this.navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.style.color = 'var(--lime)';
      } else {
        link.style.color = 'var(--mist)';
      }
    });
  }
}
