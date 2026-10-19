import { defineMiddleware } from 'astro:middleware';
import { getRenderI18n } from './i18n/render-context';
import { parsePathname } from './i18n/routes';
import { stripBase } from './utils/paths';

export const onRequest = defineMiddleware((context, next) => {
  const fromRewrite = getRenderI18n();
  if (fromRewrite) {
    context.locals.locale = fromRewrite.locale;
    context.locals.pageKey = fromRewrite.pageKey;
    return next();
  }

  const parsed = parsePathname(stripBase(context.url.pathname));
  context.locals.locale = parsed.locale;
  context.locals.pageKey = parsed.pageKey;
  return next();
});
