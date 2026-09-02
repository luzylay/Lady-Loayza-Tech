/**
 * @file roi-list.component.js
 * @module presentation/roi-list.component
 * @description Componente para renderizar la sección de Retorno de Inversión (ROI),
 * métricas de negocio y el panel de telemetría de actividad en tiempo real de GitHub.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';

export class RoiListComponent {
  constructor({ containerId = 'roiContainer' } = {}) {
    this.containerId = containerId;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const roiCardsHtml = PORTFOLIO_CONTENT.ROI_METRICS.map((roi) => `
      <article class="roi-card">
        <div>
          <span class="roi-category">${roi.category}</span>
          <div class="roi-number">${roi.number}</div>
          <div class="roi-title">${roi.title}</div>
        </div>
        <p class="roi-desc">${roi.description}</p>
      </article>
    `).join('');

    const liveDashboardHtml = `
      <div class="live-metrics-wrapper">
        <div class="live-metrics-header">
          <div>
            <div class="live-pulse-badge">
              <span class="pulse-dot"></span>
              <span>TELEMETRÍA EN TIEMPO REAL · GITHUB & ANALYTICS</span>
            </div>
            <h3 class="live-metrics-title">Producción de Código, Contribuciones y Tráfico en Vivo</h3>
          </div>
          <div class="live-visitor-box">
            <span class="live-visitor-lbl">Conteo Real de Visitas:</span>
            <img src="https://komarev.com/ghpvc/?username=luzylay&label=VISITAS+TOTALES&color=c4f135&style=flat-square" alt="Contador en vivo de visitas al perfil de GitHub" class="visitor-badge-img" loading="lazy" />
          </div>
        </div>

        <div class="live-stats-grid">
          <div class="live-stat-card">
            <img src="https://github-readme-stats.vercel.app/api?username=luzylay&show_icons=true&theme=tokyonight&bg_color=15151c&title_color=c4f135&text_color=9898a6&icon_color=c4f135&border_color=272733&hide_border=false" alt="Estadísticas de GitHub en tiempo real de Lady Loayza" class="live-stat-svg" loading="lazy" />
          </div>
          <div class="live-stat-card">
            <img src="https://github-readme-streak-stats.herokuapp.com/?user=luzylay&theme=dark&background=15151c&ring=c4f135&fire=c4f135&currStreakNum=f2f2f5&sideNums=9898a6&sideLabels=9898a6&dates=9898a6&border=272733" alt="Racha de contribuciones continuas en GitHub" class="live-stat-svg" loading="lazy" />
          </div>
          <div class="live-stat-card">
            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=luzylay&layout=compact&theme=tokyonight&bg_color=15151c&title_color=c4f135&text_color=9898a6&border_color=272733" alt="Lenguajes de programación más utilizados en tiempo real" class="live-stat-svg" loading="lazy" />
          </div>
        </div>
      </div>
    `;

    container.innerHTML = roiCardsHtml;

    // Inyectar el panel de métricas en tiempo real después de la cuadrícula de ROI
    const parentSection = container.closest('section');
    let existingLiveWrapper = parentSection ? parentSection.querySelector('.live-metrics-wrapper') : null;
    if (existingLiveWrapper) {
      existingLiveWrapper.remove();
    }

    if (parentSection) {
      container.insertAdjacentHTML('afterend', liveDashboardHtml);
    }
  }
}
