/**
 * @file tech-list.component.js
 * @module presentation/tech-list.component
 * @description Componente para renderizar la sección de Tecnologías.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';

export class TechListComponent {
  constructor({ containerId = 'techContainer' } = {}) {
    this.containerId = containerId;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = PORTFOLIO_CONTENT.TECH_STACK.map((item) => `
      <div class="tech-card">
        <div class="tech-card-category">${item.category}</div>
        <div class="tech-card-title">${item.title}</div>
        <div class="tech-card-desc">${item.description}</div>
      </div>
    `).join('');
  }
}
