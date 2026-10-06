// Self-check for the B2 read adapter. No framework — run it directly:
//   node scripts/test-b2-list.mjs
// Reads credentials from .dev.vars (same file wrangler uses for local dev).
// Fails loudly if the adapter stops returning the frozen /api/list shape.

import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { listB2 } from '../functions/api/_b2.js';

const env = Object.fromEntries(
  readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trimStart().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

// The whole website lane — the admin lists from root, so pagination past the
// 1000-item page limit is the thing most likely to silently break.
const res = await listB2(env, { prefix: 'website/' });

assert.ok(Array.isArray(res.objects), 'objects must be an array');
assert.ok(res.objects.length > 1000, `paging failed — got ${res.objects.length}, expected >1000`);
assert.equal(res.truncated, false, 'the whole lane should fit inside the page cap');
assert.ok('cursor' in res, 'cursor must be present');

const keys = new Set(res.objects.map((o) => o.key));
assert.equal(keys.size, res.objects.length, 'paging must not duplicate keys');

for (const o of res.objects) {
  // The three fields consumers actually read. Breaking any of them breaks
  // kol-labs-single and kol-design-editor silently — there is no types layer.
  assert.equal(typeof o.key, 'string', 'key must be a string');
  assert.equal(typeof o.size, 'number', 'size must be a number');
  assert.ok(o.contentType === null || typeof o.contentType === 'string', 'contentType string|null');
  assert.ok(o.key.startsWith('website/'), 'keys keep the website/ prefix');
  assert.ok(!Number.isNaN(Date.parse(o.uploaded)), 'uploaded must parse as a date');
}

const lanes = {};
for (const o of res.objects) {
  const lane = o.key.split('/')[1] || '(root)';
  lanes[lane] = (lanes[lane] || 0) + 1;
}

console.log(`✓ B2 adapter returned ${res.objects.length} objects in the frozen shape`);
console.log(`  truncated: ${res.truncated}`);
for (const [lane, n] of Object.entries(lanes).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${lane.padEnd(16)} ${n}`);
}
