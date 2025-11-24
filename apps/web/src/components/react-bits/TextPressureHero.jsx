import TextPressureNew from './TextPressureNew'

/**
 * Production-ready TextPressure component with optimized settings
 * Container: 600x200px with red outline for visual debugging
 * Font: TG Root-Tune variable font
 * Animation: Width (5-150) + Weight (100-900), hover-activated
 */
export default function TextPressureHero({
  text = 'KOLKRABBI',
  returnToDefault = false, // Freeze mode by default
  containerWidth = '600px',
  containerHeight = '200px',
  showDebugBorder = true
}) {
  return (
    <div style={{
      width: containerWidth,
      height: containerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: showDebugBorder ? '2px solid red' : 'none',
      borderRadius: '8px'
    }}>
      <TextPressureNew
        text={text}
        fontFamily="TG Root-Tune"
        fontUrl="/fonts/TGRoot-TuneVF.ttf"
        textColor="var(--kol-fg-primary)"
        flex={false}
        width={true}
        weight={true}
        italic={false}
        minFontSize={32}
        maxFontSize={100}
        returnToDefault={returnToDefault}
      />
    </div>
  )
}
