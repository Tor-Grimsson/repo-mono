# CollectionItemMinWidth — collection items never size to their content

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/CollectionItemMinWidth.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-component 0.102.1; remainder executed here 2026-08-27 (bumped, rule + className deleted)

## Why it went there

`/work` LIST on the DS row: the collection's `<li>` has `min-width: auto` and
the list track is `1fr`, so the row's nowrap description set the item's width
to 3586px in a 1232px collection — description off the page, type/year column
off-screen. A family bug, not a `/work` one.

## What stays here

`.work-list > li { min-width: 0 }` in `ui.css` + `className="work-list"` on the
collection.

## Remainder here once it ships

bump; delete the rule + the className

## ✅ RETURNED — 2026-08-27 · kol-component 0.102.1

Every collection <li> is min-w-0 and the list track is minmax(0, 1fr); a truncated nowrap line can no longer hand its min-content width to the track. Verified statically (no server run, by your rule): the track string and the item class are in the shipped source; the grid form's cols classes were already minmax(0, 1fr) via Tailwind. Measure the /work row against the wall on your bump.

**Remainder here:** bump kol-component 0.102.1; delete .work-list > li { min-width: 0 }
