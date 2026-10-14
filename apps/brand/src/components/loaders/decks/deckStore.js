import { ADMIN_BASE } from '../../../lib/mediaClient'
import { getPassword, clearPassword, authHeader } from '../../../lib/adminAuth'

/**
 * deckStore — save and load a deck against the shared database.
 *
 * Cloudflare D1, reached through the Pages Functions that already front the
 * bucket (`apps/media/functions/api/decks.js`). Chosen 2026-09-04 over Sanity
 * and Supabase: no new vendor, free at 5 GB / 5M reads / 100k writes a day, and
 * that app already has the Functions runtime, the auth middleware and the CORS
 * allowlist a database would otherwise each need building for.
 *
 * THREE TIERS OF PERSISTENCE, and they are not competing:
 *   localStorage — the AUTOSAVE. Every keystroke, one browser, no network.
 *   deck file    — the PORTABLE copy. Explicit, offline, versionable.
 *   D1           — the SHARED copy. Explicit, survives the machine.
 *
 * The database is deliberately NOT the autosave target. Saving on every edit
 * would spend the 100k daily write budget on keystrokes and would need a
 * credential held open for the session; an explicit save spends one write and
 * asks for the password once, at the moment the user actually meant it.
 *
 * THE CREDENTIAL IS `adminAuth`'s, shared with the notes API and the bucket
 * upload so one sitting asks once rather than three times. Never in the bundle:
 * that would make the bucket and the database writable by anyone with devtools.
 */
const ENDPOINT = `${ADMIN_BASE}/api/decks`

/** Everything the manager needs to list decks — names and dates, not documents. */
export async function listDecks() {
  const res = await fetch(ENDPOINT, { headers: authHeader(getPassword()) })
  if (res.status === 503) throw new Error((await res.json()).error)
  if (res.status === 401) { clearPassword(); throw new Error('That password was not accepted.') }
  if (!res.ok) throw new Error(`List failed: ${res.status}`)
  return (await res.json()).decks ?? []
}

/** One deck, with its document. */
export async function loadDeck(slug) {
  const res = await fetch(`${ENDPOINT}?slug=${encodeURIComponent(slug)}`, { headers: authHeader(getPassword()) })
  if (res.status === 503) throw new Error((await res.json()).error)
  if (res.status === 401) { clearPassword(); throw new Error('That password was not accepted.') }
  if (res.status === 404) throw new Error(`No saved deck called "${slug}".`)
  if (!res.ok) throw new Error(`Load failed: ${res.status}`)
  const body = await res.json()
  if (!Array.isArray(body?.doc?.slides)) throw new Error('The saved deck is malformed.')
  return body
}

/** Upsert. `slides` is the editor's array; the wrapper is what D1 stores. */
export async function saveDeck({ slug, name, slides }) {
  const res = await fetch(ENDPOINT, {
    method: 'PUT',
    headers: { ...authHeader(getPassword()), 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, name, doc: { version: 1, slides } }),
  })
  if (res.status === 503) throw new Error((await res.json()).error)
  if (res.status === 401) { clearPassword(); throw new Error('That password was not accepted.') }
  if (!res.ok) throw new Error(`Save failed: ${res.status}`)
  return res.json()
}
