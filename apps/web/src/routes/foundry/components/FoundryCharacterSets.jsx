import { useState } from 'react'
import { GlyphCategory, Button } from '@kol/ui'
import { glyphSets, glyphCategories } from '@kol/ui/data'
import FoundrySection from './FoundrySection'

const FoundryCharacterSets = ({
  fontFamily = 'TGMalromur',
  showDropdown = true
}) => {
  const [selectedStyle, setSelectedStyle] = useState('italic')
  const [showAll, setShowAll] = useState(false)

  const visibleCategories = showAll ? glyphCategories : glyphCategories.slice(0, 2)

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          label="Character Set"
          size="sm"
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          showDropdown={showDropdown}
        />

        <div className="w-full flex flex-col gap-12 relative">
          {visibleCategories.map((category, index) => (
            <GlyphCategory
              key={category.key}
              title={category.title}
              glyphs={glyphSets[category.key]}
              fontFamily={fontFamily}
              fontStyle={selectedStyle === 'italic' ? 'italic' : 'normal'}
              className={!showAll && index === 1 ? 'relative' : ''}
            />
          ))}

          {!showAll && (
            <>
              {/* Gradient Overlay on Lowercase */}
              <div
                className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(18, 18, 21, 0) 13%, rgba(18, 18, 21, 1) 86%)'
                }}
              />

              {/* Show All Button */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <Button
                  onClick={() => setShowAll(true)}
                  variant="outline"
                >
                  Show All Glyphs
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default FoundryCharacterSets
