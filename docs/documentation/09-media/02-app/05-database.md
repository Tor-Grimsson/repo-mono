---
title: The database — permanent keys, decks, notes
type: reference
status: active
updated: 2026-10-14
verified: 2026-10-14
description: The one Cloudflare D1 database behind the media admin — why an R2 object never moves once uploaded, how rename and move became row edits, how objects written straight into the bucket are adopted, and the decks + notes endpoints brand's editors write through.
aliases:
  - database
  - d1
  - permanent-keys
  - storageKey
tags:
  - domain/cloud
  - project/kol-monorepo
  - provider/cloudflare
covers:
  - the files table and the permanent-key rule
  - the list contract (key = path, storageKey = R2 key)
  - adoption and pruning of CLI-written objects
  - /api/decks and /api/notes
  - what is not in the database
sources:
  - apps/media/schema.sql
  - apps/media/wrangler.toml
  - apps/media/functions/api/list.js
  - apps/media/functions/api/upload.js
  - apps/media/functions/api/rename.js
  - apps/media/functions/api/decks.js
  - apps/media/functions/api/notes.js
related:
  - "[[INDEX|app]]"
  - "[[03-consuming|consuming the buckets]]"
  - "[[../01-buckets/01-r2-kol-media|R2 — kol-media]]"
---

# The database — permanent keys, decks, notes

One Cloudflare D1 database, `kol-media`, bound to the Pages project as `DB` (`apps/media/wrangler.toml`; schema in `apps/media/schema.sql`). It arrived 2026-10-13 for one reason: **an R2 object's key was its path, so every rename or move changed the URL of the file.** The database holds the name; the bucket holds the bytes; the two never trade places again. The same database carries the slide decks and the notes that brand.kolkrabbi.io's editors save.

## The rule

| | Before (2026-10-13) | Now |
|---|---|---|
| Where the name lives | the R2 key (`video/x.mp4`) | the `files` row (`folder` + `name`) |
| What a rename does | copy the object to the new key, delete the old — every URL breaks | `UPDATE files SET folder, name` — the object is untouched |
| New upload's key | its path | `f/<id>.<ext>`, ten lowercase base-36 characters — a name never enters a key again |
| Existing objects | — | keep the key they had; it is permanent the moment rename stops moving it |
| Public URL | `r2.kolkrabbi.io/<path>` | `r2.kolkrabbi.io/<storageKey>` |

No migration ran. Adoption (below) registered all 434 objects at their current keys on the first live list, so every URL that existed on 2026-10-13 still serves.

## The list contract

`GET /api/list?bucket=r2` lists from D1, not from the bucket. Each object keeps the three frozen fields and gains one:

```json
{ "key": "video/x.mp4", "storageKey": "f/birelm59ff.mp4", "size": 0, "contentType": "video/mp4", "uploaded": "…", "etag": "<id>" }
```

- **`key` is the PATH** — `folder/name`, what the explorer builds its folders from and what every write endpoint still speaks (`upload` takes a path, `rename` takes `{ from, to }` paths, `object` and `download` take a path).
- **`storageKey` is the R2 key** — what a URL is built on. For an adopted object it equals `key` until the first rename; for anything uploaded since it is `f/<id>.<ext>`.
- `kol-media-client ≥ 0.6.0` `mediaUrl(row)` prefers `storageKey`; a plain key string builds as before. `MediaLibrary` (kol-component ≥ 0.257.0) resolves paths to storage keys through the listed rows, so thumbs, previews, posters and Copy URL all land on the permanent key.

The B2 stores are untouched: `bucket=b2` and `bucket=b2vault` still list from B2, path-keyed, read-only.

## Adoption and pruning

The bucket stays writable from outside the API — the dotfiles `bucket-r2 up` / `rm` put and delete straight on R2 — so the table is the truth for names, not for existence. On every list under a prefix:

- an object with no row is **adopted**: a row with `key = path`, folder and name split from it;
- a legacy row (key = path, not `f/`) whose object is gone is **pruned**.

`f/` objects are the API's own and never go through adoption. The bucket is small (434 objects), so this is one R2 page per list and writes only when something changed. An adopted path whose `(folder, name)` is already taken by a renamed row is ignored and stays invisible — rename either side.

## Decks and notes

Both behind the admin password (`_middleware.js`), both cross-origin for brand.kolkrabbi.io (`_cors.js` allowlist; the preflight bypasses auth because a browser sends `OPTIONS` without the header).

| Endpoint | Shape | Notes |
|---|---|---|
| `GET /api/decks` · `?slug=` · `PUT` | `{ slug, name, doc: { version, slides } }` | the list omits `doc`; `doc` is the whole deck as JSON — nothing queries inside it |
| `GET /api/notes` · `?slug=` · `?favourite=1` · `PUT` · `DELETE ?slug=` | `{ slug, title, body, favourite, assets, created_at, updated_at }` | the list carries a 240-character `preview`; `body` is markdown; `assets` are R2 KEYS, not URLs |

An `events` table logs one row per save or delete — intentions, never keystrokes (the free tier is 100k row writes a day).

## Not in the database

- Thumbnails (`thumb`) are a regenerable cache a video upload may carry; losing one costs a grey glyph.
- Empty folders — a folder is derived from its rows, as it was derived from prefixes before.
- The B2 stores, Sanity, and anything the website renders.
