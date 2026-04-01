import { Link } from 'react-router-dom'
import { Cookie, ScrollText, Shield } from 'lucide-react'
import { business } from '../data/business'
const logoSrc = 'https://i.imgur.com/FqLbQhc.png'

const legalLinks = [
  { to: '/privacy', label: 'Απόρρητο', icon: Shield },
  { to: '/terms', label: 'Όροι Χρήσης', icon: ScrollText },
  { to: '/cookies', label: 'Cookies', icon: Cookie },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:py-20">
        <div className="mx-auto mb-6 h-px w-32 bg-gradient-to-r from-transparent via-[rgba(190,129,28,0.42)] to-transparent sm:mb-12 sm:w-44" />
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="mb-5 inline-block">
            <img src={logoSrc} alt="Μεταξύ Μας" className="h-14 w-auto object-contain opacity-90" />
          </Link>
          <p className="max-w-xl text-sm leading-relaxed text-[rgba(45,28,12,0.58)]">
            Καφέ το πρωί, μεζεδοπωλείο το βράδυ, ζωντανή μουσική πάντα - ένας χώρος για κάθε ώρα και κάθε παρέα.
          </p>
        </div>

        <div
          className="mt-10 flex flex-col items-center gap-5 border-t pt-8 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center"
          style={{ borderColor: 'rgba(145,97,39,0.12)' }}
        >
          <p className="justify-self-start text-center text-xs text-[rgba(45,28,12,0.36)] md:text-left">
            © {year} {business.name}. Όλα τα δικαιώματα διατηρούνται.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {legalLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-[rgba(45,28,12,0.46)] transition-colors duration-200 hover:text-gold-700"
              >
                <Icon size={15} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <p className="justify-self-end text-center text-xs text-[rgba(45,28,12,0.36)] md:text-right">
            Δημιουργήθηκε από την{' '}
            <a
              href="https://ubd.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-600 transition-colors duration-200 hover:text-gold-500"
            >
              UBD
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
