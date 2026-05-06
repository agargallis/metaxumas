import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Eye, EyeOff, ImagePlus, LogIn, LogOut, Rocket, Save, Trash2, Upload } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import { useSiteSettings } from '../context/SiteSettingsContext'
import { cn, formatDate } from '../lib/utils'
import { createLivePromoCampaignId, getLivePromoState, parsePromoDate } from '../lib/livePromo'
import { hasSupabaseEnv, supabase } from '../lib/supabase'
import { uploadAdminImage } from '../lib/adminMedia'

const statusMeta = {
  active: { label: 'Ενεργό τώρα', className: 'border-gold-500/30 bg-gold-500/12 text-gold-700' },
  scheduled: { label: 'Προγραμματισμένο', className: 'border-[rgba(77,103,56,0.18)] bg-[rgba(77,103,56,0.10)] text-olive-700' },
  expired: { label: 'Έχει λήξει', className: 'border-[rgba(122,30,46,0.18)] bg-[rgba(122,30,46,0.10)] text-wine-700' },
  draft: { label: 'Ανενεργό', className: 'border-[rgba(127,91,48,0.14)] bg-[rgba(127,91,48,0.08)] text-[rgba(47,29,15,0.68)]' },
  invalid: { label: 'Λάθος ημερομηνίες', className: 'border-[rgba(122,30,46,0.18)] bg-[rgba(122,30,46,0.10)] text-wine-700' },
}

function buildFormState(settings) {
  return {
    livePromo: { ...settings.livePromo },
    reviewStats: {
      average: settings.reviewStats.average,
      total: settings.reviewStats.total,
      breakdown: { ...settings.reviewStats.breakdown },
    },
  }
}

function Field({ label, hint, children }) {
  return (
    <label className="block text-center sm:text-left">
      <span className="mb-2 block text-sm font-medium text-[rgba(31,18,9,0.86)]">{label}</span>
      {children}
      {hint ? <span className="mt-2 block text-xs text-[rgba(47,29,15,0.46)]">{hint}</span> : null}
    </label>
  )
}

function InlineMessage({ message, className = '' }) {
  if (!message) return null

  return (
    <div className={cn('rounded-2xl border border-[rgba(127,91,48,0.12)] bg-[rgba(255,249,240,0.58)] px-4 py-3 text-sm text-[rgba(47,29,15,0.66)]', className)}>
      {message}
    </div>
  )
}

function LoginCard({ email, password, error, loading, onEmailChange, onPasswordChange, onSubmit }) {
  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,249,240,0.72)] p-6 text-center shadow-[0_24px_70px_rgba(86,52,18,0.08)] sm:p-8">
      <p className="label-upper mb-3">Σύνδεση</p>
      <h1 className="heading-card mb-3 text-[rgba(31,18,9,0.92)]">Σύνδεση διαχείρισης</h1>
      <p className="mb-6 text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">Βάλτε το email και τον κωδικό σας.</p>

      <form onSubmit={onSubmit} className="space-y-4 text-center">
        <Field label="Email">
          <input type="email" value={email} onChange={onEmailChange} className="form-field" autoComplete="email" />
        </Field>
        <Field label="Κωδικός">
          <input type="password" value={password} onChange={onPasswordChange} className="form-field" autoComplete="current-password" />
        </Field>

        {error ? (
          <div className="rounded-2xl border border-[rgba(122,30,46,0.16)] bg-[rgba(122,30,46,0.08)] px-4 py-3 text-sm text-wine-700">
            {error}
          </div>
        ) : null}

        <button type="submit" className="btn-primary w-full justify-center text-sm" disabled={loading}>
          <LogIn size={15} />
          {loading ? 'Σύνδεση...' : 'Σύνδεση'}
        </button>
      </form>
    </div>
  )
}

