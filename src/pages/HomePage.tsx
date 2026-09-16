import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Code2,
  ChevronRight
} from 'lucide-react'
import { ALL_DEMOS } from '../demos/demosData'
import {
  PageTransitionsMiniPreview,
  SharedLayoutMiniPreview,
  ScrollRevealMiniPreview,
  DragReorderMiniPreview,
  GestureSwipeMiniPreview
} from '../components/MiniPreviews'

type CategoryFilter = 'All' | 'Transitions' | 'Layout' | 'Scroll' | 'Gestures'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')
  const [hoveredDemoId, setHoveredDemoId] = useState<string | null>(null)

  const filteredDemos =
    selectedCategory === 'All'
      ? ALL_DEMOS
      : ALL_DEMOS.filter(demo => demo.category === selectedCategory)

  const renderMiniPreview = (demoId: string, isHovered: boolean) => {
    switch (demoId) {
      case 'page-transitions':
        return <PageTransitionsMiniPreview isHovered={isHovered} />
      case 'shared-layout':
        return <SharedLayoutMiniPreview isHovered={isHovered} />
      case 'scroll-reveal':
        return <ScrollRevealMiniPreview isHovered={isHovered} />
      case 'drag-reorder':
        return <DragReorderMiniPreview isHovered={isHovered} />
      case 'gesture-swipe':
        return <GestureSwipeMiniPreview isHovered={isHovered} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800/80 bg-linear-to-b from-white via-indigo-50/20 to-transparent dark:from-neutral-950 dark:via-neutral-900/40 dark:to-neutral-950 py-16 sm:py-24">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Production Motion Design & Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-3xl mx-auto leading-[1.15]"
          >
            Tactile Kinetic Patterns for Modern React
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            A curated portfolio showcase of five production-quality Framer Motion patterns — built with React 19, Tailwind CSS v4, and strict TypeScript.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              to="/demos/page-transitions"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all group"
            >
              <span>Explore First Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href="https://github.com/Josheqani/motion-lab"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold transition-all shadow-xs"
            >
              <Code2 className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </motion.div>

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400"
          >
            <span className="font-semibold mr-1">Stack:</span>
            {['React 19', 'Tailwind CSS v4', 'Motion 13', 'React Router v7', 'TypeScript Strict', 'Vite 6'].map(t => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-mono text-[11px]"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Showcase Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Interactive Demonstrations
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Hover over cards to trigger instant live mini-previews of each animation technique.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 self-start sm:self-auto overflow-x-auto max-w-full">
            {(['All', 'Transitions', 'Layout', 'Scroll', 'Gestures'] as CategoryFilter[]).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDemos.map(demo => {
            const isHovered = hoveredDemoId === demo.id

            return (
              <Link
                key={demo.id}
                to={demo.route}
                onMouseEnter={() => setHoveredDemoId(demo.id)}
                onMouseLeave={() => setHoveredDemoId(null)}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-xs hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-700 transition-all overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Mini Preview Area with Hover Autoplay */}
                  <div className="relative rounded-xl overflow-hidden border border-neutral-200/60 dark:border-neutral-800/80">
                    {renderMiniPreview(demo.id, isHovered)}
                  </div>

                  {/* Header Meta */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold">
                      {demo.category}
                    </span>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold">
                      {demo.badge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="font-extrabold text-neutral-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {demo.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="pt-5 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500">
                  <span>Explore full demo</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Architectural Pillars / Quality Bar */}
      <section className="border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
              Built to Production Quality
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Not just toys — engineered with real-world accessibility, frame budgets, and modular patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Reduced Motion</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Respects OS accessibility preferences with graceful opacity fallbacks and neutral transforms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Zero Jank 60fps</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Offloads animation passes to GPU compositors via transform and opacity only, preventing layout reflow.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Strict TypeScript</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Zero <code className="font-mono">any</code> types, strictly defined variant models, and typed pan events.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Modular Hierarchy</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Modular component boundaries separating gesture math, data models, and presentation wrappers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>© 2026 motion-lab. Released under MIT License.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Josheqani/motion-lab"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              GitHub Source
            </a>
            <span>•</span>
            <Link to="/demos/page-transitions" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Page Transitions
            </Link>
            <span>•</span>
            <Link to="/demos/shared-layout" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Shared Layout
            </Link>
            <span>•</span>
            <Link to="/demos/gesture-swipe" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Gesture Swipe
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
