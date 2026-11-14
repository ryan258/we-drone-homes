# We Drone Homes Architecture

This document describes the architectural design, asset pipeline, client-side execution model, and data structures powering **We Drone Homes**.

---

## 1. System Overview

```
                      +-----------------------------+
                      |       Hugo Static SSG       |
                      |  (hugo.yaml + content/...)  |
                      +--------------+--------------+
                                     |
              +----------------------+----------------------+
              |                      |                      |
      +-------v-------+      +-------v-------+      +-------v-------+
      |  Data Sources |      | Layout & Core |      | Mounted Brand |
      | packages.yaml |      |  baseof.html  |      | brand/art     |
      |   faq.yaml    |      |   partials/   |      | brand/identity|
      +---------------+      +-------+-------+      +---------------+
                                     |
                             +-------v-------+
                             | Compiled HTML |
                             |   (public/)   |
                             +-------+-------+
                                     |
              +----------------------+----------------------+
              |                                             |
      +-------v-------+                             +-------v-------+
      | assets/js/    |                             | assets/css/   |
      | - site.js     |                             | - site.css    |
      | - soundboard  |                             | - brand-*.css |
      +---------------+                             +---------------+
```

The system is a fully static Hugo web property engineered to be previewed locally with `hugo server` or built to static artifacts (`public/`) with zero external network requirements.

---

## 2. Directory Structure & Organization

```
we-drone-homes/
├── assets/
│   ├── css/                 # Production-ready CSS stylesheets
│   │   ├── brand-home.css       # Homepage layout & showcase styles
│   │   ├── brand-identity.css   # Color variables, typography tokens, base styles
│   │   ├── brand-listings.css   # Portfolio grid & flight report detail styles
│   │   └── site.css             # Main unified bundle: nav, forms, waiver, tools
│   ├── images/              # WebP media assets (fleet, listings, pilots, hero)
│   ├── js/                  # Zero-dependency vanilla JavaScript engines
│   │   ├── blueprint-engine.js  # Interactive vector blueprint presenter
│   │   ├── site.js              # Core UI: navigation, viewer, booking, damage calc, waiver
│   │   └── soundboard.js        # Web Audio API synthesized sound generator
│   └── sass/                # 7-1 Sass architecture (legacy & tactical components)
├── brand/                   # Fictional agency identity system & field manual
│   ├── art/                 # Rendered WebP illustrations & art README
│   ├── campaign/            # Exported marketing cards, one-sheets, share assets
│   ├── identity/            # SVG vector marks, glyphs, tokens.json, tokens.css
│   ├── moodboards/          # SVG & PNG reference moodboards
│   ├── tools/               # Python/Node generation scripts for brand assets
│   ├── index.html           # Standalone Brand Field Manual viewer
│   └── README.md            # Asset catalog and usage guide
├── content/                 # Markdown content pages & frontmatter
│   ├── about/               # Agency history, naming regret, team overview
│   ├── drywall-estimator/   # Damage calculator content landing
│   ├── emergency-dispatch/  # Mock dispatch terminal page
│   ├── faq/                 # Common questions and disclosures
│   ├── fleet/               # Drone rig equipment profiles (3 detail pages)
│   ├── legal-waiver/        # Fictional liability release page
│   ├── listings/            # Property flight reports (4 detail pages)
│   ├── packages/            # Service tiers and pricing overview
│   ├── pilots/              # Pilot dossiers (3 detail pages)
│   ├── privacy/             # Parody disclosure and privacy statement
│   ├── soundboard/          # Soundboard audio control panel
│   └── _index.md            # Homepage content definitions
├── data/                    # Structured YAML sources of truth
│   ├── faq.yaml             # Canonical FAQ questions, answers, and tags
│   └── packages.yaml        # Single source for package tiers, rates, features
├── layouts/                 # Hugo HTML templates
│   ├── _default/            # baseof.html, list.html, single.html
│   ├── partials/            # header, footer, head, property-card, package-cards, cta, glyph, mark
│   └── <section>/           # Section-specific templates (listings, packages, pilots, etc.)
├── reports/                 # Strategic positioning and category analyses
├── research_notes/          # Faction research and parody category notes
├── static/                  # Root-served static media (favicons, WebP images, share cards)
├── tests/                   # Verification tests (soundboard.test.cjs)
├── hugo.yaml                # Master Hugo configuration, mounts, menus, and parameters
├── README.md                # Root project entry point and developer instructions
├── roadmap.md               # Project milestones, verification status, and future plans
└── SPECIFICATION.md         # Historical specification of initial tactical concept
```

---

## 3. Data Flow & Hugo Mount Pipeline

