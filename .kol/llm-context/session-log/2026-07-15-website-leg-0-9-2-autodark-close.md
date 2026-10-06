# Session: Website leg — 0.9.2/0.4.1 consumed, auto-dark killed, ledger 2.0 closed

**Date:** 2026-07-15 (late night, two-repo session with kol-ds-ui)
**Agent:** Grim (Fable 5)
**Summary:** First direct two-repo session under the mandate. Consumed theme 0.9.2 + chess 0.4.1, retired the tags pre-join shim on the real seam, and closed ledger 2.0 items 2.1–2.7 — including 2.4, where the user **overruled** an agent-made "keep auto-dark" closure: standing law is **light mode first until migration completion**, and the OS-follow block is now deleted from the theme.

## Changes Made

- `apps/web/package.json` + `apps/brand/package.json` — kol-theme `0.8.0 → 0.9.2` (exact), kol-chess `^0.3.0 → ^0.4.1` (web). Auto-dark verified gone from installed CSS (`prefers-color-scheme` count = 0); all six JetBrains italic declarations resolve against root `public/fonts/jetbrains-mono/` (files were already in place).
- `apps/web/src/routes/Work.jsx` — tags shim retired: `tags={project.tags} tagsSeparator=" · "` (seam shipped in kol-content 0.4.0).
- `docs/DS-CHANGES-2.0.md` — 2.1–2.7 struck. 2.4 = user ruling (light-first until migration completion; block deleted DS-side, theme 0.9.2). 2.5 fully closed — user ran `npm deprecate @kolkrabbi/kol-specimen@"*"`, flag verified on the registry. **Open carry to DS: 2.8 / 2.9 / 2.10.**
- `sprint-ds-adoption/04-package-registry.md` — synced to tonight's registry truth (theme 0.9.2, chess 0.4.1, content 0.4.0 ✅ web, component 0.11.0, foundry 0.4.2, specimen flagged deprecated).
- Build gate: `turbo run build --force` **5/5 green** on the final state.

## Current State

- Handoff-list reconciliation: 5 of 8 to-dos were already done by earlier sessions (titleClassName, toggle shim, kol-sources manifest, optimizeDeps, CodeBlock swaps) — the handoff predates the evening waves.
- Elder census unchanged at 66 files: workshop 30 · foundry (routes) 15 · sections 8 · fontviewer 6 · prints 3 · misc 4.
- **Workshop twin-map built (reads only, zero edits):** clean DS twins exist for Dropdown/QuantityInput/SourcesReferences/ButtonGroup/SearchInput/ThemeToggle/Asset previews; NO twins: OverviewCard (×6 routes), PlayPauseButton, LinkCard, SidebarMenuItem, CollectionCard, LinkWithIcon; foundry previews ×7 fold into the foundry arc (several targets deliberately cut from kol-foundry).

## Next Steps

1. **Prints + foundry sweeps** — agent-autonomous, next arc. Foundry needs a kol-foundry adoption decision (dep not yet installed; fontviewer engine not yet extracted DS-side — partial swap only).
2. **Workshop sweep LAST, joint session with the user** (his call 2026-07-15 — never solo). Twin-map above is the working input.
3. **🔧 /stack articles are visually messed up (user report, 2026-07-15 late night) — MANUAL JOINT FIX LATER, do not attempt solo.** Context for whoever picks it up: the stack surface went zero-elder tonight, elder prose.css was collapsed 788→418, and the 2.8 font-token shim moved to `:root` — regression likely lives in that cluster. Diagnose live with him, not from the diff.
4. User's court: kol-segment-title ruling · live check of the wave after dev restart.
