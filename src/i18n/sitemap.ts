import { localeMeta, locales, type Locale } from './config';
import { pagePathname, parsePathname, type PageKey } from './routes';

const siteUrl = 'https://loscolladosdesanmiguel.com';

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith('http')) return pathname;
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  return new URL(path, siteUrl).href;
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
