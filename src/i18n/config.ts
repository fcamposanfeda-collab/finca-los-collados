export const defaultLocale = 'es' as const;

export const locales = ['es', 'en', 'fr'] as const;

export type Locale = (typeof locales)[number];

export const localeMeta = {
  es: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    bcp47: 'es-ES',
    bookingLang: 'es',
    languageField: 'ES',
    nativeName: 'Español',
    short: 'ES',
    dateLocale: 'es-ES',
  },
  en: {
    htmlLang: 'en-GB',
    ogLocale: 'en_GB',
    bcp47: 'en-GB',
    bookingLang: 'en-gb',
    languageField: 'EN',
    nativeName: 'English',
    short: 'EN',
    dateLocale: 'en-GB',
  },
  fr: {
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    bcp47: 'fr-FR',
    bookingLang: 'fr',
    languageField: 'FR',
    nativeName: 'Français',
    short: 'FR',
    dateLocale: 'fr-FR',
  },
} as const;

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && (locales as readonly string[]).includes(value);
}

export function alternateLocales(locale: Locale): Locale[] {
  return locales.filter((item) => item !== locale);
}
