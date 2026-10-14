import { Divider } from '@kolkrabbi/kol-component'

/**
 * PairingCard — Two typefaces side by side. a font-pairing recommendation: two faces side by side around a
 * vertical seam, each with its name IN ITS OWN FACE, a tag and a description.
 * kol-website's `ui/PairingCard.jsx`, ruled on screen and shipped verbatim
 * (FoundrySpecimenSections, 2026-08-27): the tag wears the typeface row's
 * title voice (`kol-mono-14 uppercase text-emphasis`), the description the
 * row's body voice (`kol-mono-12 text-meta`), the divider is 96px — it reads
 * as the card's seam. Frame + hover chrome: inline Tailwind (was `.kol-pairing-card` in kol-theme
 * until the 2026-10-09 separation — 8% frame; on hover a 1% wash and a 24% frame).
 *
 * @param {string} leftTitle · rightTitle          the face names, rendered in their family
 * @param {string} leftTag · rightTag              the role ("Body Text", "Headings")
 * @param {string} leftDescription · rightDescription
 * @param {string} leftFontFamily · rightFontFamily  CSS font-family for the name
 * @param {string} className
 */
/* ROLE + SPECIMEN (user 2026-10-14: "why would font pairing not show the fonts in question?"):
 * each side now renders a specimen IN ITS ROLE — a heading line in the heading face, a body
 * passage in the body face — under the name. The sides share the card (`flex-1`) instead of the
 * 128 / 240 / 320 ladder, and stack below md. */
const SPECIMEN_CLASS = {
  heading: 'text-auto leading-none text-[32px] md:text-[40px] lg:text-[56px]',
  body: 'text-auto leading-snug text-[16px] md:text-[18px]',
}
const Side = ({ title, tag, description, fontFamily, role = 'body', specimen }) => (
  <div className="flex flex-col justify-start items-start flex-1 min-w-0">
    <div className="pb-2 md:pb-3 flex items-center gap-2">
      {/* the name in its own face — 20 / 28 / 36, leading 100% (was .foundry-title) */}
      <div className="text-auto leading-none text-[20px] md:text-[28px] lg:text-[36px]" style={fontFamily ? { fontFamily, fontStyle: 'normal', fontWeight: 'normal' } : undefined}>
        {title}
      </div>
    </div>
    <div className="self-stretch pb-3 md:pb-4 flex items-center gap-2">
      <div className="flex-1 kol-mono-14 uppercase text-emphasis">{tag}</div>
    </div>
    {specimen && (
      <div className={`self-stretch pb-3 md:pb-4 ${SPECIMEN_CLASS[role] ?? SPECIMEN_CLASS.body}`} style={fontFamily ? { fontFamily, fontStyle: 'normal', fontWeight: 'normal' } : undefined}>
        {specimen}
      </div>
    )}
    <div className="self-stretch flex items-center gap-2">
      <div className="flex-1 kol-mono-12 text-meta">{description}</div>
    </div>
  </div>
)

export default function PairingCard({
  leftTitle, leftTag, leftDescription, leftFontFamily, leftRole, leftSpecimen,
  rightTitle, rightTag, rightDescription, rightFontFamily, rightRole, rightSpecimen,
  className = '',
}) {
  return (
    <div className={`border border-[color-mix(in_srgb,var(--kol-surface-on-primary)_8%,transparent)] transition-[background-color,border-color] duration-300 ease-[ease] hover:bg-[color-mix(in_srgb,var(--kol-surface-on-primary)_1%,transparent)] hover:border-[color-mix(in_srgb,var(--kol-surface-on-primary)_24%,transparent)] p-4 md:p-5 lg:p-6 rounded flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 md:gap-0 overflow-hidden ${className}`.trim()}>
      <Side title={leftTitle} tag={leftTag} description={leftDescription} fontFamily={leftFontFamily} role={leftRole} specimen={leftSpecimen} />
      {/* the seam: a vertical rule between the sides from md, a horizontal one between the stacked sides below it */}
      <Divider variant="vertical" height={96} className="hidden md:flex mx-6 lg:mx-8" />
      <Divider className="md:hidden" />
      <Side title={rightTitle} tag={rightTag} description={rightDescription} fontFamily={rightFontFamily} role={rightRole} specimen={rightSpecimen} />
    </div>
  )
}
