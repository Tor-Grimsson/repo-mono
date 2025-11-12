import { useState } from 'react'
import TextPressureHero from '../components/react-bits/TextPressureHero'

export default function TextPressureTest() {
  const [text, setText] = useState('KOLKRABBI')
  const [returnToDefault, setReturnToDefault] = useState(true)

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--kol-surface-primary)',
      color: 'var(--kol-fg-primary)'
    }}>
      {/* Header Controls */}
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-4 p-4 bg-surface-secondary rounded">
        <div className="flex items-center gap-2">
          <label className="kol-mono-sm text-fg-88">
            <input
              type="checkbox"
              checked={returnToDefault}
              onChange={(e) => setReturnToDefault(e.target.checked)}
              className="mr-2"
            />
            Return to default
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <label className="kol-mono-xs text-fg-64">Text:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            className="px-2 py-1 bg-surface-primary border border-fg-24 rounded kol-mono-sm"
            maxLength={20}
          />
        </div>

        <div className="kol-mono-xs text-fg-48">
          Mode: {returnToDefault ? 'Return to default' : 'Freeze in place'}
        </div>
      </div>

      {/* Test Container - Using TextPressureHero component */}
      <TextPressureHero
        text={text}
        returnToDefault={returnToDefault}
        showDebugBorder={true}
      />

      {/* Info Panel */}
      <div className="fixed bottom-4 right-4 z-50 w-80 p-4 bg-surface-secondary rounded">
        <h3 className="kol-heading-xs mb-2">TextPressure Test</h3>
        <p className="kol-mono-xs text-fg-64 mb-2">
          Move your mouse over the text to see the variable font axes respond to cursor proximity.
        </p>
        <ul className="kol-mono-xs text-fg-48 list-disc list-inside space-y-1">
          <li>Weight: 100-900</li>
          <li>Width: 5-200</li>
          <li>Interactive smoothing</li>
        </ul>
      </div>
    </div>
  )
}
