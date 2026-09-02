/**
 * @file scroll-spy.controller.js
 * @module presentation/scroll-spy.controller
 * @description Controlador de observador de scroll para sincronizar automáticamente
 * el estado activo de los enlaces de navegación según la posición visible del usuario.
 */

export class ScrollSpyController {
  /**
   * @param {Object} [options={}]
   * @param {string} [options.sectionsSelector='section[id]'] - Selector de secciones monitoreadas.
   * @param {string} [options.navLinksSelector='.nav-links a, .mobile-drawer a'] - Selector de enlaces.
   */
  constructor({
    sectionsSelector = 'section[id]',
    navLinksSelector = '.nav-links a, .mobile-drawer a'
  } = {}) {
    this.sectionsSelector = sectionsSelector;
    this.navLinksSelector = navLinksSelector;
    this.sections = [];
    this.navLinks = [];
    this.observer = null;
  }

  /**
   * Inicializa el IntersectionObserver sobre las secciones.
   * @returns {void}
   */
  init() {
    this.sections = Array.from(document.querySelectorAll(this.sectionsSelector));
    this.navLinks = Array.from(document.querySelectorAll(this.navLinksSelector));

    if (this.sections.length === 0 || this.navLinks.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      this.initScrollFallback();
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            this.setActiveNavLink(sectionId);
          }
        }
      });
    }, observerOptions);

    this.sections.forEach((sec) => this.observer.observe(sec));
  }

  /**
   * Fallback de desplazamiento suave para navegadores antiguos.
   */
  initScrollFallback() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      for (const section of this.sections) {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          const sectionId = section.getAttribute('id');
          if (sectionId) this.setActiveNavLink(sectionId);
          break;
        }
      }
    }, { passive: true });
  }

  /**
   * Marca el enlace activo y desmarca los inactivos.
   * @param {string} sectionId - ID de la sección actualmente visible.
   */
  setActiveNavLink(sectionId) {
    this.navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.style.color = 'var(--lime)';
        link.setAttribute('aria-current', 'page');
      } else if (href && href.startsWith('#')) {
        link.style.color = 'var(--mist)';
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Desconecta el observador para evitar fugas de memoria en SPA.
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
