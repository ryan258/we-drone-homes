# We Drone Homes visual standards

**Identity direction:** Flight Plan for a House  
**Master tagline:** Killer views. Unfortunate name.  
**Descriptor:** A fictional real estate drone agency.

Use the horizontal signature when the audience is meeting the brand. Give the name room to read before introducing a flight label or punchline. The four rotors and crossed arms come from the website's current mark. The lettering in the supplied logos is drawn as SVG paths, so the artwork scales and travels without a font file.

[View the identity specimen](identity-sheet.svg) · [View all 20 glyphs](glyph-sheet.svg) · [CSS tokens](tokens.css) · [JSON tokens](tokens.json)

## Logo selection

| Master | Use | Recommended minimum |
| --- | --- | --- |
| [Horizontal](logo-horizontal.svg) | Default on Paper, Studio White, or a light, quiet image panel | 200 px wide / 50 mm wide |
| [Horizontal reverse](logo-horizontal-reverse.svg) | Evergreen panel or an evenly dark photograph | 200 px / 50 mm |
| [Stacked](logo-stacked.svg) or [stacked reverse](logo-stacked-reverse.svg) | Square title card, cover, or insert with a narrow column | 112 px / 28 mm |
| [Single color](logo-horizontal-mono.svg) or [white knockout](logo-horizontal-white.svg) | One ink printing, embossing, photocopying, or a dark photograph that already has a strong color cast. Both are also available in stacked and mark variants. | Same as matching lockup |
| [Mark](logo-mark.svg) or [mark reverse](logo-mark-reverse.svg) | Brand recognition after the name is established, or a repeated attribution | 32 px / 8 mm |
| [Avatar](avatar.svg) | Square account profile. The center remains clear when a platform crops to a circle. | Start from the 512 × 512 export |
| [Favicon](favicon.svg) | Browser tab, bookmark or tiny badge | 16 px. Use the simplified [16 px PNG](png/favicon-16.png) when the tiny icon looks congested. |

Keep surrounding artwork at least one central fuselage width from the visible logo on each side. The center square measures 12 units in the 48-unit source mark. Its width is 3.3% of the horizontal SVG width and 9.4% of the stacked SVG width. Both full signatures include this minimum margin within the SVG. Apply the same space if a design tool trims the artboard. For an isolated mark, reserve a full fuselage width beyond its visible edges, including space outside the exported artboard as needed.

Use the file as a unit. Preserve aspect ratio, rotor symmetry, and the final dot. Set the name in ordinary title case in running text and keep the logo's drawn capitals in artwork. Keep the signature off busy property features, out of the viewfinder's center, and away from borders and folds. Use the right color master for the background and leave the shot's focal point open. Put the tagline and fiction descriptor in live copy or separate type layers so both remain readable.

For an image that names the brand, use `alt="We Drone Homes"`. Use `alt=""` when adjacent visible text names the brand. If the artwork is the only content of a home link, give the link a clear name such as “We Drone Homes, home.”

## Color

| Color | HEX | RGB | Role |
| --- | --- | --- | --- |
| Evergreen | `#192D27` | 25, 45, 39 | Primary text, wordmark, dark panels and buttons |
| Paper | `#F5F3EB` | 245, 243, 235 | Main canvas and text on Evergreen |
| Studio White | `#FFFEF8` | 255, 254, 248 | Cards, fields, and labels on dark grounds |
| Field Gray | `#59655A` | 89, 101, 90 | Secondary copy and meaningful outlines on light grounds |
| Survey Line | `#D3D7C9` | 211, 215, 201 | Quiet rules and decorative grids |
| Signal Yellow | `#E8EE79` | 232, 238, 121 | Accent and status highlight with text and icons in Evergreen |
| Plan Tint | `#E9ECDF` | 233, 236, 223 | Alternate section backgrounds |
| Focus Ochre | `#986400` | 152, 100, 0 | Visible focus on light surfaces, including Signal Yellow |

A working balance for layouts is about 70% light surfaces, 25% Evergreen and photography framing, and 5% Signal Yellow. Treat the ratio as a composition guide. Lead with a single accent in each view.

Calculated sRGB contrast pairs include Evergreen on Paper (13.07:1), Evergreen on Signal Yellow (11.71:1), and Field Gray on Plan Tint (5.10:1). Use Signal Yellow on Evergreen for inverse focus (11.71:1) and Focus Ochre on Paper for light focus (4.55:1). Keep focus outlines about 3 px wide with offset. Survey Line on Paper (1.32:1) serves decorative rules. Signal Yellow on Paper (1.12:1) serves decorative blocks, with dark ink for any meaning. Give controls that need visible boundaries a Field Gray outline on light panels. For photos, place labels on an opaque panel or measure contrast against the actual crop. These values cover the palette pairs. Review the assembled design for text size, focus, state labels, and contrast on photos.

