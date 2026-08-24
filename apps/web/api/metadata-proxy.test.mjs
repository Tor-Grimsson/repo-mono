// Self-check for the metadata-proxy routing logic (soft-404 allowlist + path
// normalization). Run: node apps/web/api/metadata-proxy.test.mjs
import assert from 'node:assert/strict'
import { isKnownSection, normalizePath } from './metadata-proxy.js'

// Trailing slashes collapse; root survives.
assert.equal(normalizePath('/studio/'), '/studio')
assert.equal(normalizePath('/foundry/typefaces/'), '/foundry/typefaces')
assert.equal(normalizePath('/'), '/')
assert.equal(normalizePath('/work'), '/work')

// Every top-level section in App.jsx must pass, or the proxy 404s a live page.
for (const p of [
  '/', '/studio', '/metrics', '/work', '/work/some-slug', '/foundry',
  '/foundry/typefaces/malromur', '/stack', '/stack/an-article', '/prints',
  '/prints/a-print', '/workshop', '/workshop/docs/anything', '/docs/x',
]) {
  assert.equal(isKnownSection(p), true, `known section rejected: ${p}`)
}

// Garbage must fail, or crawlers keep getting 200s for nothing.
for (const p of ['/wp-admin', '/index.php', '/asdf', '/collections/grids', '/blog']) {
  assert.equal(isKnownSection(p), false, `garbage accepted: ${p}`)
}

console.log('metadata-proxy: ok')
