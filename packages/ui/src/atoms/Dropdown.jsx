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
    <div
      ref={dropdownRef}
      className={`relative inline-block ${className}`}
      style={{ zIndex: isOpen ? 100 : 50 }}
    >
      {/* Unified border container */}
      <div
        className="control-dropdown min-w-[180px]"
        style={{
          borderRadius: isOpen
            ? 'var(--control-dropdown-radius-top, 20px) var(--control-dropdown-radius-top, 20px) 0 0'
            : undefined
        }}
      >
        {/* Dropdown Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-6 transition-colors duration-200"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0'
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          data-state={isOpen ? 'open' : 'closed'}
        >
          <span className="kol-mono-xs opacity-100">
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
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute w-full border border-t-0"
          style={{
            backgroundColor: 'var(--kol-surface-primary)',
            color: 'var(--kol-surface-on-primary)',
            borderColor: 'var(--kol-border-default)',
            top: '100%',
            left: 0,
            marginTop: '-1px',
            borderRadius: '0 0 var(--control-dropdown-radius-bottom, 20px) var(--control-dropdown-radius-bottom, 20px)'
          }}
          role="listbox"
        >
          {/* Divider line */}
          <div className="px-6">
            <div
              style={{
                height: '1px',
                backgroundColor: 'var(--kol-border-default)'
              }}
            />
          </div>
          <div className="flex max-h-[300px] flex-col items-start overflow-y-auto py-2">
            {options.map((option) => {
              const isActive = option.value === currentOption?.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="kol-mono-xs w-full text-left px-6 py-2 transition-opacity duration-150 relative"
                  style={{
                    backgroundColor: 'transparent',
                    opacity: isActive ? 1 : 0.4
                  }}
                  role="option"
                  aria-selected={isActive}
                  data-active={isActive}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.opacity = '0.4'
                    }
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--kol-surface-on-primary)'
                      }}
                    />
                  )}
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

export default Dropdown
