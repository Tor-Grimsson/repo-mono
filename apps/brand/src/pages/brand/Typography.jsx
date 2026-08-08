import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import { TypeShowcase } from '../../components/sections/brand-bits'
import { TYPOGRAPHY_SECTIONS } from '../../data/typography'

/* Was the `#typography` PageSection inside `pages/Brand.jsx` until 2026-08-01, when
 * the nav went category → page and every section became its own route. The
 * block below is that section verbatim — extracted, not re-authored. */
export default function Typography() {
  usePageTitle('Typography')

  return (
    <PageSection
      id="typography"
      label="07 — typography"
      title="Type"
      body="Right Grotesk for sans (display, heading, body, prose). JetBrains Mono for utility chrome (mono body, helpers, code). Two-cut sans (Narrow / Compact) + base; weight + leading split on mono creates label/value hierarchy without size jumps. Sourced from src/data/typography.js — same data drives /reference."
    >
      {/* Sans italic at display size — lobby/inbox/ShowSansItalicDisplay.md.
       *  Real Right Grotesk italic cuts (@font-face in kol-typography.css),
       *  fired by plain font-style: italic. No .sans-italic class exists and
       *  none is wanted; Tailwind's `italic` sits on a span AFTER the sans
       *  class. Same pangram the rows below use. */}
      <div className="mt-12 flex flex-col gap-2 py-3 border-b border-fg-08">
        <span className="kol-helper-12 text-meta uppercase tracking-wider">
          .kol-prose-display-md · sans narrow · roman + italic
        </span>
        <p className="kol-prose-display-md m-0">
          The quick <span className="italic">brown</span> fox jumps over the lazy dog
        </p>
      </div>

      {TYPOGRAPHY_SECTIONS
        .filter(s => s.id !== 'cuts')
        .map(section => (
          <div key={section.id} className="mt-12">
            <div className="kol-prose max-w-[var(--kol-content-measure)]">
              <h3>{section.title}</h3>
              <p>{section.intro}</p>
              {section.reasoning && (
                <p className="text-meta italic">{section.reasoning}</p>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-6">
              {section.tables.flatMap(t => t.rows).map((row, i) => (
                <TypeShowcase
                  key={`${section.id}-${i}`}
                  sectionId={section.id}
                  row={row}
                />
              ))}
            </div>
          </div>
        ))}
    </PageSection>
  )
}
