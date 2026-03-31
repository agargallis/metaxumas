export default function AppLoader({ fullScreen = true }) {
  return (
    <div
      className={fullScreen ? 'flex min-h-screen items-center justify-center px-6 py-16' : 'flex items-center justify-center py-16'}
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-center rounded-full border border-[rgba(127,91,48,0.12)] bg-[rgba(255,250,243,0.8)] p-6 shadow-[0_24px_70px_rgba(86,52,18,0.12)]">
        <svg className="h-8 w-8 animate-spin text-[rgba(140,86,7,0.86)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" className="opacity-20" stroke="currentColor" strokeWidth="3" />
          <path d="M21 12a9 9 0 00-9-9" className="opacity-90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  )
}
