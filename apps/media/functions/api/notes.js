import { withCors } from './_cors.js';

/**
 * /api/notes — the brand app's notes, in D1.
 *
 *   GET    /api/notes                → [{ slug, title, favourite, updated_at }]  (no body)
 *   GET    /api/notes?slug=x         → the note, body and assets included
 *   PUT    /api/notes                → upsert { slug, title, body, favourite, assets }
 *   DELETE /api/notes?slug=x         → remove one
 *
 * Deliberately the same shape as `decks.js`: same auth (the middleware's), same
 * CORS helper, same "the list omits the big column" rule. A second route that
 * invented its own conventions would be two things to remember.
 *
 * THE LIST OMITS `body` for the same reason decks omits `doc` — a notes index
 * should not ship every note's full text to render titles. It DOES return a
 * `preview`: the first 240 characters, cut in SQL. A document listing whose
 * cards say nothing about the document is a list of filenames, and the card
 * variant has a summary slot built for exactly this. 240 chars is free; the
 * whole body is not.
 *
 * `favourite` crosses the wire as a BOOLEAN and is stored as 0/1, because SQLite
 * has no boolean type. Converting at this edge means no caller ever has to know
 * that, and nobody writes `favourite === 1` in a component.
 */

const json = (data, status = 200) => Response.json(data, { status });
const METHODS = 'GET, PUT, DELETE, OPTIONS';

const noDb = () => json({
  error: 'D1 is not bound. Create the database and set database_id in wrangler.toml.',
}, 503);

/* the row as the client wants it: favourite boolean, assets parsed */
const toNote = (row, withBody) => ({
  slug: row.slug,
  title: row.title,
  favourite: row.favourite === 1,
  updated_at: row.updated_at,
  created_at: row.created_at,
  ...(row.preview !== undefined ? { preview: row.preview } : {}),
  ...(withBody ? { body: row.body, assets: JSON.parse(row.assets || '[]') } : {}),
});

export const onRequestGet = async ({ request, env }) => {
  if (!env.DB) return withCors(noDb(), request, METHODS);
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const favouritesOnly = url.searchParams.get('favourite') === '1';

  if (!slug) {
    const sql = favouritesOnly
      ? "SELECT slug, title, favourite, created_at, updated_at, substr(body, 1, 240) AS preview FROM notes WHERE favourite = 1 ORDER BY updated_at DESC"
      : "SELECT slug, title, favourite, created_at, updated_at, substr(body, 1, 240) AS preview FROM notes ORDER BY updated_at DESC";
    const { results } = await env.DB.prepare(sql).all();
    return withCors(json({ notes: (results ?? []).map((r) => toNote(r, false)) }), request, METHODS);
  }

  const row = await env.DB
    .prepare('SELECT slug, title, body, favourite, assets, created_at, updated_at FROM notes WHERE slug = ?')
    .bind(slug)
    .first();
  if (!row) return withCors(json({ error: 'No such note' }, 404), request, METHODS);
  return withCors(json(toNote(row, true)), request, METHODS);
};

export const onRequestPut = async ({ request, env }) => {
  if (!env.DB) return withCors(noDb(), request, METHODS);

  let body;
  try {
    body = await request.json();
  } catch {
    return withCors(json({ error: 'Body must be JSON' }, 400), request, METHODS);
  }

  const { slug, title = '', body: text = '', favourite = false, assets = [] } = body ?? {};
  if (!slug || typeof slug !== 'string') return withCors(json({ error: 'Missing slug' }, 400), request, METHODS);
  if (!Array.isArray(assets)) return withCors(json({ error: 'assets must be an array of keys' }, 400), request, METHODS);

  const now = Date.now();
  await env.DB
    .prepare(`INSERT INTO notes (slug, title, body, favourite, assets, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(slug) DO UPDATE SET
                title = excluded.title,
                body = excluded.body,
                favourite = excluded.favourite,
                assets = excluded.assets,
                updated_at = excluded.updated_at`)
    /* created_at is only used by the INSERT branch; the upsert leaves the
       original in place, which is what makes "created" mean created */
    .bind(slug, title, text, favourite ? 1 : 0, JSON.stringify(assets), now, now)
    .run();

  await env.DB.prepare('INSERT INTO events (at, kind, subject) VALUES (?, ?, ?)')
    .bind(now, 'note.save', slug).run();

  return withCors(json({ ok: true, slug, updated_at: now }), request, METHODS);
};

export const onRequestDelete = async ({ request, env }) => {
  if (!env.DB) return withCors(noDb(), request, METHODS);
  const slug = new URL(request.url).searchParams.get('slug');
  if (!slug) return withCors(json({ error: 'Missing slug' }, 400), request, METHODS);

  const res = await env.DB.prepare('DELETE FROM notes WHERE slug = ?').bind(slug).run();
  /* report whether anything was actually removed — a DELETE of a missing row
     succeeds in SQL, and a caller that trusts `ok` would show a false success */
  const removed = (res.meta?.changes ?? 0) > 0;
  if (removed) {
    await env.DB.prepare('INSERT INTO events (at, kind, subject) VALUES (?, ?, ?)')
      .bind(Date.now(), 'note.delete', slug).run();
  }
  return withCors(json({ ok: true, removed }), request, METHODS);
};
