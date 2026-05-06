import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createDefaultSiteSettings, fetchSiteSettings, saveSiteSettings } from '../lib/siteSettings'
import { hasSupabaseEnv } from '../lib/supabase'

const SiteSettingsContext = createContext(null)

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(createDefaultSiteSettings)
  const [loading, setLoading] = useState(hasSupabaseEnv)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    if (!hasSupabaseEnv) {
      setSettings(createDefaultSiteSettings())
      setLoading(false)
      return createDefaultSiteSettings()
    }

    setLoading(true)
    try {
      const nextSettings = await fetchSiteSettings()
      setSettings(nextSettings)
      setError('')
      return nextSettings
    } catch (err) {
      setError(err?.message || 'Failed to load site settings.')
      return createDefaultSiteSettings()
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSettings = useCallback(async nextSettings => {
    const saved = await saveSiteSettings(nextSettings)
    setSettings(saved)
    setError('')
    return saved
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const value = useMemo(
    () => ({
      settings,
      loading,
      error,
      hasSupabaseEnv,
      refresh,
      updateSettings,
    }),
    [settings, loading, error, refresh, updateSettings],
  )

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (!context) {
    throw new Error('useSiteSettings must be used within SiteSettingsProvider')
  }
  return context
}
