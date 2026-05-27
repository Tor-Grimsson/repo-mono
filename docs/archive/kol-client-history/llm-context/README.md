# llm-context

Three files + a session log directory keep this project's context durable
across agent sessions.

| File | Purpose | Update cadence |
|---|---|---|
| `ARCHITECTURE.md` | Load-bearing decisions and constraints — the rules that hold | Rarely. Only when a deliberate, durable design call is made. |
| `AGENT-CONTEXT.md` | Current state of the project: what works, what's pending, key files, gotchas | At the end of each significant session. |
| `session-log/YYYY-MM-DD-*.md` | Chronological log of session changes | One per significant session. Append, never edit. |

## Sibling docs

- `../history.md` — decision history (alternatives considered, rejections, why X was picked over Y).
- `../plan.md` — speculative future work, not yet committed to.
- `../kol-migration/migration-notes.md` — the AC → Kolkrabbi transition log, written
  during the strip + rebrand of `kol-ac` into `kol-generator-acstrip`. Once the
  migration is complete this folder can be archived.

## On reading order

A fresh agent should:

1. Read `ARCHITECTURE.md` — load-bearing rules first.
2. Read `AGENT-CONTEXT.md` — current state.
3. Read the most recent session log (sorted by date).
4. Stop and wait for the user to specify a task.
