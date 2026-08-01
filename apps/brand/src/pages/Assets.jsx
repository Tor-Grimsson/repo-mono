import PageSection from '../components/framework/PageSection'
import { Table, Graphic, GRAPHICS } from '@kolkrabbi/kol-component'
import AssetTable, { markRows, graphicRows, markWidthFor, graphicWidthFor } from '../components/styleguide/AssetTable'
import AssetCard from '../components/styleguide/AssetCard'
import {
  BusinessCardFront, BusinessCardBack, Envelope, Letterhead, LetterheadB, EmailSignature,
  Hangtag, SwingTag, CareLabel, NeckLabel, SizeLabel,
  EditionCard, DustBag, GarmentBag, Packaging,
  HangtagB, SwingTagB, EditionCardB, NeckLabelB, SizeLabelB, CareLabelB,
  DustBagB, DressBagB, GiftBoxB,
} from '../components/styleguide/StationeryMocks'
import { Avatar } from '../components/styleguide/SocialMocks'
import usePageTitle from '../components/hooks/usePageTitle'

/** GraphicCard — square preview tile with category/name caption.
 *  Moved here with the graphics sections 2026-08-01. */
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

const TokenName = ({ children }) => (
  <code className="kol-helper-12 text-emphasis">{children}</code>
)

const brandedAssetCols = [
  { accessor: 'item',   header: 'Item',   render: (r) => <TokenName>{r.item}</TokenName> },
  { accessor: 'aspect', header: 'Aspect' },
  { accessor: 'surface', header: 'Surface' },
  { accessor: 'status', header: 'Status', render: (r) => <span className="kol-helper-12 text-meta uppercase tracking-widest">{r.status}</span> },
  { accessor: 'note',   header: 'Note' },
]

const brandedAssetRows = [
  { item: 'Business card · front',  aspect: '85.6 / 53.85 (ID-1)', surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.BusinessCardFront' },
  { item: 'Business card · back',   aspect: '85.6 / 53.85',         surface: 'ink',       status: 'mocked',  note: 'StationeryMocks.BusinessCardBack' },
  { item: 'Envelope · DL',           aspect: '220 / 110',           surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.Envelope' },
  { item: 'Letterhead · A4',         aspect: '210 / 297',           surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.Letterhead' },
  { item: 'Email signature',         aspect: 'free',                surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.EmailSignature' },
  { item: 'Neck label · woven',      aspect: '5 / 2',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.NeckLabel' },
  { item: 'Size label · seam',       aspect: '3 / 1',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.SizeLabel' },
  { item: 'Hangtag · front',         aspect: '3 / 5',               surface: 'champagne', status: 'mocked',  note: 'StationeryMocks.Hangtag side="front"' },
  { item: 'Hangtag · back',          aspect: '3 / 5',               surface: 'burgundy',  status: 'mocked',  note: 'StationeryMocks.Hangtag side="back"' },
  { item: 'Swing tag',               aspect: '3 / 5',               surface: 'sand',      status: 'mocked',  note: 'StationeryMocks.SwingTag' },
  { item: 'Edition card',            aspect: '3 / 4',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.EditionCard' },
  { item: 'Care label',              aspect: '1 / 2',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.CareLabel' },
  { item: 'Dust bag',                aspect: '5 / 6',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.DustBag' },
  { item: 'Garment bag',             aspect: '3 / 8',               surface: 'paper',     status: 'mocked',  note: 'StationeryMocks.GarmentBag' },
  { item: 'Packaging · box face',    aspect: '1 / 1',               surface: 'maroon',    status: 'mocked',  note: 'StationeryMocks.Packaging' },
]

/* Assets — the downloadable brand-asset registry, rescued from the Reference
 * page's tail (2026-07-29 brand triage) into its own nav page. */
export default function Assets() {
  usePageTitle('Assets')

  return (
    <>
      <PageSection
        id="logos"
        label="01 — logos"
        title="Logos"
        body="Every mark in src/brand/logos/svg/. Click a row to open the overlay; toggle the color dot to swap ink vs surface; download recolored on the fly."
      >
        <AssetTable caption="Logos" rows={markRows()} previewWidthFor={markWidthFor} />
      </PageSection>

      <PageSection
        id="graphics"
        label="02 — graphics"
        title="Graphics"
        body="Abstract forms in packages/component/src/graphics/svg/abstract/. Same overlay + recolor + download behavior as the logo table."
      >
        <AssetTable caption="Graphics" rows={graphicRows('abstract')} previewWidthFor={graphicWidthFor} />
      </PageSection>

      <PageSection
        id="patterns"
        label="03 — patterns"
        title="Patterns"
        body="Tileable patterns in packages/component/src/graphics/svg/patterns/."
      >
        <AssetTable caption="Patterns" rows={graphicRows('patterns')} previewWidthFor={graphicWidthFor} />
      </PageSection>

      <PageSection
        id="branded-assets"
        label="04 — branded"
        title="Branded assets"
        body="Stationery, garment-attached labels, soft goods and packaging. Mocks live in src/components/styleguide/StationeryMocks.jsx and render in /styleguide chapter 6."
      >
        <Table caption="Branded assets" columns={brandedAssetCols} rows={brandedAssetRows} className="mt-8" />
      </PageSection>

      {/* ── Moved from the Styleguide page 2026-08-01 (now Brand.jsx). Brand
          documents the identity; everything you download or reproduce lives
          here. Section labels are carried VERBATIM — their chapter numbers
          still read 08-16 from their old home and need a renumbering ruling.
          NOTE: `graphics-patterns` below is a second Patterns surface beside
          the `patterns` download table above — kept rather than silently
          dropped; which one survives is a call. ── */}

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

      {/* The `graphics-slide-deck` section lived here until 2026-08-01. The deck
          got its own page the same session, making this a second copy of it —
          quarantined to `_tmp/brand-deck-section-elder/`, not deleted. */}

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
