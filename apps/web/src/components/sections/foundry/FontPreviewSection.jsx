import React from 'react'
import { FontPreviewItem } from '@kol/ui'

const FontPreviewSection = ({
  // Single preview props
  onFontSizeChange,
  initialSize,
  disableAutoSize,
  text,
  initialLineHeight,
  compactOnDesktop,
  fontPreviewSize,
  setFontPreviewSize,
  cardClassName,
  bgOpacity,
  textColor,
  textClassName,
  fontFamily,
  fontStyle,
  initialWeight,
  // Multiple previews prop
  previews
}) => {
  // Single preview mode
  if (!previews) {
    return (
      <FontPreviewItem
        onFontSizeChange={onFontSizeChange}
        initialSize={initialSize}
        disableAutoSize={disableAutoSize}
        text={text}
        initialLineHeight={initialLineHeight}
        compactOnDesktop={compactOnDesktop}
        fontPreviewSize={fontPreviewSize}
        setFontPreviewSize={setFontPreviewSize}
        cardClassName={cardClassName}
        bgOpacity={bgOpacity}
        textColor={textColor}
        textClassName={textClassName}
        fontFamily={fontFamily}
        fontStyle={fontStyle}
        initialWeight={initialWeight}
      />
    )
  }

  // Multiple previews mode with grid layout
  if (previews && Array.isArray(previews)) {
    return (
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 fpsGrid">
        {previews.map((preview, index) => (
          <div
            key={index}
            className={preview.colSpan === 2 ? 'col-span-1 lg:col-span-2' : 'col-span-1'}
          >
            <FontPreviewItem
              onFontSizeChange={preview.onFontSizeChange}
              initialSize={preview.initialSize}
              disableAutoSize={preview.disableAutoSize}
              text={preview.text}
              initialLineHeight={preview.initialLineHeight}
              compactOnDesktop={preview.compactOnDesktop}
              fontPreviewSize={preview.fontPreviewSize}
              setFontPreviewSize={preview.setFontPreviewSize}
              cardClassName={preview.cardClassName}
              bgOpacity={preview.bgOpacity}
              textColor={preview.textColor}
              textClassName={preview.textClassName}
              fontFamily={preview.fontFamily}
              fontStyle={preview.fontStyle}
              initialWeight={preview.initialWeight}
            />
          </div>
        ))}
      </section>
    )
  }

  return null
}

export default FontPreviewSection
