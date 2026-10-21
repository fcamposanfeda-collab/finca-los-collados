// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { hreflangLinks, pageKeyFromUrl } from './src/i18n/sitemap';

export default defineConfig({
  site: 'https://loscolladosdesanmiguel.com',
  trailingSlash: 'always',
  redirects: {
    // URLs antiguas que Search Console marca como 404 (export 21/10/2026)
    '/online-bookings/': '/en/book-online/',
    '/en/online-bookings/': '/en/book-online/',
    '/en/reservas-online/': '/en/book-online/',
    '/reservation-en-ligne/': '/fr/reserver-en-ligne/',
    '/en/reservation-en-ligne/': '/fr/reserver-en-ligne/',
    '/en/fr/reservation-en-ligne/': '/fr/reserver-en-ligne/',
    '/rural-accommodation-in-la-mancha/': '/en/accommodation/',
    '/en/aviso-legal/': '/en/legal-notice/',
    '/en/politica-de-privacidad/': '/en/privacy-policy/',
    '/en/politica-de-cookies/': '/en/cookie-policy/',
    '/cinegetica-2022/': '/experiencias/',
    '/en/cinegetica-2022/': '/en/experiences/',
    '/la-fauna-no-da-tregua/': '/experiencias/',
    '/en/la-fauna-no-da-tregua/': '/en/experiences/',
    '/ultimo-dia-de-temporada/': '/experiencias/',
    '/en/ultimo-dia-de-temporada/': '/en/experiences/',
    '/manifestacion-mundo-rural/': '/experiencias/',
    '/en/manifestacion-mundo-rural/': '/en/experiences/',
  },
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
