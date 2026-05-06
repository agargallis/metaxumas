import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { CalendarDays, Clock3, X } from 'lucide-react'
import { formatDate } from '../../lib/utils'
import { parsePromoDate } from '../../lib/livePromo'

const ease = [0.22, 1, 0.36, 1]

function PromoTiming({ promo }) {
  const liveAt = parsePromoDate(promo.liveAt || promo.startsAt)
  const startTime = liveAt ? liveAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' }) : ''

  if (!liveAt && !startTime) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-[rgba(255,243,224,0.92)] sm:gap-3 sm:text-xs">
      {liveAt ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-[rgba(32,14,6,0.42)] px-2.5 py-1 backdrop-blur-md sm:gap-2 sm:px-3 sm:py-1.5">
          <CalendarDays size={12} />
          {formatDate(liveAt.toISOString())}
        </span>
      ) : null}
      {startTime ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-[rgba(32,14,6,0.42)] px-2.5 py-1 backdrop-blur-md sm:gap-2 sm:px-3 sm:py-1.5">
          <Clock3 size={12} />
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
          <div className="absolute inset-0 bg-[rgba(24,11,4,0.46)] backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.34, ease }}
            className="relative z-10 grid w-full max-w-[24rem] grid-rows-[minmax(0,25rem)_minmax(0,1fr)] overflow-hidden rounded-[1.2rem] border border-[rgba(240,217,181,0.18)] bg-[linear-gradient(145deg,rgba(53,28,15,0.96),rgba(24,12,6,0.94))] shadow-[0_30px_90px_rgba(18,9,4,0.42)] sm:max-h-[88vh] sm:max-w-[26rem] sm:grid-rows-[minmax(0,28rem)_minmax(0,1fr)] md:max-h-[min(90vh,46rem)] md:max-w-4xl md:grid-cols-[1.05fr_0.95fr] md:grid-rows-1 md:rounded-[2rem] md:shadow-[0_40px_120px_rgba(18,9,4,0.48)]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-2.5 top-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white/84 backdrop-blur-sm transition-colors hover:bg-white/16 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
              aria-label="Κλείσιμο ανακοίνωσης"
            >
              <X size={16} />
            </button>

            <div className="relative h-full min-h-0 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(214,164,79,0.22),transparent_42%),linear-gradient(160deg,rgba(92,48,24,0.88),rgba(28,15,8,0.96))] md:min-h-[24rem]">
              {promo.imageUrl ? (
                <img src={promo.imageUrl} alt={promo.title} className="h-full max-h-full w-full object-contain p-3 sm:p-4 md:p-6" />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(214,164,79,0.46),transparent_42%),linear-gradient(160deg,rgba(92,48,24,0.96),rgba(28,15,8,0.98))]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,12,6,0.06),rgba(26,12,6,0.58))]" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(19,8,4,0.84))] sm:h-28" />
            </div>

            <div className="relative flex min-h-0 flex-col justify-start overflow-y-auto px-4 py-4 text-center sm:px-6 sm:py-6 md:justify-center md:px-8 md:py-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,235,196,0.16),transparent_32%)]" />
              <div className="relative z-10 mx-auto flex w-full max-w-[26rem] flex-col items-center">
                <p className="label-upper mb-1.5 text-[rgba(239,199,122,0.92)] sm:mb-3">Live ανακοίνωση</p>
                <h2 className="font-display text-[clamp(1.1rem,4.8vw,3.6rem)] leading-[1] tracking-[-0.03em] text-[rgba(255,246,232,0.96)]">
                  {promo.title}
                </h2>

                {promo.venueNote ? (
                  <p className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-[rgba(237,205,148,0.68)] sm:mt-3 sm:text-sm sm:tracking-[0.16em]">
                    {promo.venueNote}
                  </p>
                ) : null}

                <div className="mt-3 sm:mt-5">
                  <PromoTiming promo={promo} />
                </div>

                <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-[rgba(255,239,214,0.74)] sm:mt-4 sm:text-[0.92rem]">
                  {promo.message}
                </p>

                <div className="mt-4 flex w-full justify-center sm:mt-5">
                  <Link
                    to={`/reservations?livePromo=${encodeURIComponent(promo.campaignId || 'current')}`}
                    onClick={onClose}
                    className="btn-primary min-h-[2.45rem] w-full max-w-[13.5rem] justify-center px-4 text-sm sm:min-h-[2.8rem] sm:max-w-[15rem] sm:px-5"
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
