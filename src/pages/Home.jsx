import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  ImageIcon,
  MapPin,
  Music2,
  Phone,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import StarRating from '../components/ui/StarRating'
import PageTransition from '../components/ui/PageTransition'
import { business } from '../data/business'
import { featuredItems } from '../data/menu'
import { recurringEvents } from '../data/events'
import { featuredReviews, ratingStats } from '../data/reviews'
import { instagramPosts } from '../data/gallery'
import { cn } from '../lib/utils'
import logoSrc from '../assets/images/logo.png'

const spring = [0.22, 1, 0.36, 1]

const photos = instagramPosts.slice(0, 3).map((post, index) => ({
  id: post.id,
  title: [
    'Γωνιά του χώρου',
    'Ατμόσφαιρα για παρέα',
    'Στιγμή από βραδιά',
  ][index] || 'Photo placeholder',
  caption: post.caption,
  accent: [
    'linear-gradient(145deg, rgba(237,196,141,0.92), rgba(250,237,214,0.94))',
    'linear-gradient(145deg, rgba(225,171,145,0.92), rgba(247,223,208,0.94))',
    'linear-gradient(145deg, rgba(229,191,156,0.92), rgba(250,235,217,0.94))',
  ][index],
}))

function SectionWrap({ children, className = '' }) {
  return (
    <section className={cn('section-padding-sm', className)}>
      <div className="container-wide">{children}</div>
    </section>
  )
}

function SectionHeading({ label, title, body }) {
  return (
    <div className="mx-auto mb-12 max-w-[46rem] text-center">
      <p className="label-upper mb-3">{label}</p>
      <h2 className="heading-section mx-auto mb-4 max-w-[42rem] text-[rgba(31,18,9,0.92)]">{title}</h2>
      {body ? <p className="body-lead mx-auto max-w-[38rem] text-[rgba(47,29,15,0.60)]">{body}</p> : null}
    </div>
  )
}

function HeroStat({ label, value }) {
  return (
    <div className="min-w-[10rem] border-b border-[rgba(127,91,48,0.12)] px-2 py-4 text-center">
      <p className="text-fine mb-1">{label}</p>
      <p className="text-sm text-[rgba(31,18,9,0.84)]">{value}</p>
    </div>
  )
}

function Hero() {
  return (
    <SectionWrap className="pt-2 sm:pt-4">
      <div className="relative mx-auto max-w-5xl px-4 py-6 text-center sm:px-6 sm:py-10">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-80 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(234,196,142,0.34) 0%, rgba(246,230,206,0.24) 42%, transparent 74%)',
          }}
        />
        <div
          className="pointer-events-none absolute left-8 top-12 h-32 w-32 rounded-full opacity-70 blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(232,184,116,0.16) 0%, transparent 72%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-10 right-8 h-40 w-40 rounded-full opacity-70 blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(193,122,98,0.12) 0%, transparent 72%)' }}
        />

        <SectionReveal className="relative z-10 mx-auto max-w-4xl">
          <div className="hidden">
            <Sparkles size={14} className="text-gold-600" />
            <span className="label-upper !text-[0.62rem] !tracking-[0.18em]">Μεταξύ Μας</span>
          </div>

          <img
            src={logoSrc}
            alt="Μεταξύ Μας"
            className="mx-auto h-16 w-auto object-contain sm:h-[5.5rem]"
            style={{ filter: 'drop-shadow(0 16px 28px rgba(175,120,36,0.12))' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: spring }}
            className="mx-auto mt-8 max-w-4xl text-[clamp(3rem,6vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-[rgba(31,18,9,0.94)]"
          >
            Καφές , μεζές
            <span className="block text-gold-700">γλέντι και όχι μόνο…</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.62, ease: spring }}
            className="mx-auto mt-6 max-w-[38rem] text-[1.03rem] leading-8 text-[rgba(47,29,15,0.60)]"
          >
            Ένας χώρος που αλλάζει ρυθμό μέσα στη μέρα, αλλά κρατά την ίδια ζεστή αίσθηση από τον πρώτο καφέ μέχρι
            την τελευταία μουσική βραδιά.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.58, ease: spring }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/reservations" className="btn-primary text-sm">
              Κράτηση Τραπεζιού
            </Link>
            <Link to="/menu" className="btn-outline text-sm">
              Δείτε το Μενού <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.58, ease: spring }}
            className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-x-8 gap-y-2 border-t border-[rgba(127,91,48,0.10)] pt-6 sm:flex-row sm:flex-wrap"
          >
            <HeroStat label="Google Reviews" value={`${ratingStats.average} / 5`} />
            <HeroStat label="Ωράριο" value={business.hoursSimple} />
            <HeroStat label="Τοποθεσία" value={`${business.address.area}, ${business.address.city}`} />
          </motion.div>
        </SectionReveal>
      </div>
    </SectionWrap>
  )
}

