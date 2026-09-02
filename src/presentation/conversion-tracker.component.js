/**
 * @file conversion-tracker.component.js
 * @module presentation/conversion-tracker.component
 * @description Manejador de eventos de interacción comercial mediante Event Delegation.
 */

import { recordConversionUseCase } from '../use-cases/record-conversion.use-case.js';

export class ConversionTrackerComponent {
  constructor({ attribute = 'data-track-conversion' } = {}) {
    this.attribute = attribute;
  }

  init() {
    document.addEventListener('click', (event) => {
      const trackEl = event.target.closest(`[${this.attribute}]`);
      if (!trackEl) return;

      const conversionType = trackEl.getAttribute(this.attribute);
      const target = trackEl.getAttribute('data-track-target') || trackEl.getAttribute('href') || 'unknown';

      recordConversionUseCase.execute(conversionType, { target });
    });
  }
}
