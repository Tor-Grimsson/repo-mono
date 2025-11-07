# 2025-11-07 – Chess Controls Alt Mock + Icon Cleanup

## Summary
- Matched the “Controls Panel” card to the provided design reference by reworking layout, padding, and iconography in `apps/web/src/routes/styleguide/ChessComponents.jsx`.
- Introduced an `AlternativeControlsMock` stack that mirrors the screenshot: Setup header now shows paired `foundation` icons, palette rows are 80×80, status pills use shared `bg-opacity-hex-04`, capture summaries sit directly above the notation block, and bingo/notation/playback share a single column layout.
- Playback controls now use the actual `play-*` icons with dynamic play/pause toggling; all micro “{}” placeholders were swapped for icons to keep the mock consistent.
- Updated the migration doc (`docs/documentation/8.4.0-chess-components-ui-changes.md`) to capture these UI refinements for future reference.

## Files Touched
- `apps/web/src/routes/styleguide/ChessComponents.jsx`
- `packages/ui/src/atoms/icons/svg/play-*.svg`
- `docs/documentation/8.4.0-chess-components-ui-changes.md`

## Next Steps
1. Decide whether any of the mock-only styling should migrate into the production ChessSidebar component.
2. Hook the play/pause toggle into the real playback handlers if we want parity between the mock and live sidebar.
