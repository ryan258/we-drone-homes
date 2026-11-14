# We Drone Homes Documentation

Welcome to the internal documentation library for **We Drone Homes** ("Killer views. Unfortunate name."), a fictional real estate drone photography agency built as an offline-first, zero-dependency static Hugo web application.

---

## Documentation Index

| Document | Purpose |
| --- | --- |
| [README.md](../README.md) | Project root entry point, quick preview commands, site map, editing guide, and focused verification. |
| [roadmap.md](../roadmap.md) | Strategic project roadmap, completed milestones (v1.0), verification gates, architecture guardrails, and future horizons. |
| [docs/architecture.md](architecture.md) | Technical architecture: Hugo compilation, asset pipeline & mounts, CSS hierarchy, JavaScript interaction engines, data models, and runtime boundaries. |
| [docs/verification.md](verification.md) | Verification runbook: deterministic commands for build gates, JavaScript syntax checks, soundboard unit tests, asset resolution, and manual QA. |
| [docs/brand-guide.md](brand-guide.md) | Summary of brand identity, tone of voice, visual hierarchy, color tokens, and integration with the interactive [Brand Field Manual](../brand/index.html). |
| [SPECIFICATION.md](../SPECIFICATION.md) | Historical master technical and creative specification representing the initial tactical concept. |
| [brand/README.md](../brand/README.md) | Brand asset inventory, vector exports, raster artwork, and build tools documentation. |
| [reports/We Drone Homes positioning.md](../reports/We%20Drone%20Homes%20positioning.md) | Strategic positioning report detailing category critique, naming tension, and audience posture. |

---

## Core Operational Principles

1. **Production-Quality Personal Tool & Satirical Showcase**
   - Offline-first static delivery via Hugo Extended.
   - Zero runtime dependencies, no backend server, no database, no hosted services.
   - All forms (booking, calculator, waiver, console) execute exclusively client-side in memory without persistence or network egress.

2. **Zero Egress & Complete Privacy**
   - No external CDNs, fonts, tracking pixels, cookies, or remote analytics.
   - Fictional data and calculations produce downloadable local text files without transmitting data.

3. **Deterministic Verification**
   - Fast, quiet verification gates:
     - `hugo --destination /tmp/we-drone-homes-check --minify --panicOnWarning`
     - `node --check assets/js/site.js`
     - `node --check assets/js/soundboard.js`
     - `node --check assets/js/blueprint-engine.js`
     - `node tests/soundboard.test.cjs`
