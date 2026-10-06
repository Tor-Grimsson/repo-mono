# Memory index

> Global tier: `~/.dotfiles/claude/memory/MEMORY.md` — cross-repo facts; read it too.

- [Checkpoint question blocks execution](checkpoint-question-blocks-execution.md) — a question in the message = propose the plan and wait for explicit go before editing
- [Bump includes receipt remainders](bump-includes-receipt-remainders.md) — "update packages" = bump AND execute each receipt's adoption remainder in the same pass, no go-ask between
- [No Fable subagents — pin model explicitly](no-fable-subagents-pin-model-explicitly.md) — every Agent spawn passes model (haiku mechanical / sonnet judgment); inheritance from a Fable session smuggles Fable subs in
- [@kolkrabbi npm scope has 18 packages](kolkrabbi-npm-scope-18-packages.md) — enumerate the whole scope when asked what the DS ships; SourcesReferences lives in kol-content
- [Buttons never default to outline](buttons-never-default-to-outline.md) — variant unspecified → primary; outline needs a stated reason
- [npm publish = Claude, git = user](publish-split-npm-mine-git-his.md) — publish + consumer bump without asking; never git
- [Ping when background work lands](ping-when-background-work-lands.md) — PushNotification when a stage finishes or blocks on him; skip when he's active in-session
- [Decisions in plain speak](decisions-in-plain-speak.md) — anything he must choose gets full human sentences, never slug-lists
- [Corrections clarify, deliverables are SVG](corrections-clarify-deliverables-are-svg.md) — a correction never retracts the rest of the ask; asset deliverables = SVG masters in repo paths, not scratch exports
- [Build green is not verified](build-green-is-not-verified.md) — @kolkrabbi glob packages break dev-only; playwright-verify consumer surfaces after DS wiring, build alone is a half-proof
- [Doc roles exist — check before authoring](doc-roles-exist-check-before-authoring.md) — kol-type-roles.css ships .kol-doc-*/.kol-card-* (incl. the spec-table); never hand-roll doc-shaped UI in kol repos
- [Read DS source before workarounds](read-ds-source-before-workarounds.md) — read the WHOLE component render before styling around it; ThemeToggle ships variant="flush", the -ml hack was a defect
- [Tags are interactive-only](tags-are-interactive-only.md) — no click purpose → no Tag (doc chrome/Badge instead); when used: sm + primary defaults
- [humpty-tokens gate blocks legit token/doc writes](humpty-tokens-gate-shell-exception.md) — prove "no token carries this value" first, ask once, shell-write on explicit go; never launder values past the regex
- [kol-sources.css manifest is broken under pnpm](kol-sources-manifest-broken-under-pnpm.md) — explicit app-side @source lines per raw-JSX package; add the line in the same edit as a new dependency
- [Undeployed means unpushed](undeployed-means-unpushed.md) — Vercel builds from main, push = deploy; report one state, never split "not live" from "not committed"
- [Wait for go during review](wait-for-go-during-review.md) — review messages are observations, not instructions; collect and wait
- [Verify before reporting done](verify-before-reporting-done.md) — browser-confirm visually; the home preloader blanks headless screenshots
