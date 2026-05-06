import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Eye, EyeOff, ImagePlus, LogIn, LogOut, Rocket, Save, Trash2, Upload } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import { useSiteSettings } from '../context/SiteSettingsContext'
import { normalizePageMedia } from '../lib/pageMedia'
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

const liveMusicPhotoGroups = [
  { key: 'friday', label: 'Παρασκευή', folder: 'live-music-friday' },
  { key: 'saturday', label: 'Σάββατο', folder: 'live-music-saturday' },
  { key: 'sunday', label: 'Κυριακή', folder: 'live-music-sunday' },
]

function buildFormState(settings) {
  return {
    livePromo: { ...settings.livePromo },
    pageMedia: normalizePageMedia(settings.pageMedia),
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

function PhotoTile({ photo, label, disabled, onRemove }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,249,240,0.82)]">
      <div className="aspect-[4/3] overflow-hidden bg-[rgba(127,91,48,0.06)]">
        <img src={photo.image} alt={photo.title || label} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-3 p-3">
        <p className="text-xs text-[rgba(47,29,15,0.62)]">{label}</p>
        <button type="button" onClick={onRemove} className="btn-outline w-full justify-center px-4 text-sm" disabled={disabled}>
          <Trash2 size={15} />
          Αφαίρεση
        </button>
      </div>
    </div>
  )
}

