import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from '../components/ui/BackToTop'
import CookieBanner from '../components/ui/CookieBanner'

export default function Layout({ children }) {
  return (
    <div className="site-shell flex min-h-screen flex-col overflow-x-clip" style={{ background: 'var(--bg)' }}>
      <div className="site-photo-backdrop" aria-hidden="true" />
      <div className="site-atmosphere" aria-hidden="true" />
      <div className="site-icon-pattern" aria-hidden="true" />
      <Navbar />
      <main className="flex-1 overflow-x-clip pt-28 md:pt-28">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  )
}
