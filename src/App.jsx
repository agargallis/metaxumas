import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'
import Home from './pages/Home'
import Menu from './pages/Menu'
import LiveMusic from './pages/LiveMusic'
import Reservations from './pages/Reservations'
import Reviews from './pages/Reviews'
import Cookies from './pages/Cookies'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export default function App() {
  return (
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
  )
}
