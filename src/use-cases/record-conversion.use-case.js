/**
 * @file record-conversion.use-case.js
 * @module use-cases/record-conversion.use-case
 * @description Caso de uso que procesa y almacena conversiones comerciales, calculando
 * el Lead Scoring en tiempo real mediante criptografía en cliente y emitiendo eventos reactivos.
 */

import { telemetryService } from '../infrastructure/telemetry.service.js';
import { globalEventBus } from '../infrastructure/event-bus.js';

export class RecordConversionUseCase {
  /**
   * @param {import('../infrastructure/telemetry.service.js').TelemetryService} [service=telemetryService]
   * @param {import('../infrastructure/event-bus.js').EventBus} [eventBus=globalEventBus]
   */
  constructor(service = telemetryService, eventBus = globalEventBus) {
    this.service = service;
    this.eventBus = eventBus;
  }

  /**
   * Ejecuta el registro de una conversión comercial de forma no bloqueante.
   * @param {string} type - Tipo de conversión ('CAL_BOOKING' | 'LINKEDIN_CONNECT' | 'CV_DOWNLOAD' | 'DEMO_VIEW' | 'REPO_VIEW').
   * @param {Record<string, any>} [details={}] - Metadatos contextuales (ej. target, origen del clic).
   * @returns {Promise<import('../domain/conversion.entity.js').ConversionValueObject|null>}
   */
  async execute(type, details = {}) {
    if (!type || typeof type !== 'string') {
      console.warn('[RecordConversionUseCase] Tipo de conversión inválido:', type);
      return null;
    }

    try {
      const conversion = await this.service.recordConversion(type, details);

      this.eventBus.publish('CONVERSION_RECORDED', {
        conversion,
        metrics: this.service.getMetricsSummary(),
        timestamp: new Date().toISOString()
      });

      return conversion;
    } catch (error) {
      console.warn('[RecordConversionUseCase] Fallo en servicio de telemetría:', error);
      return null;
    }
  }
}

// Exportación Singleton del caso de uso
export const recordConversionUseCase = new RecordConversionUseCase();
