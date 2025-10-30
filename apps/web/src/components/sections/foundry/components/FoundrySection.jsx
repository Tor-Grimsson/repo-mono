import { Button, Dropdown, Divider } from '@kol/ui'

const FoundrySection = ({
  selectedStyle,
  onStyleChange,
  variant = 'badge',
  label,
  showDropdown = true
}) => {
  const styleOptions = [
    { label: 'Roman', value: 'roman' },
    { label: 'Italic', value: 'italic' }
  ]

  return (
    <>
      {/* Header with badge/label and optional dropdown */}
      <div className="w-full flex flex-row justify-between items-center gap-4">
        {/* Left: Badge or Label */}
        {variant === 'badge' ? (
          <Button variant="primary" iconRight="foundation" className="pointer-events-none">
            Málrómur Aa
          </Button>
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
