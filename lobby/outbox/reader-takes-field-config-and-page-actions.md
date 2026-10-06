# The doc reader takes a consumer's field config and page actions

**Filed:** 2026-10-05 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/reader-takes-field-config-and-page-actions.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui 2026-10-06 — kol-workshop 0.39.0

## Why it went there

`/workshop` is now one markdown file per app, rendered through kol-workshop's
`DocumentationReader`. Rendering all eight on 0.38.0 untouched showed six
things this repo cannot reach: frontmatter links print as plain text, keys
outside the package's table have no icon and cannot be ordered, labelled or
hidden, a page has no slot for its Open button, and the rail opens an external
link in the same tab. The ticket asks for the seam so a new field is never a
ticket again. Plan: `.kol/llm-context/plans/2026-10-05-workshop-hub-makeover.md` §4.

## Stopgap here

None, on purpose. The hub is built and verified in the working tree; its
launch waits for this return.

## What stays here

Once it ships: bump kol-workshop; in `apps/web/src/routes/workshop/WorkshopPage.jsx`
pass the field config (hide `icon · image · order · embed`, label and icon
`url` and `repo`) and an `actions` node with the Open button; re-render the
eight pages at 1440 and 390. **Close this receipt in the same turn** — write
`Remainder here: none` here and on the ledger row.

---

## ✅ RETURNED — 2026-10-06

🟢 `closed` in **kol-ds-ui** — kol-workshop 0.39.0: `fields` · `actions` on `DocumentationReader`, URL values as links, a default glyph, external rail links in a new tab.

✅ **Executed 2026-10-06:** kol-workshop ^0.39.0 in web; `WorkshopPage.jsx` passes `fields` (icon · image · order · embed hidden; `url` → Live, `repo` → Repository) and `actions` (Open <app>, and Open in place where `embed`). Measured on the built app at 1440 and 390 on monitor, design-system and media: no plumbing rows, both links are links, the Open button under the title, rail links `target=_blank`, 0 errors.

**Remainder here:** none.
