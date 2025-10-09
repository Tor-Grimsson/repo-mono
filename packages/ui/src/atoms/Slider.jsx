import React from 'react'

/**
 * Slider Component
 *
 * Reusable range slider with label and value display
 *
 * @param {Object} props
 * @param {string} props.label - Slider label text
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.className - Additional wrapper classes
 * @param {number} props.displayWidth - Width for value display (in characters)
 */
const Slider = ({
  label,
  min = 0,
  max = 100,
  value = 0,
  onChange,
  className = '',
  displayWidth = 10
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(Number(e.target.value))
    }
  }

  return (
    <div className={`control-unified gap-3 shadow-none ${className}`}>
      <label className="whitespace-nowrap shrink-0 w-fit">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="slider-black flex-1 w-full cursor-pointer"
      />
      <span className="text-right shrink-0 w-fit">
        {Math.round(value)}
      </span>
    </div>
  )
}

export default Slider
