# NavLinkUnderline — hover underline promoted to kol-theme

**Filed:** 2026-08-12 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/NavLinkUnderline.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-12 — shipped in `@kolkrabbi/kol-theme@0.35.0`: `.kol-link-underline` in kol-utilities.css, geometry verbatim, plus `:focus-visible` parity, reduced-motion handling, and `--kol-link-underline-size` (2px default). Entry graduated to `done/`. ✅ **Remainder executed 2026-08-12 same session:** theme bumped 0.34.0→0.35.0 (exact, both apps), both Navbar call sites swapped to `kol-link-underline` (nav links carry `[--kol-link-underline-size:4px]` for the heading-01 scale — the thickness knob the brief flagged), `animations.css` block deleted (shelf copy: `_tmp/2026-08-12-dead-routes-retired/nav-link-underline.css`). Build 3/3 green

## Why it went there

The animated hover underline (`.nav-link-underline`, scaleX draws in
left→right, retracts right→left, `currentColor`) lives in
`apps/web/src/styles/animations.css#L66-L88` — a consumer stylesheet. Since the
2026-08-12 navbar consolidation it is the site's ONLY link-hover affordance
(the fg-64 opacity-mute pattern was dropped): takeover menu links at
`kol-sans-heading-01` and the instagram line at `kol-mono-14` both ride it.
Load-bearing chrome in one consumer's CSS is invisible to every other
consumer — DS material by the repo's own rule.

Brief asks kol-theme for a shipped utility class plus the two things the local
copy never handled: `:focus-visible` parity and reduced-motion.

## Remainder here once it ships

Delete the block from `animations.css`, swap the two call sites in
`apps/web/src/components/layout/Navbar.jsx` to the shipped class name.
