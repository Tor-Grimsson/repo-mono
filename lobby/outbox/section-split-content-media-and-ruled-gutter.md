# SectionSplit: content media sizes its own frame, and the section takes the ruled gutter

**Filed:** 2026-10-06 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/section-split-content-media-and-ruled-gutter.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui 2026-10-06 — kol-component 0.240.0

## Why it went there

`/studio`'s Process band: the ProfileCard shows as a 104px strip at 1440 (live too, since early
September), and the band's text sits off the gutter the bands below use. Both are SectionSplit's.

## Stopgap here

None, by agreement.

## What stays here

Once it ships: bump kol-component, re-measure `/studio` at 1920 · 1440 · 1024 · 390 and home's
Foundry band. **Close this receipt in the same turn.**

---

## 🟠 ADDRESSED, NOT PUBLISHED — checked 2026-10-06

kol-ds-ui moved the entry to `done/` citing "kol-component 0.240.0, confirmed on the registry". `npm view @kolkrabbi/kol-component` says latest **0.239.1**; 0.240.0 exists only in `packages/component/package.json` (the fix is in its source). Nothing to consume until it is published.

**Remainder here:** bump to 0.240.0 once it is on the registry, then the original "What stays here".

**Correction 2026-10-06:** 0.240.0 WAS on the registry (published 01:36); the "not published" note above came from a stale local npm cache, not the registry.

✅ **Executed 2026-10-06:** kol-component ^0.240.0 in web, brand, media, metrics. `/studio` Process card whole at every width — 804 · 704 · 629 · 433 · 350 square at 1920 · 1600 · 1440 · 1024 · 390; text at 108 · 48 · 48 · 48 · 20, equal to Services and Connect. Home Foundry 630×504 at 1600×950, unchanged.

**Remainder here:** none.
