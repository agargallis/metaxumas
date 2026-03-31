import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'motion/react'
import {
  Beer,
  Beef,
  Coffee,
  Cookie,
  CookingPot,
  GlassWater,
  Leaf,
  Martini,
  Salad,
  Sandwich,
  Scale,
  Soup,
  UtensilsCrossed,
  Wine,
  Printer,
} from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { menuCategories } from '../data/menu'
import { cn } from '../lib/utils'

const CATEGORY_ICONS = {
  cafe: GlassWater,
  beers: Beer,
  beer: Beer,
  ouzo: Martini,
  tsipouro: Martini,
  'zitsa-wine': Wine,
  wine: Wine,
  local_bar: Martini,
  wine_bar: Wine,
  desserts: Cookie,
  drinks: Wine,
  salads: Leaf,
  'salads-classic': Leaf,
  eco: Leaf,
  'cheese-varieties': Sandwich,
  'cheese-dishes': Sandwich,
  restaurant: UtensilsCrossed,
  restaurant_menu: UtensilsCrossed,
  grill: Beef,
  'grill-of-the-hour': Beef,
  outdoor_grill: Beef,
  'by-the-kilo': Scale,
  scale: Scale,
  appetizers: Soup,
  flogeres: CookingPot,
  lunch_dining: CookingPot,
  platters: UtensilsCrossed,
  tapas: UtensilsCrossed,
  'clay-pot': CookingPot,
  soup_kitchen: CookingPot,
  brunch: Coffee,
  mezedes: Salad,
  tavern: UtensilsCrossed,
}

function MenuItemCard({ item }) {
  return (
    <div className="border-b border-[rgba(145,97,39,0.10)] py-5 last:border-b-0">
      <h3 className="text-center text-[1.02rem] font-semibold text-[rgba(31,18,9,0.9)] transition-colors duration-200 hover:text-gold-700">
        {item.name}
      </h3>
      {item.description ? (
        <p className="mt-3 text-center text-sm leading-relaxed text-[rgba(47,29,15,0.56)]">{item.description}</p>
      ) : null}
    </div>
  )
}

function MenuCategoryPanel({ category, isActive }) {
  return (
    <AnimatePresence mode="wait">
      {isActive ? (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-4xl"
        >
          <div className="mx-auto max-w-3xl">
            {category.items.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id)
  const buttonRefs = useRef({})

  useEffect(() => {
    const activeButton = buttonRefs.current[activeTab]
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeTab])

  return (
    <PageTransition>
      <Helmet>
        <title>Μενού | Μεταξύ Μας</title>
        <meta
          name="description"
          content="Ανακαλύψτε το μενού του Μεταξύ Μας, από καφέ και brunch μέχρι μεζέδες, ταβερνιάτικα, γλυκά και κρασί."
        />
      </Helmet>

      {/* Print-only full menu — hidden on screen, shown when printing */}
      <div className="print-only" aria-hidden="true">
        <div className="print-header">
          <img src="/4.png" alt="Μεταξύ Μας" className="print-logo" />
          <h1>Μεταξύ Μας</h1>
          <p>Μεζεδοπωλείο &amp; Καφέ · Ασκληπιού 20, Περιστέρι · 210 5758 201</p>
        </div>
        {menuCategories.map(category => (
          <div key={category.id} className="print-category">
            <h2>{category.label}</h2>
            {category.description ? <p className="print-category-desc">{category.description}</p> : null}
            <ul>
              {category.items.map(item => (
                <li key={item.id}>
                  <span className="print-item-name">{item.name}</span>
                  {item.description ? <span className="print-item-desc"> — {item.description}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="no-print">
        <PageHero minimal label="Γεύσεις & Ποτά!" title="Δες το μενού μας." />
      </div>

      <section className="section-padding pt-6 pb-10 sm:pt-8 no-print">
        <div className="container-wide">
          <SectionReveal className="mx-auto mb-8 max-w-5xl">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <nav
                className="menu-carousel flex snap-x snap-mandatory items-center gap-3 overflow-x-auto py-1 flex-1"
                aria-label="Κατηγορίες μενού"
                style={{ msOverflowStyle: 'none' }}
              >
                {menuCategories.map(category => {
                  const Icon = CATEGORY_ICONS[category.id] || CATEGORY_ICONS[category.icon]
                  const isActive = activeTab === category.id

                  return (
                    <button
                      type="button"
                      key={category.id}
                      ref={element => {
                        buttonRefs.current[category.id] = element
                      }}
                      onClick={() => setActiveTab(category.id)}
                      className={cn(
                        'inline-flex shrink-0 snap-center items-center gap-3 rounded-full border px-4 py-3 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
                        isActive
                          ? 'border-[rgba(212,148,26,0.24)] bg-[rgba(255,250,242,0.92)] text-gold-700 shadow-[0_14px_24px_rgba(153,110,49,0.08)]'
                          : 'border-[rgba(145,97,39,0.10)] bg-white/40 text-[rgba(47,29,15,0.60)] hover:border-[rgba(145,97,39,0.14)] hover:bg-white/64 hover:text-[rgba(31,18,9,0.88)]'
                      )}
                    >
                      {Icon ? (
                        <span
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200',
                            isActive ? 'bg-[rgba(212,148,26,0.14)]' : 'bg-[rgba(145,97,39,0.06)]'
                          )}
                        >
                          <Icon size={16} />
                        </span>
                      ) : null}
                      <span className="whitespace-nowrap font-medium">{category.label}</span>
                    </button>
                  )
                })}
              </nav>

              <button
                type="button"
                onClick={() => window.print()}
                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-[rgba(145,97,39,0.14)] bg-white/40 px-4 py-3 text-sm text-[rgba(47,29,15,0.60)] transition-all duration-200 hover:border-[rgba(145,97,39,0.20)] hover:bg-white/64 hover:text-[rgba(31,18,9,0.88)]"
                title="Εκτύπωση ή αποθήκευση ως PDF"
              >
                <Printer size={15} />
                <span className="hidden sm:inline">Εκτύπωση / PDF</span>
              </button>
            </div>
          </SectionReveal>

          <div>
            {menuCategories.map(category => (
              <MenuCategoryPanel
                key={category.id}
                category={category}
                isActive={category.id === activeTab}
              />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
