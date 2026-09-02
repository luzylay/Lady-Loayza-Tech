/**
 * @file experience-list.component.js
 * @module presentation/experience-list.component
 * @description Componente para renderizar la sección Experiencia Profesional.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';

export class ExperienceListComponent {
  constructor({ containerId = 'experienceContainer' } = {}) {
    this.containerId = containerId;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = PORTFOLIO_CONTENT.EXPERIENCE.map((exp) => {
      const tagsHtml = exp.tags.map((t) => `<span class="tag-badge-item">${t}</span>`).join('');
      return `
        <div class="exp-row-wrap">
          <div class="exp-row">
            <div>
              <span class="exp-index">${exp.index}</span>
              <div class="exp-period-col">${exp.period}</div>
            </div>
            <div>
              <h3 class="exp-role">${exp.role}</h3>
              <div class="exp-company">${exp.company}</div>
              <div class="exp-period-inline">${exp.period}</div>
              <p class="exp-summary">${exp.summary}</p>
              <div class="tag-badge-row">
                ${tagsHtml}
              </div>
            </div>
            <div class="exp-period-col-right">${exp.period}</div>
          </div>
        </div>
      `;
    }).join('');
  }
}
