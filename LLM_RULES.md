# LLM Rules for kolkrabbi.io

> **Mandatory interpretation:** When the user says "read `LLM_RULES.md`", follow the startup protocol in Core Rules (rule 0). Read the context files (AGENT-ONBOARDING.md, AGENT-CONTEXT.md, latest session log), then STOP and wait for the user to specify their task. Do NOT auto-load documentation from `docs/documentation/` - read those on-demand. If the user asks "Do you understand?" or "Outline the task?", respond with a clear plan before taking any action.

---

## 🚨 CRITICAL: DESIGN SYSTEM INTEGRITY

**ALWAYS reference the documented system. NEVER invent solutions.**

### Reference Documentation (Read on-demand based on task)
1. **`docs/documentation/2.1.0-design-system-colors.md`** - Color token architecture and usage
2. **`docs/documentation/2.3.0-design-system-css-architecture.md`** - CSS patterns and architecture
3. **`docs/documentation/3.1.0-design-system-atoms.md`** - Component building blocks
4. **`docs/documentation/0.0.0-proposal-documentation.md`** - Documentation system principles

**DO NOT auto-load these docs on startup. Only read them when relevant to the specific task.**

### Absolute Rules
1. **NEVER hardcode colors** - Always use semantic tokens (`var(--kol-*)`)
2. **NEVER use deprecated tokens** - No `--component-fg`, `--component-surface`, etc.
3. **NEVER use inline styles for colors** - Except documentation swatches showing actual values
4. **ALWAYS use context-aware tokens** - Reference tokens that adapt through scoped remapping
5. **ALWAYS check system docs BEFORE suggesting changes** - Don't guess or invent patterns

### When Debugging
- **Follow `docs/documentation/2.3.0-design-system-css-architecture.md` checklist IN ORDER**
- Check for deprecated tokens first
- Check for hardcoded colors second
- Check for missing surface context third
- Don't skip ahead or invent solutions

### When Making Changes
- Verify your approach matches documented patterns in `docs/documentation/`
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
1. **At least once every 10 responses OR when you ship a milestone** – use the helper script in `docs/llm-context/count-messages.sh` (step 3 below) to track replies.
2. **Before ANY architectural change** - Schema edits, routing changes, new components.
3. **Before ending the session** - User says "thanks", "done", or conversation winds down → CHECKPOINT IMMEDIATELY.
4. **When context feels full** - Long file reads, multiple tool calls, complex discussions.

### How to checkpoint:
1. Create `docs/llm-context/SESSION-LOGS/YYYY-MM-DD-HHMM.md`
2. Update `docs/llm-context/AGENT-CONTEXT.md` with current status
3. Log decisions in `docs/archive/system-retired/` if applicable
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

0) **Startup protocol:** After reading this document:
   - Read `docs/llm-context/AGENT-ONBOARDING.md` (quickstart checklist)
   - Read `docs/llm-context/AGENT-CONTEXT.md` (current status)
   - Read latest session log from `docs/llm-context/SESSION-LOGS/`
   - **STOP** - Wait for user to specify task
   - Then read only task-relevant docs from `docs/documentation/` (don't auto-load everything)
1) **Never add TypeScript to web/foundry/ui/fontviewer.** Only Studio and Content use TS.
2) **Tailwind v4 only; no tailwind.config.** Use `@theme` tokens from `@kol/ui/theme.css` and import it.
3) **Do not hardcode styles** in components when a token exists. Prefer utilities tied to shared tokens.
4) **Apps remain separate**: `web` is the public site, `foundry` is its own app (may embed in web later), `studio` is the editor.
5) **Use Yarn workspaces** commands (see `docs/operations/workspace-cheatsheet.md`). Avoid `npm` unless explicitly required.
6) **Internal imports**: prefer `@kol/ui` and `@kol/content` over duplicating code.
7) **Sanity schema changes** go in `packages/content` only; `apps/studio` just consumes them.
8) **No breaking the IA**: routes must align with `docs/documentation/0.0.2-metadata-index.md` unless a change is explicitly approved.
9) **When unsure**, add notes to `docs/` rather than improvising structure.
10) **Context Management**:
    - Follow the startup protocol in rule 0 above
    - Reference `docs/documentation/0.0.2-metadata-index.md` when you need to find documentation
    - For a full overview of the protocol, see `docs/documentation/7.1.0-llm-agents-and-protocols.md`
11) **Message Counter**: Use `docs/llm-context/count-messages.sh` or another tally to stay within the checkpoint cadence. At 10 responses without a checkpoint you must pause and log; do not exceed 15 responses without one.
12) **Color references default to dark mode**: Assume the site runs in dark mode by default. When documenting or discussing colors, quote the dark-mode values unless the light equivalent is explicitly required.
13) **Typography first, no ad-hoc styles**: When you need text styling, reuse classes/combos documented in `docs/documentation/2.2.0-design-system-typography.md`. Do not invent new utility stacks (tracking, uppercase, custom spacing) without explicit approval.

## Working in the Styleguide / Best Practices
- Follow `docs/documentation/3.0.0-design-system-components.md` for section structure, shared components, and preview layout requirements.

Output constraints for generated code:
- JSX only in `apps/web`, `apps/foundry`, `packages/ui`, `packages/fontviewer`.
- TS only in `apps/studio` and `packages/content`.
- Tailwind classes allowed everywhere; respect shared tokens.
