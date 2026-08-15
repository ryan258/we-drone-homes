// Interactive Waiver & Signature Pad Engine
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('signature-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const btnClear = document.getElementById('btn-clear-sig');
  const btnSubmit = document.getElementById('btn-submit-waiver');
  const waiverFeedback = document.getElementById('waiver-feedback');
  const clauseChecks = document.querySelectorAll('.clause-checkbox');

  let isDrawing = false;
  let hasSigned = false;

  // Set crisp canvas dimensions
  function initCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  window.addEventListener('resize', initCanvas);
  initCanvas();

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDraw(e) {
    isDrawing = true;
    hasSigned = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDraw() {
    isDrawing = false;
  }

  // Mouse & Touch events
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  canvas.addEventListener('touchstart', startDraw);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDraw);

  if (btnClear) {
    btnClear.addEventListener('click', (e) => {
      e.preventDefault();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasSigned = false;
      if (waiverFeedback) waiverFeedback.innerHTML = '';
    });
  }

  if (btnSubmit) {
    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();

      let allChecked = true;
      clauseChecks.forEach(cb => {
        if (!cb.checked) allChecked = false;
      });

      if (!allChecked) {
        if (waiverFeedback) {
          waiverFeedback.innerHTML = `<span class="badge badge-danger">⚠️ ALL TACTICAL WAIVER CLAUSES MUST BE INITIALED</span>`;
        }
        if (window.WDHAudio) window.WDHAudio.playTacticalSiren();
        return;
      }

      if (!hasSigned) {
        if (waiverFeedback) {
          waiverFeedback.innerHTML = `<span class="badge badge-amber">⚠️ PLEASE SCRAWL YOUR OPERATOR SIGNATURE ABOVE</span>`;
        }
        return;
      }

      // Generate verification code
      const certCode = 'WDH-WAIVER-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      if (waiverFeedback) {
        waiverFeedback.innerHTML = `
          <div style="background: rgba(0, 255, 102, 0.15); border: 1px solid #00ff66; padding: 1rem; border-radius: 4px; text-align: center;">
            <p style="color: #00ff66; font-family: 'Share Tech Mono', monospace; font-weight: 700; margin: 0;">
              ✓ WAIVER ACCEPTED & EXECUTED. CERTIFICATE: ${certCode}
            </p>
            <p style="color: #f0f4fc; font-size: 0.85rem; margin-top: 0.5rem;">
              PILOT HAS BEEN AUTHORIZED FOR UNRESTRICTED CHIMNEY ENTRY.
            </p>
          </div>
        `;
      }
      if (window.WDHAudio) window.WDHAudio.playRadioSquelch();
    });
  }
});
