import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'
import { GraphicCard } from '../../components/sections/assets-bits'
import AssetTable, { markRows, graphicRows, markWidthFor, graphicWidthFor } from '../../components/styleguide/AssetTable'

/* Was the `#patterns` PageSection inside `pages/Assets.jsx` until 2026-08-01,
 * when the nav went category → page and every section became its own route.
 * Extracted verbatim, not re-authored.
 * ⚠ This page absorbs TWO former sections — `patterns` and `graphics-patterns`.
 * They were both called Patterns and flattening the nav merged them. If they
 * are genuinely two things, the second needs its own page and its own name. */
import { Graphic, GRAPHICS } from '@kolkrabbi/kol-component'

export default function Patterns() {
  usePageTitle('Patterns')

  return (
    <>
      <PageSection
        id="patterns"
        label="03 — patterns"
        title="Patterns"
        body="Tileable patterns in packages/component/src/graphics/svg/patterns/."
      >
        <AssetTable caption="Patterns" rows={graphicRows('patterns')} previewWidthFor={graphicWidthFor} />
      </PageSection>

      <PageSection
        id="graphics-patterns"
        label="16 — graphics · patterns"
        title="Patterns"
        body="Tileable patterns from packages/component/src/graphics/svg/patterns/, rendered via the Graphic loader inside a labeled card."
      >
        <div className="kol-grid mt-8">
          {(GRAPHICS.patterns ?? []).map((name) => (
            <GraphicCard key={name} category="patterns" name={name} />
          ))}
        </div>
      </PageSection>
    </>
  )
}
