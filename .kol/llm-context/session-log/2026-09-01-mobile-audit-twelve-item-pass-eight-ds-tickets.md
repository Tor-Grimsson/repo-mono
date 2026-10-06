# Session: Mobile audit round two — the twelve-item pass, eight DS tickets, three local fixes

**Date:** 2026-09-01
**Agent:** Grim
**Summary:** The 08-31 arc's open findings rebuilt from SOURCE (the plan had gone stale), measured under real device emulation, and closed out: eight tickets to kol-ds-ui, three fixes here, one finding killed, one unreproducible.

## Changes Made

### Files Modified
- `apps/web/src/components/sections/shared/StackLatest.jsx` — three dead `kol-label` uses → `kol-helper-20` (the `kol-label-*` family was deleted 2026-07-15, so the heading carried NO type class); card `titleClass` `truncate` → `line-clamp-2`
- `apps/web/src/routes/prints/PrintDetailOverlay.jsx` — image area `min-h-[45svh] lg:min-h-0` + the comment explaining why
- `.kol/llm-context/playbook/2026-08-31-mobile-audit-round-two.md` — T+3 and T+4 entries
- `lobby/INDEX.md` · `lobby/outbox/` — 8 receipts + 8 rows
- `~/dev/projects/kol-ds-ui/lobby/` — 8 entries + 8 ledger rows (their queue 5 → 9)

### Filed to kol-ds-ui — eight, all 🔵
`ContentTextTagsSlotRendersRawArray` · `ContentFiltersMobileGaps` · `OverlayScrimTapDismiss` ·
`OverlayScrimBlur` · `OverlaySearchFieldZoomsIOS` · `SectionSplitVisualHeightRemainder` ·
`ContentRowShowcaseImageDrivenHeight` · `SectionNewsletterMobileFoot`

## Current State

### Working
- **All three local fixes VERIFIED** on a dev server at 5173 under iPhone 13 emulation, by measurement and by eye: Studystack heading now JetBrains Mono 20px · card title 2 lines / 72px showing the full string (was cut at 350 of 447px) · print overlay media box 315px with the image visible at 189×267 (was collapsed to the thumbnail strip)
- Build 3/3 green; both edited files parse clean under esbuild
- kol-ds-ui LINKED in `apps/web` — `kol-link component theme workshop`, source 0.149.0 / 0.116.0 / 0.25.0, identical to installed. `package.json` untouched, invisible to git/CI. `kol-link --off` restores
- Dev server killed (PID 52823), 5173 released; the 5174 listener is not ours and was left alone

### Known Issues
- **Nothing is pushed.** Working tree only, on top of the 08-31 tree which is also unpushed
- 8 DS tickets are 🔵 — none consumed; every remainder is "bump when it ships"
- `SectionSplitVisualHeightRemainder` is the only finding with no local half to verify

## Four laws this session bought

- **Measure the LEAF, not the box around it.** I read `getComputedStyle` on the tags CONTAINER and reported "system sans on /work" — the tags there are correct `kol-tag--sm` in JetBrains Mono 10px. Same wrong-element error the 08-31 session already paid for once.
- **Emulate the device; a resized window proves nothing.** A 390-wide desktop viewport reports `pointer: coarse` FALSE, so every `@media (pointer: coarse)` rule silently does not apply. I told the user the 16px floor "should be reaching" the search field off a source read; under real iPhone 13 emulation it is 14px in a shell that is `NEITHER` `.kol-control` nor `.kol-expand`. The plan was right and I was wrong.
- **Read LLM_RULES before inventing a mechanism.** I wired the DS link as `link:` overrides in `pnpm-workspace.yaml` — a committed file, visible to git and CI. The 2026-08-31 bulletin ships `kol-link` for exactly this and never touches `package.json`. Reverted.
- **A reported symptom names the wrong component more often than not.** "The studio about card crops its graphic" is not the card and not a crop: the split's grid is `height:555px` / `rows 390px 117px`, so the media row takes the REMAINDER and clips a fully laid-out 350×350 card under `overflow: hidden`. Five consumer ancestors all measure 350×350.

## Two findings that did not survive
- **Right-edge overflow: does not exist.** True 1× measures `scrollWidth == innerWidth == 390` on `/`. It was the iOS zoom, as A1 predicted.
- **Search overlay status rows: unreproducible.** A non-matching query renders the field and nothing else — there are no status rows to pad. Reported as such rather than filed.

## Next Steps
1. **Push.** Two sessions of working-tree changes now.
2. Watch for the eight returns; each remainder is a bump.
3. `kol-link --off` before verifying anything against a deploy.
