/**
 * ==========================================================================
 * FUTURE MIND STUDIO — SHARED HEADER & NAVIGATION COMPONENT
 * ==========================================================================
 * Automatically mounts the unified desktop header, Work Chooser Dialog Box,
 * and mobile overlay drawer across all pages.
 */

(function () {
  'use strict';

  const HEADER_TEMPLATE = `<!-- ==========================================================================
     FUTURE MIND STUDIO — GLOBAL SHARED HEADER & NAVIGATION
     This component is dynamically mounted across all pages via header.js
     ========================================================================== -->
<header id="siteHeader">
  <a href="index.html" class="logo" id="logoLink" aria-label="Future Mind Studio Home">
    <div class="logo-icon">
      <img src="assets/logo-rectangle.png" alt="Future Mind Studio Logo" draggable="false">
    </div>
  </a>

  <nav id="mainNav" aria-label="Main Navigation">
    <button type="button" class="nav-dialog-trigger" id="navWork" aria-haspopup="dialog" aria-expanded="false" aria-controls="workMenuDialog">
      <span>Work</span>
      <svg class="nav-caret" viewBox="0 0 12 12"><path d="M2 4.5l4 4 4-4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>
    </button>
    <a href="index.html#services" id="navServices">Services</a>
    <a href="index.html#process" id="navProcess">Process</a>
    <a href="index.html#studio" id="navStudio">Studio</a>
    <a href="index.html#insights" id="navInsights">Insights</a>
    <a href="index.html#contact" id="navContact">Contact</a>
  </nav>

  <a href="index.html#contact" class="btn-header" id="btnLetCreate">
    Let's Create
    <svg viewBox="0 0 24 24"><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="12 5 19 5 19 12"></polyline></svg>
  </a>

  <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle Navigation Menu">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<!-- WORK MENU CHOOSER DIALOG BOX (Animated Visual Showcase) -->
<div class="work-dialog-overlay" id="workMenuDialog" role="dialog" aria-modal="true" aria-labelledby="workDialogTitle" aria-hidden="true">
  <div class="work-dialog-window" role="document">
    <!-- Top Header -->
    <div class="work-dialog-top">
      <div class="work-dialog-heading-wrap">
        <div class="dialog-badge">✦ OUR WORK / DIRECTORY</div>
        <h3 id="workDialogTitle">Explore Creative Disciplines</h3>
        <p>Hover or select any category to preview the visual system and jump straight into that showcase.</p>
      </div>
      <button type="button" class="work-dialog-close" id="workDialogClose" aria-label="Close dialog">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <!-- Animated 2-Column Interactive Menu Showcase -->
    <div class="work-showcase-layout">
      <!-- Left: Staggered 01-05 Category Selector -->
      <div class="work-menu-list" id="workMenuList" role="listbox" aria-label="Service Disciplines">
        <a href="index.html#work" class="work-menu-item is-active" data-filter="branding" data-index="0" style="--item-delay: 0ms;">
          <span class="work-item-num">01</span>
          <div class="work-item-body">
            <h4>Branding &amp; Identity</h4>
            <p>Logo systems, typography &amp; visual guidelines</p>
          </div>
          <span class="work-item-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </a>

        <a href="index.html#work" class="work-menu-item" data-filter="packaging" data-index="1" style="--item-delay: 55ms;">
          <span class="work-item-num">02</span>
          <div class="work-item-body">
            <h4>Packaging &amp; Print</h4>
            <p>3D box architecture, hangtags &amp; print specs</p>
          </div>
          <span class="work-item-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </a>

        <a href="index.html#work" class="work-menu-item" data-filter="marketing" data-index="2" style="--item-delay: 110ms;">
          <span class="work-item-num">03</span>
          <div class="work-item-body">
            <h4>Marketing Design</h4>
            <p>Catalogues, editorial lookbooks &amp; campaign assets</p>
          </div>
          <span class="work-item-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </a>

        <a href="index.html#work" class="work-menu-item" data-filter="ecommerce" data-index="3" style="--item-delay: 165ms;">
          <span class="work-item-num">04</span>
          <div class="work-item-body">
            <h4>Websites &amp; E-Commerce</h4>
            <p>Flagship online stores, responsive UX &amp; portals</p>
          </div>
          <span class="work-item-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </a>

        <a href="index.html#work" class="work-menu-item" data-filter="software" data-index="4" style="--item-delay: 220ms;">
          <span class="work-item-num">05</span>
          <div class="work-item-body">
            <h4>Enterprise ERP &amp; Software</h4>
            <p>Multi-warehouse inventory, GST billing &amp; systems</p>
          </div>
          <span class="work-item-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </span>
        </a>
      </div>

      <!-- Right: Live Animated Visual Preview Stage -->
      <div class="work-preview-stage" id="workPreviewStage" data-anim="branding">
        <div class="preview-ambient-grid" aria-hidden="true"></div>
        <div class="preview-ambient-glow" aria-hidden="true"></div>

        <div class="preview-stage-top">
          <span class="preview-stage-tag" id="workPreviewTag">01 / IDENTITY</span>
          <span class="preview-stage-pulse"><i class="pulse-dot"></i>LIVE PREVIEW</span>
        </div>

        <div class="work-preview-visual" id="workPreviewVisual">
          <!-- Animated Category Motion Overlays -->
          <div class="anim-layer anim-branding-layer" aria-hidden="true">
            <svg class="anim-signature-svg" viewBox="0 0 320 90" fill="none">
              <path d="M12 68 Q 95 14 168 48 T 306 24" stroke="#F4C400" stroke-width="2.5" stroke-linecap="round" />
            </svg>
            <div class="anim-floating-chip">✦ Identity Geometry</div>
          </div>

          <div class="anim-layer anim-packaging-layer" aria-hidden="true">
            <div class="anim-foil-sheen"></div>
            <div class="anim-floating-chip">3D Structural Die-Line</div>
          </div>

          <div class="anim-layer anim-marketing-layer" aria-hidden="true">
            <div class="anim-editorial-lines">
              <span></span><span></span>
            </div>
            <div class="anim-floating-chip">Campaign &amp; Lookbook Grid</div>
          </div>

          <div class="anim-layer anim-ecommerce-layer" aria-hidden="true">
            <div class="anim-browser-chrome">
              <span></span><span></span><span></span>
            </div>
            <div class="anim-floating-chip">Responsive D2C Storefront</div>
          </div>

          <div class="anim-layer anim-software-layer" aria-hidden="true">
            <div class="anim-erp-bars">
              <i></i><i></i><i></i><i></i>
            </div>
            <div class="anim-floating-chip">Real-Time ERP Telemetry</div>
          </div>

          <div class="preview-img-frame" id="workPreviewFrame">
            <img src="assets/project_brand.jpeg" alt="Branding &amp; Identity Preview" id="workPreviewImg" draggable="false">
            <div class="img-protection-layer" aria-hidden="true"></div>
            <div class="watermark-shield watermark-shield--compact" aria-hidden="true"><span class="wm-icon">✦</span><span class="wm-text">Future Mind Studio</span></div>
          </div>
        </div>

        <div class="work-preview-meta" id="workPreviewMeta">
          <div class="preview-meta-copy">
            <h4 id="workPreviewTitle">Build a Brand That Stands Out</h4>
            <p id="workPreviewDesc">Aerodynamic logos, typography guidelines &amp; complete corporate stationery systems engineered for lasting recognition.</p>
          </div>
          <a href="index.html#work" class="btn-preview-explore" id="workPreviewCta" data-filter="branding">
            <span>Explore Service</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="12 5 19 5 19 12"></polyline></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MOBILE NAVIGATION DRAWER OVERLAY -->
<div class="mobile-menu-overlay" id="mobileMenuOverlay" aria-modal="true" role="dialog">
  <!-- Top Bar inside drawer: Logo + Single Close Button -->
  <div class="mobile-menu-header">
    <a href="index.html" class="mobile-menu-logo" aria-label="Future Mind Studio Home">
      <img src="assets/logo-rectangle.png" alt="Future Mind Studio Logo" draggable="false">
    </a>
    <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close mobile menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>

  <nav class="mobile-nav-links" aria-label="Mobile Navigation Links">
    <!-- Centered Work Item with Dropdown Accordion -->
    <div class="mobile-nav-accordion" id="mobileWorkAccordion">
      <button class="mobile-accordion-toggle" id="mobileWorkToggle" aria-expanded="false">
        <span>Work</span>
        <svg class="accordion-caret" viewBox="0 0 14 14" fill="none"><path d="M3 5.5l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="mobile-accordion-content" id="mobileWorkContent">
        <a href="index.html#work" class="mobile-sub-link all-work-link">
          <span class="sub-num">✦</span>
          <span class="sub-text">All Projects &amp; Overview</span>
        </a>
        <a href="index.html#work" class="mobile-sub-link" data-filter-target="branding">
          <span class="sub-num">01</span>
          <span class="sub-text">Branding &amp; Identity</span>
        </a>
        <a href="index.html#work" class="mobile-sub-link" data-filter-target="packaging">
          <span class="sub-num">02</span>
          <span class="sub-text">Packaging &amp; Print</span>
        </a>
        <a href="index.html#work" class="mobile-sub-link" data-filter-target="marketing">
          <span class="sub-num">03</span>
          <span class="sub-text">Marketing Design</span>
        </a>
        <a href="index.html#work" class="mobile-sub-link" data-filter-target="ecommerce">
          <span class="sub-num">04</span>
          <span class="sub-text">Websites &amp; E-Commerce</span>
        </a>
        <a href="index.html#work" class="mobile-sub-link" data-filter-target="software">
          <span class="sub-num">05</span>
          <span class="sub-text">Enterprise ERP &amp; Software</span>
        </a>
      </div>
    </div>
    <a href="index.html#services" class="mobile-nav-link">Services</a>
    <a href="index.html#process" class="mobile-nav-link">Process</a>
    <a href="index.html#studio" class="mobile-nav-link">Studio</a>
    <a href="index.html#insights" class="mobile-nav-link">Insights</a>
    <a href="index.html#contact" class="mobile-nav-link">Contact</a>
  </nav>

  <a href="index.html#contact" class="btn-primary mobile-menu-cta" id="mobileLetCreate">
    Let's Create
    <svg viewBox="0 0 24 24"><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="12 5 19 5 19 12"></polyline></svg>
  </a>

  <div class="mobile-socials">
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter X" class="social-icon social-x">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    </a>
    <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble" class="social-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56"></path></svg>
    </a>
  </div>
</div>
`;

  function mountHeader() {
    let mountContainer = document.getElementById('site-header-container');
    if (!mountContainer) {
      const existingHeader = document.getElementById('siteHeader');
      if (existingHeader) {
        mountContainer = document.createElement('div');
        mountContainer.id = 'site-header-container';
        existingHeader.parentNode.replaceChild(mountContainer, existingHeader);
      } else {
        const appContainer = document.querySelector('.app-container') || document.body;
        mountContainer = document.createElement('div');
        mountContainer.id = 'site-header-container';
        appContainer.insertBefore(mountContainer, appContainer.firstChild);
      }
    }

    mountContainer.innerHTML = HEADER_TEMPLATE;

    const isHomePage = window.location.pathname.endsWith('index.html') ||
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname === '';

    // Route adjustments: convert index.html#section to in-page #section when on homepage
    if (isHomePage) {
      const links = mountContainer.querySelectorAll('nav a, .btn-header, .mobile-nav-links a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('index.html#')) {
          link.setAttribute('href', href.replace('index.html', ''));
        }
      });
    }

    // --- WORK CHOOSER DIALOG BOX LOGIC ---
    const navWorkBtn = document.getElementById('navWork');
    const workDialog = document.getElementById('workMenuDialog');
    const workDialogClose = document.getElementById('workDialogClose');

    function openWorkDialog() {
      if (!workDialog) return;
      workDialog.classList.add('is-active');
      workDialog.setAttribute('aria-hidden', 'false');
      if (navWorkBtn) {
        navWorkBtn.classList.add('is-open');
        navWorkBtn.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeWorkDialog() {
      if (!workDialog) return;
      workDialog.classList.remove('is-active');
      workDialog.setAttribute('aria-hidden', 'true');
      if (navWorkBtn) {
        navWorkBtn.classList.remove('is-open');
        navWorkBtn.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }

    if (navWorkBtn && !navWorkBtn.__bound) {
      navWorkBtn.__bound = true;
      navWorkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (workDialog && workDialog.classList.contains('is-active')) {
          closeWorkDialog();
        } else {
          openWorkDialog();
        }
      });
    }

    if (workDialogClose && !workDialogClose.__bound) {
      workDialogClose.__bound = true;
      workDialogClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeWorkDialog();
      });
    }

    if (workDialog && !workDialog.__boundOverlay) {
      workDialog.__boundOverlay = true;
      workDialog.addEventListener('click', (e) => {
        if (e.target === workDialog) {
          closeWorkDialog();
        }
      });
    }

    // Interactive Animated Preview Switcher inside Work Dialog
    const WORK_CATEGORIES = {
      branding: {
        tag: '01 / IDENTITY',
        title: 'Build a Brand That Stands Out',
        desc: 'Aerodynamic logos, typography guidelines & complete corporate stationery systems engineered for lasting recognition.',
        img: 'assets/project_brand.jpeg',
        alt: 'Branding & Identity Visual Preview'
      },
      packaging: {
        tag: '02 / PACKAGING',
        title: 'Creative Packaging & Print Specs',
        desc: 'Luxury 3D rigid boxes, structural die-lines, garment tags & tactile finishes built for retail shelves and exports.',
        img: 'assets/packaging/TRIFLEX - BOX PRINT FILE - 5 Designs  - 21.07.2026_page-0001.jpg',
        alt: 'Packaging & Print Visual Preview'
      },
      marketing: {
        tag: '03 / MARKETING',
        title: 'Designs That Drive Engagement',
        desc: 'Editorial product catalogues, seasonal wholesale lookbooks, high-conversion banners & campaign visuals.',
        img: 'assets/marketting/board.jpeg',
        alt: 'Marketing Design Visual Preview'
      },
      ecommerce: {
        tag: '04 / DIGITAL',
        title: 'Power Your Business Online',
        desc: 'Bespoke D2C e-commerce storefronts, corporate websites, responsive UX & streamlined ordering funnels.',
        img: 'assets/MayaSreeFashion-E-commerce.png',
        alt: 'Websites & E-Commerce Visual Preview'
      },
      software: {
        tag: '05 / SYSTEMS',
        title: 'Smart Business ERP & Software',
        desc: 'Multi-warehouse inventory tracking, automated GST billing & custom operations portals designed for clarity.',
        img: 'assets/MayaSree-Dashboard.png',
        alt: 'Enterprise ERP & Software Visual Preview'
      }
    };

    const menuItems = workDialog ? workDialog.querySelectorAll('.work-menu-item') : [];
    const previewStage = document.getElementById('workPreviewStage');
    const previewVisual = document.getElementById('workPreviewVisual');
    const previewTag = document.getElementById('workPreviewTag');
    const previewTitle = document.getElementById('workPreviewTitle');
    const previewDesc = document.getElementById('workPreviewDesc');
    const previewImg = document.getElementById('workPreviewImg');
    const previewCta = document.getElementById('workPreviewCta');

    function setActiveWorkPreview(catKey) {
      const data = WORK_CATEGORIES[catKey];
      if (!data) return;

      menuItems.forEach((item) => {
        item.classList.toggle('is-active', item.getAttribute('data-filter') === catKey);
      });

      if (previewStage) {
        previewStage.setAttribute('data-anim', catKey);
      }
      if (previewVisual) {
        previewVisual.classList.remove('is-switching');
        void previewVisual.offsetWidth;
        previewVisual.classList.add('is-switching');
      }
      if (previewTag) previewTag.textContent = data.tag;
      if (previewTitle) previewTitle.textContent = data.title;
      if (previewDesc) previewDesc.textContent = data.desc;
      if (previewImg) {
        previewImg.src = data.img;
        previewImg.alt = data.alt;
      }
      if (previewCta) {
        previewCta.setAttribute('data-filter', catKey);
      }
    }

    function handleWorkFilterSelection(filter) {
      if (!filter) return;
      try {
        sessionStorage.setItem('fms_work_filter', filter);
      } catch (err) {}
    }

    function navigateWorkFilter(filter, e) {
      handleWorkFilterSelection(filter);
      if (isHomePage && e) {
        e.preventDefault();
        closeWorkDialog();
        const targetEl = filter === 'all'
          ? document.getElementById('work')
          : (document.querySelector(`#curatedGrid .curated-card[data-category="${filter}"]`) || document.getElementById('work'));
        if (targetEl) {
          const headerEl = document.getElementById('siteHeader');
          const offset = headerEl ? headerEl.offsetHeight : 80;
          window.scrollTo({
            top: targetEl.getBoundingClientRect().top + window.scrollY - offset - 15,
            behavior: 'smooth'
          });
        }
      } else {
        closeWorkDialog();
      }
    }

    menuItems.forEach((item) => {
      const cat = item.getAttribute('data-filter');
      item.addEventListener('mouseenter', () => setActiveWorkPreview(cat));
      item.addEventListener('focus', () => setActiveWorkPreview(cat));
      item.addEventListener('click', (e) => {
        const isTouchLike = window.matchMedia('(hover: none)').matches;
        if (isTouchLike && !item.classList.contains('is-active')) {
          e.preventDefault();
          setActiveWorkPreview(cat);
          return;
        }
        navigateWorkFilter(cat, e);
      });
    });

    if (previewCta) {
      previewCta.addEventListener('click', (e) => {
        const cat = previewCta.getAttribute('data-filter') || 'branding';
        navigateWorkFilter(cat, e);
      });
    }

    // --- STICKY HEADER SCROLL STATE ---
    const siteHeader = document.getElementById('siteHeader');
    function updateScrollState() {
      if (!siteHeader) return;
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    // --- MOBILE DRAWER TOGGLE ---
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');
    const mobileClose = document.getElementById('mobileMenuClose');

    function openMobileMenu() {
      if (!mobileOverlay) return;
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      if (!mobileOverlay) return;
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (mobileToggle && !mobileToggle.__bound) {
      mobileToggle.__bound = true;
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openMobileMenu();
      });
    }

    if (mobileClose && !mobileClose.__bound) {
      mobileClose.__bound = true;
      mobileClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    // Mobile Work Accordion Toggle
    const mobileWorkToggle = document.getElementById('mobileWorkToggle');
    const mobileWorkContent = document.getElementById('mobileWorkContent');
    if (mobileWorkToggle && !mobileWorkToggle.__bound) {
      mobileWorkToggle.__bound = true;
      mobileWorkToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileWorkToggle.classList.contains('active');
        if (isOpen) {
          mobileWorkToggle.classList.remove('active');
          mobileWorkToggle.setAttribute('aria-expanded', 'false');
          if (mobileWorkContent) mobileWorkContent.classList.remove('active');
        } else {
          mobileWorkToggle.classList.add('active');
          mobileWorkToggle.setAttribute('aria-expanded', 'true');
          if (mobileWorkContent) mobileWorkContent.classList.add('active');
        }
      });
    }

    // Close on mobile link clicks & handle category filter sync
    if (mobileOverlay) {
      const mobileLinks = mobileOverlay.querySelectorAll('a:not(.mobile-accordion-toggle)');
      mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const filter = link.getAttribute('data-filter-target') || (link.classList.contains('all-work-link') ? 'all' : null);
          if (filter) {
            handleWorkFilterSelection(filter);
            if (isHomePage) {
              e.preventDefault();
              closeMobileMenu();
              const targetEl = filter === 'all' ? document.getElementById('work') : (document.querySelector(`#curatedGrid .curated-card[data-category="${filter}"]`) || document.getElementById('work'));
              if (targetEl) {
                const headerEl = document.getElementById('siteHeader');
                const offset = headerEl ? headerEl.offsetHeight : 80;
                window.scrollTo({ top: targetEl.getBoundingClientRect().top + window.scrollY - offset - 15, behavior: 'smooth' });
              }
              return;
            }
          }
          closeMobileMenu();
        });
      });
    }

    // Global Keyboard Handler (Escape + Arrow Key navigation inside Work dialog)
    if (!window.__siteHeaderEscInit) {
      window.addEventListener('keydown', (e) => {
        const isDialogOpen = workDialog && workDialog.classList.contains('is-active');
        if (e.key === 'Escape') {
          if (isDialogOpen) {
            closeWorkDialog();
          }
          if (mobileOverlay && mobileOverlay.classList.contains('active')) {
            closeMobileMenu();
          }
          return;
        }

        if (isDialogOpen && menuItems.length > 0 && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
          const itemsArr = Array.from(menuItems);
          let currentIdx = itemsArr.findIndex((item) => item.classList.contains('is-active'));
          if (currentIdx < 0) currentIdx = 0;

          if (e.key === 'ArrowDown') {
            currentIdx = (currentIdx + 1) % itemsArr.length;
          } else if (e.key === 'ArrowUp') {
            currentIdx = (currentIdx - 1 + itemsArr.length) % itemsArr.length;
          } else if (e.key === 'Home') {
            currentIdx = 0;
          } else if (e.key === 'End') {
            currentIdx = itemsArr.length - 1;
          }

          const nextItem = itemsArr[currentIdx];
          if (nextItem) {
            const cat = nextItem.getAttribute('data-filter');
            setActiveWorkPreview(cat);
            nextItem.focus();
          }
        }
      });
      window.__siteHeaderEscInit = true;
    }
  }

  if (document.getElementById('site-header-container')) {
    mountHeader();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHeader);
  } else {
    mountHeader();
  }
})();
