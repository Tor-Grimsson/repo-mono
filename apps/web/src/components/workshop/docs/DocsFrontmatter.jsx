import { Icon } from '@kol/ui'
import { getTagColor } from '../../../utils/docsHelpers'
import { useTagMode } from './TagModeContext'

const FIELD_ICONS = {
  file: 'file-text',
  title: 'type',
  version: 'hash',
  date: 'calendar',
  status: 'check-circle',
  'content-type': 'layers',
  category: 'folder',
  tags: 'tag',
  modified: 'clock'
}

const FIELD_ORDER = ['title', 'category', 'date', 'tags', 'modified']

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
      <p className="shell-sidebar-label">Frontmatter</p>
      {fields.map((key) => {
        const value = metadata[key]
        const icon = FIELD_ICONS[key] || 'minus'

        return (
          <div key={key} className="docs-frontmatter-row">
            <span className="docs-frontmatter-key">
              <Icon name={icon} size={14} />
              {key}
            </span>
            <span className="docs-frontmatter-value">
              {key === 'tags' && Array.isArray(value) ? (
                <span className="flex flex-wrap gap-1.5">
                  {value.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => openTagMode(tag)}
                      className={`tag tag--${getTagColor(tag)}`}
                    >
                      {tag}
                    </button>
                  ))}
                </span>
              ) : key === 'date' || key === 'modified' ? (
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
