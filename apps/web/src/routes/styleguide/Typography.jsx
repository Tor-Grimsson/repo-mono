import DesPage from '../../components/styleguide/molecules/DesPage'
import DesSection from '../../components/styleguide/molecules/DesSection'
import TypeSample from '../../components/styleguide/molecules/TypeSample'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from '../../components/styleguide/StyleguideExpansionContext'
import { typographyScale } from '../../data/styleguide/tokens'

const sections = [
  {
    id: 'display-typography',
    label: 'Display (Largest, Most Impactful)'
  },
  {
    id: 'content-headings',
    label: 'Heading (Content Hierarchy)'
  },
  {
    id: 'body-text',
    label: 'Text (Body Copy)'
  },
  {
    id: 'monospace-text',
    label: 'Mono (Code, Data, Technical)'
  },
  {
    id: 'labels-ui-text',
    label: 'Label (Tags, Pills, Markers)'
  },
  {
    id: 'helpers',
    label: 'Helpers (CTA & Utility Text)'
  }
]

const TYPOGRAPHY_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

const Section = ({ id, title, expandedSections, toggleSection, children }) => (
  <section className="space-y-4" id={id}>
    <SectionToggle
      label={title}
      isExpanded={expandedSections[id]}
      onToggle={() => toggleSection(id)}
    />
    {expandedSections[id] ? (
      <div className="space-y-8 pt-2 pb-16">
        {children}
      </div>
    ) : null}
  </section>
)

const Typography = () => {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('typography', TYPOGRAPHY_SECTION_DEFAULTS)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (

      // PAGE Wrapper //
    <div className="space-y-10">

      {/* // PAGE DESCRIPTION // */}
      <DesPage
        title="Typography"
        subtitle="v3.0 - Unified typography system with 6 groups matching Figma design tokens"
        meta="Display · Heading · Text · Mono · Label · Helpers"
      />
      
      {/* // COLLAPSABLE TOGGLE // */}
      <div className="space-y-8">

        {/* SECTION 1: DISPLAY TYPOGRAPHY */}
        <Section
          id="display-typography"
          title="Display (Largest, Most Impactful)"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Display Typography"
            description="Largest headings for hero statements, section intros, and marquee content. All display styles use uppercase transformation."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['display-lg', 'display-section', 'display-section-sm', 'display-subsection'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                font={type.font}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 2: CONTENT HEADINGS */}
        <Section
          id="content-headings"
          title="Heading (Content Hierarchy)"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Heading Typography"
            description="Content headings for page structure and reading hierarchy. Only heading-sm uses uppercase transformation."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['heading-xl', 'heading-lg', 'heading-md', 'heading-sm'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                font={type.font}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 3: BODY TEXT */}
        <Section
          id="body-text"
          title="Text (Body Copy)"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Text Typography"
            description="Body copy for readable content. Text-md-rg provides alternative with Right Grotesk Narrow for tighter layouts."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['text-lg', 'text-md', 'text-md-rg', 'text-sm'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                font={type.font}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 4: MONOSPACE TEXT */}
        <Section
          id="monospace-text"
          title="Mono (Code, Data, Technical)"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Mono Typography"
            description="Technical text, code, data tables, and metadata. Fine variants (weight 300) provide lighter appearance for delicate UI."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['mono-text', 'mono-text-fine', 'mono-sm', 'mono-sm-fine', 'mono-xs', 'mono-xxs'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                font={type.font}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 5: LABELS & UI TEXT */}
        <Section
          id="labels-ui-text"
          title="Label (Tags, Pills, Markers)"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Label Typography"
            description="UI labels, tags, pills, and section markers. All labels use uppercase and letter-spacing for optical clarity."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['label-mono-sm', 'label-mono-md', 'label-mono-xs', 'label-compact-lg', 'label-compact-md'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                font={type.font}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 6: HELPERS */}
        <Section
          id="helpers"
          title="Helpers (CTA & Utility Text)"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Helper Typography"
            description="Button text, CTA copy, and utility labels. Helpers use FIXED sizes (no responsive scaling) for consistent UI."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['helper-xl', 'helper-lg', 'helper-md', 'helper-s', 'helper-xs', 'helper-xxs'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                font={type.font}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}

export default Typography
