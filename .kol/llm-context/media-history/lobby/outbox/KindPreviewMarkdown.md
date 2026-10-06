# KindPreviewMarkdown — markdown as prose in the preview

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/KindPreviewMarkdown.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.101.0`

## Why it went there
No DS package renders markdown; `.kol-prose` is CSS with nothing feeding it. The renderer belongs in `KindPreview`.

## What stays here
Bump; delete the `renderPreview` stopgap in `FileList.jsx`; switch `kindOf` / `KIND_LABEL` imports to the package once its kinds match.

## ✅ RETURNED — 2026-08-27 · kol-component 0.101.0

(1) KindPreview kind markdown fetches the file (200 KB cap) and renders it as HTML inside .kol-prose through the new markdownToHtml utility (exported; escape-first, no dependency — headings, paragraphs, emphasis, code, links, images, lists, blockquotes, fenced code, rules, pipe tables; script tags come out escaped). The workshop's parser emits tokens for its own viewer, which is not .kol-prose, so the DS renders HTML for the prose CSS. (2) json / yaml → CodeBlock with their language. (3) mediaKinds: md → markdown, json → json, yaml|yml → yaml; labels markdown · JSON · YAML; KINDS in your order. Rendered: the KindPreview demo's README shows h1 / strong / list / code in the prose voice; the column preview's README.md renders .kol-prose with Kind 'markdown'.

**Remainder here:** bump kol-component 0.101.0; delete the renderPreview stopgap and lib/media.js's kind map (kindOf / KIND_LABEL / KINDS from the package)

## ✅ RETURNED + DONE — 2026-08-27

DS 0.101.0: markdown renders as HTML in `.kol-prose` (`markdownToHtml`, no dependency), json/yaml → `CodeBlock`, `mediaKinds` carries the three kinds. Here: bumped; `renderPreview` stopgap deleted. `lib/media.js` keeps its (now identical) kind map because `mediaKinds.js` has no deep-import path and the barrel drags `react-router-dom`.
