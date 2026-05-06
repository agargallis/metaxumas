export function createEmptyLivePromo() {
  return {
    campaignId: '',
    enabled: false,
    title: 'Απόψε ζωντανή μουσική',
    message: 'Κλείστε το τραπέζι σας για τη live βραδιά πριν γεμίσει ο χώρος.',
    imageUrl: '',
    ctaLabel: 'Κλείσε τραπέζι',
    liveAt: '',
    startsAt: '',
    endsAt: '',
    venueNote: 'Live βραδιά στο Μεταξύ Μας',
    updatedAt: '',
    publishedAt: '',
  }
}

const SEEN_KEY = 'metaxumas.live-promo.seen.v1'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readSeenMap() {
  if (!canUseStorage()) return {}
  try {
    const raw = window.localStorage.getItem(SEEN_KEY)
    if (!raw) return {}
    return JSON.parse(raw) || {}
  } catch {
    return {}
  }
}

function writeSeenMap(map) {
  if (!canUseStorage()) return
  window.localStorage.setItem(SEEN_KEY, JSON.stringify(map))
}

export function markLivePromoSeen(campaignId) {
  if (!campaignId) return
  const seen = readSeenMap()
  seen[campaignId] = new Date().toISOString()
  writeSeenMap(seen)
}

export function hasSeenLivePromo(campaignId) {
  if (!campaignId) return false
  const seen = readSeenMap()
  return Boolean(seen[campaignId])
}

export function toLocalDateTimeValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function parsePromoDate(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function getLivePromoState(promo, now = new Date()) {
  if (!promo?.enabled) return 'draft'

  const startsAt = parsePromoDate(promo.startsAt)
  const endsAt = parsePromoDate(promo.endsAt)

  if (!startsAt || !endsAt) return 'invalid'
  if (endsAt <= startsAt) return 'invalid'
  if (now < startsAt) return 'scheduled'
  if (now > endsAt) return 'expired'
  return 'active'
}

export function isLivePromoActive(promo, now = new Date()) {
  return getLivePromoState(promo, now) === 'active'
}

export function createLivePromoCampaignId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `promo-${Date.now()}`
}
