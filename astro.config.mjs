// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { hreflangLinks, pageKeyFromUrl } from './src/i18n/sitemap';

export default defineConfig({
  site: 'https://loscolladosdesanmiguel.com',
  trailingSlash: 'always',
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
      filter: (page) => !page.includes('/404') && !page.endsWith('/404/'),
      serialize(item) {
        try {
          const { pageKey } = pageKeyFromUrl(item.url);
          if (pageKey === '404') return undefined;
          return {
            ...item,
            links: hreflangLinks(pageKey),
          };
        } catch {
          return item;
        }
      },
    }),
  ],
});
