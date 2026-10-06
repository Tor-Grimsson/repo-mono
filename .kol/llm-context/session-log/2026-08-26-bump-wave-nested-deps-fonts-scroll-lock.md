# Session: Bump wave + five mobile receipts executed; NestedDsDependencies round-trip; fonts case fix; takeover scroll lock

**Date:** 2026-08-26
**Agent:** Grim
**Summary:** Bumped to the four mobile returns (component 0.68.1 · framework 0.23→0.24.0 · theme 0.51.0→0.52.1) and executed every receipt remainder — then found the bump reached nothing inside kol-workshop: five DS app packages nested their own stale kol-component/framework (workshop ran component 0.39.0, store 0.8.0). Filed `NestedDsDependencies`, the DS republished the five with the tier as `peerDependencies` the same day, consumed here; `pnpm why kol-component` → one version. Also: production fonts were falling back because git never saw the 08-14 `Right-Grotesk → right-grotesk` case rename (user ran the two-step `git mv`); the takeover menu's scroll lock never released on close (`useGSAP` with `dependencies` reverts only on unmount) — moved to `useEffect`; prints overlay defaults to A1 limited; `brand-redeploy-frees-media-hostname` closed with receipt to kol-r2b2. **All pushed — deployed.**

## Changes Made

### Files Modified
- `apps/web/package.json` · `apps/brand/package.json` — component ^0.68.1 · framework ^0.24.0 · theme 0.52.1 (exact) · icons ^0.18.0; web also chess ^0.7.0 · content ^0.9.0 · foundry ^0.6.0 · store ^0.2.0 · workshop ^0.23.0. A root `pnpm.overrides` block lived for two hours as the stopgap and is gone (pnpm 10 no longer reads that key anyway; the react pin lives in `pnpm-workspace.yaml`)
- `apps/brand/src/styles/sidenav-collapse.css` — mobile stopgap block deleted (SideNavMobilePosition shipped in framework 0.23.0); file is 35 lines, two rules
- `apps/web/src/routes/workshop/DashboardComponents.jsx` — six two-up rows `flex flex-col md:flex-row gap-6 items-start` (DS counted five; line 362 is the sixth)
- `apps/brand/src/components/styleguide/AssetTable.jsx` — download + toggle buttons 16→24 hit box (`w-6 h-6`, `gap-4`→`gap-2` keeps glyph spacing at 20px; icon 16 / dot 8 untouched) — MobileTouchFloor remainder
- `apps/brand/src/pages/Reference.jsx` (2 links) · `apps/brand/src/pages/Gallery.jsx` (folder links) — 24px pseudo-element hit extent (`relative before:absolute before:inset-x-0 before:top-1/2 before:h-6 before:-translate-y-1/2 before:content-['']`), the DS's own device; hit-tested ±5px at 393
- `apps/brand/src/pages/Gallery.jsx` — header `pl-16 md:pl-5`: the package hamburger (fixed 12,12 40×40) sat on the page's own sticky header once content starts at top 0
- `apps/brand/src/components/framework/PageSection.jsx` — lede `break-words`: four `/assets` ledes overflowed on `packages/component/src/graphics/svg/…` tokens (document 449 wide at 393)
- `apps/web/src/components/layout/TakeoverMenu.jsx` — scroll lock (body + html overflow, Escape) moved from `useGSAP` to `useEffect`; comment explains why
- `apps/web/src/routes/prints/PrintDetailOverlay.jsx:25` — `useState('A1-limited')` (was `A3-open`); pricing + PayPal links already existed
- `public/fonts/Right-Grotesk` → `public/fonts/right-grotesk` — **user's `git mv` two-step**; production (web AND brand) had served the capitalised folder while theme ≥0.41.0 CSS asks lowercase → every Right Grotesk face 404'd → `ui-sans-serif` everywhere
- `lobby/` — five mobile receipts 🟢 with remainders executed; `NestedDsDependencies` filed + returned 🟢 same day; `brand-redeploy-frees-media-hostname` closed → `.kol/llm-context/lobby-archive/`; ledger rows + three history lines; kol-ds-ui and kol-r2b2 ledgers updated; `bin/lobby --lint` clean

### Findings that became laws (also in AGENT-CONTEXT)
- **A DS app package that declares the tier as `dependencies` nests its own copy.** kol-workshop 0.22.0 pinned `kol-component ^0.39.0` / `kol-framework ^0.20.0` — 0.x carets that can never reach current — so ShellHeader ran 0.20.1 (no active-tab scroll) and DocumentationReader's CodeBlock ran 0.39.0 (no wrap). chess 0.38.0 · content 0.63.0 · foundry 0.52.0 · store 0.8.0 likewise; only kol-dashboards had peers. Fixed at the source (peers with `>=` floors in all five). **After any bump: `cd apps/web && pnpm why @kolkrabbi/kol-component` must say "Found 1 version".** kol-framework → component and kol-component → icons still declare `dependencies` (same class, not yet moved)
- **Case-only renames need `git mv` on macOS.** The 08-14 rename was a plain `mv`; git (`core.ignorecase`) recorded nothing; Vercel's Linux served the old name. Brand's catch-all rewrite masked its 404s as `200 text/html`
- **`useGSAP` is not a side-effect hook.** With `dependencies` and no `revertOnUpdate` it reverts only on unmount — a cleanup returned from it never runs on a dependency flip. Reproduced on production: open hamburger → close → `html.style.overflow` stays `hidden`; workshop pages hid it (they scroll inside the shell), Home showed it
- **`pnpm.overrides` in package.json is dead in pnpm 10** — `pnpm-workspace.yaml` `overrides:` is the home (the react pin is already there)

## Current State

### Working
- Both apps on one DS copy: component 0.68.1 · framework 0.24.0 · theme 0.52.1 · icons 0.18.0 beneath every `@kolkrabbi/*` app package; probe at 393 after the peers-only install: Dashboard tab scrolled into view (scrollLeft 268), docs CodeBlock `pre-wrap` 311/311 with stamped lines + 44px lane, prints/chess/foundry/brand zero console errors, brand drawer `fixed` at −280 with content top 0, ToggleSwitch `::before` 24px
- Production after the push: `/stack/vcap` blocks wrap with the copy lane, workshop tabs scroll, fonts back (user confirmed), scroll lock released on close (verified locally step-by-step against the same steps that stick on the pre-push build)
- `lobby/inbox` EMPTY; all 23 outbox receipts 🟢 with `Remainder here: none`

### Known Issues
- Brand `/components` demo page is 569px wide at 393 — pre-existing, untouched
- Workshop shell `h1` computes `ui-sans-serif` on production — a DS heading not on the Right Grotesk stack; not filed
- kol-r2b2's remainder (detach `media.` from R2, attach to the Pages project, repoint two files) is theirs and unblocked
- Escape did not close the takeover in the headless probe (both local and production) while the toggle did — unverified whether real keyboards see it; not chased

## Next Steps
1. Phone eyeballs still owed from the audit: takeover reveal delay · home hero words · `/work/:slug` drag · brand Graphics previews
2. Rulings: `/brand` Overview "Chapters" copy · AC data quarantine · accent override · editor presets · Landing uppercase · root statics hoist
3. Anatomy round 2 (MediaCard/MediaRow census) when he wants it
