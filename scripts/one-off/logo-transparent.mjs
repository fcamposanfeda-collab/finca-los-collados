import sharp from 'sharp';
import { isLogoBackground } from './logo-background.mjs';

const input = 'public/images/logo-finca-los-collados.jpg';
const output = 'public/images/logo-finca-los-collados.png';

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

console.log(`Saved ${output} (${info.width}x${info.height})`);
