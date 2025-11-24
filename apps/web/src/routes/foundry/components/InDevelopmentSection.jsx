import { Pill } from '@kol/ui'

/**
 * InDevelopmentSection - Display upcoming/in-development typefaces
 *
 * Shows a grid of typeface cards with reduced opacity to indicate
 * they're not yet available. Each card displays status, name,
 * description, and expected release info.
 *
 * @param {Object} props
 * @param {Array} props.typefaces - Array of upcoming typeface objects
 * @param {string} props.title - Section title (default: "In Development")
 * @param {string} props.badgeLabel - Badge text (default: "Coming Soon")
 * @param {string} props.description - Section description
 */
const InDevelopmentSection = ({
  typefaces = [],
  title = "In Development",
  badgeLabel = "Coming Soon",
  description = "Typefaces currently in progress"
}) => {
  if (!typefaces || typefaces.length === 0) return null

  return (
    <section className="w-full px-8 py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="kol-heading-lg text-auto">{title}</h2>
            <Pill variant="subtle" size="sm">{badgeLabel}</Pill>
          </div>
          <p className="kol-mono-sm text-fg-64">{description}</p>
        </div>

        {/* Typeface Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {typefaces.map((typeface) => (
            <div
              key={typeface.name}
              className="bg-container-primary p-8 rounded-sm opacity-60"
            >
              <div className="space-y-4">
                {/* Name and Description */}
                <div>
                  <Pill variant="subtle" size="sm" className="mb-3">
                    {typeface.status}
                  </Pill>
                  <h3 className="text-auto text-3xl font-normal font-['TGMalromur'] leading-tight mb-2">
                    {typeface.name}
                  </h3>
                  <p className="kol-text-sm text-fg-64 italic mb-3">
                    {typeface.subtitle}
                  </p>
                  <p className="kol-text-sm text-fg-64">
                    {typeface.description}
                  </p>
                </div>

                {/* Metadata */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-start">
                    <span className="kol-label-mono-xs text-fg-64">Classification</span>
                    <span className="kol-mono-xs text-auto">{typeface.classification}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="kol-label-mono-xs text-fg-64">Expected</span>
                    <span className="kol-mono-xs text-auto">{typeface.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InDevelopmentSection
