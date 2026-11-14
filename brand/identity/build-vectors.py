#!/usr/bin/env python3
"""Build We Drone Homes SVG masters and specimens with the Python standard library."""

from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PAPER = "#F5F3EB"
WHITE = "#FFFEF8"
INK = "#192D27"
MUTED = "#59655A"
LINE = "#D3D7C9"
YELLOW = "#E8EE79"
TINT = "#E9ECDF"

# Four rotors, crossed arms and a rounded fuselage. This keeps the
# geometry of layouts/partials/mark.html.
MARK = """<g stroke="currentColor" fill="none">
  <path d="M14 14l20 20M34 14L14 34" stroke-width="3"/>
  <g stroke-width="2">
    <circle cx="11" cy="11" r="8"/><circle cx="37" cy="11" r="8"/>
    <circle cx="11" cy="37" r="8"/><circle cx="37" cy="37" r="8"/>
  </g>
</g>
<rect x="18" y="18" width="12" height="12" rx="3" fill="currentColor"/>"""

# Drawn lettering is independent of installed fonts. These paths are
# editable in any vector editor. Numerals and supporting copy use site fonts.
LETTERS = {
    "W": (22, "M0 0l4.5 21 6.5-15.8 6.5 15.8L22 0"),
    "E": (12, "M12 0H0v21h12M0 10.2h10"),
    "D": (14, "M0 21V0h5a9 9 0 0 1 9 9v3a9 9 0 0 1-9 9z"),
    "R": (14, "M0 21V0h7c4.1 0 6.2 2.2 6.2 5.7S11.1 11.5 7 11.5H0m7.2 0L14 21"),
    "O": (15, "M7.5 21C2.8 21 0 17.5 0 10.5S2.8 0 7.5 0 15 3.5 15 10.5 12.2 21 7.5 21Z"),
    "N": (15, "M0 21V0l15 21V0"),
    "H": (14, "M0 0v21M14 0v21M0 10.2h14"),
    "M": (18, "M0 21V0l9 12.2L18 0v21"),
    "S": (13, "M13 2.6A9.8 9.8 0 0 0 6.6 0C2.8 0 .4 1.9.4 5c0 3.7 3 4.4 6.2 5.4 3.5 1 6.4 2 6.4 5.4 0 3.3-2.6 5.2-6.5 5.2a9.4 9.4 0 0 1-6.5-2.6"),
}

def wordmark(text, x, y, color, center=False):
    offset = 0
    elements = []
    for letter in text:
        if letter == " ":
            offset += 7
        elif letter == ".":
            elements.append(f'<circle cx="{offset-1}" cy="19.6" r="2.35" fill="{color}" stroke="none"/>')
            offset += 1.5
        else:
            width, path = LETTERS[letter]
            elements.append(f'<path transform="translate({offset} 0)" d="{path}"/>')
            offset += width + 5.9
    if center:
        x -= offset / 2
    return (
        f'<g transform="translate({x:.1f} {y:.1f})" fill="none" stroke="{color}" '
        'stroke-width="3.25" stroke-linejoin="round" stroke-linecap="square">\n'
        + "\n".join("  " + part for part in elements)
        + "\n</g>"
    )

def mark(x=0, y=0, scale=1, color=INK):
    return (
        f'<g transform="translate({x} {y}) scale({scale})">\n'
        + MARK.replace("currentColor", color)
        + "\n</g>"
    )

def svg(path, width, height, title, art, description=None):
    path.parent.mkdir(parents=True, exist_ok=True)
    labelled_by = "asset-title asset-description" if description else "asset-title"
    label = f'<title id="asset-title">{escape(title)}</title>'
    if description:
        label += f'\n<desc id="asset-description">{escape(description)}</desc>'
    path.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}" role="img" aria-labelledby="{labelled_by}">\n'
        f'{label}\n{art}\n</svg>\n',
        encoding="utf-8",
    )

