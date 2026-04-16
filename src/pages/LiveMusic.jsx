import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Helmet } from 'react-helmet-async'
import { Clock, Users, Guitar, Mic2, Radio, Star, Pause, PlayCircle, X, CalendarPlus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionReveal, { StaggerReveal, StaggerItem } from '../components/ui/SectionReveal'
import PageHero from '../components/ui/PageHero'
import PageTransition from '../components/ui/PageTransition'
import { recurringEvents } from '../data/events'
import { business } from '../data/business'
import { cn } from '../lib/utils'

const recurringVisuals = {
  r1: {
    image: 'https://i.imgur.com/lHVVHTo.png',
    modalImages: ['https://i.imgur.com/S5UEnDn.jpeg', 'https://i.imgur.com/z5mpbxn.jpeg', 'https://i.imgur.com/OPAUEIc.png'],
    overlay: 'from-[rgba(120,52,22,0.24)] via-[rgba(60,26,10,0.20)] to-[rgba(38,20,8,0.58)]',
    badge: 'Παρασκευή βράδυ',
  },
  r2: {
    image: 'https://i.imgur.com/G9RVW7J.png',
    modalImages: ['https://i.imgur.com/6OLa6lR.jpeg', 'https://i.imgur.com/CzZ08N8.jpeg', 'https://i.imgur.com/60od61a.jpeg'],
    overlay: 'from-[rgba(156,87,35,0.22)] via-[rgba(88,39,16,0.20)] to-[rgba(38,20,8,0.58)]',
    badge: 'Σάββατο live',
  },
  r3: {
    image: 'https://i.imgur.com/fSMSMbN.png',
    modalImages: ['https://i.imgur.com/Apq0MyJ.jpeg', 'https://i.imgur.com/QptOIAp.jpeg', 'https://i.imgur.com/6HWXBEX.jpeg'],
    overlay: 'from-[rgba(141,82,55,0.24)] via-[rgba(76,37,19,0.22)] to-[rgba(38,20,8,0.58)]',
    badge: 'Κυριακάτικη παρέα',
  },
}

const reelItems = [
  {
    id: 'reel-1',
    video: '/videoa1.mp4',
    poster: 'https://i.imgur.com/fIkuPSP.jpeg',
    description: 'Δημήτρης Βλάχος και Πέτρος Τριανταφύλλου με Καζαντζίδη μέχρι να σβήσει ο ήλιος…',
  },
  {
    id: 'reel-3',
    video: '/videoa3.mp4',
    poster: 'https://i.imgur.com/HqOIXtF.jpeg',
    description: 'Οι νύχτες αποκτούν ρυθμό στο «Μεταξύ Μας»!',
  },
  {
    id: 'reel-2',
    video: '/videoa2.mp4',
    poster: 'https://i.imgur.com/MLoOgGH.jpeg',
    description: 'Στο «Μεταξύ Μας» η διασκέδαση… γίνεται εμπειρία!',
  },
]

const DAY_TO_BYDAY = {
  'Παρασκευή': 'FR',
  'Σάββατο': 'SA',
  'Κυριακή': 'SU',
  'Τετάρτη': 'WE',
}

const DAY_JS_INDEX = {
  'Κυριακή': 0,
  'Δευτέρα': 1,
  'Τρίτη': 2,
  'Τετάρτη': 3,
  'Πέμπτη': 4,
  'Παρασκευή': 5,
  'Σάββατο': 6,
}

function getNextOccurrence(dayName, timeStr) {
  const target = DAY_JS_INDEX[dayName]
  const [hours, minutes] = timeStr.split(':').map(Number)
  const now = new Date()
  const todayIndex = now.getDay()
  let daysUntil = (target - todayIndex + 7) % 7
  if (daysUntil === 0) daysUntil = 7
  const next = new Date(now)
  next.setDate(now.getDate() + daysUntil)
  next.setHours(hours, minutes, 0, 0)
  return next
}

function toICSDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function buildCalendarDetails(event) {
  return [
    `Ζωντανή μουσική στο Μεταξύ Μας κάθε ${event.day}.`,
    `Έναρξη: ${event.time}`,
    `Μουσικό πρόγραμμα: ${event.genre}`,
    `Κράτηση: ${business.website}/reservations`,
  ].join('\n\n')
}

function makeGoogleCalendarUrl(event) {
  const start = getNextOccurrence(event.day, event.time)
  const end = new Date(start.getTime() + 2.5 * 60 * 60 * 1000)
  const byDay = DAY_TO_BYDAY[event.day]
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} — Μεταξύ Μας`,
    dates: `${toICSDate(start)}/${toICSDate(end)}`,
    details: buildCalendarDetails(event),
    location: `${business.address.street}, ${business.address.area}`,
    recur: `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

function downloadICS(event) {
  const start = getNextOccurrence(event.day, event.time)
  const end = new Date(start.getTime() + 2.5 * 60 * 60 * 1000)
  const byDay = DAY_TO_BYDAY[event.day]
  const uid = `${event.id}-metaxumas@metaxumas.gr`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Μεταξύ Μας//GR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`,
    `SUMMARY:${event.title} — Μεταξύ Μας`,
    `DESCRIPTION:${buildCalendarDetails(event).replace(/\n/g, '\\n')}`,
    `LOCATION:${business.address.street}\\, ${business.address.area}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.id}-metaxumas.ics`
  a.click()
  URL.revokeObjectURL(url)
}

function AddToCalendarButton({ event }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  return (
    <div ref={ref} className="relative" onClick={e => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 rounded-full border border-[rgba(127,91,48,0.18)] bg-[rgba(255,249,240,0.80)] px-3 py-1.5 text-xs font-medium text-[rgba(47,29,15,0.68)] transition-colors hover:border-gold-500/40 hover:text-gold-700"
        aria-label="Προσθήκη στο ημερολόγιο"
      >
        <CalendarPlus size={13} />
        Ημερολόγιο
        <ChevronDown size={11} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-52 overflow-hidden rounded-xl border border-[rgba(127,91,48,0.14)] bg-[rgba(255,249,240,0.98)] shadow-[0_8px_24px_rgba(98,61,27,0.12)] backdrop-blur-sm z-10">
          <a
            href={makeGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-sm text-[rgba(47,29,15,0.76)] transition-colors hover:bg-[rgba(212,148,26,0.06)] hover:text-gold-700"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Google Calendar
          </a>
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[rgba(47,29,15,0.76)] transition-colors hover:bg-[rgba(212,148,26,0.06)] hover:text-gold-700 border-t border-[rgba(127,91,48,0.08)]"
            onClick={() => { downloadICS(event); setOpen(false) }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 19h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Apple / iCal (.ics)
          </button>
        </div>
      )}
    </div>
  )
}

function ExpectCard({ item }) {
  return (
    <div className="border-t border-[rgba(127,91,48,0.12)] pt-5 text-center sm:text-left">
      <div className="mb-3 flex items-center justify-center gap-3 sm:justify-start">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(212,148,26,0.10)] text-gold-700">
          <item.Icon size={18} />
        </span>
        <h3 className="heading-card text-[rgba(31,18,9,0.9)]">{item.title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">{item.desc}</p>
    </div>
  )
}

function MusicModal({ event, visual, onClose }) {
  const images = visual?.modalImages?.length ? visual.modalImages : [visual?.image].filter(Boolean)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [controlsVisible, setControlsVisible] = useState(true)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      if (images.length < 2) return
      if (e.key === 'ArrowLeft') setActiveImageIndex(index => (index - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setActiveImageIndex(index => (index + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [images.length, onClose])

  useEffect(() => {
    setActiveImageIndex(0)
    setControlsVisible(true)
  }, [event?.id])

  if (!event) return null

  const activeImage = images[activeImageIndex]
  const canNavigate = images.length > 1
  const showPrevious = () => setActiveImageIndex(index => (index - 1 + images.length) % images.length)
  const showNext = () => setActiveImageIndex(index => (index + 1) % images.length)
  const toggleControls = () => setControlsVisible(visible => !visible)

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 sm:px-6" role="dialog" aria-modal="true" aria-label={event.title}>
      <button
        type="button"
        aria-label="Κλείσιμο"
        className="absolute inset-0 bg-[rgba(38,20,8,0.34)] backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.22)] shadow-[0_32px_120px_rgba(49,24,10,0.28)]">
        <div className="relative flex min-h-[22rem] items-center justify-center bg-[rgba(20,10,4,0.72)] sm:min-h-[30rem]">
          <img
            src={activeImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-3xl opacity-55"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,238,0.08),rgba(20,10,4,0.56))]" />
          <button
            type="button"
            onClick={toggleControls}
            className="relative z-10 flex w-full items-center justify-center bg-transparent"
            aria-label={controlsVisible ? 'Απόκρυψη χειριστηρίων' : 'Εμφάνιση χειριστηρίων'}
          >
            <img
              src={activeImage}
              alt={`${event.title} ${activeImageIndex + 1}`}
              className="max-h-[80vh] w-full object-contain"
            />
          </button>
          {canNavigate ? (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className={cn(
                  'absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[rgba(255,248,238,0.14)] text-white shadow-[0_8px_20px_rgba(20,10,4,0.26)] backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(255,248,238,0.24)] sm:left-4 sm:h-12 sm:w-12',
                  controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
                aria-label="Προηγούμενη φωτογραφία"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={showNext}
                className={cn(
                  'absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[rgba(255,248,238,0.14)] text-white shadow-[0_8px_20px_rgba(20,10,4,0.26)] backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(255,248,238,0.24)] sm:right-4 sm:h-12 sm:w-12',
                  controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
                aria-label="Επόμενη φωτογραφία"
              >
                <ChevronRight size={20} />
              </button>
              <div
                className={cn(
                  'absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-[rgba(20,10,4,0.34)] px-3 py-2 backdrop-blur-sm transition-all duration-200',
                  controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
              >
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={cn(
                      'h-2.5 w-2.5 rounded-full transition-all',
                      index === activeImageIndex ? 'bg-white scale-110' : 'bg-white/45 hover:bg-white/75'
                    )}
                    aria-label={`Φωτογραφία ${index + 1}`}
                    aria-pressed={index === activeImageIndex}
                  />
                ))}
              </div>
            </>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[rgba(255,248,238,0.14)] text-white shadow-[0_8px_20px_rgba(20,10,4,0.26)] backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(255,248,238,0.24)]',
              controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            aria-label="Κλείσιμο"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function RecurringCard({ event, onOpen }) {
  const visual = recurringVisuals[event.id] || recurringVisuals.r1

  return (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,249,240,0.62)] text-left shadow-[0_18px_50px_rgba(98,61,27,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_66px_rgba(98,61,27,0.10)]">
      <button
        type="button"
        onClick={() => onOpen(event)}
        className="w-full text-left"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={visual.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
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
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-5 flex-1 text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">{event.description}</p>

        <div className="space-y-2 text-xs text-[rgba(47,29,15,0.46)] mb-5">
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

        <div className="mt-auto flex justify-center">
          <AddToCalendarButton event={event} />
        </div>
      </div>
    </div>
  )
}

function ReelCard({ item }) {
  const videoRef = useRef(null)
  const feedbackTimeoutRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
    }
  }, [])

  const togglePlayback = async () => {
    if (!videoRef.current) return
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)

    if (videoRef.current.paused) {
      setFeedback(null)
      try {
        await videoRef.current.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
      setFeedback('pause')
      feedbackTimeoutRef.current = setTimeout(() => setFeedback(null), 650)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(127,91,48,0.12)]">
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          preload="metadata"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="aspect-[9/16] w-full object-cover"
        />
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Παύση βίντεο' : 'Αναπαραγωγή βίντεο'}
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-colors duration-300',
            isPlaying
              ? 'bg-transparent hover:bg-[linear-gradient(180deg,rgba(28,15,7,0.04),rgba(28,15,7,0.12))]'
              : 'bg-[linear-gradient(180deg,rgba(28,15,7,0.04),rgba(28,15,7,0.14))] hover:bg-[linear-gradient(180deg,rgba(28,15,7,0.08),rgba(28,15,7,0.18))]'
          )}
        >
          {!isPlaying || feedback === 'pause' ? (
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-[rgba(255,248,238,0.14)] text-white shadow-[0_12px_32px_rgba(20,10,4,0.26)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              {feedback === 'pause' ? <Pause size={24} /> : <PlayCircle size={28} />}
            </span>
          ) : null}
        </button>
      </div>
      <p className="mt-4 text-center text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">{item.description}</p>
    </div>
  )
}

export default function LiveMusic() {
  const [activeEvent, setActiveEvent] = useState(null)
  const activeVisual = activeEvent ? (recurringVisuals[activeEvent.id] || recurringVisuals.r1) : null

  return (
    <>
    <PageTransition>
      <Helmet>
        <title>Ζωντανή Μουσική | Μεταξύ Μας</title>
        <meta
          name="description"
          content="Ζωντανή μουσική κάθε εβδομάδα στο Μεταξύ Μας, με ελληνικό πρόγραμμα, acoustic βραδιές και ειδικές μουσικές εκδηλώσεις."
        />
      </Helmet>

      <PageHero
        minimal
        className="pb-2 sm:pb-3"
        label="Τι να περιμένεις!"
        title="Live βραδιές με ξεχωριστούς καλλιτέχνες."
      />

      <section className="section-padding pt-4 sm:pt-6">
        <div className="container-wide">
          <StaggerReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { Icon: Guitar, title: 'Παλαιά Λαϊκά', desc: 'Αγαπημένα τραγούδια live, σε βραδιές που μένουν παρεΐστικες και ζεστές.' },
              { Icon: Mic2, title: 'Ρεμπέτικα', desc: 'Αυθεντικός ήχος, πιο άμεσος χαρακτήρας και μουσική που ταιριάζει με το τραπέζι.' },
              { Icon: Radio, title: 'Ακουστικά Προγράμματα', desc: 'Πιο ήπιες στιγμές με καθαρό ήχο, κρασί και κουβέντα χωρίς υπερβολή.' },
              { Icon: Star, title: 'Έντεχνα', desc: 'Μουσικές βραδιές με έντεχνα τραγούδια και ιδιαίτερο χαρακτήρα.' },
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
          <SectionReveal className="mx-auto mb-8 max-w-[46rem] text-center">
            <p className="label-upper mb-3">ΜΕΡΙΚΑ ΑΠΟ ΤΑ LIVES ΜΑΣ!</p>
            <h2 className="heading-section mx-auto max-w-[42rem] text-[rgba(31,18,9,0.92)]">Δες τις μουσικές ανακοινώσεις μας.</h2>
          </SectionReveal>

          <div className="mx-auto mb-10 max-w-[46rem]">
            <div className="flex items-start gap-3 rounded-2xl border border-[rgba(212,148,26,0.22)] bg-[rgba(212,148,26,0.07)] px-5 py-4 text-sm text-[rgba(47,29,15,0.70)]">
              <CalendarPlus size={16} className="mt-0.5 shrink-0 text-gold-500" />
              <p className="leading-relaxed">
                Πάτα <strong className="text-[rgba(31,18,9,0.82)]">Ημερολόγιο</strong> σε κάθε βραδιά για να τη προσθέσεις στο{' '}
                <strong className="text-[rgba(31,18,9,0.82)]">Google Calendar</strong> ή στο{' '}
                <strong className="text-[rgba(31,18,9,0.82)]">Apple Calendar</strong>!
              </p>
            </div>
          </div>

          <StaggerReveal className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recurringEvents.filter(event => event.day !== 'Τετάρτη').map(event => (
              <StaggerItem key={event.id} className="h-full">
                <RecurringCard event={event} onOpen={setActiveEvent} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section-padding pt-0 pb-10">
        <div className="container-wide">
          <SectionReveal className="mx-auto mb-12 max-w-[46rem] text-center">
            <p className="label-upper mb-3">Instagram Reels!</p>
            <h2 className="heading-section mx-auto max-w-[42rem] text-[rgba(31,18,9,0.92)]">Στιγμιότυπα από τις live βραδιές.</h2>
          </SectionReveal>

          <StaggerReveal className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {reelItems.map(item => (
              <StaggerItem key={item.id}>
                <ReelCard item={item} />
              </StaggerItem>
            ))}
          </StaggerReveal>

          <SectionReveal className="mt-10 flex justify-center">
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2 text-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              Δες περισσότερα στο Instagram
            </a>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>

    {activeEvent ? <MusicModal event={activeEvent} visual={activeVisual} onClose={() => setActiveEvent(null)} /> : null}
    </>
  )
}
