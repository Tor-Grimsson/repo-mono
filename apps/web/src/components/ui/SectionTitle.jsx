import { Icon } from '@kolkrabbi/kol-icons'

/**
 * SectionTitle — THE section-header opener (user law, 2026-07-28): every
 * section starts with the same group — inverse icon square + text button.
 * Icon: kol-btn-secondary md icon square (ink fill, surface glyph, flips with
 * theme). Text: md text-button shell carrying kol-helper-16. No opacity, no
 * hover — this is a heading, not a control.
 */
const SectionTitle = ({ icon, children, className = '' }) => (
  <span className={`flex items-center gap-1 ${className}`.trim()}>
    {icon && (
      <span className="kol-btn kol-btn-secondary kol-btn-md kol-btn-icon">
        <Icon name={icon} size={20} />
      </span>
    )}
    <span className="kol-btn kol-btn-md kol-helper-16">{children}</span>
  </span>
)

export default SectionTitle
