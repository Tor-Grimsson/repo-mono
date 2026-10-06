---
title: Bitwarden + Ente Auth Setup
updated: 2026-05-05
status: active
type: reference
tags:
  - domain/design-system
  - project/kol-monorepo
---

# Bitwarden + Ente Auth Setup

Personal secrets management. Bitwarden vault, Ente Auth for 2FA, CLI for project use.

## Accounts

- **Bitwarden**: EU region (`vault.bitwarden.eu`)
- **Ente Auth**: 2FA codes for Bitwarden login
- **Recovery keys**: stored offline on paper. NOT inside each other (no circular dependency).

## Master password rules

- ASCII only. The Bitwarden CLI mishandles Unicode characters (Alt-key chars like `å`, `ø`, `ƒ`).
- Use a passphrase: 4-5 random words, hyphen-separated.
- KDF set to **PBKDF2-SHA256, 600000 iterations** (Account Settings → Security → Keys).

## CLI install

Installed via npm (the Homebrew build had decryption bugs):

```
brew install node
npm install -g @bitwarden/cli
bw config server https://vault.bitwarden.eu
```

## Login (one-time per machine)

API key login, not password — more reliable.

1. Web vault → Account Settings → Security → Keys → View API Key
2. Copy `client_id` and `client_secret`
3. Terminal:
   ```
   bw login --apikey
   ```

## Daily use

Helpers in `~/.zshrc`:

```bash
bwu() { export BW_SESSION=$(bw unlock --raw); }
bws() { bw get notes "$1"; }
```

Workflow:

```
bwu                    # unlock vault for this shell
bws <secret-name>      # print secret value
```

Vault locks when shell closes — re-run `bwu` in new terminals.

## Adding secrets

Web vault → **+ New** → **Note**:

- Name: `openai-api-key` (or whatever — stable, reusable name)
- Notes field: paste the secret value
- Master password re-prompt: leave **off**
- Save

Then `bw sync` in terminal so the CLI sees the new item.

## Project `.env` pattern

For any repo needing secrets:

1. `.gitignore` must include `.env` — verify **before** first commit.
2. Commit a `.env.example` with empty keys as documentation.
3. Generate real `.env` from Bitwarden:
   ```
   echo "OPENAI_API_KEY=$(bws openai-api-key)" > .env
   ```

## If a secret leaks

Rotate immediately at the source (regenerate the API key on the provider's site). Don't try to scrub git history first — once it's pushed, it's public.

## Quick reference

| Command | What it does |
|---|---|
| `bwu` | Unlock vault, set `BW_SESSION` |
| `bws <name>` | Print secret from Note named `<name>` |
| `bw sync` | Pull latest vault state from server |
| `bw list items` | Dump all items as JSON |
| `bw logout` | Forget account on this machine |
