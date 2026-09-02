/**
 * @file conversion-tracker.component.js
 * @module presentation/conversion-tracker.component
 * @description Manejador global de eventos de interacción comercial mediante Event Delegation,
 * permitiendo registrar leads, clics a demos, descargas de CV y reservas en tiempo real.
 */

import { recordConversionUseCase } from '../use-cases/record-conversion.use-case.js';

export class ConversionTrackerComponent {
  /**
   * @param {Object} [options={}]
   * @param {string} [options.attribute='data-track-conversion'] - Atributo HTML para vincular conversiones.
   */
  constructor({ attribute = 'data-track-conversion' } = {}) {
    this.attribute = attribute;
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Registra el listener global en el documento.
   * @returns {void}
   */
  init() {
    document.addEventListener('click', this.handleClick, { passive: true });
  }

  /**
   * Manejador delegado de clics.
   * @param {MouseEvent} event
   */
  async handleClick(event) {
    try {
      const trackEl = event.target.closest(`[${this.attribute}]`);
      if (!trackEl) return;

      const conversionType = trackEl.getAttribute(this.attribute);
      if (!conversionType) return;

      const target = trackEl.getAttribute('data-track-target') || trackEl.getAttribute('href') || 'unknown';

      await recordConversionUseCase.execute(conversionType, {
        target,
        elementTag: trackEl.tagName.toLowerCase(),
        screenCoords: `${event.clientX}x${event.clientY}`
      });
    } catch (error) {
      console.warn('[ConversionTrackerComponent] Error no bloqueante al registrar telemetría:', error);
    }
  }

  /**
   * Libera el listener del DOM si es necesario (limpieza de recursos).
   */
  destroy() {
    document.removeEventListener('click', this.handleClick);
  }
}
