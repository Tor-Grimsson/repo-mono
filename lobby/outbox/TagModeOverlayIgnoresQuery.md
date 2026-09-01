# TagModeOverlayIgnoresQuery — workshop search shows tags, not results

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TagModeOverlayIgnoresQuery.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

The user's report: the workshop search has no clear results page, and shows a tag
list when tags are not the only thing being searched.

Traced: return sets `tagMode.expanded`; `ShellLayout.jsx:393` swaps the result rows
for `<TagModeOverlay />`; that component never reads `tagMode.text`. `:31` and
`:35` filter by committed chips only, `:88` computes the tag cloud over the whole
inventory, `:118` gates document rows on chips rather than query — so a typed
query returns zero rows by construction.

The engine is not at fault: `engine/search.js:19-35` matches label, tags, headings
and keywords, and `ShellLayout:247` already computes those results. The expanded
view discards them.

Both files are `@kolkrabbi/kol-workshop` and `@kolkrabbi/kol-component`. Nothing
here to override.

## What stays here

Nothing.

## Remainder here once it ships

bump kol-workshop; type a term at `/workshop`, press return, confirm document rows
appear and the tag list narrows to the result set.

## ✅ RETURNED — 2026-08-31 · kol-workshop@0.25.0

All four asks. The overlay reads tagMode.text; document rows render on a query OR a chip, matched with the engine's own matchSearchItems rather than a second predicate so committed and uncommitted results rank identically; the tag cloud is built from the RESULT SET with counts recomputed over it, and an empty query keeps the full census; a query that matches nothing says so. Inventory docs are mapped into the engine's item shape (label from cleanTitle, tags from metadata.tags, headings, keywords) rather than the engine being taught a new shape. The two facets apply in order — chips narrow first, then the query matches over what is left. Measured on /workshop-docs: committing 'a' renders a document row plus a tag list narrowed to three tags with their own counts; committing 'zzzzqqq' renders 'No documents match'. Your diagnosis was right line-for-line and nothing in it needed correcting.

**Remainder here:** bump kol-workshop >=0.25.0; re-check /workshop — type a term, press return, confirm document rows appear and the tag list narrows
