import { defaultLocale, isLocale, localeMeta, type Locale } from './config';
import { getMessages, type Messages } from './loadMessages';
import { getRenderI18n } from './render-context';
import { localizePath, parsePathname, type PageKey } from './routes';
import { stripBase } from '../utils/paths';

type AstroLike = {
  currentLocale?: string;
  url: URL;
  locals?: {
    locale?: Locale;
    pageKey?: PageKey;
  };
  props?: {
    locale?: Locale;
    pageKey?: PageKey;
  };
};

function getByPath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

function interpolate(value: string, vars?: Record<string, string | number>): string {
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] == null ? `{${name}}` : String(vars[name]),
  );
}

export function getLocale(astro: AstroLike): Locale {
  const fromRewrite = getRenderI18n();
  if (fromRewrite) return fromRewrite.locale;

  if (astro.locals?.locale && isLocale(astro.locals.locale)) {
    return astro.locals.locale;
  }
  if (astro.props?.locale && isLocale(astro.props.locale)) {
    return astro.props.locale;
  }
  if (astro.currentLocale && isLocale(astro.currentLocale)) {
    return astro.currentLocale;
  }
  return parsePathname(stripBase(astro.url.pathname)).locale;
}

export function getPageKey(astro: AstroLike): PageKey {
  const fromRewrite = getRenderI18n();
  if (fromRewrite) return fromRewrite.pageKey;

  if (astro.locals?.pageKey) return astro.locals.pageKey;
  if (astro.props?.pageKey) return astro.props.pageKey;
  return parsePathname(stripBase(astro.url.pathname)).pageKey;
}

export function msg(locale: Locale): Messages {
  return getMessages(locale);
}

export function t(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const value = getByPath(getMessages(locale), key);
  if (typeof value === 'string') return interpolate(value, vars);

  const fallback = getByPath(getMessages(defaultLocale), key);
  if (typeof fallback === 'string') return interpolate(fallback, vars);

  throw new Error(`Missing translation key: ${key} (${locale})`);
}

export function tList(locale: Locale, key: string): string[] {
  const value = getByPath(getMessages(locale), key);
  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    return value;
  }

  const fallback = getByPath(getMessages(defaultLocale), key);
  if (Array.isArray(fallback) && fallback.every((item) => typeof item === 'string')) {
    return fallback as string[];
  }

  throw new Error(`Missing translation list: ${key} (${locale})`);
}

export function href(pageKey: PageKey, locale: Locale): string {
  return localizePath(pageKey, locale);
}

export function useI18n(astro: AstroLike) {
  const locale = getLocale(astro);
  const pageKey = getPageKey(astro);
  const copy = msg(locale);

  return {
    locale,
    pageKey,
    copy,
    meta: localeMeta[locale],
    t: (key: string, vars?: Record<string, string | number>) => t(locale, key, vars),
    tList: (key: string) => tList(locale, key),
    href: (key: PageKey, targetLocale: Locale = locale) => href(key, targetLocale),
  };
}

export function persistLocalePreference(locale: Locale): string {
  return `try{localStorage.setItem('locale',${JSON.stringify(locale)});document.cookie='locale=${locale};path=/;max-age=31536000;SameSite=Lax'}catch(e){}`;
}
