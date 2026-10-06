# Handoff — 2026-08-15 03:30

## Goal of the current arc

The anatomy-consolidation arc (playbook `playbook/2026-08-15-anatomy-consolidation.md`):
kill the per-page rebirth of heroes/split-sections/article-cards. Components target
79 → ~55 files. Round 1 is done; the arc now waits on DS round-trips and the user's
eyeballs.

## Last actions taken (causal trail, newest first)

- kol-workshop **0.22.0 consumed** minutes after the DS returned it — dashboard
  section re-declared on ExhibitOverview/ExhibitPage, six consumer files swapped,
  DesCard + WorkshopSidebarContent + OverviewCard retired
- `ArticleHeaderReconcile` + `FeaturedCarouselReconcile` filed (the diverged twins)
- Round-2 correction: **MediaCard + MediaRow already ship** — round 2 is a local
  adoption census, not a DS brief
- Earlier same session: statics rebuild (fonts/images/CDN), Gallery restore,
  7-agent full-depth src/ audit + fixes, naming law doc, theme 0.41.0 + icons
  0.16.0 waves consumed

## Current state / open decision points

- **4 🔵 at kol-ds-ui:** SectionSplit · ArticleCard · ArticleHeaderReconcile ·
  FeaturedCarouselReconcile. Adoption remainders land here when they return.
- **Eyeballs owed (user, next dev run):** workshop dashboard pages (exhibit system
  shipped UNEXERCISED — this was its first render) · /studio ProfileCard logo
  (now currentColor) · typeface-page hero (DS FullBleedHero scrim vs old img-dim) ·
  /library/gallery · intro loader (absolute tokens)
- **User rulings open:** monitor.mp4 → CDN (34M, `images/dev/`) · the 4 route-less
  "embedded live" dashboard cards (build embeds or trim) · hygiene-audit tail
  (px-text/opacity/hex sweeps, vite 5→8) · FoundryTypefaces weight table vs
  typefaceConfig (values differ — content decision)
- Everything since 08-09 **undeployed** — rides the next push.

## Next intended action

- If DS returns arrive: consume per receipt remainders (adopt + retire + bump).
- Otherwise: round 2 — census the tile-lookalike cards (prints grid, library
  folder tiles, TypefaceLibraryItem, BentoCard consumers) against MediaCard/
  MediaRow's slot contract; adopt, file only real gaps.

## Working memory not yet in AGENT-CONTEXT

- The goal-loop file was found once reverted to a prior goal mid-session (cat >
  succeeded, later showed old content) — if a goal write seems to vanish, rewrite
  it; don't trust the first write.
- HomeFoundry tilt is measured ALIVE (±4° springs respond to synthetic mousemove);
  if the user's remembered animation was bigger, that's a design delta — ask what
  it should do before touching code.
- HomeHighlights hover glitch (his screenshot): BentoCard markup renders title
  always-visible by design; the scramble looks like AsciiCursor interplay — needs
  HIS browser to reproduce. BentoCard is round-2 material anyway.
- `grep` in this shell is aliased to ugrep; subprocess grep in python behaves
  differently on symlinked dirs — caused one false "238 unused fonts" scare.
  Read files in python for censuses.
