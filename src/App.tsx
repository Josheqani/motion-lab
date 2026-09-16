import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { Nav } from './components/Nav'
import HomePage from './pages/HomePage'

const PageTransitionsPage = lazy(() => import('./demos/page-transitions'))
const SharedLayoutPage = lazy(() => import('./demos/shared-layout'))
const ScrollRevealPage = lazy(() => import('./demos/scroll-reveal'))
const DragReorderPage = lazy(() => import('./demos/drag-reorder'))
const GestureSwipePage = lazy(() => import('./demos/gesture-swipe'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function PageFallback() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center animate-spin">
        <div className="w-3 h-3 rounded-full bg-indigo-500" />
      </div>
      <p className="text-xs font-mono text-neutral-400 animate-pulse">Loading demonstration module...</p>
    </div>
  )
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
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/demos/page-transitions" element={<PageTransitionsPage />} />
            <Route path="/demos/shared-layout" element={<SharedLayoutPage />} />
            <Route path="/demos/scroll-reveal" element={<ScrollRevealPage />} />
            <Route path="/demos/drag-reorder" element={<DragReorderPage />} />
            <Route path="/demos/gesture-swipe" element={<GestureSwipePage />} />
          </Routes>
        </Suspense>
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
