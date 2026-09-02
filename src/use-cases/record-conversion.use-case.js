/**
 * @file record-conversion.use-case.js
 * @module use-cases/record-conversion.use-case
 * @description Caso de uso para registrar conversiones de alto impacto y telemetría de rentabilidad.
 */

import { telemetryService } from '../infrastructure/telemetry.service.js';
import { globalEventBus } from '../infrastructure/event-bus.js';

export class RecordConversionUseCase {
  constructor(service = telemetryService, eventBus = globalEventBus) {
    this.service = service;
    this.eventBus = eventBus;
  }

  /**
   * Ejecuta el registro de una conversión y despacha el evento de telemetría
   * @param {string} type Tipo de conversión
   * @param {Object} details Metadatos
   */
  async execute(type, details = {}) {
    const conversion = await this.service.recordConversion(type, details);

    this.eventBus.publish('CONVERSION_RECORDED', {
      conversion,
      metrics: this.service.getMetricsSummary()
    });

    return conversion;
  }
}

export const recordConversionUseCase = new RecordConversionUseCase();
