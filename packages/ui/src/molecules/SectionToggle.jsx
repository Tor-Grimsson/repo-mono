const SectionToggle = ({
  label,
  isExpanded = false,
  onToggle,
  className = '',
  indicator = true,
  indicatorClassName = ''
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center justify-between group ${className}`.trim()}
      aria-expanded={isExpanded}
    >
      <span className="kol-mono-text-label">{label}</span>
      {indicator ? (
        <span className={`kol-mono-text-label text-xs ${indicatorClassName}`.trim()}>
          {isExpanded ? '−' : '+'}
        </span>
      ) : null}
    </button>
  )
}

export default SectionToggle
