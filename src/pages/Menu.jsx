import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  Coffee, Egg, Salad, UtensilsCrossed, Leaf, Cookie, Wine,
  Sun, Moon, Info,
} from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { menuCategories } from '../data/menu'
import { cn } from '../lib/utils'

const CATEGORY_ICONS = {
  cafe:     Coffee,
  brunch:   Egg,
  mezedes:  Salad,
  tavern:   UtensilsCrossed,
  salads:   Leaf,
  desserts: Cookie,
  drinks:   Wine,
}

function MenuItem({ item }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[rgba(127,91,48,0.10)] last:border-0 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)] group-hover:text-gold-700 transition-colors duration-200">
            {item.name}
          </h3>
          {item.featured && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-500/15 text-gold-400 border border-gold-500/20 shrink-0">
              Chef's Pick
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-[rgba(47,29,15,0.48)] leading-relaxed">{item.description}</p>
        )}
      </div>
      <div className="shrink-0 text-right">
        {item.price != null ? (
          <span className="text-sm font-medium text-gold-700">{item.price.toFixed(2)}€</span>
        ) : (
          <span className="text-xs text-[rgba(47,29,15,0.34)] italic">ρωτήστε μας</span>
        )}
      </div>
    </div>
  )
}

function MenuCategory({ category, isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Category header */}
          <div className="mb-6 pb-4 border-b border-[rgba(127,91,48,0.12)]">
            <div className="flex items-center gap-3 mb-2">
              {(() => { const I = CATEGORY_ICONS[category.id]; return I ? <span className="p-2 rounded-lg bg-gold-500/10 text-gold-400"><I size={18} /></span> : null })()}
              <h2 className="heading-card text-[rgba(31,18,9,0.9)]">{category.label}</h2>
            </div>
            {category.description && (
              <p className="text-sm text-[rgba(47,29,15,0.54)] ml-12">{category.description}</p>
            )}
          </div>

          {/* Items */}
          <div>
            {category.items.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id)
  const activeCategory = menuCategories.find(c => c.id === activeTab)

  return (
    <PageTransition>
      <Helmet>
        <title>Μενού | Μεταξύ Μας</title>
        <meta name="description" content="Ανακαλύψτε το μενού του Μεταξύ Μας — από πρωινό καφέ και brunch ως παραδοσιακούς μεζέδες και ταβερνιάτικες γεύσεις." />
      </Helmet>

      <PageHero
        label="Γεύσεις & Ποτά"
        title="Το Μενού μας"
        subtitle="Από την πρώτη γουλιά καφέ ως τον τελευταίο μεζέ — κάθε ώρα έχει τους δικούς της ήρωες."
      />

      <section className="section-padding">
        <div className="container-wide">
          {/* Note about timing */}
          <SectionReveal>
            <div className="flex flex-wrap gap-3 mb-10 p-4 rounded-2xl bg-[rgba(255,251,246,0.72)] border border-[rgba(127,91,48,0.12)]">
              <div className="flex items-center gap-2 text-xs text-[rgba(47,29,15,0.58)]">
                <Sun size={13} className="text-gold-700/70 shrink-0" />
                <span><strong className="text-gold-700">Πρωί–Απόγευμα:</strong> Καφέ, Brunch, Σαλάτες, Γλυκά</span>
              </div>
              <div className="text-[rgba(47,29,15,0.24)]">·</div>
              <div className="flex items-center gap-2 text-xs text-[rgba(47,29,15,0.58)]">
                <Moon size={13} className="text-wine-600/70 shrink-0" />
                <span><strong className="text-gold-700">Βράδυ:</strong> Μεζέδες, Ταβερνιάτικα, Ποτά & Κρασί</span>
              </div>
              <div className="text-[rgba(47,29,15,0.24)]">·</div>
              <div className="flex items-center gap-2 text-xs text-[rgba(47,29,15,0.58)]">
                <Info size={13} className="text-[rgba(47,29,15,0.42)] shrink-0" />
                <span>Τιμές συμπεριλαμβάνουν ΦΠΑ. Ρωτήστε για αλλεργίες.</span>
              </div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            {/* Tabs sidebar */}
            <div>
              <SectionReveal>
                <div className="lg:sticky lg:top-28">
                  <p className="label-upper mb-4">Κατηγορίες</p>
                  <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0" aria-label="Κατηγορίες μενού">
                    {menuCategories.map(cat => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={cn(
                          'flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all duration-200 shrink-0 lg:shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
                          activeTab === cat.id
                            ? 'bg-gold-500/15 text-gold-700 border border-gold-500/25'
                            : 'text-[rgba(47,29,15,0.58)] hover:text-[rgba(31,18,9,0.88)] hover:bg-[rgba(127,91,48,0.04)] border border-transparent'
                        )}
                      >
                        {(() => { const I = CATEGORY_ICONS[cat.id]; return I ? <I size={16} className="shrink-0" /> : null })()}
                        <span className="text-sm font-medium whitespace-nowrap">{cat.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </SectionReveal>
            </div>

            {/* Menu content */}
            <div className="min-h-[60vh]">
              {menuCategories.map(category => (
                <MenuCategory
                  key={category.id}
                  category={category}
                  isActive={category.id === activeTab}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <SectionReveal className="mt-20 text-center p-10 rounded-3xl bg-[rgba(255,251,246,0.72)] border border-[rgba(127,91,48,0.12)]">
            <p className="label-upper mb-3">Θέλετε να κάνετε κράτηση;</p>
            <h3 className="heading-card text-[rgba(31,18,9,0.9)] mb-4">Κλείστε τραπέζι online</h3>
            <p className="text-sm text-[rgba(47,29,15,0.56)] mb-6 max-w-md mx-auto">
              Εξασφαλίστε τη θέση σας — ειδικά για βραδιές ζωντανής μουσικής.
            </p>
            <Link to="/reservations" className="btn-primary">
              Κράτηση Τραπεζιού
            </Link>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  )
}
