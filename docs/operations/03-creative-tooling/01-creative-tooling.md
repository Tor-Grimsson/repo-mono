---
File: 8.6.0
Title: Creative Tooling
Date: 2026-03-10
Status: Active
Content-Type: reference
Category: operations
tags: [operations, remotion, playwright, screen-recording, glif, figma, mcp, video, image-generation]
---

## Overview

Pipelines for generating visual assets — video, screen recordings, AI images, and Figma captures. All exploratory; none are production dependencies. Output lands in `apps/video/out/` (video/recordings) and `apps/video/output/` (generated images).

---

## 1. Remotion (Programmatic Video)

**What it does:** Renders React components frame-by-frame to MP4/WebM. Each frame is an independent React render — no runtime animation.

**Location:** `apps/video/`
**Dev command:** `yarn dev:video` (opens Remotion Studio at localhost:3000)
**Render:** `yarn --cwd apps/video render` or `npx remotion render src/index.ts <CompositionId> out/<filename>.mp4`

### When to use
- Motion graphics, logo intros, abstract animations
- Anything that doesn't need the full `@kol/ui` component library

### When NOT to use
- Component showcases — `@kol/ui` barrel imports break in Webpack due to `import.meta.glob` in Icon/Illustration atoms
- For real component recordings, use Playwright screen recording (section 2)

### Key concepts
- **Compositions** in `src/compositions/` — one file per video scene
- **Wrappers** in `src/wrappers/` — adapters for components with internal animation (Framer Motion, GSAP)
- Register all compositions in `src/Root.tsx`
- All animation driven by `useCurrentFrame()` + `interpolate()` — no CSS transitions, no useState

### Existing compositions
| Composition | File | Description |
|-------------|------|-------------|
| Main | `Main.tsx` | Test — fade-in text with design tokens |
| WordmarkIntro | `WordmarkIntro.tsx` | 3s wordmark intro (spring scale + fade) |
| FontPreviewShowcase | `FontPreviewShowcase.tsx` | Attempted component showcase (functional but abandoned — visual-only replicas, not real components) |

### Detailed docs
- `docs/documentation/remotion/REMOTION-USER-GUIDE.md` — User guide
- `docs/documentation/remotion/remotion-SKILL.md` — Agent skill reference
- `docs/documentation/remotion/add-remotion-to-monorepo.md` — Original setup walkthrough

### Session log
- `2026-03-03.md` — Scaffold, font symlink, Webpack css-loader override, test compositions

---

## 2. Playwright Screen Recording

**What it does:** Records the real running dev server as MP4 video. Playwright launches Chromium, navigates to a page, performs scripted interactions, and ffmpeg converts the output.

**Scripts:** `apps/video/scripts/record-*.mjs`

### Pipeline
1. Playwright launches Chromium with `deviceScaleFactor: 2` and `recordVideo` at 2x resolution
2. Navigates to localhost dev server, scrolls target component into viewport
3. Performs scripted interactions (slider drags, dropdown clicks, toggle clicks)
4. Stops recording, ffmpeg converts `.webm` → H.264 MP4 (CRF 18)
5. Outputs both 2x retina and 1x versions

### Why this over Remotion
- Real components with real design system, fonts, dark mode
- No dependency resolution issues
- Authentic interactions (eased cubic mouse movement)
- ~120 lines per script

### Existing scripts
| Script | Target | Viewport |
|--------|--------|----------|
| `record-font-preview.mjs` | Font preview section | 1080x1350 (4:5 portrait) |
| `record-chess-analysis.mjs` | Chess analysis page | 1440x900 |

### Skill
Claude Code skill at `.claude/skills/screen-recording/SKILL.md` — covers script template, viewport presets (Instagram portrait/square/story/desktop), ffmpeg reference, gotchas.

### Session logs
- `2026-03-03-2100.md` — Pipeline discovery, font preview recording, skill creation
- `2026-03-10-0130-figma-captures-and-chess-recording.md` — Chess analysis recording

---

## 3. GLIF Image Generation

**What it does:** AI image generation using KOL art print CDN assets as style references. Generates new art remixing the visual DNA of existing prints. For a concrete run log, see [GLIF Print Matrix](02-glif-print-matrix.md).

**Output:** `apps/video/output/glif-*.png`

### Setup
MCP server configured in `~/.claude.json`:
```json
"glif": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@glifxyz/glif-mcp-server@latest"],
  "env": { "GLIF_API_TOKEN": "..." }
}
```

**MCP bug:** `glif_info` and `run_glif` tools fail with schema errors. Use curl to `https://simple-api.glif.app` directly.

### Recommended models

| Model | ID | Cost | Use case |
|-------|------|------|----------|
| Nano Banana Pro (style refs) | `cmi7zv3zf0000kz04qjv58j3t` | ~16.6 credits | New art from multiple style reference images |
| Nano Banana Pro Edit (img2img) | `cmi7nb3vd0000l804jfykbdrd` | ~16.5 credits | Restyle existing image while preserving composition |

Cheap glifs (Z-Image Turbo, bad xerox flux, Flux Pro remix) use a "describe then generate" pipeline — an LLM describes the image as text, then generates from that. No visual fidelity to source. Avoid for style transfer.

### Input format (Nano Banana Pro Style Refs)
1. Text prompt
2. Style references — comma-separated CDN URLs in a single field
3. Aspect ratio — `"2:3"`, `"3:2"`, `"1:1"`, `"16:9"`, `"9:16"`
4. Resolution — `"1K"` (default) or `"2K"`

### Skill
Claude Code skill at `.claude/skills/glif-image-generation/SKILL.md` — covers all model IDs, CDN URL patterns for all 24 prints, input field mapping.

### Session log
- `2026-03-03-2300.md` — MCP setup, model trials, successful generations, skill creation

---

## 4. Figma MCP Captures

**What it does:** Captures live pages (localhost or external URLs) into a Figma file via the Figma MCP server + Playwright browser.

### Pipeline
1. Playwright navigates to target URL (dev server or external)
2. Resizes viewport to desired dimensions (typically 1440x720)
3. Injects Figma capture script via `browser_run_code`
4. Fire-and-forget pattern (don't `await` — it hangs), wait 5s, poll for completion
5. Capture lands in specified Figma file/node

### Gotchas
- `captureForDesign()` hangs when awaited in Playwright's `browser_run_code` — must use fire-and-forget
- Playwright MCP server disconnects frequently, requiring `/mcp` reconnect
- Tools must be re-loaded via ToolSearch after each reconnect

### Session log
- `2026-03-10-0130-figma-captures-and-chess-recording.md` — Fire-and-forget fix, 6 page captures (Chess, Dashboard, Kol Distress)

---

## Related Documentation

- [Dev Servers](../../documentation/01-foundation/09-dev-servers.md) — All dev server ports, commands, bundlers
- [External Integrations](../02-infrastructure/02-integrations.md) — Umami, Neon, Backblaze
- [GLIF Print Matrix](02-glif-print-matrix.md) — the print-generation run log

---

**Last Updated:** 2026-03-10
