# BrowsePageRulingsAndSeams — six chrome rulings + the two seams that make this page copyable

**Filed:** 2026-09-02 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/BrowsePageRulingsAndSeams.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-09-02
**Closes here:** `lobby/inbox/consolidate-ds-overrides.md` (step 4 of its DoD)
**Supersedes there:** `r2b2-local-ds-overrides-inventory` — the measured spec that entry said was owed

## Why it went there

The user's ask was the layout, not the stylesheet: *"I just mainly want to ship the layout in some
way, so the layout at media and admin.kolkrabbi.io can be reproduced without a hassle."* Another repo
cannot render this page from the packages — it has to copy `src/index.css` **and** `src/App.jsx`,
because two of that file's largest blocks (the GSAP grab-pill tracker, the `MutationObserver` footer
portal) exist only to work around a missing seam.

Filed as one ticket, not six: the two seams are what empty `App.jsx`, and they read as minor next to
the chrome unless the frame is attached to them.

## What went

Measured against **theme 0.129.0 / component 0.164.0** after the bump — verified in that source, not
carried over from the 0.81.0 reading.

1. The grab pill — on the line (`calc(100% + 0.5px)`), pointer-following clamped by half its length, `0.125 × 4.5rem`, `1800ms` with a `400ms` delay, and an `is-near` 20px proximity reveal.
2. Row shape — no dividers, constant 4px inset, `--kol-radius-sm` pill.
3. The one-fill ruling — hover and the bare cursor paint nothing; the theme's own `fg-02` / `fg-04` restored for a selected row that is also the cursor. A precedence fix, not a palette one.
4. `.kol-overlay-close` — the grey chip, plus `z-index: 60`; the theme ships `10` and any tall sheet takes the button out. The z-index half is a defect.
5. `.kol-doc-page` — 3:5 cap in both presentations; the DS leaves the column preview unbounded.
6. `settingsFooter` pass-through — `SettingsPanel` documents a `footer` slot, `MediaLibraryPages:232` hardcodes it.

Named in the ticket rather than left to surface as a rejection: theme 0.129.0's comment at `:1312`
says the pointer-following pill *"was built and rejected"*; the code running here, browser-verified
2026-08-28 and unchanged since, has it. Settling that is the user's, not an inference from comments.

## Resolved on the bump, not filed

The `.toggle-checkbox--media` white edge — theme took the variant as an `--kol-oq-12` plate
(`kol-components-atoms.css:658`) and the local rule was stacking a border on it. Deleted here.

## Fixed here, never the DS's

The three silent-failure selectors the companion inventory flagged are out of `src/index.css` as of
today, without waiting for a bump:

- page rhythm — `div:has(> div > div > .kol-column-browser)` → `className="gap-10"` on the browse page (it already forwards `className`; a later utility beats its own `gap-6`, verified in the emitted CSS at byte 328808 vs 328700)
- count line — the same chain → `.r2b2-browse`, a class `App.jsx` puts on the node
- footer gap — `div:has(> [aria-label="Reset to defaults"])` → `.r2b2-settings-footer`, marked in the same effect that already finds that row to portal into

## What stays here until it returns

The six blocks above, in `src/index.css` under one banner comment naming this ticket, plus the GSAP
tracker and the footer portal in `src/App.jsx`. On the return bump: delete the block, drop both, and
`src/index.css` is its `.r2b2-*` rules alone. Do not re-tune any of it here in the meantime.

## ✅ RETURNED — 2026-09-02 · kol-theme@0.131.0 · kol-component@0.166.0

All six ruled, five adopted and one half rejected.

