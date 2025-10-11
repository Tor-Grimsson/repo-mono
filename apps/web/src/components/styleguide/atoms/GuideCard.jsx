const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

const GuideCard = ({ padding = 'md', className = '', children }) => {
  const paddingClass = paddingMap[padding] ?? paddingMap.md
  return (
    <div className={`rounded-3xl border borderAbsoluteBlack20 bgAbsoluteBlack5 ${paddingClass} ${className}`}>
      {children}
    </div>
  )
}

export default GuideCard
