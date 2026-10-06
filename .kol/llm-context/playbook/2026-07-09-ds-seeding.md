# Playbook — KOL-DS seeding into apps/web

> **Live work journal.** Append-only, newest at the bottom, real timestamps. Written tight — one
> idea per line, no prose. Scrub back to any point: "what happened 40 min ago" is a scroll.
> Scope/plan: `~/.claude/plans/compiled-herding-spark.md`. Milestone logs: `session-log/`.

**Goal:** adopt the KOL-DS theme model (light `:root` base + `[data-theme=dark],.dark` override +
`prefers-color-scheme`) so any subtree flips by attribute, then conform type/color to semantic
tokens — page by page, desktop-first.

**Standing rules (non-negotiable):**
- **Never `rm` — quarantine.** Dead files → `apps/web/_quarantine/` via `mv` (tracked, recoverable).
- **Rescue specimens first.** Flag every specimen/art file gold before it moves; label what it is.
- **Semantic tokens only.** No hardcoded colors; components read `var(--kol-*)` / `text-fg-*` pairs.
- **Log at every milestone.** Append here per change + `/log-work` at each page/phase close.
- **No git, no delete, approval before each phase.**

**Target theme model:** default follows OS (light base), toggle pins via `data-theme`/`.dark`,
per-component flip = one attribute on the card root.

---

## Entry format (the `/log-work-playbook` template)

```
[HH:MM] · <phase>/<page> · <file:line>
  what → <one line>          why → <one line>
  before → <token/class>     after → <token/class>
  verify → build <✓/✗> · toggle <✓/✗> · flip <✓/✗>
  note → <exception / rescue / decision, if any>
```

Milestone close (per page/phase):
```
──────────── MILESTONE: <phase/page> ──────────── [HH:MM]
  changed: N files · quarantined: N · rescued: N · build ✓
  log: session-log/<file>.md
```

Status legend: `✓` done+verified · `~` in progress · `⤺` reverted · `▣` quarantined · `★` rescued.

---

## Entries

[23:28 GMT · 2026-07-09] · setup · playbook created
  what → initialised the live playbook       why → document the seeding effort to pieces
  note → scope approved with 3 amendments (quarantine-not-delete · specimen rescue · this playbook).
         Awaiting go on Phase 1 (mode + tokens). Plan: `~/.claude/plans/compiled-herding-spark.md`.

[23:41 GMT · 2026-07-09] · phase1/investigate · apps/web/index.html:26-36 · packages/ui/theme.css:356
  finding → NO forced-dark. Boot defaults 'light', respects saved pref, but STAMPS data-theme="light" for new visitors.
  finding → web has NO prefers-color-scheme block; dark resolves only via :is([data-theme=dark],.dark) — descendant, so per-component flip ALREADY works.
  correction → earlier audit "pinned dark" was WRONG. Real gap: pins light + never follows OS.
  decision-needed → follow OS (auto-dark) or keep deliberate light-default? KOL-DS follows OS.
  note → no code edited; plan Phase-1 premise ("remove forced-dark") is wrong, needs re-scope.

[23:53 GMT · 2026-07-09] · phase1/mode-fix · apps/web/index.html:26-36 · packages/ui/theme.css
  what → boot no longer stamps data-theme on new visitors; added @media(prefers-color-scheme:dark) :root:not([data-theme=light]) surface block
  why  → follow OS (KOL-DS model); stop pinning light for new visitors
  before → new visitor pinned data-theme="light" (no OS-follow)
  after  → new visitor → :root light, or OS-dark via the media block; saved pref pins; toggle wins
  verify → build ✓ 5/5 · toggle (user) · per-component flip already worked
  note → decision: follow-OS. surfaces-only media block (matches DS kol-color.css); accent/status stay light in auto-dark, same as DS.
────────── MILESTONE: Phase 1 mode-fix ────────── [23:53 GMT]
  changed: 2 files · quarantined: 0 · build ✓ 5/5 · user-verify pending: OS-dark + toggle on :5173

[00:15 GMT · 2026-07-10] · phase2-3/Home · components/prose/cards/ArticleCardHero.jsx · workshop/molecules/CardFeatureItem.jsx
  what → ArticleCardHero: kicker RightGroteskMono→kol-helper-uc-md (RENDER BUG fixed) · kol-mono→kol-mono-xs · opacity:0.4→text-fg-48 · dead headingClass removed. CardFeatureItem: dropped freestyle text-[16px].
  why  → kill retired-font render bug + legacy alias + inline opacity + redundant size; semantic tokens only
  before → literal 'RightGroteskMono' 16px op0.6 · after → kol-helper-uc-md text-fg-64 (JetBrains via token)
  verify → build ✓ 5/5 · user render-check pending on /  (home rail) + /stack cards
  note → self-caught: nearly dropped the still-used variant prop, restored it. LEFT: HomeInstagram:550 @kolkrabbi_ link = 28px freestyle, no kol-helper match → needs a step ruling, untouched (would resize).
