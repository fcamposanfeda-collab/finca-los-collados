import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const outDir = 'tmp-lh-fase2-lcp';
mkdirSync(outDir, { recursive: true });

const pages = [
  ['home-es', 'http://localhost:4324/'],
  ['calerilla-es', 'http://localhost:4324/la-calerilla/'],
  ['calerilla-en', 'http://localhost:4324/en/la-calerilla/'],
  ['calerilla-fr', 'http://localhost:4324/fr/la-calerilla/'],
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
  const lcpAudit = audits['largest-contentful-paint'] || {};
  const lcpEl = audits['largest-contentful-paint-element'] || {};
  const details = lcpEl.details?.items?.[0];
  const row = {
    name,
    url,
    perf: Math.round((cats.performance?.score ?? 0) * 100),
    a11y: Math.round((cats.accessibility?.score ?? 0) * 100),
    bp: Math.round((cats['best-practices']?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100),
    lcp: lcpAudit.displayValue,
    lcpMs: lcpAudit.numericValue,
    cls: audits['cumulative-layout-shift']?.displayValue,
    clsNum: audits['cumulative-layout-shift']?.numericValue,
    fcp: audits['first-contentful-paint']?.displayValue,
    tbt: audits['total-blocking-time']?.displayValue,
    si: audits['speed-index']?.displayValue,
    lcpSnippet: details?.node?.snippet || details?.node?.selector || lcpEl.displayValue,
  };
  rows.push(row);
  console.log(JSON.stringify(row));
}

writeFileSync(`${outDir}/summary.json`, JSON.stringify(rows, null, 2));
console.log('\nSUMMARY');
for (const r of rows) {
  if (r.error) {
    console.log(r.name, 'ERROR');
    continue;
  }
  console.log(
    r.name.padEnd(16),
    String(r.perf).padStart(3),
    String(r.a11y).padStart(3),
    String(r.lcp || '').padEnd(8),
    'CLS',
    r.cls,
  );
}
