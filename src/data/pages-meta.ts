import { defaultLocale, msg, type Locale } from '../i18n';
import type { PageKey } from '../i18n';

export function getPageMeta(pageKey: PageKey, locale: Locale = defaultLocale) {
  const seo = msg(locale).seo as Record<string, { title: string; description: string }>;
  const fallback = msg(defaultLocale).seo as Record<string, { title: string; description: string }>;
  return seo[pageKey] ?? fallback[pageKey];
}
