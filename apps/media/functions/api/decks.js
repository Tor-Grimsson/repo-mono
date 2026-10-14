import { withCors } from './_cors.js';

/**
 * /api/decks — read and write slide decks in D1.
 *
 *   GET  /api/decks           → [{ slug, name, updated_at }]     (no `doc`)
 *   GET  /api/decks?slug=x    → { slug, name, doc, updated_at }
 *   PUT  /api/decks           → upsert { slug, name, doc }
 *
 * The list deliberately omits `doc`. A deck is hundreds of KB of JSON and the
 * manager only needs names and dates; returning every document to render a list
 * would burn the read budget and the client's memory for nothing.
 *
 * AUTH IS THE MIDDLEWARE'S, not this file's. `_middleware.js` already gates
 * everything except `GET /api/list` behind the admin password and answers the
 * CORS preflight. So a READ here is gated too — decks are client work, not
 * public like the bucket listing. If a public read is ever wanted, it is one
 * line in the middleware, not a change here.
 *
 * `DB` is bound in wrangler.toml. When it is missing the routes say so plainly
 * rather than throwing a TypeError on `env.DB.prepare`, because the most likely
 * reason is that nobody has created the database yet.
 */

const json = (data, status = 200) => Response.json(data, { status });

const noDb = () => json({
  error: 'D1 is not bound. Create the database and set database_id in wrangler.toml.',
}, 503);

export const onRequestGet = async ({ request, env }) => {
  if (!env.DB) return withCors(noDb(), request, 'GET, PUT, OPTIONS');

  const slug = new URL(request.url).searchParams.get('slug');

  if (!slug) {
    const { results } = await env.DB
      .prepare('SELECT slug, name, updated_at, updated_by FROM decks ORDER BY updated_at DESC')
      .all();
    return withCors(json({ decks: results ?? [] }), request, 'GET, PUT, OPTIONS');
  }

  const row = await env.DB
    .prepare('SELECT slug, name, doc, updated_at, updated_by FROM decks WHERE slug = ?')
    .bind(slug)
    .first();

  if (!row) return withCors(json({ error: 'No such deck' }, 404), request, 'GET, PUT, OPTIONS');
  /* `doc` is stored as TEXT; parse at the edge so every caller does not */
  return withCors(json({ ...row, doc: JSON.parse(row.doc) }), request, 'GET, PUT, OPTIONS');
};

export const onRequestPut = async ({ request, env }) => {
  if (!env.DB) return withCors(noDb(), request, 'GET, PUT, OPTIONS');

  let body;
  try {
    body = await request.json();
  } catch {
    return withCors(json({ error: 'Body must be JSON' }, 400), request, 'GET, PUT, OPTIONS');
  }

  const { slug, name = '', doc } = body ?? {};
  if (!slug || typeof slug !== 'string') return withCors(json({ error: 'Missing slug' }, 400), request, 'GET, PUT, OPTIONS');
  if (!doc || typeof doc !== 'object') return withCors(json({ error: 'Missing doc' }, 400), request, 'GET, PUT, OPTIONS');

  const now = Date.now();
  await env.DB
    .prepare(`INSERT INTO decks (slug, name, doc, updated_at)
              VALUES (?, ?, ?, ?)
              ON CONFLICT(slug) DO UPDATE SET name = excluded.name, doc = excluded.doc, updated_at = excluded.updated_at`)
    .bind(slug, name, JSON.stringify(doc), now)
    .run();

  /* One event per SAVE — an intention, not an interaction. See schema.sql on
     the write budget: this is safe, a per-keystroke log would not be. */
  await env.DB
    .prepare('INSERT INTO events (at, kind, subject) VALUES (?, ?, ?)')
    .bind(now, 'deck.save', slug)
    .run();

  return withCors(json({ ok: true, slug, updated_at: now }), request, 'GET, PUT, OPTIONS');
};
