import { Dropdown, Divider, Icon } from '@kol/ui'

const FoundrySection = ({
  selectedStyle,
  onStyleChange,
  variant = 'badge',
  label,
  showDropdown = true,
  styleOptions = [
    { label: 'Roman', value: 'roman' },
    { label: 'Italic', value: 'italic' }
  ],
  badgeText = 'Málrómur Aa'
}) => {

  return (
    <>
      {/* Header with badge/label and optional dropdown */}
      <div className="w-full flex flex-row justify-between items-end gap-4">
        {/* Left: Badge or Label */}
        {variant === 'badge' ? (
          <div className="flex items-center gap-4">
            <span className="kol-mono-text-lg">{badgeText}</span>
            <Icon name="foundation" size={20} />
          </div>
        ) : (
          <span className="kol-label-compact-lg">{label}</span>
        )}

        {/* Right: Style dropdown (optional) */}
        {showDropdown && (
          <Dropdown
            options={styleOptions}
            value={selectedStyle}
            onChange={onStyleChange}
          />
        )}
      </div>

      <Divider variant="horizontal" />
    </>
  )
}

export default FoundrySection
