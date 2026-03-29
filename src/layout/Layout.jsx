import Navbar from './Navbar'
import Footer from './Footer'
import MobileCallButton from '../components/ui/MobileCallButton'
import BackToTop from '../components/ui/BackToTop'
import CookieBanner from '../components/ui/CookieBanner'

export default function Layout({ children }) {
  return (
    <div className="site-shell min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <div className="site-photo-backdrop" aria-hidden="true" />
      <div className="site-atmosphere" aria-hidden="true" />
      <div className="site-icon-pattern" aria-hidden="true" />
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        {children}
      </main>
      <Footer />
      <MobileCallButton />
      <BackToTop />
      <CookieBanner />
    </div>
  )
}
