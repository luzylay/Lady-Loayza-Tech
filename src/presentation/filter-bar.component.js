/**
 * @file filter-bar.component.js
 * @module presentation/filter-bar.component
 * @description Componente de barra de filtros interactiva con soporte completo
 * de accesibilidad por teclado (WCAG 2.1) y despacho reactivo de casos de uso.
 */

import { filterProjectsUseCase } from '../use-cases/filter-projects.use-case.js';

export class FilterBarComponent {
  /**
   * @param {Object} [options={}]
   * @param {string} [options.buttonsSelector='.filter-pill-btn'] - Selector CSS de los botones de filtro.
   */
  constructor({ buttonsSelector = '.filter-pill-btn' } = {}) {
    this.buttonsSelector = buttonsSelector;
    /** @type {HTMLElement[]} */
    this.buttons = [];
  }

  /**
   * Inicializa los listeners y atributos de accesibilidad ARIA.
   * @returns {void}
   */
  init() {
    this.buttons = Array.from(document.querySelectorAll(this.buttonsSelector));
    if (this.buttons.length === 0) return;

    this.buttons.forEach((btn, index) => {
      // Configurar accesibilidad inicial
      const isInitiallyActive = btn.getAttribute('data-filter') === 'all';
      btn.setAttribute('aria-pressed', isInitiallyActive ? 'true' : 'false');
      btn.setAttribute('tabindex', '0');

      // Click
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.getAttribute('data-filter') || 'all';
        this.setActiveButton(e.currentTarget);
        filterProjectsUseCase.execute(category);
      });

      // Navegación por teclado (Flechas Izquierda / Derecha)
      btn.addEventListener('keydown', (e) => {
        let targetIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIndex = (index + 1) % this.buttons.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIndex = (index - 1 + this.buttons.length) % this.buttons.length;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          this.buttons[targetIndex].focus();
          this.buttons[targetIndex].click();
        }
      });
    });
  }

  /**
   * Actualiza el estado visual y semántico del botón activo.
   * @param {HTMLElement} activeBtn - Botón seleccionado.
   */
  setActiveButton(activeBtn) {
    this.buttons.forEach((btn) => {
      btn.style.background = 'transparent';
      btn.style.color = 'var(--mist)';
      btn.style.borderColor = 'var(--border)';
      btn.style.fontWeight = '500';
      btn.setAttribute('aria-pressed', 'false');
    });

    if (activeBtn) {
      activeBtn.style.background = 'var(--lime)';
      activeBtn.style.color = 'var(--ink)';
      activeBtn.style.borderColor = 'var(--lime)';
      activeBtn.style.fontWeight = '700';
      activeBtn.setAttribute('aria-pressed', 'true');
    }
  }
}