def lockups():
    horizontal = (360, 78)
    stacked = (192, 178)
    for suffix, word_color, mark_color in (
        ("", INK, INK),
        ("-reverse", PAPER, YELLOW),
        ("-mono", "#000000", "#000000"),
        ("-white", "#FFFFFF", "#FFFFFF"),
    ):
        art = mark(16, 15, 1, mark_color)
        art += "\n" + wordmark("WE DRONE HOMES.", 82, 28.5, word_color)
        svg(ROOT / f"logo-horizontal{suffix}.svg", *horizontal, "We Drone Homes", art)
        art = mark(60, 16, 1.5, mark_color)
        art += "\n" + wordmark("WE DRONE", 96, 102, word_color, center=True)
        art += "\n" + wordmark("HOMES.", 96, 133, word_color, center=True)
        svg(ROOT / f"logo-stacked{suffix}.svg", *stacked, "We Drone Homes", art)
        svg(ROOT / f"logo-mark{suffix}.svg", 64, 64, "We Drone Homes drone mark", mark(8, 8, 1, mark_color))

    svg(
        ROOT / "avatar.svg", 512, 512, "We Drone Homes avatar",
        f'<rect width="512" height="512" fill="{INK}"/>\n'
        '<rect x="24" y="24" width="464" height="464" rx="224" fill="none" stroke="#FFFEF8" stroke-opacity=".25" stroke-width="3"/>\n'
        + mark(88, 88, 7, YELLOW),
    )
    svg(
        ROOT / "favicon.svg", 64, 64, "We Drone Homes favicon",
        f'<rect width="64" height="64" rx="12" fill="{INK}"/>\n'
        + mark(8, 8, 1, YELLOW),
    )
    svg(
        ROOT / "favicon-small.svg", 16, 16, "We Drone Homes small favicon",
        f'<rect width="16" height="16" rx="3" fill="{INK}"/>\n'
        f'<g fill="none" stroke="{YELLOW}" stroke-width=".95">'
        '<path d="m5.7 5.7 4.6 4.6m0-4.6-4.6 4.6"/>'
        '<circle cx="4.6" cy="4.6" r="2"/><circle cx="11.4" cy="4.6" r="2"/>'
        '<circle cx="4.6" cy="11.4" r="2"/><circle cx="11.4" cy="11.4" r="2"/>'
        f'</g><rect x="6.55" y="6.55" width="2.9" height="2.9" rx=".55" fill="{YELLOW}"/>',
    )

# Name, visible label and artwork. Each icon uses a 24-unit frame with
# a consistent 1.65-unit stroke and rounded ends.
GLYPHS = {
    "drone": ("Drone", '<path d="m7 7 10 10m0-10L7 17"/><rect x="9.3" y="9.3" width="5.4" height="5.4" rx="1.3" fill="currentColor" stroke="none"/><circle cx="5.8" cy="5.8" r="3.1"/><circle cx="18.2" cy="5.8" r="3.1"/><circle cx="5.8" cy="18.2" r="3.1"/><circle cx="18.2" cy="18.2" r="3.1"/>'),
    "camera": ("Aerial photography", '<path d="M4.5 7.5h4L10 5h4l1.5 2.5h4A1.5 1.5 0 0 1 21 9v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V9a1.5 1.5 0 0 1 1.5-1.5Z"/><circle cx="12" cy="13.5" r="3.2"/>'),
    "interior": ("Interior fly-through", '<path d="M3 21h18M5.5 21V3h11v5M16.5 16v5M9 12h12m-3.7-3.7L21 12l-3.7 3.7"/>'),
    "twilight": ("Twilight films", '<path d="M3 16.5h18M6 16.5a6 6 0 0 1 12 0M12 3.5v2m7.3 1.6-1.4 1.4M4.7 7.1l1.4 1.4M7 20h10"/>'),
    "social": ("Social-ready edits", '<rect x="6.5" y="2.75" width="11" height="18.5" rx="2"/><path d="m10.25 8 4.6 3-4.6 3zM11 18h2"/>'),
    "property": ("Our work", '<path d="M2.75 10.5 12 3l9.25 7.5M5 9.5v11h14v-11m-9.5 11v-6h5v6"/>'),
    "packages": ("Packages", '<path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Zm0 9 8.5-4.5M12 12 3.5 7.5M12 12v9m-4.25-15.75 8.5 4.5"/>'),
    "crew": ("The crew", '<circle cx="9" cy="8" r="3.25"/><path d="M2.75 20v-1.5A4.5 4.5 0 0 1 7.25 14h3.5a4.5 4.5 0 0 1 4.5 4.5V20m.4-15.2a3.25 3.25 0 0 1 0 6.4M18 14.5a4.5 4.5 0 0 1 3.25 4.3V20"/>'),
    "fleet": ("Fleet", '<rect x="4.5" y="3.5" width="15" height="7" rx="1.5"/><rect x="4.5" y="13.5" width="15" height="7" rx="1.5"/><path d="M8 7h2m-2 10h2m4.5-10H16m-1.5 10H16"/>'),
    "briefing": ("Flight briefing", '<path d="M9 4.5H6.5A1.5 1.5 0 0 0 5 6v14a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 20V6a1.5 1.5 0 0 0-1.5-1.5H15"/><rect x="9" y="2.5" width="6" height="4" rx="1"/><path d="m8.25 12.25 1.25 1.25 2.25-2.25m1.8 1.25H16m-7.75 5H16"/>'),
    "dispatch": ("Dispatch", '<path d="M9 13.5v-5m0 0L6.5 4M9 8.5 11.5 4m-4.7 16.75h10.4A1.8 1.8 0 0 0 19 19v-4a1.8 1.8 0 0 0-1.8-1.75H6.8A1.8 1.8 0 0 0 5 15v4a1.8 1.8 0 0 0 1.8 1.75ZM9 17h.1m3-.25h3.5M15 5.5a4.7 4.7 0 0 1 3.5 3.5m-3.1-6.1a7.2 7.2 0 0 1 5.7 5.7"/>'),
    "calculator": ("Drywall calculator", '<rect x="5.5" y="2.75" width="13" height="18.5" rx="1.7"/><path d="M8.5 7.5h7m-7 4.5h1m5 0h1m-7 3h1m5 0h1m-7 3h1m5 0h1"/>'),
    "soundboard": ("Soundboard", '<path d="M3 10v4m3-7v10m3-13v16m3-11v6m3-9v12m3-14v16m3-10v4"/>'),
    "waiver": ("Unofficial waiver", '<path d="M5.5 21V3h9L19 7.5V21H5.5Zm9-18v4.5H19M8 11.5h7.5M8 15.5c1.9-2.5 3-1.3 3 0s.9 1.5 1.8.5 1.2-.5 2.8.2"/>'),
    "flight-path": ("Flight path", '<circle cx="5.5" cy="18.5" r="2.25"/><circle cx="18.5" cy="5.5" r="2.25"/><path d="M5.5 16.25V9a3.5 3.5 0 0 1 7 0v3.5a3 3 0 0 0 6 0V7.75"/>'),
    "play": ("Play", '<path d="M8 5v14l11-7z"/>'),
    "pause": ("Pause", '<path d="M8.5 5v14m7-14v14" stroke-width="2.4"/>'),
    "reset": ("Reset", '<path d="M3.5 6v5.25h5.25M4 10.8a8 8 0 1 1 1.7 7.1"/>'),
    "arrow-up-right": ("Arrow up right", '<path d="M6 18 18 6m-8 0h8v8"/>'),
    "info": ("Information", '<circle cx="12" cy="12" r="8.75"/><path d="M12 11.2v5"/><circle cx="12" cy="7.7" r=".85" fill="currentColor" stroke="none"/>'),
}

