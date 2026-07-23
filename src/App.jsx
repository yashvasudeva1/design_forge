import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import LoadingScreen from './components/LoadingScreen'
import SplashCursor from './components/SplashCursor'

// Lazy load pages
const Home      = lazy(() => import('./pages/Home'))
const About     = lazy(() => import('./pages/About'))
const Services  = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact   = lazy(() => import('./pages/Contact'))

// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
  >
    {children}
  </motion.div>
)

// Animated routes - uses location key for exit animations
const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Suspense fallback={null}><Home /></Suspense></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><Suspense fallback={null}><About /></Suspense></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Suspense fallback={null}><Services /></Suspense></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><Suspense fallback={null}><Portfolio /></Suspense></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Suspense fallback={null}><Contact /></Suspense></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {/* Global fluid cursor effect */}
      <SplashCursor />

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none" />

      {/* Loading screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Main app */}
      {!loading && (
        <BrowserRouter>
          <Navbar />
          <main className="min-h-screen">
            <AnimatedRoutes />
          </main>
          <Footer />
        </BrowserRouter>
      )}
    </>
  )
}

export default App
