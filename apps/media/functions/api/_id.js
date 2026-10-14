/**
 * Permanent file ids (plans/2026-10-13-r2-permanent-ids.md). An object lives at `f/<id>.<ext>` and never
 * moves; its folder and name are D1's (`files` in schema.sql).
 *
 * 10 chars of [0-9a-z]: 36^10 ≈ 3.7e15, so a collision in a bucket of thousands is not a real
 * event — and `files.id` is a PRIMARY KEY, so one would fail the insert, never overwrite.
 * Lowercase only, so a URL never depends on case.
 */
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

export function newId(len = 10) {
  return Array.from(crypto.getRandomValues(new Uint8Array(len)), (b) => ALPHABET[b % 36]).join('');
}

/** The R2 key for an id, keeping the name's extension (lowercased) so the URL still says what it is. */
export function keyFor(id, name = '') {
  const dot = name.lastIndexOf('.');
  const ext = dot > 0 ? name.slice(dot).toLowerCase() : '';
  return `f/${id}${ext}`;
}
