/* Short, synthesized sounds. Audio begins only after an explicit pad activation. */
(() => {
  'use strict';
  const volume = document.getElementById('sound-volume');
  const status = document.getElementById('sound-status');
  const pads = [...document.querySelectorAll('.sound-pad')];
  if (!volume || !status || !pads.length) return;
  let context = null;
  let master = null;
  let playingPad = null;
  let timer = null;
  const sources = new Set();
  function stop() {
    clearTimeout(timer);
    sources.forEach(source => { try { source.stop(); } catch (_) { /* Already stopped. */ } source.disconnect(); });
    sources.clear();
    playingPad?.classList.remove('playing');
    playingPad = null;
  }
  function track(source) {
    sources.add(source);
    source.onended = () => { sources.delete(source); source.disconnect(); };
    return source;
  }
  function tone(type, frequencies, duration, offset = 0, level = 0.4) {
    const start = context.currentTime + offset;
    const source = track(context.createOscillator());
    const gain = context.createGain();
    source.type = type;
    source.frequency.setValueAtTime(frequencies[0], start);
    frequencies.slice(1).forEach((frequency, index) => source.frequency.exponentialRampToValueAtTime(frequency, start + duration * (index + 1) / (frequencies.length - 1)));
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(level, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    source.connect(gain); gain.connect(master);
    source.start(start); source.stop(start + duration);
  }
  function glass() {
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.6), context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index++) data[index] = Math.random() * 2 - 1;
    const source = track(context.createBufferSource()); source.buffer = buffer;
    const filter = context.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 3200;
    const gain = context.createGain(); gain.gain.setValueAtTime(0.4, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.6);
    source.connect(filter); filter.connect(gain); gain.connect(master); source.start();
  }
  const sounds = {
    whoosh: () => tone('sawtooth', [140, 750, 220], 1.2, 0, 0.25),
    lipo: () => [0, 0.18, 0.36].forEach(offset => tone('sine', [2200, 2200], 0.1, offset, 0.3)),
    shatter: glass,
    radio: () => tone('triangle', [950, 700], 0.25),
    bass: () => tone('sine', [160, 32], 1.5),
    siren: () => tone('square', [800, 1400, 800], 0.6, 0, 0.15)
  };
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    status.textContent = 'This browser does not support the soundboard. The captions remain available.';
    pads.forEach(pad => { pad.disabled = true; });
    return;
  }
  // Incrementing the request prevents an older resume promise from playing after Stop.
  let request = 0;
  pads.forEach(pad => pad.addEventListener('click', async () => {
    const currentRequest = ++request;
    try {
      stop();
      if (!context) { context = new AudioContext(); master = context.createGain(); master.connect(context.destination); }
      master.gain.value = Number(volume.value) / 100;
      if (context.state === 'suspended') await context.resume();
      if (currentRequest !== request) return;
      sounds[pad.dataset.sound]();
      playingPad = pad; pad.classList.add('playing');
      status.textContent = `Playing: ${pad.querySelector('.pad-name').textContent}.`;
      timer = setTimeout(() => { stop(); status.textContent = 'Ready for another questionable sound.'; }, 1600);
    } catch (_) { if (currentRequest !== request) return; stop(); status.textContent = 'Audio could not start. Check your browser audio settings and try again.'; }
  }));
  volume.addEventListener('input', () => {
    document.getElementById('sound-volume-value').textContent = `${volume.value}%`;
    if (master) master.gain.setTargetAtTime(Number(volume.value) / 100, context.currentTime, 0.02);
  });
  document.getElementById('stop-audio').addEventListener('click', () => { request++; stop(); status.textContent = 'All sounds stopped. Peace has returned to the neighborhood.'; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { request++; stop(); status.textContent = 'Audio stopped while this page was away.'; } });
})();
