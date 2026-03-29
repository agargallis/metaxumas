import { Helmet } from 'react-helmet-async'
import { Calendar, Clock, Users, Guitar, Mic2, Radio, Star, Play } from 'lucide-react'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { recurringEvents } from '../data/events'
import { instagramPosts } from '../data/gallery'
import { business } from '../data/business'

const recurringVisuals = {
  r1: {
    image: business.locationVideoPoster || '/4.png',
    overlay: 'from-[rgba(120,52,22,0.24)] via-[rgba(60,26,10,0.20)] to-[rgba(38,20,8,0.58)]',
    badge: 'Παρασκευή βράδυ',
  },
  r2: {
    image: business.locationVideoPoster || '/4.png',
    overlay: 'from-[rgba(156,87,35,0.22)] via-[rgba(88,39,16,0.20)] to-[rgba(38,20,8,0.58)]',
    badge: 'Σάββατο live',
  },
  r3: {
    image: business.locationVideoPoster || '/4.png',
    overlay: 'from-[rgba(141,82,55,0.24)] via-[rgba(76,37,19,0.22)] to-[rgba(38,20,8,0.58)]',
    badge: 'Κυριακάτικη παρέα',
  },
}

const reelCards = [
  ...instagramPosts.filter(post => post.type === 'reel').map((post, index) => ({
    id: post.id,
    title: [
      'Ζωντανή βραδιά Παρασκευής',
      'Στιγμές από το Σάββατο',
      'Ατμόσφαιρα, μουσική, παρέα',
    ][index] || 'Instagram Reel',
    description: [
      'Μικρά στιγμιότυπα από live βραδιές με μουσική, μεζέδες και κόσμο που μένει μέχρι αργά.',
      'Ένα reel-style placeholder section για να μπει αργότερα πραγματικό Instagram περιεχόμενο.',
      'Γρήγορη εικόνα από το vibe του χώρου όταν γεμίζει η βραδινή ατμόσφαιρα.',
    ][index] || 'Instagram reel placeholder.',
    tag: index === 0 ? 'Live Reel' : 'Instagram Reel',
  })),
  {
    id: 'reel-extra',
    title: 'Κυριακάτικη μουσική στιγμή',
    description: 'Ένα ακόμη reel placeholder για στιγμές από live Κυριακής και πιο χαλαρό βραδινό κλείσιμο της εβδομάδας.',
    tag: 'Instagram Reel',
  },
]

