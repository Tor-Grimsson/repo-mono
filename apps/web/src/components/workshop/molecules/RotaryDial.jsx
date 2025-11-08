import { useState, useRef, useEffect } from 'react'

/**
 * RotaryDial - Interactive rotary control knob
 *
 * @param {string} label - Label below the dial (A, B, C, etc.)
 * @param {number} value - Current value (0-100)
 * @param {function} onChange - Callback when value changes
 * @param {number} size - Dial size in pixels (default: 80)
 */
export default function RotaryDial({ label, value = 0, onChange, size = 80 }) {
  const [isDragging, setIsDragging] = useState(false)
  const [localValue, setLocalValue] = useState(value) // Visual state - updates immediately
  const dialRef = useRef(null)
  const dragDataRef = useRef({ startY: 0, startValue: 0 })
  const rafRef = useRef(null)

  // Sync local value with prop when not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value)
    }
  }, [value, isDragging])

  // Convert value (0-100) to rotation angle (-135deg to +135deg = 270deg range)
  const valueToAngle = (val) => {
    return -135 + (val / 100) * 270
  }

  // Use local value for immediate visual feedback
  const angle = valueToAngle(localValue)

  const handleMouseDown = (e) => {
    if (!dialRef.current) return

    setIsDragging(true)
    dragDataRef.current = {
      startY: e.clientY,
      startValue: localValue
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    // Calculate total delta from start position (not incremental)
    const totalDeltaY = dragDataRef.current.startY - e.clientY

    // Sensitivity: 2px of mouse movement = 1 value unit (100 steps total)
    const valueDelta = totalDeltaY * 0.5

    let newValue = dragDataRef.current.startValue + valueDelta
    newValue = Math.max(0, Math.min(100, newValue))
    const roundedValue = Math.round(newValue)

    // Update local state immediately for smooth visual rotation
    setLocalValue(roundedValue)

    // Throttle parent onChange calls with RAF (queued, non-blocking)
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        onChange(roundedValue)
        rafRef.current = null
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Send final value immediately on release
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    onChange(Math.round(localValue))
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging])

  const outerRadius = size / 2
  const innerRadius = (size * 0.7) / 2
  const strokeWidth = 2

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={dialRef}
        className="relative cursor-pointer select-none"
        style={{
          width: size,
          height: size,
          transform: `rotate(${angle}deg)`,
          willChange: isDragging ? 'transform' : 'auto'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Outer dashed circle */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ overflow: 'visible' }}
        >
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={outerRadius - strokeWidth}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray="4 4"
            className="text-fg-24"
          />

          {/* Inner solid circle */}
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={innerRadius}
            fill="currentColor"
            className="text-fg-96"
          />

          {/* Pointer line - pointing upward in default position */}
          <line
            x1={outerRadius}
            y1={outerRadius}
            x2={outerRadius}
            y2={outerRadius - innerRadius + 4}
            stroke="var(--kol-surface-primary)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Label - only show if provided */}
      {label && <div className="kol-mono-xs text-fg-64 uppercase">{label}</div>}

      {/* Value display - only show if label is provided */}
      {label && <div className="kol-mono-xs text-fg-96">{value}%</div>}
    </div>
  )
}
