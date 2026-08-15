# 🚁 WE DRONE HOMES (WDH)
## Master Technical & Creative Website Specification
### *“Cinematic Residential FPV Incursions With Acceptable Drywall Collateral”*

---

## 1. Executive Summary & Brand Identity

### 1.1 Concept & Satirical Positioning
**We Drone Homes** is a hyper-aggressive, tactical-luxury parody of ultra-serious real estate drone videography agencies. Where standard realtors hire gentle aerial photographers for slow 4K twilight pans, **WDH** treats suburban split-level ranches like tactical target zones—deploying 85mph carbon-fiber FPV racing quads through open bathroom windows, diving down active chimneys, and orbit-strafing HOA pools to heavy dubstep.

* **Tagline**: *"We don't just list your home. We breach it at 85 knots."*
* **Secondary Slogan**: *"FAA Part 107 Certified (Currently Under Administrative Appeal)."*
* **Tone**: 50% Top Gun tactical briefing, 30% Beverly Hills luxury brokerage, 20% reckless Red Bull air race.
* **Core Value Prop**: *"Guaranteed 400% increase in Zillow saves, 12% probability of chandelier survival."*

---

## 2. Technology Stack & Architecture

### 2.1 Core Framework
* **Static Site Generator**: **Hugo (Extended Edition)**
  * Lightning-fast compilation (<50ms builds)
  * Native Hugo Pipes asset pipeline with embedded Dart Sass / LibSass compilation
  * Built-in image processing (`.Resize`, `.Fill`, `.WebP` conversion)
  * Zero-dependency client runtime for baseline performance

### 2.2 Styling & Design Architecture (Sass / SCSS)
Modular 7-1 Sass directory architecture under `assets/sass/`:

```
assets/sass/
├── abstracts/
│   ├── _variables.scss      # Colors, typography, spacing tokens
│   ├── _functions.scss      # Unit conversions, HUD math calculations
│   └── _mixins.scss         # Glassmorphism, scanlines, telemetry HUD overlays
├── base/
│   ├── _reset.scss          # Modern CSS reset
│   ├── _typography.scss     # Tactical monospaces & luxury sans-serifs
│   └── _utilities.scss      # Telemetry borders, glitch states, badge styles
├── components/
│   ├── _hud-overlay.scss    # Real-time FPV OSD (crosshairs, pitch ladder, battery)
│   ├── _video-player.scss   # Custom FPV cinematic player with OSD toggle
│   ├── _flight-card.scss    # Property listing cards with tactical telemetry
│   ├── _drone-model.scss    # Fleet spec cards (thrust-to-weight, decibels)
│   ├── _waiver-modal.scss   # Interactive legal waiver & damage estimator
│   ├── _soundboard.scss     # Interactive LiPo low-battery / propwash SFX
│   └── _quote-calc.scss     # Absurd quote generator with tactical upsells
├── layout/
│   ├── _header.scss         # Radar altimeter nav bar & live status beacon
│   ├── _footer.scss         # FAA violation counter & emergency callsign footer
│   ├── _grid.scss           # Tactical responsive grid
│   └── _hero.scss           # Fullscreen 4K FPV cockpit hero section
├── pages/
│   ├── _home.scss           # Breach reel, stats ticker, fleet showcase
│   ├── _listings.scss       # Classified MLS listings (Bunker, Ranch, McMansion)
│   ├── _fleet.scss          # Custom drone rig specs & crash records
│   ├── _pilots.scss         # Pilot dossiers & disciplinary hearing logs
│   └── _waiver.scss         # Interactive liability & drywall indemnity calculator
└── main.scss                # Primary Sass manifest
```

### 2.3 Visual Design System Tokens
* **Color Palette**:
  * `brand-black`: `#090A0F` (Night flight carbon)
  * `brand-dark`: `#11141D` (Ground control station navy)
  * `brand-tactical-amber`: `#FF9E00` (Low battery / warning beacon)
  * `brand-fpv-green`: `#00FF66` (HUD OSD vector green)
  * `brand-danger-red`: `#FF1E44` (Drywall breach / HOA intercept)
  * `brand-luxury-gold`: `#E5C07B` (High-end listing accents)
  * `brand-hud-cyan`: `#00E5FF` (GPS telemetry & artificial horizon)
