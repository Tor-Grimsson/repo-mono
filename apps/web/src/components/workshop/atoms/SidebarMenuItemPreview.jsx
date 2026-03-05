import { useState } from 'react'
import { SidebarMenuItem } from '@kol/ui'
import DesSection from '../molecules/DesSection'

export default function SidebarMenuItemPreview() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-8">
      <DesSection
        name="Sidebar Menu Item"
        description="Navigation item with support for links, expandable groups, and collapsed icon-only state."
      />

      <div className="py-8 p-4 rounded bg-surface-primary border border-auto">
        <div className="w-64 space-y-1">
          <SidebarMenuItem label="Dashboard" icon="component" to="#" />
          <SidebarMenuItem
            label="Components"
            icon="component"
            hasChildren
            isExpanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            children={[
              { id: 'child-1', label: 'Overview', path: '#', icon: 'component' },
              { id: 'child-2', label: 'Settings', path: '#', icon: 'component' }
            ]}
          />
        </div>
      </div>
    </div>
  )
}
