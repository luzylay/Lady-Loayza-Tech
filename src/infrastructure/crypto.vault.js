/**
 * @file crypto.vault.js
 * @module infrastructure/crypto.vault
 * @description Adaptador de almacenamiento criptográfico que utiliza la Web Crypto API
 * estándar (SubtleCrypto) con AES-GCM-256 y derivación de clave PBKDF2.
 */

export class CryptoVault {
  static async sha256(message) {
    try {
      if (window.crypto && window.crypto.subtle) {
        const msgUint8 = new TextEncoder().encode(message);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
        return Array.from(new Uint8Array(hashBuffer))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
      }
    } catch {
      // Fallback
    }
    // Fallback hash simple
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      hash = ((hash << 5) - hash) + message.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  static generateSecureUUID() {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
  }

  static async deriveKey(secret = 'Lady-Loayza-Tech-Secure-Core') {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode('lady-loayza-vault-salt-2026'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  static async saveEncrypted(storageKey, data) {
    try {
      const key = await this.deriveKey();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encoded = new TextEncoder().encode(JSON.stringify(data));

      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoded
      );

      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encrypted), iv.length);

      const base64 = btoa(String.fromCharCode.apply(null, Array.from(combined)));
      localStorage.setItem(storageKey, base64);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async loadDecrypted(storageKey) {
    try {
      const base64 = localStorage.getItem(storageKey);
      if (!base64) return null;

      const binary = atob(base64);
      const combined = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        combined[i] = binary.charCodeAt(i);
      }

      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);
      const key = await this.deriveKey();

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encrypted
      );

      return JSON.parse(new TextDecoder().decode(decrypted));
    } catch (error) {
      return null;
    }
  }
}
