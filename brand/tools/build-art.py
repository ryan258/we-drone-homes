#!/usr/bin/env python3
"""Build editable SVG layouts from the supplied artwork. Requires Python 3 and ImageMagick."""
from base64 import b64encode
from functools import lru_cache
from html import escape
from pathlib import Path
from subprocess import check_output
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
PAPER, WHITE, INK, MUTED, LINE, SIGNAL, TINT = '#f5f3eb','#fffef8','#192d27','#59655a','#d3d7c9','#e8ee79','#e9ecdf'
NS = 'http://www.w3.org/2000/svg'


def rect(x, y, w, h, fill):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"/>'


def circle(x, y, r, fill):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>'


def path(d, stroke, weight=2, extras=''):
    return f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{weight}" {extras}/>'


def text(x, y, s, size, fill=INK, weight=400, font='Arial, Helvetica, sans-serif', tracking=0):
    return (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{font}" font-size="{size}" '
            f'font-weight="{weight}" letter-spacing="{tracking}">{escape(s)}</text>')


def label(x, y, s, size=20, fill=INK):
    return text(x, y, s, size, fill, 700, 'Courier New, monospace', 1.1)


def lines(x, y, items, size, step, fill=INK, weight=400, tracking=0):
    return ''.join(text(x, y+i*step, item, size, fill, weight, tracking=tracking) for i,item in enumerate(items))


@lru_cache(maxsize=None)
def image_data(file):
    source = ROOT / 'art' / file
    jpeg = check_output(['magick', str(source), '-strip', '-sampling-factor', '4:4:4', '-quality', '89', 'jpeg:-'])
    return 'data:image/jpeg;base64,' + b64encode(jpeg).decode('ascii')


def photo(x, y, w, h, name, align='xMidYMid'):
    return (f'<image x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="{align} slice" '
            f'xlink:href="{image_data(name)}"/>')


def logo(x, y, w, variant='logo-horizontal'):
    # Place the canonical outlined logo inline so exports are self-contained.
    asset = ET.parse(ROOT / 'identity' / (variant + '.svg')).getroot()
    _, _, vw, vh = map(float, asset.attrib['viewBox'].split())
    data = (ROOT / 'identity' / (variant + '.svg')).read_text().split('>', 1)[1].rsplit('</svg>', 1)[0]
    return f'<svg x="{x}" y="{y}" width="{w}" height="{w*vh/vw:.3f}" viewBox="0 0 {vw} {vh}">{data}</svg>'


def corners(x, y, w, h, tone, k=26):
    return path(f'M{x+k} {y}H{x}v{k} M{x+w-k} {y}h{k}v{k} M{x} {y+h-k}v{k}h{k} M{x+w-k} {y+h}h{k}v-{k}',tone,3)


def rule(x, y, w, color=LINE):
    return rect(x,y,w,1,color)


def save(where, name, w, h, title, description, body):
    svg = (f'<svg xmlns="{NS}" xmlns:xlink="http://www.w3.org/1999/xlink" '
           f'width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc">\n'
           f'<title id="title">{escape(title)}</title><desc id="desc">{escape(description)}</desc>\n'
           f'{body}\n</svg>\n')
    (ROOT / where / (name + '.svg')).write_text(svg,encoding='utf-8')


def ramp(x, y, colors=(PAPER,TINT,INK,SIGNAL)):
    return ''.join(rect(x+i*111,y,101,63,c) for i,c in enumerate(colors))


def route(x, y):
    return (rect(x,y,456,169,INK)
            + path(f'M{x+53} {y+115}h92q38 0 38-38t38-38h60q30 0 30 30t31 30h60',SIGNAL,3,'stroke-dasharray="7 5"')
            + circle(x+53,y+115,7,SIGNAL) + circle(x+251,y+39,7,SIGNAL) + circle(x+402,y+99,7,SIGNAL)
            + label(x+37,y+144,'01',15,PAPER) + label(x+239,y+71,'02',15,PAPER) + label(x+379,y+133,'03',15,PAPER))


