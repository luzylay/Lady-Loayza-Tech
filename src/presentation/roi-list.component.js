/**
 * @file roi-list.component.js
 * @module presentation/roi-list.component
 * @description Componente para renderizar la sección de Retorno de Inversión (ROI) y Métricas de Negocio.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';

export class RoiListComponent {
  constructor({ containerId = 'roiContainer' } = {}) {
    this.containerId = containerId;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = PORTFOLIO_CONTENT.ROI_METRICS.map((roi) => `
      <article class="roi-card">
        <div>
          <span class="roi-category">${roi.category}</span>
          <div class="roi-number">${roi.number}</div>
          <div class="roi-title">${roi.title}</div>
        </div>
        <p class="roi-desc">${roi.description}</p>
      </article>
    `).join('');
  }
}
