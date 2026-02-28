import Icon from './icons/Icon'

/**
 * SearchInput — compact search field for header tab bars and nav areas.
 * Uses shell-tab-search-wrapper / shell-tab-search CSS classes from ui/css/components.css.
 * Not for form use — see Input for form inputs.
 *
 * iconOnly — renders a plain icon button instead of the full input wrapper.
 *   value, onChange, placeholder are ignored in icon-only mode.
 */
const SearchInput = ({ value, onChange, placeholder = 'Search…', className = '', iconOnly = false, bare = false, onClick, ...rest }) => {
  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Search"
        className="flex h-9 w-9 items-center justify-center rounded-md text-fg-64 transition-colors hover:bg-fg-08 hover:text-fg"
      >
        <Icon name="search-16" size={18} />
      </button>
    )
  }

  if (bare) {
    return (
      <div
        className={className}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', width: '100%' }}
      >
        <span style={{ color: 'color-mix(in srgb, var(--kol-surface-on-primary) 48%, transparent)', display: 'flex', flexShrink: 0 }}>
          <Icon name="search-16" size={16} />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: 'var(--kol-font-family-mono)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'inherit',
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          {...rest}
        />
      </div>
    )
  }

  return (
    <div className={`shell-tab-search-wrapper ${className}`.trim()}>
      <Icon name="search-16" size={14} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="shell-tab-search"
        {...rest}
      />
    </div>
  )
}

export default SearchInput
