import { execFileSync } from 'child_process';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join } from 'path';
import ffmpeg from 'ffmpeg-static';

const dir = 'public/videos';
const files = readdirSync(dir).filter((file) => file.toLowerCase().endsWith('.mov'));

if (files.length === 0) {
  console.log('No .mov files found in public/videos');
  process.exit(0);
}

for (const file of files) {
  const input = join(dir, file);
  const output = join(dir, file.replace(/\.mov$/i, '.mp4'));
  const before = statSync(input).size;

  console.log(`Compressing ${file} (${(before / 1024 / 1024).toFixed(1)} MB)...`);

  execFileSync(
    ffmpeg,
    [
      '-y',
      '-i',
      input,
      '-c:v',
      'libx264',
      '-crf',
      '28',
      '-preset',
      'medium',
      '-movflags',
      '+faststart',
      '-an',
      '-vf',
      'scale=min(1280\\,iw):-2',
      output,
    ],
    { stdio: 'inherit' },
  );

  const after = statSync(output).size;
  console.log(
    ` -> ${output} ${(after / 1024 / 1024).toFixed(1)} MB (${Math.round((1 - after / before) * 100)}% smaller)`,
  );
  unlinkSync(input);
}

console.log('Done.');
