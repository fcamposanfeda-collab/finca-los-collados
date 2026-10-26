import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const outDir = 'tmp-lh-fase1';
mkdirSync(outDir, { recursive: true });

const pages = [
  ['alojamiento-es', 'http://localhost:4322/alojamiento/'],
  ['alojamiento-en', 'http://localhost:4322/en/accommodation/'],
  ['alojamiento-fr', 'http://localhost:4322/fr/hebergement/'],
];

const rows = [];

for (const [name, url] of pages) {
  const jsonPath = `${outDir}/${name}-rerun.json`;
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
  };
  rows.push(row);
  console.log(JSON.stringify(row));
}

writeFileSync(`${outDir}/alojamiento-rerun.json`, JSON.stringify(rows, null, 2));
