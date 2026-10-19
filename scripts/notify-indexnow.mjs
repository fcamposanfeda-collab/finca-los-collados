/**
 * IndexNow notification for Bing / Copilot / ChatGPT Search.
 * Do NOT run without an explicit OK from the site owner.
 *
 * Usage (after publish): node scripts/notify-indexnow.mjs
 */
const key = '8f3a2c1b9e4d40c8a7b1c0d5e6f7a8b9';
const host = 'loscolladosdesanmiguel.com';
const keyLocation = `https://${host}/${key}.txt`;

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('Pass one or more absolute URLs. Example:');
  console.error('  node scripts/notify-indexnow.mjs https://loscolladosdesanmiguel.com/');
  process.exit(1);
}

const body = {
  host,
  key,
  keyLocation,
  urlList: urls,
};

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(response.status, await response.text());
if (!response.ok) process.exit(1);
