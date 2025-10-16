import DesPage from '../../components/styleguide/molecules/DesPage'
import DesSection from '../../components/styleguide/molecules/DesSection'
import TypeSample from '../../components/styleguide/molecules/TypeSample'
import { SectionToggle } from '@kol/ui'
import { useStyleguideExpansion } from './StyleguideExpansionContext'
import { typographyScale } from '../../data/styleguide/tokens'

const sections = [
  {
    id: 'display-typography',
    label: 'Display Typography'
  },
  {
    id: 'content-headings',
    label: 'Content Headings'
  },
  {
    id: 'body-text',
    label: 'Body Text'
  },
  {
    id: 'monospace-text',
    label: 'Monospace Text'
  },
  {
    id: 'labels-ui-text',
    label: 'Labels & UI Text'
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
    <div className="divider-auto w-full"></div>
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
        subtitle="Placeholder text for typography styles and token classes"
        meta="placeholder meta text"
      />
      
      {/* // COLLAPSABLE TOGGLE // */}
      <div className="space-y-8">

        {/* SECTION 1: DISPLAY TYPOGRAPHY */}
        <Section
          id="display-typography"
          title="Display Typography"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Display Typography"
            description="Large-scale typographic styles for hero statements and section headlines."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['display', 'section', 'section-small', 'subsection'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 2: CONTENT HEADINGS */}
        <Section
          id="content-headings"
          title="Content Headings"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Content Headings"
            description="Mid-scale headings for page content, subheadings, and article structure."
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
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 3: BODY TEXT */}
        <Section
          id="body-text"
          title="Body Text"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Body Text"
            description="Reading text for articles, paragraphs, and content-heavy sections."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['text-lg', 'text', 'text-sm', 'body-lg'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 4: MONOSPACE TEXT */}
        <Section
          id="monospace-text"
          title="Monospace Text"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Monospace Text"
            description="Technical text, metadata, specs, and code-style content."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['mono-text', 'mono-text-label', 'mono', 'mono-xs', 'mono-xxs'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
                breakpoints={type.breakpoints}
              />
            ))}
          </div>
        </Section>

        {/* SECTION 5: LABELS & UI TEXT */}
        <Section
          id="labels-ui-text"
          title="Labels & UI Text"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Labels & UI Text"
            description="UI labels, tokens, badges, and compact interface text."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['label', 'label-compact', 'mono-text-label', 'mono'].includes(type.id)
            ).map((type) => (
              <TypeSample
                key={type.id}
                id={type.id}
                className={type.className}
                label={type.label}
                usage={type.usage}
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
