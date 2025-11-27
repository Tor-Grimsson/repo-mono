import { useState, useEffect, useRef } from 'react'
import Slider from '../../atoms/Slider'
import Dropdown from '../../atoms/Dropdown'
import { SPECIMEN_TEXT_ICELANDIC } from '../../atoms/foundry/specimenText'

/**
 * FontPreviewItemAlt - Alternative font preview component for Variable Font Section
 *
 * Simplified version of TypefaceVariablePreview designed to work as a controlled component
 * within VariableFontSection. Displays horizontal layout with Size/Leading/Spacing sliders
 * and editable preview text.
 *
 * Key differences from TypefaceVariablePreview:
 * - Weight controlled by parent (not internal state)
 * - No typeface name/label header
 * - Simpler prop interface (fontFamily, weight, fontStyle)
 * - Designed for side-by-side comparison with VariableFontDisplay
 *
 * @param {Object} props
 * @param {string} props.fontFamily - CSS font-family name (e.g., 'TGMalromur')
 * @param {number} props.weight - Font weight value (300-900)
 * @param {string} props.fontStyle - Font style ('normal' | 'italic')
 * @param {string} props.text - Default preview text
 */
const FontPreviewItemAlt = ({
  fontFamily = 'TGMalromur',
  weight = 400,
  fontStyle = 'normal',
  text = SPECIMEN_TEXT_ICELANDIC,
  initialWeight = 'Regular',
  initialSize = 64,
  initialLeading = 10,
  lineClamp = null,
  availableWeights = [
    'Thin', 'Extralight', 'Light',
    'Regular', 'Medium', 'Semibold',
    'Bold', 'Extrabold', 'Black'
  ]
}) => {
  // Internal state for typography controls
  const [size, setSize] = useState(initialSize)
  const [leading, setLeading] = useState(initialLeading) // 0-50 range, maps to 90-140%
  const [spacing, setSpacing] = useState(0)
  const editableRef = useRef(null)

  // Weight management
  const weightValues = {
    'Thin': 100,
    'Extralight': 200,
    'Light': 300,
    'Regular': 400,
    'Medium': 500,
    'Semibold': 600,
    'Bold': 700,
    'Extrabold': 800,
    'Black': 900
  }

  const [selectedWeight, setSelectedWeight] = useState(initialWeight)

  // Sync weight when header dropdown changes
  useEffect(() => {
    setSelectedWeight(initialWeight)
  }, [initialWeight])

  // Set initial text content
  useEffect(() => {
    if (editableRef.current && editableRef.current.textContent !== text) {
      editableRef.current.textContent = text
    }
  }, [text])

  const weightOptions = availableWeights.map((label) => ({
    label,
    value: label
  }))

  const numericWeight = weightValues[selectedWeight] || weight

  return (
    <div className="self-stretch min-h-40 p-6 rounded border border-fg-16 flex flex-col justify-start items-start gap-6 bg-surface-primary">
      {/* Controls Row: Weight Dropdown + Sliders */}
      <div className="self-stretch flex justify-start items-start gap-8">
        {/* Weight Dropdown - Left side */}
        <div className="flex-shrink-0">
          <Dropdown
            options={weightOptions}
            value={selectedWeight}
            onChange={setSelectedWeight}
            variant="minimal"
          />
        </div>

        {/* Sliders - Right side */}
        <div className="flex-1 flex justify-start items-start gap-8">
          {/* Size Slider - Always visible */}
          <Slider
            label="Size"
            min={12}
            max={200}
            value={size}
            onChange={setSize}
            variant="minimal"
            className="flex-1"
          />

          {/* Leading Slider - Hidden on mobile */}
          <Slider
            label="Leading"
            min={0}
            max={50}
            value={leading}
            onChange={setLeading}
            variant="minimal"
            className="hidden md:flex flex-1"
            formatValue={(val) => 90 + val}
          />

          {/* Spacing Slider - Hidden on mobile */}
          <Slider
            label="Spacing"
            min={-50}
            max={50}
            value={spacing}
            onChange={setSpacing}
            variant="minimal"
            className="hidden md:flex flex-1"
          />
        </div>
      </div>

      {/* Editable Preview Text with Multi-line Support */}
      <div className="self-stretch rounded flex justify-start items-start overflow-hidden">
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          className="flex-1 bg-transparent outline-none border-none"
          style={{
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            fontWeight: numericWeight,
            fontSize: `${size}px`,
            lineHeight: `${90 + leading}%`,
            letterSpacing: `${spacing}px`,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
            hyphens: 'none',
            maxWidth: '100%',
            ...(lineClamp && {
              display: '-webkit-box',
              WebkitLineClamp: lineClamp,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            })
          }}
        />
      </div>
    </div>
  )
}

export default FontPreviewItemAlt
