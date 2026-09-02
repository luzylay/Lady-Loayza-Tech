/**
 * @file filter-bar.component.js
 * @module presentation/filter-bar.component
 * @description Componente de la barra de filtros que dispara el caso de uso FilterProjectsUseCase.
 */

import { filterProjectsUseCase } from '../use-cases/filter-projects.use-case.js';

export class FilterBarComponent {
  constructor({ buttonsSelector = '.filter-pill-btn' } = {}) {
    this.buttonsSelector = buttonsSelector;
    this.buttons = [];
  }

  init() {
    this.buttons = document.querySelectorAll(this.buttonsSelector);
    this.buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.getAttribute('data-filter') || 'all';
        this.setActiveButton(e.currentTarget);
        filterProjectsUseCase.execute(category);
      });
    });
  }

  setActiveButton(activeBtn) {
    this.buttons.forEach((btn) => {
      btn.style.background = 'transparent';
      btn.style.color = 'var(--mist)';
      btn.style.borderColor = 'var(--border)';
      btn.style.fontWeight = '500';
    });

    if (activeBtn) {
      activeBtn.style.background = 'var(--lime)';
      activeBtn.style.color = 'var(--ink)';
      activeBtn.style.borderColor = 'var(--lime)';
      activeBtn.style.fontWeight = '700';
    }
  }
}
