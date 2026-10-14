import { ADMIN_BASE, BUCKETS } from '../../../lib/mediaClient'
import { getPassword, clearPassword, authHeader } from '../../../lib/adminAuth'

/**
 * uploadToBucket — put a file from the user's disk into `kol-media`.
 *
 * THE CREDENTIAL IS NEVER IN THE BUNDLE. ARCHITECTURE §14 makes this app
 * read-only against the bucket precisely because writes belong to the admin,
 * which sits behind Basic auth. Shipping that password so the brand app could
 * upload would put bucket-write in every visitor's devtools. So the password is
 * ASKED FOR at upload time, used for that one request, and never stored — not in
 * localStorage, not in a module, not in a React state that outlives the call.
 *
 * The user is the one person who has it (Bitwarden: "kol-media admin"), and
 * being asked once per session is the honest cost of not having a public write
 * endpoint.
 *
 * The other half of this lives in `apps/media/functions/api/_cors.js`: the write
 * routes had no CORS at all, so the browser blocked this request before the
 * password was ever checked. The preflight also has to bypass the auth
 * middleware, because a browser sends OPTIONS with no Authorization header.
 *
 * ponytail: no upload progress. A slide image is a few hundred KB on a
 * connection that already served the app; a progress bar for a two-second
 * request is chrome with nothing to say.
 */

/* Where a deck's own imagery lands. Kept apart from `projects/` so an upload
   from the editor can never collide with the imported project media. */
const PREFIX = 'decks'

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-|-$/g, '')

/**
 * @param {File} file      the picked file
 * @param {string} password the admin password, from a prompt — never persisted
 * @param {string} deckSlug used to group the upload
 * @returns {Promise<string>} the public URL of the stored object
 */
export async function uploadToBucket(file, deckSlug = 'deck') {
  const password = getPassword()
  if (!file) throw new Error('No file.')
  if (!password) throw new Error('Upload needs the media admin password.')

  /* a timestamp, so re-uploading a file called `cover.jpg` never silently
     replaces the one a different slide already points at */
  const key = `${PREFIX}/${slugify(deckSlug)}/${Date.now()}-${slugify(file.name)}`

  const body = new FormData()
  body.append('file', file)
  body.append('key', key)

  const res = await fetch(`${ADMIN_BASE}/api/upload`, {
    method: 'POST',
    /* the header, not a cookie — so the request is not credentialed and the
       admin's allowlisted `Access-Control-Allow-Origin` is enough */
    headers: authHeader(password),
    body,
  })

  if (res.status === 401) { clearPassword(); throw new Error('That password was not accepted by the media admin.') }
  if (!res.ok) throw new Error(`Upload failed: ${res.status} ${await res.text().catch(() => '')}`.trim())

  const json = await res.json().catch(() => ({}))
  if (!json.key) throw new Error('The admin accepted the upload but returned no key.')
  /* `storageKey` is the permanent R2 key (the D1 arc, 2026-10-13); `key` is the path and would break on a rename */
  return `${BUCKETS.r2.publicBase}/${json.storageKey ?? json.key}`
}