Supply digital artwork in sRGB. For print, keep the SVG master vector and ask the printer for the profile and stock. Check the first proof for Evergreen shadow detail, legibility of the fine linework, and the yellow's shift on uncoated stock. Sample stock before a full run.

## Typography and composition

- **Display and body:** Arial, Helvetica, sans-serif. Use bold for titles and a 16 px minimum for ordinary interface body copy. Use about 1.5–1.6 line height for prose and keep paragraphs near 60–70 characters per line when space allows.
- **Flight labels:** Courier New, monospace. Use 12 px or larger for short labels, with tracking near .085 em. Use larger sizes where labels carry instructions or story beats. Use ordinary sentence case for buttons and longer labels.
- **Wordmark:** Use the supplied artwork. Its lettering stays exclusive to the brand signature.
- **Grid:** Keep one clear reading order. Align headline, supporting text, and calls to action to the same edge. On wider pages put the property image beside the headline or above a card grid. Collapse to a single column with the title before the image when width is tight.
- **Effects:** Use brackets, dotted paths, and brief captions. Prefer static overlays and manual playback controls. Provide a reduced motion option for animated diagrams. Use audio after a deliberate play action and provide a text fallback for sound cues.

## Glyph system

Every glyph is drawn on a 24 × 24 grid with rounded ends and a 1.65-unit default stroke. Use at 24 px for inline services and 32–48 px for features. Keep glyphs at least 16 px wide. Make touch controls at least 44 × 44 px where layout allows. Use one ink color per icon and communicate status with a visible word or shape in addition to color.

| Glyph file / sprite suffix | Recommended label or use | Existing route or placement |
| --- | --- | --- |
| `drone` | Drone | Flight metadata, equipment labels |
| `camera` | Aerial photography | Home service card |
| `interior` | Interior fly-through | Home service card or property detail |
| `twilight` | Twilight films | Home service card or light selection |
| `social` | Social-ready edits | Home service card or package feature |
| `property` | Our work | `/listings/` |
| `packages` | Packages | `/packages/` |
| `crew` | The crew | `/pilots/` |
| `fleet` | Fleet | `/fleet/` |
| `briefing` | Flight briefing | Process cards or fictional package brief |
| `dispatch` | Mock booking / Dispatch console | `/emergency-dispatch/` |
| `calculator` | Drywall calculator | `/drywall-estimator/` |
| `soundboard` | Soundboard | `/soundboard/` |
| `waiver` | Unofficial waiver | `/legal-waiver/` |
| `flight-path` | Flight path | `/listings/` detail diagrams |
| `play` | Play flight path | Diagram or sound controls, with object in accessible name |
| `pause` | Pause flight path | In-progress diagram controls |
| `reset` | Reset flight path | Diagram or calculator, with object in accessible name |
| `arrow-up-right` | Text CTA accompaniment | Supplement the label. Describe destination behavior in words when it matters. |
| `info` | Details | FAQ or information note |

Use a standalone file inside a normal link with text when composing static guides or slides.

```html
<a href="/listings/">
  <img src="glyphs/property.svg" width="24" height="24" alt="">
  Our work
</a>
```

On a served site, place `glyphs.svg` at a same-origin URL and use a fragment such as `#wdh-property`. For offline HTML, use standalone images or inline the sprite and reference `#wdh-property` directly. The sprite inherits `currentColor`.

```html
<button type="button">
  <svg width="24" height="24" aria-hidden="true" focusable="false">
    <use href="/brand/glyphs.svg#wdh-play"></use>
  </svg>
  Play flight path
</button>
```

Keep the visible label and accessible name in sync when the control changes from Play to Pause. Use clear text at the destination of navigation and as an alternative for any diagram with informational content.

## Graphic motifs

| File | Where it works | How to apply |
| --- | --- | --- |
| [Flight path](motifs/flight-path.svg) | Portfolio dividers, dossier covers, diagram background | Use at generous size on Paper or White. Describe any meaningful flight stages in a text list near the diagram. Decorative uses take empty alt text. |
| [Viewfinder](motifs/viewfinder.svg) | Property photography and campaign covers | Align the corner brackets to the image crop. Keep the center point near architecture or empty space. Use a dark edge or scrim if the white lines disappear. |
| [Fictional agency stamp](motifs/fictional-stamp.svg) | Flyers, dossier covers, and social tiles | Use at 190 px or larger in digital artwork. Give the disclosure the same readable wording in live text when the artwork is shared. Place away from main CTA. |

Keep the patterns out of controls and use one graphic motif per composition. The wordmark and the interface controls retain their own clear spaces.

## Formats and updates

Use SVG for scalable artwork and design editing. Use the transparent exports in [png/](png/) when a platform requires raster files. The editable assets and documented sizes are the handoff reference. `python3 brand/identity/build-vectors.py` regenerates the SVG suite from the vector paths and glyph definitions. Review the identity and glyph specimens after changing the source. The site CSS currently uses the same core color values. The namespaced exports can be imported into new brand collateral.
