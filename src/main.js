/**
 * @file main.js
 * @description Composition Root (Punto de Composición de Dependencias).
 * Orquesta las capas de Clean Architecture: Dominio, Infraestructura, Casos de Uso y Presentación.
 */

import { NavigationController } from './presentation/navigation.controller.js';
import { ScrollSpyController } from './presentation/scroll-spy.controller.js';
import { AboutListComponent } from './presentation/about-list.component.js';
import { ExperienceListComponent } from './presentation/experience-list.component.js';
import { ProjectListComponent } from './presentation/project-list.component.js';
import { FilterBarComponent } from './presentation/filter-bar.component.js';
import { TechListComponent } from './presentation/tech-list.component.js';
import { RoiListComponent } from './presentation/roi-list.component.js';
import { ContactPanelComponent } from './presentation/contact-panel.component.js';
import { LinkedInCarouselComponent } from './presentation/linkedin-carousel.component.js';
import { ConversionTrackerComponent } from './presentation/conversion-tracker.component.js';
import { telemetryService } from './infrastructure/telemetry.service.js';
import { globalEventBus } from './infrastructure/event-bus.js';
import { projectRepository } from './infrastructure/project.repository.js';
import { PORTFOLIO_CONTENT } from './infrastructure/portfolio-content.repository.js';
import { readmeMediaService } from './infrastructure/readme-media.service.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Hidratación síncrona inmediata de la UI (Data-Driven UI)
  try { new AboutListComponent({ containerId: 'aboutContainer' }).init(); } catch (e) { console.warn(e); }
  try { new ExperienceListComponent({ containerId: 'experienceContainer' }).init(); } catch (e) { console.warn(e); }
  try { new TechListComponent({ containerId: 'techContainer' }).init(); } catch (e) { console.warn(e); }
  try { new RoiListComponent({ containerId: 'roiContainer' }).init(); } catch (e) { console.warn(e); }
  try { new LinkedInCarouselComponent({ containerId: 'linkedinCarouselContainer' }).init(); } catch (e) { console.warn(e); }
  try { new ContactPanelComponent({ infoPanelId: 'contactInfoPanel', actionsPanelId: 'contactActions' }).init(); } catch (e) { console.warn(e); }

  // 2. Inicialización del Catálogo Reactivo de Proyectos con Media dinámica de GitHub
  try {
    new ProjectListComponent({ containerId: 'projectsContainer' }).init();
    new FilterBarComponent({ buttonsSelector: '.filter-pill-btn' }).init();
  } catch (e) { console.warn(e); }

  // 3. Controladores de Navegación, Accesibilidad y Telemetría
  try {
    new NavigationController().init();
    new ScrollSpyController().init();
    new ConversionTrackerComponent().init();
  } catch (e) { console.warn(e); }

  // 4. Inicialización asíncrona de la capa de Infraestructura & Telemetría
  try {
    await telemetryService.initialize();
  } catch (e) {
    console.warn('[TelemetryService] Modo no crítico:', e);
  }

  // 5. Exposición segura del contenedor de dependencias
  window.__APP_CORE__ = Object.freeze({
    eventBus: globalEventBus,
    projectRepository,
    portfolioContent: PORTFOLIO_CONTENT,
    telemetry: telemetryService,
    readmeMedia: readmeMediaService
  });

  // 6. Registro de Service Worker para PWA y control de caché en cliente
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.info('[PWA] Nueva versión disponible. Actualizando recursos...');
            }
          });
        }
      });
    } catch (swErr) {
      console.warn('[PWA] Service Worker no registrado (modo estándar):', swErr);
    }
  }

  console.info('[Lady-Loayza-Tech] Clean Architecture & Componentes Data-Driven inicializados.');
});

