# Session: First MBP session — what a fresh clone does not carry

**Date:** 2026-10-02
**Agent:** Grim (Claude Fable 5.1)
**Summary:** No code changed. First boot of this repo on the MBP: found what `.gitignore` keeps off a fresh clone, restored the boot symlink and the bucket CLIs, and filed the bootstrap bug behind the missing CLIs to dotfiles.

## Changes Made

- **`LLM_RULES.md`** — symlinked to `~/.dotfiles/claude/packages/scaffold/03-scaffold-llm-context/LLM_RULES.md`. It is gitignored, so a clone never has it and `/ag-init` step 1b reads nothing. The target is the one kol-website and kol-olina use, not the copy at the dotfiles root.
- **`~/.local/bin/bucket` and `bucket-r2`** — linked by hand to the wrappers under `claude/packages/kol-cdn/`. `bucket` had been a dead link to the old flat path; `bucket-r2` did not exist. Both verified with a live read of their store.
- **`bootstrap-links-nested-bucket-clis` → dotfiles, 🔵 filed.** `bootstrap-cli.sh:126–131` links only executables directly in `claude/packages/`, and the wrappers moved a level down, so it links nothing. Receipt in `lobby/outbox/`, rows in both ledgers.
- **Copied in by the user from the iMac:** `docs/`, `_media/`, `.dev.vars`, `.kol/`. `_tmp/` was deliberately not brought — fetch from it only when something specific is needed.

## Current State

### Working
- Context boots in full on the MBP: rules file, both docs indexes, `.kol/`.
- Bucket reads from the terminal on both providers (`bucket ls`, `bucket-r2 ls`).

### Known Issues
- **`node_modules` is absent.** `pnpm install` is held on the user's word — nothing runs until it does, including wrangler.
- **R2 writes are untested on this machine.** A wrangler login config exists; whether the session is still valid is unknown until wrangler is installed.
- **Four KOL packages are behind:** kol-component 0.215.0 → 0.237.0 · kol-framework 0.44.0 → 0.48.0 · kol-icons 0.27.0 → 0.33.0 · kol-theme 0.145.0 → 0.163.0.
- **A stale 📌 in the ledger.** The `ColumnBrowserResize` row still carries a remainder (per-column widths) that `ColumnBrowserWidthsPersist` shipped and the ledger itself records as adopted. Left as is — the state is the user's call.
- `baseline-390.png` and `p1-column.png` sit at the repo root in the clone; nothing references them.
- The iMac's bucket links were not checked and may be dead for the same reason.

## Next Steps

1. `pnpm install`, when the user says so.
2. Bump the KOL packages (`/bump`) and re-measure — the user's call.
