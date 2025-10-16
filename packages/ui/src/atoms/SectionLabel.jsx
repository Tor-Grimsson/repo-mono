import Icon from './icons/Icon'

export default function SectionLabel({
  text,
  className = ''
}) {
  return (
    <div
      className={`flex items-center gap-1 md:gap-2 section-label-wrapper ${className}`}
      style={{ color: 'var(--kol-surface-on-primary)' }}
    >
      <p className="kol-label-compact">
        {text}
      </p>
      <span
        className="icon-swap-container section-label-icon"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '16px',
          height: '16px',
          overflow: 'hidden'
        }}
      >
        <Icon
          name="arrow-downright"
          size={16}
          className="icon-default section-label-icon-svg"
          style={{ position: 'absolute' }}
        />
        <Icon
          name="arrow-downright"
          size={16}
          className="icon-hover section-label-icon-svg"
          style={{ position: 'absolute' }}
        />
      </span>
    </div>
  )
}
