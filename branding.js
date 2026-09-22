/**
 * FUTURE MIND STUDIO — BRANDING DISCOVERY EXPERIENCE JAVASCRIPT
 * Interactive consultation, constellation network, dynamic configurator & animations
 */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-enabled');

  /* ==========================================================================
     1. CUSTOM INTERACTIVE CURSOR WITH LERP LAGGING
     ========================================================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  const lerpFactor = 0.15;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }

    document.body.style.setProperty('--mouse-x', `${mouseX}px`);
    document.body.style.setProperty('--mouse-y', `${mouseY}px`);
  });

  const handleTouch = (e) => {
    if (e.touches && e.touches.length > 0) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      document.body.style.setProperty('--mouse-x', `${mouseX}px`);
      document.body.style.setProperty('--mouse-y', `${mouseY}px`);
    }
  };
  document.addEventListener('touchstart', handleTouch, { passive: true });
  document.addEventListener('touchmove', handleTouch, { passive: true });

  let activeMagnetic = null;

  function updateCursor() {
    let targetX = mouseX;
    let targetY = mouseY;

    if (cursorRing) {
      if (activeMagnetic) {
        document.body.classList.add('hover-magnetic');
        const rect = activeMagnetic.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
        
        const style = window.getComputedStyle(activeMagnetic);
        cursorRing.style.width = `${rect.width + 16}px`;
        cursorRing.style.height = `${rect.height + 16}px`;
        cursorRing.style.borderRadius = style.borderRadius;
      } else {
        document.body.classList.remove('hover-magnetic');
        cursorRing.style.width = '';
        cursorRing.style.height = '';
        cursorRing.style.borderRadius = '';
      }

      ringX += (targetX - ringX) * lerpFactor;
      ringY += (targetY - ringY) * lerpFactor;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }

    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  const setupHoverEffects = () => {
    const clickables = document.querySelectorAll(
      'a, button, .goal-pill, .btn-biz-type, .config-item-card, .touchpoint-node, .where-card'
    );
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('hover-clickable');
        if (el.tagName === 'BUTTON' || el.classList.contains('btn-primary') || el.classList.contains('btn-header')) {
          activeMagnetic = el;
        }
      });

      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hover-clickable');
        if (activeMagnetic === el) {
          activeMagnetic = null;
        }
      });
    });
  };
  setupHoverEffects();

  /* ==========================================================================
     2. FLOATING HERO OBJECTS — SUBTLE 3D PARALLAX & PHYSICS
     ========================================================================== */
  const heroObjects = document.querySelectorAll('.hero-mock-object');
  if (heroObjects.length > 0) {
    const heroSection = document.querySelector('.branding-hero');

    const heroPhysics = [
      { el: heroObjects[0], depthX: 18, depthY: 14 },
      { el: heroObjects[1], depthX: -22, depthY: 16 },
      { el: heroObjects[2], depthX: 14, depthY: -18 },
      { el: heroObjects[3], depthX: -16, depthY: -12 },
      { el: heroObjects[4], depthX: 20, depthY: -15 },
      { el: heroObjects[5], depthX: -18, depthY: 20 },
      { el: heroObjects[6], depthX: 10, depthY: 10 }
    ];

    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const normX = (e.clientX - centerX) / centerX;
      const normY = (e.clientY - centerY) / centerY;

      heroPhysics.forEach(item => {
        if (!item.el) return;
        const tx = normX * item.depthX;
        const ty = normY * item.depthY;
        const baseTransform = item.el.getAttribute('data-base-rot') || '';
        item.el.style.transform = `translate3d(${tx}px, ${ty}px, 0px) ${baseTransform}`;
      });
    });

    // Save initial rotation
    heroObjects.forEach(obj => {
      const style = window.getComputedStyle(obj);
      const matrix = style.transform;
      obj.setAttribute('data-base-rot', obj.style.transform || '');
    });
  }

  /* ==========================================================================
     3. SECTION 04: "WHERE ARE YOU NOW?" INTERACTIVE CARDS
     ========================================================================== */
  const whereCards = document.querySelectorAll('.where-card');
  whereCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      whereCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });

    const selectBtn = card.querySelector('.btn-select-stage');
    if (selectBtn) {
      selectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const stage = card.getAttribute('data-stage');
        applyStageToConfigurator(stage);
      });
    }
  });

  function applyStageToConfigurator(stage) {
    // Map stage to pieces
    const stageMap = {
      'starting': ['logo', 'business-card', 'profile', 'website'],
      'brand': ['logo', 'business-card', 'profile', 'catalog', 'website'],
      'products': ['packaging', 'tag', 'swatch', 'catalog', 'website'],
      'growing': ['profile', 'catalog', 'packaging', 'banner', 'website']
    };

    const targetItems = stageMap[stage] || [];
    if (targetItems.length > 0) {
      syncConfiguratorWithList(targetItems);
      showToast(`Selected stage applied: ${targetItems.length} branding pieces loaded.`);
      
      // Smooth scroll to configurator
      const configSec = document.getElementById('configurator');
      if (configSec) {
        configSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  /* ==========================================================================
     4. SECTION 05: "WHAT ARE YOU TRYING TO ACHIEVE?" (Goal Switcher)
     ========================================================================== */
  const goalPills = document.querySelectorAll('.goal-pill');
  const goalData = {
    'look-professional': {
      tag: 'Goal / Credibility & Trust',
      title: 'LOOK PROFESSIONAL',
      desc: 'When pitching clients, first impressions dictate perceived value. A fragmented appearance makes your business feel amateur, regardless of how great your offering is.',
      pieces: ['Logo Design', 'Business Card', 'Letterhead', 'Company Profile', 'Website'],
      keys: ['logo', 'business-card', 'profile', 'website']
    },
    'launch-brand': {
      tag: 'Goal / Market Debut',
      title: 'LAUNCH A BRAND',
      desc: 'Launching a new venture requires an instant, indelible identity. You need the complete foundation to present your vision with supreme confidence from day zero.',
      pieces: ['Logo Identity System', 'Company Profile', 'Packaging Design', 'Product Tags', 'Custom Website'],
      keys: ['logo', 'profile', 'packaging', 'tag', 'website']
    },
    'sell-product': {
      tag: 'Goal / Retail & Direct Commerce',
      title: 'SELL A PRODUCT',
      desc: 'Customers touch, evaluate, and judge physical products by their packaging and tags before they even experience the quality inside. Turn browsers into buyers.',
      pieces: ['Packaging Design', 'Product Tags', 'Swatch Cards', 'Product Catalog', 'Custom Website'],
      keys: ['packaging', 'tag', 'swatch', 'catalog', 'website']
    },
    'present-company': {
      tag: 'Goal / Corporate & Institutional',
      title: 'PRESENT MY COMPANY',
      desc: 'Institutional investors, board members, and enterprise buyers demand a cohesive corporate documentation system that commands respect.',
      pieces: ['Logo Identity System', 'Business Card & Stationery', 'Company Profile Deck', 'Corporate Website'],
      keys: ['logo', 'business-card', 'profile', 'website']
    },
    'enter-wholesale': {
      tag: 'Goal / B2B & Bulk Distribution',
      title: 'ENTER WHOLESALE',
      desc: 'Wholesale buyers need far more than a logo. Your brand needs a clear, standardized system for presenting your company credentials, technical specifications, and collections.',
      pieces: ['Company Profile', 'Product Catalog', 'Swatch Card', 'Product Tags', 'Custom Website'],
      keys: ['profile', 'catalog', 'swatch', 'tag', 'website']
    },
    'go-digital': {
      tag: 'Goal / Online Scale & Authority',
      title: 'GO DIGITAL',
      desc: 'Elevate your business from local awareness into a digital powerhouse with responsive UX design, strategic storytelling, and seamless lead generation.',
      pieces: ['Digital Logo Guidelines', 'Interactive Web Catalog', 'Responsive Studio Website'],
      keys: ['logo', 'catalog', 'website']
    }
  };

  const achieveTag = document.getElementById('achieveTag');
  const achieveTitle = document.getElementById('achieveTitle');
  const achieveDesc = document.getElementById('achieveDesc');
  const achieveFlow = document.getElementById('achieveFlow');
  const btnApplyGoal = document.getElementById('btnApplyGoal');

  let currentGoalKey = 'enter-wholesale';

  goalPills.forEach(pill => {
    pill.addEventListener('click', () => {
      goalPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Auto-scroll tapped pill to center on mobile view
      if (window.innerWidth <= 768) {
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }

      const goalKey = pill.getAttribute('data-goal');
      currentGoalKey = goalKey;
      const data = goalData[goalKey];

      if (data && achieveTitle && achieveDesc && achieveFlow) {
        achieveTag.textContent = data.tag;
        achieveTitle.textContent = data.title;
        achieveDesc.textContent = data.desc;

        // Render pieces
        achieveFlow.innerHTML = data.pieces.map((p, idx) => `
          <div class="flow-item">
            ${idx > 0 ? '<span class="plus-sym">+</span>' : ''}
            <div class="item-badge">${p}</div>
          </div>
        `).join('');
      }
    });
  });

  if (btnApplyGoal) {
    btnApplyGoal.addEventListener('click', () => {
      const data = goalData[currentGoalKey];
      if (data && data.keys) {
        syncConfiguratorWithList(data.keys);
        showToast(`Loaded "${data.title}" pieces into your Brand System.`);
        const configSec = document.getElementById('configurator');
        if (configSec) {
          configSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  /* ==========================================================================
     5. SECTION 08: "FIND YOUR BUSINESS TYPE" (Industry Paths)
     ========================================================================== */
  const bizTypeBtns = document.querySelectorAll('.btn-biz-type');
  const bizTypeData = {
    'textile': {
      title: 'Textile & Garment Business',
      desc: 'Essential stack for fabric manufacturers, mills, and garment suppliers to present collections and textures.',
      steps: ['Logo', 'Company Profile', 'Product Catalog', 'Swatch Card', 'Tags', 'Website'],
      keys: ['logo', 'profile', 'catalog', 'swatch', 'tag', 'website'],
      note: 'Buyers need tactile sample swatches and clear garment tags alongside a technical company profile.'
    },
    'fashion': {
      title: 'Fashion Brand & Apparel Label',
      desc: 'Consumer-facing identity focused on tactile luxury, memorable packaging, and lifestyle digital presence.',
      steps: ['Logo', 'Packaging', 'Tags', 'Catalog', 'Website'],
      keys: ['logo', 'packaging', 'tag', 'catalog', 'website'],
      note: 'Fashion consumers judge quality immediately by hang-tags, unboxing packaging, and website aesthetics.'
    },
    'manufacturer': {
      title: 'Industrial & Export Manufacturer',
      desc: 'Built for enterprise credibility, supply chain presentations, and international corporate bidding.',
      steps: ['Logo', 'Business Card', 'Letterhead', 'Company Profile', 'Product Catalog', 'Website'],
      keys: ['logo', 'business-card', 'profile', 'catalog', 'website'],
      note: 'Formal corporate stationery and an extensive technical profile are vital for B2B supplier approvals.'
    },
    'retail': {
      title: 'Retail Business & Storefront',
      desc: 'Created for foot-traffic visibility, memorable customer carry-bags, and local discovery.',
      steps: ['Logo', 'Packaging', 'Tags', 'Flex Banner', 'Website'],
      keys: ['logo', 'packaging', 'tag', 'banner', 'website'],
      note: 'Physical signage banners and branded retail packaging turn in-store visitors into lifelong loyalists.'
    },
    'startup': {
      title: 'Modern Tech & Modern Startup',
      desc: 'Lean, authoritative identity crafted for investor pitch decks, rapid hiring, and digital traction.',
      steps: ['Logo', 'Business Card', 'Company Profile', 'Website'],
      keys: ['logo', 'business-card', 'profile', 'website'],
      note: 'Focus entirely on sharp identity, investor-grade company deck, and a lightning-fast responsive website.'
    }
  };

  const bizPathTitle = document.getElementById('bizPathTitle');
  const bizPathDesc = document.getElementById('bizPathDesc');
  const bizPathFlow = document.getElementById('bizPathFlow');
  const bizPathNote = document.getElementById('bizPathNote');
  const btnSyncBizPath = document.getElementById('btnSyncBizPath');

  let currentBizKey = 'textile';

  bizTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bizTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Auto-scroll tapped pill to center on mobile view
      if (window.innerWidth <= 768) {
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }

      const bizKey = btn.getAttribute('data-biz');
      currentBizKey = bizKey;
      const data = bizTypeData[bizKey];

      if (data && bizPathTitle && bizPathFlow) {
        bizPathTitle.textContent = data.title;
        bizPathDesc.textContent = data.desc;
        bizPathNote.textContent = data.note;

        bizPathFlow.innerHTML = data.steps.map((step, idx) => `
          <div class="path-step-pill">
            <span class="step-dot"></span>
            <span>${step}</span>
          </div>
          ${idx < data.steps.length - 1 ? `
            <div class="path-arrow">
              <svg viewBox="0 0 24 24" fill="none"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          ` : ''}
        `).join('');
      }
    });
  });

  if (btnSyncBizPath) {
    btnSyncBizPath.addEventListener('click', () => {
      const data = bizTypeData[currentBizKey];
      if (data && data.keys) {
        syncConfiguratorWithList(data.keys);
        showToast(`Configurator synced with ${data.title} blueprint.`);
        const configSec = document.getElementById('configurator');
        if (configSec) {
          configSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  /* ==========================================================================
     6. SECTION 10: "ONE BRAND. EVERY TOUCHPOINT" (Animated SVG Constellation)
     ========================================================================== */
  const svgNetwork = document.getElementById('touchpointSvgNetwork');
  const centerNode = document.getElementById('constellationCenter');
  const touchpointNodes = document.querySelectorAll('.touchpoint-node');

  function renderConstellationWires() {
    if (!svgNetwork || !centerNode || touchpointNodes.length === 0) return;

    svgNetwork.innerHTML = '';
    const wrapper = document.querySelector('.constellation-wrapper');
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const centerRect = centerNode.getBoundingClientRect();

    const cX = (centerRect.left - wrapperRect.left) + centerRect.width / 2;
    const cY = (centerRect.top - wrapperRect.top) + centerRect.height / 2;

    touchpointNodes.forEach((node, idx) => {
      const nodeRect = node.getBoundingClientRect();
      const nX = (nodeRect.left - wrapperRect.left) + nodeRect.width / 2;
      const nY = (nodeRect.top - wrapperRect.top) + nodeRect.height / 2;

      // Draw subtle bezier spline
      const dx = nX - cX;
      const dy = nY - cY;
      const cpX = cX + dx * 0.5 - dy * 0.1;
      const cpY = cY + dy * 0.5 + dx * 0.1;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${cX} ${cY} Q ${cpX} ${cpY} ${nX} ${nY}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', node.classList.contains('active') ? '#F4C400' : 'rgba(13, 27, 61, 0.15)');
      path.setAttribute('stroke-width', node.classList.contains('active') ? '2.5' : '1.5');
      path.setAttribute('stroke-dasharray', node.classList.contains('active') ? 'none' : '4 4');
      path.id = `wire-${idx}`;
      svgNetwork.appendChild(path);

      // Add floating pulse particle along wire if active
      if (node.classList.contains('active')) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#F4C400');
        circle.setAttribute('cx', (cX + nX) / 2);
        circle.setAttribute('cy', (cY + nY) / 2);
        svgNetwork.appendChild(circle);
      }
    });
  }

  // Hover on nodes highlights ray to center
  touchpointNodes.forEach((node, idx) => {
    node.addEventListener('mouseenter', () => {
      touchpointNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      renderConstellationWires();
    });

    node.addEventListener('mouseleave', () => {
      node.classList.remove('active');
      renderConstellationWires();
    });
  });

  // Calculate circular orbital layout for nodes
  function positionTouchpointNodes() {
    const wrapper = document.querySelector('.constellation-wrapper');
    if (!wrapper || touchpointNodes.length === 0) return;

    const w = wrapper.offsetWidth;
    const h = wrapper.offsetHeight;
    const centerX = w / 2;
    const centerY = h / 2;

    const radiusX = w > 768 ? Math.min(centerX - 100, 360) : Math.min(centerX - 40, 160);
    const radiusY = w > 768 ? Math.min(centerY - 50, 220) : Math.min(centerY - 30, 180);

    const total = touchpointNodes.length;
    touchpointNodes.forEach((node, i) => {
      const angle = (i / total) * (Math.PI * 2) - Math.PI / 2;
      const x = centerX + radiusX * Math.cos(angle) - node.offsetWidth / 2;
      const y = centerY + radiusY * Math.sin(angle) - node.offsetHeight / 2;

      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
    });

    renderConstellationWires();
  }

  positionTouchpointNodes();
  window.addEventListener('resize', () => {
    positionTouchpointNodes();
  });

  /* ==========================================================================
     7. SECTION 12: "BUILD YOUR BRAND SYSTEM" (Interactive Configurator)
     ========================================================================== */
  const configCards = document.querySelectorAll('.config-item-card');
  const dockCounter = document.getElementById('dockCounter');
  const dockPillars = document.querySelectorAll('.dock-pillar-row');
  const capsuleItems = document.getElementById('capsuleItems');
  const inquirySystemInput = document.getElementById('inquirySystem');
  const btnStartMyBrand = document.getElementById('btnStartMyBrand');

  // Item metadata
  const itemCatalog = {
    'logo': { name: 'Logo Design', pillar: 'identity' },
    'business-card': { name: 'Business Card & Letterhead', pillar: 'identity' },
    'profile': { name: 'Company Profile', pillar: 'business' },
    'catalog': { name: 'Product Catalog', pillar: 'business' },
    'packaging': { name: 'Packaging Design', pillar: 'product' },
    'swatch': { name: 'Swatch Card', pillar: 'product' },
    'tag': { name: 'Product Tags', pillar: 'product' },
    'banner': { name: 'Flex Banner', pillar: 'presence' },
    'website': { name: 'Custom Website', pillar: 'presence' }
  };

  function updateConfiguratorState() {
    const selectedCards = document.querySelectorAll('.config-item-card.selected');
    const selectedKeys = Array.from(selectedCards).map(c => c.getAttribute('data-item'));

    // Count
    if (dockCounter) {
      dockCounter.innerHTML = `<span>${selectedKeys.length}</span> Items Selected`;
    }

    // Active pillars
    const activePillars = new Set();
    selectedKeys.forEach(k => {
      if (itemCatalog[k]) activePillars.add(itemCatalog[k].pillar);
    });

    dockPillars.forEach(pRow => {
      const pName = pRow.getAttribute('data-pillar');
      if (activePillars.has(pName)) {
        pRow.classList.add('active');
      } else {
        pRow.classList.remove('active');
      }
    });

    // Update capsule preview in final inquiry
    if (capsuleItems) {
      if (selectedKeys.length > 0) {
        const names = selectedKeys.map(k => itemCatalog[k] ? itemCatalog[k].name : k);
        capsuleItems.textContent = names.join(' • ');
      } else {
        capsuleItems.textContent = 'None selected yet — select services above or choose all.';
      }
    }

    // Update hidden form field
    if (inquirySystemInput) {
      inquirySystemInput.value = selectedKeys.map(k => itemCatalog[k] ? itemCatalog[k].name : k).join(', ');
    }
  }

  // Toggle card selection
  configCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      updateConfiguratorState();
    });
  });

  // Helper to programmatically sync items
  function syncConfiguratorWithList(keys) {
    configCards.forEach(card => {
      const itemKey = card.getAttribute('data-item');
      if (keys.includes(itemKey)) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
    updateConfiguratorState();
  }

  // Quick add buttons in Section 07 (Do you really need it)
  const quickAddBtns = document.querySelectorAll('.btn-add-system-quick');
  quickAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const itemKey = btn.getAttribute('data-item');
      const targetCard = document.querySelector(`.config-item-card[data-item="${itemKey}"]`);
      if (targetCard) {
        targetCard.classList.add('selected');
        updateConfiguratorState();
        showToast(`Added ${itemCatalog[itemKey] ? itemCatalog[itemKey].name : 'item'} to your Brand System.`);
      }
    });
  });

  // CTA button "START MY BRAND"
  if (btnStartMyBrand) {
    btnStartMyBrand.addEventListener('click', () => {
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('formName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    });
  }

  // Initial run for configurator
  updateConfiguratorState();

  /* ==========================================================================
     8. FINAL INQUIRY FORM SUBMISSION
     ========================================================================== */
  const inquiryForm = document.getElementById('brandingInquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const selected = inquirySystemInput ? inquirySystemInput.value : '';

      alert(`Thank you, ${name}!\n\nYour customized brand system inquiry has been received:\n[${selected || 'All-inclusive Consultation'}]\n\nA Future Mind Studio director will review your requirements and reach out within 12 hours.`);
      inquiryForm.reset();
      updateConfiguratorState();
    });
  }

  /* ==========================================================================
     9. TOAST NOTIFICATION COMPONENT
     ========================================================================== */
  function showToast(message) {
    let toast = document.getElementById('brandingToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'brandingToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #0D1B3D;
        color: #fff;
        padding: 14px 28px;
        border-radius: 100px;
        font-size: 14px;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        border: 1px solid rgba(244, 196, 0, 0.4);
        z-index: 10002;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
        opacity: 0;
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 10px;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span style="color:#F4C400;">✦</span> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3200);
  }

  /* ==========================================================================
     10. HEADER SCROLL & MOBILE MENU (Managed by header.js)
     ========================================================================== */
  // Mobile drawer and sticky scroll behaviors are dynamically handled by header.js

  /* ==========================================================================
     11. SMOOTH SCROLLING WITH OFFSET
     ========================================================================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = headerEl ? headerEl.offsetHeight : 80;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     12. INTERSECTION OBSERVER FOR IN-VIEW REVEALS
     ========================================================================== */
  const revealCards = document.querySelectorAll(
    '.where-card, .achieve-reveal-box, .layer-step-card, .need-card, .biz-path-display-card, .comparison-side, .catalog-column, .configurator-wrapper, .final-cta-backdrop'
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealCards.forEach(el => observer.observe(el));
});
