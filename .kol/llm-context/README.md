---
_template:
  version: 1
  path: .kol/llm-context/README.md
  sync: notify-only
---

# LLM Context Directory

Context for AI agents working on **Studio website kolkrabbi.io** — the unified kolkrabbi.io
monorepo (public site `apps/web`, foundry, Sanity studios, brand, shared `@kol/*` packages;
React 19 JSX + Vite + Tailwind v4 + Sanity + pnpm/turbo).

## Files

### ARCHITECTURE.md
Load-bearing decisions and constraints (the design-system integrity contract, TS boundaries,
Tailwind v4, Sanity schema home). **Read first.** Any proposal that contradicts it must flag the
contradiction explicitly.

### AGENT-CONTEXT.md
Current project state: active workstreams, what works, what's pending, gotchas, contracts.
Updated at the end of each significant session.

### history.md
The *why* — decisions and reasoning. Deep past lives in `docs/archive/agent-context-history.md`.

### plans/
Speculative + in-flight plan docs (e.g. the Work-video→B2 migration plan).

### status/
Live status boards (migration scoreboard, component-scan coverage).

### session-log/
Chronological per-session records. Sort by date for the most recent.

### session-bridge/
In-flight handoffs between sessions (see its README for the protocol).

## Usage for AI Agents

1. Read `/LLM_RULES.md` (root) — the generic startup protocol.
2. Read `ARCHITECTURE.md`, then `AGENT-CONTEXT.md`, then the latest `session-log/` entry.
3. Check `session-bridge/` for a newer handoff.
4. Update `AGENT-CONTEXT.md` + add a `session-log/` entry when completing significant work —
   via `/log-work`, on explicit request only.
