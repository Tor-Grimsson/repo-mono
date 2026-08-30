# TableMobileScroll — `.kol-table` right columns vanish on phones

**Filed:** 2026-08-25 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TableMobileScroll.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — nothing built, wrapper always scrolled; remainder none

## Why it went there

Brand `/assets` (4 tables, 668–753px) and `/reference` (24, to 937px) at 393px: no wrapper scrolls, page does not scroll sideways, columns gone. Tablet pass 2026-08-25: same at 768 (874–1106px) and 1024 (`/reference` to 1187px). The table is the DS's; no call site should have to wrap it. Source: `.kol/llm-context/plans/2026-08-25-mobile-audit-web-brand.md`.

## Remainder here once it ships

bump; nothing local to remove

## ✅ RETURNED — 2026-08-26 · kol-theme@0.50.2

Already built — the ticket premise did not hold. `Table` renders `.kol-table-wrapper { overflow-x: auto }` around every `.kol-table` and has since the component first shipped. Measured on brand production `/assets` at 393: four wrappers, each 351 wide with 668–753 of content, `overflow-x: auto`, `scrollLeft` moves on all four, no ancestor wider than the viewport. The audit could not see it because the wrapper hides its scrollbar (`scrollbar-width: none`, the reference table chrome) and headless Chromium cannot drag — the same limit the audit downgraded its own #2 (embla dragFree) for. Nothing to build. Not done, deliberately: the optional right-edge fade — the 2026-07-28 ruling bans scroll-edge paint, and the wrapper cover gradients were deleted for it on 2026-08-09. Whether a hidden-scrollbar scroll container should carry any affordance on touch is a design call, put to the user beside the MobileTouchFloor ruling — not a lobby item.

**Remainder here:** none — nothing local to remove; the affordance question is a ruling, not a bump

**Ruled 2026-08-26 at the DS (user):** no affordance — the wrapper keeps its hidden scrollbar, the cut-off columns are the affordance. Closed for good; nothing to bump.

✅ **Remainder executed:** none owed — the return built nothing (the wrapper already scrolled). Line added 2026-08-26 so the outbox watch reads it as closed.
