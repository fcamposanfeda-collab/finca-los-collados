import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');
const backupDir = path.resolve('media-src/images/_originals-gastronomia-platos');

if (!fs.existsSync(backupDir)) {
  console.error(`Missing originals folder: ${path.relative(process.cwd(), backupDir)}`);
  process.exit(1);
}

const files = fs
  .readdirSync(backupDir)
  .filter((name) => /^gastronomia-plato-\d{2}\.png$/i.test(name))
  .sort();

if (files.length === 0) {
  console.error('No gastronomia-plato-NN.png files in originals folder');
  process.exit(1);
}

fs.mkdirSync(imagesDir, { recursive: true });

for (const file of files) {
  const input = path.join(backupDir, file);
  const output = path.join(imagesDir, file.replace(/\.png$/i, '.webp'));

  await sharp(input)
    .rotate()
    .modulate({
      brightness: 1.04,
      saturation: 1.12,
    })
    .linear(1.1, -(128 * 0.06))
    .sharpen({
      sigma: 0.75,
      m1: 0.5,
      m2: 0.35,
    })
    .webp({
      quality: 90,
      effort: 6,
    })
    .toFile(output);

  console.log(`enhanced ${file} -> ${path.basename(output)}`);
}

console.log(`Done. Sources read from ${path.relative(process.cwd(), backupDir)}`);
