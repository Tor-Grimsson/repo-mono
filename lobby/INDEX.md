# lobby — kol-website

Intake portal for **kol-website**: content and UI issues dropped in from any repo.
Not documentation, not a tracker — a work queue, deliberately outside `docs/`.

**It is empty between drops.** A file here means work not yet done. Nothing parks
here, nothing waits here for the agent to approve it, nothing is held open because
it has not been implemented yet.

| | |
|---|---|
| File one | `clip-drop.sh --kol-website NAME` · `/lobby-web` (from any repo) |
| Read it | `/lobby-list` · `bin/lobby` · `prefix Ctrl+K` |
| The spec | `~/.dotfiles/docs/operations/systems/lobby/` |

## States

| | State | Means | Lives in |
|---|---|---|---|
| 🔵 | `filed` | Captured, unread | `inbox/` |
| 🟡 | `read` | Understood — the row restates it | `inbox/` |
| 🟠 | `addressed` | A change shipped that is meant to close it | `inbox/` |
| 🟢 | `closed` | The thing it asked for exists and is verified | `done/`, then out |
| ⚪ | `parked` | Deliberately not-now, reason recorded | `archive/` |

**Closing is purpose-served.** A ticket closes when the thing it asked for exists
and is verified. It is not held for sign-off. If the work was wrong, refile it.

**A decision is never a lobby row.** If what remains is the user choosing rather
than the agent building, the ticket closes and the choice goes to
`.kol/llm-context/AGENT-CONTEXT.md` § *Awaiting user rulings*.

**Closed entries leave.** They move to `.kol/llm-context/lobby-archive/` — agent
state belongs in `.kol/`, not in a live portal.

## Queue

| | Entry | Filed | Ask |
|---|---|---|---|
| | _(empty)_ | | |

## Closed

| | Entry | Closed | Resolution |
|---|---|---|---|
| 🟢 | brand-redeploy-frees-media-hostname | 2026-08-26 | Deploy landed 2026-08-25 (`43eeb9e`); verified 2026-08-26: live bundle carries no `media.kolkrabbi.io`, `/library` loads 7/7 images from `r2.`. Receipt returned to kol-r2b2 so it can detach `media.` from the R2 bucket; entry graduated to `.kol/llm-context/lobby-archive/` |
| 🟢 | ArticleCardSizeSpec | 2026-08-15 | All five DoD items same-day (user rulings): presets cut to three (`readmore` dropped — a context, not a size), geometry table written (120×120 confirmed, clamps 2/3/2, breakpoint swaps consumer-side), scope ruled WIDE, name ruled `ListingCard` (aliases until next major). Spec filed to kol-ds-ui as `ListingCardSpec`; entry graduated to `.kol/llm-context/lobby-archive/` |

## Archived

_(none yet — ⚪ parked and ⚫ retired entries land in `archive/`)_

## Filed elsewhere

