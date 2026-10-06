# Session: docs/.obsidian per-file symlink fix + kol-docs canon sync (cross-repo)

**Date:** 2026-07-05
**Agent:** Claude (Sonnet 5)
**Summary:** Fixed kol-monorepo's `docs/.obsidian` (was a real, un-symlinked directory) into the correct per-file-symlink model, then propagated that corrected model into the kol-docs skill family and dotfiles canon that had documented the wrong (whole-directory) symlink approach. Also: a `~/.zshrc` dead-code fix and a `/ag-init` skill duplicate, both in `~/.dotfiles` (not this repo).

## Changes Made

### Files Modified — kol-monorepo
- `docs/.obsidian/` — was a real directory; old copy quarantined to `_tmp/docs-obsidian-removed/` (already gitignored, zero git impact — `docs/.obsidian/` was already in `.gitignore`). Rebuilt as a real local dir with 12 per-file symlinks into `~/.dotfiles/claude/packages/scaffold/02-scaffold-docs/obsidian-shapes/02-kol-vault-shape/.obsidian/` (icons/, plugins/, snippets/, themes/, app.json, appearance.json, command-palette.json, community-plugins.json, core-plugins.json, graph.json, hotkeys.json, types.json). `workspace.json` and the rest of the exclusion list intentionally left unseeded — Obsidian creates them fresh, per-vault.
- **First attempt was wrong** — initially symlinked the whole directory to `01-vault-shape`, picking that shape unilaterally without asking. User corrected: `kol-docs-overview` is read-only/orientation-only (it says so explicitly), the actual wiring decision belongs to `scaffold-docs-system` and needs an explicit user choice. Redone correctly after clarification (shape = `02-kol-vault-shape`, per-file not whole-directory).

### Files Modified — `~/.dotfiles` (separate repo, cross-referenced from this session)
- `claude/skills/scaffold-docs-system/SKILL.md` — layout diagram, workflow step 4, and the full `.obsidian` picker section rewritten: symlink mode documented as per-file (loop over each item, not `ln -s .../.obsidian docs/.obsidian`), with the rationale (whole-dir symlink would make `workspace.json` one shared file across every consuming repo) and the full 9-item never-seeded list.
- `claude/skills/kol-docs-overview/SKILL.md` — Obsidian-layer paragraph updated to state per-file symlinking.
- `claude/packages/kol-docs/kol-docs-lib/02-obsidian.md` (the actual canon file behind the bug) — picker rewritten, new "per-file not whole-directory" section added, exclusion list expanded from 3 items to the correct 9 (matching `obsidian-shapes/INDEX.md`), stale frontmatter description ("two shapes"/"four-choice picker") corrected to three/six, `updated:` bumped to `2026-07-05 (3)`.
- `claude/packages/scaffold/02-scaffold-docs/obsidian-shapes/INDEX.md` — intro + "how repos consume a shape" line clarified to per-file.
- `docs/20-kol-docs-system-setup/INDEX.md` (dotfiles' own global docs) — same clarification, links out to the canon for the full exclusion list.
- `claude/packages/kol-docs/kol-docs-lib/_example-repo/docs/INDEX.md` — one-line wording fix.
- Checked but left untouched (don't restate the mechanic): `kol-docs-md`/`kol-docs-fm` skills + packages, `kol-docs-lib/01-structure.md`, `TOOLING.md`, `21-dotfiles/01-repo-model.md`, `16-claude-agents/02-skills.md`, `01-agent-context-protocol.md`, `.kol/llm-context/*` (session logs are historical record, never rewritten).
- `shell/.zshrc` — deleted a dead `export PATH="$(npm config get prefix)/bin:$PATH"` line. It ran `npm` on every shell init regardless of project, which is what surfaced pnpm-only `.npmrc` warnings (`link-workspace-packages`, `public-hoist-pattern`) as Powerlevel10k "console output during init" noise whenever a pane opened in a pnpm repo. `npm config get prefix` resolved to `/usr/local` on this (Intel) machine — already on PATH via Homebrew, so the line did nothing useful.
- `claude/skills/ag-init/SKILL.md` — new skill, a duplicate of `agent-init` renamed to `ag-init` (frontmatter `name` updated to match), at the user's request. Original `agent-init` untouched.

### Features Added/Removed
- None — this was a correctness/consistency fix, not new functionality.

## Current State

### Working
- kol-monorepo's `docs/.obsidian` now matches the (now-documented) correct model: real local dir, per-file symlinks, `workspace.json` family unseeded.
- kol-docs skill family (`kol-docs-overview`, `scaffold-docs-system`) and the dotfiles canon (`kol-docs-lib/02-obsidian.md`, `obsidian-shapes/INDEX.md`, the global setup doc, the example repo) all now describe the same per-file model — verified via grep sweep, the only remaining `ln -s .../.obsidian docs/.obsidian` hits are the two docs explicitly citing it as the wrong pattern to avoid.
- `~/.zshrc` no longer runs `npm config get prefix` on shell init.

### Known Issues
- None introduced. Pre-existing doc gap (whole-directory symlink documented, contradicting the "workspace.json must stay per-vault local" rule) is what this session fixed.

## Next Steps
1. Video migration Phase 3 (Sanity CMS patch) — unrelated, still the standing next step from the prior checkpoint.
2. Fix the 4 `apps/brand` data-staleness items when brand work resumes (see `AGENT-CONTEXT.md` Ongoing status) — also still standing, untouched this session.
3. If any other repo besides kol-monorepo ever wires a `docs/.obsidian`, it should use the now-corrected per-file model directly — nothing else on disk needed migrating this session (kol-monorepo was the only repo with a wired `.obsidian`).
