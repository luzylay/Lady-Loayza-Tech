/**
 * @file about-list.component.js
 * @module presentation/about-list.component
 * @description Componente para renderizar la sección Sobre Mí.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';
import { ICONS } from './icons.js';

export class AboutListComponent {
  constructor({ containerId = 'aboutContainer' } = {}) {
    this.containerId = containerId;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = PORTFOLIO_CONTENT.ABOUT.map((item) => `
      <article class="about-card">
        <span class="about-card-icon">${ICONS[item.iconKey] || ''}</span>
        <h3 class="about-card-title">${item.title}</h3>
        <p class="about-card-desc">${item.description}</p>
      </article>
    `).join('');
  }
}
