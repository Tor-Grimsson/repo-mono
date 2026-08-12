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

_Empty._

## Filed elsewhere

| | Receipt | Destination | Last known | Remainder here |
|---|---|---|---|---|
| 🟢 | [HeadingTwoNarrow](outbox/HeadingTwoNarrow.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-12 — theme 0.40.0, heading-02 is narrow | **none** — ✅ theme 0.40.0 in; hero/takeover eyeball is the user's |
| 🟢 | [CardFeatureHoverZoom](outbox/CardFeatureHoverZoom.md) | **kol-ds-ui** — same ledger | 🟢 `closed` · synced 2026-08-12 — theme 0.40.0 + component 0.38.0, 1.03 zoom on the visual | **none** — ✅ adopted across all FOUR fork consumers (Home·Studio·foundry·WorkshopFeatures), fork pair retired, data → `src/data/featureCards.js` |
| 🟢 | [ShellNavItemInk](outbox/ShellNavItemInk.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-12 — theme 0.39.0: ink 80, active +300, `--own` 500→300 was the rails split | **none** — ✅ theme 0.39.0 in (bump-everything wave); live rail eyeball is the user's |
| 🟢 | [NavLinkUnderline](outbox/NavLinkUnderline.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-12 — `.kol-link-underline` shipped in theme 0.35.0 | **none** — ✅ executed same session: theme 0.35.0 in, both call sites swapped, local block deleted |
| 📌 | [RecordManager](outbox/RecordManager.md) | **kol-ds-ui** — `~/dev/projects/kol-ds-ui/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-09 — shipped in **component 0.25.0** | **Now due:** adopt in the slide-deck manager + Library, retire superseded local markup |
| 📌 | [SideNavGrabResize](outbox/SideNavGrabResize.md) | **kol-ds-ui** — same ledger | 🟢 `closed` · synced 2026-08-09 — shipped in **framework 0.14.0** | **Now due:** retire brand SideNav's Button toggle + superseded collapse CSS |
| 🟢 | [tone-of-voice-skill-and-agent](outbox/tone-of-voice-skill-and-agent.md) | **dotfiles** — `~/.dotfiles/lobby/INDEX.md` | 🟢 `closed` · synced 2026-08-06 | **none** — skill + agent shipped and harness-verified; the de-clienting rewrite the audit triggered also shipped (4 files, user-ordered) |
