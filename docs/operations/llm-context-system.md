# LLM Context & Memory System

## TL;DR
- **Read order**: `LLM_RULES.md` → `docs/AGENT-ONBOARDING.md` → latest session log → `docs/AGENT-CONTEXT.md`.
- **Checkpoint cadence**: Log a session entry at least every 10 replies or whenever you finish a milestone; update Agent Context + Decisions + archive stale docs.
- **Tooling**: Use `scripts/count-messages.sh` to track responses and respect the checkpoint rule.

## Core Documents
| Purpose | Location | Notes |
|---------|----------|-------|
| Behaviour rules & guardrails | `LLM_RULES.md` | Defines communication protocol, checkpoint expectations, and design system mandates. |
| Startup checklist | `docs/AGENT-ONBOARDING.md` | Five-minute ramp: rules, structure, context, latest log, decisions. |
| Project snapshot | `docs/AGENT-CONTEXT.md` | Active focus, recent milestones, key links. Updated when workstreams change. |
| Portfolio scoreboard | `docs/status/migration-status-board.md` | Phase-by-phase progress, outstanding risks. |
| Decisions ledger | `docs/status/architectural-decisions-log.md` | Log or supersede cross-cutting decisions. |
| Session transcripts | `docs/SESSION-LOGS/` | Only the current cycle lives here; older logs move to `docs/archive/session-logs/<year>/`. |
| Archive index | `docs/archive/README.md` | Explains storage for plans, research, and old logs. |

## Workflow Loop
1. **Start of session**
   - Run `./scripts/count-messages.sh reset`.
   - Complete the quickstart checklist from `docs/AGENT-ONBOARDING.md`.
2. **During work**
   - Increment counter after each assistant reply (`./scripts/count-messages.sh increment`).
   - Take notes in-progress; if a structural decision emerges, draft the `DECISIONS` entry immediately.
   - Pause before the 10th response to checkpoint if you have not already.
3. **Checkpoint**
   - Log outcome in `docs/SESSION-LOGS/YYYY-MM-DD-HHMM.md` (use the template).
   - Update `docs/AGENT-CONTEXT.md` → Active Focus + milestone list.
   - Update `docs/status/architectural-decisions-log.md` when architecture changes.
   - Move superseded docs into `docs/archive/`.
4. **Handoff**
   - Ensure “Next Steps” is populated in the latest session log.
   - Mention blockers in both the session log and decisions file if they require follow-up.

## Message Counter Script
```
./scripts/count-messages.sh reset     # start of session
./scripts/count-messages.sh increment # after every reply
./scripts/count-messages.sh show      # check current count
```
- Warnings trigger at 10 replies (`⚠️`), hard stop at 15 (`🚨`).
- State persists in `.codex/message-count`.

## Maintenance Expectations
- **Archive discipline**: Only the active day’s logs stay in `docs/SESSION-LOGS/`. Move previous entries into the archive to keep ramp-up fast.
- **Doc freshness**: When a workstream finishes or shifts focus, update both `docs/AGENT-CONTEXT.md` and the migration status board.
- **Rule updates**: Any tweak to `LLM_RULES.md` must cross-link to supporting docs (e.g., onboarding) to avoid duplication.
- **Script updates**: If checkpoint cadence changes, update the message counter script and note it in `docs/AGENT-ONBOARDING.md`.

Following this system keeps future agents from rereading months of context while maintaining a full audit trail for the project.
