import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { Nav } from './components/Nav'
import HomePage from './pages/HomePage'
import PageTransitionsPage from './demos/page-transitions'
import SharedLayoutPage from './demos/shared-layout'
import ScrollRevealPage from './demos/scroll-reveal'
import DragReorderPage from './demos/drag-reorder'
import GestureSwipePage from './demos/gesture-swipe'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  const { reducedMotion } = useTheme()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="w-full flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/demos/page-transitions" element={<PageTransitionsPage />} />
          <Route path="/demos/shared-layout" element={<SharedLayoutPage />} />
          <Route path="/demos/scroll-reveal" element={<ScrollRevealPage />} />
          <Route path="/demos/drag-reorder" element={<DragReorderPage />} />
          <Route path="/demos/gesture-swipe" element={<GestureSwipePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
        <ScrollToTop />
        <Nav />
        <AnimatedRoutes />
      </div>
    </ThemeProvider>
  )
}
