import PageSection from '../../components/framework/PageSection'
import { ContentCollection } from '@kolkrabbi/kol-component'
import usePageTitle from '../../components/hooks/usePageTitle'
import { LiveSwatch, HUE_RAMPS, CREAM_RAMP, GREY_RAMP } from '../../components/sections/brand-bits'
import brand from '@kolkrabbi/kol-brand'

/* The ramps' hex values live in @kolkrabbi/kol-brand (`brand.ramps`: yellow · orange · red · blue ·
 * teal · cream · grey, every stop). `brand-yellow` here is the package's `yellow`. */
const hexOf = (rampId, stop) => brand.ramps?.find((r) => r.id === rampId.replace(/^brand-/, ''))?.stops?.find((x) => x.stop === stop)?.value

/* Was the `#color` PageSection inside `pages/Brand.jsx` until 2026-08-01, when
 * the nav went category → page and every section became its own route. The
 * block below is that section verbatim — extracted, not re-authored. */
export default function Color() {
  usePageTitle('Color')

  return (
    <PageSection
      id="color"
      label="06 — color"
      title="Palette"
      body="Greyscale carries the structure; five brand hue ramps + cream carry identity. All swatches read live from kol-color.css."
    >
      <div className="kol-prose mt-12">
        <h3>Concept</h3>
        <p>The system splits color into two roles. Greyscale handles the structural backbone — surfaces, ink, dividers, the canvas. The brand palette names the identity through five hue families (yellow, red, blue, orange, teal), with cream as a complementary neutral surface.</p>

        <h3>Greyscale</h3>
        <p>Carries the canvas and structural ink. Legacy 10-stop ramp; kept until the opacity-hex (solid neutral) primitive is reintroduced.</p>
      </div>
      <ContentCollection cols={{ sm: 2, md: 5 }} gap={16} className="mt-8">
        {GREY_RAMP.stops.map((s) => <LiveSwatch key={s} token={`--${GREY_RAMP.id}-${s}`} value={hexOf(GREY_RAMP.id, s)} />)}
      </ContentCollection>

      {HUE_RAMPS.map((ramp) => (
        <div key={ramp.id}>
          <div className="kol-prose mt-12">
            <h3>{ramp.label} ramp</h3>
            <p>{ramp.note}</p>
          </div>
          <ContentCollection cols={{ sm: 2, md: 5 }} gap={16} className="mt-8">
            {ramp.stops.map((s) => (
              <LiveSwatch
                key={s}
                token={`--${ramp.id}-${s}`}
                name={`${ramp.id}-${s}`}
                anchor={s === ramp.anchor}
                value={hexOf(ramp.id, s)}
              />
            ))}
          </ContentCollection>
        </div>
      ))}

      <div className="kol-prose mt-12">
        <h3>{CREAM_RAMP.label} ramp</h3>
        <p>{CREAM_RAMP.note} Use for warm-light editorial moments and tinting.</p>
      </div>
      <ContentCollection cols={{ sm: 2, md: 5 }} gap={16} className="mt-8">
        {CREAM_RAMP.stops.map((s) => <LiveSwatch key={s} token={`--${CREAM_RAMP.id}-${s}`} value={hexOf(CREAM_RAMP.id, s)} />)}
      </ContentCollection>

      <div className="kol-prose mt-12">
        <h3>Usage</h3>
        <p>Greyscale carries the canvas and structural ink. The five brand ramps name the identity — yellow primary, red secondary, with blue, orange, and teal as supporting hues. Cream sits as a neutral surface for warm-leaning compositions. Apply brand color with restraint, never decoratively.</p>
        {/* the Combo lab sentence is gone (brand pass 2026-10-14): `/generators` has never been a route here */}
      </div>
    </PageSection>
  )
}
