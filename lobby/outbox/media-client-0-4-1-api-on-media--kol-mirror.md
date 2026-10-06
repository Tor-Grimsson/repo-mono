# Bump `kol-media-client` to 0.4.1 — the media API is on `media.kolkrabbi.io`

**Filed:** 2026-10-06 → **kol-mirror**
**Entry:** `~/dev/projects/kol-mirror/lobby/inbox/media-client-0-4-1-api-on-media.md`
**Ledger:** `~/dev/projects/kol-mirror/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · synced 2026-10-06

## Why it went there

Its live bundle calls `admin.kolkrabbi.io` through kol-media-client 0.3.2; `admin.` is what this repo
detaches next.

## What stays here

Once both this and its sibling (the other of kol-fxr / kol-mirror) return: detach
`admin.kolkrabbi.io` (Cloudflare), delete `apps/media/functions/_middleware.js`, redeploy media.
**Close this receipt in the same turn.**
