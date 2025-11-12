import { useState } from 'react'
import Extraction from './Extraction'

/**
 * EditableMetricsViewer
 *
 * Combines editable text input with the Extraction metrics viewer.
 * Users can type any character/word and see the metrics displayed below.
 */
const EditableMetricsViewer = ({
  fontUrl,
  defaultText = 'f',
  height = 600,
  className = ''
}) => {
  const [inputText, setInputText] = useState(defaultText)
  const [displayGlyph, setDisplayGlyph] = useState(defaultText)

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputText(value)

    // Update display glyph - use first character or default
    if (value.length > 0) {
      setDisplayGlyph(value.charAt(0))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // Use first character of input for metrics display
      if (inputText.length > 0) {
        setDisplayGlyph(inputText.charAt(0))
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div className="space-y-2">
        <label htmlFor="glyph-input" className="kol-mono-sm text-auto opacity-60">
          Type a character to inspect metrics
        </label>
        <input
          id="glyph-input"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type any character..."
          className="w-full px-4 py-3 bg-surface-primary border border-fg-16 rounded text-auto kol-mono-text focus:outline-none focus:border-fg-32 transition-colors"
          maxLength={10}
        />
        <p className="kol-mono-xs text-auto opacity-40">
          Press Enter or type to update metrics view
        </p>
      </div>

      {/* Metrics Viewer */}
      <Extraction
        fontUrl={fontUrl}
        glyph={displayGlyph}
        height={height}
        className={className}
      />
    </div>
  )
}

export default EditableMetricsViewer
