# Redeploy brand — its live bundle still resolves images through media.kolkrabbi.io

**Filed:** 2026-08-15 → **kol-website**
**Entry:** `~/dev/projects/kol-website/lobby/inbox/brand-redeploy-frees-media-hostname.md`
**Ledger:** `~/dev/projects/kol-website/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — brand deployed 08-25, bundle verified free of `media.` on 08-26

## Why it went there

The stale artifact is kol-website's deployed brand bundle, and the fix is a
deploy of their repo — nothing here can produce it. This repo renamed the three
stores (`r2.` / `b2.` / `b2v.`) so the admin app could take `media.`; their build
is the last live consumer pinning that hostname to the R2 bucket.

## What stays here

Everything after their deploy lands, and it is all mine:

1. Detach `media.kolkrabbi.io` from the `kol-media` R2 bucket
   (`wrangler r2 bucket domain remove` — I have this verb).
2. Attach `media.kolkrabbi.io` to the `kol-media-admin` Pages project.
   **Not automatable from here** — `wrangler pages` has no domain verb (only
   project list/create/delete) and there is no `CLOUDFLARE_API_TOKEN` in the
   environment. One dashboard action, the user's.
3. Point this repo at the new name — `vite.config.js` `/api` proxy target and
   `scripts/media-manifest.mjs` `R2_API` default, both still on `admin.`.

`admin.kolkrabbi.io` stays attached throughout, so nothing here is on a deadline
and step 3 can lag step 2 safely.

## ✅ RETURNED — 2026-08-26 · kol-website

Closed at kol-website (user ruling "go"). Brand deployed 2026-08-25 at `43eeb9e`; verified on production 2026-08-26: the live bundle `/assets/index-Cg-P3UL3.js` references `admin.` ×2 · `b2.` · `editor.` ×2 · `r2.` · `ui.` and **no `media.kolkrabbi.io`**; `/library` renders 7 images, 7 loaded, all from `r2.kolkrabbi.io`; hosts contacted during the page load: `admin.` + `r2.` only. Nothing live pins `media.` to the R2 bucket any more — steps 1–3 under *What stays here* are unblocked.

## ✅ REMAINDER DONE — 2026-08-26 · kol-r2b2

1. `media.kolkrabbi.io` detached from the `kol-media` R2 bucket (`wrangler r2 bucket domain remove`, run by the user — classifier blocked the agent). `r2.kolkrabbi.io` is the bucket's only public host.
2. `media.kolkrabbi.io` attached to `kol-media-admin` in the Pages dashboard (user). Active within a minute; serves the same bundle as `admin.`.
3. **Dropped.** The repoint assumed `admin.` would be retired. User ruling: `admin.` = admin surface + API base, `media.` = library front door. `vite.config.js` and `scripts/media-manifest.mjs` stay on `admin.`, and `kol-media-client` 0.1.2's `adminBase` is already correct.

Added instead: `READ_ONLY_HOST` in `src/lib/api.js` — on `media.kolkrabbi.io` every bucket is read-only (no upload, rename, delete or move). Deployed; verified in a browser.
