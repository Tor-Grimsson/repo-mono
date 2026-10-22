# Bump `kol-media-client` to 0.4.1 — the media API is on `media.kolkrabbi.io`

**Filed:** 2026-10-06 → **kol-mirror**
**Entry:** `~/dev/projects/kol-mirror/lobby/inbox/media-client-0-4-1-api-on-media.md`
**Ledger:** `~/dev/projects/kol-mirror/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-10-15

## Why it went there

Its live bundle calls `admin.kolkrabbi.io` through kol-media-client 0.3.2; `admin.` is what this repo
detaches next.

## What stays here

Once both this and its sibling (the other of kol-fxr / kol-mirror) return: detach
`admin.kolkrabbi.io` (Cloudflare), delete `apps/media/functions/_middleware.js`, redeploy media.
**Close this receipt in the same turn.**

## ✅ RETURNED — 2026-10-15

🟢 `closed` in kol-mirror (`lobby/done/media-client-0-4-1-api-on-media.md`). kol-media-client **0.6.0**
(0.4.1/0.5.0 superseded); its default `adminBase` is `https://media.kolkrabbi.io`, nothing in kol-mirror
passes one, and `src/` + the built bundle carry no `admin.kolkrabbi.io`. Live once the user's push deploys.

**Remainder here:** 📌 when kol-fxr's sibling also returns — detach `admin.kolkrabbi.io` (Cloudflare),
delete `apps/media/functions/_middleware.js`, redeploy media.
