/* We Drone Homes: local-only parody interactions. No storage or network requests. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  const setText = (selector, text) => { const node = $(selector); if (node) node.textContent = text; };

  const menu = $('.main-nav');
  const toggle = $('.menu-toggle');
  function closeMenu(returnFocus = false) {
    if (!menu || !toggle) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('span').textContent = '＋';
    if (returnFocus) toggle.focus();
  }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? '−' : '＋';
  });
  menu?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') closeMenu(true); });
  document.addEventListener('click', event => { if (menu?.classList.contains('is-open') && !event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 721px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const viewer = $('[data-shot-viewer]');
  if (viewer) {
    const image = $('#hero-shot', viewer);
    const report = $('#shot-title', viewer);
    const next = $('.shot-next', viewer);
    const shots = $$('[data-photo]', $('#property-photos', viewer).content);
    if (shots.length > 1) {
      let current = 0;
      next.hidden = false;
      next.addEventListener('click', () => {
        current = (current + 1) % shots.length;
        const { src, alt, title, caption, report: href } = shots[current].dataset;
        image.src = src;
        image.alt = alt;
        report.href = href;
        report.textContent = title;
        setText('#shot-caption', caption);
        setText('#shot-count', `Photo ${current + 1} of ${shots.length}: ${title}`);
      });
    }
  }

  const filters = $('[data-property-filters]');
  filters?.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    const value = button.dataset.filter;
    $$('[data-filter]', filters).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const cards = $$('[data-property-category]');
    cards.forEach(card => { card.hidden = value !== 'all' && card.dataset.propertyCategory !== value; });
    const count = cards.filter(card => !card.hidden).length;
    setText('#property-count', `${count} fictional ${count === 1 ? 'property' : 'properties'}`);
  });

  const booking = $('#booking-form');
  if (booking) {
    const requested = new URLSearchParams(window.location.search).get('package');
    $$('[name="package"]', booking).forEach(input => { if (input.value === requested) input.checked = true; });
    let brief = null;
    const result = $('#booking-result');
    const submitLabel = $('#booking-submit-label');
    function values() {
      const tier = $('[name="package"]:checked', booking);
      const extras = $$('[name="extra"]:checked', booking);
      const base = Number(tier.dataset.price);
      const extraCost = extras.reduce((sum, extra) => sum + Number(extra.value), 0);
      return { name: tier.dataset.name, base, extras, extraCost, total: base + extraCost, property: $('#booking-property').value, light: $('#booking-window').value };
    }
    function renderBooking() {
      const data = values();
      setText('#booking-package-name', data.name);
      setText('#booking-base', money(data.base));
      setText('#booking-extras', money(data.extraCost));
      setText('#booking-total', money(data.total));
      result.hidden = true;
      brief = null;
      submitLabel.textContent = 'Generate mock flight brief';
    }
    booking.addEventListener('change', renderBooking);
    booking.addEventListener('submit', event => {
      event.preventDefault();
      const data = values();
      const reference = `WDH-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const extraNames = data.extras.map(extra => extra.dataset.name).join(', ') || 'None';
      brief = ['WE DRONE HOMES — FICTIONAL MISSION BRIEF', 'SIMULATION ONLY. THIS IS NOT A BOOKING OR INVOICE.', '', `Reference: ${reference}`, `Property: ${data.property}`, `Package: ${data.name}`, `Preferred light: ${data.light}`, `Extras: ${extraNames}`, `Photography package: ${money(data.base)}`, `Extras: ${money(data.extraCost)}`, `Imaginary total: ${money(data.total)}`, '', 'No request was sent. No appointment exists. No money was charged.', 'All people, properties, services, and prices are fictional.', 'Cameras on board. That is the payload.'].join('\n');
      setText('#booking-confirmation', `${reference} / ${data.name} at ${data.property}. ${data.light}. Extras: ${extraNames}. Imaginary total: ${money(data.total)}.`);
      result.hidden = false;
      submitLabel.textContent = 'Generate another mock flight brief';
      result.focus({ preventScroll: true });
      result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    });
    $('#download-brief').addEventListener('click', () => {
      if (!brief) return;
      const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url; link.download = 'we-drone-homes-fictional-mission.txt';
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    $('#booking-reset').addEventListener('click', () => { booking.reset(); renderBooking(); $('[name="package"]:checked', booking).focus(); });
    renderBooking();
  }

  const damage = $('#damage-form');
  if (damage) {
    function calculate() {
      const sqft = Number($('#calc-sqft').value);
      const lights = Number($('#calc-chandeliers').value);
      const ceiling = Number($('#calc-ceiling').value);
      const pets = Number($('#calc-pets').value);
      const tier = $('[name="calc-package"]:checked', damage);
      const base = Number(tier.value);
      const extra = $$('[name="calc-extra"]:checked', damage).reduce((sum, input) => sum + Number(input.value), 0);
      const spackle = Math.round(sqft / 1000 * 45 + lights * 30);
      setText('#sqft-display', `${sqft.toLocaleString('en-US')} sq ft`);
      const fields = { '#calc-base': base, '#calc-ceiling-cost': ceiling, '#calc-light-cost': lights * 125, '#calc-pet-cost': pets, '#calc-spackle-cost': spackle, '#calc-extras-cost': extra, '#calc-total': base + ceiling + lights * 125 + pets + spackle + extra };
      Object.entries(fields).forEach(([selector, value]) => setText(selector, money(value)));
      const target = $('#calc-book');
      const url = new URL(target.href); url.searchParams.set('package', tier.dataset.package); target.href = url.href;
    }
    damage.addEventListener('input', calculate);
    damage.addEventListener('change', calculate);
    damage.addEventListener('reset', () => setTimeout(calculate, 0));
    damage.addEventListener('submit', event => event.preventDefault());
    calculate();
  }

  const waiver = $('#waiver-form');
  waiver?.addEventListener('submit', event => { event.preventDefault(); $('#waiver-result').hidden = false; });
  waiver?.addEventListener('change', () => { $('#waiver-result').hidden = true; });

  const terminal = $('#terminal-log');
  if (terminal) {
    const replies = {
      status: 'FLEET STATUS: 3 drones. 3 pilots. 2 functioning folding chairs.\nREADINESS: Technically a yes. SPACKLE: Fully stocked.',
      'scan-hoa': 'SIMULATED SCAN COMPLETE.\nOne clipboard detected near the gazebo. Threat level: strongly worded email.',
      'launch-recon': 'SIMULATION: Imaginary aircraft airborne.\nCamera armed. Coffee secured. Actual drones launched: 0.',
      'spackle-calc': 'SPACKLE INVENTORY: More than our accountant thinks is normal.\nFor an itemized fictional estimate, visit the Damage Calculator in the footer.',
      pilots: 'PROPWASH: Ready.\nTREMOR: Finding the good battery.\nSKYKAREN: Reading the HOA bylaws. Recreationally.',
      help: 'COMMANDS: status (s), scan-hoa (h), launch-recon (l), spackle-calc, pilots (p), clear.\nThe buttons run the same commands. No typing is required.'
    };
    const aliases = { s: 'status', h: 'scan-hoa', l: 'launch-recon', p: 'pilots' };
    function run(raw) {
      const value = raw.trim().toLowerCase().slice(0, 80);
      if (!value) return;
      const command = aliases[value] || value;
      if (command === 'clear') { terminal.textContent = 'CONSOLE CLEARED. REPUTATION STILL PENDING.'; return; }
      const line = document.createElement('div');
      line.textContent = `\n> ${value}\n${Object.hasOwn(replies, command) ? replies[command] : 'COMMAND NOT RECOGNIZED. Try help, or choose a button above.'}`;
      terminal.append(line);
      while (terminal.childNodes.length > 30) terminal.firstChild.remove();
      terminal.scrollTop = terminal.scrollHeight;
    }
    $$('[data-command]').forEach(button => button.addEventListener('click', () => run(button.dataset.command)));
    $('#terminal-form').addEventListener('submit', event => { event.preventDefault(); const input = $('#terminal-command'); run(input.value); input.value = ''; });
  }

  const route = $('[data-route-simulator]');
  if (route) {
    const path = $('#sim-flight-path');
    const drone = $('#sim-drone');
    const progress = $('#route-progress');
    const play = $('#route-play');
    const reset = $('#route-reset');
    const controls = $('.route-controls', route);
    const readout = $('#route-readout');
    const percentLabel = $('#route-percent');
    const stageStatus = $('#route-status');
    const playLabel = $('[data-route-play-label]', play);
    const playGlyph = $('[data-route-play-glyph]', play);
    const pauseGlyph = $('[data-route-pause-glyph]', play);
    const stages = $$('[data-route-step]', route);
    const stepSize = 100 / stages.length;
    const length = path.getTotalLength();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let playing = false;
    let lastTime = 0;
    let position = 0;
    let lastPercent = -1;
    let lastStage = -1;

    function draw() {
      const point = path.getPointAtLength(length * position / 100);
      drone.setAttribute('cx', point.x);
      drone.setAttribute('cy', point.y);
      const percent = Math.floor(position);
      if (percent !== lastPercent) {
        progress.value = String(percent);
        percentLabel.textContent = `${percent}%`;
        lastPercent = percent;
      }
      const stage = Math.min(stages.length, Math.floor(percent / stepSize));
      if (stage !== lastStage) {
        stageStatus.textContent = stages[stage]?.textContent ?? 'Flight complete';
        stages[lastStage]?.removeAttribute('aria-current');
        stages[stage]?.setAttribute('aria-current', 'step');
        lastStage = stage;
      }
    }

    function labelPlayControl() {
      if (reduce.matches) playLabel.textContent = position >= 100 ? 'Restart flight steps' : 'Next flight step';
      else if (playing) playLabel.textContent = 'Pause simulated flight';
      else playLabel.textContent = position >= 100 ? 'Replay simulated flight' : 'Play simulated flight';
      playGlyph.hidden = playing;
      pauseGlyph.hidden = !playing;
    }

    function stop() {
      playing = false;
      cancelAnimationFrame(frame);
      labelPlayControl();
    }

    function tick(time) {
      if (!playing) return;
      const elapsed = Math.max(0, Math.min(time - lastTime, 100));
      position = Math.min(100, position + elapsed / 120);
      lastTime = time;
      draw();
      if (position >= 100) stop();
      else frame = requestAnimationFrame(tick);
    }

    play.addEventListener('click', () => {
      if (reduce.matches) {
        position = position >= 100 ? 0 : Math.min(100, (Math.floor(position / stepSize) + 1) * stepSize);
        labelPlayControl();
        draw();
        return;
      }
      if (playing) {
        stop();
        return;
      }
      if (position >= 100) {
        position = 0;
        draw();
      }
      playing = true;
      lastTime = performance.now();
      labelPlayControl();
      frame = requestAnimationFrame(tick);
    });

    progress.addEventListener('input', () => {
      position = Number(progress.value);
      stop();
      draw();
    });
    reset.addEventListener('click', () => {
      position = 0;
      stop();
      draw();
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
    reduce.addEventListener('change', stop);
    labelPlayControl();
    draw();
    controls.hidden = false;
    readout.hidden = false;
  }
})();
