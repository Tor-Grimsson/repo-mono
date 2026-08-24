# WorkshopExhibitSystem — exhibit sections become content-only

**Filed:** 2026-08-15 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/WorkshopExhibitSystem.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-15 — kol-workshop 0.22.0

## Why it went there

Both repos share the `@kolkrabbi/kol-workshop` shell, but exhibit sections are
still hand-built app-side: the dashboard section carries its own landing (62L),
showcase page (720L), prose companion (133L), plus DesCard +
WorkshopSidebarContent chrome. The user's ruling: the *system* belongs in the
package so the next section is declared as content, not rebuilt as framework.
The dashboard trio is named in the entry as the reference implementation.

## What stays here

- **On ship: adopt** — dashboard re-declares as content; the three scaffolded
  pages + DesCard + WorkshopSidebarContent retire.
- Open sibling ruling (mine, not the DS's): the 4 route-less "embedded live"
  cards on DashboardOverview — build as embeds or trim when the system lands.

## Return — 🟢 2026-08-15

Shipped in **`@kolkrabbi/kol-workshop@0.22.0`** (registry-verified). Six exports
off the package barrel, all content-injected:

| Export | Retires here | Shape |
|---|---|---|
| `ExhibitOverview` | `DashboardOverview` | intro + one action + child cards |
| `ExhibitPage` | `DashboardComponents` **and** `DashboardMetricsSetup` | sections; `specimens` → demo grid, `children` → anything, `prose: true` → 60ch measure |
| `ExhibitSidebar` | `WorkshopSidebarContent` | on-this-page · doc links · quick actions |
| `useExhibitToc` | the copied 6-line `useLayoutEffect` block | registers the rail block |
| `ExhibitCard` | `DesCard` | specimen header |
| `ExhibitLinkCard` | `OverviewCard` | landing card |

The brief's three archetypes shipped as two components. The showcase page and
the prose companion were never structurally different — both are a list of
`PageSection`s and only the body varies — so one component covers both, and the
next exhibit does not have to guess which to reach for.

**Three things your copies were doing that the package versions do not.** The
rail block hand-rolled its collapsible section with `.shell-sidebar-toggle` AND
`.shell-sidebar-label` on one element, inline `paddingRight`/`paddingBottom`/
`justifyContent`, and a chevron at L1 — all four against the eyebrow-box law and
the 2026-08-01 no-chevron ruling; the rungs come from `RailSection` now.
`OverviewCard` carried an `uppercase` utility, against the no-`text-transform`
law. And the `useLayoutEffect` block was one changed dependency away from
setting shell state in a loop — `useExhibitToc` keys on prop *content*, so
passing an inline array literal is safe.

⚠️ **Ships unexercised.** 19 gates prove it parses and its imports resolve;
nothing has rendered it. Your dashboard section is the first real exercise —
expect to find something on adoption, and file it back.

**Remainder here: ✅ EXECUTED 2026-08-15 same session.** Bumped ^0.22.0;
DashboardOverview → `ExhibitOverview` (content-only, 62L→40L), DashboardMetricsSetup
→ `ExhibitPage` sections data; DashboardComponents + DocsComponents swapped
DesCard→`ExhibitCard` and the toc block→`useExhibitToc`; the three other
OverviewCard consumers (WorkshopIntroduction, HomeApparat, EmbedOverview) →
`ExhibitLinkCard`. All three chrome files retired to
`_tmp/2026-08-15-exhibit-adoption/`. Build green. Per the ⚠ ships-unexercised
note: this is the first render — live eyeball owed on the workshop dashboard
pages next dev run.
