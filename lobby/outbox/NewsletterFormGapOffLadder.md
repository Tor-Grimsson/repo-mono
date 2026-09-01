# NewsletterFormGapOffLadder

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/NewsletterFormGapOffLadder.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01 — **kol-component@0.158.0**

## Why it went there

Phone review, 2026-09-01. Full statement of the defect is in the entry.

## What stays here

Nothing — both are literals inside DS components with no consumer seam.

## Remainder here once it ships

bump; re-check at 390.

## ✅ RETURNED — 2026-09-01 · kol-component@0.158.0

On ButtonGroup's ladder: gap-2 sm:gap-4 — 8 stacked, 16 in the row — replacing gap-4 sm:gap-3, which was inverted against it in both directions as you measured. Took the gap, not the refactor onto ButtonGroup: an input beside a submit is the group's geometry, not its component, and one rung shared by literal is the smaller honest change. The pt-6 went too, as you suspected: SectionText already spaces its children by gap-6, so the form sat 48 under the body where every other section's actions sit 24. Verified in a real render: 8px column at 390, 16px row at 1280, padding-top 0. Tarball checked.

**Remainder here:** bump kol-component@0.158.0 and re-check / at 390 — input↔Subscribe measures 8, the same as the ButtonGroup above it; from sm both are 16

## ✅ RETURNED — 2026-09-01 · kol-component@0.158.0

The form is on ButtonGroup's ladder: `gap-2 sm:gap-4`.

**Remainder here:** bump; re-measure the two rows on `/` at 390.

✅ **Remainder executed 2026-09-01 same session.** component ^0.158.0 in web +
brand. Measured on `/` at 390, box to box: input control (the `<label>`, which
carries the control's padding) bottom → Subscribe top = **8**; Explore Workshop
bottom → View Documentation top = **8**. Equal. (A first read against the bare
`<input>` inside the label said 17 — the wrong leaf; the label is the box.)
