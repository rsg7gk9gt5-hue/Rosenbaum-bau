/* ===== LANGUAGE SWITCHING ===== */
function setLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('rosenbaum-lang', lang);
  document.querySelectorAll('.lang-switch button').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
  // Close on link click
  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

/* ===== LIGHTBOX ===== */
function initLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  var lightboxImg = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(function(el) {
    el.addEventListener('click', function() {
      var src = el.dataset.lightbox || el.querySelector('img').src;
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ===== REFERENCE FILTER ===== */
function initFilter() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.reference-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      cards.forEach(function(card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  var elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(function(el) { observer.observe(el); });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var lang = document.documentElement.lang || 'de';
    var msg = lang === 'en'
      ? 'Thank you for your message! We will get back to you shortly.'
      : 'Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.';
    alert(msg);
    form.reset();
  });
}

/* ===== ACTIVE NAV ===== */
function setActiveNav() {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', function() {
  // Restore language
  var savedLang = localStorage.getItem('rosenbaum-lang') || 'de';
  setLang(savedLang);

  // Lang switch buttons
  document.querySelectorAll('.lang-switch button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setLang(btn.dataset.lang);
    });
  });

  initMobileMenu();
  initLightbox();
  initFilter();
  initScrollAnimations();
  initContactForm();
  setActiveNav();
});
