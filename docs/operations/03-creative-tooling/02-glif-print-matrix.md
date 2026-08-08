---
title: GLIF Image Generation Matrix
type: reference
status: active
updated: 2026-08-08
description: GLIF run matrix for the art-print pool — model, aspect, resolution, credit budget
tags:
  - project/kol-monorepo
  - domain/creative-tooling
  - provider/glif
---

# GLIF Image Generation Matrix

**Model**: Nano Banana Pro — Style References (`cmi7zv3zf0000kz04qjv58j3t`)
**Aspect ratio**: `2:3` portrait for all
**Resolution**: `2K` for all (~1696×2528) — costs same as 1K (~16.6 credits/run)
**Total budget**: 20 runs × ~16.6 = **~332 credits**

---

## Print Pool

8 prints. All using 1700px artwork URLs — no `-print` or `-certificate` variants.

| Code | Slug | CDN URL |
|------|------|---------|
| **B** | borg | `https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-borg/artwork/borg-artwork-1700.jpg` |
| **K** | skinnalon | `https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-skinnalon/artwork/skinnalon-artwork-1700.jpg` |
| **U** | uburoi | `https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-uburoi/artwork/uburoi-artwork-1700.jpg` |
| **V** | fvv | `https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-fvv/artwork/fvv-artwork-1700.jpg` |
| **H** | himnuhorn | `https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-himnuhorn/artwork/himnuhorn-artwork-1700.jpg` |
| **M** | midnight | `https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-midnight/artwork/midnight-artwork-1700.jpg` |
| **S** | skovia | `https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-skovia/artwork/skovia-artwork-1700.jpg` |
| **F** | frank | `https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/print-frank/artwork/frank-artwork-1700.jpg` |

---

## Prompts

5 prompts drawn from the Kolkrabbi vocabulary: geometric abstraction, interlocking systems, print process aesthetics. No paper grain language — prompts steer composition and process feel, style refs carry the surface.

| Code | Prompt |
|------|--------|
| **P1** | `Geometric visual abstraction, modular interlocking forms, charcoal, psychotropic patterns, offset printing aesthetic` |
| **P2** | `Risograph composition, bitmap gradients, Icelandic midsommar, winter/summer soltice, bold geometry, overlapping color separations` |
| **P3** | `stipplism, systematic visual patterns,halftone-prints, monolithic graphic forms, dark repeating silkscreen` |
| **P4** | `Offset lithograph, overlapping geometric planes, bold negative space, value shading, graphic print process, visual density` |
| **P5** | `Psychotropic pattern system, repeating modular geometry, silkscreen color field, interlocking structural forms` |

---

## 3-Print Combinations (Runs 01–12)

Four 3-print combos × 3 prompts each.

### Combo α — B + U + M  (borg · uburoi · midnight)
*Three dark or heavy prints — expecting deep tonal range, strong structural composition*

| # | Prints | Prompt | Output file |
|---|--------|--------|-------------|
| 01 | B · U · M | P1 | `glif-01-BUM-P1.png` |
| 02 | B · U · M | P3 | `glif-02-BUM-P3.png` |
| 03 | B · U · M | P4 | `glif-03-BUM-P4.png` |

### Combo β — S + V + F  (skovia · fvv · frank)
*Potentially warmer/earthier palette — curious how offset/riso prompts push the color*

| # | Prints | Prompt | Output file |
|---|--------|--------|-------------|
| 04 | S · V · F | P2 | `glif-04-SVF-P2.png` |
| 05 | S · V · F | P5 | `glif-05-SVF-P5.png` |
| 06 | S · V · F | P1 | `glif-06-SVF-P1.png` |

### Combo γ — K + H + B  (skinnalon · himnuhorn · borg)
*Atmospheric prints — testing whether Icelandic mood comes through with bitmap/stipple prompts*

| # | Prints | Prompt | Output file |
|---|--------|--------|-------------|
| 07 | K · H · B | P3 | `glif-07-KHB-P3.png` |
| 08 | K · H · B | P2 | `glif-08-KHB-P2.png` |
| 09 | K · H · B | P4 | `glif-09-KHB-P4.png` |

### Combo δ — U + V + M  (uburoi · fvv · midnight)
*Dark + geometric — pushing psychotropic/pattern prompts against a dense visual base*

| # | Prints | Prompt | Output file |
|---|--------|--------|-------------|
| 10 | U · V · M | P5 | `glif-10-UVM-P5.png` |
| 11 | U · V · M | P1 | `glif-11-UVM-P1.png` |
| 12 | U · V · M | P3 | `glif-12-UVM-P3.png` |

---

## 4-Print Combinations (Runs 13–20)

Four 4-print combos × 2 prompts each. More blended DNA — less individual character, more emergent synthesis.

### Combo ε — B + U + S + M  (borg · uburoi · skovia · midnight)
*Full dark end of the pool — deep palette, heavy forms*

| # | Prints | Prompt | Output file |
|---|--------|--------|-------------|
| 13 | B · U · S · M | P1 | `glif-13-BUSM-P1.png` |
| 14 | B · U · S · M | P4 | `glif-14-BUSM-P4.png` |

### Combo ζ — K + H + F + V  (skinnalon · himnuhorn · frank · fvv)
*The other end of the pool — testing for a different energy*

| # | Prints | Prompt | Output file |
|---|--------|--------|-------------|
| 15 | K · H · F · V | P2 | `glif-15-KHFV-P2.png` |
| 16 | K · H · F · V | P5 | `glif-16-KHFV-P5.png` |

### Combo η — B + S + V + H  (borg · skovia · fvv · himnuhorn)
*Cross-pool mix — structural + earthy + atmospheric*

| # | Prints | Prompt | Output file |
|---|--------|--------|-------------|
| 17 | B · S · V · H | P5 | `glif-17-BSVH-P5.png` |
| 18 | B · S · V · H | P3 | `glif-18-BSVH-P3.png` |

### Combo θ — M + U + F + K  (midnight · uburoi · frank · skinnalon)
*Dark geometry meets the unknowns — widest aesthetic spread in a single run*

| # | Prints | Prompt | Output file |
|---|--------|--------|-------------|
| 19 | M · U · F · K | P2 | `glif-19-MUFK-P2.png` |
| 20 | M · U · F · K | P4 | `glif-20-MUFK-P4.png` |

---

## Notes

- **2K vs 1K cost**: Both tested — 1K = 16.55 credits, 2K = ~16.58 credits. Negligible, always use 2K.
- **Output folder**: `apps/video/output/glif-matrix/`
- **Texture**: No paper grain/overlay language in prompts. Print process textures (halftone, riso, offset, stipple) are intentional — they describe the printing method, not surface coating.
- **Suggested run order**: One from each combo first (01, 04, 07, 10, 13, 15, 17, 19) to sanity-check before committing all 20.
- **Studio context**: Prompts draw from Kolkrabbi vocabulary — interlocking systems, modular geometry, print process aesthetics (offset, riso, silkscreen, bitmap, stipple). Consistent with the studio identity at kolkrabbi.io/studio.