def glyph_group(art, color="currentColor"):
    return (
        f'<g fill="none" stroke="{color}" stroke-width="1.65" '
        f'stroke-linecap="round" stroke-linejoin="round">{art.replace("currentColor", color)}</g>'
    )

def glyphs():
    sprite = []
    for name, (label, art) in GLYPHS.items():
        svg(ROOT / "glyphs" / f"{name}.svg", 24, 24, label, glyph_group(art, INK))
        sprite.append(f'<symbol id="wdh-{name}" viewBox="0 0 24 24">\n{glyph_group(art)}\n</symbol>')
    (ROOT / "glyphs.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg">\n' + "\n".join(sprite) + "\n</svg>\n",
        encoding="utf-8",
    )

def motifs():
    route = f"""
<g fill="none" stroke="{INK}">
  <path d="M50 278V52h520v226H50Zm0-128h142V52m0 98h139m95 0h144M331 52v56m0 42v128m-139-55v55m234-128v128"
        stroke-width="2" opacity=".30"/>
  <path d="M20 46h12m-6-6v12m560-6h12m-6-6v12M20 286h12m-6-6v12m560-6h12m-6-6v12" opacity=".42"/>
  <path d="M90 242H247Q273 242 273 215V108Q273 83 299 83H486Q523 83 523 120V234"
        stroke-width="5" stroke-dasharray="2 11" stroke-linecap="round"/>
  <g stroke-width="2.5">
    <circle cx="90" cy="242" r="8" fill="{WHITE}"/>
    <circle cx="273" cy="178" r="8" fill="{WHITE}"/>
    <circle cx="411" cy="83" r="8" fill="{WHITE}"/>
    <circle cx="523" cy="234" r="10" fill="{YELLOW}"/>
  </g>
</g>
<g fill="{INK}" font-family="Courier New, monospace" font-size="15" font-weight="bold">
  <text x="78" y="216">01</text><text x="288" y="185">02</text>
  <text x="399" y="119">03</text><text x="511" y="208">04</text>
</g>""".strip()
    svg(
        ROOT / "motifs/flight-path.svg", 620, 326, "Illustrated flight path", route,
        "A dashed path joins four numbered waypoints on a simple floor plan.",
    )

    corners = """
<path d="M22 79V22h57m462 0h57v57m0 192v57h-57m-462 0H22v-57M293 175h34m-17-17v34"
      stroke="#FFFEF8" fill="none" stroke-width="3" stroke-linecap="round"/>
<circle cx="50" cy="50" r="5" fill="#E8EE79"/>
""".strip()
    svg(
        ROOT / "motifs/viewfinder.svg", 620, 350, "Viewfinder overlay", corners,
        "Four corner brackets and a center registration mark.",
    )

    stamp = f"""
<rect x="3" y="3" width="258" height="82" rx="8" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>
<rect x="10" y="10" width="244" height="68" rx="5" fill="none" stroke="{INK}" stroke-width="1" stroke-dasharray="2 3"/>
{mark(20, 26, .72, INK)}
<path d="M66 23v42" stroke="{INK}" stroke-width="1"/>
<g fill="{INK}" font-family="Arial, Helvetica, sans-serif" font-weight="700">
  <text x="80" y="41" font-size="15" letter-spacing=".4">FICTIONAL AGENCY</text>
  <text x="80" y="60" font-size="11" letter-spacing=".7">WE DRONE HOMES</text>
</g>
""".strip()
    svg(ROOT / "motifs/fictional-stamp.svg", 264, 88, "Fictional agency. We Drone Homes.", stamp)

