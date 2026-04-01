import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  Music2,
  Pause,
  PlayCircle,
  X,
  PhoneCall,
} from 'lucide-react'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import StarRating from '../components/ui/StarRating'
import PageTransition from '../components/ui/PageTransition'
import { business } from '../data/business'
import { recurringEvents } from '../data/events'
import { featuredReviews, ratingStats } from '../data/reviews'
import { instagramPosts } from '../data/gallery'
import { cn } from '../lib/utils'
const logoSrc = 'https://i.imgur.com/bVglvSP.png'

const spring = [0.22, 1, 0.36, 1]

const photos = instagramPosts.slice(0, 3).map((post, index) => ({
  id: post.id,
  title: ['Γωνιά του χώρου', 'Ατμόσφαιρα για παρέα', 'Στιγμή από βραδιά'][index] || 'Photo placeholder',
  eyebrow: ['Μεταξύ Μας', 'Μεταξύ Μας', 'Μεταξύ Μας'][index] || 'Μεταξύ Μας',
  note: [
    'Χώρος για ήσυχο καφέ και χαλαρή πρώτη στάση της ημέρας.',
    'Σημείο που δένει με κουβέντα, κρασί και πιο ζεστή ατμόσφαιρα.',
    'Η βραδινή πλευρά του μαγαζιού, πιο ζωντανή αλλά πάντα οικεία.',
  ][index] || 'Μια premium γωνιά του χώρου.',
  caption: post.caption,
  image: ['https://i.imgur.com/EVzlEPH.png', 'https://i.imgur.com/bHlj9oV.png', 'https://i.imgur.com/iffquOm.jpeg'][index],
  accent: [
    'linear-gradient(145deg, rgba(237,196,141,0.92), rgba(250,237,214,0.94))',
    'linear-gradient(145deg, rgba(225,171,145,0.92), rgba(247,223,208,0.94))',
    'linear-gradient(145deg, rgba(229,191,156,0.92), rgba(250,235,217,0.94))',
  ][index],
}))

function TikTokIcon({ className = '', size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
    >
      <path d="M14.5 3c.3 2.1 1.5 3.9 3.6 4.9 1 .5 2 .7 3.1.7v3.1c-1.7 0-3.5-.4-5-1.2v5.8c0 3.7-3 6.7-6.7 6.7S2.8 20 2.8 16.3s3-6.7 6.7-6.7c.5 0 1 0 1.5.2v3.2c-.5-.2-1-.3-1.5-.3-2 0-3.7 1.7-3.7 3.7s1.7 3.7 3.7 3.7 3.7-1.6 3.7-3.7V3h1.3Z" />
    </svg>
  )
}

const storySocialLinks = [
  { href: business.social.facebook, label: 'Facebook', Icon: Facebook },
  { href: business.social.instagram, label: 'Instagram', Icon: Instagram },
  { href: business.social.tiktok, label: 'TikTok', Icon: TikTokIcon },
].filter(item => Boolean(item.href))

function SectionWrap({ children, className = '' }) {
  return (
    <section className={cn('section-padding-sm', className)}>
      <div className="container-wide">{children}</div>
    </section>
  )
}

function SectionHeading({ label, title }) {
  return (
    <div className="mx-auto mb-12 max-w-[46rem] text-center">
      <p className="label-upper mb-3">{label}</p>
      <h2 className="heading-section mx-auto max-w-[42rem] text-[rgba(31,18,9,0.92)]">{title}</h2>
    </div>
  )
}

function Hero() {
  return (
    <SectionWrap className="pb-4 pt-2 sm:pb-5 sm:pt-4">
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
          <img
            src={logoSrc}
            alt="Μεταξύ Μας"
            className="hero-mark-float mx-auto h-16 w-auto object-contain sm:h-[5.5rem]"
            style={{ filter: 'drop-shadow(0 16px 28px rgba(175,120,36,0.12))' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: spring }}
            className="mx-auto mt-8 max-w-4xl text-[clamp(3rem,6vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-[rgba(31,18,9,0.94)]"
          >
            Καφές , μεζές
            <span className="block text-gold-700">γλέντι & όχι μόνο...</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.58, ease: spring }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/reservations" className="btn-primary text-sm">
              Κράτηση τραπεζιού
            </Link>
            <Link to="/menu" className="btn-outline text-sm">
              Δες το μενού <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.72 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.26, duration: 0.62, ease: spring }}
            className="mx-auto mt-8 h-px w-40 origin-center bg-gradient-to-r from-transparent via-[rgba(190,129,28,0.52)] to-transparent sm:mt-10 sm:w-52"
          />
        </SectionReveal>
      </div>
    </SectionWrap>
  )
}

