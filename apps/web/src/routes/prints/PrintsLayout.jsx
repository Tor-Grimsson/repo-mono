import { useParams, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Prints from './index'
import PrintDetailOverlay from './PrintDetailOverlay'
import { getPrintBySlug } from '../../data/prints'

export default function PrintsLayout() {
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
      <Prints onCardClick={handleCardClick} />
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
