const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border borderAbsoluteBlack20 bgAbsoluteWhite p-6">
      {icon ? <div className="text-2xl textAbsoluteBlack">{icon}</div> : null}
      <h3 className="text-xl font-semibold textAbsoluteBlack">{title}</h3>
      <p className="text-sm textAbsoluteBlack opacity-70">{description}</p>
    </div>
  )
}

export default FeatureCard
