# We Drone Homes Verification Runbook

This runbook documents deterministic gates and verification procedures for validating **We Drone Homes**. All commands must execute from the repository root.

---

## 1. Quick Verification Suite

Run this combined deterministic gate to verify Hugo compilation, JavaScript syntax, and soundboard audio unit tests:

```sh
hugo --destination /tmp/we-drone-homes-check --minify --panicOnWarning && \
node --check assets/js/site.js && \
node --check assets/js/soundboard.js && \
node --check assets/js/blueprint-engine.js && \
node tests/soundboard.test.cjs
```

A clean run produces the Hugo build summary and passing test counts with zero warnings or errors.

---

## 2. Individual Verification Gates

### 2.1 Static Site Generation (Hugo)
Validates all layout templates, data mounts, markdown frontmatter, and asset fingerprints:

```sh
hugo --destination /tmp/we-drone-homes-check --minify --panicOnWarning
```

Expected output:
- Pages compiled: 37
- Static files: 13
- Exit code: 0

### 2.2 JavaScript Syntax Verification
Validates that client-side scripts parse cleanly in V8 without syntax errors:

```sh
node --check assets/js/site.js
node --check assets/js/soundboard.js
node --check assets/js/blueprint-engine.js
```

### 2.3 Audio Synthesizer Unit Tests
Runs unit tests on the soundboard pad state machine, audio context resume logic, and stop cancellation:

```sh
node tests/soundboard.test.cjs
```

Expected output:
- `✔ a rejected older resume cannot stop or relabel a newer successful pad`
- `✔ a rejected current resume still reports failure and leaves no active pad`
- `✔ Stop invalidates a pending successful resume without starting sound`
- Total: 3 pass, 0 fail

### 2.4 Internal Link and Asset Integrity Check
Run this one-line python script to ensure every internal hyperlink and media asset resolves without 404s:

```sh
python3 -c "
import os, glob, re
from urllib.parse import urlparse

site_dir = '/tmp/we-drone-homes-check'
html_files = glob.glob(site_dir + '/**/*.html', recursive=True)
broken = []

for f in html_files:
    with open(f, 'r') as fp:
        content = fp.read()
    # Check links
    for l in re.findall(r'href=[\"\']([^\"\']+)[\"\']', content):
        if l.startswith(('http', '#', 'mailto:', 'tel:')): continue
        path = urlparse(l).path
        if not path: continue
        target = os.path.normpath(os.path.join(site_dir, path.lstrip('/')))
        if os.path.isdir(target): target = os.path.join(target, 'index.html')
        elif not os.path.exists(target) and not target.endswith('.html'):
            if os.path.exists(target + '.html'): target += '.html'
            elif os.path.exists(os.path.join(target, 'index.html')): target = os.path.join(target, 'index.html')
        if not os.path.exists(target): broken.append((f, 'href', l))

    # Check images/scripts
    for s in re.findall(r'src=[\"\']([^\"\']+)[\"\']', content):
        if s.startswith(('http', 'data:')): continue
        path = urlparse(s).path
        if not path: continue
        target = os.path.normpath(os.path.join(site_dir, path.lstrip('/')))
        if not os.path.exists(target): broken.append((f, 'src', s))

if broken:
    print(f'FAILED: {len(broken)} broken references found:')
    for src, kind, ref in broken[:10]:
        print(f'  [{kind}] {ref} in {src}')
    exit(1)
else:
    print('PASS: All internal links and asset sources resolve successfully.')
"
```

---

## 3. Manual Interactive Verification Vectors

When performing exploratory browser testing, verify these specific user flows:

1. **Navigation & Mobile Drawer**:
   - Verify hamburger button toggles `.main-nav` on mobile (<720px).
   - Verify pressing `Escape` closes the menu and returns focus to the button.
   - Verify resizing viewport to >720px automatically closes the drawer.

2. **Package Handoff & Booking Calculator**:
   - Navigate to `/packages/` and click "Select Recon Lite".
   - Verify `/emergency-dispatch/?package=recon-lite` opens with Recon Lite selected.
   - Add extra items (e.g., "Chandelier Evasion Certification") and verify total recalculates in real-time.
   - Click "Generate mock flight brief", confirm reference code displays, and verify downloading `.txt` produces a clean text document.
   - Edit any input and confirm previous booking confirmation clears immediately.

3. **Damage Calculator (`/drywall-estimator/`)**:
   - Adjust square footage, ceiling height, and pet counts.
   - Verify risk surcharges update correctly and clicking "Book This Tier" transitions to mock booking.

4. **Interactive Flight Scrubber (`/listings/mcmansion-monolith/`)**:
   - Click Play and observe waypoint progression.
   - Scrub slider to inspect individual sector descriptions.
   - Enable system setting for `prefers-reduced-motion` and verify animation switches to discrete single-step advances.

5. **Web Audio Soundboard (`/soundboard/`)**:
   - Click sound pads ("Whoosh", "Low Battery", "Glass Break", etc.).
   - Verify tone starts and stops properly.
   - Verify volume slider adjusts master gain.
   - Verify "Stop Audio" terminates all active oscillator sources immediately.

6. **Waiver Checkboxes (`/legal-waiver/`)**:
   - Toggle waiver clauses and verify button activation states.
   - Confirm clear satirical disclaimers (no actual legal enforceability).
