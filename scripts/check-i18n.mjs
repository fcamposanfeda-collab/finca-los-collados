import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const messagesDir = path.join(root, 'src', 'i18n', 'messages');
const locales = ['es', 'en', 'fr'];
const allowedEmpty = new Set(['es.legal.disclaimer', 'es.common.country']);

function flatten(value, prefix = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flatten(item, `${prefix}[${index}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, nested]) =>
      flatten(nested, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [{ key: prefix, value }];
}

function collectKeys(value, prefix = '') {
  if (Array.isArray(value)) {
    return [`${prefix}[]:${value.length}`, ...value.flatMap((item, index) => collectKeys(item, `${prefix}[${index}]`))];
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, nested]) =>
      collectKeys(nested, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

const errors = [];

const localeFiles = {};
for (const locale of locales) {
  const dir = path.join(messagesDir, locale);
  const files = (await readdir(dir)).filter((file) => file.endsWith('.json')).sort();
  localeFiles[locale] = files;
}

const sourceFiles = localeFiles.es;
for (const locale of locales.slice(1)) {
  const missing = sourceFiles.filter((file) => !localeFiles[locale].includes(file));
  const extra = localeFiles[locale].filter((file) => !sourceFiles.includes(file));
  for (const file of missing) errors.push(`${locale}: missing namespace ${file}`);
  for (const file of extra) errors.push(`${locale}: extra namespace ${file}`);
}

for (const file of sourceFiles) {
  const source = JSON.parse(await readFile(path.join(messagesDir, 'es', file), 'utf8'));
  const sourceKeys = collectKeys(source);

  for (const locale of locales) {
    const data = JSON.parse(await readFile(path.join(messagesDir, locale, file), 'utf8'));
    const keys = collectKeys(data);

    if (locale !== 'es') {
      const missing = sourceKeys.filter((key) => !keys.includes(key));
      const extra = keys.filter((key) => !sourceKeys.includes(key));
      for (const key of missing) errors.push(`${locale}/${file}: missing key ${key}`);
      for (const key of extra) errors.push(`${locale}/${file}: extra key ${key}`);
    }

    for (const { key, value } of flatten(data)) {
      if (typeof value !== 'string') continue;
      const id = `${locale}.${file.replace(/\.json$/, '')}.${key}`;
      if (value.trim() === '' && !allowedEmpty.has(id)) {
        errors.push(`${locale}/${file}: empty value at ${key}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`i18n check failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`i18n check passed: ${sourceFiles.length} namespaces × ${locales.length} locales.`);
