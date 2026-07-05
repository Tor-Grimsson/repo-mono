---
Title: CDN Tree Structure
Date: 2025-12-26
Status: Active
Category: CDN
Content-Type: Reference
tags:
  - cdn
  - reference
  - media
  - assets
  - infrastructure
  - backblaze
modified: 2026-07-05T00:00:00+00:00
---

# CDN Tree Structure

This repo doesn't maintain its own copy of the tree — it went stale the moment it was pasted in.
The live, auto-refreshed source of truth is `~/.dotfiles/docs/18-cdn-r2b2/`:

- **Readable tree:** `~/.dotfiles/docs/18-cdn-r2b2/02-b2-tree.md`
- **Raw (scripts/nvim):** `~/.dotfiles/docs/18-cdn-r2b2/_files/website/{tree.json, tree.full.txt}`
- **Regenerate on demand:** `bucket tree` (see the `kol-bucket-b2` skill), or read-only orientation via the `kol-cdn-overview` skill.

Both are refreshed automatically by a post-write hook on every `bucket up/sync/rm` — never hand-paste a tree here again.

## Related

- [CDN Overview](01-cdn-overview.md)
- [CDN Index](INDEX.md)
