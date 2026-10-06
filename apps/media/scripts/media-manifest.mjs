// media-manifest — snapshot every bucket and diff against the last snapshot, so
// added/removed objects are visible over time. Replaces the R2-only bash version.
//
//   node scripts/media-manifest.mjs            all buckets
//   node scripts/media-manifest.mjs b2         one bucket
//
// R2 reads the public list API (no auth). B2 reads B2 directly via the adapter,
// so this does NOT wait on the admin being redeployed.
// ponytail: tracks add/remove by key, not size changes on re-upload of the same
// key — add a size-diff pass if overwrites become worth catching.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { listB2 } from '../functions/api/_b2.js';

const ROOT = new URL('..', import.meta.url);
const OUT_DIR = new URL('manifests/', ROOT);
const R2_API = process.env.BUCKET_R2_API || 'https://admin.kolkrabbi.io';

const SOURCES = {
  r2: { label: 'R2 · kol-media', read: listR2 },
  b2: { label: 'B2 · kolkrabbi', read: () => listB2(env(), { bucket: 'kolkrabbi' }) },
  b2vault: { label: 'B2 · kol-vault-media', read: () => listB2(env(), { bucket: 'kol-vault-media' }) },
};

function env() {
  return Object.fromEntries(
    readFileSync(new URL('.dev.vars', ROOT), 'utf8')
      .split('\n')
      .filter((l) => l.includes('=') && !l.trimStart().startsWith('#'))
      .map((l) => {
        const i = l.indexOf('=');
        return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
      })
  );
}

async function listR2() {
  const res = await fetch(`${R2_API}/api/list`);
  if (!res.ok) throw new Error(`R2 list failed: ${res.status}`);
  return res.json();
}

function diff(prevPath, rows) {
  const now = new Map(rows.map((r) => [r.key, r.size]));
  if (!existsSync(prevPath)) return { baseline: true, added: [], removed: [] };

  const before = new Set(
    readFileSync(prevPath, 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((l) => l.split('\t')[0])
  );
  return {
    baseline: false,
    added: [...now.keys()].filter((k) => !before.has(k)),
    removed: [...before].filter((k) => !now.has(k)),
  };
}

const only = process.argv[2];
const targets = only ? [only] : Object.keys(SOURCES);
mkdirSync(OUT_DIR, { recursive: true });

let failed = 0;

for (const id of targets) {
  const src = SOURCES[id];
  if (!src) {
    console.error(`unknown bucket: ${id} — try ${Object.keys(SOURCES).join(' | ')}`);
    process.exit(2);
  }

  let data;
  try {
    data = await src.read();
  } catch (err) {
    console.log(`✗ ${src.label.padEnd(22)} ${err.message}`);
    failed += 1;
    continue;
  }

  const rows = data.objects
    .map((o) => ({ key: o.key, size: o.size }))
    .sort((a, b) => (a.key < b.key ? -1 : 1));

  const path = new URL(`${id}.tsv`, OUT_DIR);
  const { baseline, added, removed } = diff(path, rows);
  writeFileSync(path, rows.map((r) => `${r.key}\t${r.size}`).join('\n') + '\n');

  const bytes = rows.reduce((n, r) => n + r.size, 0);
  const head = `${src.label.padEnd(22)} ${String(rows.length).padStart(5)} objects · ${(bytes / 1e9).toFixed(1)} GB`;

  if (baseline) console.log(`= ${head}  (baseline)`);
  else if (!added.length && !removed.length) console.log(`= ${head}  no change`);
  else {
    console.log(`~ ${head}  +${added.length} -${removed.length}`);
    for (const k of added.slice(0, 20)) console.log(`    + ${k}`);
    if (added.length > 20) console.log(`    + … ${added.length - 20} more`);
    for (const k of removed.slice(0, 20)) console.log(`    - ${k}`);
    if (removed.length > 20) console.log(`    - … ${removed.length - 20} more`);
  }
}

process.exit(failed ? 1 : 0);

// The baked folder tree rides every manifest refresh.
const { buildTree } = await import('./folder-tree.mjs');
buildTree();
console.log('folder tree → src/data/folder-tree.json');
