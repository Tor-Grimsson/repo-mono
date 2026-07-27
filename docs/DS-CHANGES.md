---
Title: DS Changes Ledger 1.0 — delivered round (sealed)
Version: 1.0.0
Date: 2026-07-15
Status: Delivered
Content-Type: reference
Category: operations
tags: [operations, design-system, backport, ledger]
---

# DS Changes Ledger 1.0 — delivered

Round 1.0 of changes the **kol-design-system repo** owed the website. Delivered 2026-07-15,
answered the same evening by the patch wave kol-component 0.10.1 · kol-content 0.3.1 ·
kol-icons 0.6.1 · kol-framework 0.4.2 · kol-theme 0.7.6 · kol-chess 0.2.1. Scored below,
verified against the installed packages. **The open round is `DS-CHANGES-2.0.md`.**

## Outcomes

| # | Item | Package | Outcome |
|---|---|---|---|
| 1 | WorkListItem `titleClassName` seam | kol-content | ❌ → carried as 2.1 |
| 2 | WorkListItem tags-separator seam | kol-content | ❌ → carried as 2.2 |
| 3 | `useTheme`/`applyTheme`/`getInitialTheme` export | kol-framework | ✅ 0.4.2 |
| 4 | Light-first vs auto-dark block | kol-theme | ❌ → carried as 2.4 |
| 5 | `kol-specimen` ≈ `kol-foundry` duplicate | both | ❌ → carried as 2.5 |
| 6 | `GRAPHIC_RAW` barrel re-export (R2) | kol-component | ✅ 0.10.1 |
| 7 | `kol-segment-title` ruling | kol-theme | ✅ defined in kol-typography.css |
| 8 | WorkCard `metaClassName` seam | kol-content | ✅ 0.3.1 |
| 9 | `@source` manifest (`kol-sources.css`) | kol-theme | ✅ 0.7.6 |
| 10 | shell-sidebar rhythm ruling | kol-theme | ❌ → carried as 2.6 |
| 11 | mode-toggle SVGs + ThemeToggle size | kol-icons / kol-framework | ◐ SVGs cleaned 0.6.1; size residual → 2.3 |
| 12 | CodeBlock portable-text `value` + `filename` parity | kol-component | ✅ 0.10.1 |
