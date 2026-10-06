# Execution Plan — Workshop → Apparatus Gallery

> Findings in `01-registry.md`; orientation in `00-INDEX.md`. Update this file's phase
> checkboxes as work lands.

## Ground rules

- **Curate, don't host.** External tool = card (preview image + live link + repo link + blurb). No iframe.
- **Delete on land.** Each card that replaces an inline apparat page → delete that inline implementation in the same step (redundancy kill). Old code doesn't linger "just in case."
- **In-repo systems (dashboards, chess) stay embedded live** — they get real showcase treatment, not a link-out.
- Build gate: `pnpm exec turbo run build --force`. Visual: eyeball the gallery + each kept-live system.
- `apps/web` is live prod — small batches, verify each.

## Phase 0 — Registry ✅ (2026-07-08)

`01-registry.md`. 8 external + 2 in-repo. Open: radar/radial/modulator blurbs.

## Phase 1 — Update components in the EXISTING workshop shell ⬜

_(Chrome stays. Local `components/shell/` + workshop look unchanged. Wholesale kol-framework shell
adoption REJECTED 2026-07-08 — see INDEX. The job is current components, not new chrome.)_

- Swap the remaining stale internal components inside the workshop for current published
  `@kolkrabbi/kol-component`. DS-adoption Step 2 already did **18 leaf components** (Icon, Button, Input,
  Table, Dropdown, toggles, Tag, CodeBlock, Divider, Pill, Slider, QuantityInput, …). Continue for any not
  yet covered; gaps with no upstream equivalent stay on `@kol/ui` + tally (e.g. SearchInput `iconOnly`).
- **Do NOT touch** layout, sidebar structure, TOC rail, or the look.
- Gate: workshop renders **identically** (render-diff), build green.

> **SCOPE (confirmed 2026-07-08): BOTH** — the component-update pass above **and** the apparat-card
> restructure (Phase 2/3). No visual change to the surviving workshop chrome either way.

✅ **Phase 1 done 2026-07-08** — `HomeApparat` is now the launcher: curated 8 tools as `OverviewCard`s linking OUT to their live deploys (new tab), real blurbs, in the existing shell (zero look change). `OverviewCard` gained optional `target`/`rel` (backward-compat). Build green, 0 console errors, render-verified. Component update: DS-adoption Step 2's 18 `@kolkrabbi/kol-component` swaps stand.

✅ **Phase 2 done 2026-07-08** — deleted 7 inline apparat pages (`KolMirror/KolMonitor/KolDistress/KolModulator/ApparatusRadialEditor/KolEditor/KolNoter.jsx`), their `apparat/kol-*` routes now redirect to the gallery, imports removed from App.jsx, editor+noter dropped from the sidebar nav. Redirect + build verified.
  - **Also retired (2026-07-08): the whole "Hall of Mirrors" section** — superseded by the `kol-mirror` gallery card (mirror.kolkrabbi.io). Deleted 7 files (`HallOfMirrors/Displacement/Movement/Copies/Symphony/Archive.jsx` + orphan `ApparatusHallOfMirrors.jsx`), removed the top-level nav tab, `mirrors/*` routes now redirect to the gallery, and cleaned stale refs (Navbar id-set, WorkshopIntroduction image/icon maps). Nav tab gone, redirect + build verified.
  - **Follow-ups (cosmetic, not blocking):** add radar/vcap/ds-editor to the sidebar nav (currently gallery-only); orphaned `components/workshop/apparatus/*` + `ApparatusCircleGenerator/FrequencyModulator.jsx` preview files (no longer imported) → sweep in Phase 4; `FooterTest.jsx` still links to old `mirrors/*` (redirects fine, test route); `kol-radar` blurb still a placeholder.

## Phase 2 — Retire inline apparats ✅ DONE (detail) ⬜

## Phase 2 — Retire inline apparats ⬜

