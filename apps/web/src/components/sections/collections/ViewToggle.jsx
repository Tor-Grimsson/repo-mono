export default function ViewToggle({ viewMode, onViewChange }) {
  return (
    <div className="inline-flex bg-surface-secondary rounded-lg p-1 border border-auto">
      <button
        onClick={() => onViewChange('grid')}
        className={`
          px-4 py-2 rounded-md transition-all duration-200 kol-text-small
          ${
            viewMode === 'grid'
              ? 'bg-auto text-auto shadow-sm'
              : 'text-auto/60 hover:text-auto'
          }
        `}
        aria-label="Grid view"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`
          px-4 py-2 rounded-md transition-all duration-200 kol-text-small
          ${
            viewMode === 'list'
              ? 'bg-auto text-auto shadow-sm'
              : 'text-auto/60 hover:text-auto'
          }
        `}
        aria-label="List view"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="5" width="12" height="2" rx="1" fill="currentColor" />
          <rect x="4" y="9" width="12" height="2" rx="1" fill="currentColor" />
          <rect x="4" y="13" width="12" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>
    </div>
  )
}
