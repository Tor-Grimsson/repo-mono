import { useEffect, useState } from 'react'
import BrandHero from '../components/framework/BrandHero'
import PageSection from '../components/framework/PageSection'
import LogoCard from '../components/styleguide/LogoCard'
import Swatch from '../components/styleguide/Swatch'
import { resolveCssVar } from '../components/sections/ColorRamp'
import { TYPOGRAPHY_SECTIONS } from '../data/typography'
import { BRAND_RAMPS } from '../data/color'
import AssetCard from '../components/styleguide/AssetCard'
import {
  BusinessCardFront, BusinessCardBack, Envelope, Letterhead, LetterheadB, EmailSignature,
  Hangtag, SwingTag, CareLabel, NeckLabel, SizeLabel,
  EditionCard, DustBag, GarmentBag, Packaging,
  HangtagB, SwingTagB, EditionCardB, NeckLabelB, SizeLabelB, CareLabelB,
  DustBagB, DressBagB, GiftBoxB,
} from '../components/styleguide/StationeryMocks'
import { Avatar } from '../components/styleguide/SocialMocks'
import { Graphic, GRAPHICS } from '@kolkrabbi/kol-component'
import SlideDeck from '../components/loaders/decks/SlideDeck'
import { Table } from '@kolkrabbi/kol-component'
import usePageTitle from '../components/hooks/usePageTitle'
import { BRAND } from '../brand/config'

/** GraphicCard — square preview tile with category/name caption. */
function GraphicCard({ category, name, polarity = 'dark' }) {
  const bg = polarity === 'dark' ? 'bg-surface-inverse' : 'bg-surface-primary'
  return (
    <figure>
      <div className={`aspect-square flex items-center justify-center rounded-[4px] overflow-hidden ${bg}`}>
        <Graphic category={category} name={name} />
      </div>
      <figcaption className="kol-helper-12 uppercase tracking-wider text-meta mt-2">
        {category} / {name}
      </figcaption>
    </figure>
  )
}

/** LiveSwatch — same visual as Swatch, but reads its hex from the CSS token at
 *  runtime. Single source of truth: kol-color.css. */
function LiveSwatch({ token, name, anchor }) {
  const [hex, setHex] = useState('#')
  useEffect(() => { setHex(resolveCssVar(token)) }, [token])
  return <Swatch hex={hex} name={name ?? token.replace(/^--/, '')} anchor={anchor} />
}

const HUE_RAMPS  = BRAND_RAMPS.filter(r => r.id.startsWith('brand-'))
const CREAM_RAMP = BRAND_RAMPS.find(r => r.id === 'cream')
const GREY_RAMP  = BRAND_RAMPS.find(r => r.id === 'grey')

/** TypeShowcase — single-row visual sample for the typography chapter.
 *  Adapts its rendering to the section it's inside (sans / prose / mono /
 *  descriptors / family-tokens). All data comes from typography.js. */
