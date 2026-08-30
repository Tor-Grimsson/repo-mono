# ContentFiltersTitleGap — the bar's divider reads off-centre next to the icon frames

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentFiltersTitleGap.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.93.1; remainder executed here 2026-08-27

## Why it went there

The 32px icon frames carry 8px of air the title doesn't; the divider reads
pushed toward the title. Tuned locally: 16px right padding on the title.
Ask: the bar carries it by rule.

## What stays here

`titleClassName="kol-helper-14 pr-4"` on `/stack`'s `ContentFilters`.

## Remainder here once it ships

bump; drop the `pr-4` (and the `titleClassName` if the default voice is fine)

## ✅ RETURNED — 2026-08-27 · kol-component 0.93.1

The header title carries pr-4 by rule — 16px of right air on the title side, titleClassName untouched. Measured on the content-filters set: title text → divider 40px (24 gap + 16), divider → icon glyph 32, divider → frame 24 — the /stack tune, for every consumer.

**Remainder here:** bump kol-component 0.93.1; Stack drops the pr-4 from titleClassName

✅ **Remainder executed 2026-08-27 same session:** component ^0.93.1 in both apps; the local `pr-4` (and the `titleClassName`) dropped from `/stack`. Every filter bar on the site carries the 16px by rule now.
