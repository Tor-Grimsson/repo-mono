# An upload asks "web-optimise? keep originals?" in one KOL dialog; kol-media-client converts

**Filed:** 2026-10-09 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/upload-dialog-optimise-and-keep-originals.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-09

## Why it went there

`apps/media` uploads byte for byte (`functions/api/upload.js`); R2 is 1.38 GB, mostly 2.6 MB renders.
kol-ds-ui's `15-media-uploads.md` names the second consumer of olina's recipe as the trigger to lift
it into kol-media-client — that is us. The user wants it asked, not silent: one dialog with
"Optimise" and "Keep originals" toggles. The dialog is the DS `useModal` (what fxr shows); the toggle
row is not in it yet.

## Stopgap here

None, on purpose.

## What stays here

Once it ships: bump kol-media-client + kol-component in `apps/media`; in `App.jsx` (the `onDropFiles`
path, `:174`) and `UploadZone.jsx`, when `isOptimisable` hits any file, `confirm` with the two toggles
(defaults from the last choice per bucket, in `lib/settings.js`), run `prepareUpload`, put each
object through `uploadFile`; render, drop a PNG / a JPEG / an MP4, redeploy media. **Close this
receipt in the same turn.**

**Remainder here:** bump kol-media-client to ^0.5.0 and kol-component to ^0.248.0; wire `onDropFiles` + `UploadZone` to `isOptimisable` → `confirm(…, { options })` → `prepareUpload` → `uploadFile`; drop a PNG / a JPEG / an MP4; redeploy media.

## Answered — 2026-10-09

kol-ds-ui closed it as **kol-media-client 0.5.0 + kol-component 0.248.0**: `prepareUpload(file, { folder, optimise, keepOriginals })` → `[{ key, blob, thumb? }]` (alpha kept as WebP; any web-sized still left as is; width steps down past q0.4 so ≤500 KB holds) and `isOptimisable(file)`; `useModal().confirm(title, { options: [{ id, label, hint, defaultValue }] })` → `{ ok, values }`. The shape to copy is kol-ds-ui `apps/media-fixture/src/wiring.jsx` `onDropFiles`.
Resolution: `~/dev/projects/kol-ds-ui/lobby/done/upload-dialog-optimise-and-keep-originals.md`.

✅ **Executed 2026-10-09 (all but the deploy):** kol-component ^0.248.0 in all four apps (one copy) · kol-media-client ^0.5.0 in media. `main.jsx` mounts `ModalProvider` (the explorer's verbs were on native dialogs until now); `App.jsx` `askUpload` → `onDropFiles` and `UploadZone` both run `prepareUpload`; last answer per bucket in `lib/settings.js` (`kol-r2b2:upload-choice`, its own key). Measured on the built app with `/api/upload` intercepted: 17 MB PNG → `big-render.jpg` 481 KB + `original/big-render.png` · 23 MB alpha PNG → `alpha-render.webp` 428 KB + original · small JPEG as is · Optimise off → the PNG as is · MP4 → no dialog · Cancel → nothing put · 0 page errors. Names are now slugged on every upload (the recipe's `cleanName`).

**Remainder here:** none — deployed 2026-10-09 (`bc47ceae.kol-media-admin.pages.dev`), live bundle carries the dialog.
