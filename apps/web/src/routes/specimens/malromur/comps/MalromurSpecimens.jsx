import { useEffect, useState } from 'react'
import GridOverlay from '../../../../components/specimens/GridOverlay'
import MalromurEditorial from '../cards/MalromurEditorial'
import MalromurDataTable from '../cards/MalromurDataTable'
import MalromurMenu from '../cards/MalromurMenu'
import MalromurNewsletter from '../cards/MalromurNewsletter'
import MalromurIndex from '../cards/MalromurIndex'
import MalromurChapter from '../cards/MalromurChapter'
import MalromurTOC from '../cards/MalromurTOC'
import MalromurTitlePage from '../cards/MalromurTitlePage'
import MalromurScientific from '../cards/MalromurScientific'
import MalromurLegislative from '../cards/MalromurLegislative'
import MalromurVariableAxis from '../cards/MalromurVariableAxis'

export default function MalromurSpecimens() {
  const columns = 12
  const gutter = 24
  const marginX = 180
  const columnWidth = 86
  const [activeSection, setActiveSection] = useState('title-page')
  const [navVisible, setNavVisible] = useState(true)

  const sections = [
    { id: 'title-page', label: 'Title' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'data-tables', label: 'Data Tables' },
    { id: 'menu', label: 'Menu' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'index', label: 'Index' },
    { id: 'chapter', label: 'Chapter' },
    { id: 'toc', label: 'TOC' },
    { id: 'scientific', label: 'Scientific Paper' },
    { id: 'legislative', label: 'Legislative' },
    { id: 'variable-axis', label: 'Weight Variations' },
  ]

  useEffect(() => {
    window.scrollTo(0, 0)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setNavVisible(false)
    }, 10000)

    const handleMouseEnter = () => {
      setNavVisible(true)
      clearTimeout(timeoutId)
    }

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setNavVisible(false)
      }, 10000)
    }

    const navElement = document.getElementById('floating-nav')
    if (navElement) {
      navElement.addEventListener('mouseenter', handleMouseEnter)
      navElement.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      clearTimeout(timeoutId)
      if (navElement) {
        navElement.removeEventListener('mouseenter', handleMouseEnter)
        navElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-surface-secondary">
      {/* Floating Navigation */}
      <div
        id="floating-nav"
        className="fixed top-24 z-[9999]"
      >
        <div className="sticky rounded p-6">
          <div
            className={`sticky inset-0 bg-fg-04 backdrop-blur-sm rounded transition-opacity duration-1000 ${
              navVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="sticky flex flex-col items-start gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center gap-2"
              aria-label={section.label}
            >
              <div
                className={`w-1 h-1 rounded-full transition-all ${
                  activeSection === section.id
                    ? 'bg-fg-96'
                    : 'bg-fg-24 hover:bg-fg-48'
                }`}
              />
              <span className={`kol-helper-xs transition-opacity duration-1000 ${
                activeSection === section.id
                  ? 'text-fg-96 opacity-100'
                  : navVisible
                  ? 'text-fg-48 opacity-60 group-hover:opacity-100'
                  : 'text-fg-48 opacity-40'
              }`}>
                {section.label}
              </span>
            </button>
          ))}
          </div>
        </div>
      </div>

      <GridOverlay columns={columns} gutter={gutter} marginX={marginX} columnWidth={columnWidth}>
      <div id="title-page">
        <MalromurTitlePage />
      </div>
      <div id="editorial">
        <MalromurEditorial />
      </div>
      <div id="data-tables">
        <MalromurDataTable />
      </div>
      <div id="menu">
        <MalromurMenu />
      </div>
      <div id="newsletter">
        <MalromurNewsletter />
      </div>
      <div id="index">
        <MalromurIndex />
      </div>
      <div id="chapter">
        <MalromurChapter />
      </div>
      <div id="toc">
        <MalromurTOC />
      </div>
      <div id="scientific">
        <MalromurScientific />
      </div>
      <div id="legislative" className="py-24">
        <MalromurLegislative />
      </div>
      <div id="variable-axis">
        <MalromurVariableAxis />
      </div>
    </GridOverlay>
    </div>
  )
}