────────── MILESTONE: Home conformance ────────── [00:15 GMT]
  changed: 2 files · quarantined: 0 · build ✓ 5/5 · open: HomeInstagram link size ruling

[00:26 GMT · 2026-07-10] · side/theme-toggle-icon + ascii-cursor · ThemeToggle.jsx · index.css · _tmp/lobby-ThemeToggle.md
  what -> ThemeToggle icons theme-toggle(poser) -> mode-toggle-01/02 (real, kol-icons V1 set). ascii-cursor light opacity 0.65 -> 0.9. Wrote ThemeToggle lobby brief.
  why  -> use the shipped true toggle icons; crosshair still faint on white; stage ThemeToggle for the DS.
  verify -> user render-check: toggle glyph on shell + cursor on white. no build (runtime icon-name + css only).
  note -> lobby spec written IN-REPO (_tmp/lobby-ThemeToggle.md) per stay-in-CWD; user drops into kol-design-system/lobby/ThemeToggle.md + INDEX row. mode-toggle 01/02 may be state-reversed -> 1-line swap if so.

[01:23 GMT · 2026-07-10] · WORKFLOW ds-adoption-conformance (13 agents, 0 err) · 6 buckets -> verify -> quarantine
  applied -> 24 fixes: Extraction + Glyph* mono chrome -> var(--kol-font-family-mono)/kol-mono-text; Extraction rgba lines -> --kol-border-default; FoundryCharacterSets fade -> surface token; Typography/TypeSample/prose-examples stale 'Right Grotesk Mono' -> 'JetBrains Mono'; ProjectListItem 'TG Malromur' -> 'TGMalromur' (font-load bug); Metrics tab sizing; GlyphInspector/MetricsViewerCard undefined kol-label-* -> existing.
  skipped -> 39 skipped-size (Footer/Navbar chrome inline sizes: conservative rule HELD, no blind resize), 8 skipped-exception (specimens/scrims), 3 skipped-other (StackArticle inline prose style).
  quarantine -> 8 dead files mv-> apps/web/_quarantine/ (flattened); 1 HELD (ArticleLayout still-referenced). NEVER rm.
  verify -> build 5/5 green. 1 FLAG OPEN: PortableTextBlog kol-segment-title still undefined (renders unstyled, pre-existing) -> left; needs a design ruling, not a guess.
  note -> REPO RENAMED kol-monorepo -> kol-website (dir stamped 01:02, mid-run). Repo intact (.git + all edits present). Session CWD was stale; now on /Users/biskup/dev/projects/kol-website.
------------ MILESTONE: Workflow conformance pass ------------ [01:23 GMT]
  changed: ~10 files across 6 buckets · quarantined: 8 (1 held) · build 5/5 · open: kol-segment-title · path: kol-website

[01:36 GMT · 2026-07-10] · checkpoint · doc-currency
  playbook -> CURRENT (workflow pass + rename logged 01:23)
  AGENT-CONTEXT -> STALE (last updated 2026-07-09 / docs-parser checkpoint; no ds-adoption arc, no rename) -> syncs on /log-work (not run)
  09-ds-adoption/INDEX -> lags: says "Phase 1 in progress"; now mode-fix done + a conformance pass done
  plan compiled-herding-spark.md -> current (multi-agent section; results live in this playbook)
  note -> repo path now /Users/biskup/dev/projects/kol-website; session CWD stale. AGENT-CONTEXT + a session-log need /log-work to sync.

[01:52 GMT · 2026-07-10] · batch1/fixable-now · data/workshop/tokens.js · apps/web/_quarantine/
  what -> tokens.js: 39x 'Right Grotesk Mono' -> 'JetBrains Mono' (stale display labels; render already JetBrains via token). ArticleLayout.jsx -> _quarantine (importers StackBlog/StackDetail already quarantined -> now 0 refs; 9/9 dead files moved).
  verify -> build 5/5 green
  note -> Navbar mono swap DEFERRED (safe target confirmed = kol-mono-16 for the inline-16px spots / kol-mono-14 for 14px; kol-mono-text is responsive 14/18px so dropping inline alone would resize) -> needs per-element edits (6 identical inline strings + shared className), not a blanket replace. Next focused step.

[01:54 GMT · 2026-07-10] · batch1/Navbar · components/layout/Navbar.jsx
  what -> 7 kol-mono-text + inline fontSize -> 6x kol-mono-16 + 1x kol-mono-14, inline sizes dropped
  why  -> conform mono chrome to fixed kol steps; inline forced fixed 16/14 so kol-mono-16/14 = identical render
  verify -> 0 residual kol-mono-text/inline-size · build 5/5 green
------------ MILESTONE: Batch 1 (fixable-now) COMPLETE ------------ [01:54 GMT]
  done: tokens.js 39 labels · ArticleLayout quarantined (9/9) · Navbar 7 mono swaps · build 5/5
  next: Batch 2 rulings (kol-segment-title target · 28/32px chrome add-or-accept) — needs user

