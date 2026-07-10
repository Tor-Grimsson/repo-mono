import { Icon, Tag } from '@kolkrabbi/kol-component'
import { getTagColor } from '../engine'
import { useTagMode } from '../tags'

const FIELD_ICONS = {
  title: null,
  type: 'folder',
  status: 'check',
  updated: null,
  tags: null
}

const FIELD_ORDER = ['title', 'type', 'status', 'updated', 'tags']

const formatDate = (dateStr) => {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')
}

const DocsFrontmatter = ({ metadata, docId }) => {
  const { openTagMode } = useTagMode()
  if (!metadata || Object.keys(metadata).length === 0) return null

  const fields = FIELD_ORDER.filter(key => metadata[key] != null && metadata[key] !== '')

  if (fields.length === 0) return null

  return (
    <div className="docs-frontmatter">
      <p className="shell-sidebar-label kol-helper-10 text-meta">Frontmatter</p>
      {fields.map((key) => {
        const value = metadata[key]
        const icon = FIELD_ICONS[key]

        return (
          <div key={key} className="docs-frontmatter-row">
            <span className="docs-frontmatter-key kol-helper-12 text-meta">
              {icon && <Icon name={icon} size={14} />}
              {key}
            </span>
            <span className="kol-mono-12 text-strong">
              {key === 'tags' && Array.isArray(value) ? (
                <span className="flex flex-wrap gap-1.5">
                  {value.map((tag) => (
                    <Tag
                      key={tag}
                      size="sm"
                      color={getTagColor(tag)}
                      onClick={() => openTagMode(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </span>
              ) : key === 'updated' ? (
                formatDate(String(value))
              ) : (
                String(value)
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default DocsFrontmatter
