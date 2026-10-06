# KOL Apparatus Registry

> The canonical tool list this gallery curates. Source: `gh repo list Tor-Grimsson` + README
> fetch, 2026-07-08. Org: https://github.com/Tor-Grimsson. Update blurbs/status as tools evolve.
> ⚠️ = blurb still needed (repo README was boilerplate/empty).

## External standalone tools (curate as cards → live + repo link)

| Tool | Category | Live | Repo | Blurb |
|---|---|---|---|---|
| **kol-monitor** | app | monitor.kolkrabbi.io | kol-monitor | Browser modular **video synthesizer** on the eurorack model — pure-math parametric geometry, 50 modules across 5 categories patched via virtual cables, topological eval, Canvas2D @60fps (no WebGL/shaders). |
| **kol-mirror** | app / effect | mirror.kolkrabbi.io | kol-mirror | **Hall of Mirrors** — interactive image-distortion playground (React + PixiJS + GSAP). |
| **kol-ds-editor** | design editor | editor.kolkrabbi.io | kol-ds-editor | Embeddable React **design editor** — DOM/SVG vector + generative compositor (layers, palette/pattern/type generators, kinetic type, boolean geometry, image export). Consumes `@kolkrabbi/kol-*` as peers. |
| **kol-vcap** | browser plugin | kol-vcap.vercel.app | kol-vcap | **Console-driven skinless tab recorder** for Chromium — `vcap.start()` in DevTools + hotkey → mp4/webm, no browser chrome, no share-prompt. |
| **kol-distress** | SVG effect | kol-distress.vercel.app | kol-distress | **SVG distressor** — roughen/erode/texture SVG art. |
| **kol-radial** | generative / mathy | kol-radial.vercel.app | kol-radial | ⚠️ mathy radial generator — real one-liner needed. |
| **kol-modulator** | generative / mathy | kol-modulator.vercel.app | kol-modulator | ⚠️ mathy modulator — real one-liner needed. |
| **kol-radar** | ⚠️ unknown | kol-radar.vercel.app | kol-radar | ⚠️ category + blurb unknown (boilerplate README) — needs owner input. |

## In-repo systems (keep embedded live, richer showcase — NOT link-out)

| System | Where | Note |
|---|---|---|
| **Dashboards / metrics** | `apps/web` `/metrics` + dashboard components (`@kol/ui/dashboards`, `packages/ui/css/dashboard.css`) | live 5-endpoint metrics; residue that stays local |
| **Chess** | `apps/web` chess pages + `@kol/chess-data` + `packages/ui` ChessPiece | full chess system |

## Excluded (this turn, by owner)

- Tools: kol-editor, kol-draw, kol-lightroom, kol-noter.
- Not tools: kol-ds (the DS itself), kol-docs, kol-umami (analytics), all `kol-client-*`, repo-mono, .dotfiles, kol-vault.

## Open registry gaps

1. **kol-radar** — what is it? (category unknown)
2. **kol-radial** blurb — one honest line.
3. **kol-modulator** blurb — one honest line.
