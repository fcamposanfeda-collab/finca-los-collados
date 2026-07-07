import sharp from 'sharp';
import { isLogoBackground } from './logo-background.mjs';

const source = 'public/images/logo-source.jpg';
const logoOut = 'public/images/logo-finca-los-collados.png';

async function toTransparentPng(input, output) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (isLogoBackground(data[i], data[i + 1], data[i + 2])) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  return info;
}

const logoInfo = await toTransparentPng(source, logoOut);
const emblemRegionHeight = Math.round(logoInfo.height * 0.48);

const { data, info } = await sharp(logoOut)
  .extract({ left: 0, top: 0, width: logoInfo.width, height: emblemRegionHeight })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  if (isLogoBackground(data[i], data[i + 1], data[i + 2])) {
    data[i + 3] = 0;
  }
}

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const emblem = sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
}).trim();

await emblem
  .clone()
  .resize(32, 32, { fit: 'contain', background: transparent })
  .png()
  .toFile('public/favicon-32.png');

await emblem
  .clone()
  .resize(192, 192, { fit: 'contain', background: transparent })
  .png()
  .toFile('public/favicon-192.png');

await emblem
  .clone()
  .resize(180, 180, { fit: 'contain', background: transparent })
  .png()
  .toFile('public/apple-touch-icon.png');

await emblem
  .clone()
  .resize({ height: 140, fit: 'inside', background: transparent })
  .png()
  .toFile('public/images/logo-emblem.png');

const emblemMeta = await emblem.metadata();
console.log(`Logo ${logoInfo.width}x${logoInfo.height}, emblem ${emblemMeta.width}x${emblemMeta.height}`);
