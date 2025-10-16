# LLM Rules for kolkrabbi.io

> **Mandatory interpretation:** When the user says "read `LLM_RULES.md`", follow the instructions here without extra prompts. Start with the quickstart loop in `docs/AGENT-ONBOARDING.md`, sync with the most recent session log, and then obey the remaining rules for the rest of the session. If the user asks “Do you understand?” or “Outline the task?”, respond with a clear plan before taking any action.

---

## 🚨 CRITICAL: DESIGN SYSTEM INTEGRITY

**ALWAYS reference the documented system. NEVER invent solutions.**

### Required Reading (Priority Order)
1. **`docs/system/4.2-css-debugging.md`** - Debugging checklist for context-awareness issues
2. **`docs/system/2.0-color-system.md`** - Color token architecture and scoped remapping
3. **`docs/system/4.1-css-components.md`** - Component class reference
4. **`docs/system/1.0-design-system.md`** - Overall system principles

### Absolute Rules
1. **NEVER hardcode colors** - Always use semantic tokens (`var(--kol-*)`)
2. **NEVER use deprecated tokens** - No `--component-fg`, `--component-surface`, etc.
3. **NEVER use inline styles for colors** - Except documentation swatches showing actual values
4. **ALWAYS use context-aware tokens** - Reference tokens that adapt through scoped remapping
5. **ALWAYS check system docs BEFORE suggesting changes** - Don't guess or invent patterns

### When Debugging
- **Follow `docs/system/4.2-css-debugging.md` checklist IN ORDER**
- Check for deprecated tokens first
- Check for hardcoded colors second
- Check for missing surface context third
- Don't skip ahead or invent solutions

### When Making Changes
- Verify your approach matches documented patterns in `docs/system/`
- Use tokens defined in `packages/ui/theme.css`
- Use utility classes defined in `packages/ui/css/utilities.css`
- Use component classes defined in `packages/ui/css/components.css`
- If a pattern isn't documented, ASK before implementing

**Missing this wastes hours of work and breaks the design system.**

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
1. **At least once every 10 responses OR when you ship a milestone** – use the helper script in `scripts/count-messages.sh` (step 3 below) to track replies.
2. **Before ANY architectural change** - Schema edits, routing changes, new components.
3. **Before ending the session** - User says "thanks", "done", or conversation winds down → CHECKPOINT IMMEDIATELY.
4. **When context feels full** - Long file reads, multiple tool calls, complex discussions.

### How to checkpoint:
1. Create `docs/SESSION-LOGS/YYYY-MM-DD-HHMM.md` using `docs/SESSION-LOGS/TEMPLATE.md`
2. Update `docs/AGENT-CONTEXT.md` with current status
3. Log decisions in `docs/status/architectural-decisions-log.md` if applicable
4. Move any newly stale docs into `docs/archive/` when appropriate

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
1) **Read the quickstart loop:** `docs/AGENT-ONBOARDING.md` points to the exact docs you must scan before working.
2) **Then read:** `docs/RULES_STRUCTURE.md` (naming, routing, CSS, content model, webtree).
3) **Never add TypeScript to web/foundry/ui/fontviewer.** Only Studio and Content use TS.
4) **Tailwind v4 only; no tailwind.config.** Use `@theme` tokens from `@kol/ui/theme.css` and import it.
5) **Do not hardcode styles** in components when a token exists. Prefer utilities tied to shared tokens.
6) **Apps remain separate**: `web` is the public site, `foundry` is its own app (may embed in web later), `studio` is the editor.
7) **Use Yarn workspaces** commands (see `docs/operations/workspace-cheatsheet.md`). Avoid `npm` unless explicitly required.
8) **Internal imports**: prefer `@kol/ui` and `@kol/content` over duplicating code.
9) **Sanity schema changes** go in `packages/content` only; `apps/studio` just consumes them.
10) **No breaking the IA**: routes must align with `docs/RULES_STRUCTURE.md` unless a change is explicitly approved.
11) **When unsure**, add notes to `docs/` rather than improvising structure.
12) **Context Management**:
    - Follow the startup checklist in `docs/AGENT-ONBOARDING.md`
    - **ALWAYS read** the latest `docs/AGENT-CONTEXT.md` “Current Focus” section
    - Review the newest session log in `docs/SESSION-LOGS/` (archive holds older logs)
    - Reference the status board in `docs/status/migration-status-board.md` when you need a portfolio snapshot
    - For a full overview of the memory system, see `docs/operations/llm-context-system.md`
13) **Message Counter**: Use `scripts/count-messages.sh` or another tally to stay within the checkpoint cadence. At 10 responses without a checkpoint you must pause and log; do not exceed 15 responses without one.
14) **Color references default to dark mode**: Assume the site runs in dark mode by default. When documenting or discussing colors, quote the dark-mode values unless the light equivalent is explicitly required.
15) **Typography first, no ad-hoc styles**: When you need text styling, reuse classes/combos documented in `docs/system/3.0-typography.md`. Do not invent new utility stacks (tracking, uppercase, custom spacing) without explicit approval.

## Working in the Styleguide / Best Practices
- Follow `docs/system/5.0-styleguide.md` for section structure, shared components, and preview layout requirements.

Output constraints for generated code:
- JSX only in `apps/web`, `apps/foundry`, `packages/ui`, `packages/fontviewer`.
- TS only in `apps/studio` and `packages/content`.
- Tailwind classes allowed everywhere; respect shared tokens.
