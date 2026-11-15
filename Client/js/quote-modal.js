/**
 * B2B Quotation Engine for Texpart
 * IMPORTANT: This site is NOT an e-commerce platform. It is a B2B product catalogue & quotation inquiry platform.
 * NO shopping cart, NO checkout, NO payment, NO fixed prices.
 */

class QuoteModal {
  constructor() {
    this.modal = document.getElementById('quoteModal');
    this.container = document.getElementById('quoteModalContainer');
    this.closeBtn = document.getElementById('quoteModalClose');
    this.form = document.getElementById('quoteInquiryForm');
    this.prefilledBox = document.getElementById('quotePrefilledBox');
    this.prefilledProductName = document.getElementById('quotePrefilledProductName');
    this.prefilledProductCategory = document.getElementById('quotePrefilledProductCategory');
    this.productNameInput = document.getElementById('quoteInputProduct');
    this.successState = document.getElementById('quoteSuccessState');
    this.formState = document.getElementById('quoteFormState');
    this.dropzone = document.getElementById('quoteFileDropzone');
    this.fileInput = document.getElementById('quoteFileInput');
    this.fileInfo = document.getElementById('quoteFileInfo');

    this.init();
  }

  init() {
    if (!this.modal) return;

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Keyboard ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // File Dropzone Simulation
    if (this.dropzone && this.fileInput) {
      this.dropzone.addEventListener('click', () => this.fileInput.click());
      this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
      
      this.dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.dropzone.style.borderColor = 'var(--color-orange)';
      });
      this.dropzone.addEventListener('dragleave', () => {
        this.dropzone.style.borderColor = 'rgba(23, 26, 25, 0.2)';
      });
      this.dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.dropzone.style.borderColor = 'rgba(23, 26, 25, 0.2)';
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.fileInput.files = e.dataTransfer.files;
          this.handleFileSelect({ target: this.fileInput });
        }
      });
    }

    // Form submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Delegate global clicks on [data-quote-product]
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-quote-product]');
      if (trigger) {
        e.preventDefault();
        const productId = trigger.getAttribute('data-quote-product');
        const productName = trigger.getAttribute('data-quote-name') || '';
        const productCat = trigger.getAttribute('data-quote-cat') || '';
        this.open(productId, productName, productCat);
      }
    });
  }

  handleFileSelect(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (this.fileInfo) {
        this.fileInfo.innerHTML = `
          <div style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(35,75,59,0.1); color:var(--color-forest); padding:0.4rem 0.8rem; border-radius:2px; font-size:0.85rem; font-weight:600;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            ${file.name} (${(file.size / 1024).toFixed(1)} KB)
          </div>
        `;
      }
    }
  }

  open(productId = null, productName = null, productCategory = null) {
    // Reset state
    if (this.formState) this.formState.style.display = 'block';
    if (this.successState) this.successState.classList.remove('active');
    if (this.fileInfo) this.fileInfo.innerHTML = '';
    if (this.form) this.form.reset();

    // Check if opened with a specific product
    if (productId && typeof getProductById === 'function') {
      const prod = getProductById(productId);
      if (prod) {
        productName = prod.name;
        productCategory = prod.collection;
      }
    }

    if (productName) {
      if (this.prefilledBox) this.prefilledBox.style.display = 'flex';
      if (this.prefilledProductName) this.prefilledProductName.textContent = productName;
      if (this.prefilledProductCategory) this.prefilledProductCategory.textContent = productCategory || 'Custom Inquiry';
      if (this.productNameInput) this.productNameInput.value = productName;
    } else {
      if (this.prefilledBox) this.prefilledBox.style.display = 'none';
      if (this.productNameInput) this.productNameInput.value = 'General / Custom Project Inquiry';
    }

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

  handleSubmit(e) {
    e.preventDefault();
    
    // Simulate professional processing
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Transmitting Inquiry...
      `;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      if (this.formState) this.formState.style.display = 'none';
      if (this.successState) this.successState.classList.add('active');
    }, 700);
  }
}

// Global helper
window.openQuoteModal = function(productId, productName, productCategory) {
  if (window.texpartQuoteModal) {
    window.texpartQuoteModal.open(productId, productName, productCategory);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.texpartQuoteModal = new QuoteModal();
});

