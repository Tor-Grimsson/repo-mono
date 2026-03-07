import { useState } from 'react'
import { Input, SearchInput } from '@kol/ui'
import DesSection from './DesSection'
import DesCard from './DesCard'

const sizes = [
  { id: 'sm', label: 'Small (28px)' },
  { id: 'md', label: 'Medium (32px)' },
  { id: 'lg', label: 'Large (36px)' }
]

export default function InputPreview() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const values = [value1, value2, value3]
  const setters = [setValue1, setValue2, setValue3]

  return (
    <div className="space-y-8">
      <DesSection
        name="Input"
        description="Form input component with size variants matching Button/Dropdown. Supports icons and uppercase text transform."
        details="Three sizes: sm (28px), md (32px), lg (36px) • Default: md • Optional left icon"
        code={'<Input type="text" placeholder="Enter text..." size="md" />'}
      />

      <DesCard
        name="Input"
        description="Form input component matching Button sizes"
      />

      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
          <div className="space-y-6 py-8">
            {sizes.map((s, i) => (
              <div key={s.id} className="space-y-2">
                <div className="kol-mono-xs text-fg-48">{s.label}</div>
                <Input
                  type="text"
                  placeholder="Enter text..."
                  size={s.id}
                  value={values[i]}
                  onChange={(e) => setters[i](e.target.value)}
                />
              </div>
            ))}
          </div>
      </div>

      <DesCard
        name="Search Input"
        description="Search field wrapping Input with a search icon. Shares Input size system."
        code={'<SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />'}
      />
      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search…"
          />
      </div>
    </div>
  )
}
