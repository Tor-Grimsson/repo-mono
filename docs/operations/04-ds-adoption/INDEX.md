---
title: KOL-DS Adoption
type: index
status: active
updated: 2026-07-09
version: 1.0.0
description: Re-theming the website onto KOL-DS tokens — theme model, tokenize, type/color conformance
tags:
  - project/kol-monorepo
  - domain/workflow
---

## Overview

The process of re-theming **apps/web** onto the KOL design system — adopting the DS theme model
(light `:root` base + `[data-theme=dark],.dark` override + `prefers-color-scheme`), seeding DS
tokens, and conforming type/color to semantic tokens so every component reads `var(--kol-*)` pairs
and any subtree flips by attribute. Executed **page by page, desktop-first**, with every change
journaled live.

**Named to match the workstream:** branch `sprint/ds-adoption` + `.kol/llm-context/sprint-ds-adoption/`.

### Live tracking (source of truth during the run)
- **Plan / scope:** `~/.claude/plans/compiled-herding-spark.md`
- **Playbook (live journal):** `.kol/llm-context/playbook/2026-07-09-ds-seeding.md`
- **Milestone logs:** `.kol/llm-context/session-log/`

### Chapter Index (planned)

| # | Title | Focus |
|---|-------|-------|
| — | Index (this doc) | Overview + where the live state lives |
| 01 | Theme model | Light `:root` base · `[data-theme=dark],.dark` override · `prefers-color-scheme` · per-component flip |
| 02 | Token seeding | Repoint web off the local `packages/ui/theme.css` fork onto `@kolkrabbi/kol-theme` |
| 03 | Type conformance | RG-Mono → JetBrains (`kol-helper-*`/`kol-mono-*`) · sans → `kol-sans-*`/prose · stale labels |
| 04 | Color + quarantine | Hardcoded colors → token pairs · undefined classes · dead files → `_quarantine/` (never delete) |
| 05 | Exceptions | Foundry specimens · generative art · the display-serif DS-side gap |

### Status

Active — Phase 1 (theme model) in progress. Chapters authored as each phase lands; the playbook
carries the minute-by-minute detail until then.

---
