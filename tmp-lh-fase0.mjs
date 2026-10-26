import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const outDir = 'tmp-lh-fase0';
mkdirSync(outDir, { recursive: true });

const pages = [
  ['home-es', 'http://localhost:4321/'],
  ['home-en', 'http://localhost:4321/en/'],
  ['home-fr', 'http://localhost:4321/fr/'],
  ['alojamiento-es', 'http://localhost:4321/alojamiento/'],
  ['alojamiento-en', 'http://localhost:4321/en/accommodation/'],
  ['alojamiento-fr', 'http://localhost:4321/fr/hebergement/'],
  ['calerilla-es', 'http://localhost:4321/la-calerilla/'],
  ['calerilla-en', 'http://localhost:4321/en/la-calerilla/'],
  ['calerilla-fr', 'http://localhost:4321/fr/la-calerilla/'],
];

const rows = [];

for (const [name, url] of pages) {
  const jsonPath = `${outDir}/${name}.json`;
  console.log('LH', name, url);
  const result = spawnSync(
    'npx',
    [
      '--yes',
      'lighthouse',
      url,
      '--quiet',
      '--chrome-flags=--headless --no-sandbox --disable-gpu',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      `--output-path=${jsonPath}`,
      '--form-factor=mobile',
      '--screenEmulation.mobile',
      '--throttling-method=simulate',
    ],
    { encoding: 'utf8', shell: true },
  );
  if (result.status !== 0) {
    console.log('FAIL', name, result.stderr?.slice(-500) || result.stdout?.slice(-500));
    rows.push({ name, url, error: true });
    continue;
  }
  const report = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const cats = report.categories || {};
  const audits = report.audits || {};
  const row = {
    name,
    url,
    perf: Math.round((cats.performance?.score ?? 0) * 100),
    a11y: Math.round((cats.accessibility?.score ?? 0) * 100),
    bp: Math.round((cats['best-practices']?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100),
    lcp: audits['largest-contentful-paint']?.displayValue,
    cls: audits['cumulative-layout-shift']?.displayValue,
    fcp: audits['first-contentful-paint']?.displayValue,
    tbt: audits['total-blocking-time']?.displayValue,
    si: audits['speed-index']?.displayValue,
    lcpEl: audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet,
  };
  rows.push(row);
  console.log(JSON.stringify(row));
}

writeFileSync(`${outDir}/summary.json`, JSON.stringify(rows, null, 2));
console.log('\nSUMMARY');
console.log(
  'page'.padEnd(18),
  'perf',
  'a11y',
  'bp',
  'seo',
  'LCP'.padEnd(10),
  'CLS',
);
for (const r of rows) {
  if (r.error) {
    console.log(r.name, 'ERROR');
    continue;
  }
  console.log(
    r.name.padEnd(18),
    String(r.perf).padStart(4),
    String(r.a11y).padStart(4),
    String(r.bp).padStart(3),
    String(r.seo).padStart(3),
    String(r.lcp || '').padEnd(10),
    r.cls,
  );
}
