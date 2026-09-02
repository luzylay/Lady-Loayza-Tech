/**
 * @file telemetry.service.js
 * @module infrastructure/telemetry.service
 * @description Servicio de infraestructura para telemetría criptográfica y Lead Scoring.
 */

import { CryptoVault } from './crypto.vault.js';
import { ConversionValueObject } from '../domain/conversion.entity.js';

const STORAGE_VAULT_KEY = 'lady_loayza_telemetry_vault';

export class TelemetryService {
  constructor() {
    this.sessionId = CryptoVault.generateSecureUUID();
    this.activeTimeMs = 0;
    this.lastTimestamp = performance.now();
    this.isTabActive = !document.hidden;
    this.conversions = [];
    this.leadScore = 0;
  }

  async initialize() {
    this.setupVisibilityTracker();
    await this.recordInitialHandshake();
  }

  setupVisibilityTracker() {
    document.addEventListener('visibilitychange', () => {
      const now = performance.now();
      if (document.hidden) {
        if (this.isTabActive) {
          this.activeTimeMs += (now - this.lastTimestamp);
        }
        this.isTabActive = false;
      } else {
        this.lastTimestamp = now;
        this.isTabActive = true;
      }
    });
  }

  async recordInitialHandshake() {
    const rawFingerprint = navigator.userAgent + navigator.language + screen.width + 'x' + screen.height;
    const clientHash = await CryptoVault.sha256(rawFingerprint);

    const initialPayload = {
      type: 'HANDSHAKE',
      sessionId: this.sessionId,
      clientHash: clientHash.substring(0, 16),
      timestamp: new Date().toISOString()
    };

    await CryptoVault.saveEncrypted(STORAGE_VAULT_KEY, {
      sessionId: this.sessionId,
      leadScore: 0,
      history: [initialPayload]
    });
  }

  getActiveTimeSeconds() {
    let total = this.activeTimeMs;
    if (this.isTabActive) {
      total += (performance.now() - this.lastTimestamp);
    }
    return Math.max(0, total / 1000);
  }

  async recordConversion(type, details = {}) {
    const conversion = new ConversionValueObject({
      type,
      sessionId: this.sessionId,
      activeSeconds: this.getActiveTimeSeconds(),
      details
    });

    this.conversions.push(conversion);
    this.leadScore += conversion.points;

    await CryptoVault.saveEncrypted(STORAGE_VAULT_KEY, {
      sessionId: this.sessionId,
      leadScore: this.leadScore,
      conversions: this.conversions
    });

    console.info(`[TelemetryService] Conversión registrada: ${type} (+${conversion.points} pts | Total Lead Score: ${this.leadScore})`);
    return conversion;
  }

  getMetricsSummary() {
    return {
      sessionId: this.sessionId,
      activeSeconds: Math.round(this.getActiveTimeSeconds()),
      totalLeadScore: this.leadScore,
      conversionsCount: this.conversions.length
    };
  }
}

export const telemetryService = new TelemetryService();
