/**
 * ViewToggle Component
 *
 * Toggle button group for switching between different view modes
 *
 * @param {string} viewMode - Current active view mode
 * @param {function} onViewChange - Callback when view mode changes
 * @param {Array} options - Array of view options [{value: 'card', label: 'Card view'}, ...]
 * @param {string} className - Additional classes (optional)
 */
const ViewToggle = ({
  viewMode,
  onViewChange,
  options = [
    { value: 'card', label: 'Card view' },
    { value: 'list', label: 'List view' }
  ],
  className = ''
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onViewChange(option.value)}
          className={`px-4 py-2 kol-mono-xs rounded transition-colors ${
            viewMode === option.value
              ? 'bg-surface-secondary text-auto'
              : 'text-fg-64 hover:text-auto'
          }`}
          aria-label={option.label}
          aria-pressed={viewMode === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ViewToggle
