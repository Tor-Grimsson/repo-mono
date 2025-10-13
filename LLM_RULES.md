# LLM Rules for kolkrabbi.io

> **Mandatory interpretation:** When the user says "read `LLM_RULES.md`", immediately follow every directive in this file—no extra confirmation or prodding required. That includes reading all referenced context docs, syncing with the latest session logs, and acting in accordance with these rules for the remainder of the session.

---

## 🚨 CRITICAL: COMMUNICATION PROTOCOL

**Question marks (?) = DISCUSSION ONLY, NOT ACTION**

When the user's message ends with "?", they want:
- Explanation and reasoning
- Discussion of trade-offs and alternatives
- Your recommendation with pros/cons
- **WAIT for confirmation before taking action**

**Examples:**
- ❓ "how do I do that?" → Explain the approach, ask if they want you to implement
- ❓ "what's your recommendation?" → Discuss options, wait for approval
- ✅ "implement that" → Take action immediately
- ✅ "fix the loader" → Take action immediately

**This rule applies to EVERY interaction. Missing this wastes user time.**

---

## 🚨 CRITICAL: CHECKPOINT PROTOCOL (MUST FOLLOW)

**YOU WILL HIT CONTEXT LIMITS AND LOSE WORK WITHOUT CHECKPOINTING.**

### When to checkpoint (NON-NEGOTIABLE):
1. **Every 10 messages** - Count your responses. At message 10, STOP and checkpoint.
2. **Before ANY architectural change** - Schema edits, routing changes, new components.
3. **Before ending the session** - User says "thanks", "done", or conversation winds down → CHECKPOINT IMMEDIATELY.
4. **When context feels full** - Long file reads, multiple tool calls, complex discussions.

### How to checkpoint:
1. Create `docs/SESSION-LOGS/YYYY-MM-DD-HHMM.md` using `docs/SESSION-LOGS/TEMPLATE.md`
2. Update `docs/AGENT-CONTEXT.md` with current status
3. Log decisions in `docs/DECISIONS.md` if applicable

### Failure modes being prevented:
- ❌ Context overflow mid-task → work lost
- ❌ No session handoff → next agent starts from scratch
- ❌ Architectural decisions undocumented → conflicting changes

**IF YOU DO NOT CHECKPOINT, THE USER LOSES HOURS OF WORK. THIS IS UNACCEPTABLE.**

---

## 🎨 CRITICAL: COLOR TOKEN USAGE

**ALWAYS use semantic color tokens from the design system. NEVER use hardcoded colors.**

### Available Color Pairs (from `/styleguide/colors`)

**Core Surfaces** (Recommended):
- `--surface-primary` + `--foreground` - App background, primary containers
- `--surface-secondary` + `--foreground-muted` - Cards, raised sections
- `--surface-inverse` + `--foreground-inverse` - Navigation, hero banners, inverted sections
- `--surface-tertiary` + `--foreground-subtle` - Dividers, subtle UI (large text only)

**Support Surfaces**:
- `--surface-support-light` + `--surface-support-dark` - Footer bands, alternating sections
- `--surface-absolute-white` + `--surface-support-dark` (light) / `--surface-absolute-black` + `--surface-support-light` (dark) - Hero typography, full-bleed sections

**Accents & Status**:
- `--accent-primary` + `--accent-primary-foreground` - CTAs, links, highlights (yellow)
- `--status-danger` + `--status-danger-foreground` - Destructive actions, errors

**Utility Classes** (for absolute colors):
- `bgAbsoluteWhite` / `bgAbsoluteBlack` - Fixed colors that don't theme
- `textAbsoluteWhite` / `textAbsoluteBlack` - Fixed text colors

**Layer Utilities** (for overlays/elevation):
- `--layer-muted-dark` / `--layer-muted-light` - Subtle elevation (20% opacity)
- `--layer-overlay-dark` / `--layer-overlay-light` - Glass overlays, hover states (8% opacity)

**Reference**: All color pairs documented in `apps/web/src/data/styleguide/tokens.js` with contrast ratios and usage guidelines.

---

## Core Rules

0) **Auto-follow:** After reviewing this document, proceed to execute the tasks it mandates (context gathering, compliance, checkpointing) without waiting for additional user reminders.
1) **Read this first:** `docs/RULES_STRUCTURE.md` (naming, routing, CSS, content model, webtree).
2) **Never add TypeScript to web/foundry/ui/fontviewer.** Only Studio and Content use TS.
3) **Tailwind v4 only; no tailwind.config.** Use `@theme` tokens from `@kol/ui/theme.css` and import it.
4) **Do not hardcode styles** in components when a token exists. Prefer utilities tied to shared tokens.
5) **Apps remain separate**: `web` is the public site, `foundry` is its own app (may embed in web later), `studio` is the editor.
6) **Use Yarn workspaces** commands (see `docs/CHEATSHEET.md`). Avoid `npm` unless explicitly required.
7) **Internal imports**: prefer `@kol/ui` and `@kol/content` over duplicating code.
8) **Sanity schema changes** go in `packages/content` only; `apps/studio` just consumes them.
9) **No breaking the IA**: routes must align with `docs/RULES_STRUCTURE.md` unless a change is explicitly approved.
10) **When unsure**, add notes to `docs/` rather than improvising structure.
11) **Context Management**:
    - **ALWAYS read** `docs/AGENT-CONTEXT.md` at the start of every session
    - Review latest session log in `docs/SESSION-LOGS/` to understand what happened previously
12) **Message Counter**: Keep a mental count of your responses. At 10 messages, checkpoint. At 15 messages without checkpointing, you're in danger zone.

Output constraints for generated code:
- JSX only in `apps/web`, `apps/foundry`, `packages/ui`, `packages/fontviewer`.
- TS only in `apps/studio` and `packages/content`.
- Tailwind classes allowed everywhere; respect shared tokens.
