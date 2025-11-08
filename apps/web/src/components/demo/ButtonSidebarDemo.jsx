import { useState } from 'react'
import { SidebarMenuItem, Divider } from '@kol/ui'
import { WORKSHOP_ROUTES } from '../../data/workshop/navigation.js'

const ICON_MAP = {
  styleguide: 'styleguide',
  foundations: 'foundation',
  components: 'component'
}

const getIconName = (route) => route?.icon || ICON_MAP[route?.id] || 'styleguide'

const ButtonSidebarDemo = () => {
  const sampleGroups = WORKSHOP_ROUTES.slice(0, 3)
  const [expanded, setExpanded] = useState(
    sampleGroups.reduce((acc, route) => {
      if (route.id === 'foundations') {
        acc[route.id] = true
      }
      return acc
    }, {})
  )

  const toggleGroup = (id) =>
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))

  return (
    <div className="flex flex-col gap-4 rounded border border-fg-08 bg-surface-secondary/30 p-6">
      <div className="space-y-2">
        <p className="kol-mono-xs uppercase text-fg-48 tracking-[0.2em]">
          Button Wrapper Pattern
        </p>
        <p className="kol-mono-sm-fine text-fg-64">
          Current `SidebarMenuItem` approach: button controls wrapping child list, styles handled via CSS module.
        </p>
      </div>

      <Divider className="opacity-60" />

      <div className="flex flex-col gap-2">
        {sampleGroups.map((route) => {
          const isExpanded = Boolean(expanded[route.id])
          return (
            <SidebarMenuItem
              key={route.id}
              label={route.label}
              icon={getIconName(route)}
              isCollapsed={false}
              hasChildren={Array.isArray(route.children) && route.children.length > 0}
              isExpanded={isExpanded}
              onClick={() => toggleGroup(route.id)}
              children={route.children}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ButtonSidebarDemo
