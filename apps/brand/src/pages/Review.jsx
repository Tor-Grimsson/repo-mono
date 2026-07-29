import { Component } from 'react'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { Divider, Tag } from '@kol/component'
import SubPageHero from '../components/framework/SubPageHero'
import SigTicker from '../components/styleguide/SigTicker'
import FeatureSplit from '../components/styleguide/FeatureSplit'
import ProsePreview from '../components/styleguide/ProsePreview'
import SpectrumGrid from '../components/styleguide/SpectrumGrid'
import LogoCarousel from '../components/styleguide/LogoCarousel'
import TypeSpecCard from '../components/styleguide/TypeSpecCard'
import TypeSample from '../components/styleguide/TypeSample'
import FullscreenGallery from '../components/styleguide/FullscreenGallery'

/* Review — the audit's visual line-up (2026-07-29). Route-only, no nav entry.
 * Every ORPHAN component (zero consumers) rendered live for a keep/kill call,
 * plus the casing-law demo and the in-situ index of live non-DS components.
 * Temporary surface: dies with the audit. */

class Boundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <p className="kol-mono-12 text-emphasis border border-fg-24 rounded-[4px] p-4">
          render failed: {String(this.state.error)}
        </p>
      )
    }
    return this.props.children
  }
}

/* One review card per component: divider · name + badges · fact grid
 * (file / consumers / DS sibling / styles / nested) · framed live render. */
const Entry = ({ name, file, sibling, styles, nested, badges = [], children }) => (
  <article className="mt-14">
    <Divider />
    <div className="flex items-baseline gap-3 flex-wrap mt-10">
      <h3 className="kol-prose-title m-0">{name}</h3>
      {badges.map((b) => <Tag key={b}>{b}</Tag>)}
    </div>
    <dl className="kol-mono-12 mt-4 mb-0 grid grid-cols-[110px_minmax(0,1fr)] gap-x-6 gap-y-1 max-w-[760px]">
      <dt className="text-meta m-0">file</dt>
      <dd className="m-0"><code className="text-body">{file}</code></dd>
      <dt className="text-meta m-0">consumers</dt>
      <dd className="m-0 text-body">0 — orphan</dd>
      <dt className="text-meta m-0">DS sibling</dt>
      <dd className="m-0 text-body">{sibling}</dd>
      <dt className="text-meta m-0">styles</dt>
      <dd className="m-0 text-body">{styles}</dd>
      <dt className="text-meta m-0">nested</dt>
      <dd className="m-0 text-body">{nested}</dd>
    </dl>
    <div className="mt-8 border border-fg-08 rounded-[4px] p-8 overflow-hidden">
      <Boundary>{children}</Boundary>
    </div>
  </article>
)

const CDN_MOOD = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/cms/stack/mood'

