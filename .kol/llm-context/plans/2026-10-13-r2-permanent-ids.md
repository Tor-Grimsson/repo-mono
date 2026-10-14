# R2 permanent file URLs — media app

**State:** outlined 2026-10-13, reviewed same evening (Fable). Nothing built. Scope: R2 `kol-media` only — the two B2 stores are read-only here and stay untouched.

**D1 is NOT connected.** `wrangler pages download config kol-media-admin` (2026-10-13) shows one binding on the live project: R2 `MEDIA_BUCKET`. The 10-02 plan listed "a D1 database" under account-side work and it was never done. The local wrangler OAuth token cannot list D1 (auth error 10000) — it has no D1 scope.

## The problem

The object key IS the path (`upload.js` puts at `key`). `rename.js` copies to the new key and deletes the old one, so a rename or move changes every URL that pointed at the file.

## The fix, in one line

**The object never moves.** Name and folder live in a table; rename edits the row. That alone makes every URL permanent — no file has to be copied to a new key.

- **Existing objects keep their keys.** `f/<id>.<ext>` is only for NEW uploads, so a name never leaks into a key again.
- **The same D1 carries brand's editors** — `decks` and `notes` tables for the deck + notes editors ported from olina (`2026-10-09-brand-pass.md` §2b). One database, one binding.
- **Table:** D1, one table `files(key PK, folder, name, ext, size, type, created)`. `key` is the R2 object key — `f/<id>.<ext>` for new files, the legacy path for adopted ones. `(folder, name)` unique.
- **Public URL:** `r2.kolkrabbi.io/<key>` — exactly what `kol-media-client`'s `mediaUrl(key)` already builds. Unchanged.
- **Folders are virtual** (derived from the `folder` column). They already are: R2 has none and the API has no folder endpoint, so nothing is lost and no `folders` table is needed.

## 1. Account (the user's)

`wrangler login` again (the token needs the D1 scope) or the dashboard → `wrangler d1 create kol-media` → the `database_id`. The binding itself is repo-side: `[[d1_databases]] binding = "MEDIA_DB"` in `apps/media/wrangler.toml`, applied by `pnpm media:deploy`. Schema: one `schema.sql`, `wrangler d1 execute kol-media --remote --file`.

## 2. API (`apps/media/functions/api/`)

- **upload** — new id (10-char base62 from `crypto.getRandomValues`), put at `f/<id>.<ext>`, insert row. `keepOriginals` copies land the same way (their own id, `folder/original`).
- **list?prefix=** — rows where `folder = prefix` (+ subfolders derived from deeper rows). Response keeps `{ key, contentType, size }` and adds `path` (`folder/name`). **Adoption, same call:** list R2 under `prefix` (as today, excluding `f/`); any key with no row → insert with `key = path`; any legacy row under `prefix` whose object is gone → delete the row. This is what keeps `bucket-r2 up` / `rm` (dotfiles, writes straight to R2) visible and honest.
- **rename** — `{ key, to }` → update `folder`/`name` of the row. No copy, no delete. Folder rename = one `UPDATE … WHERE folder = ? OR folder LIKE ?/%`.
- **object (delete)** / **download** — by `key`, as today; download sends the row's `name` as the filename.

## 3. Migration

None. Adoption on first list registers every existing object at its current key. Nothing copied, nothing deleted, no URL changes.

## 4. Clients — one ticket to kol-ds-ui

`MediaLibrary variant="explorer"` + `kol-media-client`: display `path` when present (fall back to `key`), group folders by `path`, send `key` on rename/delete. `mediaUrl` untouched. Backwards compatible — an API without `path` behaves as today. Then bump media (and brand, which reads only).

## 5. Verify

Upload → URL is `/f/<id>.<ext>`. Rename it → explorer shows the new name, old URL still serves. `bucket-r2 up` a file → it appears under its path on next list. `bucket-r2 rm` it → it disappears.

## Decided (agent picks, say if wrong)

- D1, not R2 custom metadata: metadata cannot be updated in place (every rename would re-copy the object) and listing by folder would scan the bucket.
- Legacy keys are not rewritten to ids: the object key is already permanent once rename stops moving it; rewriting would cost a copy per object and a cutover for nothing.
