# Playbook — home fix round

> **Live work journal.** Append-only, newest at the bottom, real timestamps. One idea per line, no prose.
> Milestone logs: `session-log/`.

**Goal:** the user's 10-item review of home / foundry / stack (2026-10-13), rounded to one ticket + six local edits.

**Standing rules (non-negotiable):**
- One ticket to kol-ds-ui (BackgroundVideo HLS start level); everything else local.
- Primary hover (the well) and the tilt banding are NO CHANGE — ruled/explained, not edited.
- Never touch user-facing copy beyond what was asked.

---
## Entries

[20:21 GMT · 2026-10-13] · setup · playbook created
  what → initialised the live playbook   why → /kol-goal + /playbook on the fix round

[20:22 GMT · 2026-10-13] · ticket · kol-ds-ui lobby
  what → BackgroundVideoStartsAtLowestRendition filed (entry · DS row · receipt · our row)   why → new Hls() unconfigured, starts 360p
  note → ✓

[20:22 GMT · 2026-10-13] · home · hooks/useFeatureCards.js:44
  what → Collections card → /stack   before → /work?view=list   after → /stack   ✓

[20:22 GMT · 2026-10-13] · home · components/sections/home/HomeHighlights.jsx
  what → enableTilt={false} on all 7 TiltBento   why → user: tilt too much, disable for now   ✓

[20:22 GMT · 2026-10-13] · home+stack · components/sections/home/HomeSignup.jsx:20
  what → newsletter band ground off   before → bg-fg-absolute-16   after → none   ✓

[20:22 GMT · 2026-10-13] · stack · routes/StackArticle.jsx
  what → TOC blurb "A condensed outline…" deleted, heading kept   ✓

[20:22 GMT · 2026-10-13] · foundry · components/sections/foundry/InDevelopmentSection.jsx:28
  what → placeholder note   before → MISSING   after → In progress   ✓

[20:22 GMT · 2026-10-13] · home hero · components/ui/HlsVideo.jsx
  what → hls.js startLevel -1 · 8 Mbps estimate · capLevelToPlayerSize   why → same ask as the ticket   ✓
  verify → esbuild parse ✓ on all six files · no dev/build run (user validates live)

[20:37 GMT · 2026-10-13] · return · BackgroundVideoStartsAtLowestRendition 🟢
  what → kol-component ^0.252.0 → ^0.255.0 in all four apps   note → 0.254.0 never on the registry; 0.255.0 has HLS_DEFAULTS · one copy ✓
  what → HomeHero on DS BackgroundVideo (aria-hidden passed)   why → HLS_DEFAULTS not exported from the index
  what → components/ui/HlsVideo.jsx ▣ _tmp/2026-10-13-local-hlsvideo/
  verify → parse ✓ · tiles ≥720p not measured here
