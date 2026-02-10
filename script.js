// Тема и язык: загрузка из localStorage
(function () {
  var root = document.documentElement;
  var theme = localStorage.getItem('portfolio-theme') || 'dark';
  var lang = localStorage.getItem('portfolio-lang') || 'ru';
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-lang', lang);
  root.setAttribute('lang', lang === 'ru' ? 'ru' : 'en');
})();

// Анимация героя при загрузке
(function () {
  function revealHero() {
    document.body.classList.remove('hero-pending');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(revealHero, 80); });
  } else {
    setTimeout(revealHero, 80);
  }
})();

// Появление блоков при прокрутке (Intersection Observer)
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
  els.forEach(function (el) { observer.observe(el); });
})();

// Переключатель темы (светлая / тёмная)
(function () {
  var btn = document.querySelector('.control-theme');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
})();

// Переключатель языка (RU / EN) — клик по «Русский» или «English» в выпадающем списке
(function () {
  var options = document.querySelectorAll('.nav-lang-option[data-lang]');
  if (!options.length) return;
  options.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang') || 'ru';
      var root = document.documentElement;
      root.setAttribute('data-lang', lang);
      root.setAttribute('lang', lang === 'ru' ? 'ru' : 'en');
      localStorage.setItem('portfolio-lang', lang);
    });
  });
})();

// Плавная прокрутка и подсветка активного раздела в навигации
(function () {
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    const targets = document.querySelectorAll('section[id], article[id]');
    const scrollY = window.scrollY;
    const offset = 100;

    let currentId = null;
    targets.forEach(function (el) {
      const id = el.getAttribute('id');
      const top = el.offsetTop - offset;
      const height = el.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + currentId);
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
})();

// Карусель Power BI (iframe): автопроигрывание, пауза по наведению, точки для переключения
(function () {
  const carousel = document.getElementById('powerbi-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const prevBtn = carousel.querySelector('.carousel-arrow--prev');
  const nextBtn = carousel.querySelector('.carousel-arrow--next');

  if (!track || !slides.length) return;

  let index = 0;
  const total = slides.length;
  const autoplayMs = parseInt(carousel.getAttribute('data-autoplay') || '0', 10);
  let autoplayTimer = null;

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Слайд ' + (i + 1));
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        goTo(i);
        if (autoplayMs > 0) resetAutoplay();
      });
      dotsContainer.appendChild(btn);
    }
  }

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    if (dotsContainer) {
      dotsContainer.querySelectorAll('button').forEach(function (dot, j) {
        dot.classList.toggle('active', j === index);
      });
    }
  }

  function next() {
    goTo(index + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, autoplayMs);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    startAutoplay();
  }

  if (autoplayMs > 0) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(index - 1); if (autoplayMs > 0) resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(index + 1); if (autoplayMs > 0) resetAutoplay(); });

  buildDots();
  goTo(0);
  if (autoplayMs > 0) startAutoplay();
})();

// Карусель PNG Power BI: точки, стрелки
(function () {
  const carousel = document.getElementById('powerbi-carousel-png');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const prevBtn = carousel.querySelector('.carousel-arrow--prev');
  const nextBtn = carousel.querySelector('.carousel-arrow--next');

  if (!track || !slides.length) return;

  let index = 0;
  const total = slides.length;
  const autoplayMs = parseInt(carousel.getAttribute('data-autoplay') || '0', 10);
  let autoplayTimer = null;

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Слайд ' + (i + 1));
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        goTo(i);
        if (autoplayMs > 0) resetAutoplay();
      });
      dotsContainer.appendChild(btn);
    }
  }

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = 'translateX(-' + index * 100 + '%)';
    if (dotsContainer) {
      dotsContainer.querySelectorAll('button').forEach(function (dot, j) {
        dot.classList.toggle('active', j === index);
      });
    }
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, autoplayMs);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    startAutoplay();
  }

  if (autoplayMs > 0) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); if (autoplayMs > 0) resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); if (autoplayMs > 0) resetAutoplay(); });

  buildDots();
  goTo(0);
  if (autoplayMs > 0) startAutoplay();
})();

// Появление блоков «Мои работы» при скролле
(function () {
  const blocks = document.querySelectorAll('.work-block');
  if (!blocks.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
  );

  blocks.forEach(function (block) {
    observer.observe(block);
  });
})();

// Анимация появления карточек Power BI Skills и SQL Skills
(function () {
  const skills = document.querySelectorAll('.powerbi-skill, .sql-skill, .python-skill');
  if (!skills.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
  );

  skills.forEach(function (skill) {
    observer.observe(skill);
  });
})();

// Вкладки Python: Визуализация | Анализ данных | Machine Learning
(function () {
  const wrap = document.getElementById('python-notebook-wrap');
  if (!wrap) return;

  const tabs = wrap.querySelectorAll('.python-notebook-tab');
  const panels = wrap.querySelectorAll('.python-notebook-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const panelId = tab.getAttribute('data-python-tab');
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('hidden', '');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = wrap.querySelector('.python-notebook-panel[data-python-panel="' + panelId + '"]');
      if (panel) {
        panel.classList.add('active');
        panel.removeAttribute('hidden');
      }
    });
  });
})();

