import React, { useState, useRef, useEffect } from 'react'

/**
 * Tag Filter Dropdown
 * Multi-select dropdown where all items start selected
 * Click to deselect, with "Deselect All" option
 */
const TagFilterDropdown = ({
  options = [],
  selectedValues = new Set(),
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleToggle = (value) => {
    onChange?.(value)
  }

  const handleDeselectAll = () => {
    onChange?.(null) // Pass null to signal "deselect all"
  }

  const selectedCount = selectedValues.size
  const totalCount = options.length

  return (
    <div ref={dropdownRef} className={`relative z-[100] ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="control-unified min-w-[180px] min-h-[44px] justify-between px-6 py-2 text-control transition-colors duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <span className="opacity-100">
          {selectedCount === totalCount ? 'All Tags' : `${selectedCount} Selected`}
        </span>
        <svg
          className="ml-auto h-3 w-3 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m3 5 3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute z-[9999] mt-2 min-w-full overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: 'var(--component-surface)',
            color: 'var(--component-fg)',
            borderColor: 'var(--component-border)',
            boxShadow: 'var(--shadow-lg)'
          }}
          role="listbox"
        >
          <div className="flex max-h-[300px] flex-col items-start overflow-y-auto py-2">
            {/* Deselect All Option */}
            <button
              type="button"
              onClick={handleDeselectAll}
              className="px-6 py-2 w-full text-left border-b hover:bg-white/5 transition-colors text-control"
              style={{
                borderColor: 'var(--component-border)',
                opacity: 1
              }}
            >
              <span className="font-medium">Deselect All</span>
            </button>

            {/* Tag Options */}
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggle(option.value)}
                  className={`px-6 py-2 w-full text-left hover:bg-white/5 transition-all text-control ${
                    isSelected ? 'dropdown-option-selected' : 'dropdown-option-deselected'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span>{option.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default TagFilterDropdown
