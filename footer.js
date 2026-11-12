/**
 * ==========================================================================
 * FUTURE MIND STUDIO — SHARED FOOTER COMPONENT
 * ==========================================================================
 * Automatically mounts the unified footer across pages (index.html, etc.),
 * dynamically configuring routes, smooth scrolling, and copyright year.
 */

(function () {
  'use strict';

  const currentYear = new Date().getFullYear();

  const FOOTER_TEMPLATE = `
<footer class="footer-details" id="siteFooter">
  <div class="footer-top">
    <a href="index.html" class="logo" id="footerLogoLink" aria-label="Future Mind Studio Home">
      <div class="logo-icon">
        <img src="assets/logo-rectangle.png" alt="Future Mind Studio Logo" draggable="false">
      </div>
    </a>
    <div class="footer-links">
      <a href="index.html#work" class="footer-link" id="footerLinkWork">Work</a>
      <a href="index.html#services" class="footer-link" id="footerLinkServices">Services</a>
      <a href="index.html#process" class="footer-link" id="footerLinkProcess">Process</a>
      <a href="index.html#studio" class="footer-link" id="footerLinkStudio">Studio</a>
      <a href="index.html#contact" class="footer-link" id="footerLinkContact">Contact</a>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p class="copyright">&copy; ${currentYear} Future Mind Studio. Made with premium design logic. All rights reserved.</p>
    <div class="footer-socials">
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
    <a href="#top" class="btn-back-top" id="footerBackToTop" aria-label="Scroll back to top">
      Back to top ✦
    </a>
  </div>
  
  <div class="footer-outline-text">FUTURE MIND</div>
</footer>
`;

  function mountFooter() {
    let mountContainer = document.getElementById('site-footer-container');
    if (!mountContainer) {
      const existingFooter = document.querySelector('footer.footer-details');
      if (existingFooter) {
        mountContainer = document.createElement('div');
        mountContainer.id = 'site-footer-container';
        existingFooter.parentNode.replaceChild(mountContainer, existingFooter);
      } else {
        const appContainer = document.querySelector('.app-container') || document.body;
        mountContainer = document.createElement('div');
        mountContainer.id = 'site-footer-container';
        appContainer.appendChild(mountContainer);
      }
    }

    mountContainer.innerHTML = FOOTER_TEMPLATE;

    const isHomePage = window.location.pathname.endsWith('index.html') ||
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname === '';

    // Route adjustments for index vs sub-pages
    if (isHomePage) {
      const links = mountContainer.querySelectorAll('.footer-links a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('index.html#')) {
          link.setAttribute('href', href.replace('index.html', ''));
        }
      });
    }

    // Back to top smooth scroll
    const backToTop = document.getElementById('footerBackToTop');
    if (backToTop) {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  if (document.getElementById('site-footer-container')) {
    mountFooter();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountFooter);
  } else {
    mountFooter();
  }
})();
