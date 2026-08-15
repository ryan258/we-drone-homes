// HUD Viewport & FPV Telemetry Simulator
document.addEventListener('DOMContentLoaded', () => {
  const hudContainer = document.querySelector('.hud-viewport');
  if (!hudContainer) return;

  const canvas = hudContainer.querySelector('.hud-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const throttleInput = document.getElementById('hud-throttle');
  const throttleValDisplay = document.getElementById('throttle-val');
  const btnToggleOsd = document.getElementById('btn-toggle-osd');
  const btnDisarm = document.getElementById('btn-disarm');
  const osdLayer = hudContainer.querySelector('.hud-osd');
  const battVoltageEl = document.getElementById('osd-voltage');
  const speedEl = document.getElementById('osd-speed');
  const altEl = document.getElementById('osd-alt');
  const artificialHorizon = document.querySelector('.artificial-horizon-bar');

  let isDisarmed = false;
  let baseVoltage = 16.2;
  let currentPitch = 0;
  let currentRoll = 0;
  let mouseX = 0;
  let mouseY = 0;

  // Canvas size sync
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Mouse tracking for horizon & pitch
  hudContainer.addEventListener('mousemove', (e) => {
    if (isDisarmed) return;
    const rect = hudContainer.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    currentRoll = mouseX * 45; // Degrees roll
    currentPitch = mouseY * -30; // Degrees pitch

    if (artificialHorizon) {
      artificialHorizon.style.transform = `translateY(${mouseY * 40}px) rotate(${currentRoll}deg)`;
    }
  });

  // Reset when leaving
  hudContainer.addEventListener('mouseleave', () => {
    currentRoll = 0;
    currentPitch = 0;
    if (artificialHorizon) {
      artificialHorizon.style.transform = 'translateY(0) rotate(0deg)';
    }
  });

  // Throttle control
  if (throttleInput) {
    throttleInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (throttleValDisplay) throttleValDisplay.textContent = `${val}%`;

      // Telemetry dynamics based on throttle
      if (speedEl) {
        const calculatedSpeed = (20 + (val * 0.7)).toFixed(1);
        speedEl.textContent = `${calculatedSpeed} MPH`;
      }

      if (altEl) {
        const calculatedAlt = (4 + (val * 0.12)).toFixed(1);
        altEl.textContent = `${calculatedAlt} FT`;
      }

      // Battery voltage sag under load
      if (battVoltageEl) {
        const sag = (val / 100) * 1.8;
        const liveVoltage = (baseVoltage - sag).toFixed(1);
        battVoltageEl.textContent = `${liveVoltage}V`;
      }
    });
  }

  // OSD Toggle
  if (btnToggleOsd && osdLayer) {
    btnToggleOsd.addEventListener('click', () => {
      osdLayer.classList.toggle('hidden');
      btnToggleOsd.classList.toggle('active');
      if (osdLayer.classList.contains('hidden')) {
        osdLayer.style.display = 'none';
      } else {
        osdLayer.style.display = 'flex';
      }
    });
  }

  // Disarm button
  if (btnDisarm) {
    btnDisarm.addEventListener('click', () => {
      isDisarmed = !isDisarmed;
      hudContainer.classList.toggle('disarmed', isDisarmed);
      btnDisarm.textContent = isDisarmed ? '⚡ RE-ARM DRONE' : '⚠️ EMERGENCY DISARM';
      btnDisarm.classList.toggle('btn-danger', !isDisarmed);
      btnDisarm.classList.toggle('btn-amber', isDisarmed);

      if (isDisarmed && window.WDHAudio) {
        window.WDHAudio.playGlassShatter();
      }
    });
  }
});
