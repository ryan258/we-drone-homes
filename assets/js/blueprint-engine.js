// 2D Penetration Vector Blueprint Interactive Presentation Engine
// Provides real-time incursion flight simulation, waypoint inspection, layer filtering, and presentation controls.

(function () {
  'use strict';

  class BlueprintPresentationTool {
    constructor(container) {
      this.container = container;
      this.svg = container.querySelector('.blueprint-svg');
      this.flightPath = container.querySelector('#blueprint-flight-path');
      this.droneAvatar = container.querySelector('#blueprint-drone-avatar');
      this.radarSweep = container.querySelector('.blueprint-radar-sweep');
      this.scrubber = container.querySelector('#blueprint-scrubber');
      this.playBtn = container.querySelector('#btn-blueprint-play');
      this.speedBtns = container.querySelectorAll('.btn-speed-select');
      this.modeBtns = container.querySelectorAll('.btn-mode-select');
      this.layerToggles = container.querySelectorAll('.layer-toggle-checkbox');
      this.fullscreenBtn = container.querySelector('#btn-blueprint-fullscreen');
      this.sectorReadout = container.querySelector('#blueprint-active-sector');
      this.speedReadout = container.querySelector('#blueprint-speed-val');
      this.coordReadout = container.querySelector('#blueprint-coord-val');
      this.altReadout = container.querySelector('#blueprint-alt-val');
      this.popover = container.querySelector('.waypoint-popover');
      this.waypoints = container.querySelectorAll('.waypoint-marker');

      if (!this.flightPath || !this.droneAvatar) return;

      this.pathLength = this.flightPath.getTotalLength();
      this.progress = 0; // 0.0 to 1.0
      this.isPlaying = false;
      this.speedMultiplier = 1.0;
      this.baseDuration = 12000; // 12 seconds for full flight loop
      this.lastTimestamp = null;
      this.currentSector = "GRAND FOYER";
      this.activeWaypoint = null;

      this.init();
    }

    init() {
      this.bindEvents();
      this.updateDronePosition(0);
      this.setMode('cad');
      
      // Auto-start slow preview after 1 second if visible
      setTimeout(() => {
        if (!this.isPlaying) {
          this.togglePlay(true);
        }
      }, 1000);
    }

    bindEvents() {
      // Play / Pause Toggle
      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => this.togglePlay());
      }

      // Replay Button
      const replayBtn = this.container.querySelector('#btn-blueprint-replay');
      if (replayBtn) {
        replayBtn.addEventListener('click', () => {
          this.progress = 0;
          this.updateDronePosition(0);
          this.togglePlay(true);
          this.playTacticalChirp(587.33);
        });
      }

      // Scrubber input
      if (this.scrubber) {
        this.scrubber.addEventListener('input', (e) => {
          this.isPlaying = false;
          this.updatePlayBtnState();
          this.progress = parseFloat(e.target.value) / 100;
          this.updateDronePosition(this.progress);
        });
      }

      // Speed selection
      this.speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.speedBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.speedMultiplier = parseFloat(btn.dataset.speed || '1.0');
          this.playTacticalChirp(880);
        });
      });

      // Visual Mode switching (CAD / NVG / FLIR)
      this.modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.modeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.setMode(btn.dataset.mode);
          this.playTacticalChirp(700);
        });
      });

      // Layer Toggles (Hazards, Dimensions, Scanner)
      this.layerToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
          const layerId = e.target.dataset.layer;
          const targetGroup = this.container.querySelector(`.layer-${layerId}`);
          if (targetGroup) {
            targetGroup.style.display = e.target.checked ? 'block' : 'none';
          }
          this.playTacticalChirp(440);
        });
      });

      // Waypoint Hotspots
      this.waypoints.forEach(wp => {
        wp.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetProgress = parseFloat(wp.dataset.progress || '0');
          this.progress = targetProgress;
          this.updateDronePosition(this.progress);
          this.showWaypointInfo(wp);
          this.playTacticalChirp(1046.5);
        });

        wp.addEventListener('mouseenter', () => {
          this.showWaypointInfo(wp);
        });
      });

      // Dismiss popover on outside click
      this.container.addEventListener('click', (e) => {
        if (!e.target.closest('.waypoint-marker') && !e.target.closest('.waypoint-popover')) {
          this.hideWaypointInfo();
        }
      });

      // Fullscreen / Presentation Mode
      if (this.fullscreenBtn) {
        this.fullscreenBtn.addEventListener('click', () => {
          this.toggleFullscreen();
        });
      }
    }

    togglePlay(forceState) {
      this.isPlaying = typeof forceState === 'boolean' ? forceState : !this.isPlaying;
      this.updatePlayBtnState();

      if (this.isPlaying) {
        this.lastTimestamp = performance.now();
        requestAnimationFrame(this.animate.bind(this));
        if (window.WDHAudio && typeof window.WDHAudio.init === 'function') {
          window.WDHAudio.init();
        }
      }
    }

    updatePlayBtnState() {
      if (!this.playBtn) return;
      this.playBtn.innerHTML = this.isPlaying ? '⏸ PAUSE' : '▶ PLAY';
      this.playBtn.classList.toggle('btn-playing', this.isPlaying);
    }

    animate(timestamp) {
      if (!this.isPlaying) return;

      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      const delta = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      // Increment progress
      const step = (delta / (this.baseDuration / this.speedMultiplier));
      this.progress += step;

      if (this.progress >= 1.0) {
        this.progress = 0; // Loop flight
      }

      this.updateDronePosition(this.progress);

      if (this.scrubber) {
        this.scrubber.value = Math.round(this.progress * 100);
      }

      requestAnimationFrame(this.animate.bind(this));
    }

    updateDronePosition(progress) {
      const distance = progress * this.pathLength;
      const point = this.flightPath.getPointAtLength(distance);

      // Compute heading angle from slight forward delta
      const lookAhead = Math.min(distance + 2, this.pathLength);
      const nextPoint = this.flightPath.getPointAtLength(lookAhead);
      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Position drone avatar
      this.droneAvatar.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);

      // Update telemetry readouts
      const currentSpeed = 35 + Math.sin(progress * Math.PI * 4) * 23 + (progress > 0.8 ? 20 : 0);
      const currentAlt = (3.5 + Math.cos(progress * Math.PI * 6) * 4.5).toFixed(1);

      if (this.speedReadout) {
        this.speedReadout.textContent = `${currentSpeed.toFixed(1)} MPH`;
      }
      if (this.altReadout) {
        this.altReadout.textContent = `${currentAlt} FT`;
      }
      if (this.coordReadout) {
        this.coordReadout.textContent = `X: ${(point.x * 0.45).toFixed(1)}m / Y: ${(point.y * 0.45).toFixed(1)}m`;
      }

      // Update active sector based on coordinates
      let sector = "GRAND FOYER";
      if (point.x > 220 && point.y < 140) {
        sector = "CHEF'S KITCHEN";
      } else if (point.x > 220 && point.y >= 140) {
        sector = "MASTER SUITE";
      } else if (point.x < 100) {
        sector = "EXTERIOR PORCH / ENTRY";
      } else if (point.x > 500) {
        sector = "EXTRACTION PORTAL";
      }

      if (this.sectorReadout && this.currentSector !== sector) {
        this.currentSector = sector;
        this.sectorReadout.textContent = sector;
        this.highlightActiveRoom(sector);
      }
    }

    highlightActiveRoom(sector) {
      const rooms = this.container.querySelectorAll('.blueprint-room-shape');
      rooms.forEach(r => {
        const isMatch = r.dataset.room === sector;
        r.classList.toggle('active-sector-glow', isMatch);
      });
    }

    showWaypointInfo(wp) {
      if (!this.popover) return;
      const title = wp.dataset.title || "Tactical Incursion Point";
      const desc = wp.dataset.desc || "Optimal flight corridor entry.";
      const speed = wp.dataset.speed || "52.4 MPH";
      const clearance = wp.dataset.clearance || "6.2 IN";
      const hazard = wp.dataset.hazard || "NOMINAL";

      const popoverTitle = this.popover.querySelector('.popover-title');
      const popoverDesc = this.popover.querySelector('.popover-desc');
      const popoverSpeed = this.popover.querySelector('.popover-speed');
      const popoverClearance = this.popover.querySelector('.popover-clearance');
      const popoverHazard = this.popover.querySelector('.popover-hazard');

      if (popoverTitle) popoverTitle.textContent = title;
      if (popoverDesc) popoverDesc.textContent = desc;
      if (popoverSpeed) popoverSpeed.textContent = speed;
      if (popoverClearance) popoverClearance.textContent = clearance;
      if (popoverHazard) {
        popoverHazard.textContent = hazard;
        popoverHazard.className = `popover-hazard ${hazard.includes('HIGH') || hazard.includes('CRITICAL') ? 'text-danger' : 'text-green'}`;
      }

      const rect = wp.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();
      
      const left = Math.min(Math.max(rect.left - containerRect.left - 120, 20), containerRect.width - 280);
      const top = Math.max(rect.top - containerRect.top - 140, 20);

      this.popover.style.left = `${left}px`;
      this.popover.style.top = `${top}px`;
      this.popover.classList.add('visible');
    }

    hideWaypointInfo() {
      if (this.popover) {
        this.popover.classList.remove('visible');
      }
    }

    setMode(mode) {
      const visualWrapper = this.container.querySelector('.blueprint-canvas-wrapper');
      if (!visualWrapper) return;
      visualWrapper.classList.remove('mode-cad', 'mode-nvg', 'mode-flir');
      visualWrapper.classList.add(`mode-${mode}`);
    }

    toggleFullscreen() {
      const card = this.container.closest('.blueprint-card');
      if (!card) return;
      card.classList.toggle('blueprint-fullscreen');
      if (this.fullscreenBtn) {
        this.fullscreenBtn.innerHTML = card.classList.contains('blueprint-fullscreen') ? '✕ EXIT' : '⛶ PRESENT';
      }
    }

    playTacticalChirp(freq) {
      if (!window.WDHAudio || typeof window.WDHAudio.playChirp !== 'function') return;
      window.WDHAudio.playChirp(freq, 0.05);
    }
  }

  // Extend WDHAudio with micro chirp helper if not present
  if (typeof window !== 'undefined') {
    if (!window.WDHAudio) window.WDHAudio = {};
    if (!window.WDHAudio.playChirp) {
      window.WDHAudio.playChirp = function (freq = 880, duration = 0.05) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (!AudioContext) return;
          if (!window._wdhBlueprintCtx) window._wdhBlueprintCtx = new AudioContext();
          const ctx = window._wdhBlueprintCtx;
          if (ctx.state === 'suspended') ctx.resume();

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + duration);
        } catch (e) {
          // ignore audio failure
        }
      };
    }
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.blueprint-interactive-container').forEach(el => {
      new BlueprintPresentationTool(el);
    });
  });
})();
