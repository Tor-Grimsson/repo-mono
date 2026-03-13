import { createContext, useContext, useState } from 'react'

const WorkViewContext = createContext(null)

export function WorkViewProvider({ children }) {
  const [viewMode, setViewMode] = useState('shelf')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <WorkViewContext.Provider value={{ viewMode, setViewMode, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery }}>
      {children}
    </WorkViewContext.Provider>
  )
}

export function useWorkView() {
  const ctx = useContext(WorkViewContext)
  if (!ctx) throw new Error('useWorkView must be used within WorkViewProvider')
  return ctx
}
