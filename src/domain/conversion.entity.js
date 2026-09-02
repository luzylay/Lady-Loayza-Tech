/**
 * @file conversion.entity.js
 * @module domain/conversion.entity
 * @description Value Object inmutable para modelar eventos de conversión comercial y Lead Scoring.
 */

export class ConversionValueObject {
  /**
   * Ponderación algorítmica de valor comercial (Lead Scoring)
   */
  static SCORE_MATRIX = Object.freeze({
    'CAL_BOOKING': 50,      // Prospecto de alto valor (Reunión técnica directa)
    'LINKEDIN_CONNECT': 40, // Contacto directo vía LinkedIn
    'CV_DOWNLOAD': 30,      // Descarga de currículum
    'DEMO_VIEW': 20,        // Interacción con producto en producción
    'REPO_VIEW': 10         // Auditoría técnica de código en GitHub
  });

  /**
   * @param {Object} props
   * @param {string} props.type Tipo de conversión
   * @param {string} props.sessionId Identificador criptográfico de sesión
   * @param {number} props.activeSeconds Tiempo activo en la página
   * @param {Object} [props.details={}] Metadatos contextuales
   */
  constructor({ type, sessionId, activeSeconds, details = {} }) {
    if (!type || !sessionId) {
      throw new Error('[ConversionValueObject] Tipo y sessionId son obligatorios.');
    }

    this.type = Object.freeze(type);
    this.sessionId = Object.freeze(sessionId);
    this.points = Object.freeze(ConversionValueObject.SCORE_MATRIX[type] || 5);
    this.activeSeconds = Object.freeze(Math.round(activeSeconds || 0));
    this.details = Object.freeze({ ...details });
    this.timestamp = Object.freeze(new Date().toISOString());

    Object.freeze(this);
  }
}
