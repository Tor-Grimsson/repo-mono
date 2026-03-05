import { useContext, useLayoutEffect } from 'react'
import { ShellTocContext } from '@kol/ui/layout'
import WorkshopSidebarContent from '../../components/workshop/molecules/WorkshopSidebarContent'
import DesPage from '../../components/workshop/molecules/DesPage'
import DesSection from '../../components/workshop/molecules/DesSection'
import DesCard from '../../components/workshop/molecules/DesCard'
import TypeSample from '../../components/workshop/molecules/TypeSample'
import { SectionToggle, Table } from '@kol/ui'
import useSectionExpansion from '../../components/workshop/useSectionExpansion'
import { typographyScale } from '../../data/workshop/tokens'

// Reference data for tables
const fontFamilyReference = [
  { token: '--kol-font-family-rgrot-tight', family: 'Right Grotesk Tight', stretch: 'extra-condensed', weights: '500', usage: 'Display headings, uppercase statements' },
  { token: '--kol-font-family-rgrot-narrow', family: 'Right Grotesk Narrow', stretch: 'condensed', weights: '500', usage: 'Content headings, compact labels' },
  { token: '--kol-font-family-rgrot-compact', family: 'Right Grotesk Compact', stretch: 'normal', weights: '470', usage: 'Condensed body text, subtitles' },
  { token: '--kol-font-family-body', family: 'Inter Tight', stretch: 'normal', weights: '400, 700', usage: 'Body copy, long-form reading' },
  { token: '--kol-font-family-mono', family: 'Right Grotesk Mono', stretch: 'normal', weights: '100, 470', usage: 'Code, data, labels, helpers' }
]

const fontStretchValues = [
  { value: 'extra-condensed', css: 'font-stretch: extra-condensed;', variant: 'Right Grotesk Tight' },
  { value: 'condensed', css: 'font-stretch: condensed;', variant: 'Right Grotesk Narrow' },
  { value: 'normal', css: 'font-stretch: normal;', variant: 'Inter Tight, Right Grotesk Mono' }
]

const lineHeightScale = [
  { value: '100%', usage: 'Display, labels, helpers, heading-sm (tight) - tight, uppercase styles' },
  { value: '110%', usage: 'Heading-xl, heading-lg - content headings' },
  { value: '120%', usage: 'Heading-md, mono-xs, mono-xxs - comfortable reading' },
  { value: '125%', usage: 'Mono-text, mono-sm, label-mono-md - technical content' },
  { value: '150%', usage: 'Text-sm - captions, dense UI' },
  { value: '160%', usage: 'Text-lg, text-md - body copy, optimal readability' }
]

const letterSpacingScale = [
  { value: '0.03em', usage: 'Compact labels (narrow font)' },
  { value: '0.05em', usage: 'Mono labels, helpers - standard uppercase tracking' },
  { value: '0.1em', usage: 'Helper-xs - extra tracking for small sizes' }
]

const legacyAliases = [
  { oldClass: '.kol-heading-display', newClass: '.kol-display-lg' },
  { oldClass: '.kol-heading-section', newClass: '.kol-display-section' },
  { oldClass: '.kol-heading-section-small', newClass: '.kol-display-section-sm' },
  { oldClass: '.kol-heading-subsection', newClass: '.kol-display-subsection' },
  { oldClass: '.kol-text', newClass: '.kol-text-md' },
  { oldClass: '.kol-body', newClass: '.kol-text-md' },
  { oldClass: '.kol-body-lg', newClass: '.kol-text-lg' },
  { oldClass: '.kol-body-sm', newClass: '.kol-text-sm' },
  { oldClass: '.kol-mono-body', newClass: '.kol-mono-text' },
  { oldClass: '.kol-mono', newClass: '.kol-mono-xs' },
  { oldClass: '.kol-label', newClass: '.kol-label-mono-sm' },
  { oldClass: '.kol-h1', newClass: '.kol-heading-xl' },
  { oldClass: '.kol-h2', newClass: '.kol-heading-lg' },
  { oldClass: '.kol-h3', newClass: '.kol-heading-md' },
  { oldClass: '.kol-h4', newClass: '.kol-heading-sm' }
]

// Table column definitions
const fontFamilyColumns = [
  { header: 'Token', accessor: 'token', render: (row) => <span className="kol-table-token bg-fg-08">{row.token}</span>, className: 'kol-table-cell-text' },
  { header: 'Family', accessor: 'family', className: 'kol-table-cell-meta-strong' },
  { header: 'Stretch', accessor: 'stretch', className: 'kol-table-cell-meta' },
  { header: 'Weights', accessor: 'weights', className: 'kol-table-cell-meta' },
  { header: 'Usage', accessor: 'usage', className: 'kol-table-cell-meta' }
]

const fontStretchColumns = [
  { header: 'Value', accessor: 'value', className: 'kol-table-cell-meta-strong' },
  { header: 'CSS', accessor: 'css', render: (row) => <code className="kol-mono-xs">{row.css}</code>, className: 'kol-table-cell-text' },
  { header: 'Font Variant', accessor: 'variant', className: 'kol-table-cell-meta' }
]

