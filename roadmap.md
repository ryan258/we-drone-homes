# We Drone Homes Roadmap

A roadmap of completed milestones, architectural boundaries, system verification status, and future horizons for **We Drone Homes** ("Killer views. Unfortunate name.").

---

## 1. Project Overview & Philosophy

**We Drone Homes** is a self-contained, offline-first web project exploring a deadpan satirical real estate drone photography agency. Built with semantic HTML, vanilla CSS, and modular vanilla JavaScript running on the Hugo static site generator, it emphasizes:

- **Zero-Runtime Dependencies**: Zero npm packages, zero external CDNs, zero cloud services, and zero analytics or tracking. Fully operational offline or via local loopback preview (`hugo server`).
- **Privacy & Complete Data Boundary**: Client-side forms (mock booking, damage estimator, waiver, and dispatch console) run strictly in browser memory without cookies, storage, or external egress.
- **Satirical Integrity & Brand Tone**: Explores the comedic friction of a high-end luxury architectural photography studio burdened with an unfortunate military-adjacent brand name.
- **Deterministic Verification**: Fast, quiet verification gates validate template compilation, JavaScript syntax, soundboard audio synthesis, and asset integrity prior to committing or releasing.

---

## 2. Completed Milestones (v1.0 State)

### Milestone 1: Brand Strategic Pivot & Field Manual
- **Positioning Pivot**: Transitioned from aggressive tactical combat tropes into deadpan architectural real estate parody ("Killer views. Unfortunate name.").
- **Brand Field Manual (`brand/index.html`)**: Self-contained local style guide featuring color tokens (`tokens.json`, `tokens.css`), typography scales, responsive layouts, and tone guidelines.
- **Vector Identity Suite (`brand/identity/`)**: Full SVG vectors for horizontal, stacked, and mark logos in monochrome, reverse, and colored variants, plus 20 custom UI glyphs.
- **Moodboards & Art Assets (`brand/moodboards/`, `brand/art/`)**: Curated moodboards (`01-architectural-calm`, `02-flight-desk`, `03-domestic-suspense`) and WebP illustrated plates.
- **Campaign Collateral (`brand/campaign/`)**: Share cards, field reports, and one-sheets for print and social mockups.

### Milestone 2: Hugo Static Architecture & Multi-Page Layouts
- **Hugo Asset Pipeline**: Configured unified asset mounts in `hugo.yaml` mapping `brand/identity`, `brand/art`, and `brand/campaign` directly into Hugo's resource pipeline.
- **Modular Layout Templates (`layouts/`)**: Engineered semantic templates (`baseof.html`, `list.html`, `single.html`) with reusable partials (`header`, `footer`, `head`, `cta`, `glyph`, `mark`, `property-card`, `package-cards`).
- **Data-Driven Packages & FAQs (`data/`)**: Single source of truth for packages (`data/packages.yaml`) and FAQ questions (`data/faq.yaml`), eliminating duplicate pricing and copy.
- **Fictional Content Library (`content/`)**: Four detailed property listings with illustrated flight reports, three pilot dossiers (`Tremor`, `Skykaren`, `Propwash`), three drone rig profiles, and dedicated agency backstory pages (`about`, `faq`, `privacy`).

### Milestone 3: Interactive Parody Engines (`assets/js/site.js`)
- **Navigation & Focus Trap**: Responsive drawer menu with ARIA accessibility states, Escape key handling, and breakpoint auto-collapse.
- **Hero Photo Showcase**: Cycling property photo viewer linking real estate photography directly to tactical flight reports.
- **Portfolio Category Filters**: Accessible live filtering across residential, luxury, and compound properties with dynamic inventory counts.
- **Mock Booking Engine**: Full itemized quote calculator with base tiers, add-on extras, URL query parameter pre-selection (`?package=...`), downloadable `.txt` mission briefs, and stale-result clearing.
- **Drywall & Damage Calculator**: Absurd parametric cost calculator taking into account square footage, chandelier counts, ceiling heights, and pet chaos factors.
- **Interactive Flight Simulator**: Path scrubber and step-by-step waypoint progression with native `prefers-reduced-motion` detection and adaptation.
- **Emergency Dispatch Simulator**: On-screen buttons and keyboard single-letter shortcuts (`s`, `h`, `l`, `p`) simulating terminal commands.

