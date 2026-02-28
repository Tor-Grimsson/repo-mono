const DesPage = ({ title, subtitle, meta, message }) => {
  if (message) {
    return (
      <header className="space-y-3">
        <p className="kol-mono-text">{message}</p>
        <div className="h-px w-full bg-fg-08" />
      </header>
    )
  }

  return (
    <header className="space-y-3">
      <h2 className="kol-heading-sm" style={{ textTransform: 'none', fontStretch: 'condensed' }}>{title}</h2>
      {subtitle ? <p className="kol-mono-sm opacity-64">{subtitle}</p> : null}
      {meta ? (
        <div className="space-y-3">
          <p className="kol-mono-text text-sm opacity-64 mt-8">{meta}</p>
          <div className="h-px w-full bg-fg-08 mb-16"></div>
        </div>
      ) : null}
    </header>
  )
}

export default DesPage
