/**
 * ==========================================================================
 * FUTURE MIND STUDIO — FULL PORTFOLIO & CONTENT PROTECTION ENGINE
 * ==========================================================================
 * Comprehensive client-side protection for creative designs, original client
 * previews, branding mockups, and intellectual property.
 *
 * Capabilities:
 *  1. Disables context menu (right-click / long-press) on non-form elements.
 *  2. Prevents image and media dragging globally across desktop and mobile.
 *  3. Prevents unauthorized text selection on portfolio descriptions & titles.
 *  4. Intercepts common copy, save, view-source, and inspect shortcuts.
 *  5. Automatically protects dynamically loaded content via MutationObserver.
 *  6. Whitelists contact forms, inputs, and textareas for normal interaction.
 * ==========================================================================
 */

(function () {
  'use strict';

  // Helper: check if element is an editable form control or allows user input
  function isEditableTarget(target) {
    if (!target || !(target instanceof Element)) return false;
    return Boolean(
      target.closest(
        'input, textarea, select, [contenteditable="true"], [contenteditable=""]'
      )
    );
  }

  /* --------------------------------------------------------------------------
     1. DISABLE CONTEXT MENU (RIGHT-CLICK / LONG PRESS)
     -------------------------------------------------------------------------- */
  function onContextMenu(e) {
    if (isEditableTarget(e.target)) {
      // Allow normal context menu for copy/pasting inside form fields
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  document.addEventListener('contextmenu', onContextMenu, { capture: true });

  /* --------------------------------------------------------------------------
     2. DISABLE IMAGE & MEDIA DRAGGING
     -------------------------------------------------------------------------- */
  function onDragStart(e) {
    // Prevent dragging images, links, or visual assets
    const tag = e.target && e.target.nodeName;
    if (
      tag === 'IMG' ||
      tag === 'SVG' ||
      tag === 'VIDEO' ||
      tag === 'CANVAS' ||
      (e.target && e.target.closest('img, .work-img-container, .portal-container, .floating-asset, .work-card'))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  document.addEventListener('dragstart', onDragStart, { capture: true });

  /* --------------------------------------------------------------------------
     3. DISABLE UNAUTHORIZED TEXT SELECTION
     -------------------------------------------------------------------------- */
  function onSelectStart(e) {
    if (isEditableTarget(e.target)) {
      return true;
    }
    e.preventDefault();
    return false;
  }

  document.addEventListener('selectstart', onSelectStart, { capture: true });

  /* --------------------------------------------------------------------------
     4. PREVENT COMMON COPY, SAVE & INSPECT SHORTCUTS
     -------------------------------------------------------------------------- */
  function onKeyDown(e) {
    if (isEditableTarget(e.target)) {
      // Normal typing, Ctrl+C, Ctrl+V, Ctrl+A inside input/textarea fields
      return;
    }

    const key = (e.key || '').toLowerCase();
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Block Ctrl/Cmd + C (Copy)
    if (isCtrlOrCmd && key === 'c') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block Ctrl/Cmd + S (Save Page / Save Asset)
    if (isCtrlOrCmd && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block Ctrl/Cmd + U (View Source)
    if (isCtrlOrCmd && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block Ctrl/Cmd + P (Print / Save to PDF)
    if (isCtrlOrCmd && key === 'p') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block F12 (Developer Tools)
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block Ctrl/Cmd + Shift + I (Inspect)
    // Block Ctrl/Cmd + Shift + J (Console)
    // Block Ctrl/Cmd + Shift + C (Element Inspector)
    if (isCtrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Best-effort PrintScreen deterrent
    if (key === 'printscreen' || e.keyCode === 44) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('');
        }
      } catch (err) {
        // Clipboard access might require active user permission; safe fallback
      }
    }
  }

  document.addEventListener('keydown', onKeyDown, { capture: true });

  /* --------------------------------------------------------------------------
     5. ENFORCE DRAGGABLE="FALSE" ON ALL MEDIA (STATIC & DYNAMIC)
     -------------------------------------------------------------------------- */
  function enforceImageProtection(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const images = scope.querySelectorAll('img, svg, canvas');
    images.forEach(img => {
      if (img.getAttribute('draggable') !== 'false') {
        img.setAttribute('draggable', 'false');
      }
      // Disable callout on iOS Safari
      img.style.webkitTouchCallout = 'none';
      img.style.userSelect = 'none';
    });
  }

  // Initial enforcement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => enforceImageProtection(document));
  } else {
    enforceImageProtection(document);
  }

  // MutationObserver for dynamically inserted elements / cards
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if (node.nodeName === 'IMG' || node.nodeName === 'SVG') {
              node.setAttribute('draggable', 'false');
              node.style.webkitTouchCallout = 'none';
              node.style.userSelect = 'none';
            } else if (node.querySelectorAll) {
              enforceImageProtection(node);
            }
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
