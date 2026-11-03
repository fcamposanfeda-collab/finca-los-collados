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
  const imagesIndex = clean.lastIndexOf('/images/');
  if (imagesIndex >= 0) return clean.slice(imagesIndex);
  const videosIndex = clean.lastIndexOf('/videos/');
  if (videosIndex >= 0) return clean.slice(videosIndex);
  return clean;
}

export function posterSrc(src?: string): string | undefined {
  if (!src) return undefined;
  const variant = getImageVariant(src);
  if (!variant) return src;
  const webp768 = variant.webp.find((item) => item.w === 768) ?? variant.webp.at(-1);
  return webp768 ? withBase(webp768.src) : withBase(variant.fallback);
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

export function getHuntingHeroLoop(): { desktop?: string } {
  const desktopPath = join(root, 'public', 'videos', 'opt', 'calerilla-hero-loop-848.mp4');
  return {
    desktop: existsSync(desktopPath) ? withBase('/videos/opt/calerilla-hero-loop-848.mp4') : undefined,
  };
}

export function getHuntingJornada(): { src?: string } {
  const srcPath = join(root, 'public', 'videos', 'opt', 'calerilla-jornada.mp4');
  return {
    src: existsSync(srcPath) ? withBase('/videos/opt/calerilla-jornada.mp4') : undefined,
  };
}