export default function LivePromoAdmin() {
  const { settings, updateSettings, hasSupabaseEnv: hasSharedSupabaseEnv } = useSiteSettings()
  const [form, setForm] = useState(() => buildFormState(settings))
  const [promoMessage, setPromoMessage] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const [ratingsMessage, setRatingsMessage] = useState('')
  const [authError, setAuthError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [loginLoading, setLoginLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setForm(buildFormState(settings))
  }, [settings])

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false)
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setAuthLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null)
      setAuthLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const livePromo = form.livePromo
  const reviewStats = form.reviewStats
  const meta = useMemo(() => statusMeta[getLivePromoState(livePromo)] || statusMeta.draft, [livePromo])
  const startsAt = parsePromoDate(livePromo.startsAt)
  const endsAt = parsePromoDate(livePromo.endsAt)

  function clearMessages() {
    setPromoMessage('')
    setUploadMessage('')
    setRatingsMessage('')
  }

  function setPromoField(key, value) {
    setForm(current => ({ ...current, livePromo: { ...current.livePromo, [key]: value } }))
  }

  function setReviewField(key, value) {
    setForm(current => ({ ...current, reviewStats: { ...current.reviewStats, [key]: value } }))
  }

  async function persist(nextLivePromo, nextReviewStats, successMessage, scope = 'promo') {
    setSaving(true)
    clearMessages()

    try {
      await updateSettings({
        livePromo: nextLivePromo,
        reviewStats: {
          ...nextReviewStats,
          average: Number(nextReviewStats.average),
          total: Number(nextReviewStats.total),
        },
      })

      if (scope === 'ratings') {
        setRatingsMessage(successMessage)
      } else {
        setPromoMessage(successMessage)
      }
    } catch (error) {
      const fallback = 'Δεν αποθηκεύτηκε. Δοκιμάστε ξανά.'
      if (scope === 'ratings') {
        setRatingsMessage(error?.message || fallback)
      } else {
        setPromoMessage(error?.message || fallback)
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    clearMessages()

    if (!file.type.startsWith('image/')) {
      setUploadMessage('Επιλέξτε αρχείο εικόνας.')
      event.target.value = ''
      return
    }

    setUploadingImage(true)

    try {
      const { publicUrl } = await uploadAdminImage(file)
      setPromoField('imageUrl', publicUrl)
      setUploadMessage('Η φωτογραφία ανέβηκε επιτυχώς.')
    } catch (error) {
      setUploadMessage(error?.message || 'Αποτυχία ανεβάσματος εικόνας.')
    } finally {
      setUploadingImage(false)
      event.target.value = ''
    }
  }

  async function handleSaveDraft() {
    const nextPromo = { ...livePromo, enabled: false, updatedAt: new Date().toISOString() }
    setForm(current => ({ ...current, livePromo: nextPromo }))
    await persist(nextPromo, reviewStats, 'Οι αλλαγές αποθηκεύτηκαν.')
  }

  async function handlePublish() {
    if (getLivePromoState({ ...livePromo, enabled: true }) === 'invalid') {
      clearMessages()
      setPromoMessage('Ελέγξτε ξανά την έναρξη και τη λήξη.')
      return
    }

    const nextPromo = {
      ...livePromo,
      enabled: true,
      campaignId: createLivePromoCampaignId(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setForm(current => ({ ...current, livePromo: nextPromo }))
    await persist(nextPromo, reviewStats, 'Η ανακοίνωση δημοσιεύτηκε.')
  }

  async function handleUnpublish() {
    const nextPromo = { ...livePromo, enabled: false, updatedAt: new Date().toISOString() }
    setForm(current => ({ ...current, livePromo: nextPromo }))
    await persist(nextPromo, reviewStats, 'Η ανακοίνωση απενεργοποιήθηκε.')
  }

  async function handleSaveRatings() {
    await persist(livePromo, reviewStats, 'Οι αξιολογήσεις αποθηκεύτηκαν.', 'ratings')
  }

  async function handleLogin(event) {
    event.preventDefault()
    if (!supabase) return

    setLoginLoading(true)
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoginLoading(false)

    if (error) {
      setAuthError(error.message)
    } else {
      setPassword('')
    }
  }

  async function handleSignOut() {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Live Promo Admin | Μεταξύ Μας</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <section className={`min-h-screen px-4 py-8 sm:px-6 sm:py-10 ${!session && !authLoading ? 'flex items-center justify-center' : ''}`}>
        <div className="mx-auto max-w-7xl">
          {!hasSupabaseEnv || !hasSharedSupabaseEnv ? (
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-[rgba(122,30,46,0.16)] bg-[rgba(255,249,240,0.76)] p-6 text-center shadow-[0_24px_70px_rgba(86,52,18,0.08)] sm:p-8">
              <p className="label-upper mb-3">Ρύθμιση</p>
              <h1 className="heading-card mb-3 text-[rgba(31,18,9,0.92)]">Χρειάζεται μια αρχική ρύθμιση</h1>
              <p className="text-sm leading-relaxed text-[rgba(47,29,15,0.58)]">Ολοκληρώστε πρώτα τη ρύθμιση και μετά δοκιμάστε ξανά.</p>
            </div>
          ) : authLoading ? (
            <div className="mx-auto max-w-md rounded-[2rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,249,240,0.72)] p-6 text-center shadow-[0_24px_70px_rgba(86,52,18,0.08)] sm:p-8">
              <p className="text-sm text-[rgba(47,29,15,0.58)]">Έλεγχος σύνδεσης...</p>
            </div>
          ) : !session ? (
            <LoginCard
              email={email}
              password={password}
              error={authError}
              loading={loginLoading}
              onEmailChange={e => setEmail(e.target.value)}
              onPasswordChange={e => setPassword(e.target.value)}
              onSubmit={handleLogin}
            />
          ) : (
            <>
              <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="text-sm text-[rgba(47,29,15,0.58)]">{session.user.email}</div>
                <button type="button" onClick={handleSignOut} className="btn-outline text-sm">
                  <LogOut size={15} />
                  Αποσύνδεση
                </button>
              </div>

              <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-8">
                  <div className="card-base p-6 text-center sm:p-8 sm:text-left">
                    <div className="mb-6 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:text-left">
                      <div>
                        <p className="label-upper mb-2">Ανακοίνωση</p>
                        <h2 className="heading-card text-[rgba(31,18,9,0.92)]">Στοιχεία ανακοίνωσης</h2>
                      </div>
                      <span className={cn('rounded-full border px-3 py-1.5 text-xs font-medium', meta.className)}>{meta.label}</span>
                    </div>

                    <div className="grid gap-5">
                      <Field label="Τίτλος">
                        <input value={livePromo.title} onChange={e => setPromoField('title', e.target.value)} className="form-field" />
                      </Field>

                      <Field label="Κείμενο">
                        <textarea value={livePromo.message} onChange={e => setPromoField('message', e.target.value)} className="form-field min-h-[8rem]" />
                      </Field>

                      <Field label="Φωτογραφία" hint="Διαλέξτε φωτογραφία από τη συσκευή σας.">
                        <div className="space-y-3">
                          <input
                            id="live-promo-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="sr-only"
                            disabled={uploadingImage}
                          />

                          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                            <label
                              htmlFor="live-promo-image-upload"
                              className={`btn-outline text-sm ${uploadingImage ? 'pointer-events-none opacity-60' : 'cursor-pointer'}`}
                            >
                              <ImagePlus size={15} />
                              {uploadingImage ? 'Ανέβασμα...' : 'Επιλογή από συσκευή'}
                            </label>

                            {livePromo.imageUrl ? (
                              <button
                                type="button"
                                onClick={() => {
                                  clearMessages()
                                  setPromoField('imageUrl', '')
                                  setUploadMessage('Η φωτογραφία αφαιρέθηκε.')
                                }}
                                className="btn-outline text-sm"
                                disabled={uploadingImage}
                              >
                                <Trash2 size={15} />
                                Σβήσιμο φωτογραφίας
                              </button>
                            ) : null}
                          </div>

                          <InlineMessage message={uploadMessage} />
                        </div>
                      </Field>

                      <div className="grid gap-5 text-center md:grid-cols-2 sm:text-left">
                        <Field label="Έναρξη προβολής">
                          <input type="datetime-local" value={livePromo.startsAt} onChange={e => setPromoField('startsAt', e.target.value)} className="form-field" />
                        </Field>
                        <Field label="Λήξη προβολής">
                          <input type="datetime-local" value={livePromo.endsAt} onChange={e => setPromoField('endsAt', e.target.value)} className="form-field" />
                        </Field>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Κείμενο κουμπιού">
                          <input value={livePromo.ctaLabel} onChange={e => setPromoField('ctaLabel', e.target.value)} className="form-field" />
                        </Field>
                        <Field label="Μικρή σημείωση">
                          <input value={livePromo.venueNote} onChange={e => setPromoField('venueNote', e.target.value)} className="form-field" />
                        </Field>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
                      <button type="button" onClick={handleSaveDraft} className="btn-outline text-sm" disabled={saving || uploadingImage}>
                        <Save size={15} />
                        Αποθήκευση
                      </button>
                      <button type="button" onClick={handlePublish} className="btn-primary text-sm" disabled={saving || uploadingImage}>
                        <Rocket size={15} />
                        Δημοσίευση
                      </button>
                      <button type="button" onClick={handleUnpublish} className="btn-outline text-sm" disabled={saving || uploadingImage}>
                        <EyeOff size={15} />
                        Απενεργοποίηση
                      </button>
                    </div>

                    <InlineMessage message={promoMessage} className="mt-4" />
                  </div>

                  <div className="card-base p-6 text-center sm:p-8">
                    <div className="mb-5 flex items-center justify-center gap-3">
                      <Eye size={18} className="text-gold-700" />
                      <h2 className="heading-card text-[rgba(31,18,9,0.92)]">Προεπισκόπηση</h2>
                    </div>

                    <div className="overflow-hidden rounded-[1.8rem] border border-[rgba(127,91,48,0.12)] bg-[linear-gradient(145deg,rgba(53,28,15,0.96),rgba(24,12,6,0.94))]">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(214,164,79,0.22),transparent_42%),linear-gradient(160deg,rgba(92,48,24,0.88),rgba(28,15,8,0.96))]">
                        {livePromo.imageUrl ? <img src={livePromo.imageUrl} alt={livePromo.title || 'Προεπισκόπηση'} className="h-full w-full object-contain p-4" /> : null}
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,12,6,0.08),rgba(26,12,6,0.62))]" />
                      </div>
                      <div className="p-6 text-center">
                        <p className="label-upper mb-3 text-[rgba(239,199,122,0.92)]">Ανακοίνωση</p>
                        <h3 className="font-display text-3xl leading-none text-[rgba(255,246,232,0.96)]">{livePromo.title || 'Χωρίς τίτλο'}</h3>
                        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[rgba(237,205,148,0.68)]">{livePromo.venueNote || ' '}</p>
                        <p className="mt-5 text-sm leading-relaxed text-[rgba(255,239,214,0.74)]">{livePromo.message || ' '}</p>
                        <div className="mt-6 flex justify-center">
                          <span className="btn-primary pointer-events-none text-sm">{livePromo.ctaLabel || 'Κλείσε τραπέζι'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-base p-6 text-center sm:p-8 sm:text-left">
                    <div className="mb-6">
                      <p className="label-upper mb-2">Αξιολογήσεις</p>
                      <h2 className="heading-card text-[rgba(31,18,9,0.92)]">Στοιχεία Google</h2>
                    </div>

                    <div className="grid gap-5 text-center md:grid-cols-2 sm:text-left">
                      <Field label="Μέση βαθμολογία">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={reviewStats.average}
                          onChange={e => setReviewField('average', Number(e.target.value))}
                          className="form-field"
                        />
                      </Field>
                      <Field label="Συνολικές αξιολογήσεις">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={reviewStats.total}
                          onChange={e => setReviewField('total', Number(e.target.value))}
                          className="form-field"
                        />
                      </Field>
                    </div>

                    <div className="mt-6 flex justify-center sm:justify-start">
                      <button type="button" onClick={handleSaveRatings} className="btn-primary text-sm" disabled={saving || uploadingImage}>
                        <Upload size={15} />
                        Αποθήκευση
                      </button>
                    </div>

                    <InlineMessage message={ratingsMessage} className="mt-4" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="card-base p-6 text-center sm:p-8">
                    <h2 className="heading-card mb-4 text-[rgba(31,18,9,0.92)]">Στοιχεία</h2>
                    <div className="space-y-3 text-sm text-[rgba(47,29,15,0.64)]">
                      <p>Έναρξη: {startsAt ? `${formatDate(startsAt.toISOString())} ${startsAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}` : 'Δεν έχει οριστεί'}</p>
                      <p>Λήξη: {endsAt ? `${formatDate(endsAt.toISOString())} ${endsAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}` : 'Δεν έχει οριστεί'}</p>
                      <p>Βαθμολογία Google: {reviewStats.average} / 5</p>
                      <p>Αξιολογήσεις Google: {reviewStats.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
