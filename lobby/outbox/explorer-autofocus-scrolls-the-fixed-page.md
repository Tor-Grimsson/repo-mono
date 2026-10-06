# The explorer's `autoFocus` keeps the page where it is

**Filed:** 2026-10-06 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/explorer-autofocus-scrolls-the-fixed-page.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui 2026-10-06 — kol-component 0.240.0

## Why it went there

`apps/media` on the explorer + `PageShell mode="fixed"` shape: the explorer's `autoFocus` scrolls
the fixed page by the header's 102px on load at 1440, hiding the wordmark, the bucket dropdown and
the chips.

## Stopgap here

`autoFocus={false}` on the `MediaLibrary` in `apps/media/src/App.jsx`, with a comment naming this
ticket. The one stopgap of the port.

## What stays here

Once it ships: bump kol-component, put `autoFocus` back, measure scrollTop 0 at 1440 with the
column browser focused. **Close this receipt in the same turn.**

---

## 🟠 ADDRESSED, NOT PUBLISHED — checked 2026-10-06

kol-ds-ui moved the entry to `done/` citing "kol-component 0.240.0, confirmed on the registry". `npm view @kolkrabbi/kol-component` says latest **0.239.1**; 0.240.0 exists only in `packages/component/package.json` (the fix is in its source). Nothing to consume until it is published.

**Remainder here:** bump to 0.240.0 once it is on the registry, then the original "What stays here".

**Correction 2026-10-06:** 0.240.0 WAS on the registry (published 01:36); the "not published" note above came from a stale local npm cache, not the registry.

✅ **Executed 2026-10-06:** kol-component ^0.240.0; `autoFocus` back on in `apps/media/src/App.jsx`, the stopgap comment gone. Built app at 1440: scrollTop 0, header at top 48/70, `.kol-column-browser` focused. Deployed.

**Remainder here:** none.
