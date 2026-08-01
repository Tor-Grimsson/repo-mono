import { IconFrame } from '@kolkrabbi/kol-component'

/**
 * SectionTitle — THE section-header opener (user law, 2026-07-28): every
 * section starts with the same group — inverse icon square + text button.
 * Icon: DS `IconFrame`, secondary md (ink fill, surface glyph, flips with
 * theme). Text: md text-button shell carrying kol-helper-16. No opacity, no
 * hover — this is a heading, not a control.
 *
 * The icon square was an anonymous `kol-btn` span until 2026-07-30, when it was
 * promoted to `IconFrame` (kol-component 0.15.0): same computed box and colours,
 * but "no states" is now a property of `.kol-icon-frame*` rather than an
 * accident of the tag.
 */
const SectionTitle = ({ icon, children, className = '' }) => (
  <span className={`flex items-center gap-1 ${className}`.trim()}>
    {icon && <IconFrame name={icon} variant="secondary" size="md" />}
    <span className="kol-btn kol-btn-md kol-helper-16">{children}</span>
  </span>
)

export default SectionTitle
