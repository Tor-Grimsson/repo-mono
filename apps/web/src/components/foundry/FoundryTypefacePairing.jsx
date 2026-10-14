import SpecimenSectionHeader from './SpecimenSectionHeader.jsx'
import PairingCard from './PairingCard.jsx'
import { FOUNDRY_SAMPLE_TEXT } from './glyphData.js'

/* taxonomy-ok: organism — nests SpecimenSectionHeader + PairingCard (relative) */

const DEFAULT_PAIRINGS = [
  { leftTitle: 'Málrómur', leftTag: 'Body Text', leftRole: 'body', leftDescription: 'Variable weight for nuanced discourse and extended reading', leftFontFamily: 'TGMalromur', rightTitle: 'Gullhamrar', rightTag: 'Headings', rightRole: 'heading', rightDescription: 'Warm, graceful forms for elegant hierarchy', rightFontFamily: 'TGGullhamrar' },
  { leftTitle: 'Rót', leftTag: 'Precision', leftRole: 'body', leftDescription: 'Variable tuning system for technical documentation', leftFontFamily: 'TGRoot', rightTitle: 'Dylgjur', rightTag: 'Critique', rightRole: 'heading', rightDescription: 'Sharp angles for critical annotations and emphasis', rightFontFamily: 'TGDylgjur' },
  { leftTitle: 'Tröllatunga', leftTag: 'Mythological', leftRole: 'heading', leftDescription: 'Bold character for legendary narratives', leftFontFamily: 'TGTrollatunga', rightTitle: 'Málrómur', rightTag: 'Versatile', rightRole: 'body', rightDescription: 'Balanced forms for diverse applications', rightFontFamily: 'TGMalromur' },
]

/**
 * FoundryTypefacePairing — Typefaces that pair well. the Font Pairings section of a specimen page: the
 * specimen header over a list of PairingCards (kol-website's section, moved in
 * 2026-08-27 — FoundrySpecimenSections).
 *
 * @param {object[]} pairings   PairingCard props per row (default: the house pairings)
 * @param {string} label · icon   the header (default "Font Pairings" · overlap)
 */
/* The specimens: the foundry's own passage (glyphData), a heading-length cut and the first sentence —
 * no new copy. A pairing may carry its own `leftSpecimen` / `rightSpecimen`; these are the defaults. */
const SPECIMEN = {
  heading: FOUNDRY_SAMPLE_TEXT.split(',')[0],
  body: FOUNDRY_SAMPLE_TEXT.split('. ')[0] + '.',
}
const withSpecimens = (p) => ({
  ...p,
  leftSpecimen: p.leftSpecimen ?? SPECIMEN[p.leftRole ?? 'body'],
  rightSpecimen: p.rightSpecimen ?? SPECIMEN[p.rightRole ?? 'body'],
})

export default function FoundryTypefacePairing({ pairings = DEFAULT_PAIRINGS, label = 'Font Pairings', icon = 'overlap', className = '' }) {
  return (
    <section className={`w-full py-12 lg:py-16 ${className}`.trim()}>
      <div className="max-w-[var(--kol-container-max)] mx-auto flex flex-col gap-8">
        <SpecimenSectionHeader label={label} icon={icon} size="md" showDropdown={false} />
        <div className="w-full flex flex-col gap-4">
          {pairings.map((p, i) => <PairingCard key={i} {...withSpecimens(p)} />)}
        </div>
      </div>
    </section>
  )
}
