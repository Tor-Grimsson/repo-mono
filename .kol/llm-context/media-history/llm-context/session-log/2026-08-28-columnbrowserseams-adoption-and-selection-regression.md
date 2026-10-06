# Session: ColumnBrowserSeams adopted, and the selection states it silently took with it

**Date:** 2026-08-28
**Agent:** Claude (Grim)
**Summary:** The last filed ticket returned and was adopted (component 0.119.0 / theme 0.81.0), which removed the class the local selection rules hung off. The re-key was done on the bump — but the theme's own fills, plus `autoFocus`, left a permanent cursor fill on the list and a selection too faint to see. Found by the user, fixed, deployed.

## Changes Made

### Adopted — `ColumnBrowserSeams` (component 0.119.0 · theme 0.81.0)
- `autoFocus` on the browse page replaced the rAF `querySelector` that reached into the organism's DOM to focus it.
- `stats={false}` on the library page replaced `.r2b2-library > p { display: none }`.
- The row carries `is-selected` / `is-cursor`; the theme owns the fills, including the one-selection `:has(~ …)` rule — deleted locally.
- **The predicted break fired:** 0.119.0 removes `bg-fg-04` from the row, so every local rule keyed on it matched nothing. Re-keyed on the bump rather than left to fail silently.

### The regression, and the fix
Theme 0.81.0 paints **three** fills — `:hover`, `.is-cursor`, `.is-selected`. With `autoFocus` there is always a cursor row, so a fill sat on the list permanently and moved on every click: the hover fill the user removed on 2026-08-27, back under another name. It drowned the real selection, which the theme puts at `fg-02` — invisible now that the row carries no base fill.

Ruled and applied: hover and the bare cursor paint **nothing**; selected is `fg-04`; the deepest selection `fg-08`. Verified in the **emitted** `dist` CSS, not the source, so the override order is proven rather than assumed.

### Also
- The browser's count line lifted off the DS's `fg-48` → `fg-64`, its bucket tail `fg-32` → `fg-48`.
- `src/index.css` is 100 lines: the Finder shape, the one-fill ruling, the grab pill, the count line, and the app's own layout gaps.

## Current State

### Working
- Deployed; the live CSS bundle hash matches the local build. Both hosts 200. Lint and both test files green.
- Every `lobby/outbox/` receipt is 🟢 with no remainder.

### Known Issues
- **kol-framework 0.34.0** is out (a `SideNav` panel-disclosure leaf, from kol-fxr). This app imports no framework JS — CSS only — so it is a no-op here; not taken.
- A stale `.active-goal-ce03a028….md` sits in `.kol/llm-context/` from **another session**, `status: blocked` on attaching a custom domain to the Pages project (no `wrangler pages` domain verb, no API token). Inert for this session and not this session's to close.

## Next Steps
1. The user's eye on the restored selection states — this was a visual regression a green build could not see, and the same is true of the fix.
