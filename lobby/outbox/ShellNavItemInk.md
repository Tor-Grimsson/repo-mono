# ShellNavItemInk — rail row ink/weight tune + weight inconsistency

**Filed:** 2026-08-12 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/ShellNavItemInk.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-12 — shipped in `@kolkrabbi/kol-theme@0.39.0` (pure CSS): rest ink fg-64→fg-80, `.is-active` += weight 300, and the rails split root-caused — the `--own` tags block's weight 500 was the medium side (every plain row in both rails rests at 100, probe-verified); `--own` harmonized to 300. ✅ **Remainder executed 2026-08-12 same session:** theme 0.35.0→0.39.0 (exact, both apps) in the "bump everything" wave (component ^0.37.0 · framework ^0.19.0 · icons ^0.15.0 rode along); build 3/3 green, live rail eyeball is the user's

## Why it went there

Three user rulings on the workshop rails, all kol-theme/kol-workshop territory:

1. `.shell-nav-item` resting ink `--kol-fg-64` → `--kol-fg-80`
2. `.is-active` gains `font-weight: 300` (rows rest at weight 100)
3. Bug: the two rails render DIFFERENT resting weights — left tree thin, right
   rail (Documentation/Quick actions) medium — *"one side is light the other
   medium? INCONSISTENT"*. Both go through the package's RailRow; kol-website
   carries zero hand-rolled `shell-nav-item` markup, so the split is DS-internal.

## Remainder here once it ships

Bump kol-theme (and kol-workshop if the fix lands there) and eyeball both rails
once, live.
