import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { localeMeta, locales, type Locale } from './config';
import { legalPageKeys, pagePathname, parsePathname, type PageKey } from './routes';

const siteUrl = 'https://loscolladosdesanmiguel.com';

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith('http')) return pathname;
  return new URL(pathname, `${siteUrl}/`).href;
}

export function hreflangLinks(pageKey: PageKey): { lang: string; url: string }[] {
  const links = locales.map((locale) => ({
    lang: localeMeta[locale].htmlLang,
    url: absoluteUrl(pagePathname(pageKey, locale)),
  }));

  links.push({
    lang: 'x-default',
    url: absoluteUrl(pagePathname(pageKey, 'es')),
  });

  return links;
}

export function pageKeyFromUrl(url: string): { locale: Locale; pageKey: PageKey } {
  const parsed = new URL(url);
  return parsePathname(parsed.pathname);
}

const pageAstroFiles: Record<PageKey, string> = {
  home: 'src/pages/index.astro',
  alojamiento: 'src/pages/alojamiento.astro',
  'la-finca': 'src/pages/la-finca.astro',
  'la-calerilla': 'src/pages/la-calerilla.astro',
  'caza-ojeo-perdiz': 'src/pages/la-calerilla/ojeo-de-perdiz.astro',
  'caza-en-mano': 'src/pages/la-calerilla/caza-en-mano.astro',
  'caza-estancia': 'src/pages/la-calerilla/caza-y-alojamiento.astro',
  'caza-como-llegar': 'src/pages/la-calerilla/como-llegar.astro',
  gastronomia: 'src/pages/gastronomia.astro',
  experiencias: 'src/pages/experiencias.astro',
  entorno: 'src/pages/entorno.astro',
  empresas: 'src/pages/empresas.astro',
  eventos: 'src/pages/eventos.astro',
  packs: 'src/pages/packs.astro',
  'reservas-online': 'src/pages/reservas-online.astro',
  contacto: 'src/pages/contacto.astro',
  'solicitud-enviada': 'src/pages/solicitud-enviada.astro',
  'politica-de-privacidad': 'src/pages/politica-de-privacidad.astro',
  'aviso-legal': 'src/pages/aviso-legal.astro',
  'politica-de-cookies': 'src/pages/politica-de-cookies.astro',
  'politica-de-reservas': 'src/pages/politica-de-reservas.astro',
  '404': 'src/pages/404.astro',
};

const messageFileByPage: Partial<Record<PageKey, string>> = {
  home: 'home.json',
  alojamiento: 'alojamiento.json',
  'la-finca': 'la-finca.json',
  'la-calerilla': 'la-calerilla.json',
  'caza-ojeo-perdiz': 'caza-ojeo-perdiz.json',
  'caza-en-mano': 'caza-en-mano.json',
  'caza-estancia': 'caza-estancia.json',
  'caza-como-llegar': 'caza-como-llegar.json',
  gastronomia: 'gastronomia.json',
  experiencias: 'experiencias.json',
  entorno: 'entorno.json',
  empresas: 'empresas.json',
  eventos: 'eventos.json',
  packs: 'packs.json',
  'reservas-online': 'booking.json',
  contacto: 'contacto.json',
  'solicitud-enviada': 'solicitud-enviada.json',
  '404': 'not-found.json',
};

const lastmodCache = new Map<PageKey, string | undefined>();

function sourceFilesForPage(pageKey: PageKey): string[] {
  const files = [pageAstroFiles[pageKey]];
  if ((legalPageKeys as readonly string[]).includes(pageKey)) {
    files.push(
      'src/i18n/messages/es/legal.json',
      'src/i18n/messages/en/legal.json',
      'src/i18n/messages/fr/legal.json',
    );
  } else {
    const messageFile = messageFileByPage[pageKey];
    if (messageFile) {
      files.push(
        `src/i18n/messages/es/${messageFile}`,
        `src/i18n/messages/en/${messageFile}`,
        `src/i18n/messages/fr/${messageFile}`,
      );
    }
  }
  return files.filter((file) => existsSync(file));
}

/** Last commit date for the files that make up a page. Omit if git history is unavailable. */
export function lastmodForPage(pageKey: PageKey): string | undefined {
  if (lastmodCache.has(pageKey)) return lastmodCache.get(pageKey);
  const files = sourceFilesForPage(pageKey);
  if (!files.length) {
    lastmodCache.set(pageKey, undefined);
    return undefined;
  }
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const lastmod = out || undefined;
    lastmodCache.set(pageKey, lastmod);
    return lastmod;
  } catch {
    lastmodCache.set(pageKey, undefined);
    return undefined;
  }
}
