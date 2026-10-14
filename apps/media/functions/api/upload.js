import { newId, keyFor } from './_id.js';
import { sanitizePath, splitPath } from './_files.js';

/* `key` in the form is the PATH the upload box chose. The bytes go to a permanent key
 * (`f/<id>.<ext>`) and the path becomes the D1 row's folder + name (plans/2026-10-13-r2-permanent-ids.md). */
export const onRequestPost = async ({ request, env }) => {
  const form = await request.formData();
  const file = form.get('file');
  const rawKey = form.get('key');

  if (!file || typeof file === 'string') {
    return Response.json({ error: 'Missing file' }, { status: 400 });
  }
  if (!rawKey || typeof rawKey !== 'string') {
    return Response.json({ error: 'Missing key' }, { status: 400 });
  }

  /* An optional first-frame thumbnail the upload box drew for a video. Admin-only, but still checked:
   * it is rendered as an <img src>, so it must be a small JPEG data URL and nothing else. */
  const rawThumb = form.get('thumb');
  const thumb = typeof rawThumb === 'string' && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(rawThumb) && rawThumb.length <= 12000
    ? rawThumb : null;

  const path = sanitizePath(rawKey);
  if (!path || path.endsWith('/')) {
    return Response.json({ error: 'Invalid key' }, { status: 400 });
  }
  const { folder, name } = splitPath(path);

  /* Same folder + name OVERWRITES IN PLACE: same id, same key, same URL, new bytes — what an upload
   * over an existing file did before, so a replaced image updates everywhere it is linked. */
  const existing = await env.DB.prepare('SELECT id, key FROM files WHERE folder = ? AND name = ?').bind(folder, name).first();
  const id = existing?.id ?? newId();
  const key = existing?.key ?? keyFor(id, name);
  const contentType = file.type || 'application/octet-stream';

  /* R2 first: if D1 then fails, the orphan is an unlisted object, never a listed file with no bytes.
   * `name` + `folder` ride on the object so D1 can be rebuilt from the bucket alone. */
  await env.MEDIA_BUCKET.put(key, file, {
    httpMetadata: { contentType },
    customMetadata: { name, folder },
  });
  await env.DB.prepare(
    `INSERT INTO files (id, key, folder, name, size, type, uploaded, thumb) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET size = excluded.size, type = excluded.type, uploaded = excluded.uploaded, thumb = excluded.thumb`
  ).bind(id, key, folder, name, file.size, contentType, Date.now(), thumb).run();

  return Response.json({ ok: true, key: path, storageKey: key, size: file.size, contentType: file.type || null });
};
