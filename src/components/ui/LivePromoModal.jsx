import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CalendarDays, Clock3, X } from 'lucide-react'
import { formatDate } from '../../lib/utils'
import { parsePromoDate } from '../../lib/livePromo'

const ease = [0.22, 1, 0.36, 1]

function PromoTiming({ promo }) {
  const startsAt = parsePromoDate(promo.startsAt)
  const startTime = startsAt ? startsAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' }) : ''

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[rgba(255,243,224,0.74)]">
      {startsAt ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 backdrop-blur-sm">
          <CalendarDays size={13} />
          {formatDate(startsAt.toISOString())}
        </span>
      ) : null}
      {startTime ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 backdrop-blur-sm">
          <Clock3 size={13} />
          Έναρξη {startTime}
        </span>
      ) : null}
    </div>
  )
}

export default function LivePromoModal({ promo, open, onClose }) {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5"
        >
          <div
            className="absolute inset-0 bg-[rgba(24,11,4,0.46)] backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.34, ease }}
            className="relative z-10 grid max-h-[min(92vh,48rem)] w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-[rgba(240,217,181,0.18)] bg-[linear-gradient(145deg,rgba(53,28,15,0.96),rgba(24,12,6,0.94))] shadow-[0_40px_120px_rgba(18,9,4,0.48)] md:grid-cols-[1.05fr_0.95fr] md:rounded-[2rem]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white/84 backdrop-blur-sm transition-colors hover:bg-white/16 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
              aria-label="Κλείσιμο ανακοίνωσης"
            >
              <X size={18} />
            </button>

            <div className="relative min-h-[11.5rem] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(214,164,79,0.22),transparent_42%),linear-gradient(160deg,rgba(92,48,24,0.88),rgba(28,15,8,0.96))] md:min-h-[24rem]">
              {promo.imageUrl ? (
                <img src={promo.imageUrl} alt={promo.title} className="h-full w-full object-contain p-3 sm:p-4 md:p-6" />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(214,164,79,0.46),transparent_42%),linear-gradient(160deg,rgba(92,48,24,0.96),rgba(28,15,8,0.98))]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,12,6,0.06),rgba(26,12,6,0.58))]" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(19,8,4,0.84))]" />
            </div>

            <div className="relative flex flex-col justify-center overflow-y-auto px-5 py-6 text-center sm:px-7 sm:py-8 md:px-8 md:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,235,196,0.16),transparent_32%)]" />
              <div className="relative z-10 mx-auto flex w-full max-w-[28rem] flex-col items-center">
                <p className="label-upper mb-3 text-[rgba(239,199,122,0.92)]">Live ανακοίνωση</p>
                <h2 className="font-display text-[clamp(1.7rem,7vw,3.6rem)] leading-[0.96] tracking-[-0.03em] text-[rgba(255,246,232,0.96)]">
                  {promo.title}
                </h2>

                {promo.venueNote ? (
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[rgba(237,205,148,0.68)] sm:text-sm">
                    {promo.venueNote}
                  </p>
                ) : null}

                <div className="mt-5">
                  <PromoTiming promo={promo} />
                </div>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-[rgba(255,239,214,0.74)] sm:text-[0.98rem]">
                  {promo.message}
                </p>

                <div className="mt-7 flex w-full justify-center">
                  <Link
                    to={`/reservations?livePromo=${encodeURIComponent(promo.campaignId || 'current')}`}
                    onClick={onClose}
                    className="btn-primary min-h-[2.9rem] justify-center px-5 text-sm"
                  >
                    {promo.ctaLabel || 'Κλείσε τραπέζι'}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
