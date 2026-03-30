import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, AlertCircle, Phone, Clock, Users, MessageSquare, AlertTriangle } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { business } from '../data/business'

const FORMSPREE_URL = `https://formspree.io/f/${business.formspreeId}`
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const DAY_NAMES = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']

function to24HourTime(value) {
  if (!value) return null

  const normalized = value
    .replace(/\s+/g, ' ')
    .replace('π.μ.', 'AM')
    .replace('μ.μ.', 'PM')
    .trim()

  const match = normalized.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i)
  if (!match) return null

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const meridiem = match[3].toUpperCase()

  if (meridiem === 'AM') {
    if (hours === 12) hours = 0
  } else if (hours !== 12) {
    hours += 12
  }

  return hours * 60 + minutes
}

function getSlotsForDate(dateValue) {
  if (!dateValue) return null

  const date = new Date(`${dateValue}T12:00:00`)
  if (Number.isNaN(date.getTime())) return null

  const dayName = DAY_NAMES[date.getDay()]
  return business.hours.find(row => row.days === dayName) || null
}

function isTimeWithinShopHours(timeValue, hoursRow) {
  if (!timeValue || !hoursRow || hoursRow.closed || !hoursRow.slots?.length) return false

  const [hours, minutes] = timeValue.split(':').map(Number)
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return false

  const selectedMinutes = hours * 60 + minutes

  return hoursRow.slots.some(slot => {
    const [startLabel, endLabel] = slot.split('–')
    const start = to24HourTime(startLabel)
    const end = to24HourTime(endLabel)

    if (start == null || end == null) return false
    if (end >= start) return selectedMinutes >= start && selectedMinutes <= end
    return selectedMinutes >= start || selectedMinutes <= end
  })
}

function formatHoursLine(hoursRow) {
  if (!hoursRow) return ''
  if (hoursRow.closed) return 'Κλειστά'
  return hoursRow.slots.join(' | ')
}

function RecaptchaBox({ onVerify, resetSignal }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      setError('Δεν έχει οριστεί το Google reCAPTCHA site key.')
      return undefined
    }

    if (window.grecaptcha?.render) {
      setLoaded(true)
      return undefined
    }

    let script = document.getElementById('google-recaptcha-script')
    const handleLoad = event => {
      event?.currentTarget?.setAttribute('data-loaded', 'true')
      setLoaded(true)
      setError('')
    }
    const handleError = () => {
      setError('Δεν ήταν δυνατή η φόρτωση του Google reCAPTCHA. Κάντε ανανέωση ή ελέγξτε ad blocker / σύνδεση.')
    }

    if (!script) {
      script = document.createElement('script')
      script.id = 'google-recaptcha-script'
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.addEventListener('load', handleLoad)
      script.addEventListener('error', handleError)
      document.body.appendChild(script)
    } else {
      if (script.getAttribute('data-loaded') === 'true') {
        setLoaded(true)
      } else {
        script.addEventListener('load', handleLoad)
      }
      script.addEventListener('error', handleError)
    }

    return () => {
      script?.removeEventListener('load', handleLoad)
      script?.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    if (!loaded || !containerRef.current || widgetIdRef.current !== null || !window.grecaptcha?.render) return

    const renderWidget = () => {
      try {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: token => {
            setError('')
            onVerify(token)
          },
          'expired-callback': () => onVerify(''),
          'error-callback': () => {
            setError('Παρουσιάστηκε πρόβλημα με το reCAPTCHA. Δοκιμάστε ξανά.')
            onVerify('')
          },
        })
      } catch {
        setError('Το Google reCAPTCHA δεν μπόρεσε να εμφανιστεί. Κάντε ανανέωση της σελίδας και δοκιμάστε ξανά.')
      }
    }

    if (window.grecaptcha.ready) {
      window.grecaptcha.ready(renderWidget)
    } else {
      renderWidget()
    }
  }, [loaded, onVerify])

  useEffect(() => {
    if (!resetSignal || widgetIdRef.current === null || !window.grecaptcha?.reset) return
    window.grecaptcha.reset(widgetIdRef.current)
    onVerify('')
  }, [resetSignal, onVerify])

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center">
        <div ref={containerRef} className="min-h-[78px] w-[304px] max-w-full" />
      </div>
      {!loaded && !error ? <p className="mt-2 text-center text-xs text-[rgba(47,29,15,0.46)]">Φόρτωση checkbox ασφαλείας...</p> : null}
      {error ? <p className="mt-2 text-center text-xs text-wine-400">{error}</p> : null}
    </div>
  )
}

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="px-8 py-16 text-center"
    >
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-olive-600/30 bg-olive-800/30">
        <CheckCircle size={28} className="text-olive-400" />
      </div>
      <h3 className="mb-3 font-serif text-2xl font-semibold text-[rgba(31,18,9,0.9)]">
        Η κράτησή σας ελήφθη!
      </h3>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-[rgba(47,29,15,0.6)]">
        Σας ευχαριστούμε. Θα επικοινωνήσουμε μαζί σας σύντομα για επιβεβαίωση.
        Αν δεν λάβετε απάντηση εντός 24 ωρών, παρακαλούμε επικοινωνήστε μαζί μας τηλεφωνικά.
      </p>
      <a href={`tel:${business.phone}`} className="btn-outline mt-6 inline-flex">
        <Phone size={15} />
        {business.phoneDisplay}
      </a>
    </motion.div>
  )
}

function ErrorMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-xl border border-[rgba(122,30,46,0.18)] bg-[rgba(122,30,46,0.10)] p-4 text-sm text-wine-700"
    >
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <p>{message || 'Παρουσιάστηκε σφάλμα. Παρακαλούμε προσπαθήστε ξανά ή επικοινωνήστε τηλεφωνικά.'}</p>
    </motion.div>
  )
}

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [captchaError, setCaptchaError] = useState(null)
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaResetCounter, setCaptchaResetCounter] = useState(0)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const selectedDate = watch('date')
  const selectedDayHours = getSlotsForDate(selectedDate)

  const onSubmit = async data => {
    if (data._honeypot) return
    if (!captchaToken) {
      setCaptchaError('Ολοκληρώστε πρώτα το Google reCAPTCHA.')
      return
    }

    setLoading(true)
    setServerError(null)
    setCaptchaError(null)

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: data.date,
          time: data.time,
          guests: data.guests,
          comments: data.comments,
          recaptchaToken: captchaToken,
          _subject: `Νέα Κράτηση - ${data.name} (${data.date} ${data.time})`,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setCaptchaToken('')
        setCaptchaResetCounter(current => current + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const json = await res.json()
        setServerError(json?.errors?.[0]?.message || null)
      }
    } catch {
      setServerError('Δεν ήταν δυνατή η αποστολή. Ελέγξτε τη σύνδεσή σας και δοκιμάστε ξανά.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Κράτηση Τραπεζιού | Μεταξύ Μας</title>
        <meta
          name="description"
          content="Κλείστε τραπέζι στο Μεταξύ Μας για καφέ, μεζέδες ή βραδιές ζωντανής μουσικής. Online αίτημα κράτησης γρήγορα και εύκολα."
        />
      </Helmet>

      <PageHero
        minimal
        label="Κρατήσεις!"
        title="Κλείσε το τραπέζι σου."
        subtitle="Εξασφαλίστε τη θέση σας, ειδικά για βραδιές ζωντανής μουσικής."
      />

      <section className="section-padding pt-4 pb-10 sm:pt-6">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] xl:gap-16">
            <div>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessMessage key="success" />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-6 text-center sm:text-left"
                  >
                    <div className="hidden" aria-hidden="true">
                      <input type="text" tabIndex={-1} autoComplete="off" {...register('_honeypot')} />
                    </div>

                    {serverError && <ErrorMessage message={serverError} />}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="text-center sm:text-left">
                        <label htmlFor="name" className="form-label">
                          Ονοματεπώνυμο <span className="text-wine-400">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          className={`form-field text-center sm:text-left ${errors.name ? 'border-wine-600/60' : ''}`}
                          {...register('name', { required: 'Το όνομα είναι υποχρεωτικό' })}
                        />
                        {errors.name && <p className="mt-1 text-xs text-wine-400">{errors.name.message}</p>}
                      </div>

                      <div className="text-center sm:text-left">
                        <label htmlFor="phone" className="form-label">
                          Τηλέφωνο <span className="text-wine-400">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          className={`form-field text-center sm:text-left ${errors.phone ? 'border-wine-600/60' : ''}`}
                          {...register('phone', {
                            required: 'Το τηλέφωνο είναι υποχρεωτικό',
                            pattern: {
                              value: /^[0-9\s\+\-]{8,15}$/,
                              message: 'Εισάγετε έγκυρο αριθμό',
                            },
                          })}
                        />
                        {errors.phone && <p className="mt-1 text-xs text-wine-400">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-wine-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className={`form-field text-center sm:text-left ${errors.email ? 'border-wine-600/60' : ''}`}
                        {...register('email', {
                          required: 'Το email είναι υποχρεωτικό',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Εισάγετε έγκυρη διεύθυνση email',
                          },
                        })}
                      />
                      {errors.email && <p className="mt-1 text-xs text-wine-400">{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="text-center sm:text-left">
                        <label htmlFor="date" className="form-label">
                          Ημερομηνία <span className="text-wine-400">*</span>
                        </label>
                        <input
                          id="date"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className={`form-field text-center sm:text-left ${errors.date ? 'border-wine-600/60' : ''}`}
                          {...register('date', { required: 'Επιλέξτε ημερομηνία' })}
                        />
                        {errors.date && <p className="mt-1 text-xs text-wine-400">{errors.date.message}</p>}
                      </div>

                      <div className="text-center sm:text-left">
                        <label htmlFor="time" className="form-label">
                          Ώρα <span className="text-wine-400">*</span>
                        </label>
                        <input
                          id="time"
                          type="time"
                          step="60"
                          className={`form-field text-center sm:text-left ${errors.time ? 'border-wine-600/60' : ''}`}
                          {...register('time', {
                            required: 'Επιλέξτε ώρα',
                            validate: value => {
                              if (!selectedDate) return 'Επιλέξτε πρώτα ημερομηνία'
                              if (!selectedDayHours) return 'Δεν βρέθηκε ωράριο για την επιλεγμένη ημέρα'
                              if (selectedDayHours.closed) return 'Το κατάστημα είναι κλειστό την επιλεγμένη ημέρα'
                              return isTimeWithinShopHours(value, selectedDayHours)
                                ? true
                                : `Η ώρα πρέπει να είναι μέσα στο ωράριο: ${formatHoursLine(selectedDayHours)}`
                            },
                          })}
                        />
                        {selectedDate && selectedDayHours ? (
                          <p className="mt-1 text-xs text-[rgba(47,29,15,0.46)]">
                            {selectedDayHours.days}: {formatHoursLine(selectedDayHours)}
                          </p>
                        ) : null}
                        {errors.time && <p className="mt-1 text-xs text-wine-400">{errors.time.message}</p>}
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <label htmlFor="guests" className="form-label">
                        Αριθμός Ατόμων <span className="text-wine-400">*</span>
                      </label>
                      <input
                        id="guests"
                        type="number"
                        min="1"
                        step="1"
                        inputMode="numeric"
                        className={`form-field text-center sm:text-left ${errors.guests ? 'border-wine-600/60' : ''}`}
                        {...register('guests', {
                          required: 'Συμπληρώστε αριθμό ατόμων',
                          min: { value: 1, message: 'Ο αριθμός ατόμων πρέπει να είναι τουλάχιστον 1' },
                        })}
                      />
                      {errors.guests && <p className="mt-1 text-xs text-wine-400">{errors.guests.message}</p>}
                    </div>

                    <div className="text-center sm:text-left">
                      <label htmlFor="comments" className="form-label">Σχόλια!</label>
                      <textarea
                        id="comments"
                        rows={4}
                        placeholder="Οτιδήποτε θέλετε να γνωρίζουμε για την κράτησή σας..."
                        className="form-field resize-none text-center sm:text-left"
                        {...register('comments')}
                      />
                    </div>

                    <div className="border-t border-[rgba(127,91,48,0.12)] pt-4 text-center text-xs leading-relaxed text-[rgba(47,29,15,0.44)] sm:text-left">
                      <p className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
                        <AlertTriangle size={13} className="mt-0.5 shrink-0 text-gold-400/60" />
                        <span>
                          <strong className="text-[rgba(31,18,9,0.72)]">Σημαντικό:</strong> Η online κράτηση αποτελεί αίτημα.
                          Η επιβεβαίωση θα σας σταλεί μέσω email ή τηλεφώνου εντός 24 ωρών. Για επείγουσες
                          κρατήσεις ή για αύριο, παρακαλούμε επικοινωνήστε τηλεφωνικά. Οι κρατήσεις για βραδιές
                          ζωντανής μουσικής εξαρτώνται από διαθεσιμότητα.
                        </span>
                      </p>
                    </div>

                    <RecaptchaBox
                      onVerify={token => {
                        setCaptchaToken(token)
                        setCaptchaError(null)
                      }}
                      resetSignal={captchaResetCounter}
                    />
                    {captchaError ? <p className="-mt-3 text-center text-xs text-wine-400 sm:text-left">{captchaError}</p> : null}

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-4 text-base disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Αποστολή...
                        </>
                      ) : (
                        'Υποβολή'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div>
              <SectionReveal className="space-y-6 text-center lg:sticky lg:top-28 lg:text-left">
                <div className="border-t border-[rgba(127,91,48,0.12)] pt-6">
                  <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                    <Clock size={16} className="text-gold-400" />
                    <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)]">Ωράριο Λειτουργίας</h3>
                  </div>

                  <p className="text-sm leading-relaxed text-[rgba(47,29,15,0.68)] lg:hidden">
                    {business.hoursLocationSummary}
                  </p>

                  <div className="hidden space-y-3 lg:block">
                    {business.hours.map((row, i) => (
                      <div key={i} className="border-b border-[rgba(127,91,48,0.10)] pb-3 last:border-0 last:pb-0">
                        <p className="mb-1 text-xs text-[rgba(47,29,15,0.42)]">{row.days}</p>
                        {row.closed ? (
                          <p className="text-sm font-medium text-[rgba(122,30,46,0.78)]">Κλειστά</p>
                        ) : (
                          <p className="text-sm text-[rgba(47,29,15,0.68)]">{row.slots.join(' | ')}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden border-t border-[rgba(127,91,48,0.12)] pt-6 lg:block">
                  <div className="mb-3 flex items-center gap-3">
                    <Phone size={16} className="text-gold-400" />
                    <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)]">Τηλεφωνική Κράτηση</h3>
                  </div>
                  <p className="mb-3 text-xs text-[rgba(47,29,15,0.56)]">Για άμεση εξυπηρέτηση ή επείγουσες κρατήσεις:</p>
                  <a href={`tel:${business.phone}`} className="btn-primary w-full justify-center py-3 text-sm">
                    <Phone size={14} />
                    {business.phoneDisplay}
                  </a>
                </div>

                <div className="hidden border-t border-[rgba(127,91,48,0.12)] pt-6 lg:block">
                  <div className="mb-3 flex items-center gap-3">
                    <Users size={16} className="text-gold-400" />
                    <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)]">Ειδικές Κρατήσεις</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-[rgba(47,29,15,0.56)]">
                    Για ιδιωτικές εκδηλώσεις, party, μνημόσυνα κλπ. επικοινωνήστε μαζί μας τηλεφωνικά.
                  </p>
                </div>

                <div className="hidden border-t border-[rgba(127,91,48,0.12)] pt-6 lg:block">
                  <div className="mb-3 flex items-center gap-3">
                    <MessageSquare size={16} className="text-gold-400" />
                    <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)]">Σημείωση</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-[rgba(47,29,15,0.56)]">
                    Λόγω υψηλής ζήτησης, ιδίως για βραδιές ζωντανής μουσικής, συνιστούμε κράτηση 2-3 ημέρες νωρίτερα.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
