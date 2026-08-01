---
title: Docs
type: index
status: active
updated: 2026-08-01
description: Docs home — routes to documentation/ (the site's subject matter) and its sibling, operations/. Carries the agent's read contract for this vault.
tags:
  - framework/conventions
---

# Docs

| Folder | What it is |
|---|---|
| [[documentation/INDEX\|documentation/]] | The repo's subject — the website, numbered `00`–`08` |
| [[operations/INDEX\|operations/]] | Repo/dev process — workflow, infrastructure, creative tooling |

Agent context — architecture, current state, session logs, and this repo's full decision/workstream
history — lives entirely in `.kol/llm-context/` at the repo root, outside this vault. It's not
linked from here on purpose: agent state and the docs vault are different layers.

## For the agent — the read contract for this vault

**`docs/` is the rules layer; `.kol/` is state.** Search here before improvising anything, and
search by **grep** — the vault is written to be found by name, not read end to end.

**The rule that matters most in this repo: this site is a consumer, and a consumer is never the
source.** Most of what renders here is `@kolkrabbi/*` — components, tokens, type. A fix made
locally forks the design system instead of fixing it, and a local override drifts from the moment
it is written. When the defect is in a package, it belongs in kol-ds-ui (`/lobby-ds`), not here.

**And: a summary is never the source.** The indexes below enumerate; answer from what they point at.

| If the question is about | Open the enumeration | …but answer from the source |
|---|---|---|
| a component's props, variants or tokens | [[documentation/INDEX\|documentation/]] | **kol-ds-ui** — its `docs/` and its package source. This repo documents *usage*, not the contract |
| which version of a package is in play | the import in the page | `package.json` + kol-ds-ui's `operations/SHIPPED-PACKAGES` |
| a page's actual behaviour | the section doc | the route/component file under `apps/` — the code is the contract |
| a filed issue's state | `lobby/INDEX.md` | the entry's own file; and never a raw `ls` of `inbox/` |
| **what this repo owes because of a ticket it filed** | `lobby/outbox/` | the destination's ledger. 📌 means closed there, **still owed here** — as of 2026-08-01 that is `MediaLibrary`: retire `apps/brand/src/pages/Library.jsx` for the published component |

**Grep entry points.** PascalCase component names (they name the source file, the docs page and the
lobby entry alike), `@kolkrabbi/` package names, route paths, and section numbers `00`–`08`.

**Deliberately not under `docs/`** — live state, not published documentation: `lobby/` and its
`INDEX.md` ledger, `lobby/outbox/` (receipts), and `.kol/`. An agent that assumes `docs/` is
everything will miss both the queue addressed to it and the work owed back to it.
