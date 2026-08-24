import GlyphInspector from '../components/sections/foundry/GlyphInspector.jsx'
import GlyphInspectorGrid from '../components/sections/foundry/GlyphInspectorGrid.jsx'
import Extraction from '../components/sections/foundry/Extraction.jsx'
import PanableExtraction from '../components/sections/foundry/PanableExtraction.jsx'
import FontPreviewCard from '../components/sections/foundry/FontPreviewCard.jsx'
import FoundryCharacterSets from '../components/sections/foundry/FoundryCharacterSets.jsx'


const Demo = () => {
  return (
    <div className="min-h-screen bg-surface-primary text-auto">
      <main id="main" className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-16">
        <header className="space-y-3">
          <h1 className="kol-display-lg">Glyph Inspector</h1>
        </header>

        <section className="flex flex-col gap-8">
          {/* Ghost ELIMINATED 👻 */}

          <GlyphInspector />

          <div className="border-t border-default pt-16 mt-16">
            <h2 className="kol-display-section mb-8 text-auto-secondary">Grid Layout (Figma Spec)</h2>
            <GlyphInspectorGrid />
          </div>

          <div className="border-t border-default pt-8 mt-8">
            <h2 className="kol-display-section mb-6 text-auto-secondary">Other Components</h2>
            <div className="flex flex-col gap-8">
              <FoundryCharacterSets />
              <PanableExtraction />
              <Extraction />
              <FontPreviewCard />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Demo
