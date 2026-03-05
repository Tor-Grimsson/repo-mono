const TogglePill = ({
  checked = false,
  onChange,
  className = '',
  ...props
}) => {
  const handleClick = () => {
    if (onChange) onChange(!checked)
  }

  return (
    <button
      type="button"
      className={`toggle-pill ${className}`.trim()}
      data-state={checked ? 'on' : 'off'}
      onClick={handleClick}
      aria-pressed={checked}
      {...props}
    >
      <span className="toggle-pill-dot" aria-hidden="true" />
    </button>
  )
}

export default TogglePill
