#!/usr/bin/env python3
"""Make offline reading editions from their canonical Markdown using Pandoc."""
from html import escape
from pathlib import Path
from subprocess import check_output

ROOT = Path(__file__).resolve().parents[1]
DOCS = [
    (ROOT / "identity/USAGE.md", "Visual identity standards", "../", "Visual identity"),
    (ROOT / "campaign/COPY-AND-LAUNCH.md", "Copy and launch kit", "../", "Verbal identity & campaign"),
    (ROOT.parent / "reports/We Drone Homes positioning.md", "Positioning and SWOT", "../brand/", "Positioning & SWOT"),
]

for source, title, guide, section in DOCS:
    fragment = check_output(["pandoc", "--from=gfm", "--to=html5", str(source)], text=True)
    page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(title)} · We Drone Homes</title>
<link rel="stylesheet" href="{guide}guide.css">
<link rel="icon" href="{guide}identity/favicon.svg" type="image/svg+xml">
</head>
<body>
<a class="skip" href="#main">Skip to the document</a>
<header class="mast"><div class="wrap"><div class="mast-label">We Drone Homes / {escape(section)}</div>
<a href="{guide}index.html">Back to the brand field manual</a></div></header>
<main class="reading wrap" id="main">
{fragment}</main>
<footer class="footer"><div class="wrap"><p>We Drone Homes · A fictional real estate drone agency</p></div></footer>
</body>
</html>
"""
    source.with_suffix(".html").write_text(page, encoding="utf-8")
