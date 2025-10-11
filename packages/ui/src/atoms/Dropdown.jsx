import React, { useState, useRef, useEffect } from 'react'

/**
 * Dropdown Component
 *
 * Custom dropdown with smooth animations
 *
 * @param {Object} props
 * @param {Array} props.options - Array of option objects [{label: string, value: any}]
 * @param {any} props.value - Current selected value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.className - Additional classes
 */
const Dropdown = ({
  options = [],
  value,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

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

  const handleSelect = (option) => {
    onChange?.(option.value)
    setIsOpen(false)
  }

  const currentOption = options.find(opt => opt.value === value) || options[0]

  return (
    <div ref={dropdownRef} className={`relative z-[100] ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="control-unified min-w-[180px] min-h-[44px] justify-between px-6 py-2 transition-colors duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <span className="text-control opacity-100">
          {currentOption?.label}
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
            {options.map((option) => {
              const isActive = option.value === currentOption?.value
              return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className="dropdownOption px-6 py-2"
                role="option"
                aria-selected={isActive}
                data-active={isActive}
              >
                <span className="dropdownOptionLabel">{option.label}</span>
              </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
