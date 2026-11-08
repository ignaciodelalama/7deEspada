/* ==========================================================
   SIETE DE ESPADAS · Interacciones Scrollytelling (60fps GPU)
   Partículas de brasa · Desfile de 7 espadas · Carpeta 3D · Reservas WhatsApp
   ========================================================== */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = n => new Intl.NumberFormat('es-AR').format(n);
  const div = cls => {
    const d = document.createElement('div');
    d.className = cls;
    return d;
  };

  let WA_NUMBER = '5492215682330';
  const TZ = 'America/Argentina/Buenos_Aires';

  /* ==========================================================================
     PANEL DE EDICIÓN RÁPIDA · PRECIOS Y TEXTOS DE LA CARTA
     Modificá estos valores para actualizar automáticamente tanto la sección
     "El Ritual", como las hojas de la Carpeta de Cuero y el menú en texto.
     ========================================================================== */
  const PRICE = {
    adult: 45000, // Precio por persona adulta ($45.000)
    kid: 30000    // Precio para menores de 2 a 12 años ($30.000)
  };

  /* ---------- 1. Menú Principal (5 pasos) ---------- */
  const MENU = {
    intro: ['7 cortes. 7 espadas.', 'Una experiencia completa.', 'Nuestro espeto corrido.'],
    blocks: [
      { h: 'BIENVENIDA', d: 'Empanada artesanal de carne cortada a cuchillo, horneada en horno de barro.' },
      { h: 'SALAD BAR LIBRE', d: 'Ensaladas, verduras asadas y selección de quesos, fiambres y salsas.' },
      {
        h: 'LAS 7 ESPADAS',
        d: 'Siete cortes de carnes seleccionadas llegan a tu mesa, uno por uno, servidos directamente desde cada espada.',
        extra: 'Selección de achuras y embutidos.'
      },
      { h: 'BEBIDA', d: 'Un agua mineral o una gaseosa.' },
      { h: 'POSTRE O CAFE', d: 'Un postre o un café para cerrar la experiencia.' }
    ]
  };

  /* ---------- 2. Los 7 Platos de la Cocina ---------- */
  const PLATOS = [
    ['Ojo de Bife en Costra de Chimichurri & Puré de Hongos', 'Sellado a la sartén de hierro con una costra de chimi, acompañado de puré de papa trufado y emulsión de ajos asados.'],
    ['Milanesa de Bife de Chorizo “7 de Espadas”', 'Con apanado de panko y parmesano, acompañada de papas crocantes y un huevo frito a baja temperatura.'],
    ['Bondiola de Cerdo Braseada al Malbec & Boniato', 'Cocida a baja temperatura 6 horas en reducción de Malbec, con morrones asados y puré rústico de boniatos al rescoldo.'],
    ['Pechuga de Pollo Rellena & Velouté de Limón', 'Pechuga cocida a la chapa, rellena de gouda, espinacas y tomates secos, con velouté cítrica de limón y puré de choclo.'],
    ['Trucha de la Patagonia a la Brasa & Manteca Cítrica', 'Cocida a la chapa del lado de la piel para una textura crocante, servida con manteca cítrica y vegetales rostizados.'],
    ['Sorrentinos de Kabutia Asada y Salsa de Curry', 'Pasta rellena en masa verde con relleno de kabutia a las brasas y salsa suave de curry y almendras tostadas.'],
    ['Risotto de Remolachas Asadas & Queso Azul', 'Risotto cremoso elaborado con caldo de vegetales ahumados y puré de remolachas, con nueces tostadas y queso azul.']
  ];

  /* ---------- 3. Los 7 Postres ---------- */
  const POSTRES = [
    ['Flan Casero de 7 Yemas', 'Flan casero con dulce de leche colonial y crema chantilly.'],
    ['Mousse “7 de Espadas”', 'Mousse de chocolate 70%, crumble de cacao, frutos rojos y sal.'],
    ['Panqueque de Dulce de Leche Quemado al Hierro', 'Clásico panqueque relleno de dulce de leche, caramelizado a la chapa y servido con helado de vainilla a la crema.'],
    ['Crumble de Manzanas Asadas & Helado', 'Manzanas verdes con canela, cubierta crocante de frutos secos tostados y helado de crema.'],
    ['Vigilante Porteño', 'Queso fresco, dulce de batata o membrillo y nueces tostadas.'],
    ['Tiramisú en Trifle', 'Crema de mascarpone, capas de bizcocho y café expresso.'],
    ['Helado “Bajativo”', 'Dos bochas de helado de gusto a elección.']
  ];

  /* ---------- 4. Las 7 Espadas Oficiales (Espeto Corrido) ---------- */
  const CORTES = [
    ['Picaña', 'El corte emblema, con su clásico manto de grasa dorada, trinchada al plato en la mesa.'],
    ['Costillar', 'Asado pacientemente a fuego lento hasta desprenderse del hueso.'],
    ['Pollo a las Brasas', 'Piezas marinadas, doradas y crocantes por fuera, jugosas por dentro.'],
    ['Bife de Chorizo', 'Sellado a fuego vivo con centro tierno y jugoso.'],
    ['Ojo de Bife', 'Servido al punto exacto que elija cada mesa.'],
    ['Colita de Cuadril', 'Cocción pareja y costra especiada.'],
    ['Bondiola de Cerdo', 'Braseada y caramelizada al calor de las brasas.']
  ];

  /* ---------- Lógica de Horarios en Vivo (Buenos Aires) ---------- */
  const SCHEDULE = {
    0: [[720, 960], [1200, 1440]], // Domingo: 12-16 y 20-00
    1: [],                         // Lunes: Cerrado
    2: [],                         // Martes: Cerrado
    3: [[1200, 1440]],             // Miércoles: 20-00
    4: [[1200, 1440]],             // Jueves: 20-00
    5: [[720, 960], [1200, 1500]], // Viernes: 12-16 y 20-01
    6: [[720, 960], [1200, 1500]]  // Sábado: 12-16 y 20-01
  };
  const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const hh = m => {
    m = m % 1440;
    return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  };

  function arNow() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      weekday: 'short'
    }).formatToParts(new Date());
    const o = {};
    parts.forEach(p => { o[p.type] = p.value; });
    let h = +o.hour;
    if (h === 24) h = 0;
    const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { y: +o.year, m: +o.month - 1, d: +o.day, dow: map[o.weekday], min: h * 60 + (+o.minute) };
  }

  function openStatus() {
    const now = arNow();
    const prev = (now.dow + 6) % 7;
    for (const [s, e] of SCHEDULE[now.dow]) {
      if (now.min >= s && now.min < e) {
        return { state: 'open', text: `Abierto ahora · hasta las ${hh(e)} hs` };
      }
    }
    for (const [, e] of SCHEDULE[prev]) {
      if (e > 1440 && now.min < e - 1440) {
        return { state: 'open', text: `Abierto ahora · hasta las ${hh(e)} hs` };
      }
    }
    for (let k = 0; k < 8; k++) {
      const d = (now.dow + k) % 7;
      for (const [s] of SCHEDULE[d]) {
        if (k === 0 && s <= now.min) continue;
        const when = k === 0 ? 'hoy' : k === 1 ? 'mañana' : `el ${DAYS[d]}`;
        return {
          state: k === 0 && s - now.min <= 90 ? 'soon' : 'closed',
          text: `Cerrado ahora · Abre ${when} a las ${hh(s)} hs`
        };
      }
    }
    return { state: 'closed', text: 'Cerrado ahora' };
  }

  function initStatus() {
    const st = openStatus();
    ['#openStatus', '#openStatus2'].forEach(sel => {
      const el = $(sel);
      if (!el) return;
      el.classList.remove('open', 'soon', 'closed');
      el.classList.add(st.state);
      $('span', el).textContent = st.text;
    });
    const dow = arNow().dow;
    $$('#hoursList li').forEach(li => {
      li.classList.toggle('today', li.dataset.days.split(',').map(Number).includes(dow));
    });
  }

  /* ---------- Hero: Partículas de Brasa y Calor en Canvas ---------- */
  function initFire() {
    const cv = $('#fireCanvas');
    const api = { burst() {} };
    if (!cv || reduced) return api;
    const ctx = cv.getContext('2d', { alpha: true });
    let W = 0, H = 0, dpr = 1, embers = [], plumes = [], visible = true, raf = 0;

    const emberSprite = document.createElement('canvas');
    emberSprite.width = emberSprite.height = 64;
    {
      const c = emberSprite.getContext('2d');
      const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(255, 240, 195, 1)');
      g.addColorStop(0.26, 'rgba(255, 156, 56, 0.75)');
      g.addColorStop(0.62, 'rgba(220, 72, 18, 0.28)');
      g.addColorStop(1, 'rgba(180, 40, 8, 0)');
      c.fillStyle = g;
      c.fillRect(0, 0, 64, 64);
    }

    const plumeSprite = document.createElement('canvas');
    plumeSprite.width = plumeSprite.height = 128;
    {
      const c = plumeSprite.getContext('2d');
      const g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, 'rgba(255, 196, 110, 1)');
      g.addColorStop(0.42, 'rgba(232, 92, 24, 0.68)');
      g.addColorStop(1, 'rgba(120, 22, 4, 0)');
      c.fillStyle = g;
      c.fillRect(0, 0, 128, 128);
    }

    const targetEmbers = () => (innerWidth < 768 ? 28 : 58);
    const targetPlumes = () => (innerWidth < 768 ? 10 : 18);

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 1.5);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const makePlume = (warmStart = false) => {
      const spread = W * (innerWidth < 768 ? 0.82 : 0.65);
      const max = 95 + Math.random() * 85;
      return {
        x: W / 2 + (Math.random() - 0.5) * spread,
        y: H + 16 + Math.random() * 18,
        vx: (Math.random() - 0.5) * 0.32,
        vy: -(0.7 + Math.random() * 1.05),
        r0: 38 + Math.random() * 48,
        life: warmStart ? Math.floor(Math.random() * max) : 0,
        max,
        ph: Math.random() * 6.28,
        sway: 0.36 + Math.random() * 0.55
      };
    };

    const makeEmber = (x, y, burst, warmStart = false) => {
      const max = burst ? 46 + Math.random() * 42 : 210 + Math.random() * 240;
      const life = warmStart ? Math.floor(Math.random() * max) : 0;
      const startY = y ?? (H * (0.65 + Math.random() * 0.35));
      const vy = burst ? -(Math.random() * 2.5 + 0.6) : -(Math.random() * 0.78 + 0.28);
      return {
        x: x ?? (W * 0.1 + Math.random() * W * 0.8),
        y: warmStart ? startY + vy * life * 0.5 : startY,
        vx: (Math.random() - 0.5) * (burst ? 2.8 : 0.36),
        vy,
        r: Math.random() * 1.7 + 0.6,
        life,
        max,
        ph: Math.random() * 6.28,
        burst: !!burst
      };
    };

    function fill(warmStart = false) {
      while (plumes.length < targetPlumes()) plumes.push(makePlume(warmStart));
      while (embers.filter(p => !p.burst).length < targetEmbers()) {
        embers.push(makeEmber(undefined, undefined, false, warmStart));
      }
    }

    function tick() {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      fill(false);

      for (let i = plumes.length - 1; i >= 0; i--) {
        const p = plumes[i];
        p.life++;
        p.ph += 0.04;
        p.x += p.vx + Math.sin(p.ph) * p.sway;
        p.y += p.vy;
        const t = p.life / p.max;
        if (t >= 1) {
          plumes.splice(i, 1);
          continue;
        }
        const rad = p.r0 * (1 - t * 0.4);
        ctx.globalAlpha = Math.sin(Math.PI * t) * 0.13;
        ctx.drawImage(plumeSprite, p.x - rad, p.y - rad, rad * 2, rad * 2);
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.life++;
        p.ph += 0.038;
        p.x += p.vx + Math.sin(p.ph) * (p.burst ? 0.22 : 0.36);
        p.y += p.vy;
        if (p.burst) {
          p.vy += 0.032;
          p.vx *= 0.986;
        }
        const t = p.life / p.max;
        if (t >= 1 || p.y < -20) {
          embers.splice(i, 1);
          continue;
        }
        const flicker = 0.68 + 0.32 * Math.sin(p.ph * 2.8);
        const halo = p.r * 5.0;
        ctx.globalAlpha = Math.sin(Math.PI * t) * (p.burst ? 1 : 0.85) * flicker;
        ctx.drawImage(emberSprite, p.x - halo, p.y - halo, halo * 2, halo * 2);
      }
      ctx.globalAlpha = 1;
    }

    function startLoop() {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick);
    }

    resize();
    fill(true);
    addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', startLoop);
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      startLoop();
    }).observe(cv);
    startLoop();

    api.burst = (x, y, n = 22) => {
      for (let i = 0; i < n; i++) embers.push(makeEmber(x, y, true, false));
      startLoop();
    };
    return api;
  }

  /* ---------- Hero: Parallax Sutil ---------- */
  function initHero(fire) {
    const hero = $('#inicio');
    if (!hero) return;

    setTimeout(() => {
      const sw = $('.hero-sword');
      if (!sw) return;
      const r = sw.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      fire.burst(r.left + r.width / 2 - hr.left, r.bottom - hr.top, 24);
    }, 850);

    if (!reduced && matchMedia('(hover: hover)').matches) {
      let tx = 0, cx = 0, raf = 0;
      hero.addEventListener('pointermove', e => {
        tx = (e.clientX / innerWidth - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
      const loop = () => {
        cx += (tx - cx) * 0.08;
        hero.style.setProperty('--mx', cx.toFixed(3));
        raf = Math.abs(tx - cx) > 0.002 ? requestAnimationFrame(loop) : 0;
      };
    }
  }

  /* ---------- Navegación, Scrollytelling Parallax, Reveal y Contadores ---------- */
  function initChrome() {
    const nav = $('#nav');
    const prog = $('#progress');
    const burger = $('#burger');
    const links = $('#navLinks');
    const hero = $('#inicio');
    const reveals = $$('.reveal');
    const parallaxEls = $$('[data-parallax]');
    let ticking = false;

    const onScroll = () => {
      const y = scrollY;
      const vh = innerHeight;
      const max = document.documentElement.scrollHeight - vh;

      nav.classList.toggle('scrolled', y > 30);
      prog.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;

      if (!reduced) {
        if (hero && y < vh * 1.3) {
          hero.style.setProperty('--hero-scroll', `${y.toFixed(1)}px`);
        }
        for (let i = 0; i < parallaxEls.length; i++) {
          const el = parallaxEls[i];
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue;
          const speed = parseFloat(el.dataset.parallax) || 0.08;
          const centerOffset = (r.top + r.height / 2) - vh / 2;
          const py = clamp(-centerOffset * speed, -60, 60);
          el.style.setProperty('--py', `${py.toFixed(1)}px`);
        }
      }
      ticking = false;
    };

    addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });

    const setMenu = open => {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      links.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', e => {
      if (e.key === 'Escape') setMenu(false);
    });

    const navLinks = $$('[data-nav]');
    const secObs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    }), { rootMargin: '-40% 0px -50% 0px' });
    ['experiencia', 'espadas', 'carta', 'reservas', 'ubicacion'].forEach(id => {
      const s = document.getElementById(id);
      if (s) secObs.observe(s);
    });

    const rev = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        rev.unobserve(e.target);
      }
    }), { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
    reveals.forEach(el => rev.observe(el));

    const cObs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      cObs.unobserve(e.target);
      const to = +e.target.dataset.count;
      if (reduced) {
        e.target.textContent = fmt(to);
        return;
      }
      const t0 = performance.now(), dur = 1350;
      const step = () => {
        const p = clamp((performance.now() - t0) / dur, 0, 1);
        e.target.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: 0.4 });
    $$('[data-count]').forEach(el => cObs.observe(el));

    onScroll();
    $('#year').textContent = new Date().getFullYear();
  }

  /* ---------- Desfile Scrollytelling de las 7 Espadas ---------- */
  function initSwordsParade() {
    const chapters = $$('.sword-chapter');
    const hudBtns = $$('.hud-sw');
    const hudLabel = $('#hudCurrentLabel');
    if (!chapters.length) return;

    const ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

    function setActiveSword(idx) {
      chapters.forEach((ch, i) => ch.classList.toggle('is-active', i === idx));
      hudBtns.forEach((btn, i) => {
        const isCurrent = i === idx;
        btn.classList.toggle('active', isCurrent);
        btn.classList.toggle('passed', i < idx);
        btn.setAttribute('aria-selected', String(isCurrent));
      });
      if (hudLabel) {
        hudLabel.textContent = `ESPADA ${ROMANS[idx]} / VII`;
      }
    }

    hudBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.swordTarget;
        const target = chapters[idx];
        if (!target) return;
        setActiveSword(idx);
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      });
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = +entry.target.dataset.swordIndex;
          if (!Number.isNaN(idx)) setActiveSword(idx);
        }
      });
    }, { rootMargin: '-35% 0px -40% 0px', threshold: 0.05 });

    chapters.forEach(ch => obs.observe(ch));
  }

  /* ---------- Carpeta de Cuero Interactiva (Exactas 3 Carillas Reales + Contratapa) ---------- */
  function initBook() {
    const stage = $('#bookStage');
    const book = $('#book');
    if (!stage || !book) return;
    const mq = matchMedia('(max-width: 767px)');

    const hilt = '<svg class="hilt sw-page" viewBox="0 0 60 72" aria-hidden="true"><use href="#swordHilt"/></svg>';
    const ciTl = '<div class="ci tl" aria-hidden="true"><b>7</b><svg class="sw-page" viewBox="0 0 60 220"><use href="#sword"/></svg></div>';
    const ciBr = '<div class="ci br" aria-hidden="true"><svg class="sw-page" viewBox="0 0 60 220"><use href="#sword"/></svg><b>7</b></div>';
    const shell = (cls, inner) => `<div class="page ${cls}"><div class="frame"></div>${ciTl}${ciBr}<div class="pc">${inner}</div></div>`;
    const tip = '<svg class="tip sw-page" viewBox="0 0 60 76" aria-hidden="true"><use href="#swordTip"/></svg>';
    const dishes = list => `<div class="dishes">${list.map(([t, d], i) => `<div class="dish"><h4>${i + 1}. ${t}</h4><p>${d}</p></div>`).join('')}</div>`;

    const T = {
      menu: () => shell('p-menu', `${hilt}
        <h3 class="ttl">MENU 7 DE ESPADAS</h3>
        <p class="lead">${MENU.intro.join('<br>')}</p>
        ${MENU.blocks.map(b => `<div class="blk"><h4>${b.h}</h4><p>${b.d}</p>${b.extra ? `<p class="opt">${b.extra}</p>` : ''}</div>`).join('')}
        <p class="opt-replace">Opcional: Reemplazar las 7 espadas por un plato de nuestra cocina.</p>
        <div class="foot">
          <small>Todo incluido por</small>
          <strong class="foot-adult">$${fmt(PRICE.adult)} por persona</strong>
          <hr>
          <small>Menores (de 2 a 12 años)</small>
          <strong class="foot-kid">$${fmt(PRICE.kid)} por menor</strong>
        </div>
        ${tip}`),
      platos: () => shell('p-platos', `<svg class="divsw top sw-page" viewBox="0 0 140 14" aria-hidden="true"><use href="#twoSwords"/></svg>
        <h3 class="ttl">LOS 7 PLATOS DE LA COCINA</h3>
        ${dishes(PLATOS)}
        <svg class="divsw sw-page" viewBox="0 0 140 14" aria-hidden="true"><use href="#twoSwords"/></svg>`),
      postres: () => shell('p-postres', `${hilt}
        <h3 class="ttl">LOS 7 POSTRES</h3>
        ${dishes(POSTRES)}
        ${tip}`),
      blank: () => '<div class="page blank"><div class="frame"></div></div>',
      coverFront: () => `<div class="cover-face leather"><div class="cover-glint"></div>
        <div class="cover-band">
          <svg class="cover-logo" viewBox="0 0 220 404" role="img" aria-label="Siete de Espadas, Espeto Corrido">
            <use href="#sword" class="sw-gold" x="55" y="0" width="110" height="403"/>
            <g class="sw-gold" transform="translate(0 193)"><use href="#hSword" x="22" y="0" width="60" height="12"/></g>
            <g class="sw-gold" transform="translate(220 193) scale(-1 1)"><use href="#hSword" x="22" y="0" width="60" height="12"/></g>
            <g text-anchor="middle" fill="#f4ecdc" stroke="#12110f" stroke-width="7" paint-order="stroke" stroke-linejoin="round">
              <text x="110" y="168" font-size="56" textLength="172" lengthAdjust="spacingAndGlyphs">SIETE</text>
              <text x="110" y="208" font-size="27">DE</text>
              <text x="110" y="262" font-size="56" textLength="214" lengthAdjust="spacingAndGlyphs">ESPADAS</text>
            </g>
            <text x="110" y="281" font-size="11.5" letter-spacing="2.4" text-anchor="middle" fill="url(#goldT)" stroke="#12110f" stroke-width="3" paint-order="stroke">ESPETO CORRIDO</text>
          </svg>
        </div><div class="cover-edge"></div></div>`,
      coverBack: () => '<div class="cover-face leather back-cover"><div class="cover-glint"></div><div class="cover-edge"></div></div>',
      coverInside: () => `<div class="cover-face leather"><div class="inside-face"><div>
        <svg class="sw-gold" viewBox="0 0 60 72" aria-hidden="true"><use href="#swordHilt"/></svg>
        <blockquote>El fuego ya está encendido.<br>Las espadas están listas.<br><em>Y el show está por comenzar.</em></blockquote></div></div><div class="cover-edge"></div></div>`,
      coverBlank: () => '<div class="cover-face leather"><div class="cover-edge"></div></div>'
    };

    let mode = null, leaves = [], pwx = 0, drag = null;

    // En desktop (spread):
    //   Hoja 0: Tapa de cuero -> Tapa abierta a la izquierda con Hoja 1: Menú 7 de Espadas
    //   Hoja 1: Hoja 2: Los 7 Platos de la Cocina -> Reverso con Hoja 3: Los 7 Postres
    //   Base derecha: Contratapa de cuero negro con estampado dorado
    //   ¡Al abrir la carpeta, se ven en simultáneo Menú a la izquierda y Platos a la derecha!
    //   Al pasar la página, se ven Postres a la izquierda y la Contratapa cerrando la libreta a la derecha.
    const spreadDefs = () => [
      {
        cover: true,
        front: T.coverFront(),
        back: `<div class="cover-face leather inside-folder">${T.menu()}</div>`
      },
      {
        front: T.platos(),
        back: T.postres()
      }
    ];

    // En móvil (< 768px, single):
    //   Hoja 0: Cubierta de cuero
    //   Hoja 1: Menú 7 de Espadas
    //   Hoja 2: Los 7 Platos de la Cocina
    //   Hoja 3: Los 7 Postres
    //   Base: Contratapa de cuero
    const singleDefs = () => [
      { cover: true, front: T.coverFront(), back: T.coverBlank() },
      { front: T.menu(), back: T.blank() },
      { front: T.platos(), back: T.blank() },
      { front: T.postres(), back: T.blank() }
    ];

    const NAMES = {
      spread: ['Cubierta (Cerrada)', 'Menú 7 de Espadas · Los 7 Platos', 'Los 7 Postres · Contratapa'],
      single: ['Cubierta (Cerrada)', 'Menú 7 de Espadas', 'Los 7 Platos de la Cocina', 'Los 7 Postres', 'Contratapa']
    };

    const PAGE_STATE = {
      spread: { cover: 0, close: 0, menu: 1, platos: 1, postres: 2 },
      single: { cover: 0, close: 0, menu: 1, platos: 2, postres: 3 }
    };

    const logicalToState = (name, m) => PAGE_STATE[m][name] ?? 0;
    const stateNow = () => leaves.filter(l => l.target === -180).length;

    function build(initialPage = 'cover') {
      mode = mq.matches ? 'single' : 'spread';
      book.dataset.mode = mode;
      book.innerHTML = '';

      const base = div('base leather');
      base.innerHTML = T.coverBack();
      book.appendChild(base);

      const defs = mode === 'spread' ? spreadDefs() : singleDefs();
      leaves = defs.map((d, i) => {
        const el = div('leaf' + (d.cover ? ' cover' : ''));
        el.innerHTML = `<div class="face front">${d.front}</div><div class="face back">${d.back}</div>`;
        book.appendChild(el);
        return { el, i, angle: 0, target: 0, raf: 0, cover: !!d.cover };
      });

      const s = logicalToState(initialPage, mode);
      leaves.forEach(l => {
        if (l.i < s) {
          l.angle = -180;
          l.target = -180;
        }
      });

      measure();
      renderAll();
      hud();
      bindCoverHover();
    }

    function measure() {
      pwx = leaves.length ? leaves[0].el.offsetWidth : 0;
    }

    function render(l) {
      const a = l.angle;
      const s = Math.sin(Math.abs(a) * Math.PI / 180);
      l.el.style.transform = `rotateY(${a.toFixed(2)}deg)`;
      l.el.style.setProperty('--s', s.toFixed(3));
      l.el.style.zIndex = a > -90 ? 100 + leaves.length - l.i : 100 + l.i;
      l.el.style.visibility = (mode === 'single' && a < -176) ? 'hidden' : 'visible';
    }

    function renderAll() {
      leaves.forEach(render);
      const open = clamp(-leaves[0].angle / 180, 0, 1);
      book.style.setProperty('--open', open.toFixed(3));
      book.style.transform = mode === 'spread'
        ? `translate3d(${(-(pwx / 2) * (1 - open)).toFixed(2)}px, 0, 0)`
        : '';
    }

    const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    function tween(l, to, dur = 950) {
      cancelAnimationFrame(l.raf);
      const from = l.angle;
      if (reduced || from === to) {
        l.angle = to;
        renderAll();
        return;
      }
      const d = Math.max(250, dur * Math.abs(to - from) / 180);
      const t0 = performance.now();
      const step = () => {
        const p = clamp((performance.now() - t0) / d, 0, 1);
        l.angle = from + (to - from) * ease(p);
        renderAll();
        if (p < 1) l.raf = requestAnimationFrame(step);
      };
      l.raf = requestAnimationFrame(step);
    }

    const lbl = $('#bkLabel');
    const hint = $('#bkHint');
    const prevB = $('#bkPrev');
    const nextB = $('#bkNext');
    const tabs = $$('#bookTabs button');

    function hud() {
      const s = stateNow();
      const n = leaves.length;
      if (lbl) lbl.textContent = NAMES[mode][s] || '';
      if (hint) {
        hint.textContent = s === 0
          ? 'Tocá la portada para abrir la carta'
          : (mode === 'spread'
              ? (s === 1 ? 'Deslizá la página o tocá una solapa para ver postres' : 'Tocá la página izquierda o "✕ Cerrar carta" para volver')
              : 'Deslizá con el dedo o usá las solapas para navegar');
      }
      if (prevB) prevB.disabled = s === 0;
      if (nextB) nextB.disabled = s === n;
      const ps = PAGE_STATE[mode];
      tabs.forEach(t => {
        const p = t.dataset.page;
        if (p === 'close') {
          t.style.display = s === 0 ? 'none' : 'inline-flex';
          return;
        }
        if (mode === 'spread' && s === 1) {
          t.classList.toggle('active', p === 'menu' || p === 'platos');
        } else {
          t.classList.toggle('active', ps[p] === s);
        }
      });
    }

    function next() {
      const l = leaves.find(x => x.target === 0);
      if (!l) return;
      l.target = -180;
      tween(l, -180);
      hud();
    }

    function prev() {
      const l = [...leaves].reverse().find(x => x.target === -180);
      if (!l) return;
      l.target = 0;
      tween(l, 0);
      hud();
    }

    function goto(s) {
      const cur = stateNow();
      if (s === cur) return;
      if (s > cur) {
        for (let i = cur; i < s; i++) {
          leaves[i].target = -180;
          setTimeout(() => tween(leaves[i], -180, 900), (i - cur) * 160);
        }
      } else {
        for (let i = cur - 1; i >= s; i--) {
          leaves[i].target = 0;
          setTimeout(() => tween(leaves[i], 0, 900), (cur - 1 - i) * 160);
        }
      }
      hud();
    }

    prevB.addEventListener('click', prev);
    nextB.addEventListener('click', next);
    tabs.forEach(t => t.addEventListener('click', () => goto(PAGE_STATE[mode][t.dataset.page])));

    $$('[data-open-book]').forEach(a => {
      a.addEventListener('click', () => {
        setTimeout(() => {
          if (stateNow() === 0) goto(1);
        }, 700);
      });
    });

    stage.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        goto(0);
      }
    });

    function bindCoverHover() {
      const c = leaves[0];
      if (!c) return;
      c.el.addEventListener('pointerenter', e => {
        if (e.pointerType === 'mouse' && c.target === 0 && !drag) tween(c, -15, 550);
      });
      c.el.addEventListener('pointerleave', e => {
        if (e.pointerType === 'mouse' && c.target === 0 && !drag) tween(c, 0, 550);
      });
    }

    // Gestos táctiles (swipe) y arrastre de página en Desktop y Mobile
    stage.addEventListener('pointerdown', e => {
      if (e.button > 0 || e.target.closest('a,button,select,input')) return;
      if (!e.target.closest('.leaf, .base')) return;
      const r = book.getBoundingClientRect();
      const tapForward = mode === 'spread'
        ? e.clientX > r.left + r.width / 2
        : (e.clientX - r.left) / r.width > 0.3;

      drag = {
        id: e.pointerId,
        x0: e.clientX,
        y0: e.clientY,
        tapForward,
        forward: null,
        leaf: null,
        moved: false,
        lastX: e.clientX,
        lastT: performance.now(),
        v: 0,
        p: 0
      };
    });

    stage.addEventListener('pointermove', e => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x0;
      const dy = e.clientY - drag.y0;

      if (!drag.moved) {
        if (Math.abs(dy) > Math.abs(dx) * 1.3 && Math.abs(dy) > 10) {
          drag = null;
          return;
        }
        if (Math.abs(dx) > 8) {
          const s = stateNow();
          const n = leaves.length;
          const forward = dx < 0;
          if ((forward && s >= n) || (!forward && s <= 0)) {
            drag = null;
            return;
          }
          drag.forward = forward;
          drag.leaf = forward ? leaves[s] : leaves[s - 1];
          cancelAnimationFrame(drag.leaf.raf);
          drag.moved = true;
          try { stage.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
        }
      }

      if (!drag || !drag.moved || !drag.leaf) return;
      const span = Math.max(180, pwx * 0.85);
      const now = performance.now();
      drag.v = (e.clientX - drag.lastX) / Math.max(1, now - drag.lastT);
      drag.lastX = e.clientX;
      drag.lastT = now;

      if (drag.forward) {
        drag.p = clamp(-dx / span, 0, 1);
        drag.leaf.angle = -180 * drag.p;
      } else {
        drag.p = clamp(dx / span, 0, 1);
        drag.leaf.angle = -180 + 180 * drag.p;
      }
      renderAll();
    });

    const endDrag = (e, cancelled) => {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag;
      drag = null;
      try { stage.releasePointerCapture(e.pointerId); } catch (_) { /* noop */ }

      if (!d.moved) {
        if (!cancelled) {
          if (stateNow() === 0) {
            next();
          } else if (d.tapForward) {
            next();
          } else {
            prev();
          }
        }
        return;
      }
      if (!d.leaf) return;

      let complete = d.p > 0.28 || (d.forward ? d.v < -0.35 : d.v > 0.35);
      if (cancelled) complete = false;

      if (d.forward) {
        d.leaf.target = complete ? -180 : 0;
        tween(d.leaf, d.leaf.target, 750);
      } else {
        d.leaf.target = complete ? 0 : -180;
        tween(d.leaf, d.leaf.target, 750);
      }
      hud();
    };

    stage.addEventListener('pointerup', e => endDrag(e, false));
    stage.addEventListener('pointercancel', e => endDrag(e, true));

    function currentPageName() {
      const s = stateNow();
      const ps = PAGE_STATE[mode];
      return Object.keys(ps).find(k => ps[k] === s) || 'cover';
    }

    mq.addEventListener('change', () => build(currentPageName()));
    new ResizeObserver(() => {
      measure();
      renderAll();
    }).observe(stage);

    // Lectura en texto plano accesible
    $('#menuList').innerHTML = `
      <section>
        <h3>Menú 7 de Espadas<small>${MENU.intro.join(' ')}</small></h3>
        <ul>${MENU.blocks.map(b => `<li><b>${b.h}</b><span>${b.d}${b.extra ? ' ' + b.extra : ''}</span></li>`).join('')}</ul>
        <p class="lp">Todo incluido por $${fmt(PRICE.adult)} por persona · Menores de 2 a 12 años $${fmt(PRICE.kid)} por menor</p>
      </section>
      <section>
        <h3>Los 7 platos de la cocina</h3>
        <ol>${PLATOS.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join('')}</ol>
      </section>
      <section>
        <h3>Los 7 postres</h3>
        <ol>${POSTRES.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join('')}</ol>
      </section>`;

    const lt = $('#listToggle');
    const ml = $('#menuList');
    lt.addEventListener('click', () => {
      const open = ml.hidden;
      ml.hidden = !open;
      lt.setAttribute('aria-expanded', String(open));
      lt.textContent = open ? 'Ocultar lectura en texto plano' : 'Ver lectura en texto plano';
    });

    build();

    new IntersectionObserver((es, o) => {
      if (es[0].isIntersecting) {
        o.disconnect();
        setTimeout(() => {
          const c = leaves[0];
          if (stateNow() === 0 && !drag && c && c.angle === 0) {
            tween(c, -22, 680);
            setTimeout(() => {
              if (c.target === 0 && !drag) tween(c, 0, 760);
            }, 850);
          }
        }, 450);
      }
    }, { threshold: 0.45 }).observe(stage);
  }

  /* ---------- Reservas por WhatsApp (Calendario Real & Tu Reserva Minimalista) ---------- */
  function initBooking() {
    const form = $('#resForm');
    if (!form) return;
    const today = arNow();
    const todayUTC = Date.UTC(today.y, today.m, today.d);
    const maxUTC = todayUTC + 120 * 864e5;
    const st = { vy: today.y, vm: today.m, date: null, turn: null, time: '', guests: 2, name: '' };
    const dowOf = d => new Date(Date.UTC(d.y, d.m, d.d)).getUTCDay();

    const SERVICE = {
      0: { mediodia: [12, 16], noche: [20, 24] }, // Domingo
      3: { noche: [20, 24] },                     // Miércoles
      4: { noche: [20, 24] },                     // Jueves
      5: { mediodia: [12, 16], noche: [20, 25] }, // Viernes
      6: { mediodia: [12, 16], noche: [20, 25] }  // Sábado
    };
    const hLabel = h => String(h % 24).padStart(2, '0');
    const turnName = { mediodia: 'Mediodía', noche: 'Noche' };
    const lastSlot = ([, e]) => (e - 1.5) * 60;

    function turnAvailable(d, key) {
      const def = SERVICE[dowOf(d)];
      if (!def || !def[key]) return false;
      if (Date.UTC(d.y, d.m, d.d) === todayUTC && today.min > lastSlot(def[key])) return false;
      return true;
    }

    const dayHasService = d => !!SERVICE[dowOf(d)] && (turnAvailable(d, 'mediodia') || turnAvailable(d, 'noche'));

    const grid = $('#calGrid');
    const title = $('#calTitle');
    const prevM = $('#calPrev');
    const nextM = $('#calNext');

    function renderCal() {
      title.textContent = `${cap(MONTHS[st.vm])} ${st.vy}`;
      grid.innerHTML = '';
      const first = new Date(Date.UTC(st.vy, st.vm, 1)).getUTCDay();
      const lead = (first + 6) % 7;
      const count = new Date(Date.UTC(st.vy, st.vm + 1, 0)).getUTCDate();

      for (let i = 0; i < lead; i++) {
        const e = document.createElement('span');
        e.className = 'day empty';
        grid.appendChild(e);
      }

      for (let d = 1; d <= count; d++) {
        const obj = { y: st.vy, m: st.vm, d };
        const u = Date.UTC(st.vy, st.vm, d);
        const dow = dowOf(obj);
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'day';
        b.textContent = d;

        const closedDay = !SERVICE[dow];
        const past = u < todayUTC;
        const far = u > maxUTC;
        const dis = past || far || closedDay || !dayHasService(obj);
        b.disabled = dis;

        if (closedDay) b.classList.add('closed');
        if (u === todayUTC) b.classList.add('today');
        if (st.date && st.date.y === obj.y && st.date.m === obj.m && st.date.d === obj.d) {
          b.classList.add('sel');
          b.setAttribute('aria-pressed', 'true');
        }
        b.setAttribute('aria-label', `${cap(DAYS[dow])} ${d} de ${MONTHS[st.vm]}${closedDay ? ', cerrado' : ''}`);

        b.addEventListener('click', () => {
          st.date = obj;
          if (st.turn && !turnAvailable(obj, st.turn)) {
            st.turn = null;
            st.time = '';
          }
          if (!st.turn) {
            const avail = ['mediodia', 'noche'].filter(k => turnAvailable(obj, k));
            if (avail.length === 1) st.turn = avail[0];
          }
          update();
          renderCal();
        });
        grid.appendChild(b);
      }

      prevM.disabled = st.vy === today.y && st.vm === today.m;
      const mx = new Date(maxUTC);
      nextM.disabled = st.vy > mx.getUTCFullYear() || (st.vy === mx.getUTCFullYear() && st.vm >= mx.getUTCMonth());
    }

    prevM.addEventListener('click', () => {
      st.vm--;
      if (st.vm < 0) { st.vm = 11; st.vy--; }
      renderCal();
    });
    nextM.addEventListener('click', () => {
      st.vm++;
      if (st.vm > 11) { st.vm = 0; st.vy++; }
      renderCal();
    });

    const turnBtns = $$('.turn');
    const turnHint = $('#turnHint');
    const timePicker = $('#timePicker');
    const timeGrid = $('#timeGrid');

    turnBtns.forEach(b => b.addEventListener('click', () => {
      st.turn = b.dataset.turn;
      st.time = '';
      update();
    }));

    function renderTimeChips() {
      if (!timePicker || !timeGrid) return;
      const d = st.date;
      if (!d || !st.turn || !SERVICE[dowOf(d)] || !SERVICE[dowOf(d)][st.turn]) {
        timePicker.hidden = true;
        timeGrid.innerHTML = '';
        return;
      }
      const [s, e] = SERVICE[dowOf(d)][st.turn];
      const isToday = Date.UTC(d.y, d.m, d.d) === todayUTC;

      const slots = [];
      for (let m = s * 60; m <= (e - 1.5) * 60; m += 30) {
        if (isToday && m <= today.min) continue;
        slots.push(hh(m));
      }

      if (slots.length === 0) {
        timePicker.hidden = true;
        timeGrid.innerHTML = '';
        return;
      }

      timePicker.hidden = false;
      timeGrid.innerHTML = '';

      const anyBtn = document.createElement('button');
      anyBtn.type = 'button';
      anyBtn.className = `time-chip chip-auto${st.time === '' ? ' sel' : ''}`;
      anyBtn.textContent = 'Sin preferencia';
      anyBtn.setAttribute('aria-pressed', String(st.time === ''));
      anyBtn.addEventListener('click', () => {
        st.time = '';
        renderTimeChips();
        updateTicket();
      });
      timeGrid.appendChild(anyBtn);

      slots.forEach(slot => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `time-chip${st.time === slot ? ' sel' : ''}`;
        btn.textContent = `${slot} hs`;
        btn.setAttribute('aria-pressed', String(st.time === slot));
        btn.addEventListener('click', () => {
          st.time = slot;
          renderTimeChips();
          updateTicket();
        });
        timeGrid.appendChild(btn);
      });
    }

    function updateTurns() {
      const d = st.date;
      const def = d ? SERVICE[dowOf(d)] : null;
      turnBtns.forEach(b => {
        const k = b.dataset.turn;
        const range = def && def[k];
        const ok = d && turnAvailable(d, k);
        b.disabled = !ok;
        b.classList.toggle('sel', ok && st.turn === k);
        b.setAttribute('aria-pressed', String(ok && st.turn === k));
        const small = $('small', b);
        if (range) small.textContent = `${hLabel(range[0])}:00 a ${hLabel(range[1])}:00 hs`;
        else small.textContent = k === 'mediodia' ? '12:00 a 16:00 hs' : '20:00 a 00:00 hs';
      });

      if (!d) {
        turnHint.textContent = 'Elegí primero una fecha en el calendario.';
      } else {
        const dn = DAYS[dowOf(d)];
        if (!def.mediodia) {
          turnHint.textContent = `Los ${dn}${dn.endsWith('s') ? '' : 's'} abrimos únicamente en el turno noche.`;
        } else if (!turnAvailable(d, 'mediodia') && turnAvailable(d, 'noche')) {
          turnHint.textContent = 'El turno mediodía de hoy ya finalizó.';
        } else {
          turnHint.textContent = st.turn ? '' : 'Seleccioná el turno deseado.';
        }
      }

      renderTimeChips();
    }

    // Selector unificado de comensales (1 a 20)
    const guestsOut = $('#guestsOut');
    const guestMinus = $('#guestMinus');
    const guestPlus = $('#guestPlus');
    const guestChips = $$('.guest-chip');
    const groupHint = $('#groupHint');

    function setGuests(val) {
      st.guests = clamp(val, 1, 20);
      if (guestsOut) guestsOut.textContent = st.guests;
      if (guestMinus) guestMinus.disabled = st.guests <= 1;
      if (guestPlus) guestPlus.disabled = st.guests >= 20;
      guestChips.forEach(c => {
        c.classList.toggle('active', +c.dataset.guests === st.guests);
      });
      if (groupHint) {
        groupHint.textContent = st.guests > 10
          ? 'Para grupos de más de 10 personas preparamos una disposición especial de mesas.'
          : '';
      }
      updateTicket();
    }

    if (guestMinus) guestMinus.addEventListener('click', () => setGuests(st.guests - 1));
    if (guestPlus) guestPlus.addEventListener('click', () => setGuests(st.guests + 1));
    guestChips.forEach(c => c.addEventListener('click', () => setGuests(+c.dataset.guests)));

    const nameIn = $('#nameIn');
    if (nameIn) {
      nameIn.addEventListener('input', () => {
        st.name = nameIn.value.trim();
        updateTicket();
      });
    }

    form.addEventListener('submit', e => e.preventDefault());

    const wa = $('#waBtn');
    const waHint = $('#waHint');

    const dateLabel = d => d ? `${cap(DAYS[dowOf(d)])} ${d.d} de ${MONTHS[d.m]}${d.y !== today.y ? ' de ' + d.y : ''}` : '';
    const turnLabel = () => {
      if (!st.date || !st.turn) return '';
      const [s, e] = SERVICE[dowOf(st.date)][st.turn];
      return `${turnName[st.turn]} (${hLabel(s)}:00 a ${hLabel(e)}:00 hs)${st.time ? ` · ${st.time} hs` : ''}`;
    };

    function message() {
      const nm = st.name || (nameIn ? nameIn.value.trim() : '');
      const dStr = dateLabel(st.date);
      let tStr = st.time;
      if (!tStr && st.date && st.turn && SERVICE[dowOf(st.date)][st.turn]) {
        const [s] = SERVICE[dowOf(st.date)][st.turn];
        tStr = `${hLabel(s)}:30`;
      }
      return `Hola Siete de Espadas! Quiero solicitar una reserva a nombre de ${nm} para el ${dStr} a las ${tStr} hs, para ${st.guests} comensales.`;
    }

    function updateTicket() {
      const nm = st.name || (nameIn ? nameIn.value.trim() : '');
      const tkDate = $('#tkDate');
      const tkTurn = $('#tkTurn');
      const tkPeople = $('#tkPeople');
      const tkName = $('#tkName');

      if (tkDate) tkDate.textContent = st.date ? dateLabel(st.date) : '—';
      if (tkTurn) tkTurn.textContent = st.turn ? turnLabel() : '—';
      if (tkPeople) tkPeople.textContent = `${st.guests} ${st.guests === 1 ? 'comensal' : 'comensales'}`;
      if (tkName) tkName.textContent = nm || '—';

      const isNameValid = nm.length >= 2;
      const ready = !!(st.date && st.turn && isNameValid);

      if (wa) {
        wa.classList.toggle('is-disabled', !ready);
        wa.setAttribute('aria-disabled', String(!ready));
        if (ready) {
          const msg = message();
          wa.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
          waHint.textContent = 'Confirmación directa e inmediata por WhatsApp.';
        } else {
          wa.href = `https://wa.me/${WA_NUMBER}`;
          if (!st.date || !st.turn) {
            waHint.textContent = 'Elegí fecha y turno en el formulario.';
          } else if (!isNameValid) {
            waHint.textContent = 'Ingresá tu nombre y apellido para habilitar la reserva.';
          }
        }
      }
    }

    function update() {
      updateTurns();
      updateTicket();
    }

    if (wa) {
      wa.addEventListener('click', e => {
        if (wa.getAttribute('aria-disabled') === 'true') {
          e.preventDefault();
          wa.classList.remove('shake');
          void wa.offsetWidth;
          wa.classList.add('shake');
          waHint.style.color = 'var(--ember)';
          setTimeout(() => { waHint.style.color = ''; }, 1600);
          if (nameIn && (!st.name || st.name.length < 2)) {
            nameIn.focus();
          }
        }
      });
    }

    // Preseleccionar el próximo día y turno hábil
    for (let i = 0; i < 14; i++) {
      const dt = new Date(todayUTC + i * 864e5);
      const cand = { y: dt.getUTCFullYear(), m: dt.getUTCMonth(), d: dt.getUTCDate() };
      if (dayHasService(cand)) {
        st.date = cand;
        st.vy = cand.y;
        st.vm = cand.m;
        st.turn = turnAvailable(cand, 'noche') ? 'noche' : 'mediodia';
        break;
      }
    }

    setGuests(2);
    renderCal();
    update();
  }

  /* ==========================================================================
     SINCRONIZACIÓN EN TIEMPO REAL CON GOOGLE SHEETS
     Permite que cualquier cambio en Precios o en Carta (cortes, platos, postres)
     se refleje automáticamente en la web en vivo sin necesidad de recargar.
     Planilla: https://docs.google.com/spreadsheets/d/1I40eaqEOivnte3pr0Yb-taFxz8e9wkBVasVzc5pV7z0/edit
     ========================================================================== */
  const GSHEETS_CONFIG = {
    enabled: true,
    sheetId: '1I40eaqEOivnte3pr0Yb-taFxz8e9wkBVasVzc5pV7z0',
    pollIntervalMs: 5000 // Consulta activa cada 5 segundos
  };

  function parseCleanNumber(cell) {
    if (!cell) return null;
    if (typeof cell.v === 'number' && !isNaN(cell.v)) return Math.round(cell.v);
    let s = String(cell.v || cell.f || '').trim();
    s = s.replace(/[$€\s]/g, '');
    s = s.replace(/[,.]00$/, '');
    s = s.replace(/[.,]/g, '');
    const n = Number(s);
    return (!isNaN(n) && n > 0) ? Math.round(n) : null;
  }

  function updatePriceDOM() {
    const elAdult = $('#priceAdult');
    const elKid = $('#priceKid');
    if (elAdult) {
      elAdult.textContent = fmt(PRICE.adult);
      elAdult.dataset.count = String(PRICE.adult);
    }
    if (elKid) {
      elKid.textContent = fmt(PRICE.kid);
      elKid.dataset.count = String(PRICE.kid);
    }

    $$('.foot-adult').forEach(el => { el.textContent = `$${fmt(PRICE.adult)} por persona`; });
    $$('.foot-kid').forEach(el => { el.textContent = `$${fmt(PRICE.kid)} por menor`; });
  }

  function updatePlatosDOM() {
    $$('.p-platos .dishes').forEach(el => {
      el.innerHTML = PLATOS.map(([t, d], i) =>
        `<div class="dish"><h4>${i + 1}. ${t}</h4><p>${d}</p></div>`
      ).join('');
    });
  }

  function updatePostresDOM() {
    $$('.p-postres .dishes').forEach(el => {
      el.innerHTML = POSTRES.map(([t, d], i) =>
        `<div class="dish"><h4>${i + 1}. ${t}</h4><p>${d}</p></div>`
      ).join('');
    });
  }

  function updateCortesDOM() {
    const ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    CORTES.forEach(([nom, desc], idx) => {
      const ch = $(`.sword-chapter[data-sword-index="${idx}"]`);
      if (!ch) return;
      const h3 = $('h3', ch);
      const p = $('p', ch);
      const tag = $('.sword-visual-tag', ch);
      if (h3 && nom) h3.textContent = nom;
      if (p && desc) p.textContent = desc;
      if (tag && nom) tag.textContent = `Espada ${ROMANS[idx]} · ${nom}`;
    });
  }

  async function syncGoogleSheets() {
    if (!GSHEETS_CONFIG.enabled || !GSHEETS_CONFIG.sheetId) return;

    // 1. Sincronizar hoja de Precios
    try {
      const urlPrecios = `https://docs.google.com/spreadsheets/d/${GSHEETS_CONFIG.sheetId}/gviz/tq?tqx=out:json&sheet=Precios&_t=${Date.now()}`;
      const res = await fetch(urlPrecios, { cache: 'no-store' });
      if (res.ok) {
        const txt = await res.text();
        const m = txt.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);/);
        if (m && m[1]) {
          const json = JSON.parse(m[1]);
          const rows = json.table && json.table.rows;
          if (Array.isArray(rows)) {
            let priceChanged = false;
            rows.forEach(r => {
              const key = String(r.c && r.c[0] ? (r.c[0].v || '') : '').trim().toLowerCase();
              const cell = r.c && r.c[2];
              if (key === 'adulto' && cell) {
                const num = parseCleanNumber(cell);
                if (num && num !== PRICE.adult) {
                  PRICE.adult = num;
                  priceChanged = true;
                }
              } else if (key === 'menor' && cell) {
                const num = parseCleanNumber(cell);
                if (num && num !== PRICE.kid) {
                  PRICE.kid = num;
                  priceChanged = true;
                }
              } else if (key === 'whatsapp') {
                const raw = (r.c && r.c[2] && r.c[2].v) || (r.c && r.c[3] && r.c[3].v) || (r.c && r.c[4] && r.c[4].v);
                if (raw) {
                  let cleanWa = String(raw).replace(/\D/g, '');
                  if (cleanWa.length === 10 && cleanWa.startsWith('221')) cleanWa = '549' + cleanWa;
                  if (cleanWa.length >= 10 && cleanWa !== WA_NUMBER) {
                    WA_NUMBER = cleanWa;
                  }
                }
              }
            });
            if (priceChanged) {
              updatePriceDOM();
            }
          }
        }
      }
    } catch (_) { /* silencioso */ }

    // 2. Sincronizar hoja de Carta (Las 7 Espadas, Platos de Cocina, Postres)
    try {
      const urlCarta = `https://docs.google.com/spreadsheets/d/${GSHEETS_CONFIG.sheetId}/gviz/tq?tqx=out:json&sheet=Carta&_t=${Date.now()}`;
      const res = await fetch(urlCarta, { cache: 'no-store' });
      if (res.ok) {
        const txt = await res.text();
        const m = txt.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);/);
        if (m && m[1]) {
          const json = JSON.parse(m[1]);
          const rows = json.table && json.table.rows;
          if (Array.isArray(rows)) {
            let changedPlatos = false;
            let changedPostres = false;
            let changedCortes = false;

            rows.forEach(r => {
              const cat = String(r.c && r.c[0] ? (r.c[0].v || '') : '').toLowerCase();
              const num = Number(r.c && r.c[1] ? r.c[1].v : null);
              const nom = String(r.c && r.c[2] ? (r.c[2].v || '') : '').trim();
              const desc = String(r.c && r.c[3] ? (r.c[3].v || '') : '').trim();

              if (!nom || isNaN(num) || num < 1 || num > 7) return;
              const idx = num - 1;

              if (cat.includes('plato')) {
                if (!PLATOS[idx] || PLATOS[idx][0] !== nom || PLATOS[idx][1] !== desc) {
                  PLATOS[idx] = [nom, desc];
                  changedPlatos = true;
                }
              } else if (cat.includes('postre')) {
                if (!POSTRES[idx] || POSTRES[idx][0] !== nom || POSTRES[idx][1] !== desc) {
                  POSTRES[idx] = [nom, desc];
                  changedPostres = true;
                }
              } else if (cat.includes('corte') || cat.includes('espada') || cat.includes('espeto')) {
                if (!CORTES[idx] || CORTES[idx][0] !== nom || CORTES[idx][1] !== desc) {
                  CORTES[idx] = [nom, desc];
                  changedCortes = true;
                }
              }
            });

            if (changedPlatos) updatePlatosDOM();
            if (changedPostres) updatePostresDOM();
            if (changedCortes) updateCortesDOM();
          }
        }
      }
    } catch (_) { /* silencioso */ }
  }

  /* ---------- Inicialización General ---------- */
  const fire = initFire();
  initHero(fire);
  initChrome();
  initStatus();
  setInterval(initStatus, 60000);
  initSwordsParade();
  initBook();
  initBooking();
  syncGoogleSheets();
  setInterval(syncGoogleSheets, GSHEETS_CONFIG.pollIntervalMs);
})();
