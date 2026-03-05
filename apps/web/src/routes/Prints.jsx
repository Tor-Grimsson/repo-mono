import { useParams, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
// import PrintsGrid from './prints/PrintsGrid'
import PrintsGridGsap from './prints/PrintsGridGsap'
import PrintDetailOverlay from './prints/PrintDetailOverlay'
import { getPrintBySlug } from '../data/prints'

export default function Prints() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const print = slug ? getPrintBySlug(slug) : null
  const isOverlayOpen = Boolean(print)

  const handleCardClick = useCallback((rect, printSlug) => {
    navigate(`/prints/${printSlug}`)
  }, [navigate])

  const handleClose = useCallback(() => {
    navigate('/prints')
  }, [navigate])

  return (
    <>
      <PrintsGridGsap onCardClick={handleCardClick} />
      <AnimatePresence>
        {isOverlayOpen && (
          <PrintDetailOverlay
            key={slug}
            print={print}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  )
}