`hugo.yaml` configures unified mounts that expose brand assets directly into Hugo's asset pipeline:

```yaml
module:
  mounts:
    - source: assets
      target: assets
    - source: brand/identity
      target: assets/brand/identity
    - source: brand/art
      target: assets/brand/art
    - source: brand/campaign
      target: assets/brand/campaign
```

### Data Sources
1. **`data/packages.yaml`**: Definitive source for the three service tiers (`Recon Lite`, `Standard Breach`, `Executive Overkill`), including prices, turnarounds, drone assignments, and included deliverable bullets. Templates loop over this data, ensuring pricing and package details stay synchronized across `/packages/`, the homepage, and mock booking forms.
2. **`data/faq.yaml`**: Central register of question-and-answer pairs categorized by domain (`General`, `Flight Operations`, `Legal & Risk`, `Deliverables`). Rendered natively using HTML `<details>` and `<summary>` tags.

---

## 4. Client-Side Runtime Engine (`assets/js/site.js`)

`site.js` is an enclosed IIFE with no external dependencies or global state leakage:

1. **Responsive Navigation & Mobile Drawer**:
   - Manages `.main-nav` toggle state with ARIA attributes (`aria-expanded`).
   - Listens for `Escape` key and viewport width breakpoint changes (`(min-width: 721px)`) to auto-close drawers and restore focus.
2. **Hero Photo Showcase Viewer**:
   - Cycles through property photos with `<template id="property-photos">` data payloads.
   - Synchronizes captions, image sources, and direct listing report links.
3. **Portfolio Filtering**:
   - Live filtering of listing cards by property category (e.g., `residential`, `luxury`, `compound`).
   - Accessible button states (`aria-pressed`) and dynamic count readouts.
4. **Mock Flight Booking Engine**:
   - Reads URL query parameters (`?package=standard-breach`) on initialization.
   - Computes real-time base rates and optional add-ons in memory.
   - Generates a local, non-persistent mission brief with reference codes (`WDH-DEMO-XXXXXX`).
   - Enables direct client-side download of `.txt` mission briefs via `Blob` and `URL.createObjectURL`.
   - Modifying inputs automatically clears prior confirmations to prevent stale state.
5. **Interactive Damage Calculator**:
   - Form-based arithmetic calculating square footage, chandelier counts, ceiling heights, and pet chaos factors.
   - Computes satirical risk surcharges and links selections directly to package booking.
6. **Dispatch Console Simulator**:
   - Simulates terminal status readouts, HOA frequency sweeps, drone launches, and pilot status commands via on-screen buttons or keyboard single-letter shortcuts (`s`, `h`, `l`, `p`).
7. **Interactive Flight Simulator Scrubber**:
   - Animates drone path progress across waypoints.
   - Automatically detects and respects `prefers-reduced-motion: reduce`, switching from continuous animation loops to step-by-step clicks.
8. **Fictional Waiver Modal**:
   - Native checkbox validation with instant feedback; clearly disclaims all legal enforceability.

---

## 5. Web Audio Soundboard Engine (`assets/js/soundboard.js`)

- Operates via the native browser `AudioContext` / `webkitAudioContext`.
- **Zero audio asset files**: All sounds are synthesized programmatically in real-time using oscillators (`sine`, `square`, `sawtooth`, `triangle`), gain nodes, and biquad noise filters:
  - `whoosh`: Sawtooth pitch sweep imitating rapid quadcopter flyby.
  - `lipo`: High-frequency rhythmic pulsed sine beeps indicating low battery.
  - `shatter`: Filtered white-noise burst simulating shattered glass.
  - `radio`: Triangle dual-tone walkie-talkie burst.
  - `bass`: Low-frequency sine sweep sub-drop.
  - `siren`: Square-wave alternating siren.
- Sound starts strictly upon explicit user interaction (touch/click).
- Includes comprehensive stop control, volume scaling, and text fallbacks for environments lacking audio hardware.
- Unit tested under Node.js mock runtime via `tests/soundboard.test.cjs`.

---

## 6. Privacy, Security & Boundary Guarantees

- **No Remote Network Requests**: The site loads zero resources from external hostnames or CDNs. All scripts, fonts, stylesheets, and images are hosted locally.
- **Zero Client Persistence**: No `localStorage`, `sessionStorage`, or `IndexedDB` usage. Refreshing the browser returns the application to its pristine default state.
- **No Cookies or Tracking**: No analytics cookies, tracking beacons, or fingerprinting scripts.
- **Input Sanitization**: All DOM manipulation utilizes `textContent` and strict attribute binding; no unescaped `innerHTML` injection of user inputs.