function PhotoCard({ item, onOpen }) {
  return (
    <div className="group">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block w-full overflow-hidden rounded-[2rem] border border-[rgba(213,174,116,0.16)] p-3 text-left text-[rgba(255,244,226,0.9)] shadow-[0_20px_48px_rgba(63,40,25,0.22)] transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(233,191,120,0.24)] hover:shadow-[0_28px_66px_rgba(50,30,16,0.28)]"
        style={{ background: 'linear-gradient(180deg, rgba(63,40,25,0.94) 0%, rgba(49,31,19,0.92) 100%)' }}
        aria-label={`Άνοιγμα εικόνας: ${item.title}`}
      >
        <div
          className="relative aspect-[4/4.6] overflow-hidden rounded-[1.55rem] border border-[rgba(255,255,255,0.34)] transition-transform duration-500 group-hover:scale-[1.015]"
          style={{ background: item.accent }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_32%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent_0%,rgba(88,52,25,0.06)_40%,rgba(58,34,18,0.22)_100%)]" />
          <div className="absolute left-1/2 top-6 h-px w-28 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.76),transparent)]" />
          <div className="absolute inset-0 rounded-[1.55rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.36)]" />

          <div className="absolute inset-0">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </button>
    </div>
  )
}

function PhotoModal({ item, onClose }) {
  const [controlsVisible, setControlsVisible] = useState(true)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    setControlsVisible(true)
  }, [item?.id])

  if (!item) return null

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 sm:px-6" role="dialog" aria-modal="true" aria-label={item.title}>
      <button
        type="button"
        aria-label="Κλείσιμο"
        className="absolute inset-0 bg-[rgba(38,20,8,0.34)] backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.32)] bg-[rgba(249,239,223,0.84)] shadow-[0_32px_120px_rgba(49,24,10,0.28)] backdrop-blur-xl">
        <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden px-6 py-6 sm:min-h-[30rem] sm:px-8 sm:py-8" style={{ background: item.accent }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.62),transparent_34%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent_0%,rgba(88,52,25,0.10)_45%,rgba(58,34,18,0.26)_100%)]" />

          <div
            className={cn(
              'absolute right-4 top-4 z-20 flex items-start justify-end transition-all duration-200',
              controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[rgba(74,40,18,0.82)] shadow-[0_8px_20px_rgba(117,74,37,0.14)] transition-colors hover:bg-white"
              aria-label="Κλείσιμο εικόνας"
            >
              <X size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setControlsVisible(visible => !visible)}
            className="relative z-10 flex w-full items-center justify-center bg-transparent"
            aria-label={controlsVisible ? 'Απόκρυψη χειριστηρίων' : 'Εμφάνιση χειριστηρίων'}
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[80vh] w-full object-contain"
            />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function StorySection() {
  const [activePhoto, setActivePhoto] = useState(null)

  return (
    <>
      <SectionWrap className="pt-3 sm:pt-4">
        <SectionReveal className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {storySocialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(145,97,39,0.12)] bg-[rgba(255,248,238,0.76)] text-[rgba(106,66,31,0.82)] shadow-[0_14px_28px_rgba(109,71,33,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(184,122,14,0.22)] hover:text-gold-700"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </SectionReveal>

        <SectionHeading label="Ο Χώρος Μας!" title="Μια σύντομη &quot;μυρωδιά&quot; από το μαγαζί μας." />

        <StaggerReveal className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {photos.map(photo => (
            <StaggerItem key={photo.id}>
              <PhotoCard item={photo} onOpen={setActivePhoto} />
            </StaggerItem>
          ))}
        </StaggerReveal>

        <SectionReveal className="mt-8 flex justify-center">
          <a
            href="https://shorturl.at/DARze"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 text-sm"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.46a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.08 3.55-5.14 3.55-8.65Z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3A7.18 7.18 0 0 1 12 19.2a7.2 7.2 0 0 1-6.76-4.97H1.24v3.1A12 12 0 0 0 12 24Z" />
              <path fill="#FBBC05" d="M5.24 14.23A7.2 7.2 0 0 1 4.84 12c0-.77.14-1.52.4-2.23v-3.1H1.24A12 12 0 0 0 0 12c0 1.94.46 3.77 1.24 5.33l4-3.1Z" />
              <path fill="#EA4335" d="M12 4.8c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.95 1.13 15.24 0 12 0A12 12 0 0 0 1.24 6.67l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
            </svg>
            Δες παραπάνω εδώ
          </a>
        </SectionReveal>
      </SectionWrap>

      {activePhoto ? <PhotoModal item={activePhoto} onClose={() => setActivePhoto(null)} /> : null}
    </>
  )
}

function ListRow({
  eyebrow,
  title,
  body,
  trailing,
  titleHref,
  bodyHref,
  titleExternal = false,
  bodyExternal = false,
}) {
  const linkClassName = 'transition-colors hover:text-gold-700'

  const renderLink = (content, href, external, className) => {
    if (!href) return content

    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {content}
      </a>
    )
  }

  return (
    <div className="border-b border-[rgba(127,91,48,0.12)] py-5 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow ? <p className="mb-2 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(111,70,28,0.56)]">{eyebrow}</p> : null}
          {renderLink(
            <p className="text-[1.05rem] font-semibold text-[rgba(31,18,9,0.88)]">{title}</p>,
            titleHref,
            titleExternal,
            linkClassName
          )}
          {renderLink(
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">{body}</p>,
            bodyHref,
            bodyExternal,
            `inline-block ${linkClassName}`
          )}
        </div>
        {trailing ? <div className="shrink-0">{trailing}</div> : null}
      </div>
    </div>
  )
}

