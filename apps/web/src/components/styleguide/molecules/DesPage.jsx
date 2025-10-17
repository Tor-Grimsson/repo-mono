const DesPage = ({ title, subtitle, meta }) => {
  return (
    <header className="space-y-3">
      <h2 className="kol-heading-section">{title}</h2>
      {subtitle ? <p className="kol-mono-text">{subtitle}</p> : null}
      {meta ? (
        <div className="space-y-3">
          <p className="kol-mono-text text-sm opacity-70 mt-8">{meta}</p>
          <div className="divider-auto mb-16"></div>
        </div>
      ) : null}
    </header>
  )
}

export default DesPage
