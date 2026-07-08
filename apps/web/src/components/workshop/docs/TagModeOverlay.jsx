import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Input, Tag } from '@kolkrabbi/kol-component'
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
    let tags = allTagsWithCount.filter(({ tag }) => !activeTags.includes(tag))
    if (search.trim()) {
      const q = search.toLowerCase()
      tags = tags.filter(({ tag }) => tag.toLowerCase().includes(q))
    }
    return tags
  }, [allTagsWithCount, search, activeTags])

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
      <div className="max-w-[864px] mx-auto">
        <div className="flex items-center justify-start gap-1 mb-3">
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

        <div className="dash-card flex flex-col gap-8 -mt-4">
          <div className="flex items-center gap-2" style={{ width: '100%', alignSelf: 'stretch' }}>
            <Input
              type="text"
              placeholder="Search tags…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && visibleTags.length > 0) {
                  toggleTag(visibleTags[0].tag)
                  setSearch('')
                }
              }}
              size="md"
              iconLeft="search-16"
              className="w-full"
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

          <div className="flex flex-col gap-4 px-10">
            {hasFilters && (
              <>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-fg-48 kol-mono-xs transition-colors hover:text-fg-96"
                    onClick={clearTags}
                  >
                    clear filters
                  </button>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {activeTags.map((tag) => (
                      <Tag
                        key={tag}
                        variant="solid"
                        color={getTagColor(tag)}
                        size="md"
                        onRemove={() => removeTag(tag)}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
                <div className="border-t border-fg-08 my-4" />
              </>
            )}

            {hasFilters && viewMode === 'graph' ? (
              <div>
                <TagGraph
                  docs={filteredDocs}
                  allDocs={documentationInventory}
                  activeTag={activeTag}
                  onTagClick={(tag) => toggleTag(tag)}
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  {visibleTags.map(({ tag, count }) => (
                    <button
                      key={tag}
                      type="button"
                      className={`tag-list-item${activeTags.includes(tag) ? ' active' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      <span>{tag}</span>
                      <span className="tag-list-count">{count}</span>
                    </button>
                  ))}
                  {visibleTags.length === 0 && (
                    <p className="text-fg-48 kol-mono-xs py-4">No tags matching "{search}"</p>
                  )}
                </div>

                {hasFilters && filteredDocs.length > 0 && (
                  <div className="flex flex-col pt-4 border-t border-fg-08">
                    {filteredDocs.map((d) => (
                      <Link
                        key={d.id}
                        to={`/workshop/docs/${d.id}`}
                        className="tag-list-item"
                        onClick={closeTagMode}
                      >
                        <span>{cleanTitle(d.title, d.id)}</span>
                        <span className="tag-list-count">{extractDocNumber(d.id)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DocsArticle>
  )
}

export default TagModeOverlay
