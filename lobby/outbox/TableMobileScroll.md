# TableMobileScroll — `.kol-table` right columns vanish on phones

**Filed:** 2026-08-25 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TableMobileScroll.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-25

## Why it went there

Brand `/assets` (4 tables, 668–753px) and `/reference` (24, to 937px) at 393px: no wrapper scrolls, page does not scroll sideways, columns gone. Tablet pass 2026-08-25: same at 768 (874–1106px) and 1024 (`/reference` to 1187px). The table is the DS's; no call site should have to wrap it. Source: `.kol/llm-context/plans/2026-08-25-mobile-audit-web-brand.md`.

## Remainder here once it ships

bump; nothing local to remove
