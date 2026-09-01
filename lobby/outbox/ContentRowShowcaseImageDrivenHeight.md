# ContentRowShowcaseImageDrivenHeight — the row's height follows its text, and the thumb never grows with it

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentRowShowcaseImageDrivenHeight.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

The user's ruling is that the card height must be a function of the image. `showcase` declares `minH: 168` — a floor — so `/work` measures 230 · 208 · 198 · 170 at 390 while the thumb stays pinned at 136×136 `self-start`. The variant box is the DS's.

## What stays here

Nothing. `/work` passes no height and should continue not to.

## Remainder here once it ships

bump; if the lever lands as a prop, `/work`'s list is the call site.

## ✅ RETURNED — 2026-09-01 · kol-component@0.150.1

showcase carries heightSm: 168 — a FIXED rung below the md container (.kol-row--fixed-sm, kol-theme 0.117.0), the floor above it, unchanged. 168 is the floor's own number (136 thumb + 2×16 pad): a change of KIND, not value — content never sets the row's height. The lever: the tags line goes single-row below md (max-md:flex-nowrap overflow-hidden in the showcase row ramp) so the cut lands on the chips' edge, not mid-row; title and body already truncate by ramp. minHeight still overrides the rung.

**Remainder here:** bump kol-component@0.150.1 + kol-theme@0.117.0; /work passes no height and should still pass none

✅ **Remainder executed 2026-09-01 same session:** component ^0.150.1 + theme 0.117.0; `/work` still passes no height. The fixed-168 rung verifies on production (Sanity CORS blocks `/work` locally). DS design call to know: tags go single-row below md on the showcase row.
