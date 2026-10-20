// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { hreflangLinks, pageKeyFromUrl } from './src/i18n/sitemap';

export default defineConfig({
  site: 'https://loscolladosdesanmiguel.com',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  i18n: {
    defaultLocale: 'es',
    locales: [
      'es',
      {
        path: 'en',
        codes: ['en', 'en-GB'],
      },
      'fr',
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => {
        if (page.includes('/404')) return false;
        return !['/solicitud-enviada/', '/request-sent/', '/demande-envoyee/'].some((slug) =>
          page.includes(slug),
        );
      },
      serialize(item) {
        try {
          const { pageKey } = pageKeyFromUrl(item.url);
          if (pageKey === '404' || pageKey === 'solicitud-enviada') return undefined;
          return {
            ...item,
            lastmod: new Date().toISOString(),
            links: hreflangLinks(pageKey),
          };
        } catch {
          return item;
        }
      },
    }),
  ],
});
