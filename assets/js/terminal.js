// Tactical Dispatch Terminal & CLI Engine
document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-logs');
  const terminalInput = document.getElementById('terminal-input');
  const quickBtns = document.querySelectorAll('.quick-cmd-btn');
  if (!terminalBody || !terminalInput) return;

  function appendLine(text, type = 'line-output') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function runCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    appendLine(`> ${rawCmd}`, 'prompt-echo');

    if (!cmd) return;

    if (window.WDHAudio) window.WDHAudio.playRadioSquelch();

    switch (cmd) {
      case 'help':
        appendLine('AVAILABLE TACTICAL PROTOCOLS:');
        appendLine('  status         - Query current fleet readiness & FAA subpoena status');
        appendLine('  scan-hoa       - Ping neighborhood for anti-drone Karens and HOA lasers');
        appendLine('  launch-recon   - Dispatch sub-250g stealth drone to suburban target');
        appendLine('  spackle-calc   - Compute emergency drywall repair estimates');
        appendLine('  pilots         - List active pilots, disciplinary records, flight hours');
        appendLine('  clear          - Wipe terminal display buffer');
        break;

      case 'status':
        appendLine('SYSTEM STATUS: OPERATIONAL [DEFCON 2]', 'line-success');
        appendLine('FAA SANCTION STATUS: 14 DAYS WITHOUT FORMAL ENFORCEMENT ACTION');
        appendLine('ACTIVE BATTERIES CHARGED: 48 / 50 (6S 1300mAh)');
        appendLine('STANDBY PILOTS: PROPWASH, TREMOR, SKYKAREN');
        break;

      case 'scan-hoa':
        appendLine('INITIATING HOA THREAT RADAR SCAN...', 'line-warning');
        setTimeout(() => {
          appendLine('SCAN RESULTS: 2 UNLICENSED CITIZEN RADAR RADIALS DETECTED AT 400M.');
          appendLine('HOA PRESIDENT LOCATION: PEERING THROUGH BLINDS ON CUL-DE-SAC.');
          appendLine('RECOMMENDED COUNTERMEASURE: DEPLOY DECOY DRONE AT CLUBHOUSE.', 'line-danger');
        }, 600);
        break;

      case 'launch-recon':
        appendLine('ARMING GHOST SUB-250 RIG...', 'line-warning');
        setTimeout(() => {
          appendLine('TAKEOFF CONFIRMED. FLIGHT ALTITUDE: 14 FT AGL. SPEED: 64 MPH.');
          appendLine('TARGET LIVING ROOM BREACHED VIA SLIDING SCREEN DOOR.', 'line-success');
        }, 800);
        break;

      case 'spackle-calc':
        appendLine('CALCULATING DRYWALL INTEGRITY...');
        appendLine('ESTIMATED 2.4 SQUARE INCHES OF IMPACT DAMAGE. 1 CONTAINER RED DEVIL SPACKLE DISPATCHED.');
        break;

      case 'pilots':
        appendLine('--- WDH FLIGHT SQUAD ---');
        appendLine('• PROPWASH  | 4,200 hrs | 2 FAA Citations | French Door Incursions');
        appendLine('• TREMOR    | 2,900 hrs | 0 Chandelier Losses | Laundry Chute Slalom');
        appendLine('• SKYKAREN  | 3,100 hrs | Pending Subpoena | Anti-HOA Recon');
        break;

      case 'clear':
        terminalBody.innerHTML = '';
        break;

      default:
        appendLine(`UNKNOWN COMMAND: "${cmd}". TYPE "help" FOR AVAILABLE PROTOCOLS.`, 'line-danger');
        break;
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      runCommand(val);
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      runCommand(cmd);
    });
  });
});
