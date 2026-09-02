/**
 * @file tech-list.component.js
 * @module presentation/tech-list.component
 * @description Componente para renderizar la sección de Tecnologías y Stack Técnico,
 * presentando las competencias de desarrollo frontend, datos, IA y cloud.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';

/**
 * @typedef {Object} TechStackItem
 * @property {string} category - Categoría del stack (ej. Frontend, Data, Cloud).
 * @property {string} title - Tecnologías y frameworks principales.
 * @property {string} description - Casos de uso y estándares técnicos aplicados.
 */

export class TechListComponent {
  /**
   * @param {Object} [options={}]
   * @param {string} [options.containerId='techContainer'] - ID del contenedor en el DOM.
   * @param {readonly TechStackItem[]} [options.items=PORTFOLIO_CONTENT.TECH_STACK] - Stack a renderizar.
   */
  constructor({ containerId = 'techContainer', items = PORTFOLIO_CONTENT.TECH_STACK } = {}) {
    this.containerId = containerId;
    this.items = items;
  }

  /**
   * Renderiza las tarjetas del stack tecnológico en el contenedor destino.
   * @returns {void}
   */
  init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.warn(`[TechListComponent] Contenedor DOM #${this.containerId} no encontrado.`);
      return;
    }

    if (!Array.isArray(this.items) || this.items.length === 0) {
      container.innerHTML = '<p class="section-desc">Stack tecnológico en actualización.</p>';
      return;
    }

    container.innerHTML = this.items.map((item) => `
      <article class="tech-card" tabindex="0">
        <header class="tech-card-category">${item.category}</header>
        <h3 class="tech-card-title">${item.title}</h3>
        <p class="tech-card-desc">${item.description}</p>
      </article>
    `).join('');
  }
}
