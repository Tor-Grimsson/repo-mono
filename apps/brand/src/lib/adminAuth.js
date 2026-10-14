/**
 * adminAuth — the one place the media admin password is asked for and held.
 *
 * Three things need it: the notes API, the deck save, and uploading a file to
 * the bucket. Each used to prompt on its own, so a single sitting could ask
 * three times — and being asked repeatedly is exactly what makes people paste a
 * password somewhere permanent. One module, one prompt.
 *
 * `sessionStorage`, deliberately, and not the two obvious alternatives:
 *   a module variable — dies on every reload, so navigating between notes asked
 *     again each time. This is what it replaced.
 *   `localStorage`     — survives forever on disk, in a browser profile that is
 *     backed up and synced. A shared admin credential does not belong there.
 * `sessionStorage` is scoped to ONE TAB and cleared when that tab closes.
 *
 * THIS IS A STOPGAP. Cloudflare Access is free to 50 users, puts a real login in
 * front of the origin and passes the signed-in identity to the app in a header:
 * no prompt, no shared secret, and `events.actor` / `decks.updated_by` finally
 * have something real to record. Everything here goes away when that is on.
 */
const KEY = 'kol.admin'

/** Ask once per tab. Returns null if the prompt is dismissed. */
export function getPassword() {
  try {
    const held = sessionStorage.getItem(KEY)
    if (held) return held
  } catch { /* private mode: fall through and ask each time */ }

  const entered = window.prompt('Media admin password (kept for this tab only)')
  if (!entered) return null
  try { sessionStorage.setItem(KEY, entered) } catch { /* ask again next time */ }
  return entered
}

/** Drop it. Called on a 401 so a wrong password re-asks rather than looping. */
export function clearPassword() {
  try { sessionStorage.removeItem(KEY) } catch { /* nothing held */ }
}

/** The Basic header every admin call carries. */
export const authHeader = (password) => ({ Authorization: `Basic ${btoa(`admin:${password}`)}` })
