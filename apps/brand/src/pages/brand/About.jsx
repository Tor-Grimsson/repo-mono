import PageSection from '../../components/framework/PageSection'
import usePageTitle from '../../components/hooks/usePageTitle'

/* Was the `#about` PageSection inside `pages/Brand.jsx` until 2026-08-01, when
 * the nav went category → page and every section became its own route.
 * Re-authored 2026-08-06: the extracted copy was Another Creation's (client-era
 * residue). This text is drawn from the canonical studio prose in
 * kol-studio/data/studio/07-studio-about.md + 08-studio-values-approach.md. */
export default function About() {
  usePageTitle('About')

  return (
    <PageSection
      id="about"
      label="01 — about"
      title="About Kolkrabbi"
      body="A Reykjavík design studio and atelier — visual identity, custom typography, and thoughtful design systems for brands that value craftsmanship and clarity."
    >
      <div className="kol-prose mt-12">
        <p>Kolkrabbi is a design studio and atelier founded in Reykjavík in 2019 by artist and designer Tór Grímsson. The studio focuses on brand identity, visual systems, illustration, and UI/UX — the foundational structures that shape how brands communicate. At its core sits one belief: good design is systematic, not superficial.</p>

        <p>Tór is a Reykjavík-based artist and multi-disciplinary designer working across illustration, identity, and system-driven design. Educated at the Iceland Academy of the Arts and Weissensee Kunsthochschule in Berlin, he has over 15 years of experience across branding, UI/UX, publication design, and visual communication; before founding Kolkrabbi, he served as the first dedicated designer for Tempo. Alongside design he works as a visual artist under the names Biskup and Svartval, and produces music as Konsulat.</p>

        <p>The studio works with clients across technology, culture, lifestyle, and the arts, and collaborates with developers, strategists, and other specialists when needed — expanding capabilities without losing the focus and craft of a small atelier.</p>

        <h3>Systematic, not superficial</h3>
        <p>Every decision — from typography and color logic to layout, interaction, and asset management — serves clarity, consistency, and long-term adaptability. Design is approached as a system rather than a style.</p>

        <h3>Grounded in structure</h3>
        <p>The process maps the problem, understands the constraints, breaks a complex identity into component parts, and rebuilds it into a coherent system that scales. Strong foundations make future design choices intuitive instead of arbitrary.</p>

        <h3>Foundations that endure</h3>
        <p>The work spans branding, art direction, UI/UX, illustration, print, and digital experiences — always built on foundations that last. The result is design that scales, adapts, and retains integrity over time.</p>
      </div>
    </PageSection>
  )
}
