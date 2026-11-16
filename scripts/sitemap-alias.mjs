// Publica también /sitemap.xml (la ruta que Google Search Console y Bing proponen por defecto).
// @astrojs/sitemap solo genera sitemap-index.xml + sitemap-N.xml; si hay un único bloque,
// se copia como sitemap.xml (urlset); si hay varios, se copia el índice.
import { copyFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const chunks = readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f));
const source = chunks.length === 1 ? chunks[0] : 'sitemap-index.xml';
if (!existsSync(join(dist, source))) {
  console.error(`[sitemap-alias] No existe dist/${source}`);
  process.exit(1);
}
copyFileSync(join(dist, source), join(dist, 'sitemap.xml'));
console.log(`[sitemap-alias] dist/sitemap.xml <- ${source}`);
