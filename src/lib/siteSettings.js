import { ratingStats as fallbackRatingStats } from '../data/reviews'
import { createEmptyLivePromo } from './livePromo'
import { hasSupabaseEnv, supabase } from './supabase'

export const SITE_SETTINGS_ROW_ID = 'main'

export function createDefaultReviewStats() {
  return {
    average: fallbackRatingStats.average,
    total: fallbackRatingStats.total,
    breakdown: { ...fallbackRatingStats.breakdown },
  }
}

export function createDefaultSiteSettings() {
  return {
    reviewStats: createDefaultReviewStats(),
    livePromo: createEmptyLivePromo(),
  }
}

export function normalizeReviewStats(input = {}) {
  const fallback = createDefaultReviewStats()
  return {
    average: Number(input.average ?? fallback.average),
    total: Number(input.total ?? fallback.total),
    breakdown: {
      5: Number(input.breakdown?.[5] ?? input.breakdown?.['5'] ?? fallback.breakdown[5]),
      4: Number(input.breakdown?.[4] ?? input.breakdown?.['4'] ?? fallback.breakdown[4]),
      3: Number(input.breakdown?.[3] ?? input.breakdown?.['3'] ?? fallback.breakdown[3]),
      2: Number(input.breakdown?.[2] ?? input.breakdown?.['2'] ?? fallback.breakdown[2]),
      1: Number(input.breakdown?.[1] ?? input.breakdown?.['1'] ?? fallback.breakdown[1]),
    },
  }
}

export function normalizeLivePromo(input = {}) {
  return {
    ...createEmptyLivePromo(),
    ...input,
  }
}

function mapRowToSiteSettings(row) {
  const fallback = createDefaultSiteSettings()
  if (!row) return fallback

  return {
    reviewStats: normalizeReviewStats({
      average: row.review_average,
      total: row.review_total,
      breakdown: row.review_breakdown,
    }),
    livePromo: normalizeLivePromo(row.live_promo),
  }
}

function mapSiteSettingsToRow(settings) {
  return {
    id: SITE_SETTINGS_ROW_ID,
    review_average: settings.reviewStats.average,
    review_total: settings.reviewStats.total,
    review_breakdown: settings.reviewStats.breakdown,
    live_promo: settings.livePromo,
    updated_at: new Date().toISOString(),
  }
}

export async function fetchSiteSettings() {
  if (!hasSupabaseEnv || !supabase) return createDefaultSiteSettings()

  const { data, error } = await supabase
    .from('site_settings')
    .select('id, review_average, review_total, review_breakdown, live_promo')
    .eq('id', SITE_SETTINGS_ROW_ID)
    .maybeSingle()

  if (error) throw error
  return mapRowToSiteSettings(data)
}

export async function saveSiteSettings(settings) {
  if (!hasSupabaseEnv || !supabase) {
    throw new Error('Supabase is not configured.')
  }

  const payload = mapSiteSettingsToRow(settings)
  const { error } = await supabase.from('site_settings').upsert(payload, { onConflict: 'id' })

  if (error) throw error
  return settings
}
