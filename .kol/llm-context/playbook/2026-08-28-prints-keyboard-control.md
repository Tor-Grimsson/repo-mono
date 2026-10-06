# Playbook — /prints keyboard control set

Arc: the print catalog gets driven from the keyboard — arrows step images, Shift+arrows step prints, `a`/`p` swap artwork vs print photo, `r` re-rolls. Goal file: `.active-goal-30592312-….md` (7 items).

2026-08-28 T+0 arc opened. Premise corrected first: `/prints` never mixed artwork and print — all 24 cards render `print.image` (always the artwork file); the randomness is the ORDER only (`PrintsGrid.jsx:8`, `sort(() => Math.random() - 0.5)`). So `a`/`p` is a NEW image-kind toggle, not a restore.
2026-08-28 T+0 blocker named up front: the shuffle is frozen in `PrintsGrid` (`useState` on mount), invisible to the overlay — so Shift+arrow would loop in DATA order while the grid shows another, and `r` has nothing to re-roll. Both fixed by ONE move: lift the list to `Prints.jsx`, the route both children already hang off.
2026-08-28 T+0 data confirmed: `image` = artwork, `detailImages[0]` = the print photo, `detailImages[1]` = the certificate. 24/24 have both, so the `p` fallback is defensive, not load-bearing.
2026-08-28 T+0 overlay already carries `galleryItems` + `activeImageIndex` + an Escape keydown effect — arrows hang off the effect that exists, no new listener.
2026-08-28 T+1 `lib/keys.js` minted — `isTypingTarget` (INPUT/TEXTAREA/SELECT/contentEditable) + Fisher-Yates `shuffle`. Two consumers, so it is a file not an inline.
2026-08-28 T+1 order LIFTED: `Prints.jsx` owns `ordered` + `imageKind`; PrintsGrid takes them as props (its mount-frozen `useState` gone). `r` re-rolls, overlay stays open.
2026-08-28 T+1 ⚠ DEFECT CAUGHT IN MY OWN DIFF: I first handled Shift+Arrow in BOTH the route and the overlay — both listeners are on `window`, so one press stepped TWO prints. Shift now has ONE owner (the route); the overlay yields it with an early return. Comment says why so it does not come back.
2026-08-28 T+1 second layering bug, same class: kol-shell's `ShortcutsOverlay` owns Escape, and so does the print overlay — one Escape closed both. `keysEnabled={!showShortcuts}` gates the lower layer.
2026-08-28 T+1 `s` → kol-shell `ShortcutsOverlay` (NOT a local sheet — the DS has had it since 0.9.0). apps/web had no kol-shell, so all THREE wirings went in per the standing law: dependency · `@source` in index.css · `optimizeDeps.exclude` in vite.config.js. Miss the last and it fails DEV only.
2026-08-28 T+1 web builds green.
2026-08-28 T+2 doc written: `docs/documentation/04-pages/12-prints.md` (reference archetype, keymap table, the three layering rules, the order + artwork/print sections). INDEX row added; `10-prints-landing-experiments.md` got the reciprocal `related:` AND a superseded note — its "Production (PrintsGridGsap)" section described a page retired to `_tmp/` on 08-27.
2026-08-28 T+2 DS question answered NO, nothing to file: kol-shell already ships `ShortcutsOverlay` (used it), and its "shows a keymap, never binds one" line is a stated DS ruling — filing against it would re-litigate a decision, not report a gap.
2026-08-28 T+2 3/3 builds green. Goal closed, 9/9. Every shortcut owed his eyes on a running server.
