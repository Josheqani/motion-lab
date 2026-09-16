import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useSpring, type Variants } from 'motion/react'
import {
  Cpu,
  Sparkles,
  Zap,
  Layers,
  Eye,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowDown,
  ArrowUp,
  RotateCcw
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface Feature {
  id: string
  title: string
  subtitle: string
  icon: typeof Cpu
  color: string
}

const FEATURES: Feature[] = [
  {
    id: 'f1',
    title: 'Hardware Acceleration',
    subtitle: 'Transforms & opacity offloaded directly to GPU compositor layers.',
    icon: Cpu,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'f2',
    title: 'Fluid Spring Physics',
    subtitle: 'Adaptive tension & friction formulas replacing rigid cubic-beziers.',
    icon: Zap,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'f3',
    title: 'Dynamic Shared Layouts',
    subtitle: 'FLIP coordinate morphing across disparate React DOM branches.',
    icon: Layers,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'f4',
    title: 'Intersection Awareness',
    subtitle: 'Native IntersectionObserver triggers with fine viewport margins.',
    icon: Eye,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'f5',
    title: 'Zero Frame Jank',
    subtitle: 'Strict 16.6ms frame budgets maintaining a locked 60/120fps.',
    icon: Activity,
    color: 'from-rose-500 to-red-500'
  },
  {
    id: 'f6',
    title: 'Accessible by Default',
    subtitle: 'Automatic compliance with prefers-reduced-motion OS preferences.',
    icon: ShieldCheck,
    color: 'from-cyan-500 to-blue-500'
  }
]

const TIMELINE_STEPS = [
  {
    phase: 'Phase 01',
    title: 'Intersection Detection',
    desc: 'The browser registers an internal observer threshold on the element root margin (-60px).',
    badge: 'Observer Hook'
  },
  {
    phase: 'Phase 02',
    title: 'Variant Dispatching',
    desc: 'Framer Motion triggers the parent container variant, dispatching staggered tokens to children.',
    badge: 'Orchestration'
  },
  {
    phase: 'Phase 03',
    title: 'GPU Composite Tweens',
    desc: 'Each child calculates spring momentum from initial { y: 30, opacity: 0 } to { y: 0, opacity: 1 }.',
    badge: 'Rasterization'
  },
  {
    phase: 'Phase 04',
    title: 'Focus & ARIA Completion',
    desc: 'Layout stabilizes and accessibility attributes announce state transitions without scroll traps.',
    badge: 'Semantic DOM'
  }
]

// Metric card with useInView hook
function TelemetryCard({ label, targetValue, suffix }: { label: string; targetValue: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-40px' })

  return (
    <div
      ref={ref}
      className="p-5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 shadow-sm"
    >
      <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-1 font-mono text-3xl font-extrabold text-neutral-900 dark:text-white">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {isInView ? targetValue : 0}
        </motion.span>
        <span className="text-sm font-sans font-medium text-indigo-500">{suffix}</span>
      </div>
      <div className="mt-3 h-1.5 w-full bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
        />
      </div>
    </div>
  )
}

export function ScrollRevealDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [triggerOnce, setTriggerOnce] = useState<boolean>(false)
  const [staggerInterval, setStaggerInterval] = useState<number>(0.12)
  const { reducedMotion } = useTheme()

  // Container scroll tracking
  const { scrollYProgress } = useScroll({ container: containerRef })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 280, damping: 30 })

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerInterval,
        delayChildren: reducedMotion ? 0 : 0.05,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 32,
      scale: reducedMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 280,
        damping: 24,
      },
    },
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-neutral-600 dark:text-neutral-400">Trigger Mode:</span>
            <button
              onClick={() => setTriggerOnce(!triggerOnce)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                triggerOnce
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {triggerOnce ? 'Trigger Once (Static)' : 'Re-trigger on Scroll (Dynamic)'}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <span>Stagger:</span>
            {[0.08, 0.12, 0.2].map(speed => (
              <button
                key={speed}
                onClick={() => setStaggerInterval(speed)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                  staggerInterval === speed
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {speed}s
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Bottom</span>
          </button>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Viewport Container */}
      <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-950/60 overflow-hidden shadow-2xl">
        {/* Scroll Progress Meter Bar */}
        <div className="sticky top-0 left-0 right-0 z-20 h-1.5 w-full bg-neutral-200/60 dark:bg-neutral-800/80">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
          />
        </div>

        {/* Scroll Viewport */}
        <div
          ref={containerRef}
          className="h-[560px] overflow-y-auto px-4 sm:px-8 py-10 space-y-16 scroll-smooth"
        >
          {/* Section 1: Intro Callout */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scroll down to trigger choreographed entrance</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Staggered Child Reveal
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Each card below enters using spring dynamics sequenced by parent <code className="font-mono text-indigo-600 dark:text-indigo-400">staggerChildren</code>.
            </p>
          </div>

          {/* Section 2: Staggered Features Grid */}
          <motion.div
            key={`stagger-grid-${triggerOnce ? 'once' : 'multi'}-${staggerInterval}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: triggerOnce, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {FEATURES.map(feat => {
              const Icon = feat.icon
              return (
                <motion.div
                  key={feat.id}
                  variants={cardVariants}
                  whileHover={reducedMotion ? {} : { y: -4 }}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        {feat.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In-viewport verified</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Section 3: Architecture Timeline */}
          <div className="space-y-6 pt-4">
            <div className="text-center space-y-1">
              <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                Lifecycle Pipeline
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Directional slide-in as each step crosses the -80px viewport threshold
              </p>
            </div>

            <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900/60 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
              {TIMELINE_STEPS.map((step, idx) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: reducedMotion ? 0 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: triggerOnce, margin: '-60px' }}
                  transition={{
                    type: 'spring' as const,
                    stiffness: 260,
                    damping: 24,
                    delay: idx * 0.08
                  }}
                  className="relative p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs"
                >
                  {/* Timeline node icon */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-5 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center ring-4 ring-white dark:ring-neutral-950 text-[10px] font-bold">
                    {idx + 1}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {step.phase}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {step.badge}
                    </span>
                  </div>

                  <h5 className="font-bold text-neutral-900 dark:text-white text-sm">
                    {step.title}
                  </h5>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 4: Telemetry Metrics with useInView */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Real-time Telemetry
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Triggered using programmatic <code className="font-mono text-indigo-600 dark:text-indigo-400">useInView</code>
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-indigo-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TelemetryCard label="Frames Rendered" targetValue={2400} suffix="fps" />
              <TelemetryCard label="Layout Shifts (CLS)" targetValue={0} suffix="score" />
              <TelemetryCard label="Peak Frame Time" targetValue={16} suffix="ms" />
            </div>
          </div>

          {/* Footer of the scroll container */}
          <div className="text-center py-6 border-t border-neutral-200/80 dark:border-neutral-800 space-y-2">
            <p className="text-xs text-neutral-400">Reached the end of scrollable demonstration stream</p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
