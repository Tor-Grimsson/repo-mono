# Architectural Decisions Log

> This file tracks important architectural and structural decisions made during the monorepo consolidation.

## Decision Format
```markdown
## [DATE] - Decision Title
**Context**: Why this decision was needed
**Decision**: What was decided
**Rationale**: Why this approach was chosen
**Alternatives Considered**: What other options were evaluated
**Impact**: What this affects
**Status**: Active | Superseded | Under Review
```

---

## 2024-10-04 - Context Management and Session Logging System
**Context**: Multiple LLM sessions working on consolidation risk losing work due to context limits and lack of continuity between sessions.

**Decision**: Implement a checkpoint protocol with:
- Session logs in `docs/SESSION-LOGS/`
- Shared `AGENT-CONTEXT.md` as entry point for all agents
- Self-awareness rules for LLMs to checkpoint every 10-15 messages
- Mandatory checkpointing before major changes or session end

**Rationale**: 
- Prevents work loss from context overflow
- Provides continuity across different LLM sessions
- Creates audit trail of what was done and why
- Enables multiple agents to coordinate effectively

**Alternatives Considered**:
- Single long conversation (rejected: context limits)
- Git commits only (rejected: too granular, loses reasoning)
- External project management tool (rejected: adds friction)

**Impact**: 
- All agents must follow checkpoint protocol
- Adds slight overhead but prevents major work loss
- Establishes pattern for cross-session collaboration

**Status**: Active

---

## Template for New Decisions

## [DATE] - [Decision Title]
**Context**: 

**Decision**: 

**Rationale**: 

**Alternatives Considered**: 

**Impact**: 

**Status**: Active

---

## 2025-10-11 - Styleguide Foundry Preview Enhancements
**Context**: Needed a consolidated regression surface for light/dark modes after recent token refactors.

**Decision**: Add the full Foundry font preview card to the styleguide; introduce separate dropdowns for style (Roman/Italic) and weight using shared tokens; isolate tag hover styling from dropdown control class.

**Rationale**: The composite card exercises badge, dropdown, slider, and specimen tokens simultaneously, making LD-mode issues obvious. Separate dropdowns allow scalable style combos without polluting button styling.

**Alternatives Considered**: Keep toggle buttons for Roman/Italic (rejected: rigid, harder to extend); leave styleguide without composite (rejected: harder to QA LD regressions).

**Impact**: Styleguide now reflects production controls; Tag component uses `tag-control` class; Dropdown unaffected.

**Status**: Active

