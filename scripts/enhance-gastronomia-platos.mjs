import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');
const backupDir = path.join(imagesDir, '_originals-gastronomia-platos');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const files = fs
  .readdirSync(imagesDir)
  .filter((name) => /^gastronomia-plato-\d{2}\.png$/i.test(name))
  .sort();

for (const file of files) {
  const input = path.join(imagesDir, file);
  const backup = path.join(backupDir, file);
  const output = path.join(imagesDir, file.replace(/\.png$/i, '.webp'));

  if (!fs.existsSync(backup)) {
    fs.copyFileSync(input, backup);
  }

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

console.log(`Done. Originals backed up in ${path.relative(process.cwd(), backupDir)}`);
