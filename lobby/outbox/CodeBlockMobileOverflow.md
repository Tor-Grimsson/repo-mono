# CodeBlockMobileOverflow — article code clips at the viewport, copy button on line 1

**Filed:** 2026-08-25 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/CodeBlockMobileOverflow.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — kol-component 0.68.1 + kol-theme 0.50.2 (in 0.51.0); remainder executed here 2026-08-26

## Why it went there

kolkrabbi.io `/stack/vcap` at 393: tokens to x=482, no wrap/scroll on the `<pre>`; the 32px copy button overlaps code. CodeBlock is kol-component's. Source: `.kol/llm-context/plans/2026-08-25-mobile-audit-web-brand.md`.

## Remainder here once it ships

bump kol-component; re-check `/stack/vcap` on a phone

## ✅ RETURNED — 2026-08-26 · kol-component@0.68.1

Two defects, one measured root cause each, shipped as kol-component 0.68.1 + kol-theme 0.50.2. (1) The block did not wrap: oneDark `code[class*="language-"]` carries `whiteSpace: pre` and react-syntax-highlighter spreads the theme code style AFTER its own `wrapLongLines` value — so `.kol-codeblock` pre-wrap, `customStyle` pre-wrap and `wrapLongLines` all lost, the `<code>` computed `pre`, and every long line scrolled inside the frame (production `/stack/vcap` at 393: block 359 wide, content 465–759). The override now states `pre-wrap` where it is decided; the code surface law (06-code-surface.md: Block wraps) is what the code does. Desktop changes with it — a line longer than the block wraps instead of scrolling, the ruled behaviour. (2) The copy control overlapped line 1 only on CHIPLESS blocks (measured: with a chip the control sits in the chip row, y 2148–2180 against line 1 at 2183; without one, 3729–3761 against 3735–3756). Each line is stamped `.kol-codeblock-line`, and `.kol-codeblock:not(:has(.kol-codeblock-filename)) .kol-codeblock-line:first-child` reserves `calc(2rem + var(--kol-spacing-3))` — the control box plus its inset. Verified in the showcase at 393: `<code>` computes pre-wrap, scrollWidth = clientWidth on every block, a chip removed live gives line 1 44px of end padding and its text ends 12px short of the control. Not done: `overflow-x: auto` on the pre — the block already has it, and the law says wrap. 20 gates clean.

**Remainder here:** bump kol-component >=0.68.1 + kol-theme >=0.50.2; re-check `/stack/vcap` on a phone

✅ **Remainder executed 2026-08-26 same session:** kol-component ^0.68.1 + kol-theme 0.51.0 in both apps. Verified on `/workshop/docs/01-foundation-INDEX` at 393: `<code>` computes `pre-wrap`, scrollWidth = clientWidth (311/311), 9 lines stamped `.kol-codeblock-line`, chipless first line carries 44px end padding, chipped block 0. **Only after a root `pnpm.overrides`** — kol-workshop's DocumentationReader had been rendering kol-component **0.39.0**'s CodeBlock (its own nested dependency), so the bump alone changed nothing on that page; filed back as `NestedDsDependencies`. `/stack/vcap` on a phone stays a production check (Sanity CORS blocks the article locally).
