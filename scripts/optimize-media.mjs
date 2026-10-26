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
  'calerilla-hero-loop.jpg',
  'calerilla-jornada-poster.jpg',
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

/** Defaults keep other clips usable; empresas (IMG_0717) is long and below the fold. */
const videoProfile = {
  default: { width: 720, crf: 28 },
  'IMG_0717.mp4': { width: 540, crf: 32, duration: 18 },
};

const heroNames = new Set([
  'hero-entrada-atardecer.png',
  'hero-casa-panorama.png',
  'calerilla-hero.jpg',
  'calerilla-hero-loop.jpg',
  'bungalow-interior.jpg',
  'gastronomia.jpg',
  'campo-montiel.png',
  'empresa-teambuilding.jpg',
  'evento-celebracion.jpg',
  'evento-jardines.jpg',
  'entorno-hero.jpg',
  'porche-exterior.jpg',
  'bungalow-detalle.jpg',
  'hero-finca.jpg',
]);

const logoNames = new Set(['logo-cabecera.png', 'logo-finca-los-collados.png']);

/** Same warm grade for every photograph; logos stay untouched. Crop is CSS by block type. */
function applyLook(pipeline, skip) {
  if (skip) return pipeline;
  return pipeline.modulate({ brightness: 1.015, saturation: 0.93 });
}

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
    const isLogo = logoNames.has(file);
    const isCalerilla = file === 'calerilla-hero.jpg';
    const avifQuality = isCalerilla ? 38 : isHero ? 45 : 48;
    const webpQuality = isCalerilla ? 58 : isHero ? 64 : 68;
    const usedWidths = widths.filter((width) => width <= origW || width === 480);
    const id = slugName(file);
    const outDir = join(root, 'public', 'images', 'opt', id);
    await mkdir(outDir, { recursive: true });

    const sources = { avif: [], webp: [] };
    for (const width of usedWidths) {
      const resized = applyLook(
        sharp(input).resize({ width, withoutEnlargement: true }),
        isLogo,
      );
      const avifName = `${width}.avif`;
      const webpName = `${width}.webp`;
      await resized.clone().avif({ quality: avifQuality }).toFile(join(outDir, avifName));
      await resized.clone().webp({ quality: webpQuality }).toFile(join(outDir, webpName));
      sources.avif.push({ w: width, src: `/images/opt/${id}/${avifName}` });
      sources.webp.push({ w: width, src: `/images/opt/${id}/${webpName}` });
    }

    const fallbackWidth = Math.min(1100, origW);
    const fallbackName = `${fallbackWidth}.jpg`;
    await applyLook(
      sharp(input).resize({ width: fallbackWidth, withoutEnlargement: true }),
      isLogo,
    )
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
    const profile = videoProfile[file] ?? videoProfile.default;
    console.log(`video ${file} (${(before / 1024 / 1024).toFixed(1)} MB)`);
    const args = ['-y', '-i', input];
    if (profile.duration) args.push('-t', String(profile.duration));
    args.push(
      '-an',
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-crf',
      String(profile.crf),
      '-preset',
      'medium',
      '-r',
      '24',
      '-movflags',
      '+faststart',
      '-vf',
      `scale=min(${profile.width}\\,iw):-2`,
      output,
    );
    execFileSync(ffmpeg, args, { stdio: 'inherit' });
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

function runFfmpeg(args) {
  if (!ffmpeg) throw new Error('ffmpeg-static not found');
  execFileSync(ffmpeg, args, { stdio: 'inherit' });
}

/**
 * Native 848×480 sources: do not upscale to 1280.
 * Loop clips from Fase 0 frame table (v2-009, v1-008, v2-010, v2-014).
 */
