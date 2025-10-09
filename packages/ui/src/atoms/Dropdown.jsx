import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
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

  // Update dropdown position when opening
  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width
      })
    }
  }, [isOpen])

  const currentOption = options.find(opt => opt.value === value) || options[0]

  return (
    <div ref={dropdownRef} className={`relative z-[100] ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[180px] flex items-center justify-between rounded-full px-6 py-2 min-h-[44px] bgAbsoluteWhite border borderAbsoluteBlack transition-all duration-200"
      >
        <span className="text-control">
          {currentOption?.label}
        </span>
        <span
          className="ml-auto pl-2 transition-transform duration-300"
          style={{
            color: 'var(--color-text-primary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          ↓
        </span>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute rounded-2xl overflow-hidden transition-all duration-300 origin-top z-[9999] bg-absolute-white text-absolute-black"
          style={{
            top: 'calc(100% + 8px)',
            left: '0',
            width: '100%'
          }}
        >
          <div className="flex flex-col items-start py-2 max-h-[300px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className="dropdownOption text-control px-6 py-2"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
