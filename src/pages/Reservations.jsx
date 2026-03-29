import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, AlertCircle, Phone, Clock, Users, MessageSquare, Sun, Moon, Music, AlertTriangle } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import SectionReveal from '../components/ui/SectionReveal'
import PageTransition from '../components/ui/PageTransition'
import { business } from '../data/business'

const FORMSPREE_URL = `https://formspree.io/f/${business.formspreeId}`

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-8"
    >
      <div className="w-16 h-16 rounded-full bg-olive-800/30 border border-olive-600/30 flex items-center justify-center mx-auto mb-5">
        <CheckCircle size={28} className="text-olive-400" />
      </div>
      <h3 className="font-serif text-2xl font-semibold text-[rgba(31,18,9,0.9)] mb-3">
        Η κράτησή σας ελήφθη!
      </h3>
      <p className="text-sm text-[rgba(47,29,15,0.6)] max-w-md mx-auto leading-relaxed">
        Σας ευχαριστούμε. Θα επικοινωνήσουμε μαζί σας σύντομα για επιβεβαίωση.
        Αν δεν λάβετε απάντηση εντός 24 ωρών, παρακαλούμε επικοινωνήστε τηλεφωνικά.
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
      className="flex items-start gap-3 p-4 rounded-xl bg-[rgba(122,30,46,0.10)] border border-[rgba(122,30,46,0.18)] text-sm text-wine-700"
    >
      <AlertCircle size={16} className="shrink-0 mt-0.5" />
      <p>{message || 'Παρουσιάστηκε σφάλμα. Παρακαλούμε προσπαθήστε ξανά ή επικοινωνήστε τηλεφωνικά.'}</p>
    </motion.div>
  )
}

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async (data) => {
    // Honeypot check
    if (data._honeypot) return

    setLoading(true)
    setServerError(null)

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:         data.name,
          phone:        data.phone,
          email:        data.email,
          date:         data.date,
          time:         data.time,
          guests:       data.guests,
          seating:      data.seating,
          occasion:     data.occasion,
          notes:        data.notes,
          _subject:     `Νέα Κράτηση — ${data.name} (${data.date} ${data.time})`,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const json = await res.json()
        setServerError(json?.errors?.[0]?.message || null)
      }
    } catch {
      setServerError('Δεν ήταν δυνατή η αποστολή. Ελέγξτε τη σύνδεσή σας.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Κράτηση Τραπεζιού | Μεταξύ Μας</title>
        <meta name="description" content="Κλείστε τραπέζι στο Μεταξύ Μας — για πρωινό, βραδινό ή ζωντανή μουσική βραδιά. Online κράτηση γρήγορα και εύκολα." />
      </Helmet>

      <PageHero
        label="Κρατήσεις"
        title="Κλείστε το τραπέζι σας"
        subtitle="Εξασφαλίστε τη θέση σας — ειδικά για βραδιές ζωντανής μουσικής."
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 xl:gap-16">

            {/* Form */}
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
                    className="space-y-6"
                  >
                    {/* Honeypot — hidden from real users */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register('_honeypot')}
                      />
                    </div>

                    {serverError && <ErrorMessage message={serverError} />}

                    {/* Row 1: Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="form-label">
                          Ονοματεπώνυμο <span className="text-wine-400">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Γιώργης Παπαδόπουλος"
                          className={`form-field ${errors.name ? 'border-wine-600/60' : ''}`}
                          {...register('name', { required: 'Το όνομα είναι υποχρεωτικό' })}
                        />
                        {errors.name && (
                          <p className="text-xs text-wine-400 mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="form-label">
                          Τηλέφωνο <span className="text-wine-400">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="69X XXX XXXX"
                          className={`form-field ${errors.phone ? 'border-wine-600/60' : ''}`}
                          {...register('phone', {
                            required: 'Το τηλέφωνο είναι υποχρεωτικό',
                            pattern: {
                              value: /^[0-9\s\+\-]{8,15}$/,
                              message: 'Εισάγετε έγκυρο αριθμό',
                            },
                          })}
                        />
                        {errors.phone && (
                          <p className="text-xs text-wine-400 mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-wine-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={`form-field ${errors.email ? 'border-wine-600/60' : ''}`}
                        {...register('email', {
                          required: 'Το email είναι υποχρεωτικό',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Εισάγετε έγκυρη διεύθυνση email',
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-xs text-wine-400 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Row 2: Date + Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="date" className="form-label">
                          Ημερομηνία <span className="text-wine-400">*</span>
                        </label>
                        <input
                          id="date"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className={`form-field ${errors.date ? 'border-wine-600/60' : ''}`}
                          {...register('date', { required: 'Επιλέξτε ημερομηνία' })}
                        />
                        {errors.date && (
                          <p className="text-xs text-wine-400 mt-1">{errors.date.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="time" className="form-label">
                          Ώρα <span className="text-wine-400">*</span>
                        </label>
                        <select
                          id="time"
                          className={`form-field ${errors.time ? 'border-wine-600/60' : ''}`}
                          {...register('time', { required: 'Επιλέξτε ώρα' })}
                        >
                          <option value="">Επιλέξτε ώρα</option>
                          <optgroup label="Πρωί / Brunch">
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                          </optgroup>
                          <optgroup label="Βράδυ">
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                          </optgroup>
                        </select>
                        {errors.time && (
                          <p className="text-xs text-wine-400 mt-1">{errors.time.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Guests + Seating */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="guests" className="form-label">
                          Αριθμός Ατόμων <span className="text-wine-400">*</span>
                        </label>
                        <select
                          id="guests"
                          className={`form-field ${errors.guests ? 'border-wine-600/60' : ''}`}
                          {...register('guests', { required: 'Επιλέξτε αριθμό ατόμων' })}
                        >
                          <option value="">Επιλέξτε</option>
                          {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'άτομο' : 'άτομα'}</option>
                          ))}
                          <option value="11+">11+ άτομα</option>
                        </select>
                        {errors.guests && (
                          <p className="text-xs text-wine-400 mt-1">{errors.guests.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="seating" className="form-label">Θέση Καθίσματος</label>
                        <select id="seating" className="form-field" {...register('seating')}>
                          <option value="">Χωρίς προτίμηση</option>
                          <option value="indoor">Εσωτερικός χώρος</option>
                          <option value="outdoor">Εξωτερικός χώρος</option>
                          <option value="bar">Κοντά στη μπάρα</option>
                          <option value="music">Κοντά στη σκηνή (για ζωντανή μουσική)</option>
                        </select>
                      </div>
                    </div>

                    {/* Occasion */}
                    <div>
                      <label htmlFor="occasion" className="form-label">Αφορμή (προαιρετικά)</label>
                      <select id="occasion" className="form-field" {...register('occasion')}>
                        <option value="">Απλή επίσκεψη</option>
                        <option value="birthday">Γενέθλια</option>
                        <option value="anniversary">Επέτειος</option>
                        <option value="business">Επαγγελματικό δείπνο</option>
                        <option value="music">Βραδιά ζωντανής μουσικής</option>
                        <option value="gathering">Παρέα / Εορτασμός</option>
                        <option value="other">Άλλο</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div>
                      <label htmlFor="notes" className="form-label">Σημειώσεις / Ειδικά αιτήματα</label>
                      <textarea
                        id="notes"
                        rows={4}
                        placeholder="Αλλεργίες, ειδικές απαιτήσεις, μήνυμα για γενέθλια..."
                        className="form-field resize-none"
                        {...register('notes')}
                      />
                    </div>

                    {/* Disclaimer */}
                    <div className="p-4 rounded-xl bg-[rgba(255,251,246,0.72)] border border-[rgba(127,91,48,0.12)] text-xs text-[rgba(47,29,15,0.44)] leading-relaxed">
                      <p className="flex items-start gap-2">
                        <AlertTriangle size={13} className="text-gold-400/60 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[rgba(31,18,9,0.72)]">Σημαντικό:</strong> Η online κράτηση αποτελεί
                          αίτημα. Η επιβεβαίωση θα σας αποσταλεί μέσω email ή τηλεφώνου εντός 24 ωρών.
                          Για επείγουσες κρατήσεις ή για αύριο, παρακαλούμε επικοινωνήστε τηλεφωνικά.
                          Κρατήσεις για βραδιές ζωντανής μουσικής εξαρτώνται από διαθεσιμότητα.
                        </span>
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Αποστολή...
                        </>
                      ) : (
                        'Αποστολή Αιτήματος Κράτησης'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar info */}
            <div>
              <SectionReveal className="space-y-6 lg:sticky lg:top-28">
                {/* Phone */}
                <div className="card-base p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone size={16} className="text-gold-400" />
                    <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)]">Τηλεφωνική Κράτηση</h3>
                  </div>
                  <p className="text-xs text-[rgba(47,29,15,0.56)] mb-3">Για άμεση εξυπηρέτηση ή επείγουσες κρατήσεις:</p>
                  <a href={`tel:${business.phone}`} className="btn-primary text-sm w-full justify-center py-3">
                    <Phone size={14} />
                    {business.phoneDisplay}
                  </a>
                </div>

                {/* Hours */}
                <div className="card-base p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={16} className="text-gold-400" />
                    <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)]">Ωράριο Λειτουργίας</h3>
                  </div>
                  <div className="space-y-3">
                    {business.hours.map((row, i) => (
                      <div key={i} className="pb-3 border-b border-[rgba(127,91,48,0.10)] last:border-0 last:pb-0">
                        <p className="text-xs text-[rgba(47,29,15,0.42)] mb-1">{row.days}</p>
                        <p className="text-sm text-[rgba(47,29,15,0.68)] flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1"><Sun size={11} className="text-gold-400/70" />{row.morning}</span>
                          <span className="text-[rgba(47,29,15,0.24)]">·</span>
                          <span className="inline-flex items-center gap-1"><Moon size={11} className="text-wine-600/70" />{row.evening}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Groups */}
                <div className="card-base p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Users size={16} className="text-gold-400" />
                    <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)]">Ομαδικές Κρατήσεις</h3>
                  </div>
                  <p className="text-xs text-[rgba(47,29,15,0.56)] leading-relaxed">
                    Για πάνω από 10 άτομα ή για ιδιωτικές εκδηλώσεις,
                    επικοινωνήστε μαζί μας τηλεφωνικά.
                  </p>
                </div>

                {/* Note */}
                <div className="card-base p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare size={16} className="text-gold-400" />
                    <h3 className="text-sm font-medium text-[rgba(31,18,9,0.9)]">Σημείωση</h3>
                  </div>
                  <p className="text-xs text-[rgba(47,29,15,0.56)] leading-relaxed">
                    Λόγω υψηλής ζήτησης, ιδίως για βραδιές ζωντανής μουσικής,
                    συνιστούμε κράτηση 2–3 ημέρες νωρίτερα.
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