function PhotoManager({ title, hint, inputId, photos, uploading, onUpload, onRemove }) {
  return (
    <div className="rounded-[1.6rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,252,246,0.82)] p-4 sm:p-5">
      <div className="mb-4 space-y-2 text-center sm:text-left">
        <h3 className="heading-card text-[rgba(31,18,9,0.9)]">{title}</h3>
        <p className="text-sm leading-relaxed text-[rgba(47,29,15,0.56)]">{hint}</p>
      </div>

      <input id={inputId} type="file" accept="image/*" multiple onChange={onUpload} className="sr-only" disabled={uploading} />

      <label htmlFor={inputId} className={cn('btn-primary w-full cursor-pointer justify-center px-4 text-sm', uploading && 'pointer-events-none opacity-60')}>
        <ImagePlus size={15} />
        {uploading ? 'Ανέβασμα...' : 'Προσθήκη φωτογραφιών'}
      </label>

      {photos.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {photos.map((photo, index) => (
            <PhotoTile
              key={photo.id}
              photo={photo}
              label={`Φωτογραφία ${index + 1}`}
              disabled={uploading}
              onRemove={() => onRemove(photo.id)}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-[rgba(127,91,48,0.16)] px-4 py-4 text-sm text-[rgba(47,29,15,0.50)]">
          Δεν υπάρχουν φωτογραφίες ακόμη.
        </p>
      )}
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
  const [mediaMessage, setMediaMessage] = useState('')
  const [authError, setAuthError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingSection, setUploadingSection] = useState('')
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
  const pageMedia = form.pageMedia
  const reviewStats = form.reviewStats
  const meta = useMemo(() => statusMeta[getLivePromoState(livePromo)] || statusMeta.draft, [livePromo])
  const liveAt = parsePromoDate(livePromo.liveAt)
  const startsAt = parsePromoDate(livePromo.startsAt)
  const endsAt = parsePromoDate(livePromo.endsAt)

  function clearMessages() {
    setPromoMessage('')
    setUploadMessage('')
    setRatingsMessage('')
    setMediaMessage('')
  }

  function setPromoField(key, value) {
    setForm(current => ({ ...current, livePromo: { ...current.livePromo, [key]: value } }))
  }

  function setReviewField(key, value) {
    setForm(current => ({ ...current, reviewStats: { ...current.reviewStats, [key]: value } }))
  }

  function setPageMedia(nextPageMedia) {
    setForm(current => ({ ...current, pageMedia: normalizePageMedia(nextPageMedia) }))
  }

  async function persist(nextLivePromo, nextReviewStats, nextPageMedia, successMessage, scope = 'promo') {
    setSaving(true)
    clearMessages()

    try {
      await updateSettings({
        livePromo: nextLivePromo,
        pageMedia: normalizePageMedia(nextPageMedia),
        reviewStats: {
          ...nextReviewStats,
          average: Number(nextReviewStats.average),
          total: Number(nextReviewStats.total),
        },
      })

      if (scope === 'ratings') {
        setRatingsMessage(successMessage)
      } else if (scope === 'media') {
        setMediaMessage(successMessage)
      } else {
        setPromoMessage(successMessage)
      }
    } catch (error) {
      const fallback = 'Δεν αποθηκεύτηκε. Δοκιμάστε ξανά.'
      if (scope === 'ratings') {
        setRatingsMessage(error?.message || fallback)
      } else if (scope === 'media') {
        setMediaMessage(error?.message || fallback)
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

  async function uploadGalleryPhotos(files, folder, buildNextPageMedia, successMessage) {
    if (!files.length) return

    clearMessages()
    setUploadingSection(folder)

    try {
      const uploadedPhotos = []

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          throw new Error('Επιλέξτε μόνο αρχεία εικόνας.')
        }

        const { publicUrl } = await uploadAdminImage(file, folder)
        uploadedPhotos.push({ id: `${folder}-${Date.now()}-${uploadedPhotos.length + 1}`, image: publicUrl })
      }

      const nextPageMedia = normalizePageMedia(buildNextPageMedia(uploadedPhotos))
      setPageMedia(nextPageMedia)
      await persist(livePromo, reviewStats, nextPageMedia, successMessage, 'media')
    } finally {
      setUploadingSection('')
    }
  }

  async function handleHomePhotosUpload(event) {
    const files = Array.from(event.target.files || [])

    try {
      await uploadGalleryPhotos(
        files,
        'home-gallery',
        uploadedPhotos => ({
          ...pageMedia,
          homePhotos: [...pageMedia.homePhotos, ...uploadedPhotos],
        }),
        'Οι φωτογραφίες αρχικής αποθηκεύτηκαν.'
      )
    } catch (error) {
      setMediaMessage(error?.message || 'Αποτυχία ανεβάσματος φωτογραφιών.')
    } finally {
      event.target.value = ''
    }
  }

  async function handleLiveMusicPhotosUpload(dayKey, folder, event) {
    const files = Array.from(event.target.files || [])

    try {
      await uploadGalleryPhotos(
        files,
        folder,
        uploadedPhotos => ({
          ...pageMedia,
          liveMusicPhotos: {
            ...pageMedia.liveMusicPhotos,
            [dayKey]: [...pageMedia.liveMusicPhotos[dayKey], ...uploadedPhotos],
          },
        }),
        `Οι φωτογραφίες για ${liveMusicPhotoGroups.find(group => group.key === dayKey)?.label || dayKey} αποθηκεύτηκαν.`
      )
    } catch (error) {
      setMediaMessage(error?.message || 'Αποτυχία ανεβάσματος φωτογραφιών.')
    } finally {
      event.target.value = ''
    }
  }

  async function removeHomePhoto(photoId) {
    const nextPageMedia = normalizePageMedia({
      ...pageMedia,
      homePhotos: pageMedia.homePhotos.filter(photo => photo.id !== photoId),
    })

    setPageMedia(nextPageMedia)
    await persist(livePromo, reviewStats, nextPageMedia, 'Η φωτογραφία αρχικής αφαιρέθηκε.', 'media')
  }

  async function removeLiveMusicPhoto(dayKey, photoId) {
    const nextPageMedia = normalizePageMedia({
      ...pageMedia,
      liveMusicPhotos: {
        ...pageMedia.liveMusicPhotos,
        [dayKey]: pageMedia.liveMusicPhotos[dayKey].filter(photo => photo.id !== photoId),
      },
    })

    setPageMedia(nextPageMedia)
    await persist(livePromo, reviewStats, nextPageMedia, 'Η φωτογραφία αφαιρέθηκε.', 'media')
  }

  async function handleSaveDraft() {
    const nextPromo = { ...livePromo, enabled: false, updatedAt: new Date().toISOString() }
    setForm(current => ({ ...current, livePromo: nextPromo }))
    await persist(nextPromo, reviewStats, pageMedia, 'Οι αλλαγές αποθηκεύτηκαν.')
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
    await persist(nextPromo, reviewStats, pageMedia, 'Η ανακοίνωση δημοσιεύτηκε.')
  }

  async function handleUnpublish() {
    const nextPromo = { ...livePromo, enabled: false, updatedAt: new Date().toISOString() }
    setForm(current => ({ ...current, livePromo: nextPromo }))
    await persist(nextPromo, reviewStats, pageMedia, 'Η ανακοίνωση απενεργοποιήθηκε.')
  }

  async function handleSaveRatings() {
    await persist(livePromo, reviewStats, pageMedia, 'Οι αξιολογήσεις αποθηκεύτηκαν.', 'ratings')
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
                <div className="break-all text-sm text-[rgba(47,29,15,0.58)]">{session.user.email}</div>
                <button type="button" onClick={handleSignOut} className="btn-outline w-full justify-center px-4 text-sm sm:w-auto">
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

                      <Field label="Ημερομηνία live" hint="Αυτή η ημερομηνία θα φαίνεται πάνω στη φωτογραφία στο popup.">
                        <input type="datetime-local" value={livePromo.liveAt || ''} onChange={e => setPromoField('liveAt', e.target.value)} className="form-field" />
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

                          <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-start">
                            <label
                              htmlFor="live-promo-image-upload"
                              className={cn('btn-outline w-full cursor-pointer justify-center px-4 text-sm sm:w-auto', uploadingImage && 'pointer-events-none opacity-60')}
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
                                className="btn-outline w-full justify-center px-4 text-sm sm:w-auto"
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

                      <div className="grid gap-5 text-center sm:text-left md:grid-cols-2">
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

                    <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:justify-start">
                      <button type="button" onClick={handleSaveDraft} className="btn-outline w-full justify-center px-4 text-sm sm:w-auto" disabled={saving || uploadingImage}>
                        <Save size={15} />
                        Αποθήκευση
                      </button>
                      <button type="button" onClick={handlePublish} className="btn-primary w-full justify-center px-4 text-sm sm:w-auto" disabled={saving || uploadingImage}>
                        <Rocket size={15} />
                        Δημοσίευση
                      </button>
                      <button type="button" onClick={handleUnpublish} className="btn-outline w-full justify-center px-4 text-sm sm:w-auto" disabled={saving || uploadingImage}>
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
                        {liveAt ? (
                          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-4">
                            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[rgba(255,243,224,0.92)] sm:gap-3">
                              <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-[rgba(32,14,6,0.42)] px-3 py-1.5 backdrop-blur-md">
                                {formatDate(liveAt.toISOString())}
                              </span>
                              <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-[rgba(32,14,6,0.42)] px-3 py-1.5 backdrop-blur-md">
                                Έναρξη {liveAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ) : null}
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

                    <div className="grid gap-5 text-center sm:text-left md:grid-cols-2">
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

                    <div className="mt-6">
                      <button type="button" onClick={handleSaveRatings} className="btn-primary w-full justify-center px-4 text-sm sm:w-auto" disabled={saving || uploadingImage}>
                        <Upload size={15} />
                        Αποθήκευση
                      </button>
                    </div>

                    <InlineMessage message={ratingsMessage} className="mt-4" />
                  </div>

                  <div className="card-base p-6 text-center sm:p-8 sm:text-left">
                    <div className="mb-6">
                      <p className="label-upper mb-2">Φωτογραφίες</p>
                      <h2 className="heading-card text-[rgba(31,18,9,0.92)]">Διαχείριση σελίδων</h2>
                      <p className="mt-3 text-sm leading-relaxed text-[rgba(47,29,15,0.56)]">
                        Εδώ αλλάζετε τις φωτογραφίες που φαίνονται στην αρχική σελίδα και στη σελίδα live music.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <PhotoManager
                        title="Αρχική σελίδα"
                        hint="Προσθήκη ή αφαίρεση φωτογραφιών για το carousel της αρχικής."
                        inputId="home-page-photos"
                        photos={pageMedia.homePhotos}
                        uploading={uploadingSection === 'home-gallery'}
                        onUpload={handleHomePhotosUpload}
                        onRemove={removeHomePhoto}
                      />

                      {liveMusicPhotoGroups.map(group => (
                        <PhotoManager
                          key={group.key}
                          title={`Live Music · ${group.label}`}
                          hint={`Οι φωτογραφίες αυτές χρησιμοποιούνται για τη ${group.label} στη σελίδα live music.`}
                          inputId={`live-music-${group.key}-photos`}
                          photos={pageMedia.liveMusicPhotos[group.key]}
                          uploading={uploadingSection === group.folder}
                          onUpload={event => handleLiveMusicPhotosUpload(group.key, group.folder, event)}
                          onRemove={photoId => removeLiveMusicPhoto(group.key, photoId)}
                        />
                      ))}
                    </div>

                    <InlineMessage message={mediaMessage} className="mt-4" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="card-base p-6 text-center sm:p-8">
                    <h2 className="heading-card mb-4 text-[rgba(31,18,9,0.92)]">Στοιχεία</h2>
                    <div className="space-y-3 text-sm text-[rgba(47,29,15,0.64)]">
                      <p>Ημερομηνία live: {liveAt ? `${formatDate(liveAt.toISOString())} ${liveAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}` : 'Δεν έχει οριστεί'}</p>
                      <p>Έναρξη προβολής: {startsAt ? `${formatDate(startsAt.toISOString())} ${startsAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}` : 'Δεν έχει οριστεί'}</p>
                      <p>Λήξη προβολής: {endsAt ? `${formatDate(endsAt.toISOString())} ${endsAt.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' })}` : 'Δεν έχει οριστεί'}</p>
                      <p>Βαθμολογία Google: {reviewStats.average} / 5</p>
                      <p>Αξιολογήσεις Google: {reviewStats.total}</p>
                      <p>Φωτογραφίες αρχικής: {pageMedia.homePhotos.length}</p>
                      <p>Live Music Παρασκευή: {pageMedia.liveMusicPhotos.friday.length}</p>
                      <p>Live Music Σάββατο: {pageMedia.liveMusicPhotos.saturday.length}</p>
                      <p>Live Music Κυριακή: {pageMedia.liveMusicPhotos.sunday.length}</p>
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
