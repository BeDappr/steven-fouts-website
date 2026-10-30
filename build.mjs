import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };
const assets = {};
for (const file of await readdir('public')) {
  const ext = file.slice(file.lastIndexOf('.'));
  if (!types[ext]) continue;
  const bytes = await readFile(`public/${file}`);
  assets[`/${file}`] = { body: bytes.toString('base64'), type: types[ext], etag: `"${createHash('sha256').update(bytes).digest('hex').slice(0, 20)}"` };
}
await mkdir('dist', { recursive: true });
const handler = await readFile('worker.mjs', 'utf8');
await writeFile('dist/worker.js', `const assets = ${JSON.stringify(assets)};\n${handler}`);
console.log(`Built ${Object.keys(assets).length} assets into dist/worker.js (${(await readFile('dist/worker.js')).length} bytes).`);
