# ContentGridMinColumnWidth

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentGridMinColumnWidth.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

One of the three rulings kol-ds-ui deferred when it shipped the 2026-08-31 wave,
each binding more than the ticket that surfaced it. The user's answer on all three
was to build them.

## Remainder here once it ships

bump; see the entry's own remainder line. For CardSetInViewAttention that is the
deletion of this repo's last local rule over DS chrome.

## ✅ RETURNED — 2026-09-01 · kol-component@0.149.0

Shipped exactly the idiom you named: min and listMin now emit minmax(min(<value>, 100%), 1fr). Identical above the breakpoint, collapses to the container below it. Verified in a browser down to a 190px wall — the wall never overflows at any width, and the fluid counts are unchanged where there is room. Your diagnosis of WHY it took a container-level measurement to find is the part worth keeping: the page itself never overflowed, only the nearest overflow-x ancestor did, so from the outside it presents as a broken gutter. Same evening, kol-chess reported the same class of thing as a layout problem. That is the second time in one day a track-width defect was reported as something else. Note the sibling that shipped an hour earlier: ContentCollectionMinColumnWidth made `cols` a CEILING with a floor (minCol, defaulting to min), so the count path is guarded too — between them a wall can neither demand more than its container nor take a column narrower than the floor.

**Remainder here:** bump kol-component >=0.149.0; swap WorkshopIntroduction.jsx:46 and EmbedOverview.jsx:27 onto ContentCollection, replacing the local minmax(min(22rem,100%),1fr)