function ExpectCard({ item }) {
  return (
    <div className="border-t border-[rgba(127,91,48,0.12)] pt-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(212,148,26,0.10)] text-gold-700">
          <item.Icon size={18} />
        </span>
        <h3 className="heading-card text-[rgba(31,18,9,0.9)]">{item.title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">{item.desc}</p>
    </div>
  )
}

function RecurringCard({ event }) {
  const visual = recurringVisuals[event.id] || recurringVisuals.r1

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,249,240,0.62)] shadow-[0_18px_50px_rgba(98,61,27,0.06)] backdrop-blur-sm">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={visual.image} alt={event.title} className="h-full w-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${visual.overlay}`} />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
          <span className="rounded-full border border-white/30 bg-white/12 px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(255,246,234,0.92)] backdrop-blur-sm">
            {visual.badge}
          </span>
          <span className="rounded-full border border-white/30 bg-white/12 px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(255,246,234,0.92)] backdrop-blur-sm">
            {event.time}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="mb-1 text-xs uppercase tracking-[0.18em] text-[rgba(255,238,219,0.72)]">{event.day}</p>
          <h3 className="font-serif text-[1.55rem] font-semibold leading-tight text-white">{event.title}</h3>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="mb-5 text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">{event.description}</p>

        <div className="space-y-2 text-xs text-[rgba(47,29,15,0.46)]">
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-gold-500/60" />
            <span>Έναρξη: {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mic2 size={12} className="text-gold-500/60" />
            <span>{event.genre}</span>
          </div>
          {event.reservationRequired ? (
            <div className="flex items-center gap-2">
              <Users size={12} className="text-gold-500/60" />
              <span>Συνιστάται κράτηση</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ReelCard({ reel }) {
  return (
    <div className="space-y-4">
      <div className="relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-[rgba(145,97,39,0.12)] bg-[linear-gradient(145deg,rgba(226,184,153,0.92),rgba(249,232,214,0.94))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.64),transparent_36%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/70 bg-white/72 px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(60,36,20,0.7)]">
              {reel.tag}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/72 text-[rgba(74,40,18,0.76)]">
              <Play size={16} />
            </span>
          </div>
          <p className="text-sm text-[rgba(60,36,20,0.82)]">Video placeholder</p>
        </div>
      </div>

      <div className="border-b border-[rgba(127,91,48,0.12)] pb-4">
        <h3 className="heading-card mb-2 text-[rgba(31,18,9,0.88)]">{reel.title}</h3>
        <p className="text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">{reel.description}</p>
      </div>
    </div>
  )
}

export default function LiveMusic() {
  return (
    <PageTransition>
      <Helmet>
        <title>Ζωντανή Μουσική | Μεταξύ Μας</title>
        <meta
          name="description"
          content="Ζωντανή μουσική κάθε εβδομάδα στο Μεταξύ Μας, με ελληνικό πρόγραμμα, acoustic βραδιές και ειδικές μουσικές εκδηλώσεις."
        />
      </Helmet>

      <section className="section-padding pt-6 sm:pt-8">
        <div className="container-wide">
          <SectionReveal className="mx-auto mb-12 max-w-[46rem] text-center">
            <p className="label-upper mb-3">Τι να περιμένετε!</p>
            <h2 className="heading-section mx-auto max-w-[42rem] text-[rgba(31,18,9,0.92)]">Live βραδιές με σωστό ρυθμό και ατμόσφαιρα.</h2>
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { Icon: Guitar, title: 'Ελληνική Λαϊκή', desc: 'Αγαπημένα τραγούδια live, σε βραδιές που μένουν παρεΐστικες και ζεστές.' },
              { Icon: Mic2, title: 'Ρεμπέτικο', desc: 'Αυθεντικός ήχος, πιο άμεσος χαρακτήρας και μουσική που ταιριάζει με το τραπέζι.' },
              { Icon: Radio, title: 'Acoustic Βραδιές', desc: 'Πιο ήπιες στιγμές με καθαρό ήχο, κρασί και κουβέντα χωρίς υπερβολή.' },
              { Icon: Star, title: 'Ειδικές Εκδηλώσεις', desc: 'Θεματικές μουσικές βραδιές και μικρά αφιερώματα όταν το πρόγραμμα το ζητά.' },
            ].map(item => (
              <StaggerItem key={item.title}>
                <ExpectCard item={item} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-wide">
          <SectionReveal className="mx-auto mb-12 max-w-[46rem] text-center">
            <p className="label-upper mb-3">Εβδομαδιαίο Πρόγραμμα</p>
            <h2 className="heading-section mx-auto max-w-[42rem] text-[rgba(31,18,9,0.92)]">Τακτικές Βραδιές</h2>
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recurringEvents.filter(event => event.day !== 'Τετάρτη').map(event => (
              <StaggerItem key={event.id}>
                <RecurringCard event={event} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section-padding border-y border-[rgba(127,91,48,0.10)]">
        <div className="container-wide">
          <SectionReveal className="mx-auto mb-12 max-w-[46rem] text-center">
            <p className="label-upper mb-3">Instagram Reels!</p>
            <h2 className="heading-section mx-auto max-w-[42rem] text-[rgba(31,18,9,0.92)]">Στιγμιότυπα από τις live βραδιές</h2>
          </SectionReveal>

          <StaggerReveal className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8">
            {reelCards.map(reel => (
              <StaggerItem key={reel.id}>
                <div className="w-full max-w-[17.5rem]">
                  <ReelCard reel={reel} />
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </PageTransition>
  )
}
