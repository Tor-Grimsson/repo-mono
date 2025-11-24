/**
 * UnitSelector - Toggle between pixel and rem units
 *
 * @param {string} activeUnit - Current active unit ('px' or 'rem')
 * @param {Function} onUnitChange - Callback when unit changes
 */
export default function UnitSelector({ activeUnit, onUnitChange }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onUnitChange('px')}
        className={`px-4 py-2 kol-helper-uc-xs transition-colors ${
          activeUnit === 'px' ? 'bg-surface-inverse text-auto' : 'bg-container-primary text-auto'
        }`}
      >
        Pixels
      </button>
      <button
        onClick={() => onUnitChange('rem')}
        className={`px-4 py-2 kol-helper-uc-xs transition-colors ${
          activeUnit === 'rem' ? 'bg-surface-inverse text-auto' : 'bg-container-primary text-auto'
        }`}
      >
        Rem
      </button>
    </div>
  )
}
