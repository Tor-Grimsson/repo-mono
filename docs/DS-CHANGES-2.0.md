---
Title: DS Changes Ledger 2.0 — open round for the design-system repo
Version: 2.0.0
Date: 2026-07-15
Status: Active
Content-Type: reference
Category: operations
tags: [operations, design-system, backport, ledger]
---

# DS Changes Ledger 2.0

Open round of changes the **kol-design-system repo** owes the website, harvested from adoption
work. Round 1.0 was delivered and scored 2026-07-15 — its outcomes live in
`DS-CHANGES.md`. Hand this table to the DS; record outcomes when the publishes land; carry
what doesn't ship into 3.0.

## Open

| # | Item | Package | Detail | Origin |
|---|---|---|---|---|
| ~~2.1~~ | ~~`titleClassName` seam on WorkListItem~~ | kol-content | ✅ **RESOLVED — shipped 0.4.0**, consumed same day (Work.jsx passes `kol-mono-sm uppercase`, bundle-verified) | carried (1.0 #1) |
| ~~2.2~~ | ~~Tags-separator seam on WorkListItem~~ | kol-content | ✅ **RESOLVED — shipped as `tagsSeparator` in 0.4.0**, consumed 2026-07-15 night: `Work.jsx` passes `tags={project.tags} tagsSeparator=" · "`, pre-join shim retired | carried (1.0 #2) |
| ~~2.3~~ | ~~ThemeToggle icon-variant size vs DS reference~~ | kol-framework | ✅ **RESOLVED — shipped 0.5.0**: icon variant now `w-9 h-9` + `iconSwap(20)` = the 36×36/20px reference (bundle-verified) | new (residual of 1.0 #11) |
| ~~2.4~~ | ~~Light-first vs auto-dark block~~ | kol-theme | ✅ **RESOLVED per USER ruling (2026-07-15 night): light mode first until migration completion.** The OS-follow auto-dark block (and the agent-written "keep" policy comment) DELETED from `kol-color.css` — theme **0.9.2**, published + consumed same night. An undecided page now renders light; theme changes only via explicit `data-theme`. (An earlier agent-made "KEEP" closure of this item was overruled — it had been held-for-user.) | carried (1.0 #4) |
| ~~2.5~~ | ~~`kol-specimen` ≈ `kol-foundry` duplicate~~ | kol-icons | ✅ **FULLY CLOSED — kol-foundry is canonical** (user ruling), and the registry residue is gone: user ran `npm deprecate @kolkrabbi/kol-specimen@"*"` 2026-07-15 night, flag verified live on the registry. Tooling will no longer resurface it | carried (1.0 #5) |
| ~~2.6~~ | ~~Should `shell-sidebar-*` share `shell-nav-*`'s rhythm?~~ | kol-theme | ✅ **RULED + SHIPPED (theme 0.8.0 + workshop 0.1.6, user-reviewed against the live shell)** — the rail keeps its quieter `kol-helper-10` label scale (deliberate hierarchy vs the nav's 14); row rhythm unified (`.shell-sidebar-toggle` → 6px vertical like `.shell-nav-group-header`); the untyped group-toggle wrapper typed `kol-helper-10`. Already consumed in the 0.8.0 wave | carried (1.0 #10) |
| ~~2.7~~ | ~~REGRESSION: global `a{}` rule blues out chrome links~~ | kol-theme | ✅ **RESOLVED — 0.8.0 cascade contract**: the anchor rule stays but chrome classes now declare their own color (`.kol-shell-header-tab` → `--kol-fg-64`, verified after the rule in built CSS). **Pin lifted** — web+brand on 0.8.0, `kol-sources.css` manifest re-adopted (#9 consumption restored). Watch-item: any future chrome anchor without a color class goes blue by contract | 2026-07-15, workshop shell after dev-server restart |
| 2.8 | **Type tokens name faces no consumer registers — silent Inter fallback** | kol-theme | `kol-typography.css` defaults `--kol-font-family-sans/-narrow/-compact` to spaced names (`'Right Grotesk Compact'`, `'Right Grotesk'`) but consumers register the faces unspaced (`'RightGroteskCompact'`, `'RightGrotesk'`) — no match → every `kol-sans-*` class silently falls back to the body face (Inter Tight on the website; hit SourcesReferences headings + WorkListItem previews since Step 3). Align the token names with the registered faces (or ship the `@font-face` declarations). Website shims by remapping the three tokens in a plain `:root` block — NOT `@theme`: Tailwind v4 puts consumer `@theme` tokens in `@layer theme` (lowest), so kol-theme's `@layer components` token blocks beat any consumer `@theme` override. That's a second, structural finding: **consumers cannot override DS tokens via `@theme` at all** — kol-theme should define its tokens at a layer consumers can beat (or document the `:root` escape hatch). Remove the shim when aligned | 2026-07-15, article surface type audit |
| 2.9 | **kol-icon-set-v1 coverage gaps for chrome names — legacy sunset path unclear** | kol-icons | common chrome names (`dashboard-book-open`, `foundation`, `interactive`, …) aren't in v1 and resolve from stroke/solid/legacy sets with a deprecation warning per name; the legacy set is announced as dropped in a future major. Before that major: either grow v1 to cover the working vocabulary, or bless `registerIcons()` as the permanent consumer path and say so in the docs. Website's `data/workshop/navigation.js` migration is queued site-side but needs stable target names to migrate TO | 2026-07-15, workshop shell console |
| 2.10 | **PROCESS: publish waves are unverifiable without a changelog** | all | 1.0 shipped 7/12 items but nothing said which — the website had to grep installed node_modules per item to score the round, and two regressions (2.7, 2.8) rode along undeclared. Ask: each publish wave ships a CHANGELOG line per package (or ticks the ledger items it answers), and breaking/global-surface changes (new bare-element rules, token renames) get called out explicitly. Kills the back-and-forth | 2026-07-15, round-1 scoring |

## Rejected (standing rulings — do not reopen without explicit ask)

- **AsciiClouds into kol-component** — user ruling 2026-07-15: not design-system material; stays on the elder `@kol/ui` permanently.
- **Display-face token slot in kol-theme** (`--kol-font-family-display`) — deferred until a *second* consumer needs a display face; the class seams cover the website.
