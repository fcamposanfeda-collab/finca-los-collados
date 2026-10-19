export {
  alternateLocales,
  defaultLocale,
  isLocale,
  localeMeta,
  locales,
  type Locale,
} from './config';
export {
  allLocalizedPaths,
  getStaticPathsForLocale,
  getStaticPathsForTranslatedLocales,
  legalPageKeys,
  localizePath,
  pageKeys,
  pagePathname,
  pageSlugs,
  parsePathname,
  type LegalPageKey,
  type PageKey,
} from './routes';
export { dictionaries, getMessages, type Messages } from './loadMessages';
export { absoluteUrl, hreflangLinks, pageKeyFromUrl } from './sitemap';
export {
  getLocale,
  getPageKey,
  href,
  msg,
  persistLocalePreference,
  t,
  tList,
  useI18n,
} from './utils';
