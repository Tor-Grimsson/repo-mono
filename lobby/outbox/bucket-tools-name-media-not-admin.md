# The bucket tools name `media.kolkrabbi.io`, not `admin.`

**Filed:** 2026-10-05 → **dotfiles**
**Entry:** `~/.dotfiles/lobby/done/bucket-tools-name-media-not-admin.md`
**Ledger:** `~/.dotfiles/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-06 — dotfiles names only `media.kolkrabbi.io`

## Why it went there

`bin/bucket-tree.sh` and two skill cards name `admin.kolkrabbi.io` as the media API. The
app has one hostname since today, `media.kolkrabbi.io`; `admin.` only redirects there.

## What stays here

Nothing to build. Once it returns (and `media-client-admin-base-is-media` has): detach
`admin.kolkrabbi.io` through the Cloudflare API, delete `apps/media/functions/_middleware.js`,
redeploy. **Close this receipt in the same turn.**

---

## ✅ RETURNED — 2026-10-06

🟢 `closed` in **dotfiles**. No `admin.kolkrabbi.io` left in its scripts, skills, CLI wrappers or CDN
docs — including the `bucket-r2` CLI's default API origin, which the ticket did not list. `bucket-r2 ls`
verified through `media.`. Nothing in dotfiles depends on `admin.` any more.

**Remainder here:** detach `admin.kolkrabbi.io`, delete `apps/media/functions/_middleware.js`, redeploy — once `media-client-admin-base-is-media` has also returned.
