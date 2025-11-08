const DashboardCard = ({ title, subtitle, children, footer, className = '' }) => {
  return (
    <div className={`dashboard-card ${className}`.trim()}>
      <header className="dashboard-card__header">
        <h3 className="dashboard-card__title">{title}</h3>
        {subtitle ? <p className="dashboard-card__subtitle">{subtitle}</p> : null}
      </header>
      <div className="dashboard-card__body">{children}</div>
      {footer ? <footer className="dashboard-card__footer">{footer}</footer> : null}
    </div>
  )
}

export default DashboardCard
