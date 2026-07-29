import { Dropdown, Divider } from '@kolkrabbi/kol-component'
import { Icon } from '@kolkrabbi/kol-icons'
import SectionTitle from '../../../components/ui/SectionTitle.jsx'

const FoundrySection = ({
  label,
  badgeText,
  icon,
  size = 'lg',
  selectedStyle,
  onStyleChange,
  showDropdown = true,
  styleOptions = [
    { label: 'Roman', value: 'roman' },
    { label: 'Italic', value: 'italic' }
  ],
  selectedWeight,
  onWeightChange,
  showWeightDropdown = true,
  weightOptions = []
}) => {
  const title = label || badgeText
  const titleClass = size === 'sm' ? 'kol-mono-12' : 'kol-mono-16'

  return (
    <div className="flex flex-col gap-[13px]">
      <div className="w-full flex flex-row justify-between items-end gap-4">
        {/* Left: Title + optional icon */}
        <SectionTitle icon={icon}>{title}</SectionTitle>

        {/* Right: Dropdowns */}
        <div className="flex items-center gap-4">
          {showWeightDropdown && weightOptions.length > 0 && (
            <Dropdown
              options={weightOptions}
              value={selectedWeight}
              onChange={onWeightChange}
            />
          )}
          {showDropdown && (
            <Dropdown
              options={styleOptions}
              value={selectedStyle}
              onChange={onStyleChange}
            />
          )}
        </div>
      </div>

      <Divider variant="horizontal" />
    </div>
  )
}

export default FoundrySection
