import React from 'react'
import { RefreshCw, TriangleAlert } from 'lucide-react'

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed:', error, errorInfo)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className="min-h-screen px-6 py-16" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-[2rem] border border-[rgba(127,91,48,0.12)] bg-[rgba(255,250,243,0.8)] p-8 text-center shadow-[0_24px_70px_rgba(86,52,18,0.12)]">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(180,120,14,0.12)] text-[rgba(140,86,7,0.9)]">
            <TriangleAlert size={24} />
          </div>
          <h1 className="heading-card mb-3 text-[rgba(31,18,9,0.92)]">Κάτι πήγε λάθος στην προβολή της σελίδας.</h1>
          <p className="mb-5 max-w-xl text-sm leading-7 text-[rgba(47,29,15,0.62)]">
            Έγινε runtime σφάλμα στο frontend. Κάντε ανανέωση ή ξαναδοκιμάστε σε λίγα δευτερόλεπτα.
          </p>
          {this.state.error?.message ? (
            <pre className="mb-6 w-full overflow-auto rounded-2xl bg-[rgba(255,255,255,0.62)] p-4 text-left text-xs leading-6 text-[rgba(47,29,15,0.7)]">
              {this.state.error.message}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Ανανέωση <RefreshCw size={15} />
          </button>
        </div>
      </div>
    )
  }
}
