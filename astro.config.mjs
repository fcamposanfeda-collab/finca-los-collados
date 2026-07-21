// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages (repo project site). Al conectar el dominio propio, quitar `base`
  // y poner site: 'https://loscolladosdesanmiguel.com'.
  site: 'https://fcamposanfeda-collab.github.io',
  base: '/finca-los-collados',
  integrations: [sitemap()],
});
