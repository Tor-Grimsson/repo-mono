const SectionHeader = ({ children, className = '' }) => {
  return (
    <p className={`kol-label nav-link-underline ${className}`}>
      {children}
    </p>
  )
}

export default SectionHeader
