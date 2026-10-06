// Self-check for the CDN proxy. No wrangler, no port — the handler is called
// directly with real Requests and hits real B2.
//   node workers/cdn-proxy/test.mjs

import assert from 'node:assert/strict';
import worker, { originUrl, BUCKETS } from './src/index.js';

// --- mapping: pure, no network ---------------------------------------------
assert.equal(
  originUrl('cdn.kolkrabbi.io', '/website/art-prints/manifest.yaml'),
  'https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/manifest.yaml'
);
assert.equal(
  originUrl('vault.kolkrabbi.io', '/img/x.png'),
  'https://f005.backblazeb2.com/file/kol-vault-media/img/x.png'
);
assert.equal(originUrl('nope.kolkrabbi.io', '/x'), null, 'unknown host must not map');
console.log('✓ host → bucket mapping');

// --- routing guards ---------------------------------------------------------
const unknown = await worker.fetch(new Request('https://nope.kolkrabbi.io/x'));
assert.equal(unknown.status, 404, 'unknown host → 404');

const post = await worker.fetch(new Request('https://cdn.kolkrabbi.io/x', { method: 'POST' }));
assert.equal(post.status, 405, 'writes must be refused');
assert.equal(post.headers.get('Allow'), 'GET, HEAD, OPTIONS');

const opts = await worker.fetch(new Request('https://cdn.kolkrabbi.io/x', { method: 'OPTIONS' }));
assert.equal(opts.headers.get('Access-Control-Allow-Origin'), '*', 'preflight must allow CORS');
console.log('✓ method + host guards');

// --- real fetches through the handler ---------------------------------------
const cases = [
  ['https://cdn.kolkrabbi.io/website/art-prints/print-blokk/artwork/blokk-artwork-1132.jpg', 'image/jpeg'],
  ['https://cdn.kolkrabbi.io/website/art-prints/manifest.yaml', 'application/yaml'],
];

for (const [url, expectedType] of cases) {
  const res = await worker.fetch(new Request(url));
  assert.equal(res.status, 200, `${url} → ${res.status}`);
  assert.equal(res.headers.get('content-type'), expectedType);
  assert.match(res.headers.get('cache-control'), /max-age=86400/, 'we must set Cache-Control; B2 sends none');
  assert.equal(res.headers.get('access-control-allow-origin'), '*');
  for (const k of res.headers.keys()) {
    assert.ok(!k.startsWith('x-bz-'), `B2 header leaked: ${k}`);
  }
  const body = await res.arrayBuffer();
  assert.ok(body.byteLength > 0, 'body must not be empty');
  console.log(`✓ ${url.split('/').pop().padEnd(24)} ${res.status} ${expectedType} ${body.byteLength}B`);
}

// --- range request: HLS seeking depends on this ------------------------------
const ranged = await worker.fetch(
  new Request(cases[0][0], { headers: { Range: 'bytes=0-99' } })
);
assert.equal(ranged.status, 206, 'range request must return 206, not 200');
assert.equal((await ranged.arrayBuffer()).byteLength, 100, 'range must return exactly 100 bytes');
console.log('✓ range requests pass through (206, 100 bytes)');

console.log(`\nAll checks passed for ${Object.keys(BUCKETS).length} hostnames.`);
