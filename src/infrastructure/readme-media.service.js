/**
 * @file readme-media.service.js
 * @module infrastructure/readme-media.service
 * @description Servicio de infraestructura encargado de escanear y extraer de forma
 * dinámica y progresiva las capturas de pantalla, diagramas y GIFs de demostración reales
 * desde los archivos README de cada repositorio de GitHub, sustituyendo las imágenes estáticas.
 */

import { globalEventBus } from './event-bus.js';

const CACHE_KEY_PREFIX = 'lady_loayza_readme_media_v1_';
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 horas

export class ReadmeMediaService {
  constructor(eventBus = globalEventBus) {
    this.eventBus = eventBus;
    this.inFlightRequests = new Map();
  }

  /**
   * Extrae el propietario y nombre del repositorio desde una URL de GitHub.
   * @param {string} repoUrl
   * @returns {{ owner: string, repo: string } | null}
   */
  parseRepoCoordinates(repoUrl) {
    if (!repoUrl || typeof repoUrl !== 'string') return null;
    try {
      const parsed = new URL(repoUrl);
      if (!parsed.hostname.includes('github.com')) return null;
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return { owner: parts[0], repo: parts[1] };
      }
    } catch {
      // Ignorar URLs inválidas
    }
    return null;
  }

  /**
   * Obtiene la media extraída de la caché local si aún está vigente.
   * @param {string} cacheKey
   * @returns {{ mediaUrl: string, isGif: boolean, alt?: string } | null}
   */
  getCachedMedia(cacheKey) {
    try {
      const raw = localStorage.getItem(cacheKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.data;
      }
      localStorage.removeItem(cacheKey);
    } catch {
      // Fallback silencioso ante cuotas de almacenamiento
    }
    return null;
  }

  /**
   * Guarda el resultado en caché.
   * @param {string} cacheKey
   * @param {Object} data
   */
  setCachedMedia(cacheKey, data) {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch {
      // Ignorar excepciones de cuota en modo incógnito
    }
  }

  /**
   * Pre-carga una imagen para validar que no esté rota antes de inyectarla.
   * @param {string} url
   * @returns {Promise<boolean>}
   */
  preloadImage(url) {
    return new Promise((resolve) => {
      if (!url) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  /**
   * Obtiene el contenido del README mediante GitHub API o raw.githubusercontent.com
   * @param {string} owner
   * @param {string} repo
   * @returns {Promise<{ content: string, branch: string } | null>}
   */
  async fetchReadmeContent(owner, repo) {
    // 1. Intento primario vía GitHub REST API
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      });
      if (res.ok) {
        const json = await res.json();
        let content = '';
        if (json.content && json.encoding === 'base64') {
          // Decodificación universal de Base64 compatible con UTF-8
          const binary = atob(json.content.replace(/\s/g, ''));
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          content = new TextDecoder().decode(bytes);
        }
        const branch = json.default_branch || (json.download_url ? json.download_url.split('/')[5] : 'main');
        return { content, branch: branch || 'main' };
      }
    } catch {
      // Continuar con fallback directo
    }

    // 2. Intento de respaldo vía raw.githubusercontent.com en ramas principales
    for (const branch of ['main', 'master']) {
      try {
        const rawRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`);
        if (rawRes.ok) {
          const content = await rawRes.text();
          return { content, branch };
        }
      } catch {
        // Continuar siguiente rama
      }
    }

    return null;
  }

  /**
   * Analiza y extrae las mejores imágenes o GIFs de demostración de un README.
   * @param {string} markdownContent
   * @param {string} owner
   * @param {string} repo
   * @param {string} branch
   * @returns {string[]} Lista ordenada de URLs candidatas
   */
  extractCandidateImages(markdownContent, owner, repo, branch) {
    const candidates = [];
    const rawBranchUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;

    // Regex para Markdown ![alt](url) y etiquetas HTML <img src="url">
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)|<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;

    while ((match = imgRegex.exec(markdownContent)) !== null) {
      let src = (match[2] || match[3] || '').trim();
      if (!src) continue;

      // Limpiar parámetros de título o tamaño en markdown (ej. ![alt](url "title"))
      src = src.split(/\s+/)[0];

      // Ignorar badges y firmas no visuales
      const isBadge = (
        src.includes('img.shields.io') ||
        src.includes('badge.svg') ||
        src.includes('badges') ||
        src.includes('komarev.com') ||
        src.includes('actions/workflows') ||
        src.includes('sonarcloud.io') ||
        src.endsWith('.svg')
      );

      if (isBadge) continue;

      // Normalizar URLs relativas
      let resolvedUrl = src;
      if (src.startsWith('http://') || src.startsWith('https://')) {
        // Si es enlace a blob de github, convertir a raw
        if (src.includes('github.com') && src.includes('/blob/')) {
          resolvedUrl = src.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }
      } else {
        const cleanPath = src.replace(/^\.?\//, '');
        resolvedUrl = `${rawBranchUrl}${cleanPath}`;
      }

      candidates.push(resolvedUrl);
    }

    // Priorizar GIFs sobre imágenes estáticas (los GIFs suelen ser demos animadas de producto)
    candidates.sort((a, b) => {
      const aIsGif = a.toLowerCase().includes('.gif');
      const bIsGif = b.toLowerCase().includes('.gif');
      if (aIsGif && !bIsGif) return -1;
      if (!aIsGif && bIsGif) return 1;
      return 0;
    });

    return candidates;
  }

  /**
   * Extrae la media real para un proyecto y la notifica al sistema.
   * @param {Object} project - Instancia de ProjectEntity o DTO de proyecto.
   * @returns {Promise<{ mediaUrl: string, isGif: boolean } | null>}
   */
  async extractMediaForProject(project) {
    if (!project || !project.repoUrl) return null;

    const coords = this.parseRepoCoordinates(project.repoUrl);
    if (!coords || coords.repo === 'luzylay') return null;

    const cacheKey = `${CACHE_KEY_PREFIX}${coords.owner}_${coords.repo}`;
    const cached = this.getCachedMedia(cacheKey);
    if (cached) {
      if (cached.mediaUrl) {
        this.eventBus.publish('PROJECT_MEDIA_LOADED', {
          projectId: project.id,
          mediaUrl: cached.mediaUrl,
          isGif: cached.isGif
        });
      }
      return cached;
    }

    // Evitar solicitudes duplicadas simultáneas
    if (this.inFlightRequests.has(cacheKey)) {
      return this.inFlightRequests.get(cacheKey);
    }

    const requestPromise = (async () => {
      try {
        const readmeData = await this.fetchReadmeContent(coords.owner, coords.repo);
        if (!readmeData || !readmeData.content) {
          this.setCachedMedia(cacheKey, { mediaUrl: null, isGif: false });
          return null;
        }

        const candidates = this.extractCandidateImages(
          readmeData.content,
          coords.owner,
          coords.repo,
          readmeData.branch
        );

        for (const candidateUrl of candidates) {
          const isValid = await this.preloadImage(candidateUrl);
          if (isValid) {
            const isGif = candidateUrl.toLowerCase().includes('.gif');
            const result = { mediaUrl: candidateUrl, isGif };
            this.setCachedMedia(cacheKey, result);

            this.eventBus.publish('PROJECT_MEDIA_LOADED', {
              projectId: project.id,
              mediaUrl: candidateUrl,
              isGif
            });

            return result;
          }
        }

        this.setCachedMedia(cacheKey, { mediaUrl: null, isGif: false });
        return null;
      } catch (err) {
        console.warn(`[ReadmeMediaService] No se pudo extraer media para ${coords.repo}:`, err);
        return null;
      } finally {
        this.inFlightRequests.delete(cacheKey);
      }
    })();

    this.inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  /**
   * Procesa en paralelo no bloqueante todos los proyectos provistos.
   * @param {readonly import('../domain/project.entity.js').ProjectEntity[]} projects
   */
  async enhanceAllProjects(projects) {
    if (!Array.isArray(projects)) return;
    // Ejecutar con control de concurrencia ligera
    const promises = projects.map((p) => this.extractMediaForProject(p));
    await Promise.allSettled(promises);
  }
}

// Exportación Singleton
export const readmeMediaService = new ReadmeMediaService();
