/**
 * @file linkedin-carousel.component.js
 * @module presentation/linkedin-carousel.component
 * @description Componente de carrusel minimalista, limpio y fluido para publicaciones
 * de LinkedIn, con navegación accesible, gestos táctiles y diseño no recargado.
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

  init() {
    const container = document.getElementById(this.containerId);
    if (!container || this.posts.length === 0) return;

    this.renderMinimal(container);
    this.setupElements(container);
    this.attachEvents();
    this.updateActiveSlide(0);
  }

  renderMinimal(container) {
    const slidesHtml = this.posts.map((post, idx) => `
      <div class="linkedin-slide" data-slide-index="${idx}" aria-label="Publicación ${idx + 1} de ${this.posts.length}">
        <div class="linkedin-frame-wrapper">
          <iframe
            src="${post.embedUrl}"
            class="linkedin-iframe"
            allowfullscreen=""
            title="${post.title}"
            loading="lazy">
          </iframe>
        </div>
      </div>
    `).join('');

    const dotsHtml = this.posts.map((_, idx) => `
      <button class="linkedin-dot" data-dot-index="${idx}" aria-label="Ir al post ${idx + 1}"></button>
    `).join('');

    container.innerHTML = `
      <div class="linkedin-minimal-carousel">
        <!-- Viewport del Carrusel -->
        <div class="linkedin-track-viewport">
          <div id="linkedinTrack" class="linkedin-track" tabindex="0" aria-label="Publicaciones en LinkedIn">
            ${slidesHtml}
          </div>
        </div>

        <!-- Controles Inferiores Minimalistas -->
        <div class="linkedin-minimal-nav">
          <div class="linkedin-counter-tag">
            <span id="linkedinCounter">01 / ${String(this.posts.length).padStart(2, '0')}</span>
          </div>

          <div class="linkedin-dots" role="tablist">
            ${dotsHtml}
          </div>

          <div class="linkedin-arrow-actions">
            <button id="linkedinPrevBtn" class="linkedin-nav-arrow" aria-label="Anterior">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button id="linkedinNextBtn" class="linkedin-nav-arrow" aria-label="Siguiente">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
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
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    this.dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-dot-index'), 10);
        this.goToSlide(index);
      });
    });

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

      this.track.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.track.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        const diff = this.touchStartX - this.touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) this.next();
          else this.prev();
        }
      }, { passive: true });
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

  goToSlide(index) {
    if (index < 0 || index >= this.posts.length) return;
    this.currentIndex = index;
    this.updateActiveSlide(index);
  }

  updateActiveSlide(index) {
    if (this.track) {
      const slideWidth = this.track.clientWidth;
      this.track.scrollTo({
        left: index * slideWidth,
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
