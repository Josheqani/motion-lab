import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Nav } from './components/Nav'
import PageTransitionsPage from './demos/page-transitions'
import SharedLayoutPage from './demos/shared-layout'
import ScrollRevealPage from './demos/scroll-reveal'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to="/demos/page-transitions" replace />
            }
          />
          <Route path="/demos/page-transitions" element={<PageTransitionsPage />} />
          <Route path="/demos/shared-layout" element={<SharedLayoutPage />} />
          <Route path="/demos/scroll-reveal" element={<ScrollRevealPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}
