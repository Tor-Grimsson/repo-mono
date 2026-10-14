import { rowFor, sanitizePath } from './_files.js';

/* `key` is the file's PATH. Its row names the permanent R2 key; both go. A path ending in '/' is a
 * FOLDER: every file under it goes. The page confirms that before it calls. */
export const onRequestDelete = async ({ request, env }) => {
  const url = new URL(request.url);
  const path = sanitizePath(url.searchParams.get('key'));
  if (!path) {
    return Response.json({ error: 'Missing key' }, { status: 400 });
  }

  if (path.endsWith('/')) {
    const { results } = await env.DB.prepare('SELECT id, key FROM files WHERE substr(folder, 1, length(?1)) = ?1').bind(path).all();
    // R2 deletes up to 1000 keys a call; a folder here is tens of files
    for (let i = 0; i < results.length; i += 1000) await env.MEDIA_BUCKET.delete(results.slice(i, i + 1000).map((r) => r.key));
    await env.DB.prepare('DELETE FROM files WHERE substr(folder, 1, length(?1)) = ?1').bind(path).run();
    return Response.json({ ok: true, key: path, files: results.length });
  }

  const row = await rowFor(env, path);
  if (row) {
    await env.MEDIA_BUCKET.delete(row.key);
    await env.DB.prepare('DELETE FROM files WHERE id = ?').bind(row.id).run();
  }
  return Response.json({ ok: true, key: path });
};