def specimens():
    top = [
        f'<rect width="960" height="666" fill="{PAPER}"/>',
        f'<rect x="0" y="0" width="960" height="11" fill="{YELLOW}"/>',
        f'<g fill="{INK}" font-family="Arial, Helvetica, sans-serif">'
        '<text x="38" y="68" font-size="35" font-weight="700">We Drone Homes</text>'
        '<text x="40" y="97" font-size="16">Identity at a glance</text></g>',
        f'<rect x="40" y="125" width="560" height="213" fill="{WHITE}" stroke="{LINE}"/>',
        f'<rect x="40" y="350" width="560" height="213" fill="{INK}"/>',
        f'<rect x="612" y="125" width="308" height="438" fill="{TINT}"/>',
    ]
    for y, colors in ((203, (INK, INK)), (428, (YELLOW, PAPER))):
        top += [
            f'<g transform="translate(85 {y}) scale(1.42)">',
            mark(0, 0, 1, colors[0]),
            wordmark("WE DRONE HOMES.", 66, 13.5, colors[1]),
            '</g>',
        ]
    top += [
        mark(714, 210, 2.2, INK),
        wordmark("WE DRONE", 766, 351, INK, center=True),
        wordmark("HOMES.", 766, 386, INK, center=True),
        f'<g font-family="Courier New, monospace" font-size="13" font-weight="700" letter-spacing="1">'
        f'<text x="63" y="156" fill="{MUTED}">HORIZONTAL / PRIMARY</text>'
        f'<text x="63" y="381" fill="{YELLOW}">HORIZONTAL / REVERSE</text>'
        f'<text x="635" y="156" fill="{MUTED}">STACKED / PRIMARY</text></g>',
        f'<text x="41" y="610" fill="{INK}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">'
        'Killer views. Unfortunate name.</text>',
        f'<text x="41" y="638" fill="{MUTED}" font-family="Courier New, monospace" font-size="13" font-weight="700">'
        'A FICTIONAL REAL ESTATE DRONE PHOTOGRAPHY AGENCY</text>',
    ]
    svg(
        ROOT / "identity-sheet.svg", 960, 666, "We Drone Homes identity specimen", "\n".join(top),
        "The wordmark and four-rotor mark appear in horizontal, reversed and stacked arrangements.",
    )
    sheet = [
        f'<rect width="960" height="713" fill="{PAPER}"/>',
        f'<rect x="0" y="0" width="960" height="11" fill="{YELLOW}"/>',
        f'<text x="40" y="71" fill="{INK}" font-size="36" font-family="Arial, Helvetica, sans-serif" font-weight="700">'
        'Flight operations glyphs</text>',
        f'<text x="40" y="100" fill="{MUTED}" font-size="16" font-family="Arial, Helvetica, sans-serif">'
        '24-unit artwork / 20 symbols / paired with text labels</text>',
    ]
    for i, (name, (label, art)) in enumerate(GLYPHS.items()):
        col, row = i % 5, i // 5
        x, y = 40 + col * 177, 125 + row * 140
        sheet += [
            f'<rect x="{x}" y="{y}" width="172" height="135" fill="{WHITE}" stroke="{LINE}"/>',
            f'<g transform="translate({x+62} {y+20}) scale(2)">{glyph_group(art, INK)}</g>',
            f'<text x="{x+86}" y="{y+96}" text-anchor="middle" font-size="13" '
            f'font-family="Arial, Helvetica, sans-serif" font-weight="bold" fill="{INK}">{escape(label)}</text>',
            f'<text x="{x+86}" y="{y+116}" text-anchor="middle" font-size="11" '
            f'font-family="Courier New, monospace" fill="{MUTED}">{name}</text>',
        ]
    svg(
        ROOT / "glyph-sheet.svg", 960, 713, "Flight operations glyphs", "\n".join(sheet),
        "The complete twenty-icon set with visible names. See USAGE.md for meanings and labels.",
    )

if __name__ == "__main__":
    lockups()
    glyphs()
    motifs()
    specimens()
