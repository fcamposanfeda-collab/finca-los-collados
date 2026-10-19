import { defaultLocale, isLocale, locales, type Locale } from './config';
import { withBase } from '../utils/paths';

export const pageKeys = [
  'home',
  'alojamiento',
  'la-finca',
  'la-calerilla',
  'gastronomia',
  'experiencias',
  'entorno',
  'empresas',
  'eventos',
  'packs',
  'reservas-online',
  'contacto',
  'solicitud-enviada',
  'politica-de-privacidad',
  'aviso-legal',
  'politica-de-cookies',
  'politica-de-reservas',
  '404',
] as const;

export type PageKey = (typeof pageKeys)[number];

/** Slugs without leading slash or locale prefix. Home is an empty string. */
export const pageSlugs: Record<PageKey, Record<Locale, string>> = {
  home: { es: '', en: '', fr: '' },
  alojamiento: { es: 'alojamiento', en: 'accommodation', fr: 'hebergement' },
  'la-finca': { es: 'la-finca', en: 'the-estate', fr: 'le-domaine' },
  'la-calerilla': { es: 'la-calerilla', en: 'la-calerilla', fr: 'la-calerilla' },
  gastronomia: { es: 'gastronomia', en: 'dining', fr: 'gastronomie' },
  experiencias: { es: 'experiencias', en: 'experiences', fr: 'experiences' },
  entorno: { es: 'entorno', en: 'surroundings', fr: 'alentours' },
  empresas: { es: 'empresas', en: 'corporate', fr: 'entreprises' },
  eventos: { es: 'eventos', en: 'events', fr: 'evenements' },
  packs: { es: 'packs', en: 'packages', fr: 'formules' },
  'reservas-online': { es: 'reservas-online', en: 'book-online', fr: 'reserver-en-ligne' },
  contacto: { es: 'contacto', en: 'contact', fr: 'contact' },
  'solicitud-enviada': { es: 'solicitud-enviada', en: 'request-sent', fr: 'demande-envoyee' },
  'politica-de-privacidad': {
    es: 'politica-de-privacidad',
    en: 'privacy-policy',
    fr: 'politique-de-confidentialite',
  },
  'aviso-legal': { es: 'aviso-legal', en: 'legal-notice', fr: 'mentions-legales' },
  'politica-de-cookies': { es: 'politica-de-cookies', en: 'cookie-policy', fr: 'politique-de-cookies' },
  'politica-de-reservas': {
    es: 'politica-de-reservas',
    en: 'booking-policy',
    fr: 'conditions-de-reservation',
  },
  '404': { es: '404', en: '404', fr: '404' },
};

export const legalPageKeys = [
  'politica-de-privacidad',
  'aviso-legal',
  'politica-de-cookies',
  'politica-de-reservas',
] as const satisfies readonly PageKey[];

export type LegalPageKey = (typeof legalPageKeys)[number];

function withTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function localizePath(pageKey: PageKey, locale: Locale = defaultLocale): string {
  const slug = pageSlugs[pageKey][locale];
  if (locale === defaultLocale) {
    return withBase(withTrailingSlash(slug ? `/${slug}` : '/'));
  }
  return withBase(withTrailingSlash(slug ? `/${locale}/${slug}` : `/${locale}`));
}

export function pagePathname(pageKey: PageKey, locale: Locale = defaultLocale): string {
  const slug = pageSlugs[pageKey][locale];
  if (locale === defaultLocale) {
    return withTrailingSlash(slug ? `/${slug}` : '/');
  }
  return withTrailingSlash(slug ? `/${locale}/${slug}` : `/${locale}`);
}

export function parsePathname(pathname: string): { locale: Locale; pageKey: PageKey } {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);

  let locale: Locale = defaultLocale;
  let rest = segments;

  if (segments[0] && isLocale(segments[0]) && segments[0] !== defaultLocale) {
    locale = segments[0];
    rest = segments.slice(1);
  }

  const slug = rest.join('/');
  const pageKey = pageKeys.find((key) => pageSlugs[key][locale] === slug) ?? '404';
  return { locale, pageKey };
}

export function getStaticPathsForLocale(locale: Locale) {
  if (locale === defaultLocale) {
    throw new Error('Default locale pages live at the site root, not under a locale folder.');
  }

  return pageKeys.map((pageKey) => {
    const slug = pageSlugs[pageKey][locale];
    return {
      params: { locale, page: slug || undefined },
      props: { locale, pageKey },
    };
  });
}

export function getStaticPathsForTranslatedLocales() {
  return locales
    .filter((locale) => locale !== defaultLocale)
    .flatMap((locale) => getStaticPathsForLocale(locale));
}

export function allLocalizedPaths(): { locale: Locale; pageKey: PageKey; pathname: string }[] {
  return locales.flatMap((locale) =>
    pageKeys.map((pageKey) => ({
      locale,
      pageKey,
      pathname: pagePathname(pageKey, locale),
    })),
  );
}
