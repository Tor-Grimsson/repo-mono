# TabBarSpacerAboveTheList — the room owed to the floating bar, reserved in the wrong place

**Filed:** 2026-09-04 → **kol-ds-ui** · **Closed:** 🟢 2026-09-04 · kol-component 0.214.0
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TabBarSpacerAboveTheList.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — the truth about this ticket

## Why it went there

`MobileTabBar` is `position: fixed`, so where it sits in the tree does not matter. The 56px spacer
beside it is in normal flow, so its position is the whole thing — and it rendered **before** the
list. It failed in both directions at once: an 80px hole under the pinned search, and the last row
still running under the bar, which is the exact thing the spacer exists to prevent.

## ✅ RETURNED + MEASURED — 0.214.0

```
gap search → back   80px → 12px
spacer              top 764, after the list (was 174, above it)
last row bottom     704 · bar top 788 → clears it
```

Their correction, recorded: **only `MediaLibraryBrowse` was wrong.** `MediaLibraryLibrary`'s pair
was already after its `<ContentFilters>`, which renders the list through `renderItem`, so that page
never had the defect. Re-measured it anyway; it behaves.

The check they added asserts **order** — presence, size and pairing all pass on the broken
arrangement, and they rebuilt the broken version to confirm the check fails on it.
