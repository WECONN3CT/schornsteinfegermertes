/**
 * MODERNE SCHORNSTEINFEGER MERTES WEBSEITE
 * JavaScript für Animationen und Interaktionen
 */

(function() {
  'use strict';

  // ========================================
  // INITIALIZATION
  // ========================================

  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initScrollToTop();
    initMobileMenu();
    initSmoothScroll();
    initParallax();
    initBeforeAfterSlider();
    initHeroVideoAutoplay();
    initVideoOverlay();
    initVideoCtaFullscreen();
  });

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Active link highlighting
    function highlightActiveLink() {
      const currentPath = window.location.pathname;
      navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath ||
            (linkPath !== '/' && currentPath.includes(linkPath))) {
          link.classList.add('active');
        } else if (linkPath === '/' && currentPath === '/index.html') {
          link.classList.add('active');
        }
      });
    }

    highlightActiveLink();
  }

  // ========================================
  // BEFORE/AFTER SLIDER
  // ========================================
  function initBeforeAfterSlider() {
    const containers = document.querySelectorAll('.before-after');
    containers.forEach(container => {
      const slider = container.querySelector('.before-after__slider');
      const afterLayer = container.querySelector('.before-after__after');
      const divider = container.querySelector('.before-after__divider');
      const handle = container.querySelector('.before-after__handle');
      if (!slider || !afterLayer) return;
      const update = () => {
        const value = parseInt(slider.value, 10) || 50;
        container.style.setProperty('--pos', `${value}%`);
      };
      slider.addEventListener('input', update);
      slider.addEventListener('change', update);
      update();

      // Pointer-Handling für vertikale Variante (und horizontal fallback)
      const isVertical = container.classList.contains('before-after--vertical');
      let dragging = false;
      let lastEvt = null;
      let rafId = 0;
      let cachedRect = null;
      const clamp = (v) => Math.min(100, Math.max(0, v));
      const applyFromEvent = (e, rect) => {
        let clientX, clientY;
        if (e.touches && e.touches[0]) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }
        let percent;
        if (isVertical) {
          percent = ((clientY - rect.top) / rect.height) * 100;
        } else {
          percent = ((clientX - rect.left) / rect.width) * 100;
        }
        percent = clamp(percent);
        const rounded = Math.round(percent);
        if (String(slider.value) !== String(rounded)) {
          slider.value = String(rounded);
          container.style.setProperty('--pos', `${percent}%`);
        }
      };
      const onPointerDown = (e) => {
        dragging = true;
        cachedRect = container.getBoundingClientRect();
        lastEvt = e;
        applyFromEvent(e, cachedRect);
        document.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('pointerup', onPointerUp, { passive: true, once: true });
        document.addEventListener('pointercancel', onPointerUp, { passive: true, once: true });
      };
      const onPointerMove = (e) => {
        if (!dragging) return;
        lastEvt = e;
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            applyFromEvent(lastEvt, cachedRect || container.getBoundingClientRect());
            rafId = 0;
          });
        }
      };
      const onPointerUp = () => {
        dragging = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        document.removeEventListener('pointermove', onPointerMove);
      };
      window.addEventListener('resize', () => { if (dragging) cachedRect = container.getBoundingClientRect(); }, { passive: true });
      container.addEventListener('pointerdown', onPointerDown);
    });
  }

  // ========================================
  // VIDEO OVERLAY PLAY BUTTON
  // ========================================
  function initVideoOverlay() {
    const containers = document.querySelectorAll('#ueberuns-video');
    containers.forEach(container => {
      const video = container.querySelector('video');
      const button = container.querySelector('.video-play-overlay');
      if (!video || !button) return;

      const showOverlay = () => {
        container.classList.remove('playing');
      };
      const hideOverlay = () => {
        container.classList.add('playing');
      };

      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.catch(() => {});
        }
      });

      video.addEventListener('play', hideOverlay);
      video.addEventListener('pause', showOverlay);
      video.addEventListener('ended', showOverlay);

      // Initial state
      if (video.paused) {
        showOverlay();
      } else {
        hideOverlay();
      }
    });
  }

  // ========================================
  // HERO VIDEO AUTOPLAY (robust)
  // ========================================
  function initHeroVideoAutoplay() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;
    // Ensure properties for iOS/Safari autoplay
    heroVideo.muted = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.playsInline = true;
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Retry shortly if autoplay was momentarily blocked
          setTimeout(() => heroVideo.play().catch(() => {}), 250);
        });
      }
    };

    heroVideo.addEventListener('loadedmetadata', tryPlay);
    heroVideo.addEventListener('canplay', tryPlay, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tryPlay();
    });
    tryPlay();
  }

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================

  function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Stop observing after animation
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealOnScroll.observe(element);
    });

    // Stagger animations for grid items
    const staggeredElements = document.querySelectorAll('.grid > *');
    staggeredElements.forEach((element, index) => {
      element.style.transitionDelay = `${index * 0.1}s`;
    });

    // Werte-Karten nacheinander einfliegen lassen, getriggert durch die oberste Karte
    const valuesGrid = document.querySelector('.values-grid');
    if (valuesGrid) {
      const firstCard = valuesGrid.querySelector('.card');
      if (firstCard) {
        const gridObserver = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              valuesGrid.classList.add('stagger-in');
              obs.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.4,
          rootMargin: '0px 0px -10% 0px'
        });
        gridObserver.observe(firstCard);
      }
    }
  }

  // ========================================
  // SCROLL TO TOP BUTTON
  // ========================================

  function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');

    if (!scrollBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // MOBILE MENU
  // ========================================

  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!menuToggle || !navMenu) return;

    // Toggle menu
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');

      // Animate hamburger icon
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');

        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');

        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================

  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Skip smooth scroll for fullscreen video CTA
        if (this.dataset && this.dataset.videoFullscreen === 'true') {
          return;
        }
        const href = this.getAttribute('href');

        // Skip if it's just '#'
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ========================================
  // PARALLAX EFFECT
  // ========================================

  function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // ========================================
  // CTA: Play video in fullscreen
  // ========================================
  function initVideoCtaFullscreen() {
    const link = document.querySelector('#unsere-arbeit a[href="#ueberuns-video"][data-video-fullscreen="true"]');
    const container = document.getElementById('ueberuns-video');
    if (!link || !container) return;
    const video = container.querySelector('video');
    if (!video) return;

    const isFsActive = () => {
      return document.fullscreenElement === container ||
             document.webkitFullscreenElement === container;
    };

    const scrollToSection = () => {
      const navbar = document.querySelector('.navbar');
      const offset = navbar ? navbar.offsetHeight + 20 : 90;
      const rect = container.getBoundingClientRect();
      const y = rect.top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    const requestFs = async () => {
      try {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (video.requestFullscreen) {
          await video.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          await container.webkitRequestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          await video.webkitRequestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          // iOS Safari
          video.webkitEnterFullscreen();
        }
      } catch (err) {
        // ignore fullscreen errors
      }
    };

    const exitFs = async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else if (document.webkitFullscreenElement) {
          await document.webkitExitFullscreen();
        }
      } catch (err) {
        // ignore exit errors
      } finally {
        scrollToSection();
      }
    };

    // Exit button overlay
    const exitBtn = container.querySelector('.video-exit-overlay');
    if (exitBtn) {
      exitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        exitFs();
      });
    }

    // Fullscreen change handler (enter/exit)
    const onFsChange = () => {
      if (isFsActive()) {
        container.classList.add('is-fullscreen');
      } else {
        container.classList.remove('is-fullscreen');
        // ensure we land back at the section on exit
        scrollToSection();
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);

    // iOS Safari: fired when native fullscreen ends
    video.addEventListener('webkitendfullscreen', () => {
      scrollToSection();
    });

    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Start playback
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {});
      }
      // Try fullscreen
      requestFs();
    });

    // Also exit fullscreen and scroll back when video ends
    video.addEventListener('ended', () => {
      if (isFsActive()) {
        exitFs();
      } else {
        scrollToSection();
      }
    });
  }

  // ========================================
  // LAZY LOADING IMAGES
  // ========================================

  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // FORM VALIDATION (for contact page)
  // ========================================

  function initFormValidation() {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const message = form.querySelector('textarea[name="message"]');

        let isValid = true;

        // Clear previous errors
        form.querySelectorAll('.error').forEach(error => error.remove());

        // Validate name
        if (!name.value.trim()) {
          showError(name, 'Bitte geben Sie Ihren Namen ein');
          isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
          showError(email, 'Bitte geben Sie Ihre E-Mail-Adresse ein');
          isValid = false;
        } else if (!isValidEmail(email.value)) {
          showError(email, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
          isValid = false;
        }

        // Validate message
        if (!message.value.trim()) {
          showError(message, 'Bitte geben Sie eine Nachricht ein');
          isValid = false;
        }

        if (isValid) {
          // Submit form or send via AJAX
          console.log('Form is valid, ready to submit');
          // You can add AJAX submission here
          showSuccess(form, 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
          form.reset();
        }
      });
    });
  }

  function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = '#dc3545';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    input.parentElement.appendChild(error);
    input.style.borderColor = '#dc3545';
  }

  function showSuccess(form, message) {
    const success = document.createElement('div');
    success.className = 'success';
    success.style.cssText = `
      background: #28a745;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      text-align: center;
    `;
    success.textContent = message;
    form.appendChild(success);

    setTimeout(() => {
      success.remove();
    }, 5000);
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // ========================================
  // COUNTER ANIMATION (for stats)
  // ========================================

  function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          const duration = parseInt(counter.dataset.duration) || 2000;
          const increment = target / (duration / 16);

          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // ========================================
  // TYPING EFFECT (optional for hero)
  // ========================================

  function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');

    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.opacity = '1';

      let index = 0;
      const speed = 50;

      function type() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        }
      }

      // Start typing after a delay
      setTimeout(type, 500);
    });
  }

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================

  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Add to window object for debugging
  window.MertesWebsite = {
    initFormValidation,
    initCounterAnimation,
    initTypingEffect,
    initLazyLoading
  };

})();