function PhotoCard({ item }) {
  return (
    <div className="space-y-4">
      <div
        className="relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-[rgba(145,97,39,0.12)]"
        style={{ background: item.accent }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.64),transparent_36%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/70 bg-white/72 px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(60,36,20,0.7)]">
              Photo Placeholder
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/72 text-[rgba(74,40,18,0.76)]">
              <ImageIcon size={16} />
            </span>
          </div>
          <p className="text-sm text-[rgba(60,36,20,0.58)]">{item.caption}</p>
        </div>
      </div>

      <div className="border-b border-[rgba(127,91,48,0.12)] pb-4">
        <h3 className="heading-card mb-2 text-[rgba(31,18,9,0.88)]">{item.title}</h3>
        <p className="text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">
          Ένα ήσυχο, φιλικό σημείο του χώρου που μπορεί να αντικατασταθεί αργότερα με πραγματική φωτογραφία από το
          εστιατόριο.
        </p>
      </div>
    </div>
  )
}

function StorySection() {
  return (
    <SectionWrap>
      <SectionHeading
        label="Ο Χώρος"
        title="Μερικές εικόνες και μια μικρή περιγραφή του εστιατορίου."
        body="Το «Μεταξύ Μας» είναι χώρος για όλες τις ώρες: πιο χαλαρός το πρωί, πιο ζωντανός το βράδυ, πάντα με απλή και φιλική ατμόσφαιρα."
      />

      <StaggerReveal className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {photos.map(photo => (
          <StaggerItem key={photo.id}>
            <PhotoCard item={photo} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </SectionWrap>
  )
}

function ListRow({ eyebrow, title, body, trailing }) {
  return (
    <div className="border-b border-[rgba(127,91,48,0.12)] py-5 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(111,70,28,0.56)]">{eyebrow}</p>
          ) : null}
          <p className="text-[1.05rem] font-semibold text-[rgba(31,18,9,0.88)]">{title}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">{body}</p>
        </div>
        {trailing ? <div className="shrink-0">{trailing}</div> : null}
      </div>
    </div>
  )
}

function HouseHighlights() {
  const liveItems = recurringEvents.filter(event => event.highlight).slice(0, 2)

  return (
    <SectionWrap>
      <SectionHeading
        label="Τι ξεχωρίζει"
        title="Γεύσεις και live βραδιές με καθαρή, ίδια ευθυγράμμιση."
        body="Κρατάμε την ενότητα που ήθελες, αλλά με πιο ήπια παρουσίαση και καλύτερη στοίχιση στους τίτλους και στο περιεχόμενο."
      />

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
        <SectionReveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(212,148,26,0.12)] text-gold-700">
              <UtensilsCrossed size={18} />
            </span>
            <div>
              <p className="label-upper mb-1 !text-[0.58rem]">Από το μενού</p>
              <h3 className="heading-card text-[rgba(31,18,9,0.9)]">Γεύσεις που αξίζει να δεις πρώτα</h3>
            </div>
          </div>

          <div>
            {featuredItems.slice(0, 4).map(item => (
              <ListRow
                key={item.id}
                eyebrow={item.categoryLabel}
                title={item.name}
                body={item.description}
                trailing={
                  item.price != null ? (
                    <span className="rounded-full bg-[rgba(212,148,26,0.12)] px-3 py-1 text-xs text-gold-700">
                      {item.price.toFixed(2)}€
                    </span>
                  ) : null
                }
              />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal variant="slideRight">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(122,30,46,0.08)] text-wine-700">
              <Music2 size={18} />
            </span>
            <div>
              <p className="label-upper mb-1 !text-[0.58rem]">Live πρόγραμμα</p>
              <h3 className="heading-card text-[rgba(31,18,9,0.9)]">Οι βραδιές που γεμίζουν πιο γρήγορα</h3>
            </div>
          </div>

          <div>
            {liveItems.map(event => (
              <ListRow
                key={event.id}
                eyebrow={`${event.day} · ${event.time}`}
                title={event.title}
                body={event.description}
                trailing={<Calendar size={16} className="text-gold-600" />}
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </SectionWrap>
  )
}

function ReviewsSection() {
  return (
    <SectionWrap>
      <SectionHeading
        label="Κριτικές"
        title="Αυτό που μένει από την εμπειρία."
        body="Κρατάμε τις κριτικές ως βασικό κομμάτι της αρχικής, αλλά με πιο ήσυχη, καθαρή διάταξη και σωστή στοίχιση."
      />

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[16rem_minmax(0,1fr)]">
        <SectionReveal>
          <div className="sticky top-28 text-center xl:text-left">
            <p className="text-fine mb-3">Μέσος όρος Google</p>
            <div className="flex items-end justify-center gap-3 xl:justify-start">
              <span className="font-display text-6xl leading-none text-gold-700">{ratingStats.average}</span>
              <div className="pb-1">
                <StarRating rating={ratingStats.average} size={14} />
                <p className="mt-2 text-xs text-[rgba(47,29,15,0.56)]">{ratingStats.total}+ αξιολογήσεις</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredReviews.slice(0, 2).map(review => (
            <StaggerItem key={review.id}>
              <article className="border-l border-[rgba(127,91,48,0.14)] pl-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(212,148,26,0.12)] text-gold-700">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[rgba(31,18,9,0.86)]">{review.name}</p>
                      <p className="text-fine">{review.platform} · {review.date}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={12} />
                </div>
                <p className="text-sm leading-[1.9] text-[rgba(47,29,15,0.62)]">“{review.text}”</p>
                {review.highlight ? (
                  <p className="mt-5 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(184,122,14,0.72)]">
                    {review.highlight}
                  </p>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </SectionWrap>
  )
}

function LocationSection() {
  const hasMapEmbed = Boolean(business.address.mapsEmbed)

  return (
    <SectionWrap className="pb-10">
      <SectionHeading
        label="Τοποθεσία"
        title="Χάρτης, ώρες και επικοινωνία."
        body="Η τελευταία ενότητα μένει απλή και ισορροπημένη, με σωστό κεντράρισμα στον τίτλο και καθαρό κλείσιμο της αρχικής."
      />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
        <SectionReveal>
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,250,243,0.74)]">
            <div className="aspect-[16/11] bg-[rgba(247,241,232,0.88)]">
              {hasMapEmbed ? (
                <iframe
                  src={business.address.mapsEmbed}
                  title="Χάρτης Μεταξύ Μας"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center">
                  <div>
                    <MapPin size={32} className="mx-auto mb-4 text-gold-500/60" />
                    <p className="text-sm text-[rgba(47,29,15,0.56)]">
                      Προσθέστε `mapsEmbed` στο `business.js` για πραγματικό Google Maps iframe.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal variant="slideRight">
          <div className="space-y-1">
            <ListRow
              eyebrow="Διεύθυνση"
              title={`${business.address.street}, ${business.address.area}, ${business.address.city}`}
              body="Βρείτε μας εύκολα για καφέ το πρωί ή μουσική βραδιά αργότερα."
              trailing={<MapPin size={17} className="text-gold-600" />}
            />

            <ListRow
              eyebrow="Ωράριο"
              title={business.hoursSimple}
              body={business.hours.slice(0, 3).map(row => `${row.days}: ${row.morning} · ${row.evening}`).join(' | ')}
              trailing={<Clock size={17} className="text-wine-700" />}
            />

            <ListRow
              eyebrow="Επικοινωνία"
              title={business.phoneDisplay}
              body={business.email}
              trailing={<Phone size={17} className="text-olive-700" />}
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center text-sm"
            >
              <ExternalLink size={14} />
              Οδηγίες στο Google Maps
            </a>
            <Link to="/contact" className="btn-outline justify-center text-sm">
              Περισσότερα στοιχεία <ArrowRight size={14} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </SectionWrap>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Μεταξύ Μας | Καφέ · Μεζεδοπωλείο · Ζωντανή Μουσική</title>
        <meta
          name="description"
          content="Μεταξύ Μας — κεντρικό hero, φωτογραφίες του χώρου, highlights, κριτικές και πληροφορίες τοποθεσίας σε πιο καθαρή αρχική σελίδα."
        />
      </Helmet>

      <Hero />
      <StorySection />
      <HouseHighlights />
      <ReviewsSection />
      <LocationSection />
    </PageTransition>
  )
}
