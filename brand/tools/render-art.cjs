// Optional export tool. Requires Node and sharp (no dependency on the live site).
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const assets = [
  'moodboards/01-architectural-calm',
  'moodboards/02-flight-desk',
  'moodboards/03-domestic-suspense',
  'campaign/share-card',
  'campaign/chandelier-story',
  'campaign/field-report',
  'campaign/one-sheet',
];

async function main() {
  // The physical-size SVG loads at 300 pixels per inch under librsvg.
  // Force a consistent print export across renderers and set the PPI metadata.
  await Promise.all(assets.map((file) => {
    const image = sharp(path.join(root, file + '.svg'), { density: 72 })
      .flatten({ background: '#f5f3eb' });
    if (file.endsWith('one-sheet')) image.resize(2550, 3300).withMetadata({ density: 300 });
    return image.png({ compressionLevel: 9 }).toFile(path.join(root, file + '.png'));
  }));
  await sharp(path.join(root, 'campaign/share-card.png')).jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(root, 'campaign/share-card.jpg'));
}
main().catch((error) => {
  process.stderr.write(error.message + '\n');
  process.exitCode = 1;
});
