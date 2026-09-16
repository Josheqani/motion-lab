import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import {
  BarChart3,
  SlidersHorizontal,
  Home,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Activity,
  Bell,
  Cpu
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

type TabId = 'overview' | 'analytics' | 'settings'

interface TabDef {
  id: TabId
  label: string
  icon: typeof Home
  index: number
}

const TABS: TabDef[] = [
  { id: 'overview', label: 'Overview', icon: Home, index: 0 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, index: 1 },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal, index: 2 },
]

export function PageTransitionsDemo() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [direction, setDirection] = useState<number>(0)
  const [transitionMode, setTransitionMode] = useState<'wait' | 'popLayout'>('wait')
  const { reducedMotion } = useTheme()

  const currentIndex = TABS.findIndex(t => t.id === activeTab)

  const handleTabChange = (targetTab: TabId) => {
    const targetIndex = TABS.findIndex(t => t.id === targetTab)
    if (targetIndex === currentIndex) return
    setDirection(targetIndex > currentIndex ? 1 : -1)
    setActiveTab(targetTab)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % TABS.length
    const nextTab = TABS[nextIndex]
    if (nextTab) {
      setDirection(1)
      setActiveTab(nextTab.id)
    }
  }

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length
    const prevTab = TABS[prevIndex]
    if (prevTab) {
      setDirection(-1)
      setActiveTab(prevTab.id)
    }
  }

  // Animation variants respecting reduced motion
  const variants: Variants = {
    enter: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? 48 : -48,
      opacity: 0,
      filter: reducedMotion ? 'none' : 'blur(4px)',
      scale: reducedMotion ? 1 : 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 28 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: reducedMotion ? 0 : dir < 0 ? 48 : -48,
      opacity: 0,
      filter: reducedMotion ? 'none' : 'blur(4px)',
      scale: reducedMotion ? 1 : 0.98,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 28 },
        opacity: { duration: 0.18 },
      },
    }),
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Mode:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-neutral-200/80 dark:bg-neutral-800 text-xs">
            <button
              onClick={() => setTransitionMode('wait')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                transitionMode === 'wait'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Wait (Sequential)
            </button>
            <button
              onClick={() => setTransitionMode('popLayout')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                transitionMode === 'popLayout'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              PopLayout (Cross)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            aria-label="Previous tab"
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-neutral-400 px-1">
            {currentIndex + 1} / {TABS.length}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next tab"
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Showcase Card */}
      <div className="bg-white dark:bg-neutral-900/90 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xl overflow-hidden backdrop-blur-md">
        {/* Navigation Tabs Header */}
        <div className="px-4 pt-3 pb-2 border-b border-neutral-200/80 dark:border-neutral-800/80 flex items-center gap-2 bg-neutral-50/50 dark:bg-neutral-900/50">
          {TABS.map(tab => {
            const Icon = tab.icon
            const isSelected = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors z-10 ${
                  isSelected
                    ? 'text-indigo-600 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-neutral-800 shadow-xs border border-neutral-200/80 dark:border-neutral-700 -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Animated Container Area */}
        <div className="p-6 relative min-h-[300px]">
          <AnimatePresence mode={transitionMode} custom={direction}>
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white text-base">
                      Production Cluster Overview
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Cluster node status and telemetry metrics
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Optimal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60">
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                      <span>Total Throughput</span>
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                    </div>
                    <div className="text-xl font-extrabold text-neutral-900 dark:text-white font-mono">
                      48.2k <span className="text-xs font-normal text-emerald-500">+12%</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">requests / second</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60">
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                      <span>Avg Latency</span>
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div className="text-xl font-extrabold text-neutral-900 dark:text-white font-mono">
                      24.8ms <span className="text-xs font-normal text-emerald-500">-3ms</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">99th percentile</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div className="text-xs">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100">Zero-Downtime Deployment</p>
                      <p className="text-neutral-500 dark:text-neutral-400">Canary revision active across 12 zones</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTabChange('analytics')}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    View charts &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white text-base">
                      Real-Time Animation Performance
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      60fps render consistency and memory allocation
                    </p>
                  </div>
                  <Activity className="w-4 h-4 text-indigo-500 animate-pulse" />
                </div>

                {/* Animated Bars Simulation */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60 space-y-2.5">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Frame Budget (16.6ms target)</span>
                    <span className="font-mono text-emerald-500">11.2ms avg</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '68%' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                    />
                  </div>

                  {/* Micro Bar Chart */}
                  <div className="flex items-end justify-between gap-1.5 h-20 pt-3">
                    {[45, 65, 52, 78, 92, 85, 96, 88, 72, 94].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.4, delay: i * 0.04 }}
                          className="w-full rounded-sm bg-indigo-500/80 hover:bg-indigo-400 transition-colors"
                        />
                        <span className="text-[9px] font-mono text-neutral-400">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-1">
                  <span>GPU rasterization: Active</span>
                  <button
                    onClick={() => handleTabChange('settings')}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Adjust config &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white text-base">
                    Animation & Engine Preferences
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Customize physics parameters and lifecycle events
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-neutral-500" />
                      <div className="text-xs">
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">Hardware Acceleration</p>
                        <p className="text-neutral-400 text-[11px]">Force GPU layer creation for transform & opacity</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-500 font-bold">ENABLED</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-neutral-500" />
                      <div className="text-xs">
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">AnimatePresence onExitComplete</p>
                        <p className="text-neutral-400 text-[11px]">Trigger garbage collection and focus trapping</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-indigo-500 font-bold">READY</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Quick Jump:</span>
                  <button
                    onClick={() => handleTabChange('overview')}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    &larr; Back to Overview
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
