// node src/lib/settings.test.mjs
import assert from 'node:assert/strict';

// localStorage shim — the module reads it at call time, not import time.
const store = {};
globalThis.localStorage = {
  getItem: (k) => store[k] ?? null,
  setItem: (k, v) => { store[k] = String(v) },
};

const { loadSettings, saveSettings, resetSettings, isDefault, DEFAULTS, ALL_KINDS } =
  await import('./settings.js');

// ── per-bucket defaults reflect the measured profiles ────────────────────────
assert.equal(DEFAULTS.r2.groupVariants, false, 'r2 has 0 variant sets — no dead toggle');
assert.equal(DEFAULTS.r2.foldSegments, false, 'r2 has 0 segments');
assert.equal(DEFAULTS.b2.foldSegments, true, 'website bucket has 2012 segments');
assert.equal(DEFAULTS.b2vault.videoPreview, 'none', '46 videos at ~440 MB each');
assert.equal(DEFAULTS.b2vault.layout, 'off', 'cards off on load — the column view browses (2026-08-27)');
console.log('✓ per-bucket defaults');

// ── nothing is gated ─────────────────────────────────────────────────────────
for (const id of Object.keys(DEFAULTS)) {
  assert.equal(DEFAULTS[id].uploadOpen, false, `${id}: drop pool never a permanent banner`);
  // every kind except system is visible out of the box, and system is one
  // checkbox away — not absent from the list
  assert.ok(ALL_KINDS.includes('system'), 'system must be offerable');
  assert.ok(!DEFAULTS[id].kinds.includes('system'), `${id}: system hidden by default`);
}
console.log('✓ defaults hide, never gate');

// ── round trip ───────────────────────────────────────────────────────────────
const mine = { ...loadSettings('b2'), layout: 'list', sortBy: 'size', pageSize: 500 };
saveSettings('b2', mine);
assert.equal(loadSettings('b2').sortBy, 'size', 'saved value survives');
assert.equal(loadSettings('b2').layout, 'off', 'layout is a session choice — off on every load even when list was saved');
assert.equal(loadSettings('r2').sortBy, 'date', 'other buckets untouched');
assert.equal(isDefault('b2', loadSettings('b2')), false);
console.log('✓ per-bucket round trip');

// ── forward compatibility ────────────────────────────────────────────────────
store['kol-r2b2:settings:v2'] = JSON.stringify({ b2: { sortBy: 'size' } });
const partial = loadSettings('b2');
assert.equal(partial.sortBy, 'size', 'saved key wins');
assert.equal(partial.pageSize, 200, 'a key absent from an old save gets its default, not undefined');
console.log('✓ old saves gain new settings');

// ── reset ────────────────────────────────────────────────────────────────────
const back = resetSettings('b2');
assert.equal(back.sortBy, 'name');
assert.equal(isDefault('b2', loadSettings('b2')), true);
console.log('✓ reset restores defaults');

// ── corrupt storage must not brick the page ──────────────────────────────────
store['kol-r2b2:settings:v2'] = '{not json';
assert.equal(loadSettings('b2').sortBy, 'name', 'garbage in storage falls back to defaults');
console.log('✓ corrupt storage survives');

console.log('\nAll settings rules pass.');
