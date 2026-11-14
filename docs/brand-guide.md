# We Drone Homes Brand Guide

A quick reference guide to the visual identity, brand tone, design tokens, and editorial posture of **We Drone Homes**.

---

## 1. Brand Concept & Satirical Core

- **Name**: We Drone Homes
- **Tagline**: *Killer views. Unfortunate name.*
- **Sub-tagline**: *Fictional residential drone cinematography.*
- **The Joke**: The company provides standard luxury real estate drone photography, but is cursed with a corporate name that sounds like a targeted military strike against residential housing.
- **Editorial Posture**: Deadpan, high-end, corporate, and completely earnest. The humor arises from treating aggressive drone maneuvers and unfortunate naming ambiguity with unflappable architectural seriousness.

---

## 2. Visual Design System

### Color Palette
Defined in `brand/identity/tokens.json` and `assets/css/brand-identity.css`:

| Token | Hex | Role |
| --- | --- | --- |
| `--color-paper` | `#f7f4ed` | Warm architectural cream background |
| `--color-card` | `#ffffff` | Clean white card surface |
| `--color-ink` | `#1a1f2c` | Deep editorial navy/slate for primary typography |
| `--color-ink-muted` | `#5c6475` | Slate gray for secondary captions and metadata |
| `--color-accent` | `#d9532f` | Terracotta safety orange for primary actions and accents |
| `--color-accent-soft`| `#faeae5` | Soft terracotta tint for pill badges and active highlights |
| `--color-rule` | `#e2ded4` | Subtle beige border and rule line |

### Typography
- **Headings & Brand Title**: Clean, geometric modernist sans-serif (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `sans-serif`).
- **Body Copy**: High-legibility editorial sans with generous line-height (`1.55`).
- **Telemetry & Technical Data**: Monospace stack (`ui-monospace`, `"SF Mono"`, `Menlo`, `Monaco`, `Consolas`, monospace) for flight coordinates, reference numbers, and pricing breakdowns.

---

## 3. Brand Assets & Collateral

All source assets live in `brand/` and are accessible directly from checkout via `brand/index.html`:

- **Vector Marks (`brand/identity/`)**:
  - Horizontal logo (`logo-horizontal.svg`)
  - Stacked logo (`logo-stacked.svg`)
  - Standalone logo mark (`logo-mark.svg`)
  - Vector glyph icons (arrow, camera, drone, fleet, flight-path, waiver, soundboard)
- **Art Library (`brand/art/`)**:
  - WebP architectural and interior scenes (`chandelier-interior.webp`, `flight-desk.webp`, `mcmansion-still.webp`, `ranch-exterior.webp`).
- **Campaign Collateral (`brand/campaign/`)**:
  - Ready-to-use share cards (`share-card.jpg`, `share-card.png`, `share-card.svg`).
  - Print-ready field reports and one-sheets (`one-sheet.svg`, `field-report.svg`).
  - Chandelier story visual (`chandelier-story.svg`).
- **Moodboards (`brand/moodboards/`)**:
  - `01-architectural-calm.png`: Soft luxury tones, clean lines, and geometric precision.
  - `02-flight-desk.png`: Technical instruments, checklists, and radio gear.
  - `03-domestic-suspense.png`: Unfortunate tension between high-speed quads and interior crystal chandeliers.

---

## 4. Brand Field Manual

To view the complete interactive brand manual, open:
```
brand/index.html
```
The manual includes interactive color palettes, typography scales, vector glyph sheets, downloadable logo variants, and full campaign copy exports.
