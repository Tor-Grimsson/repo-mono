# DisplayTightRamp — display-01/02 go Tight 500; `kol-display-lg` retires; one type system

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/DisplayTightRamp.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-theme 0.59.0; remainder executed here 2026-08-27

## Why it went there

Two display voices in kol-theme: `kol-display-lg` (Right Grotesk Tight 500,
uppercase baked in — the last of the retired size-named ramp) and the
numbered `sans-display-01/02` (Narrow 500). User: the Tight one is the
correct face. Ask: 01 and 02 become Tight 500, `display-lg` aliases to 02
for one release then goes, no size-named type class left in the theme.

## Remainder here once it ships

bump kol-theme; swap `kol-display-lg` ×5 → `kol-sans-display-02` (HomeHero ·
Stack · NotFound · PrintsGridGsap · Demo, `headlineCase`/uppercase where the
old class baked it); swap the already-dead `kol-heading-lg/md/xs` ×9 to
numbered heading roles (ErrorBoundary · DashboardComponents · Demo · NotFound)

## ✅ RETURNED — 2026-08-27 · kol-theme 0.59.0

The display ramp is Right Grotesk Tight 500, one face, four rungs, no tracking: .kol-sans-display-01/02/03 move off Narrow, .kol-sans-display-04 (32/36/40) ships — SectionHero's media headline defaulted to that role since component 0.80.0 with no rule behind it. The elder voice (kol-display-lg / -section / -section-sm / -subsection) ships as aliases onto 01 / 02 / 03 / 03 keeping their uppercase, first CSS rows in 04-retirements.md; the gate now detects CSS aliases and lists importers (kol-website x8, kol-mirror x4, kol-chess x2). Measured all eight classes at 1280/768/390.

**Remainder here:** bump kol-theme 0.59.0; swap kol-display-lg -> kol-sans-display-01 uppercase (NOT 02 — lg and 01 are both 96px at desktop; 02 tops at 64), kol-display-section -> kol-sans-display-02 uppercase, kol-display-section-sm -> kol-sans-display-03 uppercase; the dead kol-heading-lg/md/xs swaps you already did stand

✅ **Remainder executed 2026-08-27 same session:** kol-theme 0.59.0 in both apps. 19 swaps, zero elder classes left in web: `kol-display-lg` ×5 → `kol-sans-display-01 uppercase` (ErrorBoundary · HomeHero · NotFound · PrintsGridGsap · Demo), `kol-display-section` ×2 → `display-02 uppercase` (Demo), `kol-display-section-sm` ×3 → `display-03 uppercase` (StackLatest · Stack ×2), and the dead `kol-heading-lg/md/xs` ×9 → `kol-sans-heading-01/02/05` (DashboardComponents). Stack hero title back on `display-01` (lg = 01 at desktop — the 02 detour was wrong). Builds green.
