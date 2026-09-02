/**
 * @file project-list.component.js
 * @module presentation/project-list.component
 * @description Componente de lista de proyectos reactivo a eventos del EventBus
 * con validación de seguridad de URLs y mitigación de XSS.
 */

import { globalEventBus } from '../infrastructure/event-bus.js';
import { projectRepository } from '../infrastructure/project.repository.js';

function isSafeUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch (e) {
    return false;
  }
}

export class ProjectListComponent {
  constructor({ containerId = 'projectsContainer' } = {}) {
    this.containerId = containerId;
    this.container = null;
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    // Suscripción reactiva al EventBus
    globalEventBus.subscribe('PROJECTS_FILTERED', ({ projects }) => {
      this.render(projects);
    });

    // Renderizado inicial con todos los proyectos del repositorio
    this.render(projectRepository.findAll());
  }

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
        <article class="project-card" data-category="${proj.categories.join(' ')}">
          <div class="card-media-wrapper">
            <img src="${proj.image}" alt="${proj.imageAlt}" class="card-img" loading="lazy" decoding="async" width="700" height="420" />
            <span class="card-badge-top ${badgeClass}">${proj.badge}</span>
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