Per tool: inline workshop page → gallery card, then **delete the inline implementation**. The stale
inline route files to retire (exact tool↔file mapping confirmed during execution):
`KolMonitor.jsx`, `KolMirror.jsx`, `KolDistress.jsx`, `KolModulator.jsx`, `ApparatusFrequencyModulator.jsx`,
`ApparatusRadialEditor.jsx`, `KolEditor.jsx` (+ their preview components under `components/workshop/apparatus`).
Batch by category. Remove now-orphaned imports/routes/nav entries. Watch for shared deps before deleting.

## Phase 3 — Dashboards + chess showcases 🟡 (mapped 2026-07-08)

The two in-repo systems (consume `@kol/ui/dashboards` + `@kol/chess-data`).
**CORRECTION (2026-07-08): they DO exist in the DS** — at `kol-ds/showcase/src/workshop/{dashboards,chess}` —
but as **showcase app code, NOT published packages** (no `packages/dashboard|chess`; `@kolkrabbi/kol-component`
exports zero dashboard/chess names). So it's the same duplicate-drift as everything else, unpackaged on BOTH
sides. **Can't consume today** (nothing published). Converging = package them in kol-ds first (external repo
work: `@kolkrabbi/kol-dashboard`+`kol-chess`, or fold into kol-component) → then monorepo consumes, fork dies.
Until then the local copies stay — by necessity, not "by design." **Split out as separate standalone tasks
(2026-07-08): `plans/dashboard-ds-swap.md` + `plans/chess-ds-swap.md`.** Not part of this sprint anymore.
- **Dashboard** section: routes `dashboard` (Overview), `dashboard/components`, `dashboard/metrics`, `dashboard/chess`. Already live.
- **Chess** section: routes `chess` (Home), `chess/analysis`, `chess/components`, `chess/metrics`. Already live.
- ✅ Deleted 2 dead files: `DashboardAnalysis.jsx`, `DashboardPerformance.jsx` (no importers, unrouted). Build green.

**Assessment: these are already living, working sections — not a migration.** Unlike the apparats (clear
retire→card pattern), "highlight/improve" here is open-ended feature work that needs owner direction. Absent
a specific ask, the sprint's substantive work is **done**; remaining is cleanup (Phase 4).

## Phase 4 — Cleanup + handoff ✅ (2026-07-08)

- ✅ **Deleted orphaned apparat cluster** — `routes/workshop/ApparatusCircleGenerator.jsx` + `ApparatusFrequencyModulator.jsx` + `components/workshop/apparatus/*` (6 files) + `components/workshop/animations/FrequencyModulationPreview.jsx` (all unrouted/unimported). Build green.
- ✅ **FooterTest.jsx stale links** — dropped the dead `Apparat` + `Mirrors` SITE_TREE groups and the retired "Hall of Mirrors" narrative card (renumbered cards to 01–09).
- ✅ **Sidebar-add 3 tools** — `kol-ds-editor` / `kol-vcap` / `kol-radar` added to the apparat nav in `navigation.js` (icon + live/repo links) + matching `<Navigate>` redirect routes in `App.jsx` (consistent with the other apparat tools).
- ✅ **Docs synced** — `04-pages/11-site-tree.md` apparat block rewritten to the gallery; MEMORY.md iframe-embed note marked moot.
- ⬜ **Remaining doc drift (owner decision, not blocking):** `05-workshop/03-mirrors.md` (whole doc describes retired Hall of Mirrors / Kol Editor / freq-modulator — delete vs rewrite as "superseded by kol-mirror card") + its `05-workshop/INDEX.md` link, `09-right-sidebar.md` examples, `00-docs/INDEX.md:61`, and stale `data/workshop/system-metrics.json` refs to the deleted files.
- DS/Components showcase pages → hand to `kol-ds` repo (coordinate; out of this repo). Until then, parked.

## Parking lot / dependencies

- **radar** identity unresolved (registry gap 1) — blocks its card only, not the sprint.
- Preview-image pipeline: manual screenshots vs a scripted capture (kol-vcap is literally a recorder — dogfood?). Decide in Phase 1.
- Custom subdomains: monitor/mirror/ds-editor are on `*.kolkrabbi.io`; others on `*.vercel.app`. Card links use whichever is canonical per tool.
