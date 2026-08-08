# tone-of-voice-skill-and-agent — voice skill + review agent

**Filed:** 2026-08-06 → **dotfiles**
**Entry:** `~/.dotfiles/lobby/inbox/tone-of-voice-skill-and-agent.md`
**Ledger:** `~/.dotfiles/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-06 — both files shipped the same day on the user's go and harness-verified in-session (skill registered + run on `Tone.jsx`; `kol-voice-agent` listed in the roster). Resolution appended at the destination, entry in `done/`. **Remainder here: none** — the de-clienting rewrite the first audit triggered shipped the same day (About · Tone · Landing tagline · StationeryMocks caption)

## Why it went there

Voice is cross-repo — kol-studio, brand, web, docs and press research all write
in it — and cross-repo skills/agents live in dotfiles `claude/`. The ask: a
`tone-of-voice` skill loading both registers (brand:
`kol-studio/data/studio/11-brand-voice-guide.md` · docs: this repo's
`docs/documentation/01-foundation/07-writing-guidelines.md`) plus a
`kol-voice-agent` review agent on the existing roster naming pattern.

## What stays here

- **The Tone page drift is ours regardless** —
  `apps/brand/src/pages/brand/Tone.jsx` is hand-authored and reads from neither
  guide. Once the skill exists, the page's copy gets audited against it; any
  reconciliation of page ↔ guide is content work in this repo (and kol-studio's
  guide is the canonical source per the 07-30 bio/CV precedent).
