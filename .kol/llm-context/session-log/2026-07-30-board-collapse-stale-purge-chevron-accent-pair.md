# Session: Board collapse, stale purge, chevron restore, accent contrast pair

**Date:** 2026-07-30
**Agent:** Grim (Fable 5 → Opus 5)
**Summary:** The 9-item open+parked board went to 3 real decisions; six dormant threads were purged at source on user verdict; the brand theme boot was fixed (a real veto bug, not cosmetic); the sidenav collapse chevron was rebuilt brand-local; the brand accent's light-mode contrast failure was measured and a new light/dark pair staged for approval; two lobby briefs filed, one of which the DS shipped the same hour.

## Changes Made

### Files Modified
- `apps/brand/index.html` — dropped hardcoded `data-theme="dark"`, ported web's no-flash boot script (minus its legacy-key migration).
- `apps/brand/src/components/framework/SideNav.jsx` — collapse state + `localStorage` (`kol-sidenav`) + root-attribute effect + the chevron button (copied from the package); ThemeToggle swaps `button`→`icon` when collapsed; theme slot got a class hook.
- `apps/brand/src/styles/sidenav-collapse.css` — **new.** Restores `:root[data-sidenav="collapsed"]` by lifting the ≤1024px rail rules out of the media query; closes two overflow gaps the package never handled.
- `apps/brand/src/index.css` — one `@import` for the above (file stays imports-only).
- `apps/brand/src/App.jsx` — `/review` route + import removed.
- `apps/web/package.json` · `apps/brand/package.json` — component 0.14.1→0.14.3, framework 0.9.0→0.9.1.
- `AGENT-CONTEXT.md` · `history.md` · `plans/brand-audit-inventory.md` · `plans/web-audit-5d-inventory.md` · `playbook/2026-07-09-ds-seeding.md` — records squared.
- `playbook/2026-07-30-board-collapse.md` — **new**, 8 entries.
- `kol-ds-ui/lobby/ThemeToggleSystemState.md` · `IconFrame.md` · `INDEX.md` — **new briefs.**

### Removed / quarantined
- 9 stale plan files → `_tmp/plans-elder/`; `pages/Review.jsx` → `_tmp/brand-orphan-elder/`; `InteractiveImage.jsx` (0 importers) → `_tmp/web-orphan-elder/`.

## Current State

### Working
- **Stale backlog: zero.** Six dormant threads closed unruled at source (icon staging · ds-seeding Batch-2 · web-polish · post-merge smalls · web-audit-5d tail · 7 dead plans). `plans/` down to 4 live files. One archival record in `history.md`; nothing left that reads as a backlog on next `ag-init`.
- **Theme boot conforms.** The hardcode was not cosmetic — `getExplicitTheme()` (`theme.js:22`) reads the attribute *before* localStorage, so it vetoed both the OS and the user's own saved toggle every load.
- **Sidenav collapse restored** brand-local: 260px↔56px, labels/footer hidden, toggle swaps to its glyph, `aria` flips, preference persists. Playwright-verified both directions.
- **Stack current**: theme 0.13.3 · component 0.14.3 · framework 0.9.1 · icons 0.8.11 · brand 0.1.2. `pnpm outdated` clean, turbo build 3/3.

### Known Issues
- **Brand accent fails light mode.** `#FFCF33` scores **1.41:1** on `#fafafa` (icons need 3, text needs 4.5); 12.67 on dark. Nine rules paint with it, two of them text. No single value fixes it — the value that clears light text drops to 3.80 on dark. Six light candidates staged at `_tmp/accent-contrast-proposals/preview.html`, all clearing 4.5:1, **awaiting the pick**.
- **framework 0.10.0 is published and unconsumed.** It carries the user's "system is not a state" ruling (cycle is light↔dark, reset via `useTheme().clear()`), the `fill` default flip subtle→none, and removal of SideNav's dead chevron. Brand is unaffected by that last one — it owns its SideNav.
- **AGENT-CONTEXT carried two wrong claims**, both corrected in place: Pill's *variant* default never became `subtle` (only size→sm; source-verified against the 0.14.1 tarball), and the 07-29 collapse removal never "migrated UP into kol-framework 0.6.1" — only the CSS half ever landed.
- Brand's sidebar ThemeToggle still passes `variant="button"` with no `fill`, so it renders the filled rung until 0.10.0 is consumed.

## Next Steps
1. **Consume framework 0.10.0** — it resolves the ThemeToggle ruling and the fill default.
2. **Pick the light accent** from the six candidates; then the pair binds in `kol-brand-color.css` DS-side.
3. **Await `IconFrame`** from kol-ds-ui, then insert it below the chevron (`variant="secondary" size="lg"`) — blocked also on the `chevron-left` vs `panel-left` icon call.
4. Three standing user decisions remain: Gallery's fate, `Landing.jsx:35` uppercase, hoisting the shared 9.5M of statics.
