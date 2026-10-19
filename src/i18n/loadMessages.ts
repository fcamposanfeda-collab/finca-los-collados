import { defaultLocale, isLocale, type Locale } from './config';

const files = import.meta.glob('./messages/*/*.json', {
  eager: true,
  import: 'default',
});

type NamespaceMap = Record<string, unknown>;

function loadDictionaries(): Record<Locale, NamespaceMap> {
  const result = {} as Record<Locale, NamespaceMap>;

  for (const [path, data] of Object.entries(files)) {
    const match = path.match(/messages\/([a-z]+)\/([\w-]+)\.json$/);
    if (!match) continue;
    const [, locale, namespace] = match;
    if (!isLocale(locale)) continue;
    result[locale] ??= {};
    result[locale][namespace] = data;
  }

  return result;
}

export const dictionaries = loadDictionaries();

export type Messages = (typeof dictionaries)[typeof defaultLocale];

export function getMessages(locale: Locale): Messages {
  return (dictionaries[locale] ?? dictionaries[defaultLocale]) as Messages;
}
