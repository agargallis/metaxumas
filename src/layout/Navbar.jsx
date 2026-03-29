import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Phone, Clock, ArrowRight } from 'lucide-react'
import { cn } from '../lib/utils'
import { business } from '../data/business'
import logoSrc from '../assets/images/logo.png'

const navLinks = [
  { to: '/', label: 'Αρχική' },
  { to: '/menu', label: 'Μενού' },
  { to: '/live-music', label: 'Ζωντανή Μουσική' },
  { to: '/contact', label: 'Επικοινωνία' },
]

const ease = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      setMenuOpen(false)
      prevPathRef.current = location.pathname
    }
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isHome = location.pathname === '/'
  const shellStyle = scrolled || !isHome
    ? {
        background: 'rgba(255, 251, 245, 0.88)',
        borderColor: 'rgba(145,97,39,0.14)',
        boxShadow: '0 18px 44px rgba(138,96,37,0.12)',
      }
    : {
        background: 'rgba(255, 251, 245, 0.68)',
        borderColor: 'rgba(145,97,39,0.10)',
        boxShadow: '0 14px 36px rgba(138,96,37,0.08)',
      }

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="relative flex h-[4.4rem] items-center justify-between rounded-[1.6rem] border px-4 backdrop-blur-xl transition-all duration-500 sm:px-5"
            style={shellStyle}
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />

            <Link
              to="/"
              className="flex items-center gap-3 focus-visible:outline-none"
              aria-label="Μεταξύ Μας - Αρχική"
            >
              <img
                src={logoSrc}
                alt="Μεταξύ Μας logo"
                className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-[1.03] md:h-11"
                style={{ filter: 'drop-shadow(0 0 16px rgba(200,140,40,0.14))' }}
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Κύρια πλοήγηση">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-4 py-2 text-[0.8rem] tracking-[0.12em] transition-all duration-200',
                      isActive
                        ? 'bg-[rgba(212,148,26,0.12)] text-gold-700 shadow-[inset_0_0_0_1px_rgba(212,148,26,0.10)]'
                        : 'text-[rgba(45,28,12,0.62)] hover:bg-white/60 hover:text-[rgba(33,21,11,0.90)]'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 text-xs tracking-[0.12em] text-[rgba(45,28,12,0.56)] transition-colors duration-200 hover:text-gold-700"
                aria-label={`Τηλεφωνήστε στο ${business.phoneDisplay}`}
              >
                <Phone size={13} />
                {business.phoneDisplay}
              </a>
              <Link to="/reservations" className="btn-primary text-xs px-5 py-2.5">
                Κράτηση Τραπεζιού
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[rgba(145,97,39,0.10)] bg-white/60 text-[rgba(45,28,12,0.72)] transition-all duration-200 hover:border-[rgba(212,148,26,0.22)] hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 lg:hidden"
              aria-label={menuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={21} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={21} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'linear-gradient(180deg, rgba(252,248,241,0.98) 0%, rgba(245,236,223,0.98) 100%)' }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-12 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(234,196,142,0.20) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 flex min-h-full flex-col px-6 pb-8 pt-24">
              <div className="mb-8 flex items-center justify-between">
                <img src={logoSrc} alt="Μεταξύ Μας" className="h-12 w-auto object-contain opacity-90" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[rgba(145,97,39,0.10)] bg-white/70 text-[rgba(45,28,12,0.72)]"
                  aria-label="Κλείσιμο"
                >
                  <X size={21} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col" aria-label="Κινητή πλοήγηση">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.35, ease }}
                    className="border-b border-[rgba(145,97,39,0.08)]"
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between py-4 text-[1.4rem]',
                          isActive ? 'text-gold-700' : 'text-[rgba(45,28,12,0.76)]'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.label}</span>
                          <ArrowRight size={18} className={isActive ? 'opacity-100' : 'opacity-35'} />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-xs tracking-[0.12em] text-[rgba(45,28,12,0.48)]">
                  <Clock size={12} />
                  <span>{business.hoursSimple}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/reservations"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary justify-center text-base"
                  >
                    Κράτηση Τραπεζιού
                  </Link>
                  <a href={`tel:${business.phone}`} className="btn-outline justify-center text-base">
                    <Phone size={16} />
                    {business.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
