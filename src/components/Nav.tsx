import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Sun,
  Moon,
  Sparkles,
  Layers,
  Menu,
  X,
  Gauge,
  Sliders
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export const DEMO_LINKS = [
  { name: 'Page Transitions', path: '/demos/page-transitions', tag: 'AnimatePresence' },
  { name: 'Shared Layout', path: '/demos/shared-layout', tag: 'layoutId' },
  { name: 'Scroll Reveal', path: '/demos/scroll-reveal', tag: 'useInView' },
  { name: 'Drag Reorder', path: '/demos/drag-reorder', tag: 'Reorder' },
  { name: 'Gesture Swipe', path: '/demos/gesture-swipe', tag: 'drag="x"' },
]

export function Nav() {
  const { theme, toggleTheme, reducedMotion, toggleReducedMotion } = useTheme()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <motion.div
            whileHover={{ rotate: 180, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold tracking-tight text-lg text-neutral-900 dark:text-white">
              motion<span className="text-indigo-600 dark:text-indigo-400">.</span>lab
            </span>
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              framer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {DEMO_LINKS.map(link => {
            const isActive = location.pathname.startsWith(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-lg bg-neutral-200/70 dark:bg-neutral-800/90 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Reduced Motion Toggle Button */}
          <button
            onClick={toggleReducedMotion}
            aria-label={`Toggle reduced motion (currently ${reducedMotion ? 'enabled' : 'disabled'})`}
            title={`Reduced Motion: ${reducedMotion ? 'ON (animations simplified)' : 'OFF (full animations)'}`}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              reducedMotion
                ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 shadow-sm'
                : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Motion: {reducedMotion ? 'Reduced' : 'Full'}</span>
          </button>

          {/* Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Moon className="w-4 h-4 text-indigo-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/Josheqani/motion-lab"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub Repository"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 overflow-hidden"
          >
            <div className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 pt-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Showcase Demos</span>
            </div>
            <div className="grid gap-1">
              {DEMO_LINKS.map(link => {
                const isActive = location.pathname.startsWith(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {link.tag}
                    </span>
                  </Link>
                )
              })}
            </div>

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-2">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Reduced motion mode
              </span>
              <button
                onClick={toggleReducedMotion}
                className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                  reducedMotion
                    ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                    : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {reducedMotion ? 'Reduced' : 'Full'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
