import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'motion/react'
import {
  Coffee, Egg, Salad, UtensilsCrossed, Leaf, Cookie, Wine,
} from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { menuCategories } from '../data/menu'
import { cn } from '../lib/utils'

const CATEGORY_ICONS = {
  cafe: Coffee,
  brunch: Egg,
  mezedes: Salad,
  tavern: UtensilsCrossed,
  salads: Leaf,
  desserts: Cookie,
  drinks: Wine,
}

function MenuItem({ item }) {
  return (
    <div className="group flex items-start justify-between gap-4 border-b border-[rgba(127,91,48,0.10)] py-4 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)] transition-colors duration-200 group-hover:text-gold-700">
            {item.name}
          </h3>
          {item.featured ? (
            <span className="shrink-0 rounded-full border border-gold-500/20 bg-gold-500/12 px-2 py-0.5 text-[10px] text-gold-700">
              Chef's Pick
            </span>
          ) : null}
        </div>
        {item.description ? (
          <p className="text-xs leading-relaxed text-[rgba(47,29,15,0.48)]">{item.description}</p>
        ) : null}
      </div>

      <div className="shrink-0 text-right">
        {item.price != null ? (
          <span className="text-sm font-medium text-gold-700">{item.price.toFixed(2)}€</span>
        ) : (
          <span className="text-xs italic text-[rgba(47,29,15,0.36)]">Ρωτήστε μας</span>
        )}
      </div>
    </div>
  )
}

function MenuCategory({ category, isActive }) {
  const Icon = CATEGORY_ICONS[category.id]

  return (
    <AnimatePresence mode="wait">
      {isActive ? (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 border-b border-[rgba(127,91,48,0.12)] pb-4">
            <div className="mb-2 flex items-center gap-3">
              {Icon ? (
                <span className="rounded-2xl bg-[rgba(212,148,26,0.10)] p-2.5 text-gold-700">
                  <Icon size={18} />
                </span>
              ) : null}
              <h2 className="heading-card text-[rgba(31,18,9,0.9)]">{category.label}</h2>
            </div>
            {category.description ? (
              <p className="ml-12 text-sm text-[rgba(47,29,15,0.54)]">{category.description}</p>
            ) : null}
          </div>

          <div>
            {category.items.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id)

  return (
    <PageTransition>
      <Helmet>
        <title>Μενού | Μεταξύ Μας</title>
        <meta
          name="description"
          content="Ανακαλύψτε το μενού του Μεταξύ Μας, από καφέ και brunch μέχρι μεζέδες, ταβερνιάτικα, γλυκά και κρασί."
        />
      </Helmet>

      <PageHero
        minimal
        label="Γεύσεις & Ποτά!"
        title="Το Μενού μας"
        subtitle="Από την πρώτη γουλιά καφέ ως τον τελευταίο μεζέ, κάθε ώρα έχει τις δικές της γεύσεις."
      />

      <section className="section-padding pt-6 sm:pt-8">
        <div className="container-wide">

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
            <div>
              <SectionReveal>
                <div className="lg:sticky lg:top-28">
                  <p className="label-upper mb-4">Κατηγορίες</p>
                  <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0" aria-label="Κατηγορίες μενού">
                    {menuCategories.map(category => {
                      const Icon = CATEGORY_ICONS[category.id]
                      const isActive = activeTab === category.id

                      return (
                        <button
                          type="button"
                          key={category.id}
                          onClick={() => setActiveTab(category.id)}
                          className={cn(
                            'flex shrink-0 items-center gap-3 rounded-[1.15rem] border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 lg:shrink-0',
                            isActive
                              ? 'border-[rgba(212,148,26,0.20)] bg-[rgba(255,250,242,0.88)] text-gold-700 shadow-[0_14px_24px_rgba(153,110,49,0.08)]'
                              : 'border-[rgba(145,97,39,0.08)] bg-white/34 text-[rgba(47,29,15,0.60)] hover:border-[rgba(145,97,39,0.12)] hover:bg-white/62 hover:text-[rgba(31,18,9,0.88)]'
                          )}
                        >
                          {Icon ? (
                            <span className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200',
                              isActive ? 'bg-[rgba(212,148,26,0.14)]' : 'bg-[rgba(145,97,39,0.06)]'
                            )}>
                              <Icon size={16} />
                            </span>
                          ) : null}
                          <span className="whitespace-nowrap text-sm font-medium">{category.label}</span>
                        </button>
                      )
                    })}
                  </nav>
                </div>
              </SectionReveal>
            </div>

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
        </div>
      </section>
    </PageTransition>
  )
}

