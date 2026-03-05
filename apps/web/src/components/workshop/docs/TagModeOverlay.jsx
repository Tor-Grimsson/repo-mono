import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, SearchInput } from '@kol/ui'
import { useTagMode } from './TagModeContext'
import { DocsArticle } from './index'
import TagGraph from './TagGraph'
import { documentationInventory } from '../../../data/workshop/documentationInventory'
import { extractDocNumber, cleanTitle, getTagColor } from '../../../utils/docsHelpers'

const TagModeOverlay = () => {
  const { activeTags, activeTag, toggleTag, removeTag, clearTags, closeTagMode } = useTagMode()
  const [viewMode, setViewMode] = useState('list')
  const [search, setSearch] = useState('')

  const allTagsWithCount = useMemo(() => {
    const counts = {}
    documentationInventory.forEach((d) => {
      if (Array.isArray(d.metadata?.tags)) {
        d.metadata.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1 })
      }
    })
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }, [])

  const visibleTags = useMemo(() => {
    if (!search.trim()) return allTagsWithCount
    const q = search.toLowerCase()
    return allTagsWithCount.filter(({ tag }) => tag.toLowerCase().includes(q))
  }, [allTagsWithCount, search])

  const filteredDocs = useMemo(() => {
    if (activeTags.length === 0) return []
    return documentationInventory.filter((d) => {
      if (!Array.isArray(d.metadata?.tags)) return false
      return activeTags.every((t) => d.metadata.tags.includes(t))
    })
  }, [activeTags])

  const hasFilters = activeTags.length > 0

  return (
    <DocsArticle>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="flex items-center justify-end gap-1 mb-3">
          {hasFilters && (
            <button
              type="button"
              className="shell-sidebar-action"
              style={{ width: 'auto' }}
              onClick={() => setViewMode(viewMode === 'graph' ? 'list' : 'graph')}
            >
              <Icon name={viewMode === 'graph' ? 'list' : 'share-2'} size={14} />
            </button>
          )}
          <button
            type="button"
            className="shell-sidebar-action"
            style={{ width: 'auto' }}
            onClick={closeTagMode}
          >
            <Icon name="x" size={14} />
          </button>
        </div>

        <div className="shell-tab-search-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
          <Icon name="search-16" size={14} />
          <input
            type="text"
            placeholder="Search tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="shell-tab-search"
            style={{ flex: 1, width: '100%' }}
            autoFocus
          />
          {search && (
            <button
              type="button"
              className="flex items-center text-fg-48 transition-colors hover:text-fg"
              onClick={() => setSearch('')}
            >
              <Icon name="x" size={14} />
            </button>
          )}
        </div>

        {hasFilters && (
          <div className="flex items-center justify-between mt-4 pb-4 border-b border-fg-8">
            <button
              type="button"
              className="text-fg-48 kol-mono-xs transition-colors hover:text-fg"
              onClick={clearTags}
            >
              clear filters
            </button>
            <div className="flex flex-wrap items-center gap-1.5">
              {activeTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`tag tag--${getTagColor(tag)} tag-sm cursor-pointer`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  onClick={() => removeTag(tag)}
                >
                  <span style={{ fontSize: 10, lineHeight: 1 }}>x</span>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasFilters && viewMode === 'graph' ? (
          <div className="mt-6">
            <TagGraph
              docs={filteredDocs}
              allDocs={documentationInventory}
              activeTag={activeTag}
              onTagClick={(tag) => toggleTag(tag)}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col mt-4" style={{ paddingLeft: 24 }}>
              {visibleTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  type="button"
                  className={`docs-tag-list-item${activeTags.includes(tag) ? ' active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  <span>#{tag}</span>
                  <span className="docs-tag-list-count">{count}</span>
                </button>
              ))}
              {visibleTags.length === 0 && (
                <p className="text-fg-48 kol-mono-xs py-4">No tags matching "{search}"</p>
              )}
            </div>

            {hasFilters && filteredDocs.length > 0 && (
              <div className="flex flex-col mt-6 pt-6 border-t border-fg-8">
                {filteredDocs.map((d) => (
                  <Link
                    key={d.id}
                    to={`/workshop/docs/${d.id}`}
                    className="docs-tag-list-item"
                    onClick={closeTagMode}
                  >
                    <span>{cleanTitle(d.title, d.id)}</span>
                    <span className="docs-tag-list-count">{extractDocNumber(d.id)}</span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DocsArticle>
  )
}

export default TagModeOverlay
