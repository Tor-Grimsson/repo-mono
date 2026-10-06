# Session: MBP set up, KOL bumped a month, deprecated aliases migrated, three DS round-trips

**Date:** 2026-10-02 → 2026-10-03
**Agent:** Grim (Fable 5.1)
**Summary:** First session on the MBP — the clone arrived without `.kol/` (it was gitignored; now tracked), the KOL tier went from component 0.162 to 0.239 in two waves, every deprecated DS alias in web and brand was migrated and proven render-neutral, three defects were ticketed to kol-ds-ui and all three came back and were consumed, and a home-page review landed five local fixes.

## Changes Made

### Files Modified
- `.gitignore` — `.kol/` no longer ignored (user: logs may be public; the repo is public). `.active-goal*.md` stays ignored. `LLM_RULES.md` re-symlinked to the scaffold template (machine-local).
- `apps/web/package.json` · `apps/brand/package.json` · `pnpm-lock.yaml` — component ^0.162.0 → **^0.239.0** · theme 0.128.0 → **0.165.0** · shell ^0.40.0 → **^0.61.0** · framework ^0.36.0 → **^0.49.0** · workshop ^0.27.0 → **^0.38.0** · icons ^0.25.0 → ^0.33.0 · foundry ^0.9.0 → ^0.12.0 · dashboards ^0.4.1 → ^0.4.3 · store ^0.3.0 → ^0.3.1 · media-client ^0.3.2 → ^0.4.0 (brand). Transitive kol-markdown 0.1.2 → 0.1.3 via `pnpm update -r --depth 99`. One copy of every KOL package.
- `apps/brand/src/pages/LibraryLocal.jsx` · `IconsGallery.jsx` — `PageHeader` imported from kol-component (moved out of kol-shell 0.41.0; the only build break of the bump).
- `apps/web/src/components/workshop/WorkshopChrome.jsx` — scroll spy rooted at `SHELL_SCROLL_ROOT` (`#shell-scroll`; `#main` no longer scrolls since workshop 0.30.0 — the TOC highlight was stuck on the first heading); the `[&_.kol-page]:px-0` wrapper widened to all widths and then **deleted** once theme 0.164.1 shipped (`_tmp/2026-10-02-workshop-gutter-wrapper/`).
- **Alias migration, 21 files** (scratchpad codemod, tag-scoped): Button `variant="primary|secondary|outline|ghost|grey"` → `tone` (secondary → `inverted`; a variant beside an explicit `tone` just drops), `kicker`/`kickerClass="kol-card-kicker"` → `eyebrow`/`eyebrowClass="kol-eyebrow text-fg-64"`, `label` → `eyebrow` on SectionHero/SectionSplit (+ `slotClass`/`slotStyle` keys), `tone="inverse"` → `sunken`, `KOL_ICON_SET_V1` → `KOL_ICON_SET_INTERFACE`.
- `apps/brand`: `pages/Components.jsx` · `pages/Reference.jsx` · `data/components.js` → `_tmp/2026-10-02-brand-denavigated/` (user: off the rail, outdated); routes and imports out of `App.jsx`, the unused `DENAVIGATED` export out of `sidebars.config.js`.
- `apps/web/src/components/sections/shared/StackLatest.jsx` — "Latest writing" line gone; `Stack` title set as the section eyebrow (`kol-section-text-eyebrow kol-helper-12 text-meta`, matching "TYPE FOUNDRY"); grid cards drop `tags`; title `line-clamp-2` → `truncate`. Shared with the block under every article page.
- `apps/web/src/components/layout/Footer.jsx` — socials removed (`_tmp/2026-10-02-home-review-removed/`). ⚠ Only Instagram is linked anywhere now (takeover menu).
- `apps/web/src/components/sections/home/HomeFoundry.jsx` — `height="80"` so the 5/4 frame reads 630×504 at 1600×950 on component 0.239.0's width-follows rule (393×314 on the default rung).
- `lobby/` — three receipts filed + ledger rows + history; kol-ds-ui inbox entries, rows and history written there.
- `.kol/llm-context/plans/2026-10-02-media-app-and-sanity-media-scope.md` — read-only scope, parked.
- Memory: `humpty-is-retired`.

### DS round-trips (all three returned same day)
- `republish-kol-markdown-for-kol-search-0-3` → kol-markdown 0.1.3 🟢. `page-section-pads-x-inside-the-workshop-shell` → theme 0.164.1 (`.shell-main .kol-page` drops its x pad, cap and auto margin) 🟢. `section-split-frame-ratio-holds-at-desktop` → component 0.239.0 (`min-[901px]:w-auto`, the 08-27 bounded rule restored) 🟠, confirmation appended, theirs to close.

### Verification
- Alias migration: every `.kol-btn` painted style snapshotted on 25 routes before and after — identical (one font-weight on an icon-only button, invisible). `kol-eyebrow text-fg-64` probed identical to `kol-card-kicker`.
- Workshop: 48px off the rail at 1440 and 1100, 24 at 390, on the built app with no wrapper. Scroll spy follows the scroll.
- Foundry: 630×504 · 580×464 · 480×384 · 350×280 at 1600/1440/1280/390, 1.25 each.
- Builds green ×6; brand 13/13 and web 13/13 routes clean in dev once `apps/web/.env.local` arrived.

## Current State

### Working
- Everything above, measured. No KOL package behind as of 2026-10-03 morning.

### Known Issues
- **The lobby watch is silent on the MBP** — all three returns arrived unannounced; found by file-change notes. `lobby --lint` dies silently at the missing humpty lobby (user: humpty is irrelevant).
- Four social links (Behance · Dribbble · YouTube · TikTok) are linked nowhere after the footer change.
- Phones not looked at: the touch rung (theme, 09-29) makes every control 16/22 type with taller boxes.
- The 09-02 owed items stand: real-iPhone menu strip, the two `/work` shelf eyeballs, 📌 `RowRungAndFillThumb` / `RowVariantNamesAndSpecs` ledger rows.
- Working tree, undeployed.

## Laws this session bought
- **A bump a month wide needs a baseline**: install at the lockfile, build, then bump — the one break (`PageHeader`) and the two silent ones (scroll root, double gutter) were only attributable because of it.
- **Prove an alias migration with computed styles, not classes** — the classes change by design; the paint must not.
- **`vite preview` serves `app.html`, not `/`** (the build renames index.html for the metadata function) — measure the built app by fulfilling document requests with `dist/app.html` on a port of our own; never a second dev server beside the user's (shared `.vite` prebundle).
- **A transitive KOL package bumps with `pnpm update -r --depth 99 "@kolkrabbi/<pkg>"`**, not `pnpm add`.
- **The MBP's r2b2 checkout is the media app at its root** — there is no `apps/media` there; olina's is the diverged copy with permanent keys.

## Next Steps
1. User eyeballs home (Stack block, Foundry frame, footer) and a phone on the new packages.
2. kol-ds-ui closes `section-split-frame-ratio-holds-at-desktop`; nothing owed here.
3. Rule on the four unlinked social networks (restore somewhere, or drop them).
4. Discuss the media-app scope (`plans/2026-10-02-media-app-and-sanity-media-scope.md`) — four picks await rulings.
5. When he says so: file the silent lobby watch to dotfiles.
