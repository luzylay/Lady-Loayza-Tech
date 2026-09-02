/**
 * @file about-list.component.js
 * @module presentation/about-list.component
 * @description Componente de interfaz para renderizar dinámicamente las tarjetas
 * informativas de la sección 'Sobre Mí', aplicando principios de Clean Architecture
 * y desacoplamiento con la capa de infraestructura.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';
import { ICONS } from './icons.js';

/**
 * @typedef {Object} AboutItem
 * @property {string} id - Identificador del pilar profesional.
 * @property {string} iconKey - Clave del mapa vectorial de iconos SVG.
 * @property {string} title - Título del rol o especialidad.
 * @property {string} description - Explicación didáctica y accesible para el usuario.
 */

export class AboutListComponent {
  /**
   * @param {Object} [options={}]
   * @param {string} [options.containerId='aboutContainer'] - ID del elemento DOM contenedor.
   * @param {readonly AboutItem[]} [options.items=PORTFOLIO_CONTENT.ABOUT] - Datos de inyección opcional.
   */
  constructor({ containerId = 'aboutContainer', items = PORTFOLIO_CONTENT.ABOUT } = {}) {
    this.containerId = containerId;
    this.items = items;
  }

  /**
   * Inicializa e hidrata el contenedor en el DOM con soporte accesible.
   * @returns {void}
   */
  init() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.warn(`[AboutListComponent] Contenedor DOM #${this.containerId} no encontrado.`);
      return;
    }

    if (!Array.isArray(this.items) || this.items.length === 0) {
      container.innerHTML = '<p class="section-desc">Información en actualización.</p>';
      return;
    }

    container.innerHTML = this.items.map((item) => {
      const iconSvg = ICONS[item.iconKey] || '';
      return `
        <article class="about-card" tabindex="0" aria-labelledby="about-title-${item.id}">
          <span class="about-card-icon" aria-hidden="true">${iconSvg}</span>
          <h3 id="about-title-${item.id}" class="about-card-title">${item.title}</h3>
          <p class="about-card-desc">${item.description}</p>
        </article>
      `;
    }).join('');
  }
}
