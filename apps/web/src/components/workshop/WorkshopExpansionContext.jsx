import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import WorkshopDevTooltip from './WorkshopDevTooltip'

const WorkshopExpansionContext = createContext(null)

export const StyleguideExpansionProvider = ({ children }) => {
  const [pages, setPages] = useState({})

  const setPageState = useCallback((pageKey, updater, defaultsRef) => {
    setPages(prev => {
      const previous = prev[pageKey] ?? defaultsRef.current
      const next =
        typeof updater === 'function'
          ? updater(previous)
          : updater

      if (prev[pageKey] === next) {
        return prev
      }

      return {
        ...prev,
        [pageKey]: next
      }
    })
  }, [])

  const value = useMemo(() => ({ pages, setPageState }), [pages, setPageState])

  return (
    <WorkshopExpansionContext.Provider value={value}>
      {children}
      <WorkshopDevTooltip />
    </WorkshopExpansionContext.Provider>
  )
}

export const useStyleguideExpansion = (pageKey, defaults = {}) => {
  const context = useContext(WorkshopExpansionContext)

  if (!context) {
    throw new Error('useStyleguideExpansion must be used within StyleguideExpansionProvider')
  }

  const { pages, setPageState } = context

  const defaultsRef = useRef(null)
  if (defaultsRef.current === null) {
    defaultsRef.current = { ...defaults }
  }

  const state = pages[pageKey] ?? defaultsRef.current

  const setState = useCallback(
    (updater) => {
      setPageState(pageKey, updater, defaultsRef)
    },
    [pageKey, setPageState]
  )

  return [state, setState]
}
