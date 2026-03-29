import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'metaximas_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
          role="dialog"
          aria-label="Πολιτική Cookies"
        >
          <div
            className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative"
            style={{
              background: 'rgba(255,250,244,0.94)',
              border: '1px solid rgba(127,91,48,0.12)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 -4px 40px rgba(153,110,49,0.14), 0 0 0 1px rgba(255,255,255,0.4) inset',
            }}
          >
            {/* Gold top accent line */}
            <div
              className="absolute top-0 left-6 right-6 h-px rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,148,26,0.5), transparent)' }}
            />

            {/* Icon */}
            <div
              className="shrink-0 p-2.5 rounded-xl"
              style={{ background: 'rgba(212,148,26,0.1)', color: 'var(--gold)' }}
            >
              <Cookie size={20} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium mb-1"
                style={{ color: 'rgba(31,18,9,0.88)' }}
              >
                Χρησιμοποιούμε cookies
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(47,29,15,0.54)' }}>
                Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας. Μπορείτε να αποδεχτείτε ή να απορρίψετε τη χρήση τους.{' '}
                <Link
                  to="/cookies"
                  className="underline underline-offset-2 transition-colors duration-200"
                  style={{ color: 'rgba(212,148,26,0.7)' }}
                  onClick={() => setVisible(false)}
                >
                  Πολιτική Cookies
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  color: 'rgba(47,29,15,0.58)',
                  border: '1px solid rgba(127,91,48,0.12)',
                  background: 'rgba(255,255,255,0.48)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'rgba(31,18,9,0.82)'
                  e.currentTarget.style.borderColor = 'rgba(127,91,48,0.20)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(47,29,15,0.58)'
                  e.currentTarget.style.borderColor = 'rgba(127,91,48,0.12)'
                }}
              >
                Απόρριψη
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none btn-primary text-xs"
                style={{ padding: '0.5rem 1.25rem' }}
              >
                Αποδοχή
              </button>
            </div>

            {/* Close (dismiss without deciding = decline) */}
            <button
              onClick={decline}
              className="absolute top-3 right-3 p-1 rounded-lg transition-colors"
              style={{ color: 'rgba(47,29,15,0.34)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(31,18,9,0.66)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(47,29,15,0.34)'}
              aria-label="Κλείσιμο"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
