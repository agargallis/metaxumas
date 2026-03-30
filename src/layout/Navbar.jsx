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
]

const ease = [0.22, 1, 0.36, 1]

export default function Navbar() {
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
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const shellStyle = {
    background: 'linear-gradient(180deg, rgba(63,40,25,0.94) 0%, rgba(49,31,19,0.92) 100%)',
    borderColor: 'rgba(213,174,116,0.16)',
    boxShadow: '0 20px 46px rgba(50,30,16,0.28)',
  }

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease }}
        className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-4"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="relative flex h-[4.35rem] w-full max-w-full items-center justify-between overflow-hidden rounded-[1.45rem] border px-3 pr-2.5 backdrop-blur-xl transition-all duration-500 sm:h-[4.8rem] sm:rounded-[1.7rem] sm:px-5"
            style={shellStyle}
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(233,191,120,0.52)] to-transparent" />

            <Link
              to="/"
              className="flex min-w-0 items-center gap-3 focus-visible:outline-none"
              aria-label="Μεταξύ Μας - Αρχική"
            >
              <img
                src={logoSrc}
                alt="Μεταξύ Μας logo"
                className="h-8 w-auto max-w-[7.5rem] object-contain transition-transform duration-300 hover:scale-[1.03] sm:h-10 sm:max-w-none md:h-11"
                style={{ filter: 'drop-shadow(0 0 16px rgba(219,171,86,0.20))' }}
              />
            </Link>

            <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Κύρια πλοήγηση">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex h-11 items-center justify-center rounded-full px-4 text-[0.92rem] font-medium transition-all duration-200',
                      isActive
                        ? 'text-[rgba(244,212,158,0.96)]'
                        : 'text-[rgba(248,236,214,0.72)] hover:text-[rgba(255,245,228,0.96)]'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      <span
                        className={cn(
                          'absolute bottom-[0.42rem] left-4 right-4 h-px origin-center bg-gradient-to-r from-transparent via-[rgba(233,191,120,0.84)] to-transparent transition-all duration-200',
                          isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                        )}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${business.phone}`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(239,212,167,0.22)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,243,222,0.88)] transition-all duration-200 hover:border-[rgba(239,212,167,0.34)] hover:bg-[rgba(255,255,255,0.08)]"
                aria-label={`Τηλεφωνήστε στο ${business.phoneDisplay}`}
              >
                <Phone size={15} />
              </a>

              <Link to="/reservations" className="btn-primary h-12 px-5 text-xs">
                Κλείσε τραπέζι
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(239,212,167,0.18)] bg-[rgba(255,255,255,0.05)] text-[rgba(255,241,216,0.84)] transition-all duration-200 hover:border-[rgba(233,191,120,0.34)] hover:text-[rgba(255,245,228,0.98)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:h-11 sm:w-11 lg:hidden"
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
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
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

            <div className="relative z-10 flex min-h-full flex-col px-5 pb-8 pt-24 sm:px-6">
              <nav className="flex flex-col" aria-label="Κινητή πλοήγηση">
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
                          'flex items-center justify-between py-4 text-[1.2rem] sm:text-[1.4rem]',
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

              <div className="flex flex-1 items-center justify-center px-4">
                <img src="/4.png" alt="Μεταξύ Μας" className="h-auto w-[11.75rem] max-w-[54vw] object-contain opacity-[0.18]" />
              </div>

              <div className="mt-auto">
                <div className="flex flex-col gap-3">
                  <Link
                    to="/reservations"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary justify-center text-base"
                  >
                    Κλείσε τραπέζι
                  </Link>
                  <a href={`tel:${business.phone}`} className="btn-outline justify-center text-base">
                    Καλέστε μας <Phone size={16} />
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