### Milestone 4: Web Audio Soundboard Synthesizer (`assets/js/soundboard.js`)
- **Synthesized Audio Engine**: Real-time Web Audio API sound generation requiring zero external audio files (`whoosh`, `lipo`, `shatter`, `radio`, `bass`, `siren`).
- **Interactive Control Panel**: Master volume scaling, active pad highlighting, emergency stop control, and text accessibility fallbacks for unsupported browsers.
- **Automated Unit Testing (`tests/soundboard.test.cjs`)**: Comprehensive test suite validating audio context resume guards, race condition protection, and clean stop cancellation.

### Milestone 5: Privacy, Accessibility & Verification Hardening
- **Zero Egress Compliance**: No external web fonts, remote stylesheets, analytics scripts, or cookies.
- **Static Asset Optimization**: High-efficiency WebP images and optimized SVGs across all media assets.
- **Deterministic Gates**: Documented, quiet verification runbook validating the complete static site in under 100 milliseconds.

---

## 3. Current System Status

| Component | Status | Verification Gate |
| --- | --- | --- |
| Hugo Static Compilation (37 pages) | Verified v1.0 | `hugo --destination /tmp/we-drone-homes-check --minify --panicOnWarning` |
| Core Client Script (`site.js`) | Verified v1.0 | `node --check assets/js/site.js` |
| Soundboard Script (`soundboard.js`) | Verified v1.0 | `node --check assets/js/soundboard.js` |
| Blueprint Engine Script (`blueprint-engine.js`) | Verified v1.0 | `node --check assets/js/blueprint-engine.js` |
| Soundboard Synthesizer Unit Tests | Verified v1.0 | `node tests/soundboard.test.cjs` |
| Internal Hyperlinks & Image References | Verified v1.0 | Python internal link & asset scanner |
| Package & FAQ Data Consistency | Verified v1.0 | Unified YAML sources (`data/packages.yaml`, `data/faq.yaml`) |
| Brand Field Manual & Vector Assets | Verified v1.0 | `brand/index.html` standalone local preview |
| Offline / Zero-Egress Privacy Boundary | Verified v1.0 | Validated zero external network requests in build output |

---

## 4. Architecture & Guardrails

- **Zero External Egress**: No remote CDN dependencies, font services, or analytics beacons.
- **Local Ephemeral Execution**: User interactions (booking calculations, damage estimates, waiver acceptance) exist only in volatile client memory; no local storage or server transport.
- **Single Source of Truth**: Package pricing and features must be modified exclusively in `data/packages.yaml`. FAQs must be modified in `data/faq.yaml`.
- **Accessible & Motion Safe**: Interactive controls must maintain keyboard accessibility (focus restoration, Escape key) and respect `prefers-reduced-motion: reduce`.
- **Quiet Deterministic Gates**: CI/verification gates report failures and concise outcomes without dumping verbose transcripts.

---

## 5. Future Horizons (Post-v1 Consideration)

The following enhancements represent potential future exploration directions:

1. **Enhanced Interactive Flight Simulator**
   - 3D camera path visualization utilizing pure CSS 3D transforms or local HTML5 Canvas without external dependencies.
   - Additional fictional floorplans and multi-story vector flight paths.

2. **Expanded Soundboard Synthesizer**
   - Parametric audio customization (custom propeller pitch slider, battery voltage warning frequencies).
   - Export capability to download synthesized tones as local `.wav` files.

3. **Printable Campaign Artifacts**
   - Dedicated print-optimized CSS (`@media print`) for flight mission briefs and field reports.
   - Downloadable SVG mission badges for fictional pilot certifications.
