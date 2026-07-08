import { useState } from 'react'
import { Dropdown, DropdownTagFilter } from '@kolkrabbi/kol-component'
import { DropdownFixed } from '@kol/ui'
import DesSection from '../molecules/DesSection'

const dropdownOptions = [
  { label: 'Regular', value: 'regular' },
  { label: 'Medium', value: 'medium' },
  { label: 'Bold', value: 'bold' }
]

const tagFilterOptions = [
  { label: 'Design', value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Research', value: 'research' },
  { label: 'Strategy', value: 'strategy' }
]

export default function DropdownPreview() {
  const [value, setValue] = useState('regular')
  const [dropdownValue, setDropdownValue] = useState('regular')
  const [tagFilterSelected, setTagFilterSelected] = useState(
    new Set(tagFilterOptions.map(o => o.value))
  )

  const handleTagFilterChange = (val) => {
    if (val === null) {
      setTagFilterSelected(new Set())
    } else {
      setTagFilterSelected(prev => {
        const next = new Set(prev)
        if (next.has(val)) next.delete(val)
        else next.add(val)
        return next
      })
    }
  }

  return (
    <div className="space-y-8">
      <DesSection
        name="Dropdown"
        description="Selection controls — fixed dropdown and tag filter variants."
      />

      <div className="space-y-6 py-8 p-4 rounded bg-surface-primary border border-auto">
        <Dropdown
          options={dropdownOptions}
          value={dropdownValue}
          onChange={setDropdownValue}
        />
        <DropdownFixed
          options={dropdownOptions}
          value={value}
          onChange={setValue}
        />
        <DropdownTagFilter
          options={tagFilterOptions}
          selectedValues={tagFilterSelected}
          onChange={handleTagFilterChange}
        />
      </div>
    </div>
  )
}
