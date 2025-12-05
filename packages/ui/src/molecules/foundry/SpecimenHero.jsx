import LinkWithIcon from '../../atoms/LinkWithIcon'

/**
 * SpecimenHero - Hero section for specimen hub pages
 *
 * Foundry molecule for specimen collection landing pages
 * Shows back link, title, subtitle, and description
 *
 * @param {Object} props
 * @param {string} props.title - Main heading (e.g., "Málrómur Specimens", "Prose Styles")
 * @param {string} props.subtitle - Italic subtitle below title
 * @param {string} props.description - Body text description
 * @param {string} props.fontFamily - CSS font-family for title (e.g., "TGMalromur")
 * @param {string} props.fontStyle - CSS font-style for title (e.g., "italic", "normal")
 * @param {number} props.fontWeight - CSS font-weight for title (optional)
 * @param {string} props.backLink - Back link URL (defaults to /foundry/specimens)
 * @param {React.ReactNode} props.children - Optional additional content (e.g., CTAs) below description
 * @param {string} props.className - Additional classes
 */
const SpecimenHero = ({
  title,
  subtitle,
  description,
  fontFamily = 'TGMalromur',
  fontStyle,
  fontWeight,
  backLink = '/foundry/specimens',
  children,
  className = ''
}) => {
  return (
    <section className={`w-full px-8 py-24 lg:py-32 mt-24 flex flex-col items-center justify-center text-center ${className}`.trim()}>
      <div className="max-w-[900px] mx-auto space-y-8">
        <div className="reveal" style={{ '--reveal-delay': '0s' }}>
          <LinkWithIcon
            to={backLink}
            iconName="arrow-right"
            iconPosition="left"
            iconSize={12}
            className="hover:text-fg-64"
          >
            Back to All Specimens
          </LinkWithIcon>
        </div>

        <h1
          className="reveal text-auto text-7xl font-normal leading-tight"
          style={{
            '--reveal-delay': '0.1s',
            fontFamily,
            ...(fontStyle && { fontStyle }),
            ...(fontWeight && { fontWeight })
          }}
        >
          {title}
        </h1>

        <div className="reveal w-32 h-[1px] bg-fg-24 mx-auto" style={{ '--reveal-delay': '0.2s' }} />

        <p className="reveal text-auto text-2xl font-normal font-['TGMalromur'] leading-8 italic opacity-70" style={{ '--reveal-delay': '0.25s' }}>
          {subtitle}
        </p>

        <p className="reveal text-auto text-lg font-normal font-['TGMalromur'] leading-7 max-w-[700px] mx-auto pt-4" style={{ '--reveal-delay': '0.3s' }}>
          {description}
        </p>

        {children && <div className="reveal" style={{ '--reveal-delay': '0.35s' }}>{children}</div>}
      </div>
    </section>
  )
}

export default SpecimenHero
