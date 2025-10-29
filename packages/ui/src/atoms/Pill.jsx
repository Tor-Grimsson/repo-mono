/**
 * Pill Component
 *
 * Small badge/tag component for labels, categories, or status indicators
 * Uses existing pill classes from components.css (pill-outline, pill-subtle, pill-inverse)
 *
 * @param {Object} props
 * @param {string} props.children - Text content of the pill
 * @param {string} props.variant - Visual variant: 'outline' | 'subtle' | 'inverse' (default: 'outline')
 * @param {string} props.className - Additional classes for customization
 */
const Pill = ({ children, variant = 'outline', className = '' }) => {
  const variantClasses = {
    outline: 'pill-outline',
    subtle: 'pill-subtle',
    inverse: 'pill-inverse'
  }

  return (
    <span className={`${variantClasses[variant]} ${className}`.trim()}>
      {children}
    </span>
  )
}

export default Pill
