/* ============================================================
   BABUbuds X1 — Interactions
   ============================================================ */
(function(){
  "use strict";

  document.documentElement.classList.add('js');

  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 760;

  if (window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ============================================================
     NAV
     ============================================================ */
  (function nav(){
    const navEl = document.getElementById('nav');
    if (!navEl) return;
    const onScroll = () => {
      navEl.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });

    const burger = document.getElementById('navBurger');
    const links = document.querySelector('.nav__links');
    if (burger && links){
      let open = false;
      burger.addEventListener('click', () => {
        open = !open;
        if (open){
          links.style.cssText = 'display:flex;flex-direction:column;gap:18px;position:fixed;top:64px;left:0;right:0;background:rgba(10,10,11,0.97);backdrop-filter:blur(16px);padding:28px 24px;border-bottom:1px solid rgba(245,245,247,0.1);font-size:15px;';
        } else {
          links.style.cssText = '';
        }
        burger.classList.toggle('is-open', open);
        burger.querySelectorAll('span').forEach((s,i)=>{
          if(open){
            if(i===0) s.style.transform='translateY(6.5px) rotate(45deg)';
            if(i===1) s.style.opacity='0';
            if(i===2) s.style.transform='translateY(-6.5px) rotate(-45deg)';
          } else {
            s.style.transform=''; s.style.opacity='';
          }
        });
      });
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        open = false;
        links.style.cssText = '';
        burger.querySelectorAll('span').forEach(s=>{ s.style.transform=''; s.style.opacity=''; });
      }));
    }
  })();

  /* ============================================================
     CUSTOM CURSOR (desktop only)
     ============================================================ */
  (function cursor(){
    if (isTouch) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    function loop(){
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    const interactive = 'a, button, .hotspot, .control-btn, .transparency__toggle, .gallery__item';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactive)) ring.classList.add('is-active');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(interactive)) ring.classList.remove('is-active');
    });
  })();

  /* ============================================================
     HERO SLIDESHOW
     ============================================================ */
  (function heroSlideshow(){
    const slides = Array.from(document.querySelectorAll('.hero__bg'));
    const dots = Array.from(document.querySelectorAll('.hero__dot'));
    const indexEl = document.getElementById('heroIndexCurrent');
    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const DURATION = 4000;

    function goTo(next){
      if (next === current) return;
      slides[current].classList.remove('active');
      slides[current].classList.add('outgoing');
      slides[next].classList.add('active');
      slides[next].classList.remove('outgoing');
      setTimeout(() => slides[current].classList.remove('outgoing'), 1700);
      current = next;
      dots.forEach((d,i) => d.classList.toggle('active', i === current));
      if (indexEl) indexEl.textContent = String(current+1).padStart(2,'0');
    }

    function nextSlide(){
      goTo((current + 1) % slides.length);
    }

    function start(){
      stop();
      if (prefersReduced) return;
      timer = setInterval(nextSlide, DURATION);
    }
    function stop(){
      if (timer) clearInterval(timer);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goTo(i);
        start();
      });
    });

    start();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });
  })();

  /* ============================================================
     HERO PARTICLES
     ============================================================ */
  (function heroParticles(){
    const container = document.getElementById('heroParticles');
    if (!container || prefersReduced) return;
    const count = isMobile ? 10 : 26;

    for (let i = 0; i < count; i++){
      const p = document.createElement('span');
      p.className = 'hero__particle';
      const left = Math.random()*100;
      const size = 1 + Math.random()*2;
      const duration = 8 + Math.random()*10;
      const delay = Math.random()*10;
      p.style.left = left + '%';
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      container.appendChild(p);

      if (window.gsap){
        gsap.to(p, {
          y: -(window.innerHeight * (0.6 + Math.random()*0.5)),
          x: (Math.random()-0.5) * 80,
          opacity: 0.6,
          duration: duration,
          delay: delay,
          repeat: -1,
          ease: 'none',
          onRepeat: () => { gsap.set(p, { y:0, opacity:0 }); }
        });
        gsap.to(p, { opacity: 0.7, duration: 2, delay: delay, repeat: -1, repeatDelay: duration-2, yoyo:true });
      }
    }
  })();

  /* ============================================================
     HERO MOUSE PARALLAX (desktop only)
     ============================================================ */
  (function heroParallax(){
    if (isTouch || prefersReduced) return;
    const hero = document.getElementById('hero');
    const labels = Array.from(document.querySelectorAll('.hero__label'));
    const content = document.querySelector('.hero__content');
    if (!hero) return;

    hero.addEventListener('mousemove', e => {
      const cx = (e.clientX / window.innerWidth) - 0.5;
      const cy = (e.clientY / window.innerHeight) - 0.5;

      labels.forEach(label => {
        const depth = parseFloat(label.dataset.depth || 0.5);
        if (window.gsap){
          gsap.to(label, { x: cx * 40 * depth, y: cy * 30 * depth, duration:0.8, ease:'power2.out' });
        }
      });
      if (content && window.gsap){
        gsap.to(content, { x: cx * 12, y: cy * 8, duration:1, ease:'power2.out' });
      }
    });
  })();

  /* ============================================================
     SCROLL REVEALS
     ============================================================ */
  (function scrollReveals(){
    if (!window.gsap || !window.ScrollTrigger) return;

    const groups = [
      { sel: '.reveal', vars: { opacity:1, duration:0.9 } },
      { sel: '.reveal-up', vars: { opacity:1, y:0, duration:1, ease:'power3.out' } },
      { sel: '.reveal-scale', vars: { opacity:1, scale:1, duration:1.1, ease:'power3.out' } },
    ];

    groups.forEach(group => {
      document.querySelectorAll(group.sel).forEach((el, i) => {
        gsap.to(el, {
          ...group.vars,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          },
          delay: (i % 4) * 0.06
        });
      });
    });

    // Nav links underline scroll spy could go here if needed (kept minimal by design)
  })();

  /* ============================================================
     PRODUCT HOTSPOTS (touch support)
     ============================================================ */
  (function hotspots(){
    const spots = Array.from(document.querySelectorAll('.hotspot'));
    if (!spots.length) return;
    spots.forEach(spot => {
      spot.addEventListener('click', (e) => {
        if (!isTouch) return;
        e.preventDefault();
        const wasActive = spot.classList.contains('is-active');
        spots.forEach(s => s.classList.remove('is-active'));
        if (!wasActive) spot.classList.add('is-active');
      });
    });
  })();

  /* ============================================================
     SOUND CANVAS — animated waveform
     ============================================================ */
  (function soundCanvas(){
    const canvas = document.getElementById('soundCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr;

    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    let visible = true;

    if (window.IntersectionObserver){
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => { visible = entry.isIntersecting; });
      }, { threshold: 0.05 });
      io.observe(canvas);
    }

    const bars = 64;

    function draw(){
      requestAnimationFrame(draw);
      if (!visible) return;
      if (prefersReduced){ t += 0.01; } else { t += 0.035; }

      ctx.clearRect(0,0,w,h);
      const mid = h/2;
      const gap = w / bars;

      for (let i=0; i<bars; i++){
        const x = i * gap + gap/2;
        const freq = 0.15 + (i/bars)*0.35;
        const amp = (Math.sin(t*1.4 + i*0.35) * 0.5 + 0.5);
        const envelope = Math.sin((i/bars) * Math.PI);
        const barH = (h*0.08) + amp * envelope * h * 0.42;

        const grad = ctx.createLinearGradient(0, mid-barH/2, 0, mid+barH/2);
        grad.addColorStop(0, 'rgba(201,168,106,0.9)');
        grad.addColorStop(0.5, 'rgba(216,218,221,0.7)');
        grad.addColorStop(1, 'rgba(201,168,106,0.9)');
        ctx.fillStyle = grad;

        const barW = Math.max(2, gap*0.36);
        ctx.beginPath();
        const rx = barW/2;
        const yTop = mid - barH/2;
        if (ctx.roundRect){
          ctx.roundRect(x - rx, yTop, barW, barH, rx);
        } else {
          ctx.rect(x - rx, yTop, barW, barH);
        }
        ctx.fill();
      }
    }
    draw();
  })();

  /* ============================================================
     SOUND PARTICLES (ambient)
     ============================================================ */
  (function soundParticles(){
    const container = document.getElementById('soundParticles');
    if (!container || prefersReduced || isMobile) return;
    const count = 14;
    for (let i=0;i<count;i++){
      const p = document.createElement('span');
      p.className = 'sound__particle';
      p.style.left = (Math.random()*100)+'%';
      p.style.top = (Math.random()*100)+'%';
      container.appendChild(p);
      if (window.gsap){
        gsap.to(p, {
          y: (Math.random()-0.5)*60,
          x: (Math.random()-0.5)*60,
          opacity: Math.random()*0.6+0.2,
          duration: 3+Math.random()*3,
          repeat:-1,
          yoyo:true,
          ease:'sine.inOut'
        });
      }
    }
  })();

  /* ============================================================
     ANC WAVEFORM — noise fades to silence on scroll
     ============================================================ */
  (function ancWaveform(){
    const path1 = document.getElementById('ancPath1');
    const path2 = document.getElementById('ancPath2');
    const path3 = document.getElementById('ancPath3');
    const caption = document.getElementById('ancCaption');
    const section = document.getElementById('anc');
    if (!path1 || !path2 || !path3 || !section) return;

    function buildWave(amplitude, freq, phase, noiseFactor){
      const points = [];
      const steps = 60;
      for (let i=0; i<=steps; i++){
        const x = (i/steps) * 1200;
        const base = Math.sin((i/steps)*Math.PI*freq + phase) * amplitude;
        const noise = noiseFactor ? (Math.sin(i*12.9 + phase*3) * amplitude * noiseFactor * 0.5) : 0;
        const y = 100 + base + noise;
        points.push(`${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return points.join(' ');
    }

    function render(progress){
      // progress: 0 = full noise, 1 = silence
      const amp = 70 * (1 - progress) + 4 * progress;
      const noise = 1 * (1 - progress);
      path1.setAttribute('d', buildWave(amp*0.8, 9, 0, noise));
      path2.setAttribute('d', buildWave(amp, 7, 1.4, noise));
      path3.setAttribute('d', buildWave(amp*0.55, 5, 2.6, noise*0.6));

      if (caption){
        caption.textContent = progress > 0.7 ? 'SILENCE.' : progress > 0.3 ? 'CANCELLING...' : 'NOISE DETECTED';
        caption.style.color = progress > 0.7 ? 'var(--platinum)' : 'var(--steel-dim)';
      }
    }

    render(0);

    if (window.gsap && window.ScrollTrigger){
      const state = { p: 0 };
      gsap.to(state, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.6,
        },
        onUpdate: () => render(state.p)
      });
    } else {
      window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh)));
        render(progress);
      }, { passive:true });
    }
  })();

  /* ============================================================
     TRANSPARENCY TOGGLE
     ============================================================ */
  (function transparencyToggle(){
    const toggle = document.getElementById('transparencyToggle');
    const section = document.getElementById('transparency');
    const desc = document.getElementById('transparencyDesc');
    const isolateBtn = document.querySelector('.transparency__option--isolate');
    const awareBtn = document.querySelector('.transparency__option--aware');
    if (!toggle || !section) return;

    const copy = {
      isolate: 'Every outside sound fades away. Just you and the music.',
      aware: 'Ambient sound blends in naturally, so conversations and announcements come through clearly.'
    };

    function setMode(mode){
      const aware = mode === 'aware';
      toggle.classList.toggle('is-aware', aware);
      section.classList.toggle('mode-aware', aware);
      if (isolateBtn) isolateBtn.classList.toggle('active', !aware);
      if (awareBtn) awareBtn.classList.toggle('active', aware);
      if (desc) desc.textContent = copy[mode];
    }

    toggle.addEventListener('click', () => {
      const nowAware = !toggle.classList.contains('is-aware');
      setMode(nowAware ? 'aware' : 'isolate');
    });
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggle.click();
      }
    });

    setMode('isolate');
  })();

  /* ============================================================
     BATTERY COUNTER
     ============================================================ */
  (function batteryCounter(){
    const fill = document.getElementById('batteryFill');
    const percent = document.getElementById('batteryPercent');
    const section = document.getElementById('battery');
    if (!fill || !percent || !section) return;

    let animated = false;

    function animate(){
      if (animated) return;
      animated = true;
      const state = { v: 0 };
      if (window.gsap){
        gsap.to(state, {
          v: 100,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            const val = Math.round(state.v);
            fill.style.width = val + '%';
            percent.textContent = val + '%';
          }
        });
      } else {
        fill.style.width = '100%';
        percent.textContent = '100%';
      }
    }

    if (window.IntersectionObserver){
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) animate(); });
      }, { threshold: 0.4 });
      io.observe(section);
    } else {
      animate();
    }
  })();

  /* ============================================================
     CONTROLS PANEL
     ============================================================ */
  (function controlsPanel(){
    const buttons = Array.from(document.querySelectorAll('.control-btn'));
    const hint = document.getElementById('controlsHint');
    const playIcon = document.getElementById('playIcon');
    if (!buttons.length) return;

    const messages = {
      'volume-down': 'Volume decreased.',
      'volume-up': 'Volume increased.',
      'skip': 'Skipped to next track.',
      'anc': 'Adaptive ANC toggled.',
      'voice': 'Voice assistant activated.',
      'play': null
    };

    let playing = false;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.add('is-pressed');
        setTimeout(() => btn.classList.remove('is-pressed'), 260);

        const control = btn.dataset.control;
        if (control === 'play'){
          playing = !playing;
          if (playIcon) playIcon.textContent = playing ? '❚❚' : '▶';
          if (hint) hint.textContent = playing ? 'Now playing.' : 'Paused.';
          return;
        }
        if (hint && messages[control]) hint.textContent = messages[control];
      });
    });
  })();

  /* ============================================================
     CONNECTIVITY DIAGRAM
     ============================================================ */
  (function connectivity(){
    const svg = document.querySelector('.connectivity__lines');
    const section = document.getElementById('connectivity');
    if (!svg || !section) return;

    const paths = {
      linephone: 'M400,250 Q260,150 120,40',
      linetablet: 'M400,250 Q540,150 680,40',
      linelaptop: 'M400,250 Q260,350 120,460',
      linetv: 'M400,250 Q540,350 680,460'
    };

    Object.entries(paths).forEach(([id, d]) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('d', d);
    });

    let animated = false;
    function animate(){
      if (animated) return;
      animated = true;
      const lines = svg.querySelectorAll('.conn-line');
      lines.forEach((line, i) => {
        if (window.gsap){
          gsap.fromTo(line, { strokeDashoffset: 120, opacity:0 }, {
            strokeDashoffset: 0, opacity:1, duration:1.2, delay:i*0.15, ease:'power2.out'
          });
          gsap.to(line, {
            strokeDashoffset: -18,
            duration: 1.6,
            repeat: -1,
            ease: 'none',
            delay: 1.2 + i*0.15
          });
        } else {
          line.style.opacity = 1;
        }
      });
    }

    if (window.IntersectionObserver){
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) animate(); });
      }, { threshold: 0.3 });
      io.observe(section);
    } else {
      animate();
    }
  })();

})();
