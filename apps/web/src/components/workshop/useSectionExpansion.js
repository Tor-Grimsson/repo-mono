import { useCallback, useMemo } from 'react'
import { useStyleguideExpansion } from './WorkshopExpansionContext'

/**
 * Hook for section expand/collapse state in workshop pages.
 * Wraps useStyleguideExpansion with toggleSection, allExpanded, and toggleAll.
 *
 * Usage:
 *   const { sections, toggleSection, allExpanded, toggleAll } = useSectionExpansion('my-page', {
 *     'section-a': false,
 *     'section-b': false,
 *   })
 *
 *   <DesPage allExpanded={allExpanded} onToggleAll={toggleAll} />
 *   <SectionToggle isExpanded={sections['section-a']} onToggle={() => toggleSection('section-a')} />
 */
export default function useSectionExpansion(pageKey, defaults = {}) {
  const [sections, setSections] = useStyleguideExpansion(pageKey, defaults)

  const toggleSection = useCallback((sectionId) => {
    setSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }, [setSections])

  const allExpanded = useMemo(
    () => Object.values(sections).length > 0 && Object.values(sections).every(Boolean),
    [sections]
  )

  const toggleAll = useCallback(() => {
    setSections(prev => {
      const next = !Object.values(prev).every(Boolean)
      return Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: next }), {})
    })
  }, [setSections])

  return { sections, toggleSection, allExpanded, toggleAll }
}
