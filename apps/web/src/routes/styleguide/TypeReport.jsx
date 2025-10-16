import { useState } from 'react'
import GuideCard from '../../components/styleguide/atoms/GuideCard'
import { typeAuditData } from '../../data/styleguide/typeAudit'
import { useStyleguideExpansion } from './StyleguideExpansionContext'

const TypeReport = () => {
  const [expandedSections, setExpandedSections] = useStyleguideExpansion('type-report', {})
  const [filterType, setFilterType] = useState('all') // 'all', 'issues', 'inline'

  const toggleSection = (pageId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [pageId]: !prev[pageId]
    }))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'var(--status-danger)'
      case 'medium':
        return 'var(--accent-primary)'
      case 'low':
        return 'var(--foreground-muted)'
      default:
        return 'var(--foreground)'
    }
  }

  const getBadgeStyle = (type) => {
    if (type === 'class') {
      return {
        bg: 'var(--surface-secondary)',
        text: 'var(--foreground)',
        label: '🟢 Class'
      }
    } else if (type === 'inline') {
      return {
        bg: 'var(--accent-primary-muted)',
        text: 'var(--foreground)',
        label: '🟡 Inline'
      }
    } else if (type === 'component') {
      return {
        bg: 'var(--surface-tertiary)',
        text: 'var(--foreground)',
        label: '🔵 Component'
      }
    } else {
      return {
        bg: 'var(--surface-secondary)',
        text: 'var(--foreground-muted)',
        label: '⚪ Mixed'
      }
    }
  }

  const hasIssues = (element) => {
    return element.issues && element.issues.length > 0
  }

  const filteredPages = typeAuditData.pages.map((page) => ({
    ...page,
    sections: page.sections.map((section) => ({
      ...section,
      elements: section.elements.filter((element) => {
        if (filterType === 'all') return true
        if (filterType === 'issues') return hasIssues(element)
        if (filterType === 'inline') return element.styling === 'inline'
        return true
      })
    }))
  }))

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="kol-heading-section">Type Report</h2>
        <p className="kol-mono-text mt-4">
          Comprehensive audit of typography usage across all pages and components in kolkrabbi-monorepo.
        </p>
      </div>

      {/* Summary Dashboard */}
      <GuideCard>
        <h3 className="kol-heading-md mb-6">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <div className="kol-heading-section" style={{ lineHeight: '1' }}>
              {typeAuditData.summary.totalPages}
            </div>
            <div className="kol-mono-xs text-xs opacity-60">Pages</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="kol-heading-section" style={{ lineHeight: '1' }}>
              {typeAuditData.summary.totalElements}
            </div>
            <div className="kol-mono-xs text-xs opacity-60">Elements</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="kol-heading-section" style={{ lineHeight: '1', color: 'var(--accent-primary)' }}>
              {Math.round((typeAuditData.summary.classUsage / typeAuditData.summary.totalElements) * 100)}%
            </div>
            <div className="kol-mono-xs text-xs opacity-60">Class Usage</div>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className="kol-heading-section"
              style={{ lineHeight: '1', color: typeAuditData.summary.issueCount > 0 ? 'var(--status-danger)' : 'var(--accent-primary)' }}
            >
              {typeAuditData.summary.issueCount}
            </div>
            <div className="kol-mono-xs text-xs opacity-60">Issues</div>
          </div>
        </div>

        {/* Font Distribution */}
        <div className="mt-8">
          <h4 className="kol-heading-sm mb-4">Font Families in Use</h4>
          <div className="flex flex-wrap gap-2">
            {typeAuditData.summary.uniqueFonts.map((font) => (
              <span
                key={font}
                className="pill-subtle"
              >
                {font}
              </span>
            ))}
          </div>
        </div>
      </GuideCard>

      {/* Filter Controls */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterType('all')}
          className={`control-unified cursor-pointer ${filterType === 'all' ? 'is-active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('issues')}
          className={`control-unified cursor-pointer ${filterType === 'issues' ? 'is-active' : ''}`}
        >
          Issues Only ({typeAuditData.summary.issueCount})
        </button>
        <button
          onClick={() => setFilterType('inline')}
          className={`control-unified cursor-pointer ${filterType === 'inline' ? 'is-active' : ''}`}
        >
          Inline Styles ({typeAuditData.summary.inlineUsage})
        </button>
      </div>

      {/* Common Issues Summary */}
      <GuideCard>
        <h3 className="kol-heading-md mb-4">Common Issues</h3>
        <div className="space-y-4">
          {typeAuditData.issues.map((issue, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderLeft: `4px solid ${getSeverityColor(issue.severity)}`
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-xs uppercase px-2 py-1 rounded"
                  style={{
                    backgroundColor: getSeverityColor(issue.severity),
                    color: 'white',
                    opacity: 0.9
                  }}
                >
                  {issue.severity}
                </span>
                <div className="flex-1">
                  <div className="kol-text font-medium mb-1">{issue.type}</div>
                  <div className="kol-text-sm opacity-80 mb-2">{issue.description}</div>
                  <div className="kol-mono-xs text-xs opacity-60">
                    {issue.count} occurrences
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GuideCard>

      {/* Page-by-Page Breakdown */}
      <div>
        <h3 className="kol-heading-md mb-4">Page-by-Page Breakdown</h3>
        <div className="space-y-4">
          {filteredPages.map((page) => (
            <GuideCard key={page.id} padding="none">
              {/* Page Header - Clickable */}
              <div
                onClick={() => toggleSection(page.id)}
                className="p-6 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ borderBottom: expandedSections[page.id] ? '1px solid var(--surface-border)' : 'none' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="kol-heading-sm">{page.name}</h4>
                    <p className="kol-mono-xs text-xs opacity-60 mt-1">{page.route}</p>
                  </div>
                  <div className="text-2xl" style={{ transform: expandedSections[page.id] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    ▼
                  </div>
                </div>
              </div>

              {/* Page Sections - Collapsible */}
              {expandedSections[page.id] && (
                <div className="p-6 space-y-6">
                  {page.sections.map((section) => {
                    if (section.elements.length === 0 && filterType !== 'all') return null

                    return (
                      <div key={section.id} className="space-y-3">
                        {/* Section Header */}
                        <div className="flex items-start justify-between pb-2" style={{ borderBottom: '1px solid var(--surface-border)' }}>
                          <div>
                            <div className="kol-text font-medium">{section.name}</div>
                            <code className="kol-mono-xs text-xs opacity-40">{section.component}</code>
                          </div>
                        </div>

                        {/* Elements Table */}
                        {section.elements.length > 0 ? (
                          <div className="space-y-2">
                            {section.elements.map((element, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded"
                                style={{
                                  backgroundColor: hasIssues(element) ? 'var(--status-danger-muted)' : 'var(--surface-secondary)'
                                }}
                              >
                                <div className="flex flex-col gap-2">
                                  {/* Element Type & Styling Badge */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <code className="kol-mono-xs text-xs opacity-60">&lt;{element.type}&gt;</code>
                                    <span
                                      className="text-xs px-2 py-1 rounded"
                                      style={{
                                        backgroundColor: getBadgeStyle(element.styling).bg,
                                        color: getBadgeStyle(element.styling).text
                                      }}
                                    >
                                      {getBadgeStyle(element.styling).label}
                                    </span>
                                    {element.className && (
                                      <code className="kol-mono-xs text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--surface-tertiary)' }}>
                                        .{element.className}
                                      </code>
                                    )}
                                    {element.lines && (
                                      <span className="kol-mono-xs text-xs opacity-40">
                                        L{Array.isArray(element.lines) ? element.lines.join(', ') : element.lines}
                                      </span>
                                    )}
                                  </div>

                                  {/* Text Sample */}
                                  {element.text && (
                                    <div className="kol-text-sm opacity-80 italic">"{element.text}"</div>
                                  )}

                                  {/* Font Details */}
                                  {element.fontFamily && (
                                    <div className="flex gap-4 flex-wrap text-xs">
                                      <span className="kol-mono-xs opacity-60">
                                        Font: <span className="opacity-100">{element.fontFamily}</span>
                                      </span>
                                      {element.fontSize && (
                                        <span className="kol-mono-xs opacity-60">
                                          Size:{' '}
                                          <span className="opacity-100">
                                            {typeof element.fontSize === 'object' && element.fontSize.mobile
                                              ? `${element.fontSize.mobile} → ${element.fontSize.desktop}`
                                              : element.fontSize}
                                          </span>
                                        </span>
                                      )}
                                      {element.lineHeight && (
                                        <span className="kol-mono-xs opacity-60">
                                          LH: <span className="opacity-100">{element.lineHeight}</span>
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Inline Styles */}
                                  {element.inlineStyles && (
                                    <details className="kol-mono-xs text-xs opacity-60">
                                      <summary className="cursor-pointer hover:opacity-100">Inline Styles</summary>
                                      <pre className="mt-2 p-2 rounded overflow-x-auto" style={{ backgroundColor: 'var(--surface-tertiary)' }}>
                                        {JSON.stringify(element.inlineStyles, null, 2)}
                                      </pre>
                                    </details>
                                  )}

                                  {/* Issues */}
                                  {hasIssues(element) && (
                                    <div className="space-y-1">
                                      {element.issues.map((issue, issueIdx) => (
                                        <div key={issueIdx} className="kol-text-sm flex items-start gap-2">
                                          <span>{issue}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Notes */}
                                  {element.notes && (
                                    <div className="kol-text-sm opacity-60">
                                      💡 {element.notes}
                                    </div>
                                  )}

                                  {/* Status Badge */}
                                  {element.status && (
                                    <span className="kol-mono-xs text-xs opacity-40 uppercase">
                                      Status: {element.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="kol-mono-text text-center py-4 opacity-40">
                            No elements match current filter
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </GuideCard>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <GuideCard>
        <h3 className="kol-heading-md mb-4">Recommendations</h3>
        <div className="space-y-4">
          {typeAuditData.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderLeft: `4px solid ${getSeverityColor(rec.priority)}`
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-xs uppercase px-2 py-1 rounded shrink-0"
                  style={{
                    backgroundColor: getSeverityColor(rec.priority),
                    color: 'white',
                    opacity: 0.9
                  }}
                >
                  {rec.priority}
                </span>
                <div className="flex-1">
                  <div className="kol-text font-medium mb-1">{rec.title}</div>
                  <div className="kol-text-sm opacity-80 mb-2">{rec.description}</div>
                  <div className="kol-mono-xs text-xs opacity-60">
                    Impact: {rec.impact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GuideCard>
    </div>
  )
}

export default TypeReport
