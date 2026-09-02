/**
 * @file linkedin-carousel.component.js
 * @module presentation/linkedin-carousel.component
 * @description Componente de carrusel resiliente para posts de LinkedIn.
 * Integra triple capa de activación:
 * 1. Listeners de eventos addEventListener.
 * 2. Puente global window.__LINKEDIN_CAROUSEL__ para ejecución directa.
 * 3. Navegación compatible con CSS Scroll-Snap y fallback síncrono.
 */

import { PORTFOLIO_CONTENT } from '../infrastructure/portfolio-content.repository.js';

export class LinkedInCarouselComponent {
  /**
   * @param {Object} [options={}]
   * @param {string} [options.containerId='linkedinCarouselContainer']
   * @param {readonly Object[]} [options.posts=PORTFOLIO_CONTENT.LINKEDIN_POSTS]
   */
  constructor({
    containerId = 'linkedinCarouselContainer',
    posts = PORTFOLIO_CONTENT.LINKEDIN_POSTS
  } = {}) {
    this.containerId = containerId;
    this.posts = posts || [];
    this.currentIndex = 0;
    this.track = null;
    this.dots = [];
    this.counterEl = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.scrollTimeout = null;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container || this.posts.length === 0) return;

    // Exponer inmediatamente al ámbito global para handlers inline
    window.__LINKEDIN_CAROUSEL__ = this;

    if (!container.querySelector('.linkedin-carousel-box')) {
      this.render(container);
    }
    this.setupElements(container);
    this.attachEvents();
    this.updateIndicators(0);
  }

  render(container) {
    const slidesHtml = this.posts.map((post, idx) => `
      <div class="linkedin-slide" data-slide-index="${idx}" aria-label="Publicación ${idx + 1} de ${this.posts.length}">
        <div class="linkedin-frame-wrapper">
          <iframe
            src="${post.embedUrl}"
            class="linkedin-iframe"
            allowfullscreen=""
            title="${post.title}"
            loading="${idx === 0 ? 'eager' : 'lazy'}">
          </iframe>
        </div>
      </div>
    `).join('');

    const dotsHtml = this.posts.map((_, idx) => `
      <button
        type="button"
        class="linkedin-dot ${idx === 0 ? 'active' : ''}"
        data-dot-index="${idx}"
        onclick="window.__LINKEDIN_CAROUSEL__?.goToSlide(${idx})"
        aria-label="Ir a publicación ${idx + 1}"
        aria-selected="${idx === 0}">
      </button>
    `).join('');

    container.innerHTML = `
      <div class="linkedin-carousel-box" role="region" aria-label="Carrusel de publicaciones destacadas">
        <!-- Barra de Controles Superior: Siempre visible en móvil y escritorio -->
        <div class="linkedin-controls-bar">
          <div class="linkedin-counter-badge">
            <span id="linkedinCounter" class="counter-num">01 / ${String(this.posts.length).padStart(2, '0')}</span>
            <span class="counter-label">Destacados</span>
          </div>

          <div class="linkedin-dots" role="tablist" aria-label="Navegación por páginas">
            ${dotsHtml}
          </div>

          <div class="linkedin-arrow-group">
            <button
              type="button"
              id="linkedinPrevBtn"
              class="linkedin-arrow-btn"
              onclick="window.__LINKEDIN_CAROUSEL__?.prev(event)"
              aria-label="Publicación anterior">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              type="button"
              id="linkedinNextBtn"
              class="linkedin-arrow-btn"
              onclick="window.__LINKEDIN_CAROUSEL__?.next(event)"
              aria-label="Publicación siguiente">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        <!-- Pista de Desplazamiento Fluida -->
        <div class="linkedin-track-viewport">
          <div id="linkedinTrack" class="linkedin-track" tabindex="0" aria-label="Publicaciones en LinkedIn">
            ${slidesHtml}
          </div>
        </div>
      </div>
    `;
  }

  setupElements(container) {
    this.track = container.querySelector('#linkedinTrack');
    this.counterEl = container.querySelector('#linkedinCounter');
    this.dots = Array.from(container.querySelectorAll('.linkedin-dot'));
    this.prevBtn = container.querySelector('#linkedinPrevBtn');
    this.nextBtn = container.querySelector('#linkedinNextBtn');
  }

  attachEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => this.prev(e));
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => this.next(e));
    }

    this.dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-dot-index'), 10);
        this.goToSlide(index);
      });
    });

    // Sincronización con gestos táctiles y scroll nativo
    if (this.track) {
      this.track.addEventListener('scroll', () => {
        window.clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          const width = this.track.clientWidth || 1;
          const calculatedIndex = Math.round(this.track.scrollLeft / width);
          if (calculatedIndex !== this.currentIndex && calculatedIndex >= 0 && calculatedIndex < this.posts.length) {
            this.currentIndex = calculatedIndex;
            this.updateIndicators(calculatedIndex);
          }
        }, 50);
      }, { passive: true });

      // Soporte para flechas de teclado
      this.track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.next();
        }
      });
    }
  }

  prev(e) {
    if (e && e.preventDefault) e.preventDefault();
    const newIndex = (this.currentIndex - 1 + this.posts.length) % this.posts.length;
    this.goToSlide(newIndex);
  }

  next(e) {
    if (e && e.preventDefault) e.preventDefault();
    const newIndex = (this.currentIndex + 1) % this.posts.length;
    this.goToSlide(newIndex);
  }

  goToSlide(index) {
    if (index < 0 || index >= this.posts.length) return;
    this.currentIndex = index;

    if (this.track) {
      const slides = this.track.querySelectorAll('.linkedin-slide');
      const targetSlide = slides[index];

      if (targetSlide) {
        const targetLeft = targetSlide.offsetLeft;
        
        // Scroll fluido programático
        this.track.scrollTo({
          left: targetLeft,
          behavior: 'smooth'
        });

        // Fallback síncrono para asegurar posicionamiento exacto ante bloqueos de scroll-snap
        setTimeout(() => {
          if (Math.abs(this.track.scrollLeft - targetLeft) > 10) {
            this.track.scrollLeft = targetLeft;
          }
        }, 320);
      }
    }

    this.updateIndicators(index);
  }

  updateIndicators(index) {
    if (this.counterEl) {
      const currentFormatted = String(index + 1).padStart(2, '0');
      const totalFormatted = String(this.posts.length).padStart(2, '0');
      this.counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
    }

    this.dots.forEach((dot, idx) => {
      const isActive = idx === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }
}
