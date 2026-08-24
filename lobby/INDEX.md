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
| 🔵 | [brand-redeploy-frees-media-hostname](inbox/brand-redeploy-frees-media-hostname.md) | 2026-08-15 · kol-r2b2 | Redeploy `kol-brand`. Its live bundle still resolves `/library` images through `media.kolkrabbi.io`, the last thing pinning that hostname to the R2 bucket. Source is already on media-client `^0.1.2` and the rebuilt `dist/` is verified clean — no code change, just a deploy |

## Closed

| | Entry | Closed | Resolution |
|---|---|---|---|
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

## History

| Date | Event |
|---|---|
| 2026-08-15 | **`brand-redeploy-frees-media-hostname` filed from kol-r2b2.** That repo renamed the three stores (`r2.` / `b2.` / `b2v.`) so the admin app could take the `media.` name; `media.` is still attached to the R2 bucket and cannot be detached while brand's deployed bundle resolves `/library` images through it. Source here is already correct — `apps/brand` on media-client `^0.1.2`, `dist/` rebuilt and verified to reference only `r2.` and `admin.`. The ask is a deploy, nothing more. A CLI deploy from the filing session was deliberately rejected: `kol-brand` is Git-connected with dashboard build settings and the checkout was unlinked |
| 2026-08-15 | **`ArticleCardSizeSpec` closed same-day — the queue is at ZERO.** The user ruled all of it in-session: three presets (`readmore` dropped — a read-more band is a context rendering `mini` + `label`, not a size), the geometry table (120×120 confirmed as a ruling, clamps 2/3/2, breakpoint swaps consumer-side, seams replace-only), scope WIDE (THE listing card for any content type), name `ListingCard` (aliases until next major). Spec filed to kol-ds-ui as `ListingCardSpec` with receipt; entry graduated to `.kol/llm-context/lobby-archive/`. Same pass: the two stale 📌 rows (RecordManager · SideNavGrabResize) squared to 🟢 `none` — both receipts had recorded their remainders closed/executed since 08-09/08-14; the ledger rows had never been synced |
| 2026-08-15 | **Sections squared to the standard.** This ledger carried `States` · `Queue` · `Filed elsewhere` and nothing else — no `Closed`, no `Archived`, no `History` — so a closing ticket had nowhere to be recorded and every event here went unwritten. The gap was invisible because nothing checked: `bin/lobby --lint` now enforces the six sections across every registered ledger. A lobby is one shared system; a per-repo section list is drift, not dialect |
