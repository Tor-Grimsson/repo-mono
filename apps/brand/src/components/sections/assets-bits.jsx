/* Shared bits for the Assets pages — extracted from the single `Assets.jsx`
 * when it split into one page per section (2026-08-01, category → page).
 * Everything here is used by more than one of those pages, or is a table column
 * spec too long to transcribe twice. */
import { Table, Graphic, GRAPHICS } from '@kolkrabbi/kol-component'
import AssetTable, { markRows, graphicRows, markWidthFor, graphicWidthFor } from '../styleguide/AssetTable'
import AssetCard from '../styleguide/AssetCard'
import {
  BusinessCardFront, BusinessCardBack, Envelope, Letterhead, LetterheadB, EmailSignature,
  Hangtag, SwingTag, CareLabel, NeckLabel, SizeLabel,
  EditionCard, DustBag, GarmentBag, Packaging,
  HangtagB, SwingTagB, EditionCardB, NeckLabelB, SizeLabelB, CareLabelB,
  DustBagB, DressBagB, GiftBoxB,
} from '../styleguide/StationeryMocks'
import { Avatar } from '../styleguide/SocialMocks'

/** GraphicCard — square preview tile with category/name caption.
 *  Moved here with the graphics sections 2026-08-01. */
export function GraphicCard({ category, name, polarity = 'dark' }) {
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

export const TokenName = ({ children }) => (
  <code className="kol-helper-12 text-emphasis">{children}</code>
)

export const brandedAssetCols = [
  { accessor: 'item',   header: 'Item',   render: (r) => <TokenName>{r.item}</TokenName> },
  { accessor: 'aspect', header: 'Aspect' },
  { accessor: 'surface', header: 'Surface' },
  { accessor: 'status', header: 'Status', render: (r) => <span className="kol-helper-12 text-meta uppercase tracking-widest">{r.status}</span> },
  { accessor: 'note',   header: 'Note' },
]

export const brandedAssetRows = [
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
