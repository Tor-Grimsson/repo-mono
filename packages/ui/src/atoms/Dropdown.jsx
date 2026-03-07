import { useEffect, useRef, useState } from 'react'

const SIZE_MAP = {
  sm: { height: 28, icon: 10 },
  md: { height: 32, icon: 12 },
  lg: { height: 36, icon: 14 }
}

const Dropdown = ({
  options = [],
  value,
  onChange,
  size,
  variant = 'default',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const [resolvedSize, setResolvedSize] = useState('md')

  useEffect(() => {
    setResolvedSize(size || 'md')
  }, [size])

  const metrics = SIZE_MAP[resolvedSize] || SIZE_MAP.md

  // Variant-specific styles
  const variantStyles = {
    default: {
      border: '1px solid color-mix(in srgb, var(--kol-surface-on-primary) 24%, transparent)',
      borderRadius: isOpen
        ? `${metrics.height / 2}px ${metrics.height / 2}px 0 0`
        : `${metrics.height / 2}px`,
      backgroundColor: 'transparent',
      height: `${metrics.height}px`
    },
    minimal: {
      border: 'none',
      borderRadius: '0',
      backgroundColor: 'transparent',
      padding: '0',
      height: '24px',
      display: 'flex',
      alignItems: 'center'
    }
  }

  const styles = variantStyles[variant] || variantStyles.default

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

  const currentOption = options.find((opt) => opt.value === value) || options[0]

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${className}`}
      style={{
        zIndex: isOpen ? 100 : 50
      }}
    >
      <div
        className="w-full"
          style={{
            border: styles.border,
            borderRadius: styles.borderRadius,
            backgroundColor: styles.backgroundColor,
            color: 'var(--kol-surface-on-primary)',
            transition: 'background-color 0.2s, color 0.2s',
            height: styles.height,
            ...(variant === 'minimal' && {
              display: styles.display,
              alignItems: styles.alignItems
            })
          }}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`kol-mono-text dropdown-${resolvedSize} w-full flex items-center justify-between gap-3 transition-colors duration-200`}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            height: '100%',
            lineHeight: '1'
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          data-state={isOpen ? 'open' : 'closed'}
        >
          <span className="opacity-100">{currentOption?.label}</span>
          <svg
            className="ml-auto transition-transform duration-300"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              width: `${metrics.icon}px`,
              height: `${metrics.icon}px`
            }}
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

      {isOpen && (
        <div
          className="absolute w-full"
          style={{
            backgroundColor: variant === 'minimal'
              ? 'var(--kol-surface-primary)'
              : 'var(--kol-surface-primary)',
            color: 'var(--kol-surface-on-primary)',
            border: styles.border,
            borderTop: variant === 'minimal' ? 'none' : '0',
            top: '100%',
            left: 0,
            marginTop: variant === 'minimal' ? '0' : '-1px',
            borderRadius: variant === 'minimal'
              ? '0'
              : `0 0 ${metrics.height / 2}px ${metrics.height / 2}px`
          }}
          role="listbox"
        >
          {variant !== 'minimal' && (
            <div className={`dropdown-${resolvedSize}`} style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div
                style={{
                  height: '1px',
                  backgroundColor: 'color-mix(in srgb, var(--kol-surface-on-primary) 24%, transparent)'
                }}
              />
            </div>
          )}

          <div className="flex max-h-[300px] flex-col items-start overflow-y-auto py-2">
            {options.map((option) => {
              const isActive = option.value === currentOption?.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`kol-mono-text dropdown-${resolvedSize} w-full text-left transition-opacity duration-150 relative`}
                  style={{
                    backgroundColor: 'transparent',
                    opacity: isActive ? 1 : 0.4,
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    lineHeight: '1'
                  }}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.opacity = '1'
                  }}
                  onMouseLeave={(event) => {
                    if (!isActive) {
                      event.currentTarget.style.opacity = '0.4'
                    }
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 'var(--dropdown-dot-left, 6px)',
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
