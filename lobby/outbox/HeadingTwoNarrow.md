# HeadingTwoNarrow — `.kol-sans-heading-02` moves to sans-narrow

**Filed:** 2026-08-12 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/HeadingTwoNarrow.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-12 — shipped in `@kolkrabbi/kol-theme@0.40.0`: `.kol-sans-heading-02` is sans-narrow; the ramp boundary is now 01+02 narrow · 03–05 compact. ✅ **Remainder executed 2026-08-12 same session:** theme 0.39.0→0.40.0 (exact, both apps); hero + takeover eyeball is the user's

## Why it went there

User ruling from the home hero (`p.kol-sans-heading-02.uppercase`): *"this
should be Narrow ,, make heading-02 narrow not compact"*. The family lives in
the class in kol-typography.css — the ramp's narrow/compact boundary drops one
rung (01+02 narrow, 03–06 compact). A local font-family override would fork
the type system.

## Remainder here once it ships

Bump theme; eyeball the home hero and the takeover menu's heading-02 line.
