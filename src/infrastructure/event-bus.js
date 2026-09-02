/**
 * @file event-bus.js
 * @module infrastructure/event-bus
 * @description Implementación del patrón Observer / Event Bus para comunicación
 * asíncrona y desacoplada entre capas de presentación, casos de uso e infraestructura.
 */

export class EventBus {
  constructor() {
    this.handlers = new Map();
  }

  /**
   * Suscribe una función observadora a un evento específico
   * @param {string} eventName
   * @param {Function} callback
   * @returns {Function} Función para cancelar la suscripción
   */
  subscribe(eventName, callback) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set());
    }
    this.handlers.get(eventName).add(callback);

    return () => {
      const callbacks = this.handlers.get(eventName);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.handlers.delete(eventName);
        }
      }
    };
  }

  /**
   * Publica un evento hacia todos los suscriptores registrados
   * @param {string} eventName
   * @param {*} payload
   */
  publish(eventName, payload) {
    const callbacks = this.handlers.get(eventName);
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(payload);
        } catch (error) {
          console.error(`[EventBus] Error en observador del evento '${eventName}':`, error);
        }
      });
    }
  }
}

// Singleton export
export const globalEventBus = new EventBus();
