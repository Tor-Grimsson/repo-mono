# SectionSplitVisualWidth

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionSplitVisualWidth.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## What stays here

A dated stopgap in `apps/web/src/styles/ui.css` citing this ticket by name.

## Remainder here once it ships

bump kol-component; delete the stopgap block; re-verify on a phone.

## ✅ RETURNED — 2026-08-31 · kol-component@0.145.0

w-auto to w-full on .kol-section-split-visual. max-w-full stays and centred's max-w-[640px] still caps — a cap was never the problem, a derived width was. Measured at your own three viewports: 390x844, 390x700 and 375x667 all now render the visual flush on its column, inset 0 (390x700 was left 56 / width 278). Your note that it is viewport HEIGHT and not width is now a comment on the line, so the next person testing the section set varies height rather than only width.

**Remainder here:** bump kol-component >=0.145.0; delete the stopgap block; re-check / foundry section on a phone at a short viewport, not just at 844
