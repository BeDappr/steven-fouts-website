import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const { default: worker } = await import('./dist/worker.js');
const origin = 'https://stevenfouts.com';
const home = await worker.fetch(new Request(origin));
assert.equal(home.status, 200);
assert.match(home.headers.get('Content-Type'), /text\/html/);
const html = await home.text();
for (const target of ['tel:+16616091241', 'sms:+16616091241', 'mailto:steven@monasticmarketing.com']) assert.ok(html.includes(`href="${target}"`));
for (const text of ['Monastic', 'The Everyday', '1,000+', 'Marine Corps', 'Restaurant', 'Side-by-side touring', 'Event center', 'Wedding venue']) assert.ok(html.includes(text));
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), `Missing anchor ${id}`);
for (const path of ['/styles.css', '/app.js', '/steven-fouts.webp', '/favicon.svg', '/robots.txt', '/sitemap.xml']) {
  const response = await worker.fetch(new Request(origin + path));
  assert.equal(response.status, 200, path);
  assert.ok((await response.arrayBuffer()).byteLength > 0, path);
}
assert.equal((await worker.fetch(new Request(origin + '/not-found'))).status, 404);
assert.equal((await worker.fetch(new Request(origin, { method: 'POST' }))).status, 405);
assert.equal((await worker.fetch(new Request(origin, { method: 'HEAD' }))).body, null);
assert.equal((await worker.fetch(new Request(origin, { headers: { 'If-None-Match': home.headers.get('ETag') } }))).status, 304);
assert.equal((await worker.fetch(new Request('https://www.stevenfouts.com/'))).headers.get('Location'), origin + '/');
assert.match(await readFile('public/styles.css', 'utf8'), /prefers-reduced-motion/);
console.log('Passed: site assets, content, all contact links, anchors, redirects, caching, HEAD, 404 and method handling.');
