/**
 * Product Details View & Quick-View System for Texpart
 * Authoritative integration with Texpart Brochures
 */

class ProductModal {
  constructor() {
    this.modal = document.getElementById('productDetailsModal');
    this.closeBtn = document.getElementById('productModalClose');
    
    // View Elements
    this.badgeEl = document.getElementById('productModalBadge');
    this.collectionEl = document.getElementById('productModalCollection');
    this.titleEl = document.getElementById('productModalTitle');
    this.brochureEl = document.getElementById('productModalBrochure');
    this.descEl = document.getElementById('productModalDesc');
    this.subitemsList = document.getElementById('productModalSubitems');
    this.materialsList = document.getElementById('productModalMaterials');
    this.finishesList = document.getElementById('productModalFinishes');
    this.specsTableBody = document.getElementById('productModalSpecsBody');
    this.quoteBtn = document.getElementById('productModalQuoteBtn');
    
    // Gallery Elements
    this.mainImg = document.getElementById('productModalMainImg');
    this.thumbsWrap = document.getElementById('productModalThumbs');

    this.currentProduct = null;
    this.init();
  }

  init() {
    if (!this.modal) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    if (this.quoteBtn) {
      this.quoteBtn.addEventListener('click', () => {
        if (this.currentProduct && window.openQuoteModal) {
          const prod = this.currentProduct;
          this.close();
          setTimeout(() => {
            window.openQuoteModal(prod.id, prod.name, prod.collection);
          }, 200);
        }
      });
    }

    // Global listener for [data-view-product]
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-view-product]');
      if (trigger) {
        e.preventDefault();
        const productId = trigger.getAttribute('data-view-product');
        this.open(productId);
      }
    });

    // Check URL parameters for ?product=...
    const urlParams = new URLSearchParams(window.location.search);
    const prodParam = urlParams.get('product') || urlParams.get('id');
    if (prodParam) {
      setTimeout(() => this.open(prodParam), 300);
    }
  }

  open(productId) {
    if (typeof getProductById !== 'function') return;
    const prod = getProductById(productId);
    if (!prod) return;

    this.currentProduct = prod;

    // Populate data
    if (this.badgeEl) this.badgeEl.textContent = prod.heroBadge || prod.category;
    if (this.collectionEl) this.collectionEl.textContent = prod.collection;
    if (this.titleEl) this.titleEl.textContent = prod.name;
    if (this.brochureEl) this.brochureEl.textContent = prod.brochureRef;
    if (this.descEl) this.descEl.innerHTML = `<p>${prod.fullDesc || prod.shortDesc}</p>`;

    // Subitems
    if (this.subitemsList) {
      this.subitemsList.innerHTML = (prod.subItems || [])
        .map(item => `
          <li style="display:flex; align-items:flex-start; gap:0.5rem; margin-bottom:0.4rem; font-size:0.9rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" stroke-width="2.5" style="flex-shrink:0; margin-top:0.2rem;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${item}</span>
          </li>
        `).join('');
    }

    // Materials
    if (this.materialsList) {
      this.materialsList.innerHTML = (prod.materials || [])
        .map(mat => `<span class="tag-badge" style="background:var(--color-beige-light); color:var(--color-charcoal);">${mat}</span>`)
        .join(' ');
    }

    // Finishes
    if (this.finishesList) {
      this.finishesList.innerHTML = (prod.finishes || [])
        .map(fin => `<span class="tag-badge" style="background:rgba(35,75,59,0.1); color:var(--color-forest);">${fin}</span>`)
        .join(' ');
    }

    // Specifications
    if (this.specsTableBody && prod.specifications) {
      this.specsTableBody.innerHTML = Object.entries(prod.specifications)
        .map(([key, val]) => `
          <tr>
            <th>${key}</th>
            <td>${val}</td>
          </tr>
        `).join('');
    }

    // Gallery & Thumbnails
    const images = prod.galleryImages && prod.galleryImages.length > 0 ? prod.galleryImages : [prod.image];
    if (this.mainImg) {
      this.mainImg.src = images[0];
      this.mainImg.alt = prod.name;
    }

    if (this.thumbsWrap) {
      this.thumbsWrap.innerHTML = images.map((imgUrl, idx) => `
        <div class="product-modal-thumb-item ${idx === 0 ? 'active' : ''}" data-thumb-idx="${idx}">
          <img src="${imgUrl}" alt="${prod.name} thumbnail ${idx + 1}" />
        </div>
      `).join('');

      // Add thumbnail click event
      this.thumbsWrap.querySelectorAll('.product-modal-thumb-item').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
          const idx = parseInt(thumb.getAttribute('data-thumb-idx'), 10);
          this.thumbsWrap.querySelectorAll('.product-modal-thumb-item').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          if (this.mainImg) {
            this.mainImg.src = images[idx];
          }
        });
      });
    }

    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
    this.currentProduct = null;
  }

  isOpen() {
    return this.modal.classList.contains('open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.texpartProductModal = new ProductModal();
});

