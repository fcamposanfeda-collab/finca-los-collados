import fs from 'fs';
import sharp from 'sharp';
import { isLogoBackground } from './logo-background.mjs';

const source =
  'C:/Users/Fernando/.cursor/projects/c-Users-Fernando-OneDrive-DESARROLLO-Los-Collados-San-Miguel/assets/c__Users_Fernando_AppData_Roaming_Cursor_User_workspaceStorage_08eb428f124f10e2651acf9e400e5694_images_logo-finca-cabecera-febd0560-eb96-4b9f-b8d0-d5893f493679.png';
const localSource = 'public/images/logo-cabecera-source.png';
const output = 'public/images/logo-cabecera.png';

fs.copyFileSync(source, localSource);

const { data, info } = await sharp(localSource).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

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
