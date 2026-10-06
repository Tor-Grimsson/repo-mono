# Republish kol-markdown so its kol-search range reaches 0.3

**Filed:** 2026-10-02 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/republish-kol-markdown-for-kol-search-0-3.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-10-02 — kol-markdown 0.1.3; remainder executed here the same day

## Why it went there

After the 2026-10-02 bump (component 0.162.0 → 0.237.0) `pnpm why
@kolkrabbi/kol-search` in `apps/web` reads **Found 2 versions**:
`kol-markdown@0.1.2` declares `^0.2.0` and nests `kol-search@0.2.0`, while
`kol-component@0.237.0` and `kol-workshop@0.37.0` take 0.3.0. The range is the
package's, so the fix is a `kol-markdown` republish. The kol-ds-ui session
confirmed it real and harmless (pure functions, one unchanged export in use)
and asked for a low-priority ticket.

## What stays here

Nothing until it ships — no stopgap override was added. Once `kol-markdown`
is republished: bump whatever pulls it, then `pnpm why @kolkrabbi/kol-search`
in `apps/web` → Found 1 version.

## 🟠 ADDRESSED — 2026-10-02 · kol-markdown@0.1.3

Republished with no source change; its `workspace:^` range now resolves
against kol-search 0.3.0.

**Remainder here:** none.

✅ **Remainder executed 2026-10-02 same session:** `pnpm update -r --depth 99
"@kolkrabbi/kol-markdown"` moved the transitive copy to 0.1.3. In `apps/web`,
`pnpm why @kolkrabbi/kol-search` → **Found 1 version** (0.3.0). Confirmation
appended to the entry; the destination closes it.

## ✅ RETURNED — 2026-10-02 · kol-markdown@0.1.3

Republished with no source change: the workspace range resolves against kol-search 0.3.0. kol-website confirmed pnpm why @kolkrabbi/kol-search reads one version.

**Remainder here:** none