function encodeHuntingVideos() {
  if (!ffmpeg) {
    console.warn('ffmpeg-static not found; skipping hunting videos');
    return;
  }
  const v1 = join(root, 'public', 'videos', 'calerilla-caceria-1.mp4');
  const v2 = join(root, 'public', 'videos', 'calerilla-caceria-2.mp4');
  if (!existsSync(v1) || !existsSync(v2)) {
    console.warn('skip hunting videos: source mp4 missing');
    return;
  }

  const outDir = join(root, 'public', 'videos', 'opt');
  mkdirSyncSafe(outDir);
  mkdirSyncSafe(join(root, 'public', 'images'));

  const loop848 = join(outDir, 'calerilla-hero-loop-848.mp4');
  const loop720 = join(outDir, 'calerilla-hero-loop-720.mp4');
  const jornada = join(outDir, 'calerilla-jornada.mp4');
  const posterStill = join(root, 'public', 'images', 'calerilla-hero-loop.jpg');
  const jornadaStill = join(root, 'public', 'images', 'calerilla-jornada-poster.jpg');

  const trimPad = (label, start, duration) =>
    `[${label}:v]trim=start=${start}:duration=${duration},setpts=PTS-STARTPTS,scale=848:480:force_original_aspect_ratio=decrease,pad=848:480:(ow-iw)/2:(oh-ih)/2,fps=24,setsar=1[${label}o]`;

  console.log('hunting hero loop 848');
  runFfmpeg([
    '-y',
    '-i', v1,
    '-i', v1,
    '-i', v2,
    '-i', v2,
    '-filter_complex',
    `${trimPad('0', 23, 3.5)};${trimPad('1', 47, 3.2)};${trimPad('2', 36.8, 3.3)};${trimPad('3', 50.5, 3.3)};[0o][1o][2o][3o]concat=n=4:v=1:a=0,format=yuv420p[v]`,
    '-map', '[v]',
    '-an',
    '-c:v', 'libx264',
    '-crf', '28',
    '-preset', 'medium',
    '-movflags', '+faststart',
    loop848,
  ]);

  console.log('hunting hero loop 720');
  runFfmpeg([
    '-y',
    '-i', loop848,
    '-an',
    '-c:v', 'libx264',
    '-crf', '30',
    '-preset', 'medium',
    '-vf', 'scale=720:-2',
    '-movflags', '+faststart',
    loop720,
  ]);

  console.log('hunting hero poster');
  runFfmpeg(['-y', '-i', loop848, '-ss', '4.8', '-frames:v', '1', '-q:v', '2', posterStill]);

  console.log('hunting jornada 848');
  runFfmpeg([
    '-y',
    '-i', v1,
    '-i', v2,
    '-filter_complex',
    '[0:v]trim=start=22:duration=38,setpts=PTS-STARTPTS,scale=848:480:force_original_aspect_ratio=decrease,pad=848:480:(ow-iw)/2:(oh-ih)/2,fps=24,setsar=1[v0];' +
      '[1:v]trim=start=36:duration=22,setpts=PTS-STARTPTS,scale=848:480:force_original_aspect_ratio=decrease,pad=848:480:(ow-iw)/2:(oh-ih)/2,fps=24,setsar=1[v1];' +
      '[v0][v1]concat=n=2:v=1:a=0,format=yuv420p[v]',
    '-map', '[v]',
    '-an',
    '-c:v', 'libx264',
    '-crf', '28',
    '-preset', 'medium',
    '-movflags', '+faststart',
    jornada,
  ]);

  console.log('hunting jornada poster');
  runFfmpeg(['-y', '-i', jornada, '-ss', '2', '-frames:v', '1', '-q:v', '2', jornadaStill]);

  const loopSize = existsSync(loop848) ? statSync(loop848).size / (1024 * 1024) : 0;
  const loop720Size = existsSync(loop720) ? statSync(loop720).size / (1024 * 1024) : 0;
  const jornadaSize = existsSync(jornada) ? statSync(jornada).size / (1024 * 1024) : 0;
  console.log(
    `hunting sizes loop848=${loopSize.toFixed(2)}MB loop720=${loop720Size.toFixed(2)}MB jornada=${jornadaSize.toFixed(2)}MB`,
  );
}

await mkdir(join(root, 'public', 'images', 'opt'), { recursive: true });
await mkdir(join(root, 'public', 'videos', 'opt'), { recursive: true });

const huntingOnly = process.argv.includes('--hunting-only');
const imagesOnly = process.argv.includes('--images-only');

if (!imagesOnly) {
  encodeHuntingVideos();
}
if (!huntingOnly) {
  await optimizeImages();
  if (!imagesOnly) {
    optimizeVideos();
  }
}
console.log('optimize-media done');
