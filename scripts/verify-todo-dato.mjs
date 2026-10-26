import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function containsTodoDato(text) {
  return text.includes('TODO_DATO');
}

function stripTodoDato(text) {
  return text
    .split(/(?<=[.!?…])\s+/)
    .filter((sentence) => !containsTodoDato(sentence))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function visibleFaqItems(items) {
  return items.flatMap((item) => {
    const q = stripTodoDato(item.q);
    const a = stripTodoDato(item.a);
    if (!q || !a) return [];
    return [{ ...item, q, a }];
  });
}

const locales = ['es', 'en', 'fr'];
let leaked = 0;
for (const locale of locales) {
  const faq = JSON.parse(readFileSync(join(root, `src/i18n/messages/${locale}/faq.json`), 'utf8'));
  for (const [page, items] of Object.entries(faq)) {
    if (!Array.isArray(items)) continue;
    const visible = visibleFaqItems(items);
    const hidden = items.length - visible.length;
    const leak = visible.filter((item) => containsTodoDato(item.q) || containsTodoDato(item.a));
    leaked += leak.length;
    console.log(
      `${locale}/${page}: ${items.length} → ${visible.length} visibles (${hidden} ocultas)`,
    );
    for (const item of visible) {
      console.log(`  Q: ${item.q}`);
      console.log(`  A: ${item.a}`);
    }
    if (leak.length) {
      console.error(`LEAK ${locale}/${page}`, leak);
    }
  }
}

if (leaked) {
  process.exit(1);
}
console.log('OK: ningún TODO_DATO visible en FAQ.');
