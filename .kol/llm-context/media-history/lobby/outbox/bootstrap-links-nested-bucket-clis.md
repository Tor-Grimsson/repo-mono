# Make `bootstrap-cli.sh` link the bucket CLIs from where they now live

**Filed:** 2026-10-02 → **dotfiles**
**Entry:** `~/.dotfiles/lobby/done/bootstrap-links-nested-bucket-clis.md`
**Ledger:** `~/.dotfiles/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-05 — `bootstrap-cli.sh:127–129` links both CLIs by name

## Why it went there

The bucket wrappers and the bootstrap that links them both live in dotfiles; this repo only
noticed, on its first MBP session, that `bucket` was a dead symlink and `bucket-r2` was missing.

## What stays here

Nothing. Both CLIs were linked by hand on the MBP the same session and verified with a live read,
so bucket work from this repo is unblocked on this machine regardless of when the ticket closes.

---

## ✅ RETURNED — 2026-10-05

🟢 `closed` in **dotfiles**. The fix as filed: `bootstrap-cli.sh:127–129` is now `mkdir -p` plus
the two `ln -sf` lines by name, and `cdn/05-scripts.md:63` names `claude/packages/kol-cdn/` and
`bootstrap-cli.sh`. Verified by running those three lines against a throwaway home seeded with
the broken state this repo found (dead `bucket`, missing `bucket-r2`) — both resolve to the
`kol-cdn/` wrappers and answer `--help`. The iMac was not checked; the same lines repair it on
that machine's next bootstrap run.

**Remainder here:** none.
