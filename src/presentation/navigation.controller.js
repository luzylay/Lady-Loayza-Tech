/**
 * @file navigation.controller.js
 * @module presentation/navigation.controller
 * @description Controlador de navegación, menú móvil y accesibilidad WCAG por teclado.
 */

export class NavigationController {
  constructor({
    burgerBtnId = 'burgerBtn',
    drawerId = 'mobileDrawer',
    headerId = 'siteHeader'
  } = {}) {
    this.burgerBtn = document.getElementById(burgerBtnId);
    this.drawer = document.getElementById(drawerId);
    this.header = document.getElementById(headerId);
  }

  init() {
    if (this.burgerBtn && this.drawer) {
      this.burgerBtn.addEventListener('click', () => this.toggleDrawer());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isDrawerOpen()) {
          this.closeDrawer();
        }
      });
    }

    // Exponer globalmente para enlaces internos en el HTML
    window.closeDrawer = () => this.closeDrawer();

    if (this.header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          this.header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.7)';
        } else {
          this.header.style.boxShadow = 'none';
        }
      }, { passive: true });
    }
  }

  isDrawerOpen() {
    return this.drawer && this.drawer.style.display === 'flex';
  }

  toggleDrawer() {
    if (this.isDrawerOpen()) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    if (this.drawer) {
      this.drawer.style.display = 'flex';
      if (this.burgerBtn) {
        this.burgerBtn.setAttribute('aria-expanded', 'true');
      }
    }
  }

  closeDrawer() {
    if (this.drawer) {
      this.drawer.style.display = 'none';
      if (this.burgerBtn) {
        this.burgerBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }
}
