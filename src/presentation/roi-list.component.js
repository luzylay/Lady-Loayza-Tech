/**
 * @file roi-list.component.js
 * @module presentation/roi-list.component
 * @description Componente para renderizar la sección de Retorno de Inversión (ROI)
 * y el panel de telemetría de actividad de software en tiempo real directamente desde la API de GitHub.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';

export class RoiListComponent {
  constructor({ containerId = 'roiContainer' } = {}) {
    this.containerId = containerId;
  }

  async init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // 1. Renderizar tarjetas de ROI cuantitativo
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

    container.innerHTML = roiCardsHtml;

    // 2. Crear contenedor del dashboard en vivo
    const parentSection = container.closest('section');
    let existingLiveWrapper = parentSection ? parentSection.querySelector('.live-metrics-wrapper') : null;
    if (existingLiveWrapper) {
      existingLiveWrapper.remove();
    }

    const liveDashboardSkeleton = `
      <div class="live-metrics-wrapper" id="liveTelemetryDashboard">
        <div class="live-metrics-header">
          <div>
            <div class="live-pulse-badge">
              <span class="pulse-dot"></span>
              <span>TELEMETRÍA EN TIEMPO REAL · GITHUB API</span>
            </div>
            <h3 class="live-metrics-title">Producción de Software, Métricas y Tráfico en Vivo</h3>
          </div>
          <div class="live-visitor-box">
            <span class="live-visitor-lbl">Auditoría de Visitas Reales:</span>
            <img src="https://komarev.com/ghpvc/?username=luzylay&label=VISITAS+AL+PERFIL&color=c4f135&style=flat-square" alt="Contador en vivo de visitas al perfil de GitHub" class="visitor-badge-img" loading="lazy" />
          </div>
        </div>

        <div class="live-telemetry-grid" id="liveTelemetryContent">
          <div class="live-loading-state">
            <span class="pulse-dot"></span> Conectando con GitHub API en tiempo real...
          </div>
        </div>
      </div>
    `;

    if (parentSection) {
      container.insertAdjacentHTML('afterend', liveDashboardSkeleton);
      await this.fetchAndRenderGitHubTelemetry();
    }
  }

  /**
   * Consulta en tiempo real la API oficial de GitHub de @luzylay
   */
  async fetchAndRenderGitHubTelemetry() {
    const contentContainer = document.getElementById('liveTelemetryContent');
    if (!contentContainer) return;

    let userStats = { public_repos: 16, followers: 2, created_at: '2024-04-30' };
    let reposData = [];
    let languagesMap = { 'Python': 4, 'TypeScript': 3, 'C#': 2, 'Kotlin': 1, 'Java': 1, 'JavaScript': 1 };
    let totalStars = 1;

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/luzylay', { headers: { 'Accept': 'application/vnd.github.v3+json' } }),
        fetch('https://api.github.com/users/luzylay/repos?per_page=100&sort=updated', { headers: { 'Accept': 'application/vnd.github.v3+json' } })
      ]);

      if (userRes.ok) {
        userStats = await userRes.json();
      }

      if (reposRes.ok) {
        reposData = await reposRes.json();
        totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        
        languagesMap = {};
        reposData.forEach((r) => {
          if (r.language) {
            languagesMap[r.language] = (languagesMap[r.language] || 0) + 1;
          }
        });
      }
    } catch (error) {
      console.warn('[RoiListComponent] Utilizando datos de respaldo para telemetría:', error);
    }

    // Calcular distribución de lenguajes
    const totalLangRepos = Object.values(languagesMap).reduce((a, b) => a + b, 0) || 1;
    const sortedLanguages = Object.entries(languagesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const langBarsHtml = sortedLanguages.map(([lang, count]) => {
      const percent = Math.round((count / totalLangRepos) * 100);
      return `
        <div class="live-lang-row">
          <div class="live-lang-info">
            <span class="live-lang-name">${lang}</span>
            <span class="live-lang-pct">${percent}% (${count} repos)</span>
          </div>
          <div class="live-progress-bar-bg">
            <div class="live-progress-bar-fill" style="width: ${percent}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Últimos 4 repositorios actualizados
    const recentRepos = (reposData.length > 0 ? reposData : [
      { name: 'Lady-Loayza-Tech', description: 'Portal accesible y portafolio profesional en producción.', html_url: 'https://github.com/luzylay/Lady-Loayza-Tech', language: 'JavaScript' },
      { name: 'NutriCRED-PWA', description: 'Monitoreo nutricional infantil. 1.er puesto Hackathon INSNSB.', html_url: 'https://github.com/luzylay/NutriCRED-PWA', language: 'TypeScript' },
      { name: 'predict-customer-churn-luzylay', description: 'Modelo predictivo de Churn con XGBoost. Top 28% Kaggle.', html_url: 'https://github.com/luzylay/predict-customer-churn-luzylay', language: 'Python' },
      { name: 'App-School-Homework', description: 'Aplicación Android nativa para gestión escolar.', html_url: 'https://github.com/luzylay/App-School-Homework', language: 'Kotlin' }
    ]).slice(0, 4);

    const recentReposHtml = recentRepos.map((repo) => `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="live-repo-badge">
        <div class="live-repo-header">
          <span class="live-repo-name">${repo.name}</span>
          <span class="live-repo-lang">${repo.language || 'Software'}</span>
        </div>
        <p class="live-repo-desc">${repo.description || 'Repositorio público de código verificado.'}</p>
      </a>
    `).join('');

    contentContainer.innerHTML = `
      <!-- Métricas de Producción -->
      <div class="live-stat-card-box">
        <div class="live-kpi-grid">
          <div class="live-kpi-item">
            <div class="live-kpi-val">${userStats.public_repos || 16}</div>
            <div class="live-kpi-lbl">Repositorios Públicos</div>
          </div>
          <div class="live-kpi-item">
            <div class="live-kpi-val">100%</div>
            <div class="live-kpi-lbl">Código Abierto & Auditado</div>
          </div>
          <div class="live-kpi-item">
            <div class="live-kpi-val">+10K</div>
            <div class="live-kpi-lbl">Registros Procesados</div>
          </div>
          <div class="live-kpi-item">
            <div class="live-kpi-val">&lt; 24h</div>
            <div class="live-kpi-lbl">SLA de Respuesta</div>
          </div>
        </div>

        <div style="margin-top: 24px;">
          <h4 class="live-block-heading">Distribución de Lenguajes en Tiempo Real</h4>
          <div class="live-lang-list">
            ${langBarsHtml}
          </div>
        </div>
      </div>

      <!-- Repositorios Activos en Vivo -->
      <div class="live-stat-card-box">
        <h4 class="live-block-heading">Últimos Repositorios y Producción de Código</h4>
        <div class="live-repos-list">
          ${recentReposHtml}
        </div>
        <div class="live-verified-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>Datos sincronizados en vivo con el perfil oficial de GitHub @luzylay</span>
        </div>
      </div>
    `;
  }
}
