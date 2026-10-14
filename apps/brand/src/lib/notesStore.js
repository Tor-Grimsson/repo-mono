import { ADMIN_BASE } from './mediaClient'
import { getPassword, clearPassword, authHeader } from './adminAuth'

/**
 * notesStore — the notes API, from the brand app.
 *
 * The endpoint is the media admin's Pages Function, so there is one origin, one
 * auth middleware and one CORS allowlist rather than three. The credential is
 * `adminAuth`'s, shared with the deck save and the bucket upload — see that file
 * for why it is held per TAB and why this is a stopgap for Cloudflare Access.
 */
const ENDPOINT = `${ADMIN_BASE}/api/notes`

async function call(path, init = {}) {
  const password = getPassword()
  if (!password) throw new Error('Cancelled.')

  const res = await fetch(`${ENDPOINT}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Basic ${btoa(`admin:${password}`)}`,
    },
  })

  if (res.status === 401) {
    clearPassword()   /* so the next call asks again rather than failing forever */
    throw new Error('That password was not accepted.')
  }
  if (res.status === 503) throw new Error((await res.json()).error)
  if (res.status === 404) throw new Error('No such note.')
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

/** Titles and dates only — the list never ships note bodies. */
export const listNotes = ({ favouritesOnly = false } = {}) =>
  call(favouritesOnly ? '?favourite=1' : '').then((r) => r.notes ?? [])

export const loadNote = (slug) => call(`?slug=${encodeURIComponent(slug)}`)

export const saveNote = (note) =>
  call('', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })

export const deleteNote = (slug) =>
  call(`?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' })

/* `Some Title` → `some-title`, and a timestamp when that leaves nothing. The
   slug is the primary key, so two notes called "Notes" must not collide. */
export const slugFor = (title) => {
  const base = (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return base ? `${base}-${Date.now().toString(36).slice(-4)}` : `note-${Date.now().toString(36)}`
}
