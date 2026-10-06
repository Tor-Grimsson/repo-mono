# kol-media-client's `adminBase` default is `media.kolkrabbi.io`

**Filed:** 2026-10-05 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/media-client-admin-base-is-media.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui 2026-10-06 — kol-media-client 0.4.1

## Why it went there

The media app (`apps/media`, moved in from kol-r2b2 today) has one hostname by the user's
ruling: `media.kolkrabbi.io`. `admin.` only redirects there and will be detached. The
package `@kolkrabbi/kol-media-client` still defaults `adminBase` to `admin.`, which brand's
`/library` relies on — through a 301 today, through nothing once `admin.` goes.

## What stays here

Once it ships: bump `@kolkrabbi/kol-media-client` in `apps/brand`, check `/library` lists
the three buckets, then detach `admin.kolkrabbi.io` (Cloudflare API) and delete
`apps/media/functions/_middleware.js`. **Close this receipt in the same turn** —
`Remainder here: none` here and on the ledger row.

---

## ✅ RETURNED — 2026-10-06

🟢 `closed` in **kol-ds-ui** — kol-media-client 0.4.1, `adminBase` → `media.kolkrabbi.io`.

✅ **Executed 2026-10-06:** ^0.4.1 in brand and media; brand's client on the default lists 433 items through `media.`. Detaching `admin.` waits: the live kol-fxr and kol-mirror bundles still call it (pinned 0.4.0 · 0.3.2) — filed to each as `media-client-0-4-1-api-on-media`.

**Remainder here:** none for this ticket — the detach rides on the kol-fxr and kol-mirror receipts.
