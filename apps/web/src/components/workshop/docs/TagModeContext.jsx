import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const TagModeContext = createContext(null)

export const TagModeProvider = ({ children }) => {
  const [state, setState] = useState({ isOpen: false, activeTags: [] })

  const openTagMode = useCallback((tag = null) => {
    setState({ isOpen: true, activeTags: tag ? [tag] : [] })
  }, [])

  const closeTagMode = useCallback(() => {
    setState({ isOpen: false, activeTags: [] })
  }, [])

  const toggleTag = useCallback((tag) => {
    setState((prev) => ({
      ...prev,
      activeTags: prev.activeTags.includes(tag)
        ? prev.activeTags.filter((t) => t !== tag)
        : [...prev.activeTags, tag]
    }))
  }, [])

  const removeTag = useCallback((tag) => {
    setState((prev) => ({
      ...prev,
      activeTags: prev.activeTags.filter((t) => t !== tag)
    }))
  }, [])

  const clearTags = useCallback(() => {
    setState((prev) => ({ ...prev, activeTags: [] }))
  }, [])

  // Backward compat: activeTag = first tag (used by TagGraph)
  const activeTag = state.activeTags[0] || null

  // Backward compat: setActiveTag sets single tag
  const setActiveTag = useCallback((tag) => {
    setState((prev) => ({ ...prev, activeTags: tag ? [tag] : [] }))
  }, [])

  // Close on any route change
  const location = useLocation()
  useEffect(() => {
    if (state.isOpen) setState({ isOpen: false, activeTags: [] })
  }, [location.pathname])

  useEffect(() => {
    if (!state.isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeTagMode()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state.isOpen, closeTagMode])

  const value = useMemo(() => ({
    isOpen: state.isOpen,
    activeTags: state.activeTags,
    activeTag,
    openTagMode,
    closeTagMode,
    toggleTag,
    removeTag,
    clearTags,
    setActiveTag
  }), [state.isOpen, state.activeTags, activeTag, openTagMode, closeTagMode, toggleTag, removeTag, clearTags, setActiveTag])

  return (
    <TagModeContext.Provider value={value}>
      {children}
    </TagModeContext.Provider>
  )
}

export const useTagMode = () => {
  const ctx = useContext(TagModeContext)
  if (!ctx) throw new Error('useTagMode must be used within TagModeProvider')
  return ctx
}

export default TagModeContext