const lineHeightColumns = [
  { header: 'Value', accessor: 'value', className: 'kol-table-cell-meta-strong' },
  { header: 'Usage', accessor: 'usage', className: 'kol-table-cell-meta' }
]

const letterSpacingColumns = [
  { header: 'Value', accessor: 'value', className: 'kol-table-cell-meta-strong' },
  { header: 'Usage', accessor: 'usage', className: 'kol-table-cell-meta' }
]

const legacyColumns = [
  { header: 'Old Class (Deprecated)', accessor: 'oldClass', render: (row) => <span className="kol-mono-xs line-through opacity-60">{row.oldClass}</span>, className: 'kol-table-cell-text' },
  { header: 'New Class', accessor: 'newClass', render: (row) => <span className="kol-table-token bg-fg-08">{row.newClass}</span>, className: 'kol-table-cell-meta-strong' }
]

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
  },
  {
    id: 'reference',
    label: 'Reference Tables'
  }
]

const TYPOGRAPHY_SECTION_DEFAULTS = sections.reduce((acc, section) => {
  acc[section.id] = false
  return acc
}, {})

const Section = ({ id, title, expandedSections, toggleSection, children }) => (
  <div className="space-y-4" id={id}>
    <SectionToggle
      label={title}
      isExpanded={expandedSections[id]}
      onToggle={() => toggleSection(id)}
    />
    {expandedSections[id] ? (
      <div className="space-y-8 pt-2">
        {children}
      </div>
    ) : null}
  </div>
)

const TYPOGRAPHY_DOC_LINKS = [
  { id: '2.2.0-typography', label: 'Typography' },
  { id: '2.2.1-typography-cheat-sheet', label: 'Typography Cheat Sheet' },
  { id: '2.4.1-text-styles-kol', label: 'Text Styles – Kol' }
]

const Typography = () => {
  const { sections: expandedSections, toggleSection, allExpanded, toggleAll } = useSectionExpansion('typography', TYPOGRAPHY_SECTION_DEFAULTS)
  const setTocContent = useContext(ShellTocContext)
  useLayoutEffect(() => {
    setTocContent(<WorkshopSidebarContent sections={sections} links={TYPOGRAPHY_DOC_LINKS} allExpanded={allExpanded} onToggleAll={toggleAll} />)
    return () => setTocContent(null)
  }, [setTocContent, allExpanded, toggleAll])

  return (
    <div className="space-y-10">
      <DesPage
        title="Typography"
        subtitle="2.2.0 Design System: Typography — Unified typography system with 6 groups matching Figma design tokens"
        meta="Display · Heading · Text · Mono · Label · Helpers · Reference"
      />

      {/* Quick nav */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 kol-mono-xs text-fg-48">
        <a href="#display-typography" className="hover:text-fg-80">Display</a>
        <a href="#content-headings" className="hover:text-fg-80">Heading</a>
        <a href="#body-text" className="hover:text-fg-80">Text</a>
        <a href="#monospace-text" className="hover:text-fg-80">Mono</a>
        <a href="#labels-ui-text" className="hover:text-fg-80">Label</a>
        <a href="#helpers" className="hover:text-fg-80">Helpers</a>
        <a href="#reference" className="hover:text-fg-80">Reference</a>
      </div>

      <div className="space-y-8">
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

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {typographyScale.filter(type =>
              ['helper-uc-xl', 'helper-uc-lg', 'helper-uc-md', 'helper-uc-s', 'helper-uc-xs', 'helper-uc-xxs'].includes(type.id)
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

        <Section
          id="reference"
          title="Reference Tables"
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        >
          <DesSection
            name="Typography Reference"
            description="Quick reference tables for font families, font-stretch values, line-heights, letter-spacing, and legacy class mappings."
          />

          <div className="space-y-4">
            <DesCard
              name="Font Family Reference"
              description="CSS custom properties for each font family with their stretch and weight values."
            />
            <Table caption="Font families" columns={fontFamilyColumns} rows={fontFamilyReference} />
          </div>

          <div className="space-y-4">
            <DesCard
              name="Font-Stretch Values"
              description="CSS font-stretch values used across the typography system."
            />
            <Table caption="Font stretch values" columns={fontStretchColumns} rows={fontStretchValues} />
          </div>

          <div className="space-y-4">
            <DesCard
              name="Line Height Scale"
              description="Line height values and their typical usage contexts."
            />
            <Table caption="Line height scale" columns={lineHeightColumns} rows={lineHeightScale} />
          </div>

          <div className="space-y-4">
            <DesCard
              name="Letter Spacing"
              description="Letter spacing values for labels and uppercase text."
            />
            <Table caption="Letter spacing" columns={letterSpacingColumns} rows={letterSpacingScale} />
          </div>

          <div className="space-y-4">
            <DesCard
              name="Legacy Aliases (Deprecated)"
              description="Old class names mapped to their new equivalents. Update existing code to use the new classes."
            />
            <Table caption="Legacy aliases" columns={legacyColumns} rows={legacyAliases} />
          </div>
        </Section>

      </div>
    </div>
  )
}

export default Typography
