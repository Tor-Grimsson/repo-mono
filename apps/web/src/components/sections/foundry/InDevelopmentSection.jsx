import { SectionCards, AssetPlaceholder } from '@kolkrabbi/kol-component'

/**
 * InDevelopmentSection - Display upcoming/in-development typefaces
 *
 * Uses SectionCards with SectionCardItem to display typefaces
 * currently in development with reduced opacity
 *
 * @param {Object} props
 * @param {Array} props.typefaces - Array of upcoming typeface objects
 * @param {string} props.title - Section title (default: "In Development")
 * @param {string} props.description - Section description
 */
const InDevelopmentSection = ({
  typefaces = [],
  title = "In Development",
  description = "Typefaces currently in progress"
}) => {
  if (!typefaces || typefaces.length === 0) return null

  // Map typeface data to feature card format
  // A graphic placeholder in the visual slot until each face has a specimen
  // (user 2026-08-27) — the card takes the family's visual layout + hover,
  // not the text-only tile; no header icon, no opacity dim.
  const features = typefaces.map((typeface) => ({
    title: typeface.name,
    description: `${typeface.subtitle} — ${typeface.description}`,
    visual: <AssetPlaceholder />,
  }))

  return (
    <SectionCards
      features={features}
      itemClassName="reveal"
      itemStyle={(i) => ({ '--reveal-delay': `${i * 0.15}s` })}
      headline={title}
      body={description}
      sectionClassName="py-16"
      headerClassName="w-full"
      headerTextWidthClass="w-full"
      cardsWrapperClassName="self-stretch inline-flex flex-col md:flex-row md:h-72 justify-start items-center gap-6"
    />
  )
}

export default InDevelopmentSection
