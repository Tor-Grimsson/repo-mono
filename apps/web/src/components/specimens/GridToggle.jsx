export default function GridToggle({ showGrid, onToggle }) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex items-center gap-0 bg-surface-inverse rounded-full p-1 border border-auto-inverse/20">
        {/* Grid View Button */}
        <button
          onClick={() => !showGrid && onToggle()}
          className={`p-3 rounded-full transition-all duration-200 ${
            showGrid
              ? 'bg-surface text-auto'
              : 'text-auto-inverse hover:bg-auto-inverse/10'
          }`}
          aria-label="Show grid"
          title="Grid view"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {/* List View Button */}
        <button
          onClick={() => showGrid && onToggle()}
          className={`p-3 rounded-full transition-all duration-200 ${
            !showGrid
              ? 'bg-surface text-auto'
              : 'text-auto-inverse hover:bg-auto-inverse/10'
          }`}
          aria-label="Hide grid"
          title="List view"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