def board(number, name, headline, descriptor, image, guidance, flavor):
    left, right = 58, 970
    common = (rect(0,0,1500,1000,PAPER) + rect(0,0,1500,76,INK)
              + label(left,48,'WE DRONE HOMES / ART DIRECTION',21,PAPER)
              + label(1240,48,'STUDY 0'+str(number)+' / 03',21,SIGNAL)
              + text(left,167,headline,75,INK,700,tracking=-3)
              + label(left,216,descriptor,20,MUTED))
    if flavor == 'exterior':
        hero = photo(left,262,858,562,image) + corners(left+18,280,822,526,PAPER)
        detail = ramp(right,262) + label(right,362,'PAPER  /  TINT  /  INK  /  SIGNAL',17,MUTED)
        detail += rect(right,406,456,199,TINT) + label(right+25,450,'FIELD NOTE 01',18,INK)
        detail += lines(right+25,506,['An ordinary house.','An excellent angle.'],38,46,INK,700,-1.1)
        detail += rule(right,656,456) + label(right,693,'COMPOSITION',18,MUTED)
    elif flavor == 'desk':
        hero = photo(left,262,858,562,image)
        detail = route(right,262) + label(right,473,'ILLUSTRATED ROUTE / NOT TELEMETRY',17,MUTED)
        detail += ramp(right,517,(WHITE,LINE,INK,SIGNAL)) + rule(right,656,456) + label(right,693,'INSTRUMENTATION',18,MUTED)
    else:
        hero = photo(left,262,575,562,image,'xMidYMid')
        hero += rect(649,262,267,562,INK) + label(675,306,'ROOM TONE',18,SIGNAL)
        hero += rect(675,333,213,77,'#b78956')+rect(675,420,213,77,'#e4c8a1')+rect(675,507,213,77,'#4b5035')
        hero += corners(688,632,181,105,PAPER,18) + label(696,698,'ONE DETAIL',17,PAPER)
        detail = label(right,302,'SAMPLE VOICE',18,MUTED)
        detail += lines(right,382,['The chandelier','declined comment.'],48,56,INK,700,-1.5)
        detail += rule(right,498,456) + label(right,550,'GLOW / STILLNESS / TENSION',18,MUTED)
        detail += ramp(right,574,(PAPER,'#e4c8a1','#4b5035',INK)) + rule(right,656,456) + label(right,693,'STORY BEAT',18,MUTED)
    detail += lines(right,735,guidance,27,35,INK)
    footer = rule(left,875,1384) + label(left,928,'FLIGHT PLAN FOR A HOUSE  /  MOOD BOARD',20,MUTED)
    footer += label(1090,928,'FICTIONAL AGENCY / WDH',19,MUTED)
    save('moodboards',name,1500,1000,headline,
         descriptor + '. ' + ' '.join(guidance) + ' A We Drone Homes art-direction board.',common+hero+detail+footer)


