# MobileTouchFloor — 10px chrome and 14–26px controls — a ruling request

**Filed:** 2026-08-25 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/MobileTouchFloor.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — ruled + built as kol-theme 0.51.0; remainder executed here 2026-08-26

## Why it went there

Class-wide counts from the audit (100–430 sub-11px elements per brand page; toggle-switch 34×14, seg-cell 24, btn-sm 26, Slider track 2px). Filed 🔴 needs-ruling so the question has a home in the DS, not as a build order. Source: `.kol/llm-context/plans/2026-08-25-mobile-audit-web-brand.md`.

## Remainder here once it ships

none until ruled — then bump kol-theme

## ✅ RETURNED — 2026-08-26 · kol-theme@0.51.0

Ruled, and the ruling built. NO type floor: 10px chrome (`kol-helper-10` / `kol-mono-10`, the 10.4px table header) is the chrome voice at every width — a mobile step would reflow every rail and table for a class of text that is labels, not copy. HIT FLOOR 24px (WCAG 2.5.8 AA), reached without moving the drawn size: the size scale (26/32/40) and `.kol-seg-cell` (24) already clear it; the two controls under it are lifted in kol-theme 0.51.0 — the bare `ToggleSwitch` (14px: a 12px track in a 1px border) takes a `::before` extent 24px tall centred on the button, and the `Slider` range input (2px — the track was the whole target) is 24px tall with the 2px track centred inside it by the UA, thumb unchanged, row unchanged. Verified in the showcase at 393: the extent computes 24px and hit-tests 2px beyond a labelled 20px box on both sides (`elementFromPoint` lands on the button) and 5px beyond the 14px label-less box; the slider input measures 24 in a 24 row and a 3x render shows track and thumb centred. Law written into `03-components/05-control-chrome.md` § Touch floor. Not the DS: a consumer own 16px table buttons and 12px links — same rule there, extend the hit box, never the glyph.

**Remainder here:** bump kol-theme >=0.51.0; the brand table 16×16 download/toggle buttons and the 12–14px links are yours — extend their hit box to 24, not the glyph

✅ **Remainder executed 2026-08-26 same session:** kol-theme 0.51.0 in both apps (bare ToggleSwitch `::before` measures 24px on brand `/components`). The consumer's own controls, hit box extended, glyph untouched: `AssetTable.jsx` download + toggle buttons 16×16 → `w-6 h-6` (24×24; the icon stays 16, the dot 8, `gap-4` → `gap-2` so the glyph-to-glyph distance stays 20px); `Reference.jsx` links ×2 (14px) and `Gallery.jsx` folder links (12px) carry the DS's own device — a pseudo-element extent, `relative before:absolute before:inset-x-0 before:top-1/2 before:h-6 before:-translate-y-1/2 before:content-['']` — hit-tested at 393: `elementFromPoint` 5px above and below the text lands on the link.
