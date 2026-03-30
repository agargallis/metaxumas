import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Home, UtensilsCrossed } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import logoSrc from '../assets/images/logo.png'

const ease = [0.22, 1, 0.36, 1]

export default function NotFound() {
  return (
    <PageTransition>
      <Helmet>
        <title>404 - Σελίδα δεν βρέθηκε | Μεταξύ Μας</title>
      </Helmet>

      <div className="relative min-h-screen overflow-hidden px-6 py-16" style={{ background: 'var(--bg)' }}>
        <div
          className="pointer-events-none absolute left-1/2 top-8 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-90 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(234,196,142,0.24) 0%, rgba(246,230,206,0.14) 42%, transparent 74%)',
          }}
        />
        <div
          className="pointer-events-none absolute left-[8%] top-24 hidden h-32 w-32 rounded-full opacity-70 blur-2xl lg:block"
          style={{ background: 'radial-gradient(circle, rgba(232,184,116,0.16) 0%, transparent 72%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-16 right-[10%] hidden h-36 w-36 rounded-full opacity-70 blur-2xl lg:block"
          style={{ background: 'radial-gradient(circle, rgba(193,122,98,0.12) 0%, transparent 72%)' }}
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center justify-center">
          <div className="text-center">
            <motion.img
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              src={logoSrc}
              alt="Μεταξύ Μας"
              className="mx-auto mb-8 h-16 w-auto object-contain opacity-90"
              style={{ filter: 'drop-shadow(0 16px 28px rgba(175,120,36,0.12))' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.08, ease }}
              className="font-display text-[clamp(6rem,18vw,11rem)] leading-none tracking-[-0.05em] text-gold-600/55"
            >
              404
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="shimmer-line mx-auto mt-5 w-20 origin-center"
            />

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease }}
              className="mx-auto mt-7 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] leading-tight text-[rgba(31,18,9,0.92)]"
            >
              Η σελίδα δεν βρέθηκε.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38, ease }}
              className="mx-auto mt-5 max-w-xl text-[1rem] leading-8 text-[rgba(47,29,15,0.60)]"
            >
              Μάλλον η διαδρομή δεν οδηγεί πλέον εδώ. Μπορείς να επιστρέψεις στην αρχική ή να δεις το μενού.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link to="/" className="btn-primary text-sm px-7">
                <Home size={15} />
                Αρχική Σελίδα
              </Link>
              <Link to="/menu" className="btn-outline text-sm px-7">
                <UtensilsCrossed size={15} />
                Δείτε το Μενού
              </Link>
              <Link to="/reservations" className="inline-flex items-center gap-2 text-sm text-[rgba(45,28,12,0.62)] transition-colors duration-200 hover:text-gold-700">
                Κράτηση <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