// Контакты: при наведении показывается почта, по клику — копирование в буфер
(function () {
  var link = document.querySelector('.contact-link-email');
  if (!link) return;
  var email = link.getAttribute('data-email') || 'forstudyde@gmail.com';
  var label = link.querySelector('.contact-email-label');
  var lang = function () { return document.documentElement.getAttribute('data-lang') || 'ru'; };
  var copiedRu = 'Скопировано!';
  var copiedEn = 'Copied!';

  link.addEventListener('click', function (e) {
    e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        if (label) {
          var text = label.textContent;
          label.textContent = lang() === 'ru' ? copiedRu : copiedEn;
          link.classList.add('contact-email-copied');
          setTimeout(function () {
            label.innerHTML = '<span class="lang-ru">Email</span><span class="lang-en">Email</span>';
            link.classList.remove('contact-email-copied');
          }, 1800);
        }
      });
    } else {
      window.location.href = 'mailto:' + email;
    }
  });
})();

// Аватар: по клику открыть фото в оверлее, закрыть по фону / крестику / Escape
(function () {
  var btn = document.querySelector('.avatar-btn');
  var lightbox = document.getElementById('avatar-lightbox');
  var backdrop = lightbox && lightbox.querySelector('.avatar-lightbox-backdrop');
  var closeBtn = lightbox && lightbox.querySelector('.avatar-lightbox-close');

  function open() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEscape);
  }
  function close() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEscape);
  }
  function onEscape(e) {
    if (e.key === 'Escape') close();
  }

  if (btn) btn.addEventListener('click', open);
  if (backdrop) backdrop.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);
})();

// Фон: квадрат из частиц на весь блок героя, реакция на курсор
(function () {
  var canvas = document.getElementById('particle-sphere');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var angle = 0;
  var mouseClientX = -9999;
  var mouseClientY = -9999;
  var W = 0;
  var H = 0;
  var centerX = 0;
  var centerY = 0;
  var dotRadius = 1.4;
  var particleCount = 1800;
  var repelRadius = 110;
  var repelStrength = 28;
  var squareSize = 2;

  function rand() { return Math.random(); }

  function initParticles() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      var x = (rand() - 0.5) * squareSize;
      var y = (rand() - 0.5) * squareSize;
      particles.push({ x: x, y: y });
    }
  }

  function toScreen(p) {
    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);
    var rx = p.x * cosA - p.y * sinA;
    var ry = p.x * sinA + p.y * cosA;
    var scale = (Math.min(W, H) * 0.92) / squareSize;
    return { sx: centerX + rx * scale, sy: centerY + ry * scale };
  }

  function getDotColor() {
    var style = getComputedStyle(document.documentElement);
    var accent = style.getPropertyValue('--accent').trim() || '#f59e0b';
    var hex = accent.replace('#', '');
    var r = parseInt(hex.substr(0, 2), 16);
    var g = parseInt(hex.substr(2, 2), 16);
    var b = parseInt(hex.substr(4, 2), 16);
    var isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
    var a = isDark ? 0.5 : 0.4;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  function draw() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    if (W <= 0 || H <= 0) {
      W = window.innerWidth;
      H = Math.min(window.innerHeight, 560);
    }
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }
    centerX = W / 2;
    centerY = H / 2;
    ctx.clearRect(0, 0, W, H);
    var color = getDotColor();
    ctx.fillStyle = color;
    angle += 0.0004;
    var rect = canvas.getBoundingClientRect();
    var mx = mouseClientX - rect.left;
    var my = mouseClientY - rect.top;
    var mouseInCanvas = mx >= 0 && mx <= W && my >= 0 && my <= H;
    if (!mouseInCanvas) { mx = -9999; my = -9999; }
    var i = 0;
    while (i < particles.length) {
      var p = particles[i];
      var scr = toScreen(p);
      var sx = scr.sx;
      var sy = scr.sy;
      var dx = sx - mx;
      var dy = sy - my;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < repelRadius && dist > 2) {
        var push = (1 - dist / repelRadius) * repelStrength;
        var nx = dx / dist;
        var ny = dy / dist;
        sx += nx * push;
        sy += ny * push;
      }
      ctx.beginPath();
      ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
      ctx.fill();
      i++;
    }
    requestAnimationFrame(draw);
  }

  function onResize() {
    var rect = canvas.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    centerX = W / 2;
    centerY = H / 2;
  }

  window.addEventListener('mousemove', function (e) {
    mouseClientX = e.clientX;
    mouseClientY = e.clientY;
  });
  window.addEventListener('resize', onResize);

  initParticles();
  onResize();
  function startDraw() {
    var rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      draw();
      return;
    }
    requestAnimationFrame(startDraw);
  }
  requestAnimationFrame(startDraw);
})();
