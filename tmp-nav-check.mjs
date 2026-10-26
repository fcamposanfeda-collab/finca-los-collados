import { readFileSync } from 'node:fs';

for (const file of ['dist/index.html', 'dist/en/index.html', 'dist/fr/index.html']) {
  const html = readFileSync(file, 'utf8');
  const links = [...html.matchAll(/class="site-header__link[^"]*"[^>]*>([^<]+)/g)].map((m) =>
    m[1].trim(),
  );
  const sub = [...html.matchAll(/class="site-header__sublink[^"]*"[^>]*>([^<]+)/g)].map((m) =>
    m[1].trim(),
  );
  console.log(file);
  console.log('nav', links);
  console.log('sub', sub);
}