[02:10 GMT · 2026-07-10] · batch4/token-seed · packages/ui/theme.css:6
  what -> base-tokens import @kol/theme -> @kolkrabbi/kol-theme (published DS = single source of truth)
  finding -> the "big win" seed was largely ALREADY realized: local @kol/theme base is BYTE-IDENTICAL to the DS (diff clean); mono already = JetBrains; opaque/typography/mono-classes already imported from @kolkrabbi/kol-theme. The only remaining "fork" is web's BRAND layer (yellow accent #f5d245 + @font-face + palette) — DELIBERATELY web-specific; DS is brand-neutral, so a wholesale repoint would STRIP the brand. Did the correct narrow swap, not the clobbering one.
  verify -> build 5/5 green · zero visual change (identical bytes)
------------ MILESTONE: Phase 1 (mode + tokens) COMPLETE ------------ [02:10 GMT]
  changed: mode-fix (2 files) + base repoint (1) · build 5/5 · brand layer intact

[02:14 GMT · 2026-07-10] · checkpoint · effort-state
  done -> Phase 1 (mode-fix + token base repoint, brand intact) · Home conformance · Batch 1 (tokens.js 39 labels, ArticleLayout quarantined, Navbar 7 mono swaps) · workflow pass (24 fixes, 8 quarantined) · toggle icon + cursor 0.9 + ThemeToggle->lobby
  open -> rulings: kol-segment-title target class · 28/32px chrome (add-or-accept). DS-side: serif display class + 28/32px steps. close-out: /log-work (AGENT-CONTEXT + rename) · /files-add.
  state -> build 5/5 green · repo now /Users/biskup/dev/projects/kol-website

[08:39 GMT · 2026-07-15] · home+shell/ds-swap · HomeSignup · WorkshopFeatures · Navbar · Footer
  what -> elder @kol/ui imports -> published DS: HomeSignup Button+Input -> @kolkrabbi/kol-component; WorkshopFeatures ButtonGroup -> kol-component (API shift: buttons[] array -> composed <Button> children, strings verbatim); Navbar+Footer Icon -> @kolkrabbi/kol-icons, KolWordmark -> <Asset name="kol-wordmark"> from @kolkrabbi/kol-brand/svg (currentColor; sized via [&>svg]:h-6 / h-full per DS ShellLayout pattern)
  why  -> home + shell swap to DS (user-approved arc); also FIXES wordmark under auto-dark: old wordmarkBrand filter keyed on .dark, which auto-dark (media-block, no attr) never sets -> black-on-dark; currentColor follows fg tokens
  gap  -> useTheme stays on @kol/ui x3 (Navbar, HomeHero, HomeFoundry) — kol-framework 0.3.4 exports no useTheme -> upstream gap, lobby-brief candidate
  verify -> build web ✓ · user render-check pending: home buttons/signup/wordmark both modes
  note -> earlier this session: @kolkrabbi bumps applied (component 0.8.0 / framework 0.3.4 / theme 0.7.3 / workshop 0.1.5), full build 5/5 ✓. OPEN from bump: kol-theme 0.7.3 moved type-specimen rules to kol-components-foundry.css — web's index.css doesn't import it (1-line fix, gated on "then we can talk about foundry")

[08:57 GMT · 2026-07-15] · home+shell/btn-radius-rootcause · apps/web/src/index.css:16-24 · +Navbar residual
  bug  -> DS buttons rendered square (user screenshot vs DS showcase): .kol-btn radius = var(--kol-radius-sm) but the PRIMITIVE tokens (radius/transition/shadow/z/opacity block) live ONLY in the aggregate kol-theme.css BODY — no sub-file defines them, and web cherry-picked sub-files -> undefined var -> radius 0, transitions dropped. Latent since the à-la-carte imports; surfaced when DS buttons landed on home.
  fix  -> replaced the 8 à-la-carte @kolkrabbi/kol-theme sub-imports with the ONE aggregate import (sub-imports internally layer(components)-wrapped, same as before); kol-framework.css kept separate (not part of aggregate). Brand survives: @kol/ui/theme.css unlayered beats layered DS tokens.
  also -> CLOSES the bump's foundry gap (aggregate imports kol-components-foundry.css) — specimen rules back. Fixed missed 2nd Navbar <Wordmark> (indent variance beat replace_all; runtime crash user-reported).
  verify -> build 5/5 ✓ · dist css proof: kol-radius-sm:4px ✓ · brand #f5d245 ✓ · kol-type-sample ✓ · user render-check pending
  note -> cascade delta accepted: kol-opaque now layered (was unlayered), + new entrants kol-color/kol-opacity/kol-utilities/organisms via aggregate — unlayered brand/app css still wins; watch for drift on render-check. LAG reported by user — not diagnosed, suspect stale vite optimizer after mid-session pnpm install; restart dev first, profile if it persists.

[2026-07-30] · PLAYBOOK CLOSED — user verdict
  the two Batch-2 rulings parked here (kol-segment-title target class · 28/32px chrome
  add-or-accept) are CLOSED, unruled and not to be raised again. nothing open on this
  playbook. provenance only.
