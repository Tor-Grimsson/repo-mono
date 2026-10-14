import { SectionCards } from '@kolkrabbi/kol-component'

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
  // NO visual (user 2026-10-14: "I haven't uploaded anything, it shouldn't be
  // missing") — a face in development has no specimen to show, so the card is
  // the DS text-only tile (title + description), not a dashed placeholder plate.
  // The 08-27 placeholder ruling is reversed by this.
  const features = typefaces.map((typeface) => ({
    title: typeface.name,
    description: `${typeface.subtitle} — ${typeface.description}`,
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
