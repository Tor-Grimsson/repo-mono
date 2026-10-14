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
  /* the garment rows (neck / size / care labels, hangtags, swing tag, edition card, dust + garment
   * bags, the box face) left 2026-10-14 with the Labels / Bags / Packaging sections */
]

/* Assets — the downloadable brand-asset registry, rescued from the Reference
 * page's tail (2026-07-29 brand triage) into its own nav page. */
