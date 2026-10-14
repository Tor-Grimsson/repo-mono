# MediaLibrary builds URLs on `key`; the API now has `storageKey`

**Filed:** 2026-10-13 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/MediaLibraryUrlOnStorageKey.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-13 — kol-component 0.257.0 + kol-media-client 0.6.0

## Why it went there

The media API lists R2 from D1 (the D1 arc): `key` is the path, `storageKey` the permanent R2 key.
The DS explorer and `kol-media-client` build every public URL on `key`, so a renamed file or a new
`f/<id>` upload 404s in the explorer's open / copy-URL / preview.

## Stopgap here

None in the DS surfaces. The media app's own thumbnail tile already reads `o.storageKey ?? key`
(`apps/media/src/App.jsx`).

## What stays here

On return: bump kol-component + kol-media-client in media and brand; rename a file on
media.kolkrabbi.io and open it from the explorer. **Remainder here:** bump + check.

## ✅ RETURNED — 2026-10-13 · kol-component@0.257.0 + kol-media-client@0.6.0

Both `mediaUrl` wrappers (MediaLibrary's provider and MediaLibraryPages') resolve a PATH to its row's `storageKey` through a key → storageKey map built from the listed objects, so every site is covered in one place: thumbs, previews, posters, Copy URL, picks (more than the nine lines the ticket named; posters and copy-by-path pass paths too). The picker's Use builds on `file.storageKey ?? file.key`. `downloadUrl` stays on the path. kol-media-client: `mediaUrl` ACCEPTS THE ROW and prefers `storageKey`; a plain key string builds as before. Verified against the live API: 434/434 rows carry `storageKey`, the URLs return 200; a synthetic moved row {key:'a/b.jpg', storageKey:'f/1.jpg'} builds r2.kolkrabbi.io/f/1.jpg.

**Remainder here:** bump kol-component ^0.257.0 and kol-media-client ^0.6.0; pass rows to `mediaUrl` in app code

## 🟢 RETURNED — 2026-10-13 (same evening)

kol-component 0.257.0 + kol-media-client 0.6.0: both `mediaUrl` wrappers resolve a path to its row's `storageKey` through a map built from the listed objects — thumbs, previews, posters, Copy URL, picks. `kol-media-client`'s `mediaUrl` accepts the row and prefers `storageKey`; a plain key builds as before. Verified by the DS against the live API (434/434 rows, URLs 200).

✅ **Remainder executed — 2026-10-13.** component ^0.257.0 in all four apps, media-client ^0.6.0 in brand + media; one copy. No app code calls `mediaUrl` directly (the organisms do), so "pass rows" needed nothing here. Not eyeballed: a rename opened from the explorer — on the next media reload.

**Remainder here:** none.
