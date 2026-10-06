# Handoff — 2026-07-09 00:22

## Goal of the current arc
Modernise the workshop's **main content** (not the shell): adopt the framework's flowing-section
pattern for showcase pages, kill the expand-each-block accordion, and fix the Dashboard section's
scope. First, though — **pull the just-published `@kolkrabbi/*` npm updates** the user pushed, since
the content work lands on top of the new component + framework versions.

## Last actions taken (causal trail, newest first)
- User chose to **stop, handoff, clear context, and re-init fresh** rather than continue this session. This handoff is that bridge.
- Ran `pnpm outdated -r "@kolkrabbi/*"` — **4 packages behind**, user just pushed updates (see npm block below). Handed the user the install command; **NOT run yet**.
- Agreed a plan for 4 asks (dashboard/chess split, `/metrics` use-case, max-width→content, framework `PageSection` for main content). User was receptive + added the npm pull. **Nothing executed** — discussion only.
- Confirmed the framework move does NOT break last session's `AppShell`-rejection lock (different layer — see below).
- **(Committed earlier this session, DONE):** Apparatus-gallery **Phase 4 cleanup** — see `session-log/2026-07-08-apparatus-gallery-phase4-cleanup.md`. Build was green.

## Current state / open decision points

### ⚠️ FIRST: pending npm update (user pushed, not yet pulled)
Run this — plain `pnpm update` will only grab framework 0.3.2 and **silently skip the other three** (0.x-minor bumps sit outside the caret ranges):
```
pnpm update -r --latest "@kolkrabbi/*"
```
| Package | Current → Latest | Notes |
|---|---|---|
| @kolkrabbi/kol-component | 0.5.0 → **0.6.0** | web |
| @kolkrabbi/kol-icons | 0.4.0 → **0.5.0** | web |
| @kolkrabbi/kol-theme | 0.5.0 → **0.6.0** | brand + web |
| @kolkrabbi/kol-framework | 0.3.1 → **0.3.2** | web (in-range) |
After install → `pnpm exec turbo run build --force` to confirm green. Watch for breaking changes across three simultaneous 0.x-minor bumps (token/prop moves in kol-component / kol-theme 0.6.0).

### The agreed plan (endorsed, NOT yet greenlit to execute)
Four asks, all ✅ in my read:
1. **Dashboard drops "Chess"** — remove the `chess` child from `dashboard.children` in `apps/web/src/data/workshop/navigation.js`. Chess is already its own top-level section (ChessHome/Analysis/Metrics/Components), so `dashboard/chess` is a misplaced dupe.
2. **Feature `/metrics` as a use-case** in the Dashboard Overview — it's the dashboard components in production (kolkrabbi.io/metrics, Image 1). Same-origin, so a live embed is possible; simplest = preview-card + link.
3. **max-width off the layout → onto content** — `apps/web/src/components/shell/ShellLayout.jsx:112` clamps the whole 3-col wrap at `max-w-[1800px]`. Drop it; let content own its measure (which `PageSection` already does).
4. **Framework `PageSection` for main content + kill the accordion.**

### Why #4 does NOT break the lock
Last session rejected swapping `AppShell`/`SideNav` = the shell chrome (header/sidebar/TOC) = "the look" — **still holds**. `PageSection` renders **inside `<Outlet/>`** (content body), a different layer. Shell stays local + unchanged.

## Next intended action
1. **Pull npm** (command above) + rebuild green. Do this before touching code.
2. **Dashboard fixes** (small, independent): drop `chess` child + add `/metrics` use-case block.
3. **PageSection pilot on Dashboard first**, then sweep Design System + Components once the look is validated.

## Working memory not yet in AGENT-CONTEXT
- `@kolkrabbi/kol-framework@0.3.1` is **already installed in apps/web but used NOWHERE** (grep-verified). It exports `PageSection` (+ AppShell, SideNav, Layout, ThemeToggle, PortalFooter, BrandHero, SubPageHero). So #4 needs **no new dependency** — just consume `PageSection`. Reference impl: `apps/brand/src/components/framework/PageSection.jsx` (24 lines — `<section>` + optional `kol-prose-*` header + children; `fullbleed` toggles 720↔960 header width).
- The accordion to kill = `apps/web/src/components/workshop/molecules/ComponentPreview.jsx` — a big `switch` rendering live demos behind a per-block **Show/Hide** button (`isExpanded`, default collapsed). PLUS the section-level machinery: `useSectionExpansion.js`, `WorkshopExpansionContext.jsx`, `StyleguideExpansionProvider`, and the **EXPAND ALL** toggle. Plan: keep the demo `switch` (render expanded inside a `PageSection`), delete the expand/Show-Hide chrome.
- Caveat for #4: `PageSection` is only the section shell — the live component demos still need the `ComponentPreview` `switch` body; this is "replace accordion chrome + default-open," not a demo rewrite.
- Check on max-width (#3): make sure `docs-article` / docs pages don't already carry their own width clamp → avoid double-clamping once ShellLayout's is gone.
- Phase-4 leftover (unrelated, owner-decision): fate of `docs/documentation/05-workshop/03-mirrors.md` + `kol-radar` blurb — see `sprint-apparatus-gallery/02-plan.md`.
