import { clsx } from 'clsx'

export function cn(...inputs) {
  return clsx(inputs)
}

export function formatDate(isoString, locale = 'el-GR') {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateShort(isoString, locale = 'el-GR') {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
  })
}

export function getDayName(isoString, locale = 'el-GR') {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

export function renderStars(rating, max = 5) {
  return Array.from({ length: max }, (_, i) => i < Math.floor(rating))
}

export function truncate(str, length = 180) {
  if (!str) return ''
  return str.length > length ? str.slice(0, length).trimEnd() + '…' : str
}

export function announcementBadgeColor(type) {
  const map = {
    music:   'bg-[rgba(122,30,46,0.08)] text-wine-700 border-[rgba(122,30,46,0.16)]',
    menu:    'bg-[rgba(77,103,56,0.10)] text-olive-700 border-[rgba(77,103,56,0.18)]',
    holiday: 'bg-[rgba(212,148,26,0.12)] text-gold-700 border-[rgba(212,148,26,0.20)]',
    special: 'bg-[rgba(212,148,26,0.12)] text-gold-700 border-[rgba(212,148,26,0.20)]',
    notice:  'bg-[rgba(127,91,48,0.06)] text-[rgba(47,29,15,0.64)] border-[rgba(127,91,48,0.12)]',
  }
  return map[type] || map.notice
}
