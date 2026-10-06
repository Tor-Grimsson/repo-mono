---
name: humpty-tokens-gate-shell-exception
description: "The humpty-tokens hook denies ANY hex/px Write in kol repos — including token files, session logs, and media-query breakpoints; ask once, then shell-write on the user's explicit go"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 46c85840-2463-4371-a378-4c69b9e5eb13
  modified: 2026-08-08T20:48:40.966Z
---

The `humpty-tokens` PreToolUse hook (humpty plugin) denies every Write/Edit whose payload contains a raw hex color or a bare `Npx` (N>2) in any repo with ≥10 `--kol-*` tokens. It is content-matching only: it also blocks the token file it directs you to write, markdown session logs quoting values, and media-query breakpoints. No override marker exists (verified in `humpty_tokens.py` 0.5.0). The misfire class is filed in dotfiles `lobby/inbox/humpty-gates-misfire-on-docs-and-command-text.md`.

**Why:** the gate is the enforceable half of Law 1 (use the existing token); its false positives land exactly on legitimate token-definition and documentation writes.

**How to apply:** first do the search the gate demands and state the "no token carries this value" claim with proof (grep the DS packages). If the write is still a genuine token-file/doc case, ask the user once — on their explicit go, write those specific files via shell heredoc. Never route around the gate silently, and never launder values into `rgb()`/rem to slip past it; rem conversions are only for values that are genuinely unit-convertible verbatim ([[decisions-in-plain-speak]]).
