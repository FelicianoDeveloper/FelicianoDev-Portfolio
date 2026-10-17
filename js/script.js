/* ------------------------------------------------------------------
       I18N — traduções PT / EN.

       No HTML, marque o elemento com:
         data-i18n="chave"           troca o texto (textContent)
         data-i18n-html="chave"      troca o conteúdo com HTML (ex.: <br />)
         data-i18n-attr="attr:chave" troca atributos (alt, aria-label, content…)
                                     vários: "alt:chave1; aria-label:chave2"

       O texto original do HTML (em inglês) continua como está.
       O idioma escolhido fica salvo no localStorage.
       ------------------------------------------------------------------ */
    const I18N = {
      en: {
        'meta.title': 'Douglas Feliciano — Front-end Developer',
        'meta.description': 'Portfolio of Douglas Feliciano, front-end developer and UI/UX designer based in Brazil.',
        'lang.label': 'Language',

        'hero.role1': 'Front-end',
        'hero.role2': 'Developer',
        'hero.tagline': 'Designing and developing bold digital experiences.',

        'about.photoAlt': 'Black and white portrait of a masked hero in a dark suit',
        'about.title': 'About<br />Me!!!',
        'about.intro': "Hi, I'm Douglas Feliciano.<br />I'm a front-end developer and UI/UX designer based in Brazil.",
        'about.tag': 'Creative & curious',
        'about.bio': "I'm a Front-End Developer focused on building modern, responsive, and visually engaging web experiences. With skills in HTML, CSS, JavaScript, Tailwind CSS, and Figma, I combine development and UI/UX design to create intuitive interfaces with strong visual identities. I'm continuously refining my skills and turning ideas into functional, well-crafted digital products.",

        'projects.kicker': 'My work',
        'projects.line1': 'Selected',
        'projects.line2': 'Projects',
        'projects.subtitle': 'A selection of responsive interfaces built to solve real problems.',

        'carousel.label': 'Image gallery',
        'carousel.more': 'Learn more',
        'carousel.prev': 'Previous image',
        'carousel.next': 'Next image',

        'footer.tagline': 'Design. Code. Impact. Building digital experiences that turn bold ideas into reality.',
        'footer.services': 'Services',
        'footer.web': 'Web Design',
        'footer.dev': 'Development',
        'footer.seo': 'SEO & Optimization',
        'footer.content': 'Content Strategy',
        'footer.company': 'Company',
        'footer.about': 'About Us',
        'footer.contact': 'Contact',
        'footer.rights': '© 2026 Feliciano Developer. All rights reserved.',
      },

      pt: {
        'meta.title': 'Douglas Feliziano — Desenvolvedor Front-end',
        'meta.description': 'Portfólio de Douglas Feliziano, desenvolvedor front-end e UI/UX designer baseado no Brasil.',
        'lang.label': 'Idioma',

        'hero.role1': 'Front-end',
        'hero.role2': 'Developer',
        'hero.tagline': 'Projetando e desenvolvendo experiências digitais ousadas.',

        'about.photoAlt': 'Retrato em preto e branco de um herói mascarado com roupa escura',
        'about.title': 'Sobre<br />Mim!!!',
        'about.intro': 'Olá, eu sou o Douglas Feliziano.<br />Sou desenvolvedor front-end e UI/UX designer, baseado no Brasil.',
        'about.tag': 'Criativo & curioso',
        'about.bio': 'Sou um desenvolvedor Front-End focado em criar experiências web modernas, responsivas e visualmente envolventes. Com habilidades em HTML, CSS, JavaScript, Tailwind CSS e Figma, combino desenvolvimento e design UI/UX para criar interfaces intuitivas com identidades visuais fortes. Estou sempre aprimorando minhas habilidades e transformando ideias em produtos digitais funcionais e bem elaborados.',

        'projects.kicker': 'Meu trabalho',
        'projects.line1': 'Projetos',
        'projects.line2': 'Destaque',
        'projects.subtitle': 'Uma seleção de interfaces responsivas criadas para resolver problemas reais.',

        'carousel.label': 'Galeria de imagens',
        'carousel.more': 'Saiba mais',
        'carousel.prev': 'Imagem anterior',
        'carousel.next': 'Próxima imagem',

        'footer.tagline': 'Design. Código. Impacto. Criando experiências digitais que transformam ideias ousadas em realidade.',
        'footer.services': 'Serviços',
        'footer.web': 'Web Design',
        'footer.dev': 'Desenvolvimento',
        'footer.seo': 'SEO e Otimização',
        'footer.content': 'Estratégia de Conteúdo',
        'footer.company': 'Empresa',
        'footer.about': 'Sobre Nós',
        'footer.contact': 'Contato',
        'footer.rights': '© 2026 Feliciano Developer. Todos os direitos reservados.',
      },
    };

    let LANG = 'en'; // idioma padrão (o mesmo texto que já está no HTML)
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'pt') LANG = saved;
    } catch (e) { /* localStorage indisponível: segue com o padrão */ }

    // Texto de um campo do ITEMS no idioma atual (cai no texto base se não houver tradução)
    function localized(item, field) {
      return (item.i18n && item.i18n[LANG] && item.i18n[LANG][field]) || item[field] || '';
    }

    function applyLanguage(lang) {
      const dict = I18N[lang];
      if (!dict) return;
      LANG = lang;

      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const text = dict[el.dataset.i18n];
        if (text !== undefined) el.textContent = text;
      });

      document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const html = dict[el.dataset.i18nHtml];
        if (html !== undefined) el.innerHTML = html;
      });

      document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        el.dataset.i18nAttr.split(';').forEach((pair) => {
          const [attr, key] = pair.split(':').map((part) => part.trim());
          if (attr && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
        });
      });

      document.querySelectorAll('[data-set-lang]').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
      });

      try { localStorage.setItem('lang', lang); } catch (e) { /* ignora */ }

      if (window.focusCarousel) window.focusCarousel.refreshCaption();
    }


  /* ------------------------------------------------------------------
       ITEMS — um objeto por imagem. Ordem do array = ordem no carrossel.

       src       (obrigatório) caminho ou URL da imagem
       title     (opcional)    texto principal da legenda
       subtitle  (opcional)    texto menor, abaixo do título
       alt       (opcional)    texto alternativo (acessibilidade). Se vazio, usa o title
       href      (opcional)    clicar na imagem central abre este link
      moreHref  (opcional)    destino do botão "Saiba mais" (usa href se vazio)
       target    (opcional)    '_blank' para abrir em nova aba (padrão '_self')
       i18n      (opcional)    traduções da legenda: { en: { title, subtitle } }.
                               Sem isso, usa os textos acima (que estão em PT)
       ------------------------------------------------------------------ */
    const ITEMS = [
      { src: './assets/images/GeloMarca.png', title: 'Gelô', subtitle: 'Muito mais que sorvete', i18n: { en: { subtitle: 'Much more than ice cream' } } },
    ];

    /* ------------------------------------------------------------------
       CONFIG — todos os ajustes do componente em um lugar só.
       ------------------------------------------------------------------ */
    const CONFIG = {
      /* ── Tamanho e posição ─────────────────────────────────────────── */
      activeWidth: 400,     // largura máxima da imagem central (px). Reduz sozinha em telas pequenas
      aspect: 3 / 4,        // proporção largura/altura de TODAS as imagens (3/4 = retrato, 1 = quadrado)
      sideScale: 0.52,      // tamanho das laterais em relação à central (0.52 = 52%)
      gap: 20,              // espaço entre as imagens (px)
      maxWidthRatio: 0.7,   // a central nunca passa de 70% da largura do container
      captionReserve: 100,  // espaço (px) reservado acima/abaixo da central para a legenda

      /* ── Efeitos das laterais ──────────────────────────────────────── */
      sideGrayscale: 1,     // 0 = coloridas · 1 = preto e branco
      blurPerStep: 2.5,     // blur (px) somado a cada imagem que se afasta da central
      blurMax: 10,          // blur máximo (px)
      fadeFrom: 2,          // a partir de qual distância começa a esmaecer
      fadePerStep: 0.14,    // quanto esmaece por passo
      fadeMin: 0.35,        // opacidade mínima (0 a 1)

      /* ── Animação (mola) ───────────────────────────────────────────── */
      // Mais stiffness = mais rápido. damping ≈ 2·√stiffness = sem "pulinho".
      // Menos damping = efeito elástico.
      spring: { stiffness: 110, damping: 21 },
      caption: {
        riseDuration: 560,  // ms: texto subindo
        stagger: 70,        // ms: atraso do subtítulo em relação ao título
        fadeOut: 180,       // ms: texto antigo sumindo
        revealAt: 0.05,     // mostra a legenda quando faltar menos que isso para assentar
      },

      /* ── Comportamento ─────────────────────────────────────────────── */
      loop: false,           // infinito (volta ao começo)
      minSlots: 12,         // mínimo de posições no anel (repete as imagens se forem poucas)
      startIndex: 0,        // item inicial
      drag: true,           // arrastar com mouse/dedo
      dragThreshold: 6,     // px de movimento para contar como arrasto (e não clique)
      flick: 0.18,          // inércia ao soltar (0 = sem inércia)
      maxFlick: 3,          // máximo de imagens puladas por um arremesso
      keyboard: true,       // setas ← → (Home / End quando loop = false)
      wheel: true,          // scroll horizontal do trackpad
      wheelCooldown: 400,   // ms entre passos do trackpad
      autoplay: { enabled: false, interval: 3500, pauseOnHover: true },

      /* ── Interface ─────────────────────────────────────────────────── */
      showCaption: true,    // título + subtítulo embaixo da central
      showIndicator: true,  // triângulo ▲ embaixo da central
      showButtons: false,    // botões de anterior/próximo
      showMoreButton: true, // botão "Saiba mais" abaixo da legenda
      moreButtonHref: 'https://felicianodeveloper.github.io/Gel-/', // destino padrão do botão

      /* ── Callback: roda quando a imagem central muda ───────────────── */
      onChange: (index, item) => {
        // console.log('Ativo:', index, item.title);
      },
    };

    (function () {
      'use strict';

      const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
      const mod = (n, m) => ((n % m) + m) % m;

      /**
       * FocusCarousel(root, { items, config })
       * Pode ser usado várias vezes na mesma página (um root por instância).
       * Retorna uma API: { next, prev, goTo(i), index, destroy }
       */
      function FocusCarousel(root, { items, config: cfg }) {
        const stage = root.querySelector('[data-fc="stage"]');
        if (!stage || !items.length) return null;

        const ac = new AbortController();
        const on = (el, ev, fn, opts) => el.addEventListener(ev, fn, { signal: ac.signal, ...opts });
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* ── Anel de posições ──────────────────────────────────────────
           Em loop, repetimos os itens até ter `minSlots` posições para
           que o "pulo" do fim do anel fique sempre fora da tela. */
        const base = items.length;
        const total = cfg.loop ? base * Math.ceil(cfg.minSlots / base) : base;

        /* ── DOM: imagens ───────────────────────────────────────────── */
        const cells = [];
        for (let i = 0; i < total; i++) {
          const item = items[i % base];
          const el = document.createElement('figure');
          el.dataset.slot = i;
          el.className = 'absolute left-1/2 top-1/2 m-0 overflow-hidden bg-neutral-500/15';
          el.style.willChange = 'transform, opacity, filter';
          el.style.transformOrigin = '50% 50%';
          el.style.visibility = 'hidden';

          const img = new Image();
          img.src = item.src;
          img.alt = item.alt ?? item.title ?? '';
          img.draggable = false;
          img.decoding = 'async';
          img.className = 'pointer-events-none block h-full w-full object-cover';

          el.appendChild(img);
          stage.appendChild(el);
          cells.push(el);
        }

        /* ── DOM: moldura invisível do item ativo (legenda + triângulo) ─ */
        const frame = document.createElement('div');
        frame.className = 'pointer-events-none absolute left-1/2 top-1/2 z-[200] -translate-x-1/2 -translate-y-1/2';
        frame.innerHTML = `
          <div data-fc="indicator" style="position:absolute;left:50%;bottom:-24px;margin-left:-4px;width:0;height:0;
               border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:8px solid currentColor;
               transform-origin:50% 100%"></div>
          <div data-fc="caption" aria-live="polite" class="absolute inset-x-0 top-full mt-[26px] flex flex-col items-start gap-2.5 text-left" style="opacity:0">
            <span class="block overflow-hidden text-base leading-[1.3]"><span data-fc="title" class="block"></span></span>
            <span data-fc="subwrap" class="block overflow-hidden text-sm leading-[1.6]"><span data-fc="subtitle" class="block"></span></span>
            <a data-fc="more" class="pointer-events-auto mt-1 inline-flex items-center text-xs font-medium uppercase text-white underline decoration-white/50 underline-offset-4 transition hover:text-white/70" href="#projects" data-i18n="carousel.more">Saiba mais</a>
          </div>`;
        stage.appendChild(frame);

        const indicator = frame.querySelector('[data-fc="indicator"]');
        const caption = frame.querySelector('[data-fc="caption"]');
        const titleEl = frame.querySelector('[data-fc="title"]');
        const subEl = frame.querySelector('[data-fc="subtitle"]');
        const subWrap = frame.querySelector('[data-fc="subwrap"]');
        const moreLink = frame.querySelector('[data-fc="more"]');
        if (!cfg.showIndicator) indicator.remove();
        if (!cfg.showCaption) caption.remove();
        if (!cfg.showMoreButton) moreLink.remove();

        const navigationButtons = cfg.showButtons ? [
          { label: 'Imagem anterior', key: 'carousel.prev', direction: -1, position: 'left-3', arrow: '\u2039' },
          { label: 'Próxima imagem', key: 'carousel.next', direction: 1, position: 'right-3', arrow: '\u203A' },
        ].map(({ label, key, direction, position, arrow }) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.setAttribute('aria-label', label);
          button.dataset.i18nAttr = 'aria-label:' + key;
          button.className = `pointer-events-auto absolute top-1/2 z-[300] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-3xl leading-none text-white transition hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${position}`;
          button.textContent = arrow;
          stage.appendChild(button);
          return { button, direction };
        }) : [];

        /* ── Medidas (responsivo) ───────────────────────────────────── */
        let W = 0, H = 0, stageW = 0, stageH = 0, step = 1;

        function measure() {
          const r = stage.getBoundingClientRect();
          stageW = r.width;
          stageH = r.height;
          const reserve = cfg.showCaption ? cfg.captionReserve : 24;
          let h = Math.min(cfg.activeWidth / cfg.aspect, stageH - reserve * 2);
          let w = h * cfg.aspect;
          const maxW = stageW * cfg.maxWidthRatio;
          if (w > maxW) w = maxW;
          W = Math.max(60, w);
          H = W / cfg.aspect;
          step = W * cfg.sideScale + cfg.gap; // px por item (usado no arrasto)

          cells.forEach((el) => { el.style.width = W + 'px'; el.style.height = H + 'px'; });
          frame.style.width = W + 'px';
          frame.style.height = H + 'px';
          render();
        }

        /* ── Estado ─────────────────────────────────────────────────────
           pos    = posição atual (animada, contínua: 2.4 = entre o 2 e o 3)
           target = destino (sempre inteiro quando em repouso)            */
        let pos = clamp(cfg.startIndex, 0, base - 1);
        let target = pos;
        let vel = 0, raf = 0, last = 0;
        let drag = null;                  // estado do arrasto em andamento
        let activeSlot = -1;              // slot ativo (para o onChange)
        let shownSlot = -1;               // slot cuja legenda está na tela
        let captionHidden = true;

        /* ── Render: aplica transform/blur/cinza/opacidade por imagem ───
           d = distância (em itens) do centro. Tudo é função contínua de d,
           por isso a animação é fluida em qualquer ponto do caminho. */
        function render() {
          const half = total / 2;
          const sd = cfg.sideScale;

          for (let i = 0; i < total; i++) {
            let d = i - pos;
            if (cfg.loop) {
              d = mod(d, total);
              if (d > half) d -= total;
            }
            const a = Math.abs(d);
            const t = Math.min(a, 1);                  // 0 = centro · 1 = lateral
            const s = 1 - (1 - sd) * t;                // escala
            // posição X: integral da largura (+gap) → espaçamento exato em qualquer d
            const xAbs = a <= 1
              ? (W + cfg.gap) * a - (W * (1 - sd) * a * a) / 2
              : (W + cfg.gap) - (W * (1 - sd)) / 2 + (W * sd + cfg.gap) * (a - 1);
            const x = d < 0 ? -xAbs : xAbs;

            const blur = Math.min(Math.max(a - 1, 0) * cfg.blurPerStep, cfg.blurMax);
            const gray = t * cfg.sideGrayscale;
            let op = 1 - clamp((a - cfg.fadeFrom) * cfg.fadePerStep, 0, 1 - cfg.fadeMin);
            if (cfg.loop) op *= clamp(half - a, 0, 1); // some antes de "pular" no anel

            const el = cells[i];
            const visible = op > 0.01 && Math.abs(x) - (W * s) / 2 < stageW / 2 + 40;
            const vis = visible ? 'visible' : 'hidden';
            if (el.style.visibility !== vis) el.style.visibility = vis;
            if (!visible) continue;

            el.style.transform = `translate3d(${(x - W / 2).toFixed(2)}px, ${(-H / 2).toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
            el.style.opacity = op.toFixed(3);
            el.style.zIndex = Math.round(100 - a * 10);
            el.style.filter = blur > 0.05 || gray > 0.005
              ? `grayscale(${gray.toFixed(3)}) blur(${blur.toFixed(2)}px)`
              : 'none';
          }
        }

        /* ── Legenda: some ao sair, sobe de novo quando a imagem assenta ─ */
        function setCaptionText(item) {
          const title = localized(item, 'title');
          const subtitle = localized(item, 'subtitle');
          titleEl.textContent = title;
          subEl.textContent = subtitle;
          subWrap.style.display = subtitle ? '' : 'none';
        }

        // Atualiza o texto da legenda já visível (usado ao trocar de idioma)
        function refreshCaption() {
          if (shownSlot >= 0) setCaptionText(items[shownSlot % base]);
        }

        function hideCaption() {
          if (captionHidden) return;
          captionHidden = true;
          caption.style.transition = `opacity ${cfg.caption.fadeOut}ms ease`;
          caption.style.opacity = '0';
        }

        function showCaption(slot) {
          const item = items[slot % base];
          shownSlot = slot;
          captionHidden = false;
          setCaptionText(item);
          if (cfg.showMoreButton) {
            moreLink.href = item.moreHref || item.href || cfg.moreButtonHref;
            moreLink.target = item.target || '_self';
            moreLink.rel = moreLink.target === '_blank' ? 'noopener noreferrer' : '';
          }
          caption.style.transition = 'none';
          caption.style.opacity = '1';
          if (reduceMotion) return;
          [titleEl, subEl].forEach((el, k) => {
            el.animate(
              [{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }],
              { duration: cfg.caption.riseDuration, delay: k * cfg.caption.stagger, easing: 'cubic-bezier(0.19, 0.8, 0.24, 1)', fill: 'backwards' }
            );
          });
        }

        /* ── Sincroniza UI (legenda, triângulo, onChange) ──────────────── */
        function syncUI() {
          const r = Math.round(target);
          const slot = cfg.loop ? mod(r, total) : clamp(r, 0, total - 1);

          if (slot !== activeSlot) {
            activeSlot = slot;
            cfg.onChange?.(slot % base, items[slot % base]);
          }

          const distance = Math.abs(target - pos);
          const settled = !drag && distance < cfg.caption.revealAt;

          if (cfg.showCaption) {
            if (slot !== shownSlot) hideCaption();
            if ((slot !== shownSlot || captionHidden) && settled) showCaption(slot);
          }

          if (cfg.showIndicator) {
            const busy = drag ? 1 : clamp(distance * 1.5, 0, 1);
            indicator.style.transform = `scale(${(1 - 0.6 * busy).toFixed(3)})`;
            indicator.style.opacity = (1 - 0.5 * busy).toFixed(3);
          }
        }

        /* ── Loop de animação (mola) — só roda enquanto algo se move ──── */
        function tick(now) {
          const dt = Math.min((now - last) / 1000, 1 / 30);
          last = now;
          raf = 0;

          if (!drag) {
            if (reduceMotion) {
              pos = target; vel = 0;
            } else {
              vel += (cfg.spring.stiffness * (target - pos) - cfg.spring.damping * vel) * dt;
              pos += vel * dt;
              if (Math.abs(target - pos) < 0.0008 && Math.abs(vel) < 0.01) { pos = target; vel = 0; }
            }
          }

          render();
          syncUI();
          if (drag || pos !== target || vel !== 0) raf = requestAnimationFrame(tick);
        }

        function schedule() {
          if (raf) return;
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }

        function setTarget(v) {
          target = cfg.loop ? v : clamp(v, 0, total - 1);
          schedule();
        }

        /* ── Navegação ───────────────────────────────────────────────── */
        const go = (n) => setTarget(Math.round(target) + n);

        navigationButtons.forEach(({ button, direction }) => {
          on(button, 'pointerdown', (e) => e.stopPropagation());
          on(button, 'click', (e) => {
            e.stopPropagation();
            go(direction);
          });
        });

        function goTo(itemIndex) {
          const cur = Math.round(target);
          if (!cfg.loop) return setTarget(itemIndex);
          let diff = mod(itemIndex - cur, base);
          if (diff > base / 2) diff -= base;
          setTarget(cur + diff);
        }

        function offsetOf(slot) {
          let d = slot - pos;
          if (cfg.loop) { d = mod(d, total); if (d > total / 2) d -= total; }
          return d;
        }

        /* ── Arrastar / clicar ───────────────────────────────────────── */
        on(stage, 'pointerdown', (e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          drag = {
            id: e.pointerId, x0: e.clientX, x: e.clientX, t: performance.now(),
            startPos: pos, v: 0, moved: false,
            cell: e.target.closest('[data-slot]'),
          };
        });

        on(stage, 'pointermove', (e) => {
          if (!drag || e.pointerId !== drag.id) return;
          const dx = e.clientX - drag.x0;
          if (!drag.moved) {
            if (!cfg.drag || Math.abs(dx) < cfg.dragThreshold) return;
            drag.moved = true;
            stage.setPointerCapture(e.pointerId);
            vel = 0;
          }
          const now = performance.now();
          const dtm = (now - drag.t) / 1000;
          if (dtm > 0) drag.v = drag.v * 0.7 + (-((e.clientX - drag.x) / step) / dtm) * 0.3;
          drag.x = e.clientX; drag.t = now;

          let p = drag.startPos - dx / step;
          if (!cfg.loop) {                         // "elástico" nas pontas
            if (p < 0) p *= 0.35;
            else if (p > total - 1) p = total - 1 + (p - (total - 1)) * 0.35;
          }
          pos = p;
          target = p;
          schedule();
        });

        function release(e, cancelled) {
          if (!drag || e.pointerId !== drag.id) return;
          const d = drag;
          drag = null;
          if (stage.hasPointerCapture?.(e.pointerId)) stage.releasePointerCapture(e.pointerId);

          if (d.moved) {
            const v = performance.now() - d.t > 80 ? 0 : d.v;      // parou antes de soltar → sem inércia
            const steps = clamp(v * cfg.flick, -cfg.maxFlick, cfg.maxFlick);
            vel = v;
            setTarget(Math.round(pos + steps));
          } else if (!cancelled && d.cell) {
            const slot = +d.cell.dataset.slot;
            if (Math.round(offsetOf(slot)) === 0) {                // clicou na central
              const item = items[slot % base];
              if (item.href) window.open(item.href, item.target || '_self');
            } else {                                                // clicou numa lateral
              setTarget(Math.round(pos + offsetOf(slot)));
            }
          } else {
            setTarget(Math.round(target));
          }
        }
        on(stage, 'pointerup', (e) => release(e, false));
        on(stage, 'pointercancel', (e) => release(e, true));

        /* ── Teclado ─────────────────────────────────────────────────── */
        if (cfg.keyboard) {
          on(root, 'keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
            else if (!cfg.loop && e.key === 'Home') { e.preventDefault(); setTarget(0); }
            else if (!cfg.loop && e.key === 'End') { e.preventDefault(); setTarget(total - 1); }
          });
        }

        /* ── Scroll horizontal (trackpad) ────────────────────────────── */
        if (cfg.wheel) {
          let lastWheel = 0;
          on(root, 'wheel', (e) => {
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 8) return; // deixa o scroll vertical da página em paz
            e.preventDefault();
            const now = performance.now();
            if (now - lastWheel < cfg.wheelCooldown) return;
            lastWheel = now;
            go(e.deltaX > 0 ? 1 : -1);
          }, { passive: false });
        }

        /* ── Autoplay ────────────────────────────────────────────────── */
        let timer = 0, hovering = false;
        if (cfg.autoplay.enabled) {
          if (cfg.autoplay.pauseOnHover) {
            on(root, 'pointerenter', () => (hovering = true));
            on(root, 'pointerleave', () => (hovering = false));
            on(root, 'focusin', () => (hovering = true));
            on(root, 'focusout', () => (hovering = false));
          }
          timer = setInterval(() => {
            if (hovering || drag || document.hidden) return;
            if (!cfg.loop && Math.round(target) >= total - 1) setTarget(0);
            else go(1);
          }, cfg.autoplay.interval);
        }

        /* ── Resize ──────────────────────────────────────────────────── */
        const ro = new ResizeObserver(measure);
        ro.observe(stage);
        measure();
        syncUI();
        schedule();

        return {
          next: () => go(1),
          prev: () => go(-1),
          goTo,
          refreshCaption,
          get index() { return activeSlot % base; },
          destroy() {
            ac.abort(); ro.disconnect(); cancelAnimationFrame(raf); clearInterval(timer);
            cells.forEach((c) => c.remove());
            navigationButtons.forEach(({ button }) => button.remove());
            frame.remove();
          },
        };
      }

      window.FocusCarousel = FocusCarousel;

      /* ── Inicialização ───────────────────────────────────────────────
         Para ter mais de um carrossel na página: duplique a <section>,
         dê outro id e chame FocusCarousel() de novo com outros items/config. */
      window.focusCarousel = FocusCarousel(document.getElementById('focus-carousel'), {
        items: ITEMS,
        config: CONFIG,
      });
    })();

    /* ── Idioma: botões EN / PT + aplica o idioma salvo ─────────────── */
    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', () => applyLanguage(btn.dataset.setLang));
    });
    applyLanguage(LANG);
  
  
  
  
  
  
  
  
  
  


    








    