import { Pill } from '@kol/ui'

/**
 * CollectionHero - Section Component
 *
 * Hero section for collection pages with pill label, title, and description.
 *
 * @param {Object} props
 * @param {string} props.label - Pill label text
 * @param {string} props.title - Hero heading
 * @param {string} props.description - Hero description text
 * @param {string} [props.className] - Additional CSS classes for section
 *
 * @example
 * <CollectionHero
 *   label="Illustrations"
 *   title="Illustration Collection"
 *   description="A curated collection of illustrated works and conceptual explorations."
 * />
 */
export default function CollectionHero({ label, title, description, className = '' }) {
  return (
    <section className={`w-full px-8 pt-24 pb-24 mt-24 ${className}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="space-y-4">
          <Pill variant="inverse">{label}</Pill>
          <h1 className="kol-display-lg text-auto">{title}</h1>
          <p className="kol-mono-text text-fg-64 max-w-[700px]">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
