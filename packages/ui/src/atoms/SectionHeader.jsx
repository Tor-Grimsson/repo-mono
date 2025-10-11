const SectionHeader = ({ title, description }) => {
  return (
    <div className="space-y-3">
      <h2 className="kol-heading-subsection" style={{ color: 'var(--component-fg)' }}>
        {title}
      </h2>
      {description ? (
        <p className="kol-body max-w-2xl" style={{ color: 'var(--component-fg-muted)' }}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeader
