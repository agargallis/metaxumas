import { Link } from 'react-router-dom'
import { Cookie, ScrollText, Shield } from 'lucide-react'
import { business } from '../data/business'
import logoSrc from '../assets/images/logo.png'

const legalLinks = [
  { to: '/privacy', label: 'Απόρρητο', icon: Shield },
  { to: '/terms', label: 'Όροι Χρήσης', icon: ScrollText },
  { to: '/cookies', label: 'Cookies', icon: Cookie },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        background: 'linear-gradient(180deg, rgba(252,248,241,0.96) 0%, rgba(244,236,225,0.98) 100%)',
        borderColor: 'rgba(145,97,39,0.12)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
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
          <p className="justify-self-start text-xs text-[rgba(45,28,12,0.36)]">
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

          <p className="justify-self-end text-xs text-[rgba(45,28,12,0.36)]">
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
