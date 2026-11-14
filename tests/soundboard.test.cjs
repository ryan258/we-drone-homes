const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function element(name = '') {
  const listeners = new Map();
  const classes = new Set();
  return {
    dataset: {}, value: '50', textContent: '',
    classList: { add: value => classes.add(value), remove: value => classes.delete(value), contains: value => classes.has(value) },
    addEventListener: (event, handler) => listeners.set(event, handler),
    fire: event => listeners.get(event)?.(),
    querySelector: () => ({ textContent: name }),
  };
}
function fixture() {
  const volume = element(), status = element(), stop = element();
  const first = element('First'), second = element('Second');
  first.dataset.sound = 'whoosh'; second.dataset.sound = 'radio';
  const requests = [], sources = [];
  let context;
  class SyntheticAudioContext {
    constructor() { context = this; this.currentTime = 0; this.state = 'suspended'; this.destination = {}; }
    createGain() { return { gain: { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, setTargetAtTime() {} }, connect() {} }; }
    createOscillator() {
      const source = { stops: 0, frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}, disconnect() {}, start() {}, stop() { this.stops++; } };
      sources.push(source); return source;
    }
    resume() { const request = deferred(); requests.push(request); return request.promise; }
  }
  const ids = { 'sound-volume': volume, 'sound-status': status, 'stop-audio': stop };
  const document = { getElementById: id => ids[id], querySelectorAll: () => [first, second], addEventListener() {}, hidden: false };
  const source = fs.readFileSync(path.join(__dirname, '../assets/js/soundboard.js'), 'utf8');
  new vm.Script(source, { filename: 'soundboard.js' }).runInNewContext({
    document, window: { AudioContext: SyntheticAudioContext },
    setTimeout: () => 1, clearTimeout() {},
    fetch() { throw new Error('Network disabled in synthetic harness'); },
  });
  return { first, second, stop, status, requests, sources, get context() { return context; } };
}

test('a rejected older resume cannot stop or relabel a newer successful pad', async () => {
  const f = fixture();
  const olderClick = f.first.fire('click');
  const newerClick = f.second.fire('click');
  assert.equal(f.requests.length, 2);
  f.context.state = 'running';
  f.requests[1].resolve();
  await newerClick;
  assert.equal(f.second.classList.contains('playing'), true);
  assert.equal(f.status.textContent, 'Playing: Second.');
  assert.equal(f.sources.length, 1);
  assert.equal(f.sources[0].stops, 1, 'only scheduled end is present');
  f.requests[0].reject(new Error('Synthetic stale resume rejection'));
  await olderClick;
  assert.equal(f.second.classList.contains('playing'), true, 'older rejection must preserve newer active pad');
  assert.equal(f.status.textContent, 'Playing: Second.');
  assert.equal(f.sources[0].stops, 1, 'older rejection must not issue Stop against newer sound');
});

test('a rejected current resume still reports failure and leaves no active pad', async () => {
  const f = fixture();
  const current = f.first.fire('click');
  f.requests[0].reject(new Error('Synthetic current resume rejection'));
  await current;
  assert.equal(f.first.classList.contains('playing'), false);
  assert.equal(f.sources.length, 0);
  assert.equal(f.status.textContent, 'Audio could not start. Check your browser audio settings and try again.');
});

test('Stop invalidates a pending successful resume without starting sound', async () => {
  const f = fixture();
  const pending = f.first.fire('click');
  f.stop.fire('click');
  f.context.state = 'running';
  f.requests[0].resolve();
  await pending;
  assert.equal(f.sources.length, 0);
  assert.equal(f.first.classList.contains('playing'), false);
  assert.equal(f.status.textContent, 'All sounds stopped. Peace has returned to the neighborhood.');
});
