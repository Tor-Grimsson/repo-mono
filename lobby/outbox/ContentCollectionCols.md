# ContentCollectionCols — `cols` on ContentCollection

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentCollectionCols.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.87.0; remainder executed here 2026-08-27

## Why it went there

The collection only takes a track minimum; the site's rule was a column
count (`/stack`: one below md, three from md). Ask: `cols={N}` on the grid
form, house gaps.

## Remainder here once it ships

bump; `/stack` → `cols={3}`

## ✅ RETURNED — 2026-08-27 · kol-component 0.87.0

ContentCollection cols={N}: one column below md, N from md (2-6, literal classes; the inline auto-fill template steps aside so the classes carry the tracks). min stays the default fluid wall, cols wins when both are passed, the list form ignores it. Gap is unchanged — the wall token is 24 flat, there is no 32-at-xl step in the DS; pass gap={32} if /stack wants it. Measured on the demo: 3 tracks at 1280 and 900, 1 at 390; fluid and list forms byte-identical.

**Remainder here:** bump kol-component 0.87.0; /stack passes cols={3} and drops the back-solved min; /work, /prints, foundry library follow as they move onto the collection

✅ **Remainder executed 2026-08-27 same session:** component ^0.87.0 in both apps; `/stack` on `cols={3}` (no `min` was ever committed). Gap left at the 24 wall token. Eyeball is the user's.
