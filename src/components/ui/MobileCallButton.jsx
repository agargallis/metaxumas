import { Phone } from 'lucide-react'
import { business } from '../../data/business'

export default function MobileCallButton() {
  return (
    <a
      href={`tel:${business.phone}`}
      className="fixed bottom-6 left-6 z-40 sm:hidden flex items-center gap-2 px-4 py-3 rounded-full bg-gold-500 text-charcoal-950 shadow-warm-lg font-medium text-sm hover:bg-gold-400 active:bg-gold-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
      aria-label={`Τηλεφωνήστε: ${business.phoneDisplay}`}
    >
      <Phone size={16} />
      <span className="text-xs font-semibold">Κλήση</span>
    </a>
  )
}