* **Typography**:
  * Display / Headlines: `Syne` / `Space Grotesk` (Aggressive architectural luxury)
  * Telemetry / HUD / Data: `JetBrains Mono` / `Share Tech Mono` (Military OSD readouts)
  * Body / Editorial: `Inter` (Crisp legible corporate parody)
* **Visual Effects**:
  * CRT scanline overlays with toggleable chromatic aberration
  * Animated artificial horizon and pitch ladder synced to mouse/gyro
  * Dynamic lens dirt, prop shadow flicker, and rotor vibration micro-animations

---

## 3. Site Structure & Information Architecture

### 3.1 Sitemap Overview

```
/
├── index.html                   # Command Center Hero, Live Feed HUD, Featured Breaches
├── listings/                    # Tactical MLS Directory
│   ├── index.html               # Filterable Grid (Crash Risk, Ceiling Height, HOA Anger)
│   └── [slug]/                  # Single Property Mission Debrief (HUD flight path, 3D map)
├── fleet/                       # The Drone Armory
│   ├── index.html               # Fleet Directory (Acro, CineWhoop, Heavy-Lifter, Micro-Breacher)
│   └── [slug]/                  # Rig Teardown (KV ratings, drywall penetration specs)
├── pilots/                      # Squad Roster
│   ├── index.html               # Pilot Profiles, Flight Hours, Court Dates
│   └── [slug]/                  # Individual Dossier & Flight Violations
├── packages/                    # Mission Pricing & Incursion Tiers
│   └── index.html               # "The Gentle Orbit" to "The Chimney Plunge Special"
├── drywall-estimator/           # Interactive Collateral Damage Calculator
│   └── index.html               # Calculate estimated patch costs based on house decor
├── soundboard/                  # The FPV Audio Experience (LiPo warnings, angry neighbors)
│   └── index.html               # Interactive sound FX & bass drops
├── legal-waiver/                # The Ironclad Indemnity Agreement
│   └── index.html               # Interactive multi-step waiver with impossible clauses
└── emergency-dispatch/          # Contact / Immediate Booking Infiltration Form
    └── index.html               # Tactical Mission Request Terminal
```

---

## 4. Feature Specifications & Interactive Components

### 4.1 Feature 1: The FPV Cockpit HUD Hero (`components/_hud-overlay.scss`)
* **Visual Presentation**: A simulated 4K high-bitrate drone feed flying directly through a luxury suburban kitchen island between two hanging pendant lights at 60fps.
* **Live OSD Overlays**:
  * Top-Left: `BATT: 4S 15.8V [████░░] 68%` | `DRAW: 74.2A` | `TEMP: 54°C`
  * Top-Center: Dynamic Heading Compass (`HDG: 284° WNW`) + Artificial Horizon Pitch Ladder
  * Top-Right: `GPS: 18 SATS (LOCK)` | `ALT: 8.4 FT AGL` | `SPD: 58.2 MPH`
  * Bottom-Left: `ARMED: ACRO MODE` | `LQ: 99 (TBS CROSSFIRE)`
  * Bottom-Right: `CHIMNEY DISTANCE: 1.2M` | `REC: ● 4K 120FPS [00:14:32]`
* **Interactive Controls**:
  * **OSD Toggle Switch**: Switch between Clean Luxury Mode and Full Tactical Military OSD.
  * **Throttle Slider**: Increases background video playback speed (1x to 2.5x) with accompanying rotor whine pitch shifting.
  * **"Emergency Disarm" Button**: Cuts video to static glitch, displays `"COLLISION DETECTED: CHANDELIER DOWN"` message.

---

### 4.2 Feature 2: Tactical Property Showcase (`content/listings/`)
Each property listing is treated as a completed **Mission Debrief**.