export default function Review() {
  usePageTitle('Review')

  return (
    <>
      <PageSection
        id="orphans"
        label="audit review"
        title="Orphan line-up"
        body="Every component with zero consumers, rendered live in a framed stage. Verdict per item: keep (find it a seat), lobby it to the DS, or kill."
      >
        <Entry
          name="SubPageHero"
          badges={['framework', 'DS sibling']}
          file="components/framework/SubPageHero.jsx"
          sibling="YES — kol-framework/SubPageHero"
          styles=".kol-page-hero + .kol-back-link (local kol-framework.css) · kol-helper/prose type roles · uppercase chrome (casing-law hit)"
          nested="none (react-router Link only)"
        >
          <SubPageHero backTo="/" backLabel="Home" label="review" title="SubPageHero" lede="A back-link hero for sub pages." />
        </Entry>

        <Entry
          name="SigTicker"
          badges={['client-era', '.site-*']}
          file="components/styleguide/SigTicker.jsx"
          sibling="none"
          styles=".site-sig / .site-sig-sep / .site-sig-hex (styles/kol-site.css — the dying client layer)"
          nested="none"
        >
          <SigTicker line={['Kolkrabbi', 'Vinnustofa', null, 'Reykjavík']} tokens={['est. 2019', '#FFCF33', '#222D3D']} />
        </Entry>

        <Entry
          name="FeatureSplit"
          badges={['client-era', '.site-*']}
          file="components/styleguide/FeatureSplit.jsx"
          sibling="none"
          styles=".site-feature-* family (styles/kol-site.css) · own missing-key bug in meta list (visible in console)"
          nested="none"
        >
          <FeatureSplit kicker="Kicker" title="FeatureSplit" body="Text + media editorial pull, client-era chrome." meta={['meta a', 'meta b']} />
        </Entry>

        <Entry
          name="ProsePreview"
          badges={['styleguide']}
          file="components/styleguide/ProsePreview.jsx"
          sibling="none"
          styles=".kol-prose + .kol-prose-indented/-pullout extensions (local kol-framework.css) · kol-sans type roles"
          nested="none"
        >
          <ProsePreview h1="Prose preview" paragraph="A paragraph of body prose for the preview." code="const x = 1" pullout="A pullout line." />
        </Entry>

        <Entry
          name="SpectrumGrid"
          badges={['styleguide']}
          file="components/styleguide/SpectrumGrid.jsx"
          sibling="none (kol-styleguide has ColorAnatomy — overlapping territory)"
          styles=".kol-spectrum-grid* (local kol-framework.css) · reads --{ramp}-{stop} vars live from the theme"
          nested="none"
        >
          <SpectrumGrid ramps={['kol-color-yellow', 'kol-color-blue', 'kol-color-red', 'kol-color-teal']} />
        </Entry>

        <Entry
          name="LogoCarousel"
          badges={['styleguide', 'elder inside']}
          file="components/styleguide/LogoCarousel.jsx"
          sibling="none (kol-styleguide has LogoCard — the child, not the carousel)"
          styles="carousel chrome from elder Carousel · logo color via currentColor"
          nested="elder @kol/component Carousel · local LogoCard (DS sibling EXISTS in kol-styleguide) · KolLogo"
        >
          <LogoCarousel logos={['logomark', 'wordmark', 'lockup-hori', 'lockup-vert']} />
        </Entry>

        <Entry
          name="TypeSpecCard"
          badges={['styleguide']}
          file="components/styleguide/TypeSpecCard.jsx"
          sibling="none (kol-styleguide TypeBlock is the DS-side type presenter)"
          styles=".kol-type-spec* grid (local kol-framework.css) · kol-helper labels · uppercase chrome (casing-law hit)"
          nested="none"
        >
          <TypeSpecCard label="Right Grotesk" meta={['wide', '400–900']}><span className="kol-sans-display-01">Aa Bb Cc</span></TypeSpecCard>
        </Entry>

        <Entry
          name="TypeSample"
          badges={['styleguide']}
          file="components/styleguide/TypeSample.jsx"
          sibling="none (kol-styleguide TypeBlock territory)"
          styles=".kol-type-sample (local kol-framework.css) · inline font-family/weight/size props"
          nested="none"
        >
          <TypeSample label="Right Grotesk 400 · 32">The quick brown fox jumps over the lazy dog</TypeSample>
        </Entry>

        <Entry
          name="FullscreenGallery"
          badges={['styleguide', 'elder inside', 'chain of 3']}
          file="components/styleguide/FullscreenGallery.jsx"
          sibling="none"
          styles=".kol-fs-tile · .kol-asset-figure-frame / .kol-asset-grid-* (local kol-framework.css)"
          nested="local AssetFigure + AssetGrid (both orphan with it) · elder @kol/component FullscreenOverlay"
        >
          <FullscreenGallery layout="grid" cols={2} items={[
            { src: `${CDN_MOOD}/mood-05-400.jpg`, caption: 'mood-05 · click for fullscreen' },
            { src: `${CDN_MOOD}/mood-05-800.jpg`, caption: 'mood-05 · 800w' },
          ]} />
        </Entry>
      </PageSection>

      <PageSection
        id="casing"
        label="audit review"
        title="Casing law — what the 110 hits mean"
        body="The law: strings are authored in the case they render; components/CSS never force casing. Below, each row's SOURCE string vs what CSS makes of it. Your sidebar does this too: the config says 'Styleguide', the screen says STYLEGUIDE."
        divider
      >
        <div className="flex flex-col gap-3 mt-8 kol-mono-14">
          <div>source: <code>"Brand overview"</code> + <code>className="uppercase"</code> → renders: <span className="uppercase">Brand overview</span></div>
          <div>source: <code>"variants"</code> + <code>tracking-widest uppercase</code> → renders: <span className="uppercase tracking-widest">variants</span></div>
          <div>source: <code>"Styleguide"</code> (sidebar hop, .kol-sidenav uppercase chrome) → renders: <span className="uppercase">Styleguide</span></div>
        </div>
        <p className="kol-prose-lede mt-8">Full 110-hit list by file:line → <code>.kol/llm-context/plans/brand-audit-inventory.md</code> appendix. The ruling needed from you: mock/artwork casing (StationeryMocks, SocialMocks) exempt as art, chrome casing (nav groups, section labels, table cells) re-authored?</p>
      </PageSection>

      <PageSection
        id="live-non-ds"
        label="audit review"
        title="Live non-DS components — where to eyeball each"
        body="These render on real pages today; view in place. Every one is brand-local code (not consumed from kol-ds-ui), listed with its DS-sibling status."
        divider
      >
        <div className="kol-mono-12 mt-8 flex flex-col gap-1">
          <div>/ — Landing (custom hero · stack system) · KolLogo (svgr over kol-brand svgs)</div>
          <div>/styleguide — PortalIndex · BrandHero¹ · MoodTile¹ · LogoCard¹ · ClearspaceDiagram¹ · LogoScaling¹ · TypeBlock¹ · TypeScaleSection · AssetCard · AssetCarousel · AssetTable¹ · SocialMocks · StationeryMocks · Swatch · Ramp · ColorRamp · SlideDeck/DeckShell</div>
          <div>/assets — AssetTable¹ (again)</div>
          <div>/library — Library page chrome (improvised bg-fg-08 wrapper)</div>
          <div>/gallery — Gallery (outlaw — inline styles, no DS)</div>
          <div>/reference · /components — denavigated, direct URL works</div>
          <div>framework everywhere — SideNav² · BrandLayout · Layout² · PageSection² · PortalFooter² · ScrollToTop²</div>
        </div>
        <p className="kol-prose-lede mt-8">¹ DS sibling exists in <code>@kolkrabbi/kol-styleguide</code> · ² DS sibling exists in <code>@kolkrabbi/kol-framework</code>. Full sibling map in the inventory doc.</p>
      </PageSection>
    </>
  )
}