function HouseHighlights() {
  const liveItems = recurringEvents.filter(event => event.highlight).slice(0, 3)
  const hasLocationVideo = Boolean(business.locationVideoSrc)
  const videoRef = useRef(null)
  const feedbackTimeoutRef = useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoFeedback, setVideoFeedback] = useState(null)

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
    }
  }, [])

  const toggleVideoPlayback = async () => {
    if (!videoRef.current) return

    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)

    if (videoRef.current.paused) {
      setVideoFeedback(null)

      try {
        await videoRef.current.play()
        setIsVideoPlaying(true)
      } catch {
        setIsVideoPlaying(false)
      }
    } else {
      videoRef.current.pause()
      setIsVideoPlaying(false)
      setVideoFeedback('pause')
      feedbackTimeoutRef.current = setTimeout(() => setVideoFeedback(null), 650)
    }
  }

  return (
    <SectionWrap>
      <SectionHeading label="Σε Τι Ξεχωρίζουμε;" title="Live βραδιές που μένουν αξέχαστες." />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] xl:items-stretch">
        <SectionReveal className="h-full">
          <div className="relative min-h-[22rem] h-full overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(91,50,24,0.84),rgba(188,126,71,0.36))] shadow-[0_24px_60px_rgba(98,61,27,0.08)] xl:min-h-0">
            {hasLocationVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={business.locationVideoSrc}
                  poster={business.locationVideoPoster || '/https://i.imgur.com/xiAmv2X.png'}
                  preload="metadata"
                  playsInline
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={toggleVideoPlayback}
                  aria-label={isVideoPlaying ? 'Παύση βίντεο' : 'Αναπαραγωγή βίντεο'}
                  className={cn(
                    'absolute inset-0 flex items-center justify-center transition-colors duration-300',
                    isVideoPlaying
                      ? 'bg-transparent hover:bg-[linear-gradient(180deg,rgba(28,15,7,0.04),rgba(28,15,7,0.12))]'
                      : 'bg-[linear-gradient(180deg,rgba(28,15,7,0.04),rgba(28,15,7,0.14))] hover:bg-[linear-gradient(180deg,rgba(28,15,7,0.08),rgba(28,15,7,0.18))]'
                  )}
                >
                  {!isVideoPlaying || videoFeedback === 'pause' ? (
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-[rgba(255,248,238,0.14)] text-white shadow-[0_12px_32px_rgba(20,10,4,0.26)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                      {videoFeedback === 'pause' ? <Pause size={24} /> : <PlayCircle size={28} />}
                    </span>
                  ) : null}
                </button>
              </>
            ) : null}

            {!hasLocationVideo ? (
              <div className="absolute inset-0">
                <img src={business.locationVideoPoster || '/https://i.imgur.com/xiAmv2X.png'} alt="Preview live βραδιάς" className="h-full w-full object-cover opacity-28" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,22,10,0.18),rgba(40,22,10,0.54))]" />
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                  <div>
                    <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/28 bg-white/12 text-white backdrop-blur-sm">
                      <PlayCircle size={28} />
                    </span>
                    <p className="text-sm uppercase tracking-[0.18em] text-[rgba(255,244,228,0.7)]">Future live video</p>
                    <p className="mt-3 text-base leading-7 text-[rgba(255,248,238,0.88)]">
                      Ανέβασε αργότερα ένα βίντεο στο <span className="font-semibold">public/location-story.mp4</span> και θα εμφανιστεί εδώ.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </SectionReveal>

        <SectionReveal variant="slideRight">
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,249,240,0.58)] px-5 py-5 shadow-[0_18px_50px_rgba(98,61,27,0.06)] backdrop-blur-sm sm:px-6 sm:py-6">
            <div className="mb-5 flex items-center justify-center gap-3 text-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[rgba(122,30,46,0.08)] text-wine-700">
                <Music2 size={18} />
              </span>
              <div className="min-w-0">
                <p className="label-upper mb-1 !text-[0.58rem]">Lives</p>
                <h3 className="heading-card text-[rgba(31,18,9,0.9)]">Παρασκευή, Σάββατο & Κυριακή</h3>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[rgba(122,30,46,0.08)] text-wine-700">
                <Music2 size={18} />
              </span>
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

            <div className="mt-8 flex justify-center">
              <Link to="/live-music" className="btn-outline text-sm">
                Δες λεπτομέρειες <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </SectionWrap>
  )
}

