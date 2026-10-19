import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const widths = [480, 768, 1100, 1600];

const imageFiles = [
  'hero-entrada-atardecer.png',
  'hero-casa-panorama.png',
  'calerilla-hero.jpg',
  'bungalow-interior.jpg',
  'gastronomia.jpg',
  'campo-montiel.png',
  'empresa-teambuilding.jpg',
  'evento-celebracion.jpg',
  'evento-jardines.jpg',
  'entorno-hero.jpg',
  'porche-exterior.jpg',
  'bungalow-detalle.jpg',
  'calerilla-temporada.jpg',
  'calerilla-perdiz.png',
  'finca-paisaje.jpg',
  'salon-biblioteca.jpg',
  'hero-finca.jpg',
  'IMG_0031.JPG',
  'IMG_0035.JPG',
  'rodaje-finca.jpg',
  'venue-fin-semana-porche.png',
  'empresas-rodaje-sesion.png',
  'eventos-exterior-atardecer.png',
  'azurea-catering-1.jpg',
  'azurea-catering-2.jpg',
  'villanueva-infantes.jpg',
  'bicicleta.jpg',
  'experiencia-ganaderia.jpg',
  'experiencia-cata-vinos.jpg',
  'villamanrique-iglesia.jpg',
  'torre-juan-abad.jpg',
  'castillo-montizon.jpg',
  'lagunas-ruidera2.jpg',
  'pack-familiar.jpg',
  'finca-bungalow-exterior.png',
  'gastronomia-tabla-quesos.png',
  'empresas-teambuilding-campo.png',
  'eventos-celebracion-campo.png',
  'bungalow-exterior.png',
  'empresas-rodaje.png',
  'evento-terraza-atardecer.png',
  'pet-friendly.jpg',
  'gastronomia-mesa-detalle.png',
  'gastronomia-postre.png',
  'logo-cabecera.png',
  'logo-finca-los-collados.png',
];

const videoFiles = [
  'IMG_0728.mp4',
  'IMG_0736.mp4',
  'WhatsApp Video 2026-07-08 at 11.36.47.mp4',
  'IMG_0717.mp4',
  'IMG_0658.mp4',
  'la-finca-culturas.mp4',
  'WhatsApp Video 2026-07-07 at 13.35.28.mp4',
];

const heroNames = new Set(['hero-entrada-atardecer.png', 'calerilla-hero.jpg', 'bungalow-interior.jpg', 'empresa-teambuilding.jpg']);

function slugName(file) {
  return basename(file, extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function optimizeImages() {
  const manifest = {};
  for (const file of imageFiles) {
    const input = join(root, 'public', 'images', file);
    if (!existsSync(input)) {
      console.warn(`skip missing image ${file}`);
      continue;
    }
    const meta = await sharp(input).metadata();
    const origW = meta.width || 1600;
    const origH = meta.height || 900;
    const isHero = heroNames.has(file);
    const isCalerilla = file === 'calerilla-hero.jpg';
    const avifQuality = isCalerilla ? 38 : isHero ? 45 : 48;
    const webpQuality = isCalerilla ? 58 : isHero ? 64 : 68;
    const usedWidths = widths.filter((width) => width <= origW || width === 480);
    const id = slugName(file);
    const outDir = join(root, 'public', 'images', 'opt', id);
    await mkdir(outDir, { recursive: true });

    const sources = { avif: [], webp: [] };
    for (const width of usedWidths) {
      const resized = sharp(input).resize({ width, withoutEnlargement: true });
      const avifName = `${width}.avif`;
      const webpName = `${width}.webp`;
      await resized.clone().avif({ quality: avifQuality }).toFile(join(outDir, avifName));
      await resized.clone().webp({ quality: webpQuality }).toFile(join(outDir, webpName));
      sources.avif.push({ w: width, src: `/images/opt/${id}/${avifName}` });
      sources.webp.push({ w: width, src: `/images/opt/${id}/${webpName}` });
    }

    const fallbackWidth = Math.min(1100, origW);
    const fallbackName = `${fallbackWidth}.jpg`;
    await sharp(input)
      .resize({ width: fallbackWidth, withoutEnlargement: true })
      .jpeg({ quality: isCalerilla ? 62 : 72, mozjpeg: true })
      .toFile(join(outDir, fallbackName));

    const key = `/images/${file}`;
    manifest[key] = {
      width: origW,
      height: origH,
      fallback: `/images/opt/${id}/${fallbackName}`,
      avif: sources.avif,
      webp: sources.webp,
    };
    console.log(`image ${file} → ${id} (${origW}×${origH})`);
  }

  await writeFile(join(root, 'src', 'data', 'image-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

function optimizeVideos() {
  if (!ffmpeg) {
    console.warn('ffmpeg-static not found; skipping videos');
    return;
  }
  const outDir = join(root, 'public', 'videos', 'opt');
  mkdirSyncSafe(outDir);

  for (const file of videoFiles) {
    const input = join(root, 'public', 'videos', file);
    if (!existsSync(input)) {
      console.warn(`skip missing video ${file}`);
      continue;
    }
    const id = slugName(file);
    const output = join(outDir, `${id}.mp4`);
    const poster = join(outDir, `${id}.jpg`);
    const before = statSync(input).size;
    console.log(`video ${file} (${(before / 1024 / 1024).toFixed(1)} MB)`);
    execFileSync(
      ffmpeg,
      [
        '-y',
        '-i',
        input,
        '-an',
        '-c:v',
        'libx264',
        '-pix_fmt',
        'yuv420p',
        '-crf',
        '28',
        '-preset',
        'medium',
        '-r',
        '24',
        '-movflags',
        '+faststart',
        '-vf',
        'scale=min(720\\,iw):-2',
        output,
      ],
      { stdio: 'inherit' },
    );
    execFileSync(
      ffmpeg,
      ['-y', '-i', input, '-ss', '00:00:01', '-frames:v', '1', '-vf', 'scale=960:-2', poster],
      { stdio: 'inherit' },
    );
    const after = existsSync(output) ? statSync(output).size : 0;
    console.log(` → opt/${id}.mp4 ${(after / 1024 / 1024).toFixed(1)} MB`);
  }
}

function mkdirSyncSafe(dir) {
  mkdirSync(dir, { recursive: true });
}

await mkdir(join(root, 'public', 'images', 'opt'), { recursive: true });
await mkdir(join(root, 'public', 'videos', 'opt'), { recursive: true });
await optimizeImages();
optimizeVideos();
console.log('optimize-media done');
