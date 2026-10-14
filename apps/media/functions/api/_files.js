/**
 * Paths ⇄ D1 rows (plans/2026-10-13-r2-permanent-ids.md). The media app still speaks in PATHS —
 * 'projects/eytys/01.jpg' — because the DS pages build their folders from them. A path is a
 * `files` row's `folder` + `name`; the row carries the permanent R2 key the bytes live at.
 */

/** A clean path, or null. No leading slash, no '.' or '..' segments. */
export function sanitizePath(input) {
  const stripped = String(input ?? '').replace(/^\/+/, '').trim();
  if (!stripped) return null;
  if (stripped.split('/').some((seg) => seg === '..' || seg === '.')) return null;
  return stripped;
}

/** 'projects/eytys/01.jpg' → { folder: 'projects/eytys/', name: '01.jpg' }. A folder always ends in '/'. */
export function splitPath(path) {
  const i = path.lastIndexOf('/');
  return { folder: path.slice(0, i + 1), name: path.slice(i + 1) };
}

export function rowFor(env, path) {
  const { folder, name } = splitPath(path);
  return env.DB.prepare('SELECT * FROM files WHERE folder = ? AND name = ?').bind(folder, name).first();
}
