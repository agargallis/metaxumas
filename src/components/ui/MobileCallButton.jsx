import { Phone } from 'lucide-react'
import { business } from '../../data/business'

export default function MobileCallButton() {
  return (
    <a
      href={`tel:${business.phone}`}
      className="fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] z-40 inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-3 text-sm font-medium text-charcoal-950 shadow-[0_18px_36px_rgba(140,90,0,0.22)] transition-all duration-200 hover:bg-gold-400 active:bg-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:hidden"
      aria-label={`Τηλεφωνήστε: ${business.phoneDisplay}`}
    >
      <Phone size={16} />
      <span className="text-xs font-semibold">Κλήση</span>
    </a>
  )
}
