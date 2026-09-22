/**
 * ==========================================================================
 * FUTURE MIND STUDIO — SHARED HEADER & NAVIGATION COMPONENT
 * ==========================================================================
 * Automatically mounts the unified desktop header & mobile drawer across all
 * pages (index.html, branding.html, etc.), dynamically configuring anchor routes,
 * sticky scroll states, and mobile overlay drawer interactions.
 */

(function () {
  'use strict';

  // Base HTML template matching header.html for immediate 0ms CLS mount
  const HEADER_TEMPLATE = `
<header id="siteHeader">
  <a href="index.html" class="logo" id="logoLink" aria-label="Future Mind Studio Home">
    <div class="logo-icon">
      <img src="assets/logo-rectangle.png" alt="Future Mind Studio Logo">
    </div>
  </a>

  <nav id="mainNav" aria-label="Main Navigation">
    <a href="#work" id="navWork">Work</a>
    <a href="#services" id="navServices">Services</a>
    <a href="#process" id="navProcess">Process</a>
    <a href="#studio" id="navStudio">Studio</a>
    <a href="#insights" id="navInsights">Insights</a>
    <a href="#contact" id="navContact">Contact</a>
  </nav>

  <a href="#contact" class="btn-header" id="btnLetCreate">
    Let's Create
    <svg viewBox="0 0 24 24"><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="12 5 19 5 19 12"></polyline></svg>
  </a>

  <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle Navigation Menu">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<div class="mobile-menu-overlay" id="mobileMenuOverlay" aria-modal="true" role="dialog">
  <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close mobile menu">
    <svg viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>

  <nav class="mobile-nav-links" aria-label="Mobile Navigation Links">
    <a href="#work" class="mobile-nav-link">Work</a>
    <a href="#services" class="mobile-nav-link">Services</a>
    <a href="#process" class="mobile-nav-link">Process</a>
    <a href="#studio" class="mobile-nav-link">Studio</a>
    <a href="#insights" class="mobile-nav-link">Insights</a>
    <a href="#contact" class="mobile-nav-link">Contact</a>
  </nav>

  <a href="#contact" class="btn-primary mobile-menu-cta" id="mobileLetCreate">
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

  // Determine if viewing the homepage
  const isHomePage = () => {
    const rawPath = window.location.pathname.toLowerCase().replace(/\\/g, '/');
    return (
      rawPath.endsWith('/index.html') ||
      rawPath.endsWith('/') ||
      rawPath === '' ||
      (!rawPath.includes('.html') && !rawPath.includes('.php'))
    );
  };

  // Mount header into the container and mobile overlay into document.body
  function mountHeader(htmlString) {
    const temp = document.createElement('div');
    temp.innerHTML = htmlString.trim();

    const newHeader = temp.querySelector('header');
    const newOverlay = temp.querySelector('.mobile-menu-overlay');

    // Locate target container
    let container = document.getElementById('site-header-container');
    if (!container) {
      // Create if missing before script or at the top of app-container
      const appContainer = document.querySelector('.app-container') || document.body;
      container = document.createElement('div');
      container.id = 'site-header-container';
      appContainer.insertBefore(container, appContainer.firstChild);
    }

    if (newHeader) {
      container.innerHTML = '';
      container.appendChild(newHeader);
    }

    if (newOverlay) {
      const existing = document.getElementById('mobileMenuOverlay');
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }
      // Ensure overlay is direct child of body for unrestricted fullscreen glass backdrop
      document.body.appendChild(newOverlay);
    }

    // Configure routes based on current page
    adaptNavigationRoutes();

    // Initialize interactive behaviors
    initInteractiveBehaviors();
  }

  // Adjust links between homepage and other subpages
  function adaptNavigationRoutes() {
    const isHome = isHomePage();
    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
      logoLink.href = isHome ? '#' : 'index.html';
    }

    if (!isHome) {
      // Subpage routing: route home sections back to index.html#...
      const sectionLinks = document.querySelectorAll(
        '#mainNav a[href^="#"], .mobile-nav-links a[href^="#"]'
      );

      sectionLinks.forEach(link => {
        const hash = link.getAttribute('href');
        if (hash === '#contact') {
          // If current page has its own #contact section, keep local scroll
          const localContact = document.getElementById('contact');
          if (!localContact) {
            link.setAttribute('href', 'index.html#contact');
          }
        } else if (hash && hash.startsWith('#')) {
          link.setAttribute('href', 'index.html' + hash);
        }
      });
    }
  }

  // Initialize sticky header scroll and mobile hamburger overlay
  function initInteractiveBehaviors() {
    const headerEl = document.querySelector('header') || document.getElementById('siteHeader');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');
    const mobileClose = document.getElementById('mobileMenuClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // 1. Sticky Header Scroll Effect
    const handleScroll = () => {
      const h = document.querySelector('header') || document.getElementById('siteHeader');
      if (!h) return;
      if (window.scrollY > 10) {
        h.classList.add('scrolled');
      } else {
        h.classList.remove('scrolled');
      }
    };

    if (!window.__siteHeaderScrollInit) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('DOMContentLoaded', handleScroll);
      window.addEventListener('load', handleScroll);
      window.__siteHeaderScrollInit = true;
    }
    handleScroll();

    // 2. Mobile Menu Open / Close Logic
    const openMobileMenu = () => {
      if (mobileToggle) mobileToggle.classList.add('active');
      if (mobileOverlay) mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
      if (mobileToggle) mobileToggle.classList.remove('active');
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Expose for page-level scripts
    window.openMobileMenu = openMobileMenu;
    window.closeMobileMenu = closeMobileMenu;

    if (mobileToggle && !mobileToggle.__siteHeaderBound) {
      mobileToggle.__siteHeaderBound = true;
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileOverlay && mobileOverlay.classList.contains('active')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    if (mobileClose && !mobileClose.__siteHeaderBound) {
      mobileClose.__siteHeaderBound = true;
      mobileClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    mobileLinks.forEach(link => {
      if (!link.__siteHeaderBound) {
        link.__siteHeaderBound = true;
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      }
    });

    // Close on Escape
    if (!window.__siteHeaderEscInit) {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay && mobileOverlay.classList.contains('active')) {
          closeMobileMenu();
        }
      });
      window.__siteHeaderEscInit = true;
    }
  }

  // Synchronous mount right at parse time
  mountHeader(HEADER_TEMPLATE);
})();
