# SettingsPanelChromeAndColumnPreview — drawer chrome/type + column preview seam

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SettingsPanelChromeAndColumnPreview.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.98.0`

## Why it went there
The drawer's border and type are the DS organism's; the column preview's viewer is a missing seam on the DS organism. `KindPreview` here already renders every kind on DS atoms — the DS either takes it as the seam's input or promotes it.

## What stays here
Bump on publish; pass `renderPreview={(o) => <KindPreview o={o} poster={posterFor(o.key, keySet)} />}` — or delete `KindPreview.jsx` if the DS promoted it.

## ✅ RETURNED — 2026-08-27 · kol-component 0.98.0

(1) SettingsPanel on the app register — title kol-helper-14 uppercase text-emphasis, subtitle / intro / hints / footer kol-mono-12 text-meta, row labels kol-mono-12 text-emphasis, no mono-10 left; SettingsChipRow renders the DS Tag (md · inverse when on · secondary when off) — the tag ticket; ShellDrawer's edge is oq-08. Measured on the drawer demo. (2) ColumnBrowser renderPreview(file) replaces the preview column's media frame (facts stay); without it images keep the organism's img (dimensions measured 1200 × 800) and everything else renders the new KindPreview molecule — your KindPreview promoted: HLS → HlsVideo, audio → AudioPlayer, text/code → CodeBlock by extension, the rest → AssetPlaceholder; markdown renders as code (ProsePreview is a specimen, not a renderer — it never took markdown). The DS media kinds (kindOf, extOf, isSystemFile, KINDS, KIND_LABEL — your lib/media kinds) ship from kol-component and are ColumnBrowser's defaults. Dimensions also come off any img a custom preview loads. Measured: notes.txt → a CodeBlock in the preview column; the KindPreview demo renders JSON as code and a TTF placeholder.

**Remainder here:** bump kol-component 0.98.0; drop src/KindPreview.jsx for the DS one (renderPreview={(o) => <KindPreview o={o} urlOf={(x) => publicUrl(x.key)} poster={posterFor(...) ? publicUrl(posterFor(...)) : undefined} />} or pass nothing and let the default run with urlOf); kindOf / KIND_LABEL can come from the package; the user rules on the register

## ✅ RETURNED + DONE — 2026-08-27

DS 0.98.0: `SettingsPanel` on the app register (helper-14 title, mono-12 rows, DS `Tag` chips, oq-08 drawer edge); `ColumnBrowser` `renderPreview` seam with the promoted `KindPreview` as its default (HLS · audio · code · placeholder; markdown renders as code — `ProsePreview` is a specimen, not a renderer). Here: bumped (+ theme 0.67.0); `src/KindPreview.jsx` retired for the DS molecule (lightbox passes `urlOf` + a poster URL); the column preview runs the DS default.