| | Receipt | Destination | Last known | Remainder here |
|---|---|---|---|---|
| 🟢 | [HeadingTwoNarrow](outbox/HeadingTwoNarrow.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-12 — theme 0.40.0, heading-02 is narrow | **none** — ✅ theme 0.40.0 in; hero/takeover eyeball is the user's |
| 🟢 | [CardFeatureHoverZoom](outbox/CardFeatureHoverZoom.md) | **kol-ds-ui** — same ledger | 🟢 `closed` · synced 2026-08-12 — theme 0.40.0 + component 0.38.0, 1.03 zoom on the visual | **none** — ✅ adopted across all FOUR fork consumers (Home·Studio·foundry·WorkshopFeatures), fork pair retired, data → `src/data/featureCards.js` |
| 🟢 | [ShellNavItemInk](outbox/ShellNavItemInk.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-12 — theme 0.39.0: ink 80, active +300, `--own` 500→300 was the rails split | **none** — ✅ theme 0.39.0 in (bump-everything wave); live rail eyeball is the user's |
| 🟢 | [NavLinkUnderline](outbox/NavLinkUnderline.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-12 — `.kol-link-underline` shipped in theme 0.35.0 | **none** — ✅ executed same session: theme 0.35.0 in, both call sites swapped, local block deleted |
| 🟢 | [RecordManager](outbox/RecordManager.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-09 — shipped in **component 0.25.0** | **none** — ✅ CLOSED as superseded 2026-08-14 (user: "close it"); Library adopted MediaLibrary 08-01, SlideDeckManager has no editable state to justify the organism |
| 🟢 | [SideNavGrabResize](outbox/SideNavGrabResize.md) | **kol-ds-ui** — same ledger | 🟢 `closed` · synced 2026-08-09 — shipped in **framework 0.14.0** | **none** — ✅ executed 2026-08-09: brand adopted the package SideNav wholesale, fork + Button toggle retired to `_tmp/`, collapse CSS reduced to the rail plane |
| 🟢 | [ListingCardSpec](outbox/ListingCardSpec.md) | **kol-ds-ui** — same ledger | 🟢 `closed` · synced 2026-08-15 — kol-content 0.7.0: `ListingCard` rename, `readmore` gone, geometry conformed (WorkCard deliberately not aliased — different card, folds next major) | **none** — ✅ executed same session: ^0.7.0 in, both call sites on `ListingCard`, locals already retired |
| 🟢 | [tone-of-voice-skill-and-agent](outbox/tone-of-voice-skill-and-agent.md) | **dotfiles** — `~/.dotfiles/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-06 | **none** — skill + agent shipped and harness-verified; the de-clienting rewrite the audit triggered also shipped (4 files, user-ordered) |
| 🟢 | [SideNavMobilePosition](outbox/SideNavMobilePosition.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-26 — framework 0.23.0: the aside's box lives in `.kol-sidenav`, the 767px drawer rule wins | **none** — ✅ executed 2026-08-26: framework ^0.23.0 in, stopgap block deleted, brand re-walked at 393 (aside fixed −280, content top 0); the re-walk's two finds fixed same pass (Gallery header clears the hamburger, `/assets` ledes wrap their path tokens) |
| 🟢 | [TableMobileScroll](outbox/TableMobileScroll.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-26 — nothing built: `.kol-table-wrapper` has always scrolled (measured ×4 on brand production at 393); the hidden scrollbar + headless no-drag hid it | **none** — touch affordance ruled 2026-08-26 at the DS: none, the cut columns are the affordance |
| 🟢 | [CodeBlockMobileOverflow](outbox/CodeBlockMobileOverflow.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-26 — component 0.68.1 + theme 0.50.2: the block wraps, a chipless first line reserves the copy control's lane | **none** — ✅ executed 2026-08-26: component ^0.68.1 + theme 0.51.0 in; verified on the docs reader at 393 (pre-wrap, 311/311, 44px lane) — only once `pnpm.overrides` forced one kol-component (see `NestedDsDependencies`); `/stack/vcap` on a phone = production check |
| 🟢 | [WorkshopShellMobile](outbox/WorkshopShellMobile.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-26 — framework 0.23.0: active tab scrolled into view, snap on flick; the two-up cards are THIS repo's rows | **none** — ✅ executed 2026-08-26: six `DashboardComponents.jsx` rows stack below `md` (393 column · 1280 row); the tab scroll only fired once `pnpm.overrides` gave kol-workshop the real framework 0.23.0 (it nested 0.20.1) — Dashboard tab lands 79–177 in the strip |
| 🟢 | [MobileTouchFloor](outbox/MobileTouchFloor.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-26 — RULED: no type floor, 24px hit floor (WCAG 2.5.8 AA), drawn size never moves; theme 0.51.0 lifts ToggleSwitch + Slider | **none** — ✅ executed 2026-08-26: theme 0.51.0 in; AssetTable buttons 16→24 box (glyphs 16/8 untouched), Reference + Gallery links carry a 24px pseudo-element extent, hit-tested ±5px at 393 |
| 🔵 | [NestedDsDependencies](outbox/NestedDsDependencies.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🔵 `filed` · 2026-08-26 — five packages ship kol-component/framework/theme/icons as `dependencies` with 0.x carets, so pnpm nests stale copies (workshop → component 0.39.0 + framework 0.20.1; store → component **0.8.0**); every DS fix inside those trees never reached this site | 📌 `pnpm.overrides` at root holds one copy each until the packages declare peers — **delete the block on the fix** |

## History

| Date | Event |
|---|---|
| 2026-08-26 | **`brand-redeploy-frees-media-hostname` closed — the queue is at ZERO again.** The deploy had landed 08-25; today's check on production closed the DoD (bundle free of `media.`, `/library` on `r2.`), and the receipt went back to kol-r2b2. Same day, fonts: production served `/fonts/Right-Grotesk/` while theme ≥0.41.0 asks `/fonts/right-grotesk/` — the 08-14 rename never reached git (macOS ignores case); a two-step `git mv` fixed both sites |
| 2026-08-26 | **Bump wave + the five mobile receipts squared 🟢 — and a packaging defect found under them.** component ^0.68.1 · framework ^0.23.0 · theme 0.51.0 (MobileTouchFloor came back ruled AND built while this session sat in `/ag-init`). Remainders executed: stopgap deleted, six dashboard rows stack below `md`, AssetTable buttons + Reference/Gallery links carry a 24px hit box, glyphs untouched. The verify pass showed the bump reaching NOTHING inside kol-workshop: `ShellLayout` resolved kol-framework **0.20.1**, the docs reader kol-component **0.39.0** — each `@kolkrabbi/*` app package pins the others as `dependencies` with 0.x carets, so pnpm nests its own stale copy (chess 0.38.0 · content 0.63.0 · foundry 0.52.0 · store **0.8.0**; only kol-dashboards declares peers). Root `pnpm.overrides` now forces one copy of component/framework/theme/icons — after which the active tab scrolls into view, the CodeBlock wraps with stamped lines, and prints/chess/foundry render clean at 393. Filed to kol-ds-ui as `NestedDsDependencies` with a 📌 to delete the override block once the packages declare peers. Re-walk finds fixed same pass: Gallery header under the package hamburger (`pl-16 md:pl-5`), four `/assets` ledes overflowing on path tokens (`break-words`). Not touched: brand `/components` demo page is 569 wide at 393 |
| 2026-08-26 | **Four of the five mobile briefs came back 🟢** — kol-framework 0.23.0 (SideNav's box in its rule; ShellHeader scrolls the active tab into view), kol-component 0.68.1 + kol-theme 0.50.2 (CodeBlock wraps; copy-control lane on chipless blocks). `TableMobileScroll` closed with nothing built: the wrapper has always scrolled, headless could not drag it. Remainders here: bump all three, delete the sidenav stopgap, stack the `DashboardComponents.jsx` two-up rows (that half was ours). `MobileTouchFloor` ruled the same day → **theme 0.51.0**: no type floor, 24px hit floor (bare ToggleSwitch extent, Slider input 24px) — bump, and give our own 16px table buttons and 12px links the same hit box |
| 2026-08-25 | **Five mobile briefs filed to kol-ds-ui** off the mobile audit (`plans/2026-08-25-mobile-audit-web-brand.md`): `SideNavMobilePosition` (every brand page opened one viewport down — a className utility beating the package's media rule; one-rule stopgap kept here until it ships) · `TableMobileScroll` · `CodeBlockMobileOverflow` · `WorkshopShellMobile` · `MobileTouchFloor` (🔴 ruling request). Local fixes shipped the same pass: takeover menu stacks below `md`, licensing `md:min-w-[720px]`, typeface style row stacks, specimen header wraps, hero title floor 3rem |
| 2026-08-15 | **`brand-redeploy-frees-media-hostname` filed from kol-r2b2.** That repo renamed the three stores (`r2.` / `b2.` / `b2v.`) so the admin app could take the `media.` name; `media.` is still attached to the R2 bucket and cannot be detached while brand's deployed bundle resolves `/library` images through it. Source here is already correct — `apps/brand` on media-client `^0.1.2`, `dist/` rebuilt and verified to reference only `r2.` and `admin.`. The ask is a deploy, nothing more. A CLI deploy from the filing session was deliberately rejected: `kol-brand` is Git-connected with dashboard build settings and the checkout was unlinked |
| 2026-08-15 | **`ArticleCardSizeSpec` closed same-day — the queue is at ZERO.** The user ruled all of it in-session: three presets (`readmore` dropped — a read-more band is a context rendering `mini` + `label`, not a size), the geometry table (120×120 confirmed as a ruling, clamps 2/3/2, breakpoint swaps consumer-side, seams replace-only), scope WIDE (THE listing card for any content type), name `ListingCard` (aliases until next major). Spec filed to kol-ds-ui as `ListingCardSpec` with receipt; entry graduated to `.kol/llm-context/lobby-archive/`. Same pass: the two stale 📌 rows (RecordManager · SideNavGrabResize) squared to 🟢 `none` — both receipts had recorded their remainders closed/executed since 08-09/08-14; the ledger rows had never been synced |
| 2026-08-15 | **Sections squared to the standard.** This ledger carried `States` · `Queue` · `Filed elsewhere` and nothing else — no `Closed`, no `Archived`, no `History` — so a closing ticket had nowhere to be recorded and every event here went unwritten. The gap was invisible because nothing checked: `bin/lobby --lint` now enforces the six sections across every registered ledger. A lobby is one shared system; a per-repo section list is drift, not dialect |
