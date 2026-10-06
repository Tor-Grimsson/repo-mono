# Consolidate `src/index.css` and file the DS half upstream — it should not be local writes

**Staged:** 2026-09-02 · from a kol-client-hrafn session
**Change:** triage one file, then one ticket to kol-ds-ui with a receipt in `outbox/`

---

## The problem, in one case

On 2026-08-27 this repo closed `ColumnBrowserChromeCorrections` and its own History line records
the result: *"the override block is gone and `src/index.css` is 24 lines — imports, the body
anchor, one checkbox rule."*

`src/index.css` is **174 lines** today. Six days, ~150 lines back, and almost none of it is this
app's own styling — it is patches on **DS classes**, written locally because the DS did not carry
the ruling yet:

| lines | what it patches | why it is the DS's |
|---|---|---|
| 24 | `.toggle-checkbox--media` unchecked edge | the file itself says *"Local until the DS media variant takes it"* |
| 40–69 | `.kol-column-browser-resize-*::before` — pill on the line, 0.125 × 4.5rem, 1800ms fade, `is-near` | four corrections to DS chrome; theme 0.79.0 shipped a *different* pill (3 × 32, strip-centred) that sits ~4px off the line because the strip lies inside the border it grabs |
| 81–103 | `.kol-column-browser-row` shape — no dividers, 4px inset, pill radius, no hover/cursor fill | self-labelled *"the half the DS did not take"* from `ColumnBrowserSeams` |
| 111, 116–117 | page rhythm + count-line colour via `div:has(> div > div > .kol-column-browser)` | reaches DS layout through a **DOM-shape selector** |
| 122–130 | `.kol-overlay-close` — grey chip instead of `outline quiet`, plus `z-index: 60` | the z-index half is a **DS defect**: the sheet's content covered the close button and the click landed behind it |
| 140–157 | `.kol-doc-page` bound to 3:5 in preview and overlay | the DS sizes at 1:√2 and an unbounded pane; a 7 KB JSON drew taller than the browser |
| 174 | settings footer gap via `div:has(> [aria-label="Reset to defaults"])` | reaches DS layout through an **`aria-label` string** |

Only lines 28 and 160–170 (`.r2b2-*`) are genuinely this app's.

**The cost is not tidiness — these rules fail silently.** It already happened here: the block hung
off `.r2b2-columns`, that class retired with `FileList`, and all four rules stopped applying with
no error and no build failure. Anyone reading the CSS saw intent that was doing nothing. A
`:has()` chain three divs deep and a selector keyed to an `aria-label` string are the same bet
placed again.

## The fix

1. **Bump first, then measure.** This repo runs theme **0.81.0** / component **0.119.0**; latest is
   theme **0.129.0** / component **~0.164**. Forty-eight minors of theme have shipped since these
   rules were written — some are already fixed upstream, some will conflict. A spec measured on
   0.81 is not a spec the DS can act on.
2. **Re-measure each rule against the bumped DS** and drop every one that has become a no-op.
3. **Split what survives**: `.r2b2-*` stays; everything keyed to a `.kol-*` class, a DS DOM shape
   or a DS `aria-label` goes upstream with its measured values and the user ruling that produced it
   (the comments already carry both — keep them, they are the spec).
4. **File it to kol-ds-ui** as a proper ticket with a receipt in `outbox/` and a row in
   `## Filed elsewhere`, the way the previous twelve went.
5. On the return bump, delete the block — the same close this repo executed on 2026-08-27.

## Rejected alternative

*Leave it and let the block keep growing until the next bump forces a reckoning.* That is what
produced the current 174 lines. The block is not stable: it is re-tuned every time the user rules
on chrome, and each round adds a selector reaching further into DS internals. The 24-line floor was
reached once by filing, not by waiting.

## Companion ticket

The DS side is staged as an early warning at
`~/dev/projects/kol-ds-ui/lobby/inbox/r2b2-local-ds-overrides-inventory.md` — it names the surface
and states plainly that the measured spec is owed from here after the bump. That entry is not a
substitute for step 4.

## Definition of done

- [ ] theme + component bumped; every rule re-measured against the bumped DS
- [ ] rules that became no-ops deleted, with the version that fixed them noted
- [ ] surviving rules split — `.r2b2-*` local, `.kol-*` / DOM-shape / `aria-label` upstream
- [ ] one ticket filed to kol-ds-ui with measured values and the originating user rulings
- [ ] receipt in `lobby/outbox/` + row in `## Filed elsewhere`, same slug both ends
- [ ] `src/index.css` carries no selector keyed to a DS DOM shape or an `aria-label` string

---

## ✅ RESOLVED — 2026-09-02 · 🟢 closed

Bumped **theme 0.81.0 → 0.129.0**, **component 0.119.0 → 0.164.0** (plus framework 0.36.0, icons
0.25.0, media-client 0.3.2), re-measured all eleven blocks against the bumped source, and split the
file three ways.

**Dropped 1 — resolved upstream.** The `.toggle-checkbox--media` white edge. Theme took the variant
as an `--kol-oq-12` plate with a transparent border (`kol-components-atoms.css:658`), which is the
same problem solved a different way; the local rule was stacking a border on top of it. The file's
own comment said *"local until the DS media variant takes it"* — it has.

**Fixed here 3 — never the DS's to give.** All three silent-failure selectors are gone, without
waiting for a bump:

| was | is |
|---|---|
| `div:has(> div > div > .kol-column-browser) { gap: 2.5rem }` | `className="gap-10"` on the browse page — it already forwards `className`, and a later utility beats the page's own `gap-6` |
| the same chain, for the count line | `.r2b2-browse`, a class `App.jsx` puts on that node |
| `div:has(> [aria-label="Reset to defaults"]) { gap: .5rem }` | `.r2b2-settings-footer`, marked in the effect that already finds that row to portal the theme chip into |

**Filed 6** — as one ticket, `BrowsePageRulingsAndSeams` → kol-ds-ui, receipt in `outbox/`, row in
`## Filed elsewhere`. Grab pill · row shape · the one-fill ruling · `.kol-overlay-close` (grey chip
+ the `z-index` defect) · `.kol-doc-page` 3:5 · a `settingsFooter` pass-through. It supersedes the
companion inventory staged in kol-ds-ui.

**Scope widened on the user's instruction**, mid-work: *"I just mainly want to ship the layout in
some way, so the layout at media and admin.kolkrabbi.io can be reproduced without a hassle."* So the
ticket carries the two SEAMS as well as the chrome — the GSAP grab tracker and the `MutationObserver`
footer portal are the only reason another repo would still need to copy `App.jsx`. Filing the CSS
alone would have met this DoD and missed the ask.

**Verified by file read, not in a browser:** lint clean, `pnpm build` green, and the emitted
`dist/assets/index-D3fFnsBa.css` checked — `.gap-10` at byte 328808 lands after `.gap-6` at 328700
(so the rhythm wins), all four `.r2b2-*` hooks present, the dropped rule absent, and zero matches for
either `aria-label="Reset to defaults"` or the `:has(> div > div > .kol-column-browser)` chain.

**Not covered by this ticket, and worth a look:** the bump crossed 48 theme minors and 45 component
minors. Nothing in the DS diff was audited beyond the eleven blocks above, so the page's appearance
after the bump is unverified — the user's live check, not a task here.

`src/index.css`: 174 → 175 lines, but the shape is what changed — every remaining `.kol-*` rule is
now under one banner naming the filed ticket, and nothing keys on a DOM shape or a copy string.