#### Front Matter Data Model (`archetypes/listings.md`):
```yaml
---
title: "The Whispering Pines Cul-de-Sac Incursion"
date: 2026-08-15
address: "742 Evergreen Terr, Sector 4"
price: "$1,450,000"
square_feet: 3850
bedrooms: 4
bathrooms: 3.5
flight_metadata:
  pilot_callsign: "PROPWASH"
  drone_deployed: "CineWhoop Chimney Diver Mk IV"
  top_indoor_speed_mph: 47.3
  drywall_strikes: 1
  curtain_tangles: 0
  dog_bark_decibels: 104
  hoa_fines_incurred: "$750.00"
  survival_rate_crystal_glassware: "98.2%"
  flight_path: "Front Door -> Dining Chandelier Loop -> Master Shower -> Doggy Door Exit"
tags:
  - "Vaulted Ceilings"
  - "High Crash Risk"
  - "Doggy Door Extraction"
hero_video: "/videos/listings/whispering-pines.mp4"
telemetry_log: "/data/telemetry/whispering-pines.json"
---
```

#### Page Elements:
1. **Interactive Flight Telemetry Graph**: Visual altitude/speed sync alongside property photos.
2. **"Penetration Vector" Blueprint**: 2D floor plan overlay showing the drone's 3D flight trajectory with pinpoint markers where the drone performed tight barrel rolls over the Viking stove.
3. **Collateral Damage Assessment**: A breakdown box detailing:
   * Drywall damage: 1 minor scuff (spackled by pilot on-site).
   * Ceiling fan close calls: 3.
   * Cat startling index: Low.

---

### 4.3 Feature 3: The Fleet Arsenal (`content/fleet/`)
Detailed profiles for WDH's custom-built drone rigs.

* **The Drywall Annihilator 5000 (7-inch Long Range)**:
  * *Purpose*: Outer perimeter dominance and 500-foot chimney dives.
  * *Thrust-to-Weight*: 11:1.
  * *Noise Level*: 118 dB (Comparable to a jet turbine in the foyer).
  * *Warning*: *"Do not arm near floral arrangements."*
* **The CineWhoop Bidet Infiltrator (2.5-inch Ducted)**:
  * *Purpose*: Tight powder rooms, walk-in closets, and under-bed sweeps.
  * *Duct Material*: Padded foam-wrapped carbon (reduces crown molding friction).
  * *Top Speed*: 42 mph in master baths.
* **The HOA Ghost (Sub-250g Stealth Operative)**:
  * *Purpose*: Undetected backyard pool recon in strictly regulated gated communities.
  * *Acoustic Signature*: Sounds like an angry hummingbird.
  * *Legal Status*: Sub-250g bypasses FAA scrutiny; HOA legal injunction pending.

---

### 4.4 Feature 4: Interactive Drywall Damage & Fee Estimator (`drywall-estimator/`)
An interactive JavaScript/Sass calculator that allows realtors and homeowners to estimate their customized quote:

* **Step 1: Property Risk Factors**:
  * Square Footage Slider (1,000 sq ft to 15,000 sq ft)
  * Ceiling Height Selector (8ft standard / 12ft vaulted / 24ft cathedral death-trap)
  * Chandelier Density (0 = Minimalist / 5 = Versailles nightmare)
  * Pet Status (None / Sleepy Golden Retriever / Airborne Cat)
* **Step 2: Tactical Package Selection**:
  * **Tier 1: "The Gentle Orbit" ($499)** — Standard external flyover + 1 cautious pass through the front hallway.
  * **Tier 2: "The Full Interior Breach" ($999)** — High-speed fly-through living room, kitchen, garage, and attic access crawlspace.
  * **Tier 3: "The Action Movie Hero Exit" ($1,799)** — Drone enters 2nd-floor skylight, spins through the foyer, and exits via doggy door into a synchronized pool splash.
* **Step 3: Ridiculous Add-Ons**:
  * Pilot sunglasses fee (polarized carbon): +$45.00
  * Bass-heavy EDM royalty-free license: +$120.00
  * Emergency Spackle & Touch-Up Paint Kit: +$75.00
  * HOA Distraction Decoy (Second drone buzzing the clubhouse): +$250.00
* **Output**: Real-time calculated price breakdown, expected Zillow viral score, and a button to *"Sign Electronic Waiver & Launch Drone"*.

---

### 4.5 Feature 5: The Pilot Squad Roster (`content/pilots/`)
Profiles of WDH's elite, sleep-deprived FPV pilots:

1. **Callsign: "PROPWASH" (Chief Pilot / Co-Founder)**
   * *Flight Hours*: 4,200 hrs (3,800 in FPV simulator, 400 real-world).
   * *Specialty*: High-speed flight through French doors.
   * *Disciplinary Record*: 2 FAA citations, banned from 3 country clubs.
   * *Quote*: *"If you aren't trimming the hedges with your props, you aren't framing the shot."*
2. **Callsign: "TREMOR" (Sub-Compact Specialist)**
   * *Flight Hours*: 2,900 hrs.
   * *Specialty*: Walk-in pantry acrobatics & wine cellar slaloms.
   * *Record*: Holds the unofficial record for fastest flight through a laundry chute (1.4 seconds).
3. **Callsign: "SKYKAREN" (Infiltration & Evasion)**
   * *Flight Hours*: 3,100 hrs.
   * *Specialty*: Anti-HOA countermeasures & silent hover over disputed fence lines.

---

### 4.6 Feature 6: Interactive Pilot Soundboard (`soundboard/`)
A tactile soundboard widget giving visitors the auditory experience of a live WDH incursion:
* Button 1: *"LiPo Low Voltage Alarm (BEEP-BEEP-BEEP)"*
* Button 2: *"Full Throttle Prop Whoosh (100% Punchout)"*
* Button 3: *"Distant Glass Clinking"*
* Button 4: *"Angry Neighbor Yelling at Sky"*
* Button 5: *"Bass Drop Drop-In Dubstep Beat"*
* Button 6: *"Radio Comms: 'Breach confirmed, exiting kitchen' "*

---

## 5. Content Architecture & Hugo Implementation Plan

### 5.1 Project Directory Structure
```
we-drone-homes/
├── archetypes/
│   ├── default.md
│   ├── listings.md
│   ├── fleet.md
│   └── pilots.md
├── assets/
│   ├── js/
│   │   ├── hud-simulator.js    # Telemetry HUD logic, artificial horizon math
│   │   ├── damage-calc.js      # Drywall & fee estimator engine
│   │   ├── soundboard.js       # Web Audio API soundboard synthesizer/sampler
│   │   └── main.js             # Navigation, modal waivers, glitch animations
│   └── sass/
│       └── [7-1 Sass architecture files]
├── config/
│   └── _default/
│       ├── hugo.yaml           # Primary Hugo configuration
│       ├── params.yaml         # Brand metadata, social links, tactical settings
│       └── menus.yaml          # Header and footer navigation menus
├── content/
│   ├── _index.md               # Homepage content
│   ├── listings/               # MLS Missions
│   │   ├── whispering-pines.md
│   │   ├── the-mcmansion-monolith.md
│   │   ├── lakeside-bunker-retreat.md
│   │   └── penthouse-sky-breach.md
│   ├── fleet/                  # Drones
│   │   ├── drywall-annihilator-5000.md
│   │   ├── cinewhoop-bidet-infiltrator.md
│   │   └── hoa-ghost-sub250.md
│   ├── pilots/                 # Operators
│   │   ├── propwash.md
│   │   ├── tremor.md
│   │   └── skykaren.md
│   ├── packages/
│   │   └── _index.md           # Flight packages & tiers
│   ├── drywall-estimator/
│   │   └── _index.md           # Interactive Calculator Page
│   ├── soundboard/
│   │   └── _index.md           # Soundboard Page
│   └── legal-waiver/
│       └── _index.md           # Interactive Liability & Waiver Page
├── layouts/
│   ├── _default/
│   │   ├── baseof.html         # Base template with HUD framing & meta tags
│   │   ├── list.html           # Generic listing layout
│   │   └── single.html         # Generic article layout
│   ├── index.html              # Custom high-impact homepage
│   ├── listings/
│   │   ├── list.html           # Tactical MLS Grid
│   │   └── single.html         # Mission Debrief with Telemetry HUD & 2D Flight Path
│   ├── fleet/
│   │   ├── list.html           # Armory Grid
│   │   └── single.html         # Rig Spec Sheet with Thrust Gauges
│   ├── pilots/
│   │   ├── list.html           # Squad Dossier List
│   │   └── single.html         # Pilot Bio & Hearing Transcripts
│   └── partials/
│       ├── head.html           # Meta, Google Fonts, Sass styles pipeline
│       ├── header.html         # Altimeter Navigation & Live Status
│       ├── footer.html         # FAA Disclaimer, Violation Ticker
│       ├── hud-overlay.html    # Reusable FPV OSD Component
│       └── telemetry-bar.html  # Live Battery/Signal Status Widget
└── static/
    ├── audio/                  # Soundboard audio samples
    ├── images/                 # Drone photos, HUD icons, blueprint graphics
    └── favicon.ico
```

