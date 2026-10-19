import { existsSync } from 'node:fs';
import { join } from 'node:path';
import manifest from './image-manifest.json';
import { withBase } from '../utils/paths';

const root = process.cwd();

export type ImageVariant = {
  width: number;
  height: number;
  fallback: string;
  avif: { w: number; src: string }[];
  webp: { w: number; src: string }[];
};

function slugName(file: string): string {
  return file
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function publicImageKey(src: string): string {
  const clean = src.replace(/[?#].*$/, '');
  const index = clean.lastIndexOf('/images/');
  return index >= 0 ? clean.slice(index) : clean;
}

export function getImageVariant(src: string): ImageVariant | null {
  const key = publicImageKey(src);
  const entry = (manifest as Record<string, ImageVariant>)[key];
  return entry ?? null;
}

export function srcset(items: { w: number; src: string }[]): string {
  return items.map((item) => `${withBase(item.src)} ${item.w}w`).join(', ');
}

export function videoSlug(src: string): string {
  const file = decodeURIComponent(src.split('/').pop() ?? '');
  return slugName(file);
}

export function getOptimizedVideo(src: string): { src: string; poster?: string } {
  const id = videoSlug(src);
  const optSrc = join(root, 'public', 'videos', 'opt', `${id}.mp4`);
  const optPoster = join(root, 'public', 'videos', 'opt', `${id}.jpg`);
  if (existsSync(optSrc)) {
    return {
      src: withBase(`/videos/opt/${id}.mp4`),
      poster: existsSync(optPoster) ? withBase(`/videos/opt/${id}.jpg`) : undefined,
    };
  }
  return { src };
}
