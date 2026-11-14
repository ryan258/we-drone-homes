# We Drone Homes brand kit

**Open [the brand field manual](index.html).** The guide and images work from the checkout or an extracted kit, with no server, account, or external fonts. Keep the directories together. The guide is also formatted for printing.

| If you need… | Start here |
| --- | --- |
| The strategic decision and evidence | [Positioning and SWOT](../reports/We%20Drone%20Homes%20positioning.html) |
| A logo, avatar, or favicon | [Identity sheet](identity/png/identity-sheet.png) and [logo usage](identity/USAGE.html) |
| A glyph or a design token | [Glyph sheet](identity/png/glyph-sheet.png), [SVG sprite](identity/glyphs.svg), [CSS tokens](identity/tokens.css), and [JSON tokens](identity/tokens.json) |
| A brief for new art | [Exterior](moodboards/01-architectural-calm.png), [flight desk](moodboards/02-flight-desk.png), [interior](moodboards/03-domestic-suspense.png), and [art credits and prompts](art/README.md) |
| An asset or ready-to-paste copy | [Campaign exports](index.html#campaign), [usage and export notes](campaign/asset-usage.md), and [copy and launch kit](campaign/COPY-AND-LAUNCH.html) |

## Adopt the system in Hugo

- **Featured report:** the homepage opens with the McMansion Monolith. The page links directly to its flight report, which uses the square field report as its social preview. `params.featuredReport` in `hugo.yaml` is the shared reference.
- **Canonical assets:** Hugo reads the wordmark, favicon, glyph sprite, color tokens, and selected campaign art from the mounted brand directories. The logo and glyph partials keep the surrounding text readable and give decorative artwork an empty alternative. See [glyph examples](identity/USAGE.html#glyph-system).
- **Social previews:** `layouts/partials/head.html` uses the landscape card as the site default and reads a report’s `og_image` and `og_image_alt` when supplied. Set the actual `baseURL` for a public build and check the destination’s crop.

## Refresh the deliverables

The SVG and Markdown files are editable masters. Edit SVGs directly in a vector editor, or change the layout values in `tools/build-art.py` when regenerating several outputs. The script uses Python and ImageMagick to embed the supplied stills. `tools/render-art.cjs` uses Node and Sharp to rasterize those SVGs; use an environment where `require('sharp')` resolves. Raster exports are already included.

```sh
python3 brand/tools/build-art.py
node brand/tools/render-art.cjs
cp brand/campaign/share-card.jpg static/images/brand-share.jpg
python3 brand/tools/build-reading.py
```

Run the final command after updating the copy, identity guide, or report Markdown. It uses Pandoc to refresh the offline HTML reading editions. The share JPEG lives alongside the layout export so Hugo needs no asset generation step. Keep its dimensions and metadata alt text aligned if you change the crop or copy.
