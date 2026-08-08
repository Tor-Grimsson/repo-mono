/* Shared bits for the Brand pages — extracted from the single `Brand.jsx`
 * when it split into one page per section (2026-08-01, category → page).
 * `LiveSwatch` and `TypeShowcase` are used by more than one of those pages, so
 * they live here rather than being transcribed twice. */
import { useEffect, useState } from 'react'
import Swatch from '../styleguide/Swatch'
import { resolveCssVar } from './ColorRamp'
import { TYPOGRAPHY_SECTIONS } from '../../data/typography'
import { BRAND_RAMPS } from '../../data/color'

/* The asset register (stationery · labels & tags · garment bags · packaging),
 * the social specimens and the two graphics sections moved to `Assets.jsx`
 * 2026-08-01: this page documents the identity, Assets holds what you download
 * or reproduce. Their imports — AssetCard, StationeryMocks, SocialMocks,
 * Graphic/GRAPHICS, SlideDeck, Table — went with them. */

/** LiveSwatch — same visual as Swatch, but reads its hex from the CSS token at
 *  runtime. Single source of truth: kol-color.css. */
export function LiveSwatch({ token, name, anchor }) {
  const [hex, setHex] = useState('#')
  useEffect(() => { setHex(resolveCssVar(token)) }, [token])
  return <Swatch hex={hex} name={name ?? token.replace(/^--/, '')} anchor={anchor} />
}

export const HUE_RAMPS  = BRAND_RAMPS.filter(r => r.id.startsWith('brand-'))
export const CREAM_RAMP = BRAND_RAMPS.find(r => r.id === 'cream')
export const GREY_RAMP  = BRAND_RAMPS.find(r => r.id === 'grey')

/** TypeShowcase — single-row visual sample for the typography chapter.
 *  Adapts its rendering to the section it's inside (sans / prose / mono /
 *  descriptors / family-tokens). All data comes from typography.js. */
export function TypeShowcase({ sectionId, row }) {
  // Family tokens: render the family literal large, label the token name
  if (sectionId === 'sans-families') {
    return (
      <div className="flex flex-col gap-2 py-3 border-b border-fg-08">
        <span className="kol-helper-12 text-meta uppercase tracking-wider">{row.token}</span>
        <span className="text-emphasis" style={{ fontFamily: `var(${row.token})`, fontSize: 28 }}>
          {row.cut}
        </span>
        <span className="kol-helper-10 text-subtle">{row.role}</span>
      </div>
    )
  }

  // Sans atomic + prose: apply the class directly to a sample word
  if (sectionId === 'sans-atomic') {
    const cls = row.cls.replace(/^\./, '')
    return (
      <div className="flex flex-col gap-2 py-3 border-b border-fg-08">
        <span className="kol-helper-12 text-meta uppercase tracking-wider">
          {row.cls} · {row.family} · {row.weight}
        </span>
        <div className={cls}>The quick brown fox jumps over the lazy dog</div>
      </div>
    )
  }

  // Prose: wrap in .kol-prose so descendant selectors apply
  if (sectionId === 'prose') {
    const ProseRow = () => {
      const tag = (row.class.match(/h[1-6]|p|code|pre/) || [])[0]
      const word = row.role
      if (tag === 'h1') return <h1>{word}</h1>
      if (tag === 'h2') return <h2>{word}</h2>
      if (tag === 'h3') return <h3>{word}</h3>
      if (tag === 'h4') return <h4>{word}</h4>
      if (tag === 'h5') return <h5>{word}</h5>
      if (tag === 'h6') return <h6>{word}</h6>
      if (tag === 'code') return <p>Inline <code>code</code> in body copy.</p>
      if (tag === 'pre') return <pre>{`code block\nlines preserved`}</pre>
      // .kol-prose-* sub-classes — apply the class directly
      const cls = row.class.replace(/^\./, '').replace(/^kol-prose /, '')
      return <span className={cls}>{word}</span>
    }
    return (
      <div className="flex flex-col gap-2 py-3 border-b border-fg-08">
        <span className="kol-helper-12 text-meta uppercase tracking-wider">
          {row.class} · {row.family} · {row.weight}
        </span>
        <div className="kol-prose"><ProseRow /></div>
      </div>
    )
  }

  // Mono / helper: apply the class
  if (sectionId === 'mono') {
    const cls = row.cls.replace(/^\./, '')
    return (
      <div className="flex flex-col gap-2 py-3 border-b border-fg-08">
        <span className="kol-helper-10 text-meta uppercase tracking-wider">
          {row.cls} · weight {row.weight} · LH {typeof row.lh === 'number' ? `${row.lh}px` : row.lh} · LS {row.ls}
        </span>
        <span className={cls}>The quick brown fox jumps over the lazy dog</span>
      </div>
    )
  }

  // Opacity section — descriptor rows (5 stops). Family-prefix table
  // dropped 2026-04-30 along with bg/border/ring descriptor classes.
  if (sectionId === 'opacity') {
    if (row.name && row.pct !== undefined) {
      return (
        <div className="flex flex-col gap-2 py-3 border-b border-fg-08">
          <span className="kol-helper-12 text-meta uppercase tracking-wider">
            .text-{row.name} · {row.pct}% · {row.role}
          </span>
          <span className={`text-${row.name}`} style={{ fontSize: 18 }}>
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
      )
    }
    return null
  }

  // Fallback (e.g. cuts section, which is filtered out anyway)
  return null
}

