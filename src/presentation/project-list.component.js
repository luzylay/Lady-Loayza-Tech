/**
 * @file project-list.component.js
 * @module presentation/project-list.component
 * @description Componente reactivo del catálogo de proyectos que consume el EventBus
 * y renderiza dinámicamente imágenes reales y GIFs de demostración extraídos de los READMEs de GitHub.
 */

import { globalEventBus } from '../infrastructure/event-bus.js';
import { projectRepository } from '../infrastructure/project.repository.js';
import { readmeMediaService } from '../infrastructure/readme-media.service.js';

function isSafeUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export class ProjectListComponent {
  /**
   * @param {Object} [options={}]
   * @param {string} [options.containerId='projectsContainer']
   */
  constructor({ containerId = 'projectsContainer' } = {}) {
    this.containerId = containerId;
    this.container = null;
    this.handleMediaLoaded = this.handleMediaLoaded.bind(this);
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    // 1. Suscripción reactiva al EventBus para filtrado de proyectos
    globalEventBus.subscribe('PROJECTS_FILTERED', ({ projects }) => {
      this.render(projects);
    });

    // 2. Suscripción a eventos de medios extraídos de los READMEs en tiempo real
    globalEventBus.subscribe('PROJECT_MEDIA_LOADED', this.handleMediaLoaded);

    // 3. Renderizado inicial con todos los proyectos del repositorio
    const allProjects = projectRepository.findAll();
    this.render(allProjects);

    // 4. Escaneo asíncrono y progresivo en segundo plano de todos los READMEs
    readmeMediaService.enhanceAllProjects(allProjects);
  }

  /**
   * Manejador de evento cuando se descubre y precarga una imagen o GIF desde el README.
   * @param {{ projectId: string, mediaUrl: string, isGif: boolean }} payload
   */
  handleMediaLoaded({ projectId, mediaUrl, isGif }) {
    if (!mediaUrl) return;

    const imgEl = document.getElementById(`project-img-${projectId}`);
    const mediaWrapper = document.getElementById(`media-wrapper-${projectId}`);

    if (imgEl && imgEl.src !== mediaUrl) {
      imgEl.classList.add('fade-updating');
      setTimeout(() => {
        imgEl.src = mediaUrl;
        imgEl.classList.add('has-readme-media');
        imgEl.classList.remove('fade-updating');
      }, 150);
    }

    if (mediaWrapper && !mediaWrapper.querySelector('.badge-readme-live')) {
      const badgeLabel = isGif ? 'GIF DEMO' : 'README PREVIEW';
      const liveBadge = document.createElement('span');
      liveBadge.className = 'badge-readme-live';
      liveBadge.innerHTML = `<span class="pulse-dot"></span> ${badgeLabel}`;
      mediaWrapper.appendChild(liveBadge);
    }
  }

  /**
   * Renderiza el catálogo de proyectos en el DOM.
   * @param {readonly import('../domain/project.entity.js').ProjectEntity[]} projects
   */
  render(projects) {
    if (!this.container) return;

    if (!projects || projects.length === 0) {
      this.container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--mist); font-family: var(--font-mono); font-size: 0.85rem;">
          No se encontraron proyectos en esta categoría.
        </div>
      `;
      return;
    }

    this.container.innerHTML = projects.map((proj) => {
      const badgeClass = proj.badgeType === 'lime' ? 'badge-lime-border' : 'badge-snow';
      const techTags = proj.techStack.map((t) => `<span class="tag-badge-item">${t}</span>`).join('');

      // Verificar si ya existe media en caché para el proyecto
      const coords = readmeMediaService.parseRepoCoordinates(proj.repoUrl);
      const cached = coords ? readmeMediaService.getCachedMedia(`lady_loayza_readme_media_v1_${coords.owner}_${coords.repo}`) : null;
      const initialImage = (cached && cached.mediaUrl) ? cached.mediaUrl : proj.image;
      const isCustomMedia = cached && cached.mediaUrl;
      const isGif = cached && cached.isGif;

      let liveBadgeHtml = '';
      if (isCustomMedia) {
        const badgeLabel = isGif ? 'GIF DEMO' : 'README PREVIEW';
        liveBadgeHtml = `<span class="badge-readme-live"><span class="pulse-dot"></span> ${badgeLabel}</span>`;
      }

      let actionButtons = '';
      if (proj.liveUrl && isSafeUrl(proj.liveUrl)) {
        actionButtons += `
          <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" data-track-conversion="DEMO_VIEW" data-track-target="${proj.id.toUpperCase()}_LIVE" class="card-btn-primary">${proj.liveLabel}</a>
        `;
      }
      if (proj.repoUrl && isSafeUrl(proj.repoUrl)) {
        const buttonClass = proj.liveUrl ? 'card-btn-secondary' : 'card-btn-primary';
        const buttonLabel = proj.liveUrl ? 'GitHub ↗' : 'Ver repositorio ↗';
        actionButtons += `
          <a href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer" data-track-conversion="REPO_VIEW" data-track-target="${proj.id.toUpperCase()}_REPO" class="${buttonClass}">${buttonLabel}</a>
        `;
      }

      return `
        <article class="project-card" data-category="${proj.categories.join(' ')}" data-project-id="${proj.id}">
          <div class="card-media-wrapper" id="media-wrapper-${proj.id}">
            <img id="project-img-${proj.id}" src="${initialImage}" alt="${proj.imageAlt}" class="card-img ${isCustomMedia ? 'has-readme-media' : ''}" loading="lazy" decoding="async" width="700" height="420" />
            <span class="card-badge-top ${badgeClass}">${proj.badge}</span>
            ${liveBadgeHtml}
          </div>
          <div class="card-body">
            <div>
              <span class="card-subtitle">${proj.categoryTag}</span>
              <h3 class="card-title">${proj.title}</h3>
            </div>
            <p class="card-desc">${proj.description}</p>
            <div class="tag-badge-row">
              ${techTags}
            </div>
            <div class="card-actions-row">
              ${actionButtons}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}
