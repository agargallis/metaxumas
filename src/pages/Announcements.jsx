import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Pin,
  ArrowRight,
  Calendar,
  Music,
  UtensilsCrossed,
  Star,
  CalendarDays,
  Info,
  Instagram,
  Facebook,
} from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { publishedAnnouncements } from '../data/announcements'
import { business } from '../data/business'
import { cn, formatDate, announcementBadgeColor } from '../lib/utils'

const typeFilters = [
  { value: 'all',     label: 'Όλα',              Icon: null },
  { value: 'music',   label: 'Μουσική',           Icon: Music },
  { value: 'menu',    label: 'Μενού',             Icon: UtensilsCrossed },
  { value: 'special', label: 'Ειδικές Βραδιές',   Icon: Star },
  { value: 'holiday', label: 'Αργίες',            Icon: CalendarDays },
  { value: 'notice',  label: 'Ανακοινώσεις',      Icon: Info },
]

const socialLinks = [
  { href: business.social.instagram, label: 'Instagram @metaxu.mas', Icon: Instagram },
  { href: business.social.facebook, label: 'Facebook', Icon: Facebook },
].filter(link => link.href)

function sortAnnouncements(announcements) {
  return [...announcements].sort((left, right) => {
    if (left.pinned !== right.pinned) {
      return left.pinned ? -1 : 1
    }

    return new Date(right.date) - new Date(left.date)
  })
}

function AnnouncementCard({ announcement, index }) {
  const [expanded, setExpanded] = useState(false)
  const badgeClass = announcementBadgeColor(announcement.type)
  const hasLongBody = announcement.body && announcement.body.length > 200

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'card-base overflow-hidden transition-all duration-300',
        announcement.pinned && 'border-gold-500/25'
      )}
    >
      {/* Pinned strip */}
      {announcement.pinned && (
        <div className="h-0.5 bg-gradient-to-r from-gold-500/60 to-transparent" />
      )}

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', badgeClass)}>
              {announcement.badge}
            </span>
            {announcement.pinned && (
              <span className="flex items-center gap-1 text-xs text-gold-700/70">
                <Pin size={11} />
                Καρφιτσωμένο
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[rgba(47,29,15,0.38)] shrink-0">
            <Calendar size={11} />
            {formatDate(announcement.date)}
          </div>
        </div>

        <h3 className="font-serif text-xl font-semibold text-[rgba(31,18,9,0.9)] mb-2">
          {announcement.title}
        </h3>

        <p className="text-sm text-[rgba(47,29,15,0.58)] leading-relaxed mb-4">
          {announcement.excerpt}
        </p>

        {/* Expanded body */}
        {expanded && announcement.body && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[rgba(47,29,15,0.56)] leading-relaxed border-t border-[rgba(127,91,48,0.10)] pt-4 mb-4">
              {announcement.body}
            </p>
          </motion.div>
        )}

        <div className="flex items-center gap-4 flex-wrap">
          {hasLongBody && (
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="text-sm text-gold-700 hover:text-gold-600 transition-colors flex items-center gap-1"
            >
              {expanded ? 'Λιγότερα' : 'Διαβάστε περισσότερα'}
              <ArrowRight size={13} className={cn('transition-transform', expanded && 'rotate-90')} />
            </button>
          )}

          {announcement.cta && (
            <Link
              to={announcement.cta.href}
              className="btn-outline text-xs px-4 py-2"
            >
              {announcement.cta.label} <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Announcements() {
  const [filter, setFilter] = useState('all')

  const filtered = sortAnnouncements(
    filter === 'all'
      ? publishedAnnouncements
      : publishedAnnouncements.filter(a => a.type === filter)
  )

  return (
    <PageTransition>
      <Helmet>
        <title>Νέα & Ανακοινώσεις | Μεταξύ Μας</title>
        <meta name="description" content="Τελευταίες ανακοινώσεις, ειδικές βραδιές, αλλαγές ωραρίου και νέα από το Μεταξύ Μας." />
      </Helmet>

      <PageHero
        label="Νέα & Ανακοινώσεις"
        title="Τελευταίες Ειδήσεις"
        subtitle="Ειδικές βραδιές, αλλαγές ωραρίου, νέα μενού — μείνετε ενημερωμένοι."
      />

      <section className="section-padding">
        <div className="container-narrow">
          {/* Filter tabs */}
          <SectionReveal className="flex flex-wrap gap-2 mb-10">
            {typeFilters.map(f => (
              <button
                type="button"
                key={f.value}
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={cn(
                  'menu-tab inline-flex items-center gap-1.5',
                  filter === f.value && 'menu-tab-active'
                )}
              >
                {f.Icon && <f.Icon size={12} />}
                {f.label}
              </button>
            ))}
          </SectionReveal>

          {/* Announcements */}
          <div className="space-y-5">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-[rgba(47,29,15,0.38)]">
                <p>Δεν υπάρχουν ανακοινώσεις σε αυτή την κατηγορία.</p>
              </div>
            ) : (
              filtered.map((a, i) => (
                <AnnouncementCard key={a.id} announcement={a} index={i} />
              ))
            )}
          </div>

          {/* Social follow */}
          <SectionReveal className="mt-14">
            <div className="card-base p-8 text-center">
              <p className="label-upper mb-3">Μείνετε ενημερωμένοι</p>
              <h3 className="heading-card text-[rgba(31,18,9,0.9)] mb-3">Ακολουθήστε μας</h3>
              <p className="text-sm text-[rgba(47,29,15,0.56)] mb-6">
                Για τελευταία νέα, live stories και πρώτη πληροφόρηση για events.
              </p>
              {socialLinks.length > 0 ? (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-sm"
                    >
                      <Icon size={14} />
                      {label}
                    </a>
                  ))}
                </div>
              ) : (
                <a href={`tel:${business.phone}`} className="btn-outline text-sm">
                  Καλέστε μας <ArrowRight size={14} />
                </a>
              )}
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  )
}
