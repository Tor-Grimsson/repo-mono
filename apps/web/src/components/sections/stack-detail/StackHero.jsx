const StackHero = ({
  title = "Study Stack",
  description = "Excercises in futility, manic obsessivities & braindumpster",
  src = "/img/features/card-item-base-7.png",
  alt,
  aspectRatio = "auto",
  objectFit = "cover",
  objectPosition = "top", // e.g., "left", "right", "top", "bottom", "left top", "right center", etc.
  containerClassName,
  contentClassName
}) => {
  const wrapperClasses =
    containerClassName ??
    'relative px-6 pb-12 lg:px-12 flex items-end justify-center lg:justify-center min-h-[80vh] overflow-hidden'
  const contentClasses =
    contentClassName ??
    'relative z-10 flex flex-col gap-1 w-full max-w-[520px] lg:max-w-[30%] text-center mx-auto lg:mx-0'

  return (
    <div className={wrapperClasses}>
      {/* Background Image */}
      {src && (
        <>
          <div className="absolute inset-0 w-full h-full">
            <img
              src={src}
              alt={alt || "Stack hero background"}
              className={`w-full h-full object-${objectFit}`}
              style={{ objectPosition }}
            />
          </div>
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(to top, #151518 0%, rgba(21, 21, 24, 0) 100%)'
            }}
          ></div>
        </>
      )}

      {/* Content */}
      <div className={contentClasses}>
        <h1 className="reveal kol-heading-display text-center" style={{ '--reveal-delay': '0.2s' }}>{title}</h1>
        <p className="reveal kol-mono-text text-center" style={{ '--reveal-delay': '0.3s' }}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default StackHero