---

## 6. Sass & CSS Technical Architecture

### 6.1 Hugo Pipes Sass Pipeline (`layouts/partials/head.html`)
```html
{{ $sassOptions := dict "targetPath" "css/style.css" "outputStyle" "compressed" "enableSourceMap" true }}
{{ $style := resources.Get "sass/main.scss" | toCSS $sassOptions | postCSS | minify | fingerprint }}
<link rel="stylesheet" href="{{ $style.RelPermalink }}" integrity="{{ $style.Data.Integrity }}">
```

### 6.2 Key Sass Mixins & Variables (`assets/sass/abstracts/`)
```scss
// Variables
$font-hud: 'Share Tech Mono', 'Courier New', monospace;
$font-display: 'Space Grotesk', -apple-system, sans-serif;
$font-body: 'Inter', sans-serif;

$color-bg: #090a0f;
$color-surface: #12151f;
$color-border: #1e2433;
$color-green-osd: #00ff66;
$color-amber-alert: #ff9e00;
$color-danger: #ff1e44;
$color-hud-cyan: #00e5ff;

// OSD Glowing Text Mixin
@mixin hud-glow($color: $color-green-osd) {
  color: $color;
  text-shadow: 0 0 4px rgba($color, 0.6), 0 0 10px rgba($color, 0.3);
  font-family: $font-hud;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

// Tactical Glass Container
@mixin tactical-glass($border-color: $color-border) {
  background: rgba(18, 21, 31, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid $border-color;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 6px;
    border-top: 2px solid $color-green-osd;
    border-left: 2px solid $color-green-osd;
  }
}
```

---

## 7. Interactive JavaScript Specifications

1. **`hud-simulator.js`**:
   * Simulates active drone pitch/roll based on cursor coordinates or device orientation.
   * Updates mock battery voltage discharge over time with realistic load drop during simulated "throttle punch".
   * Dynamic artificial horizon lines rendered via HTML5 Canvas or SVG matrix transforms.

2. **`damage-calc.js`**:
   * Dynamic calculation engine linking property attributes to estimated drywall patch fees and HOA fines.
   * Exports an itemized "Pre-Flight Collision Indemnity Quote" with instant download or clipboard copy.

3. **`soundboard.js`**:
   * Uses the Web Audio API with synthetically generated drone motor oscillation frequencies and low-voltage telemetry alerts for instantaneous, lag-free audio playback without external asset bottlenecks.

---

## 8. Humorous Copywriting & Easter Egg Highlights

* **Footer Violation Ticker**: *"CURRENT FAA SANCTION STATUS: 14 DAYS WITHOUT A FORMAL SUBPOENA"*
* **Interactive Terms & Conditions**: Section 9.4: *"Client agrees that any drone stuck in a ficus tree becomes a permanent fixture of the property and adds $1,200 to the appraised home value."*
* **404 Page**: *"ALTITUDE ZERO: DRONE HAS CRASHED INTO 404 SERVER RACK. PILOT CALLSIGN 'PROPWASH' HAS BEEN DISPATCHED WITH A ROLL OF DUCT TAPE."*
* **Live Chat Widget**: An automated tactical dispatcher that responds with FPV jargon (*"Copy that, staging 6S battery packs for your living room fly-through"*).

---

## 9. Quality Assurance & Performance Benchmarks

* **Build Time**: < 100ms full Hugo build.
* **Lighthouse Targets**: 98+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
* **Responsive Breakpoints**: Full tactical HUD adapts flawlessly from 320px mobile screens (compact OSD bar) to 4K ultra-wide monitors (full cockpit simulator).
* **WCAG 2.1 AA Compliance**: High-contrast OSD modes and accessible screen-reader fallbacks for all tactical telemetry readouts.

---
*End of Master Specification — We Drone Homes Architecture Team*
