import { listB2 } from './_b2.js';
import { newId } from './_id.js';
import { splitPath } from './_files.js';

// The response shape below is frozen — kol-media-client and the DS MediaLibrary read
// data.objects[].{key,contentType,size} and nothing guards it. Keep it.
//
// R2 is listed from D1 (plans/2026-10-13-r2-permanent-ids.md): `key` is the file's PATH (folder +
// name — the pages build their folders from it) and `storageKey` is the permanent R2 key every URL
// is built on. Moving a file changes the first, never the second. The B2 pair is listed from B2
// as before — read-only here, nothing of theirs is in the table.

// ?bucket= ids the UI sends → the real B2 bucket name. 'r2' is the binding path.
const B2_BUCKETS = {
  b2: 'kolkrabbi',
  b2vault: 'kol-vault-media',
};

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const prefix = url.searchParams.get('prefix') || '';
  const cursor = url.searchParams.get('cursor') || undefined;
  const bucket = url.searchParams.get('bucket') || 'r2';

  let payload;
  try {
    payload = B2_BUCKETS[bucket]
      ? await listB2(env, { bucket: B2_BUCKETS[bucket], prefix, cursor })
      : await listFiles(env, { prefix });
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 502, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  /* no-store for R2: the page re-lists after every move, rename and upload, and a 30s public cache
   * put a moved file back where it was for half a minute. B2 keeps the old 30s. */
  return Response.json(payload, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': B2_BUCKETS[bucket] ? 'public, max-age=30' : 'no-store',
    },
  });
};

async function listFiles(env, { prefix }) {
  await adopt(env, prefix);

  const { results } = await env.DB.prepare(
    `SELECT id, key, folder, name, size, type, uploaded, thumb FROM files
     WHERE substr(folder || name, 1, length(?1)) = ?1
     ORDER BY folder, name`
  ).bind(prefix).all();

  return {
    objects: results.map((f) => ({
      key: f.folder + f.name,
      storageKey: f.key,
      size: f.size,
      uploaded: new Date(f.uploaded).toISOString(),
      contentType: f.type,
      etag: f.id,
      ...(f.thumb && { thumb: f.thumb }),
    })),
    truncated: false,
    cursor: null,
  };
}

/* ADOPTION — the bucket stays writable from outside the API (the dotfiles `bucket-r2 up` / `rm`
 * put and delete straight on R2), so under the prefix being listed: every object with no row gets
 * one at key = path, and every legacy row (key = path, not `f/`) whose object is gone loses it.
 * `f/` objects are the API's own and never go through here. The bucket is small (434 objects,
 * 2026-10-13) — one R2 page per list call, writes only when something changed.
 *
 * ponytail: an adopted path whose (folder, name) is already taken by a renamed `f/` row is IGNORED
 * and stays invisible — rename the row or the object. Surface it if it ever happens. */
async function adopt(env, prefix) {
  const seen = new Map();
  let cursor;
  do {
    const page = await env.MEDIA_BUCKET.list({ prefix, cursor, limit: 1000, include: ['httpMetadata'] });
    for (const o of page.objects) if (!o.key.startsWith('f/') && !o.key.endsWith('/')) seen.set(o.key, o);
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);

  const { results: rows } = await env.DB.prepare(
    `SELECT key FROM files WHERE substr(key, 1, length(?1)) = ?1 AND substr(key, 1, 2) != 'f/'`
  ).bind(prefix).all();
  const known = new Set(rows.map((r) => r.key));

  const stmts = [];
  for (const [key, o] of seen) {
    if (known.has(key)) continue;
    const { folder, name } = splitPath(key);
    stmts.push(
      env.DB.prepare('INSERT OR IGNORE INTO files (id, key, folder, name, size, type, uploaded) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .bind(newId(), key, folder, name, o.size, o.httpMetadata?.contentType ?? null, o.uploaded ? new Date(o.uploaded).getTime() : Date.now())
    );
  }
  for (const key of known) if (!seen.has(key)) stmts.push(env.DB.prepare('DELETE FROM files WHERE key = ?').bind(key));

  for (let i = 0; i < stmts.length; i += 100) await env.DB.batch(stmts.slice(i, i + 100));
}

export const onRequestOptions = () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
