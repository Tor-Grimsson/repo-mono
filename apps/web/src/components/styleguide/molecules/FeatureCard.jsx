import { Link } from 'react-router-dom'

const FeatureCard = ({ icon, title, description, to }) => {
  const content = (
    <>
      {icon ? <div className="text-2xl opacity-80">{icon}</div> : null}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm opacity-70">{description}</p>
    </>
  )

  const baseClasses = "surface-panel rounded-3xl border p-6 flex flex-col gap-3"
  const style = { borderColor: 'var(--surface-border)' }

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} hoverFlipTheme`} style={style}>
        {content}
      </Link>
    )
  }

  return (
    <div className={baseClasses} style={style}>
      {content}
    </div>
  )
}

export default FeatureCard
