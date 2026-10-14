import { sanitizePath, splitPath } from './_files.js';

/* Rename and move are one verb: a new path. They edit D1 only — the R2 key, and so the URL, never
 * changes (plans/2026-10-13-r2-permanent-ids.md). A path ending in '/' is a folder, and everything
 * under it moves.
 *
 * ponytail: the `name` + `folder` metadata on an `f/` object stays what it was at upload — updating
 * it means rewriting the whole object. D1 is the truth. */
export const onRequestPost = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const from = sanitizePath(body?.from);
  const to = sanitizePath(body?.to);
  if (!from) return Response.json({ error: 'Missing from' }, { status: 400 });
  if (!to) return Response.json({ error: 'Invalid destination key' }, { status: 400 });
  if (from === to) return Response.json({ ok: true, key: from, unchanged: true });

  const folderMove = from.endsWith('/');
  if (folderMove !== to.endsWith('/')) {
    return Response.json({ error: 'A file and a folder cannot swap' }, { status: 400 });
  }
  if (folderMove && to.startsWith(from)) {
    return Response.json({ error: 'A folder cannot move into itself' }, { status: 400 });
  }

  try {
    if (folderMove) {
      const res = await env.DB
        .prepare('UPDATE files SET folder = ?1 || substr(folder, length(?2) + 1) WHERE substr(folder, 1, length(?2)) = ?2')
        .bind(to, from)
        .run();
      if (!res.meta.changes) return Response.json({ error: 'Source not found' }, { status: 404 });
    } else {
      const a = splitPath(from);
      const b = splitPath(to);
      const res = await env.DB.prepare('UPDATE files SET folder = ?, name = ? WHERE folder = ? AND name = ?')
        .bind(b.folder, b.name, a.folder, a.name).run();
      if (!res.meta.changes) return Response.json({ error: 'Source not found' }, { status: 404 });
    }
  } catch (err) {
    // (folder, name) is unique — the index refuses a move onto an existing file
    if (/UNIQUE/i.test(err.message)) return Response.json({ error: 'Destination already exists' }, { status: 409 });
    throw err;
  }

  return Response.json({ ok: true, from, to });
};
