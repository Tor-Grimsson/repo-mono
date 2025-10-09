const GlyphGrid = ({ glyphs, glyphsGridRef }) => {
  return (
    <div
      ref={glyphsGridRef}
      className="flex flex-wrap gap-4 w-full"
    >
      {glyphs?.map((glyph, index) => (
        <div
          key={index}
          className="hoverFlipTheme aspect-square border rounded-lg flex items-center justify-center text-3xl transition-colors duration-300 w-16 h-16"
          style={{ fontFamily: 'TGMalromur', borderColor: 'var(--color-border)' }}
        >
          {glyph}
        </div>
      ))}
    </div>
  )
}

export default GlyphGrid
