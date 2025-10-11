export default function Tag({ text, children, showArrow = false, arrowDirection = 'right', variant = 'default', className = '' }) {
  const arrowRotation = arrowDirection === 'left' ? '-rotate-90' : 'rotate-90'
  const baseClass = variant === 'inverse' ? 'control-unified-inverse' : 'tag-control'

  // Support both 'text' prop (legacy) and 'children' prop (standard)
  const content = children || text

  const ArrowSvg = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 ${arrowRotation}`}>
      <path d="M10.875 19.875V6.84061L4.92034 12.7953C4.481 13.2346 3.76885 13.2346 3.32951 12.7953C2.89016 12.3559 2.89016 11.6438 3.32951 11.2044L11.2046 3.32933L11.2903 3.25243C11.7322 2.89203 12.3835 2.91744 12.7954 3.32933L20.6705 11.2044C21.1098 11.6438 21.1098 12.3559 20.6705 12.7953C20.2311 13.2346 19.519 13.2346 19.0797 12.7953L13.125 6.84061V19.875C13.125 20.4963 12.6213 21 12 21C11.3787 21 10.875 20.4963 10.875 19.875Z" fill="currentColor"/>
    </svg>
  )

  return (
    <div className={`cursor-pointer ${baseClass} whitespace-nowrap flex items-center gap-2 ${className}`}>
      {showArrow && arrowDirection === 'left' && <ArrowSvg />}
      <span>{content}</span>
      {showArrow && arrowDirection === 'right' && <ArrowSvg />}
    </div>
  )
}
