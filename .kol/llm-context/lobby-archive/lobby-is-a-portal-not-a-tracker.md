# lobby-is-a-portal-not-a-tracker

**Filed:** 2026-08-01 → **humpty**
**Entry:** `~/dev/projects/kol-dumpty/humpty/lobby/inbox/lobby-is-a-portal-not-a-tracker.md`
**Ledger:** `~/dev/projects/kol-dumpty/humpty/lobby/LEDGER.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · synced 2026-08-01

## Why it went there

This lobby carried **4 rows with 0 outstanding agent tasks** — one shipped and
verified, two receipts 🟢 with `Remainder here: none`, one whose upstream fix had
already shipped and been consumed. It is an agent-behaviour defect, not a website
issue, so it belongs in humpty.

The cause is a rule rather than a lapse: `INDEX.md:26` set the closing bar at
*"the user confirms it"*. Written to stop the agent declaring victory, it instead
stopped the agent filing anything, and finished work piled up in a live queue.

The user's ruling:

> *"we cant keep lobby items open just because they havent been implemented,
> thats not what the lobby does, its just a build and info portal"*

## What stays here

**Done in the same turn — this repo did not wait for humpty.** The bar was changed
to **purpose-served** and every finished ticket closed. What a `/lobby-list` now
shows is live work only; the user's open **decisions** live in
`.kol/llm-context/AGENT-CONTEXT.md` § *Awaiting user rulings*, never as lobby rows.

**Remainder here:** `none`. The estate-wide half — the lobby spec under
`~/.dotfiles/docs/operations/systems/lobby/`, the other three registered ledgers'
headers, and the `lobby-hygiene` check — is humpty's, and its 🟢 needs a
measurement across all four lobbies.
