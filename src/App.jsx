import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'
import AppLoader from './components/ui/AppLoader'
import Home from './pages/Home'
import Menu from './pages/Menu'
import LiveMusic from './pages/LiveMusic'
import Reservations from './pages/Reservations'
import Reviews from './pages/Reviews'
import Cookies from './pages/Cookies'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

const INTRO_DURATION_MS = 2800
const INTRO_EXIT_MS = 420

export default function App() {
  const [progress, setProgress] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [isExitingIntro, setIsExitingIntro] = useState(false)

  useEffect(() => {
    const startedAt = window.performance.now()
    let animationFrameId = 0
    let exitTimeoutId = 0

    const tick = now => {
      const elapsed = now - startedAt
      const nextProgress = Math.min(100, Math.max(1, Math.ceil((elapsed / INTRO_DURATION_MS) * 100)))

      setProgress(current => (current === nextProgress ? current : nextProgress))

      if (nextProgress >= 100) {
        setIsExitingIntro(true)
        exitTimeoutId = window.setTimeout(() => {
          setShowIntro(false)
        }, INTRO_EXIT_MS)
        return
      }

      animationFrameId = window.requestAnimationFrame(tick)
    }

    animationFrameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(exitTimeoutId)
    }
  }, [])

  useEffect(() => {
    if (!showIntro) {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      return
    }

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [showIntro])

  return (
    <>
      <div className={`app-shell-transition ${showIntro ? 'app-shell-transition-hidden' : 'app-shell-transition-ready'}`}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/live-music" element={<LiveMusic />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>

      {showIntro ? <AppLoader mode="intro" progress={progress} exiting={isExitingIntro} /> : null}
    </>
  )
}
