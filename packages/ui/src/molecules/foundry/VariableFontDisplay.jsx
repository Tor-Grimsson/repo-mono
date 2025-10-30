import { Slider, Pill, PlayPauseButton } from '../../atoms/index.js'

/**
 * VariableFontDisplay - Interactive variable font demonstration
 *
 * Foundry molecule that displays a large text specimen with variable font
 * controls overlaid on top. Features animation toggle and weight adjustment.
 *
 * @param {Object} props
 * @param {string} props.text - Display text (default: "Variable")
 * @param {number} props.weight - Current font weight (300-900)
 * @param {Function} props.onWeightChange - Callback when weight changes
 * @param {number} props.minWeight - Minimum weight value (default: 300)
 * @param {number} props.maxWeight - Maximum weight value (default: 900)
 * @param {boolean} props.isAnimating - Whether animation is active
 * @param {Function} props.onToggleAnimation - Callback to toggle animation
 * @param {string} props.fontStyle - Font style: 'normal' or 'italic' (default: 'italic')
 * @param {string} props.fontFamily - Font family name (default: 'TGMalromur')
 * @param {string} props.height - Height class (default: 'h-[60vh]')
 * @param {string} props.className - Additional classes
 */
const VariableFontDisplay = ({
  text = 'Variable',
  weight = 400,
  onWeightChange,
  minWeight = 300,
  maxWeight = 900,
  isAnimating = false,
  onToggleAnimation,
  fontStyle = 'italic',
  fontFamily = 'TGMalromur',
  height = 'h-[60vh]',
  className = ''
}) => {
  return (
    <div className={`foundryCard foundryCardPadded w-full ${height} p-10 relative ${className}`.trim()}>
      {/* Variable Text Example - Absolutely positioned behind */}
      <p
        className="absolute inset-0 flex items-center justify-center text-[80px] md:text-[144px] transition-colors duration-300"
        style={{
          fontFamily: fontFamily,
          fontWeight: weight,
          fontStyle: fontStyle,
          color: 'var(--kol-surface-on-primary)',
        }}
      >
        {text}
      </p>

      {/* Controls - Flex layout on top */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Top Row - Axis label and pill */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="kol-mono-xxs text-fg-32">AXIS:</span>
            <span className="kol-helper-uc-xxs text-auto">WEIGHT</span>
          </div>
          <Pill variant="subtle">--vari {weight}</Pill>
        </div>

        {/* Bottom Row - Play/Pause + Slider */}
        <div className="flex items-center gap-4">
          <PlayPauseButton
            isPlaying={isAnimating}
            onToggle={onToggleAnimation}
          />
          <Slider
            min={minWeight}
            max={maxWeight}
            value={weight}
            onChange={onWeightChange}
            className="w-full"
            variant="minimal"
          />
        </div>
      </div>
    </div>
  )
}

export default VariableFontDisplay
