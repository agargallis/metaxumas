import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Music, Calendar, Clock, Users, ArrowRight, ChevronRight, Guitar, Mic2, Radio, Star } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { recurringEvents, upcomingEvents } from '../data/events'
import { formatDate, getDayName } from '../lib/utils'

function RecurringCard({ event }) {
  return (
    <div className="card-base p-7 relative overflow-hidden group h-full">
      {/* Side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-wine-500/60 to-transparent group-hover:via-wine-400/80 transition-colors duration-300" />

      <div className="pl-3">
        {/* Day badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(122,30,46,0.10)] border border-[rgba(122,30,46,0.18)] text-wine-700 text-xs font-medium mb-5">
          <Calendar size={12} />
          {event.day}
        </div>

        {event.highlight && (
          <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/20">
            Highlight
          </span>
        )}

        <h3 className="font-serif text-xl font-semibold text-[rgba(31,18,9,0.9)] mb-2 group-hover:text-gold-700 transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-[rgba(47,29,15,0.56)] leading-relaxed mb-5">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[rgba(47,29,15,0.46)]">
            <Clock size={12} className="text-gold-500/60" />
            <span>Έναρξη: {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[rgba(47,29,15,0.46)]">
            <Music size={12} className="text-gold-500/60" />
            <span>{event.genre}</span>
          </div>
          {event.reservationRequired && (
            <div className="flex items-center gap-2 text-xs text-[rgba(47,29,15,0.46)]">
              <Users size={12} className="text-gold-500/60" />
              <span>Συνιστάται κράτηση</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function UpcomingEventCard({ event }) {
  const dateLabel = formatDate(event.date)
  const dayLabel  = getDayName(event.date)

  return (
    <div className="card-base overflow-hidden group">
      {/* Date strip */}
      <div className="h-1 bg-gradient-to-r from-wine-600/40 via-gold-500/40 to-transparent" />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs text-gold-400/70 font-medium tracking-wide uppercase mb-1">{dayLabel}</p>
            <p className="text-sm font-medium text-[rgba(47,29,15,0.58)]">{dateLabel}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-[rgba(47,29,15,0.38)]">{event.time}</span>
          </div>
        </div>

        <h3 className="font-serif text-lg font-semibold text-[rgba(31,18,9,0.9)] mb-2 group-hover:text-gold-700 transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-[rgba(47,29,15,0.56)] mb-4 leading-relaxed">{event.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags?.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(127,91,48,0.06)] border border-[rgba(127,91,48,0.12)] text-[rgba(47,29,15,0.46)]">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[rgba(127,91,48,0.10)]">
          <div>
            {event.artist && event.artist !== '[Καλλιτέχνης]' && (
              <p className="text-xs text-[rgba(47,29,15,0.46)]">🎤 {event.artist}</p>
            )}
            <p className="text-xs text-[rgba(47,29,15,0.38)]">{event.price}</p>
          </div>
          {event.reservationRequired && (
            <Link
              to="/reservations"
              className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1 transition-colors"
            >
              Κράτηση <ChevronRight size={12} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LiveMusic() {
  return (
    <PageTransition>
      <Helmet>
        <title>Ζωντανή Μουσική | Μεταξύ Μας</title>
        <meta name="description" content="Ζωντανή μουσική κάθε Παρασκευή και Σάββατο — ελληνική λαϊκή, ρεμπέτικο, acoustic. Κλείστε τραπέζι για τη μουσική σας βραδιά." />
      </Helmet>

      <PageHero
        label="Ζωντανή Μουσική"
        title="Βραδιές που δεν ξεχνιούνται"
        subtitle="Κάθε εβδομάδα ζωντανά σχήματα, ζωντανές στιγμές — ελληνική μουσική στη ψυχή της."
      />

      {/* Recurring events */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionReveal className="mb-12">
            <p className="label-upper mb-3">Εβδομαδιαίο Πρόγραμμα</p>
            <h2 className="heading-section text-[rgba(31,18,9,0.9)] mb-2">Τακτικές Βραδιές</h2>
            <div className="divider-gold !mx-0" />
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recurringEvents.map(event => (
              <StaggerItem key={event.id}>
                <RecurringCard event={event} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Upcoming one-time events */}
      <section className="section-padding border-y border-[rgba(127,91,48,0.10)]" style={{ background: 'var(--bg-raised)' }}>
        <div className="container-wide">
          <SectionReveal className="mb-12">
            <p className="label-upper mb-3">Προσεχώς</p>
            <h2 className="heading-section text-[rgba(31,18,9,0.9)] mb-2">Επερχόμενες Εκδηλώσεις</h2>
            <div className="divider-gold !mx-0" />
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {upcomingEvents.map(event => (
              <StaggerItem key={event.id}>
                <UpcomingEventCard event={event} />
              </StaggerItem>
            ))}
          </StaggerReveal>

          <SectionReveal>
            <div className="p-8 rounded-3xl bg-[rgba(255,251,246,0.72)] border border-[rgba(127,91,48,0.12)] border-dashed text-center">
              <Music size={28} className="text-gold-500/40 mx-auto mb-3" />
              <p className="text-sm text-[rgba(47,29,15,0.48)] mb-1">Περισσότερες εκδηλώσεις προσεχώς</p>
              <p className="text-xs text-[rgba(47,29,15,0.36)]">Ακολουθήστε μας στο Instagram για τελευταίες ανακοινώσεις</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Artist / venue info */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionReveal className="text-center mb-14">
            <p className="label-upper mb-3">Η Μουσική μας Ψυχή</p>
            <h2 className="heading-section text-[rgba(31,18,9,0.9)] mb-4">Τι να περιμένετε</h2>
            <div className="divider-gold" />
            <p className="body-lead">
              Το «Μεταξύ Μας» επιλέγει με φροντίδα τα σχήματα που φιλοξενεί.
              Από νέους καλλιτέχνες της ελληνικής σκηνής ως καταξιωμένα ονόματα
              του ρεμπέτικου — η μουσική εδώ είναι αυθεντική.
            </p>
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { Icon: Guitar, title: 'Ελληνική Λαϊκή', desc: 'Τα αγαπημένα τραγούδια που ξέρουμε όλοι — live, με πάθος.' },
              { Icon: Mic2,   title: 'Ρεμπέτικο',       desc: 'Η ρίζα της ελληνικής μουσικής — ειλικρινές και αυθεντικό.' },
              { Icon: Radio,  title: 'Acoustic Βραδιές', desc: 'Ήπια, ατμοσφαιρική μουσική για χαλαρές στιγμές.' },
              { Icon: Star,   title: 'Ειδικές Εκδηλώσεις', desc: 'Εορταστικές βραδιές, αφιερώματα και surprises.' },
            ].map(item => (
              <StaggerItem key={item.title}>
                <div className="card-base p-6 flex items-start gap-4">
                  <span className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 shrink-0">
                    <item.Icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-serif font-semibold text-[rgba(31,18,9,0.9)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[rgba(47,29,15,0.56)]">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: 'var(--bg-raised)' }}>
        <div className="container-narrow text-center">
          <SectionReveal>
            <p className="label-upper mb-4">Μην χάσετε τη βραδιά</p>
            <h2 className="heading-section text-[rgba(31,18,9,0.9)] mb-4">Κλείστε τραπέζι<br /><span className="text-gold-700">για μουσική βραδιά</span></h2>
            <p className="body-lead mb-8 max-w-md mx-auto">
              Οι θέσεις για τις βραδιές ζωντανής μουσικής γεμίζουν γρήγορα.
              Εξασφαλίστε τη θέση σας έγκαιρα.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reservations" className="btn-primary text-base px-8 py-4">
                Κράτηση για Μουσική Βραδιά
              </Link>
              <Link to="/contact" className="btn-outline text-base px-8 py-4">
                Επικοινωνία <ArrowRight size={16} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  )
}
