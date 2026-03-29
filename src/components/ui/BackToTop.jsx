import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex p-3.5 rounded-full backdrop-blur-sm shadow-warm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          style={{
            background: 'rgba(212,148,26,0.15)',
            border: '1px solid rgba(212,148,26,0.35)',
            color: 'var(--gold-light)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(212,148,26,0.28)'
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(212,148,26,0.15)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          aria-label="Πίσω στην κορυφή"
        >
          <ChevronUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