def main():
    board(1,'01-architectural-calm','Architectural calm','EXTERIOR  /  HERO IMAGERY  /  FIRST IMPRESSION',
          'ranch-exterior.webp',['Lead with the house.','Keep the horizon steady.','Let the light do the work.'],'exterior')
    board(2,'02-flight-desk','Flight desk','DESK STUDIES  /  DIAGRAMS  /  MISSION REPORTS',
          'flight-desk.webp',['Number every stage.','Use one route and one accent.','Give the diagram a text key.'],'desk')
    board(3,'03-domestic-suspense','Domestic suspense','INTERIOR  /  SPECIFIC DETAILS  /  ONE DRY JOKE',
          'chandelier-interior.webp',['Pick an everyday obstacle.','Frame it like architecture.','Let the room finish the joke.'],'interior')

    share = (rect(0,0,1200,630,INK) + photo(547,0,653,630,'ranch-exterior.webp','xMaxYMid')
             + corners(574,29,596,572,PAPER)
             + rect(574,540,244,38,INK) + label(589,565,'FICTIONAL PROPERTY',17,PAPER)
             + rect(0,0,547,630,PAPER)
             + logo(43,36,217) + rule(48,135,445)
             + label(48,185,'PROPERTY PHOTOGRAPHY PARODY',17,MUTED)
             + lines(48,286,['Killer views.','Unfortunate'],72,77,INK,700,-2.7)
             + rect(46,433,207,20,SIGNAL) + text(48,449,'name.',72,INK,700,tracking=-2.7)
             + rule(48,489,445) + text(48,531,'A fictional real estate drone agency',26,INK,700)
             + label(48,579,'EXPLORE THE FICTIONAL PORTFOLIO',17,INK))
    save('campaign','share-card',1200,630,'We Drone Homes — Killer views. Unfortunate name.',
         'A fictional real estate drone agency. Low aerial view of a suburban ranch in warm afternoon light.',share)

    story = (rect(0,0,1080,1920,INK) + logo(86,232,342,'logo-horizontal-reverse')
             + label(86,375,'FICTIONAL REAL ESTATE DRONE AGENCY',23,SIGNAL)
             + photo(84,425,912,865,'chandelier-interior.webp','xMidYMid') + corners(110,453,860,809,PAPER,34)
             + label(86,1362,'ROOM REPORT  /  DINING',27,SIGNAL)
             + lines(86,1462,['The chandelier','declined comment.'],88,94,PAPER,700,-3)
             + rule(86,1607,908,'#68796c') + label(86,1666,'EXPLORE THE FICTIONAL PORTFOLIO',25,PAPER))
    save('campaign','chandelier-story',1080,1920,'The chandelier declined comment.',
         'Portrait story art for We Drone Homes, a fictional real estate drone agency. A crystal chandelier hangs above a dining table.',story)

    field = (rect(0,0,1080,1080,PAPER) + logo(54,39,231) + label(615,90,'WDH / FIELD REPORT 01',23,MUTED)
             + photo(54,147,972,510,'mcmansion-still.webp','xMidYMid') + corners(77,172,926,461,PAPER)
             + rect(77,583,306,51,INK) + label(95,616,'FICTIONAL PROPERTY',21,PAPER)
             + label(54,721,'PROPERTY IN FOCUS',20,MUTED)
             + text(54,797,'The McMansion Monolith',71,INK,700,tracking=-3)
             + text(54,849,'An open house with a flight plan.',36,INK)
             + rule(54,904,972) + text(54,955,'A fictional real estate drone agency',29,INK,700)
             + label(54,1009,'FOLLOW THE SIMULATED FLIGHT PATH',23,MUTED))
    save('campaign','field-report',1080,1080,'The McMansion Monolith — field report',
         'An open house with a flight plan. We Drone Homes is a fictional real estate drone agency.',field)

    # US Letter viewBox. Fonts scale with the physical page; all copy is live text.
    print_layout = (rect(0,0,850,1100,PAPER) + rect(0,0,850,12,INK) + logo(52,53,237)
                    + label(566,105,'PROJECT ONE-SHEET',17,MUTED) + rule(56,135,738)
                    + lines(56,221,['Killer views.','Unfortunate name.'],67,71,INK,700,-2.6)
                    + text(57,339,'A fictional real estate drone agency',28,INK,700)
                    + photo(56,372,738,334,'ranch-exterior.webp','xMidYMid') + corners(70,386,710,305,PAPER,18)
                    + label(56,744,'THE EXPERIENCE',18,MUTED)
                    + lines(56,785,['Tour four invented properties and replay illustrated','flight paths. Meet the pilots, or build an imaginary','booking for a shoot that will never happen.'],28,36,INK)
                    + rule(56,907,738) + label(56,955,'PROPERTY HUMOR  /  INTERACTIVE COMEDY',18,MUTED)
                    + text(56,1006,'We Drone Homes. No real listings or bookings.',23,INK,700))
    save('campaign','one-sheet',850,1100,'We Drone Homes — project one-sheet',
         'A fictional real estate drone agency and interactive comedy project. No real listings or bookings.',print_layout)
    sheet = ROOT / 'campaign' / 'one-sheet.svg'
    sheet.write_text(sheet.read_text().replace('width="850" height="1100"', 'width="8.5in" height="11in"',1))


if __name__ == '__main__':
    main()
