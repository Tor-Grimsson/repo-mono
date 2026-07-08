import { Slider, Icon } from '@kolkrabbi/kol-component'
import RotaryDial from './RotaryDial'

/**
 * SymphonyMixer - 3-channel mixer for Hall of Symphony
 *
 * Channels: DISPLACEMENT, MOVEMENT, COPIES
 * Per-channel: Rotary dial (0-100%), ON/OFF, BOOST, Randomness slider (0-10)
 */
export default function SymphonyMixer({
  // Displacement channel
  displacementValue = 0,
  onDisplacementChange,
  displacementEnabled = false,
  onDisplacementEnabledChange,
  displacementBoosted = false,
  onDisplacementBoostChange,
  displacementRandomness = 0,
  onDisplacementRandomnessChange,

  // Movement channel
  movementValue = 0,
  onMovementChange,
  movementEnabled = false,
  onMovementEnabledChange,
  movementBoosted = false,
  onMovementBoostChange,
  movementRandomness = 0,
  onMovementRandomnessChange,

  // Copies channel
  copiesValue = 0,
  onCopiesChange,
  copiesEnabled = false,
  onCopiesEnabledChange,
  copiesBoosted = false,
  onCopiesBoostChange,
  copiesRandomness = 0,
  onCopiesRandomnessChange,

  // Presets
  onSavePreset,
  onLoadPreset,

  // Mixer lock state
  isMixerLocked = false,
  onMixerLockChange,

  // Layout
  layout = 'row',
  onLayoutChange,

  // Nine variants
  nineVariants = {},
  openNineDropdown = null,
  onSelectVariant,
  onCloseDropdown
}) {
  const Channel = ({
    title,
    dialLabel,
    value,
    onChange,
    enabled,
    onEnabledChange,
    boosted,
    onBoostChange,
    randomness,
    onRandomnessChange,
    onLoadFromNine,
    onLoadFromSnap,
    channelId,
    isDropdownOpen
  }) => (
    <div
      className="flex flex-col items-center gap-6 p-6 bg-surface-secondary border border-fg-08 relative"
      style={{
        borderRadius: '4px',
        overflow: 'visible'
      }}
    >
      {/* Nine variants dropdown - minimal sidebar style */}
      {isDropdownOpen && (
        <div
          className="absolute top-0 left-0 w-full bg-surface-primary border border-fg-16 z-50"
          style={{ borderRadius: '4px' }}
        >
          {nineVariants[channelId]?.map((variant, index) => (
            <div
              key={variant.id}
              className="kol-mono-xs cursor-pointer px-3 py-1.5 text-fg-64 hover:text-fg-96 hover:bg-surface-secondary transition-all"
              style={{
                borderBottom: index < nineVariants[channelId].length - 1 ? '1px solid var(--kol-fg-08)' : 'none'
              }}
              onClick={(e) => {
                e.stopPropagation()
                onSelectVariant(channelId, variant.id)
              }}
            >
              {variant.name}
            </div>
          ))}
        </div>
      )}

      {/* Top row: Load icon (left) and ON/OFF indicator (right) */}
      <div className="w-full flex items-center justify-between">
        <div
          className="cursor-pointer select-none flex items-center justify-center p-1 border border-fg-16 textAbsoluteWhite hover:border-accent-primary hover:accentYellow transition-all"
          style={{ borderRadius: '4px' }}
          onClick={(e) => {
            e.stopPropagation()
            onLoadFromNine()
          }}
          title="Load from Nine"
        >
          <Icon name="save" size={16} />
        </div>
        <div
          className="cursor-pointer select-none flex items-center justify-center"
          onClick={() => onEnabledChange(!enabled)}
          title={enabled ? 'ON' : 'OFF'}
        >
          <div
            className="w-6 h-6 rounded-full border-2 border-fg-48 flex items-center justify-center"
          >
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                enabled ? 'bg-[#e74c3c]' : 'bg-fg-24'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Rotary dial - no label, no percentage */}
      <div className="flex items-center justify-center">
        <RotaryDial
          label=""
          value={value}
          onChange={onChange}
        />
      </div>

      {/* BOOST button */}
      <div
        className={`kol-mono-xs cursor-pointer select-none px-4 py-2 border ${
          boosted ? 'accentYellow border-accent-primary' : 'textAbsoluteWhite border-fg-24'
        }`}
        style={{ borderRadius: '4px' }}
        onClick={() => onBoostChange(!boosted)}
      >
        [{boosted ? 'BOOSTED' : 'BOOST'}]
      </div>

      {/* Randomness slider - minimal with values on ends */}
      <div className="w-full flex items-center gap-2">
        <div className="kol-mono-xs text-fg-48">0.0</div>
        <Slider
          label=""
          min={0}
          max={10}
          step={0.1}
          value={randomness}
          onChange={onRandomnessChange}
          className="flex-1"
          variant="minimal"
        />
        <div className="kol-mono-xs text-fg-48">0.0</div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-6" style={{ overflow: 'visible' }}>
      {/* 3 channels with studio depth */}
      <div
        className={`flex ${layout === 'row' ? 'flex-row' : 'flex-col'} gap-6`}
        style={{ overflow: 'visible' }}
      >
        <Channel
          title="Displacement"
          dialLabel="D"
          value={displacementValue}
          onChange={onDisplacementChange}
          enabled={displacementEnabled}
          onEnabledChange={onDisplacementEnabledChange}
          boosted={displacementBoosted}
          onBoostChange={onDisplacementBoostChange}
          randomness={displacementRandomness}
          onRandomnessChange={onDisplacementRandomnessChange}
          onLoadFromNine={() => onLoadPreset && onLoadPreset({ channel: 'displacement', source: 'nine' })}
          onLoadFromSnap={() => onLoadPreset && onLoadPreset({ channel: 'displacement', source: 'snap' })}
          channelId="displacement"
          isDropdownOpen={openNineDropdown === 'displacement'}
        />

        <Channel
          title="Movement"
          dialLabel="M"
          value={movementValue}
          onChange={onMovementChange}
          enabled={movementEnabled}
          onEnabledChange={onMovementEnabledChange}
          boosted={movementBoosted}
          onBoostChange={onMovementBoostChange}
          randomness={movementRandomness}
          onRandomnessChange={onMovementRandomnessChange}
          onLoadFromNine={() => onLoadPreset && onLoadPreset({ channel: 'movement', source: 'nine' })}
          onLoadFromSnap={() => onLoadPreset && onLoadPreset({ channel: 'movement', source: 'snap' })}
          channelId="movement"
          isDropdownOpen={openNineDropdown === 'movement'}
        />

        <Channel
          title="Copies"
          dialLabel="C"
          value={copiesValue}
          onChange={onCopiesChange}
          enabled={copiesEnabled}
          onEnabledChange={onCopiesEnabledChange}
          boosted={copiesBoosted}
          onBoostChange={onCopiesBoostChange}
          randomness={copiesRandomness}
          onRandomnessChange={onCopiesRandomnessChange}
          onLoadFromNine={() => onLoadPreset && onLoadPreset({ channel: 'copies', source: 'nine' })}
          onLoadFromSnap={() => onLoadPreset && onLoadPreset({ channel: 'copies', source: 'snap' })}
          channelId="copies"
          isDropdownOpen={openNineDropdown === 'copies'}
        />
      </div>

      {/* Mixer title with layout and lock toggles - bottom */}
      <div className="flex items-center justify-between">
        <div className="kol-heading-s text-fg-96">Effect Mixer</div>
        <div className="flex gap-3">
          <div
            className="kol-mono-xs cursor-pointer select-none textAbsoluteWhite hover:accentYellow"
            onClick={() => onLayoutChange && onLayoutChange(layout === 'row' ? 'col' : 'row')}
          >
            [{layout === 'row' ? 'ROW' : 'COL'}]
          </div>
          <div
            className={`kol-mono-xs cursor-pointer select-none ${isMixerLocked ? 'accentYellow' : 'textAbsoluteWhite'}`}
            onClick={() => onMixerLockChange && onMixerLockChange(!isMixerLocked)}
          >
            [{isMixerLocked ? 'LOCKED' : 'DRAG'}]
          </div>
        </div>
      </div>
    </div>
  )
}
