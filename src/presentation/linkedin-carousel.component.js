/**
 * @file linkedin-carousel.component.js
 * @module presentation/linkedin-carousel.component
 * @description Componente de carrusel resiliente para posts de LinkedIn.
 * Sincroniza la columna de información/controles con el viewport del showcase.
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

    // Exponer inmediatamente al ámbito global para llamadas onclick
    window.__LINKEDIN_CAROUSEL__ = this;

    if (!container.querySelector('.linkedin-track-viewport')) {
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

    container.innerHTML = `
      <div class="linkedin-track-viewport">
        <div id="linkedinTrack" class="linkedin-track" tabindex="0" aria-label="Publicaciones en LinkedIn">
          ${slidesHtml}
        </div>
      </div>
    `;
  }

  setupElements(container) {
    this.track = container.querySelector('#linkedinTrack');
    this.counterEl = document.getElementById('linkedinCounter');
    this.dots = Array.from(document.querySelectorAll('.linkedin-dot'));
    this.prevBtn = document.getElementById('linkedinPrevBtn');
    this.nextBtn = document.getElementById('linkedinNextBtn');
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

    // Sincronización reactiva con scroll nativo / táctil en móvil
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

      // Navegación por teclado
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
        
        this.track.scrollTo({
          left: targetLeft,
          behavior: 'smooth'
        });

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
