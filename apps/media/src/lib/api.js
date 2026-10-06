// Bucket registry. Keys already carry their full path (B2 keys keep `website/`),
// so a public URL is always base + '/' + key.
// All three served from Kolkrabbi hostnames. The B2 pair goes through the
// kol-cdn-proxy Worker (workers/cdn-proxy/), live since 2026-08-14.
// Named r2./b2./b2v. since 2026-08-15; the previous media./cdn./vault. names
// stay attached upstream, so an un-swept consumer still resolves.
// ONE HOSTNAME (user, 2026-10-05): media.kolkrabbi.io is the admin. Writes are gated by Basic
// auth in functions/api/_middleware.js, not by which name was typed — the read-only twin
// `admin.`/`media.` split is gone (olina's model); admin. redirects here (functions/_middleware.js).
export const BUCKETS = {
  r2: {
    id: 'r2',
    label: 'R2 · kol-media',
    publicBase: 'https://r2.kolkrabbi.io',
    writable: true,
  },
  b2: {
    id: 'b2',
    label: 'B2 · website',
    publicBase: 'https://b2.kolkrabbi.io',
    writable: false,
  },
  b2vault: {
    id: 'b2vault',
    label: 'B2 · vault',
    publicBase: 'https://b2v.kolkrabbi.io',
    writable: false,
  },
};

// ponytail: module-level, not threaded as a prop — one admin, one active bucket,
// and it keeps FileList (600 lines, deeply prop-drilled) untouched. If a split
// view ever shows two buckets at once, this becomes context.
let activeBucket = 'r2';

export function setBucket(id) {
  if (!BUCKETS[id]) throw new Error(`unknown bucket: ${id}`);
  activeBucket = id;
}

export function getBucket() {
  return BUCKETS[activeBucket];
}

export const PUBLIC_BASE = BUCKETS.r2.publicBase;

export function publicUrl(key) {
  return `${getBucket().publicBase}/${key}`;
}

// Writes are R2-only for now. Without this guard a delete issued while B2 is
// active would hit the R2 endpoint with a B2 key — acting on the wrong store.
function assertWritable(action) {
  const b = getBucket();
  if (!b.writable) throw new Error(`${action} is not available on ${b.label} — read-only`);
}

export function downloadUrl(key) {
  // The /api/download proxy (which sets Content-Disposition: attachment) is the
  // R2 path. B2 objects are public, so hand back the direct URL rather than
  // proxying a key the R2 bucket doesn't have.
  if (!getBucket().writable) return publicUrl(key);
  return `/api/download?key=${encodeURIComponent(key)}`;
}

// Destination key when moving `key` into `folder` under the current `prefix`
// (R2 has no real folders — "move" = rewrite the key with a folder prefix).
// Preserves the file's path relative to `prefix`. `prefix` is '' or ends '/'.
export function moveKey(key, prefix, folder) {
  const clean = folder.replace(/^\/+|\/+$/g, '').trim();
  const rel = prefix ? key.slice(prefix.length) : key;
  return `${prefix}${clean}/${rel}`;
}

export async function listObjects(prefix = '', bucketId = activeBucket) {
  const params = new URLSearchParams();
  if (prefix) params.set('prefix', prefix);
  params.set('bucket', bucketId);
  const res = await fetch(`/api/list?${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `list failed: ${res.status}`);
  }
  return res.json();
}

export function uploadFile(file, key, onProgress) {
  assertWritable('Upload');
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const form = new FormData();
    form.append('file', file);
    form.append('key', key);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) onProgress?.(e.loaded / e.total);
    });
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          resolve({ ok: true, key });
        }
      } else {
        reject(new Error(`upload failed: ${xhr.status} ${xhr.statusText}`));
      }
    });
    xhr.addEventListener('error', () => reject(new Error('upload network error')));
    xhr.addEventListener('abort', () => reject(new Error('upload aborted')));

    xhr.open('POST', '/api/upload');
    xhr.send(form);
  });
}

export async function deleteObject(key) {
  assertWritable('Delete');
  const params = new URLSearchParams({ key });
  const res = await fetch(`/api/object?${params}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`delete failed: ${res.status}`);
  return res.json();
}

export async function renameObject(from, to) {
  assertWritable('Rename');
  const res = await fetch('/api/rename', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `rename failed: ${res.status}`);
  }
  return res.json();
}
