// One-off survey: what top-level prefixes exist in each B2 bucket, and how big.
//   node scripts/b2-survey.mjs
import { readFileSync } from 'node:fs';
import { listB2 } from '../functions/api/_b2.js';

const base = Object.fromEntries(
  readFileSync(new URL('../.dev.vars', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trimStart().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

for (const bucket of ['kolkrabbi', 'kol-vault-media']) {
  const res = await listB2({ ...base, B2_BUCKET: bucket }, {});
  const lanes = {};
  let bytes = 0;
  for (const o of res.objects) {
    const top = o.key.includes('/') ? o.key.split('/')[0] + '/' : '(root files)';
    lanes[top] = lanes[top] || { n: 0, bytes: 0 };
    lanes[top].n += 1;
    lanes[top].bytes += o.size;
    bytes += o.size;
  }
  console.log(`\n═══ ${bucket} — ${res.objects.length} objects, ${(bytes / 1e9).toFixed(1)} GB, truncated:${res.truncated}`);
  for (const [lane, v] of Object.entries(lanes).sort((a, b) => b[1].n - a[1].n)) {
    console.log(`  ${lane.padEnd(22)} ${String(v.n).padStart(5)}  ${(v.bytes / 1e6).toFixed(0)} MB`);
  }
}
