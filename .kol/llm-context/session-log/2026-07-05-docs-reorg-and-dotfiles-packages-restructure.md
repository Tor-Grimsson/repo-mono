# Session: docs/ reorg (kol-monorepo) + claude/packages/ restructure (dotfiles)

**Date:** 2026-07-05
**Agent:** Claude (Sonnet 5)
**Summary:** Full audit + reorg of this repo's `docs/` tree (numbering, machinery split, dead-weight removal), plus a parallel restructure of `~/.dotfiles/claude/packages/` into skill-family-named groups. Two new orientation-only skills shipped. One content-staleness issue found and deliberately left untouched.

## Changes Made

### `docs/` (kol-monorepo)

- **Numbering fix** — all 72 files under `docs/documentation/` renamed from the legacy `X.Y.Z-slug.md` scheme to the actual kol-docs-md spec (`NN-slug.md` + literal `INDEX.md` per section index). Frontmatter `File:`/`Document-ID:` fields (encoded the retired scheme) stripped. All cross-references repointed tree-wide.
- **`08-operations` retired as a numbered section** — most of its content was repo machinery, not site subject matter. Split: `03-site-tree.md` (a real route inventory) moved into `documentation/04-pages/`; the rest moved to a new sibling `docs/operations/` (`01-workflow/`, `02-infrastructure/`, `03-creative-tooling/`). `09-cdn` renumbered to `08-cdn` to keep numbering contiguous.
- **Dead weight removed** (quarantined to `_tmp/docs-audit-removed/`, not deleted): `a-torg/` (orphan scratch), `8.1.0-llm-agents.md` (superseded by `.kol/llm-context/`), `reference/` (dissolved — 2 dead files, 1 folded into `docs/operations/03-creative-tooling/`, 1 moved into `documentation/04-pages/`), `documentation/README.md` (a dead 2025-11 proposal for a numbering scheme never actually built), `documentation/landing.md` (redundant with the `INDEX.md` this session wrote), `kolkrabbi-info/` (byte-identical duplicate of `kol-studio`'s own founder registry — see below), `09-cdn/cdn-backblaze/` (7 files of generic rclone/HLS tutorial boilerplate, fully superseded by `~/.dotfiles/docs/18-cdn-r2b2/`).
- **`docs/archive/`** — `agent-context-history.md` (this repo's own condensed work history) was genuinely agent-context material, not docs-vault content. Merged verbatim into `.kol/llm-context/history.md`'s "deep history" section; `kol-client-history/` (608K, 60 raw session logs from an unrelated tool) quarantined to `_tmp/`. `docs/archive/` folder removed entirely.
- **INDEX.md coverage** — `docs/INDEX.md`, `documentation/INDEX.md`, and one per section/subfolder, all written or repaired.

### `kolkrabbi-info` vs `kol-studio` (cross-repo check)

Compared `docs/kolkrabbi-info/*` against `kol-studio/_private/kol-business/founder/01-registry/*` — byte-identical, both frozen since 2026-05-30. kol-studio's own `founder/INDEX.md` already disclaims this content ("belongs in kol-resume/kol-claude, not this repo") — no such repo exists yet. Verdict: nothing unique to preserve, deleted (to `_tmp/`) rather than kept as a stale duplicate.

The *actually* stale data turned out to be `apps/brand/src/brand/data/business-data.js`/`info.js` vs `kol-studio/data/business-data.js`/`info.js` (kol-studio's live CV/PDF tool — the real source of truth). 271-line diff; 4 factual errors identified (aftra job shows ended but is ongoing, missing the 2026 Another Creation client, a mislabeled completed-BA that wasn't actually earned, a missing `cv: false` hide-flag). **Left untouched** per explicit instruction — logged as an open item below.

### `~/.dotfiles/claude/packages/` (separate repo)

Restructured from a flat, inconsistent bag of files into 4 skill-family-named groups: `kol-docs/` (fm/md/lib canon), `kol-cdn/` (`kol-bucket-b2`/`kol-bucket-r2` CLIs, renamed from bare `bucket`/`bucket-r2`, `kol-cdn-overview`), `kol-packages/` (misc single skills — `alga-tmpl/`, renamed from `algorithmic-art-templates/`), `scaffold/` (`01-scaffold-dev-stack`, `02-scaffold-docs` incl. the `.obsidian` reference shapes, `03-scaffold-llm-context` incl. `LLM_RULES.md`, moved here since this is the skill that actually symlinks it). `~/.local/bin/bucket`/`bucket-r2` repointed to the renamed targets — command names unchanged. All path references across skills/docs updated and grep-verified clean. Verified via `diff` on plain path lists (not visual tree output — `tree`'s NBSP indentation produces false mismatches against hand-typed comparisons).

### New skills

- **`kol-cdn-overview`** — orientation-only (no commands) for the CDN: which provider/bucket, what's where, who consumes it. Complements the action skills `kol-bucket-b2`/`kol-bucket-r2`.
- **`kol-docs-overview`** — orientation-only explainer for the kol-docs system (the 3-layer split, the numbering law, the doc contract), before reaching for the authoring skills (`kol-docs-md`, `scaffold-docs-system`, `kol-docs-fm`).

## Current State

### Working
- `docs/` — fully renumbered, machinery split correctly, all INDEX.md present, 0 stale path references (verified by grep sweep).
- `claude/packages/` — fully restructured, verified via plain-path `diff` (exit 0), CLI commands (`bucket`, `bucket-r2`) still resolve correctly post-repoint.

### Known Issues
- `apps/brand/src/brand/data/business-data.js`/`info.js` — 4 factual errors vs. `kol-studio`'s live data (see above). Not fixed — deliberately deferred, touches live bio/contact copy.
- Pre-existing, not introduced this session (flagged by the renumbering pass, left as-is): `docs/documentation/README.md`-adjacent dead links, ~49 cross-folder links missing a `../NN-folder/` prefix, `07-research/INDEX.md` listing research docs that don't exist, a few dangling references to docs that were planned but never written.
- A dotfiles canon amendment (`kol-docs-lib/01-structure.md` — add named exceptions for archive/PII-registry siblings) was proposed but never executed. Out of scope for this repo; not tracked here going forward.

## Next Steps
1. Fix the 4 `apps/brand` data-staleness items when brand work resumes (see `AGENT-CONTEXT.md` Ongoing status).
2. Video migration Phase 3 (Sanity CMS patch) — unrelated to this session, still the standing next step from the prior checkpoint.
