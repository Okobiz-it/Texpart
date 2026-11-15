/**
 * Fullscreen Interactive Lightbox for Texpart Gallery
 */

class Lightbox {
  constructor() {
    this.modal = document.getElementById('lightboxModal');
    this.imgEl = document.getElementById('lightboxImg');
    this.titleEl = document.getElementById('lightboxTitle');
    this.metaEl = document.getElementById('lightboxMeta');
    this.closeBtn = document.getElementById('lightboxClose');
    this.prevBtn = document.getElementById('lightboxPrev');
    this.nextBtn = document.getElementById('lightboxNext');

    this.items = [];
    this.currentIndex = 0;

    this.init();
  }

  init() {
    if (!this.modal) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!this.isOpen()) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    // Delegate clicks on [data-lightbox]
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-lightbox]');
      if (trigger) {
        e.preventDefault();
        this.buildItemsList();
        const src = trigger.getAttribute('data-lightbox-src') || trigger.querySelector('img')?.src;
        const idx = this.items.findIndex(item => item.src === src);
        this.open(idx >= 0 ? idx : 0);
      }
    });
  }

  buildItemsList() {
    const triggers = document.querySelectorAll('[data-lightbox]');
    this.items = Array.from(triggers).map(el => {
      return {
        src: el.getAttribute('data-lightbox-src') || el.querySelector('img')?.src,
        title: el.getAttribute('data-lightbox-title') || el.querySelector('h4')?.textContent || 'Texpart Manufacturing Archive',
        meta: el.getAttribute('data-lightbox-meta') || el.querySelector('p')?.textContent || 'Dhaka Facility, Bangladesh'
      };
    });
  }

  open(index = 0) {
    if (this.items.length === 0) this.buildItemsList();
    this.currentIndex = index;
    this.update();
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.modal.classList.contains('open');
  }

  next() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.update();
  }

  prev() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.update();
  }

  update() {
    const current = this.items[this.currentIndex];
    if (!current) return;
    if (this.imgEl) {
      this.imgEl.src = current.src;
      this.imgEl.alt = current.title;
    }
    if (this.titleEl) this.titleEl.textContent = current.title;
    if (this.metaEl) this.metaEl.textContent = current.meta;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.texpartLightbox = new Lightbox();
});

