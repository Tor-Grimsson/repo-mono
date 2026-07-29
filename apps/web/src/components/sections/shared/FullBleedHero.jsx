/**
 * FullBleedHero — Full-width image with centered content overlay
 *
 * @param {string} image - Image URL
 * @param {string} srcSet - Optional responsive srcSet
 * @param {string} alt - Image alt text
 * @param {string} height - Tailwind height classes (default: 'h-[440px] md:h-[640px]')
 * @param {number} imageOpacity - Tailwind opacity value (default: 40)
 * @param {React.ReactNode} children - Content rendered centered over the image
 */
const FullBleedHero = ({
  image,
  srcSet,
  alt = '',
  height = 'h-[504px] md:h-[704px]',
  imageOpacity = 40,
  children,
}) => {
  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      <img
        src={image}
        srcSet={srcSet}
        sizes="100vw"
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover opacity-${imageOpacity}`}
        loading="eager"
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </section>
  )
}

export default FullBleedHero