function TypeShowcase({ sectionId, row }) {
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

export default function Styleguide() {
  usePageTitle('Styleguide')

  return (
    <>
      <BrandHero
        label="brand guidelines"
        title={BRAND.name}
        lede="Client-facing identity guidelines — chapter-structured for handoff. Mirrors the shape of the deliverable PDF."
      />

      <PageSection
        id="about"
        label="01 — about"
        title="About Another Creation"
        body="An Icelandic womenswear label by Ýr Þrastardóttir — handmade clothing built on conscious production, made for the independent woman."
      >
        <div className="kol-prose mt-12">
          <p>Founded in Reykjavík in 2013, Another Creation works against the cycle of overproduction and material waste that defines mainstream fashion. Each garment is made by hand, in small numbers, with sustainability written into every step — from material sourcing to finishing.</p>

          <p>Ýr Þrastardóttir, the brand's creator, draws on a long Icelandic lineage of strong, independent women, translating that heritage into modern garments designed for long ownership. She holds a BA in fashion design from the Icelandic Academy of the Arts (2010) and represented Iceland at Designer's Nest during Copenhagen Fashion Week in 2011. Another Creation has shown four times at Reykjavík Fashion Festival, was selected from over 200 applicants for StartupReykjavík in 2013, and earned a special award that year at the Creative Business Cup for combining creative power with commercial sensibility.</p>

          <p>Alongside the label, Ýr custom-designs for film, theatre, concerts, and Iceland's dance company, and produces made-to-measure dresses and coats through Another Creation.</p>

          <h3>Made by hand</h3>
          <p>Each garment is constructed by hand in small numbers, with sustainability written into every step from material sourcing through finishing. Production scales by intention, not volume — the answer to overproduction is to make less, deliberately.</p>

          <h3>Icelandic lineage</h3>
          <p>Drawing on a long cultural heritage of strong, independent women, the work translates that heritage into modern garments — quiet, considered, and unmistakably rooted. Reykjavík is the studio; Iceland is the underlying voice.</p>

          <h3>Long ownership</h3>
          <p>Pieces are designed for years, not seasons. The brand resists the trend cycle and the disposable rhythm of the industry around it, in favour of garments that earn their place in a wardrobe over time.</p>
        </div>
      </PageSection>

      <PageSection
        id="voice"
        label="02 — voice"
        title="Voice"
        body="How the brand sounds — quiet, deliberate, anti-trend."
      >
        <div className="kol-prose mt-12">
          <p>Another Creation speaks quietly and deliberately. The voice is anti-trend, anti-noise — it favours specifics over claims, materials over marketing, the considered phrase over the loud one. It addresses the buyer who reads the label, not the one who chases the season.</p>
        </div>
      </PageSection>

      <PageSection
        id="look"
        label="03 — look"
        title="Look"
        body="How the brand appears — editorial, restrained, photo-driven."
      >
        <div className="kol-prose mt-12">
          <p>Visually, the brand sits in restraint. Photography leans editorial — landscape, material, figure — with natural light over studio gloss. Compositions are direct, not styled. Type is set quietly, with deliberate spacing. Color holds to a small, confident palette anchored on burgundy and cream. The brand never ornaments where it can let the garment speak.</p>
        </div>
      </PageSection>

      <PageSection
        id="logos-concept"
        label="04 — logos · concept"
        title="The mark"
        body="Two distinct marks — a wordmark and a signature — used alone or in lockup."
      >
        <div className="kol-prose mt-12">
          <p>The current mark system replaces the previous brand mark with a pair: the wordmark, set in Right Grotesk Compact Medium (the earlier Baskerville-set wordmark is retired), and the signature — a personal trace from Ýr Þrastardóttir herself. Used alone, each carries the brand; together as a lockup, they form the primary application.</p>
        </div>
        <div className="kol-grid mt-12">
          <LogoCard variant="wordmark" clearspace={false} frame={false} />
          <LogoCard variant="logomark" clearspace={false} frame={false} />
        </div>
      </PageSection>

      <PageSection
        id="logos-types"
        label="05 — logos · types"
        title="Marks and lockups"
        body="Logomark, wordmark, and two primary lockups."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <LogoCard variant="logomark"    caption="Logomark" />
          <LogoCard variant="wordmark"    caption="Wordmark" />
          <LogoCard variant="lockup-hori" caption="Horizontal lockup" />
          <LogoCard variant="lockup-vert" caption="Vertical lockup" />
        </div>
      </PageSection>

      <PageSection
        id="color"
        label="06 — color"
        title="Palette"
        body="Greyscale carries the structure; five brand hue ramps + cream carry identity. All swatches read live from kol-color.css."
      >
        <div className="kol-prose mt-12">
          <h3>Concept</h3>
          <p>The system splits color into two roles. Greyscale handles the structural backbone — surfaces, ink, dividers, the canvas. The brand palette names the identity through five hue families (yellow, red, blue, orange, teal), with cream as a complementary neutral surface.</p>

          <h3>Greyscale</h3>
          <p>Carries the canvas and structural ink. Legacy 10-stop ramp; kept until the opacity-hex (solid neutral) primitive is reintroduced.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {GREY_RAMP.stops.map((s) => <LiveSwatch key={s} token={`--${GREY_RAMP.id}-${s}`} />)}
        </div>

        {HUE_RAMPS.map((ramp) => (
          <div key={ramp.id}>
            <div className="kol-prose mt-12">
              <h3>{ramp.label} ramp</h3>
              <p>{ramp.note}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              {ramp.stops.map((s) => (
                <LiveSwatch
                  key={s}
                  token={`--${ramp.id}-${s}`}
                  name={`${ramp.id}-${s}`}
                  anchor={s === ramp.anchor}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="kol-prose mt-12">
          <h3>{CREAM_RAMP.label} ramp</h3>
          <p>{CREAM_RAMP.note} Use for warm-light editorial moments and tinting.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {CREAM_RAMP.stops.map((s) => <LiveSwatch key={s} token={`--${CREAM_RAMP.id}-${s}`} />)}
        </div>

        <div className="kol-prose mt-12">
          <h3>Usage</h3>
          <p>Greyscale carries the canvas and structural ink. The five brand ramps name the identity — yellow primary, red secondary, with blue, orange, and teal as supporting hues. Cream sits as a neutral surface for warm-leaning compositions. Apply brand color with restraint, never decoratively.</p>
          <p>Try compositions in the <a href="/generators#combo-lab">Combo lab</a> — interactive scratchpad for layout × palette × logo combinations.</p>
        </div>
      </PageSection>

      <PageSection
        id="typography"
        label="07 — typography"
        title="Type"
        body="Right Grotesk for sans (display, heading, body, prose). JetBrains Mono for utility chrome (mono body, helpers, code). Two-cut sans (Narrow / Compact) + base; weight + leading split on mono creates label/value hierarchy without size jumps. Sourced from src/data/typography.js — same data drives /reference."
      >
        {TYPOGRAPHY_SECTIONS
          .filter(s => s.id !== 'cuts')
          .map(section => (
            <div key={section.id} className="mt-12">
              <div className="kol-prose max-w-[var(--kol-content-measure)]">
                <h3>{section.title}</h3>
                <p>{section.intro}</p>
                {section.reasoning && (
                  <p className="text-meta italic">{section.reasoning}</p>
                )}
              </div>
              <div className="mt-8 flex flex-col gap-6">
                {section.tables.flatMap(t => t.rows).map((row, i) => (
                  <TypeShowcase
                    key={`${section.id}-${i}`}
                    sectionId={section.id}
                    row={row}
                  />
                ))}
              </div>
            </div>
          ))}
      </PageSection>

      <PageSection
        id="assets-stationery"
        label="08 — assets · stationery"
        title="Stationery"
        body="Standard correspondence — business card, envelope, letterhead, email signature. Quiet typography, generous space, monochrome restraint."
      >
        <div className="kol-grid mt-8">
          <div className="col-span-2"><AssetCard><BusinessCardFront /></AssetCard></div>
          <div className="col-span-2"><AssetCard><Envelope /></AssetCard></div>
          <div className="col-span-2 flex flex-col gap-3">
            <AssetCard><BusinessCardBack /></AssetCard>
            <AssetCard><EmailSignature /></AssetCard>
          </div>
          <div className="col-span-2"><AssetCard><Letterhead /></AssetCard></div>
        </div>

        <div className="kol-grid mt-12">
          <div className="col-span-2">
            <AssetCard caption="Letterhead · A4 [B]"><LetterheadB /></AssetCard>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="assets-labels-tags"
        label="09 — assets · labels & tags"
        title="Labels & tags"
        body="Sewn into the garment, tied to it, or bundled with it on arrival."
      >
        <div className="kol-grid mt-8">
          <div className="col-span-1"><AssetCard><Hangtag side="front" /></AssetCard></div>
          <div className="col-span-1"><AssetCard><Hangtag side="back" /></AssetCard></div>
          <div className="col-span-1"><AssetCard><SwingTag /></AssetCard></div>
          <div className="col-span-1"><AssetCard><EditionCard /></AssetCard></div>
        </div>

        <div className="kol-grid mt-6">
          <div className="col-span-1"><AssetCard><NeckLabel /></AssetCard></div>
          <div className="col-span-1"><AssetCard><SizeLabel /></AssetCard></div>
          <div className="col-span-1"><AssetCard><CareLabel /></AssetCard></div>
        </div>

        {/* Type B variants — ported from Asset Register.html */}
        <div className="kol-grid mt-12 items-start">
          <AssetCard caption="Hangtag · front [B]"><HangtagB side="front" /></AssetCard>
          <AssetCard caption="Hangtag · back [B]"><HangtagB side="back" /></AssetCard>
          <AssetCard caption="Swing tag [B]"><SwingTagB /></AssetCard>
          <AssetCard caption="Edition card [B]"><EditionCardB /></AssetCard>
        </div>
        <div className="kol-grid mt-6 items-start">
          <AssetCard caption="Neck · cream [B]"><NeckLabelB variant="cream" /></AssetCard>
          <AssetCard caption="Neck · burgundy [B]"><NeckLabelB variant="dark" /></AssetCard>
          <AssetCard caption="Size · S [B]"><SizeLabelB size="S" /></AssetCard>
          <AssetCard caption="Size · M [B]"><SizeLabelB size="M" /></AssetCard>
        </div>
        <div className="kol-grid mt-6 items-start">
          <AssetCard caption="Size · L [B]"><SizeLabelB size="L" /></AssetCard>
          <AssetCard caption="Care · A minimal [B]"><CareLabelB tier="A" /></AssetCard>
          <AssetCard caption="Care · B standard [B]"><CareLabelB tier="B" /></AssetCard>
          <AssetCard caption="Care · C long [B]"><CareLabelB tier="C" /></AssetCard>
        </div>
      </PageSection>

      <PageSection
        id="assets-garment-bags"
        label="10 — assets · garment bags"
        title="Garment bags"
        body="How the garment travels — dust bag and garment bag."
      >
        <div className="kol-grid kol-grid--tight-y mt-8">
          <div className="col-span-1 self-end"><AssetCard><GarmentBag /></AssetCard></div>
          <div className="col-span-2 col-start-3 self-end"><AssetCard><DustBag /></AssetCard></div>
        </div>

        {/* Type B variants — ported from Asset Register.html */}
        <div className="kol-grid mt-12 items-start">
          <div className="col-span-1">
            <AssetCard caption="Dress bag [B]"><DressBagB /></AssetCard>
          </div>
          <div className="col-span-2 col-start-3">
            <AssetCard caption="Dust bag [B]"><DustBagB /></AssetCard>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="assets-packaging"
        label="11 — assets · packaging"
        title="Packaging"
        body="Outer packaging — the box that carries the garment to its first owner."
      >
        <div className="kol-grid mt-8">
          <div className="col-span-2"><AssetCard><Packaging /></AssetCard></div>
        </div>

        {/* Type B variant — ported from Asset Register.html */}
        <div className="kol-grid mt-12 items-start">
          <div className="col-span-2">
            <AssetCard caption="Gift box · lid (top-down) [B]"><GiftBoxB /></AssetCard>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="social-sizes"
        label="12 — social · sizes"
        title="Post sizes"
        body="One template at each of the three Instagram aspect ratios — square feed (1:1), portrait feed (4:5), and story / reel (9:16). Editorial photography, restrained typography, a deliberate cadence."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-start">
          <AssetCard caption="Post · 1:1 square"><Graphic category="social" name="social-04" /></AssetCard>
          <AssetCard caption="Post · 4:5 portrait"><Graphic category="social" name="social-05" /></AssetCard>
          <AssetCard caption="Story · 9:16"><Graphic category="social" name="social-06" /></AssetCard>
        </div>
      </PageSection>

      <PageSection
        id="social-profile"
        label="13 — social · profile"
        title="Profile"
        body="Avatar treatment for profile pictures across platforms — round-cropped on burgundy, signature centered."
      >
        <div className="kol-grid mt-8 items-start">
          <AssetCard><Avatar bg="#FCFBFB" polarity="dark" /></AssetCard>
          <AssetCard><Avatar bg="#F2E5CB" polarity="dark" /></AssetCard>
          <AssetCard><Avatar bg="#750E20" polarity="light" /></AssetCard>
          <AssetCard><Avatar bg="#131316" polarity="light" /></AssetCard>
        </div>
      </PageSection>

      <PageSection
        id="graphics-slide-deck"
        label="15 — graphics · slide deck"
        title="Slide deck"
        body="Typographic deck — Right Grotesk family across the full set of cuts. KOL-aligned chrome, deduped from the V1–V4 source. Embla carousel embedded inline; click prev/next to browse. The fullscreen route is at /slide-deck."
      >
        <div className="flex flex-col gap-12 mt-12">
          <figure className="flex flex-col gap-3">
            <SlideDeck inline />
            <figcaption className="kol-helper-12 uppercase tracking-widest text-meta">Slide deck — 14 slides</figcaption>
          </figure>
        </div>
      </PageSection>

      <PageSection
        id="graphics-patterns"
        label="16 — graphics · patterns"
        title="Patterns"
        body="Tileable patterns from packages/component/src/graphics/svg/patterns/, rendered via the Graphic loader inside a labeled card."
      >
        <div className="kol-grid mt-8">
          {(GRAPHICS.patterns ?? []).map((name) => (
            <GraphicCard key={name} category="patterns" name={name} />
          ))}
        </div>
      </PageSection>
    </>
  )
}
