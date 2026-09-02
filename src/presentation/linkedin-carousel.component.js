/**
 * @file linkedin-carousel.component.js
 * @module presentation/linkedin-carousel.component
 * @description Componente de carrusel interactivo y accesible para publicaciones
 * destacadas de LinkedIn, con soporte táctil, controles por teclado y paginación reactiva.
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
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  /**
   * Inicializa la estructura del carrusel y los listeners.
   */
  init() {
    const container = document.getElementById(this.containerId);
    if (!container || this.posts.length === 0) return;

    this.renderSkeleton(container);
    this.setupElements(container);
    this.attachEvents();
    this.updateActiveSlide(0);
  }

  /**
   * Renderiza el esqueleto HTML del carrusel con sus controles.
   * @param {HTMLElement} container
   */
  renderSkeleton(container) {
    const slidesHtml = this.posts.map((post, idx) => `
      <div class="linkedin-slide" data-slide-index="${idx}" aria-roledescription="slide" aria-label="${idx + 1} de ${this.posts.length}: ${post.title}">
        <div class="linkedin-card-box">
          <div class="linkedin-card-header">
            <span class="linkedin-card-tag">${post.tag}</span>
            <span class="linkedin-card-badge">LinkedIn Post</span>
          </div>
          <iframe
            src="${post.embedUrl}"
            class="linkedin-iframe"
            allowfullscreen=""
            title="${post.title}"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups">
          </iframe>
        </div>
      </div>
    `).join('');

    const dotsHtml = this.posts.map((_, idx) => `
      <button class="linkedin-dot" data-dot-index="${idx}" aria-label="Ir a la publicación ${idx + 1}"></button>
    `).join('');

    container.innerHTML = `
      <div class="linkedin-carousel-wrapper" role="region" aria-label="Carrusel de publicaciones destacadas de LinkedIn">
        <!-- Barra Superior de Navegación del Carrusel -->
        <div class="linkedin-carousel-header">
          <div class="linkedin-counter-box">
            <span id="linkedinCounter" class="linkedin-counter-text">01 / ${String(this.posts.length).padStart(2, '0')}</span>
            <span class="linkedin-counter-lbl">Publicaciones Destacadas</span>
          </div>

          <div class="linkedin-carousel-controls">
            <button id="linkedinPrevBtn" class="carousel-nav-btn" aria-label="Publicación anterior">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button id="linkedinNextBtn" class="carousel-nav-btn" aria-label="Publicación siguiente">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <a href="https://www.linkedin.com/in/ladyloayzarodriguez/" target="_blank" rel="noopener noreferrer" class="carousel-all-link">
              Ver perfil completo ↗
            </a>
          </div>
        </div>

        <!-- Pista de Desplazamiento (Track) -->
        <div class="linkedin-carousel-viewport">
          <div id="linkedinTrack" class="linkedin-carousel-track" tabindex="0" aria-live="polite">
            ${slidesHtml}
          </div>
        </div>

        <!-- Indicadores de Puntos (Dots) -->
        <div class="linkedin-dots-container" role="tablist" aria-label="Selector de publicaciones">
          ${dotsHtml}
        </div>
      </div>
    `;
  }

  /**
   * Guarda referencias al DOM.
   * @param {HTMLElement} container
   */
  setupElements(container) {
    this.track = container.querySelector('#linkedinTrack');
    this.counterEl = container.querySelector('#linkedinCounter');
    this.dots = Array.from(container.querySelectorAll('.linkedin-dot'));
    this.prevBtn = container.querySelector('#linkedinPrevBtn');
    this.nextBtn = container.querySelector('#linkedinNextBtn');
  }

  /**
   * Vincula los listeners de eventos.
   */
  attachEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    this.dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-dot-index'), 10);
        this.goToSlide(index);
      });
    });

    // Soporte para navegación con flechas por teclado
    if (this.track) {
      this.track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.next();
        }
      });

      // Gestos táctiles (Swipe en móviles)
      this.track.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.track.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipeGesture();
      }, { passive: true });
    }
  }

  handleSwipeGesture() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  prev() {
    const newIndex = (this.currentIndex - 1 + this.posts.length) % this.posts.length;
    this.goToSlide(newIndex);
  }

  next() {
    const newIndex = (this.currentIndex + 1) % this.posts.length;
    this.goToSlide(newIndex);
  }

  /**
   * Cambia a un slide determinado.
   * @param {number} index
   */
  goToSlide(index) {
    if (index < 0 || index >= this.posts.length) return;
    this.currentIndex = index;
    this.updateActiveSlide(index);
  }

  updateActiveSlide(index) {
    if (this.track) {
      const slideWidth = this.track.clientWidth;
      const targetScroll = index * slideWidth;
      this.track.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }

    if (this.counterEl) {
      const currentFormatted = String(index + 1).padStart(2, '0');
      const totalFormatted = String(this.posts.length).padStart(2, '0');
      this.counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
    }

    this.dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }
}