function ReviewsSection() {
  return (
    <SectionWrap>
      <SectionHeading label="Οι Κριτικές Μας!" title="Τι λένε οι επισκέπτες μας;" />

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[16rem_minmax(0,1fr)]">
        <SectionReveal className="h-full">
          <a
            href={business.googleReviewsUrl || business.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sticky top-28 block text-center transition-opacity hover:opacity-85 xl:text-left"
          >
            <p className="text-fine mb-3">Μέσος όρος Google</p>
            <div className="flex items-end justify-center gap-3 xl:justify-start">
              <span className="font-display text-6xl leading-none text-gold-700">{ratingStats.average}</span>
              <div className="pb-1">
                <StarRating rating={ratingStats.average} size={14} fullOnFraction />
                <p className="mt-2 text-xs text-[rgba(47,29,15,0.56)]">{ratingStats.total}+ αξιολογήσεις</p>
              </div>
            </div>
          </a>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredReviews.slice(0, 3).map(review => (
            <StaggerItem key={review.id}>
              <a
                href={review.url || business.googleReviewsUrl || business.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-l border-[rgba(127,91,48,0.14)] pl-6 transition-colors hover:text-gold-700"
              >
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
                  <p className="mt-5 text-[0.62rem] uppercase tracking-[0.16em] text-[rgba(184,122,14,0.72)]">{review.highlight}</p>
                ) : null}
              </a>
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
      <SectionHeading label="Η Τοποθεσία Μας!" title="Μάθε πληροφορίες για εμάς." />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] xl:items-stretch">
        <SectionReveal className="h-full">
          <div className="h-full min-h-[22rem] overflow-hidden rounded-[2rem] bg-[rgba(247,241,232,0.88)] shadow-[0_18px_44px_rgba(98,61,27,0.06)] xl:min-h-0">
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
                  <p className="text-sm text-[rgba(47,29,15,0.56)]">Προσθέστε `mapsEmbed` στο `business.js` για πραγματικό Google Maps iframe.</p>
                </div>
              </div>
            )}
          </div>
        </SectionReveal>

        <SectionReveal variant="slideRight">
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,249,240,0.58)] px-5 py-5 shadow-[0_18px_50px_rgba(98,61,27,0.06)] backdrop-blur-sm sm:px-6 sm:py-6">
            <div className="space-y-1">
              <ListRow
                eyebrow="Διεύθυνση"
                title={`${business.address.street}, ${business.address.area}`}
                body="Βρες μας εύκολα για καφέ το πρωί ή μουσική βραδιά αργότερα."
                trailing={<MapPin size={17} className="text-gold-600" />}
                titleHref={business.address.mapsUrl}
                titleExternal
              />

              <ListRow
                eyebrow="Ωράριο"
                title={business.hoursSimple}
                body={business.hoursLocationSummary}
                trailing={<Clock size={17} className="text-wine-700" />}
              />

              <ListRow
                eyebrow="Επικοινωνία"
                title={business.phoneDisplay}
                body={business.email}
                trailing={<PhoneCall size={17} className="text-olive-700" />}
                titleHref={`tel:${business.phone}`}
                bodyHref={`mailto:${business.email}`}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href={business.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center text-sm"
              >
                <ExternalLink size={14} />
                Οδηγίες στο Google Maps
              </a>
            </div>
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
        <title>Μεταξύ Μας | Μεζεδοπωλείο & Καφέ</title>
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
