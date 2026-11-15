/**
 * Main Controller for Texpart Business Portfolio & Product Catalogue
 * Concept: "THE ART OF MAKING"
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initProductsShowcase();
  initGalleryGrid();
  initScrollAnimations();
});

/**
 * Sticky Navigation with Scroll Styling
 */
function initStickyHeader() {
  const header = document.querySelector('.header-nav');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close when clicking nav links inside mobile drawer
  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Dynamic Product Showcase with Category Filtering
 */
function initProductsShowcase() {
  const grid = document.getElementById('productsShowcaseGrid');
  const tabs = document.querySelectorAll('.filter-tab-btn[data-filter]');

  if (!grid || typeof PRODUCTS === 'undefined') return;

  let currentFilter = 'all';

  const renderProducts = (filter) => {
    let items = PRODUCTS;
    if (filter === 'featured') {
      items = PRODUCTS.filter(p => p.featured);
    } else if (filter === 'accessories') {
      items = PRODUCTS.filter(p => p.collectionId === 'accessories');
    } else if (filter === 'commercial') {
      items = PRODUCTS.filter(p => p.collectionId === 'commercial');
    }

    grid.innerHTML = items.map(p => `
      <div class="product-card" data-view-product="${p.id}">
        <div class="product-card-media">
          <img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy" />
          <span class="product-card-badge">${p.heroBadge || p.category}</span>
        </div>
        <div class="product-card-body">
          <span class="product-card-collection">${p.collection}</span>
          <h3 class="product-card-title">${p.name}</h3>
          <p class="product-card-desc">${p.shortDesc}</p>
          <div class="product-card-subitems">
            ${(p.subItems || []).slice(0, 3).map(sub => `<span class="product-card-subtag">${sub.split('(')[0].trim()}</span>`).join('')}
            ${(p.subItems && p.subItems.length > 3) ? `<span class="product-card-subtag">+${p.subItems.length - 3} more</span>` : ''}
          </div>
          <div class="product-card-actions">
            <span class="product-card-view-btn">
              View Details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
            <button class="product-card-quote-btn" data-quote-product="${p.id}" data-quote-name="${p.name}" data-quote-cat="${p.collection}">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    `).join('');
  };

  // Initial render
  renderProducts(currentFilter);

  // Tab click listeners
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter');
      renderProducts(currentFilter);
    });
  });
}

/**
 * Gallery Grid & Category Filtering
 */
function initGalleryGrid() {
  const galleryGrid = document.getElementById('galleryMasonryGrid');
  const galleryTabs = document.querySelectorAll('.gallery-tab-btn[data-gallery-filter]');

  if (!galleryGrid || typeof GALLERY_ITEMS === 'undefined') return;

  const renderGallery = (filter = 'all') => {
    const items = filter === 'all' 
      ? GALLERY_ITEMS 
      : GALLERY_ITEMS.filter(item => item.category === filter);

    galleryGrid.innerHTML = items.map(item => `
      <div class="masonry-item" 
           data-lightbox 
           data-lightbox-src="${item.image}" 
           data-lightbox-title="${item.title}" 
           data-lightbox-meta="${item.location} • ${item.meta}">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="masonry-hover-content">
          <span class="editorial-tag" style="margin-bottom:0.5rem; color:var(--color-orange);">${item.categoryLabel}</span>
          <h4 style="color:#FFFFFF; font-size:1.15rem; margin-bottom:0.35rem;">${item.title}</h4>
          <p style="color:var(--color-beige); font-size:0.85rem; line-height:1.4;">${item.description}</p>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.75rem; font-size:0.75rem; color:var(--color-grey-light);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${item.location}</span>
          </div>
        </div>
      </div>
    `).join('');
  };

  renderGallery('all');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-gallery-filter');
      renderGallery(cat);
    });
  });
}

/**
 * Scroll Animations & Observer
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

