/**
 * @file contact-panel.component.js
 * @module presentation/contact-panel.component
 * @description Componente para renderizar los canales de contacto y acciones comerciales.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';
import { ICONS } from './icons.js';

export class ContactPanelComponent {
  constructor({
    infoPanelId = 'contactInfoPanel',
    actionsPanelId = 'contactActions'
  } = {}) {
    this.infoPanelId = infoPanelId;
    this.actionsPanelId = actionsPanelId;
  }

  init() {
    this.renderInfoPanel();
    this.renderActionsPanel();
  }

  renderInfoPanel() {
    const container = document.getElementById(this.infoPanelId);
    if (!container) return;

    container.innerHTML = PORTFOLIO_CONTENT.CONTACT_CHANNELS.map((ch) => {
      const icon = ICONS[ch.iconKey] || '';
      if (ch.isLink) {
        return `
          <a href="${ch.url}" target="_blank" rel="noopener noreferrer" data-track-conversion="${ch.conversionType}" data-track-target="CONTACT_${ch.id.toUpperCase()}" class="contact-card">
            <span class="contact-card-icon">${icon}</span>
            <div>
              <div class="contact-card-label">${ch.label}</div>
              <div class="contact-card-value">${ch.value}</div>
            </div>
          </a>
        `;
      }
      return `
        <div class="contact-card">
          <span class="contact-card-icon">${icon}</span>
          <div>
            <div class="contact-card-label">${ch.label}</div>
            <div class="contact-card-value">${ch.value}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderActionsPanel() {
    const container = document.getElementById(this.actionsPanelId);
    if (!container) return;

    container.innerHTML = `
      <a href="https://cal.com/lady-loayza-incyug/30min" target="_blank" rel="noopener noreferrer" data-track-conversion="CAL_BOOKING" data-track-target="CAL_COM_BTN" class="contact-btn-primary">
        ${ICONS.calendar}
        Agendar 30 min (Cal.com)
      </a>
      <a href="https://www.linkedin.com/in/ladyloayzarodriguez/" target="_blank" rel="noopener noreferrer" data-track-conversion="REPO_VIEW" data-track-target="CONTACT_LINKEDIN_BTN" class="contact-btn-secondary">
        ${ICONS.linkedin}
        Mensaje en LinkedIn
      </a>
      <a href="./assets/docs/cv-lady-loayza-rodriguez.docx" download="CV-Lady-Loayza-Rodriguez.docx" data-track-conversion="CV_DOWNLOAD" data-track-target="CONTACT_DOCX_BTN" class="contact-btn-cv">
        Descargar CV (.docx)
      </a>
    `;
  }
}
