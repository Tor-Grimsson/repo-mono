export default function Tag({
  text,
  children,
  variant = 'default',
  size = 'md',
  color,
  className = '',
  onClick
}) {
  const content = children || text

  let baseClass
  if (color) {
    baseClass = `tag tag--${color}`
  } else {
    baseClass = variant === 'inverse' ? 'tag-control-inverse' : 'tag-control'
  }

  return (
    <div
      className={`${onClick ? 'cursor-pointer' : ''} ${baseClass} tag-${size} whitespace-nowrap ${className}`.trim()}
      onClick={onClick}
    >
      <span>{content}</span>
    </div>
  )
}