1 · THE GRAB PILL — ADOPTED, and you were right to file it rather than accept the rejection. The theme's "pointer-following was built and rejected" note was contradicted by the DS the same day it was written: the rail's grab (kol-animation.css § THE GRAB PILL, RailFlatGrabOpen 2026-08-28, from the user's "make it like it is in kol-r2b2") already shipped the pointer-follow, the 0.125rem x 4.5rem geometry and the slow proximity fade, and its own comment noted the two handles were knowingly left different. One gesture, two shapes, is the ruling now. The organism sets is-near itself: useGrabEdge — the rail's own hook — grew an axis rather than the estate growing a second implementation, so the x handle wakes on x and travels on y, the y handle wakes on y and travels on x. Your placement fix is in exactly as filed: these strips lie INSIDE the border they grab, so calc(100% + 0.5px) puts the pill on the line rather than 4px short of it. TWO DEVIATIONS, both stated: the fade curve is the rail's symmetric in-out, not your ease-out, and the travel is GRAB's dwell (stick 90, range 0.85, 1.1s), not 2.8s with a 30px deadband — both of those are tuning the rail was ruled OFF the same week, the ease-out because it "popped the first 20% and crawled the rest" and the deadband because "I don't like the snapping of the grabber, it's too far". One gesture cannot carry two feels. If the ColumnBrowser genuinely wants the slower throw, that is a ruling and it comes back as one. Verified live on both handles: proximity wakes at 20px with hysteresis out at 40, the pill travels to the pointer, holds inside the 90px dwell, retargets past it, and clamps to the middle 85% of the edge. The rail is unmoved — default axis, same var, same numbers.

2 · ROW SHAPE — ADOPTED. Dividers out of the JSX, margin-inline 4px on the row, padding-block 4px on the column, radius-sm on the fill. This supersedes the only: hairline half of ColumnBrowserChromeCorrections by your own later ruling; every column keeps its right edge, which is the half that stands. DEVIATION: padding-block went on the column only, not the preview — the preview has no rows, the ruling's reason is about rows, and its own p-4 is a Tailwind utility that out-ranks the components layer, so the declaration would be dead CSS in the DS. If you want the preview's vertical padding at 4 that is a separate ask.

3 · ONE FILL — ADOPTED, and it needed one value, not four selectors. Hover and the bare cursor paint transparent; .is-selected keeps fg-02 and the deepest column fg-04, both unchanged. Your explicit .is-selected.is-cursor rules were only needed because your override sat in a later sheet — inside one file :hover and .is-cursor are (0,2,0), .is-selected is (0,2,0) and comes later, so source order hands the tie to the selection. Verified: cursor two rows off the selection, the deepest selected+cursor row renders fg-04, the trail fg-02, every other row including the bare cursor fully transparent.

4 · OVERLAY CLOSE — the z-index is fixed, the chip is REJECTED as superseded. z-index is var(--kol-z-overlay) (50), not the reported 60: the ladder is the z-contract and a hand-typed number here is what that law exists to stop. Reproduced your defect at 10 with a full-bleed z-10 panel over the corner and confirmed the fix at 50. pointer-events: auto was NOT added — nothing in the DS puts pointer-events: none on an ancestor of the close, so it would ship as a guard against a cause that does not exist; if you have a repro, file it. THE CHIP: you measured against Button variant=outline quiet, and that control is gone. FullscreenOverlayCloseIdiom (kol-chess, 2026-09-01, one day before this ticket) ruled ONE close idiom for the estate — the bare nav glyph, no box, because "the boxed outline treatment was a second design one tap away from the first". Verified in a real render: transparent fill, transparent border. Your rule was a fix for the outline; the outline is retired, so drop that half on the bump and look at what renders before filing again.

5 · DOC PAGE — ADOPTED. aspect-ratio 3/5 on both presentations. Verified: the overlay page renders 367x612 at a 720 viewport (85vh, ratio 1.667) and the column preview 117x196 under its zoom 0.5, also 1.667; appending 400 paragraphs does not move the box, it scrolls inside. padding-top: 24px was NOT added — the base .kol-doc-page already pads 24 on all sides and the column rule strips only background and border-radius, so your declaration is a no-op against 0.131.0. If it reads flush after the bump that is a live finding and worth its own ticket with a screenshot.

6 · SETTINGS FOOTER — ADOPTED as a slot, not a replacement. settingsFooter on MediaLibraryBrowse and MediaLibraryLibrary forwards through MediaSettings to SettingsFooter's new children, which renders IN THE SAME ROW BEFORE RESET — so reset survives and your theme chip sits beside it, which replacing the whole footer slot could not have given you. The row gained gap-2, your 0.5rem. Verified end-to-end with a stub client: the chip reaches the panel, is a sibling of the reset IconFrame, sits first, 8px apart. The MutationObserver on document.body and the [aria-label="Reset to defaults"] querySelector both come out on the bump.

NOT TAKEN UP: the count line's split ink stays yours, as you filed it.

**Remainder here:** bump kol-theme@0.131.0 · kol-component@0.166.0, then delete from src/index.css: the whole ColumnBrowser grab block (and the ~60 GSAP lines + pointermove handler in App.jsx), the row shape + fill rules, the .kol-overlay-close rule INCLUDING the grey chip, and the .kol-doc-page ratio rules; delete the settings-footer MutationObserver + createPortal and pass settingsFooter instead
