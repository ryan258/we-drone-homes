# We Drone Homes

**Killer views. Unfortunate name.** A fictional real estate drone photography agency, built as a static Hugo website. All properties, people, claims, prices, and bookings are comedy.

## Preview locally

```sh
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender
```

Open http://localhost:1313. The development server rebuilds as files change. No npm install, package manager, external font service, or backend is required.

To build static output in `public/`:

```sh
hugo --minify
```

Set `baseURL` to the final public origin before producing a published build so social metadata and the sitemap use the correct host. No publishing or deployment is configured by this project.

## Documentation

- [Project Roadmap](roadmap.md) — Completed milestones, verification matrix, architecture guardrails, and future horizons.
- [Documentation Index](docs/README.md) — Technical guides, architecture, and verification runbooks.
- [System Architecture](docs/architecture.md) — Hugo pipeline, client-side runtime engines, data models, and privacy boundaries.
- [Verification Runbook](docs/verification.md) — Deterministic verification gates, unit tests, link checks, and manual QA vectors.
- [Brand Guide](docs/brand-guide.md) — Visual standards, design tokens, color palette, and tone of voice.
- [Brand Field Manual](brand/index.html) — Standalone visual identity viewer and campaign export kit.

## The site

The [brand field manual](brand/index.html) opens directly from the checkout. It includes the brand platform, mood boards, visual standards, copy, campaign exports, and a link to the sourced SWOT. See [brand handoff](brand/README.md) for asset placement and refresh instructions.

- Home: the McMansion Monolith is the featured entry point. The photo viewer links each of the four fictional properties to its report.
- Our work: four fictional properties with category filters and individual flight reports. Each report includes a written route, play/pause/reset controls, and a manual scrubber. Reduced-motion mode advances one stage per click.
- Packages: three package tiers from a shared data source; selected tiers carry into mock booking.
- Crew and fleet: three pilot profiles and three equipment profiles, each with a dedicated detail page.
- Our story and FAQs: the regrettable naming decision, in more detail than anyone requested.
- Mock booking: property, light, package, and extra selections; itemized total; local confirmation; optional downloadable text brief. Editing selections clears the previous confirmation. No user details or real addresses are requested.
- Damage calculator: transparent fictional cost arithmetic, reset, and package handoff. Comedy risk fees do not carry into booking.
- Dispatch console: on the booking page, with buttons for every command. Optional short codes: `s` (status), `h` (HOA scan), `l` (simulated launch), `p` (pilots).
- Soundboard: six locally synthesized effects, user-initiated playback, adjustable volume, stop control, and a text fallback when browser audio is unavailable.
- Unofficial waiver: native checkboxes and a button; no handwriting or personal information. No legal effect.
- Privacy/parody explanation and a custom 404 page.

## Editing

| Source | Purpose |
| --- | --- |
| `layouts/index.html` | Homepage copy and composition |
| `layouts/partials/` | Shared navigation, footer, cards, and CTA |
| `layouts/<section>/` | Section and detail templates |
| `content/` | Page metadata, listing narratives, pilot and fleet dossiers |
| `data/packages.yaml` | Single source for prices, names, and package features |
| `data/faq.yaml` | Shared home/full-page FAQ answers |
| `assets/css/` | Shared responsive styles and page styles for the brand, homepage, and flight reports |
| `assets/js/site.js` | Navigation, photo viewer, filters, booking, calculator, waiver, console, flight simulator |
| `assets/js/soundboard.js` | Sound generation and playback controls; loaded only on the soundboard page |
| `static/images/` | Existing property, crew, and fleet illustrations served by Hugo |
| `brand/identity/`, `brand/art/`, and `brand/campaign/` | Canonical assets used by the site through Hugo mounts |
| `hugo.yaml` | Site metadata, navigation, featured report, and asset mounts |

The current templates use the CSS and JavaScript listed above. `SPECIFICATION.md` describes the earlier concept. Live images come from `static/images/` and the mounted brand assets.

## Behavior and boundaries

The site has no booking backend, payment integration, analytics, cookies, browser storage, third-party fonts, or external media embeds. Forms build local fictional results only. Package identifiers can appear in query strings. The browser may restore form values independently, and any actual host can log ordinary page requests.

Core pages and native FAQ disclosures work without JavaScript. Interactive tools explain when JavaScript is required. Navigation supports keyboard access and Escape, audio is opt-in, and the flight simulator honors reduced-motion preferences. These implementation measures are not an accessibility conformance certification.

## Focused verification

```sh
hugo --destination /tmp/we-drone-homes-check --minify --panicOnWarning
node --check assets/js/site.js
node --check assets/js/soundboard.js
node --check assets/js/blueprint-engine.js
node tests/soundboard.test.cjs
```

Browser checks should cover package handoff and reset, downloaded brief contents, changed selections clearing stale results, calculator totals, portfolio filters, mobile navigation, flight controls and reduced motion, waiver checkboxes, and sound play/stop. No full suite is needed for those focused checks.
