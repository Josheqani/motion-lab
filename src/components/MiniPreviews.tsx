import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, Heart, GripVertical } from 'lucide-react'

// 1. Page Transitions Mini Preview
export function PageTransitionsMiniPreview({ isHovered }: { isHovered: boolean }) {
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (!isHovered) return
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % 3)
    }, 1200)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="w-full h-36 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl p-3 flex flex-col justify-between overflow-hidden relative">
      <div className="flex gap-1.5 p-1 bg-white/70 dark:bg-neutral-900/70 rounded-lg border border-neutral-200 dark:border-neutral-700/60">
        {['Overview', 'Metrics', 'Logs'].map((label, idx) => (
          <div
            key={label}
            className={`relative flex-1 text-[10px] font-semibold text-center py-1 rounded transition-colors ${
              activeTab === idx ? 'text-indigo-600 dark:text-white' : 'text-neutral-400'
            }`}
          >
            {label}
            {activeTab === idx && (
              <motion.div
                layoutId="mini-tab-pill"
                className="absolute inset-0 bg-white dark:bg-neutral-800 rounded shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="relative h-16 overflow-hidden rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/60 p-2 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="text-center space-y-1 w-full"
          >
            <div className="h-2 w-3/4 mx-auto rounded bg-indigo-500/80" />
            <div className="h-1.5 w-1/2 mx-auto rounded bg-neutral-300 dark:bg-neutral-700" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// 2. Shared Layout Mini Preview
export function SharedLayoutMiniPreview({ isHovered }: { isHovered: boolean }) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      setExpanded(false)
      return
    }
    const interval = setInterval(() => {
      setExpanded(prev => !prev)
    }, 1400)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="w-full h-36 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl p-3 relative flex items-center justify-center overflow-hidden">
      {!expanded ? (
        <div className="grid grid-cols-2 gap-2 w-full max-w-[160px]">
          {[1, 2, 3, 4].map(id => (
            <motion.div
              key={id}
              layoutId={id === 1 ? 'mini-morph-box' : undefined}
              className={`h-12 rounded-lg ${
                id === 1
                  ? 'bg-gradient-to-tr from-indigo-500 to-pink-500 ring-2 ring-indigo-400'
                  : 'bg-neutral-200 dark:bg-neutral-700'
              }`}
            />
          ))}
        </div>
      ) : (
        <motion.div
          layoutId="mini-morph-box"
          className="w-full max-w-[160px] h-28 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-2.5 flex flex-col justify-between text-white shadow-lg"
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span>MODAL</span>
            <Sparkles className="w-3 h-3" />
          </div>
          <div className="space-y-1">
            <div className="h-2 w-3/4 bg-white/80 rounded" />
            <div className="h-1.5 w-1/2 bg-white/50 rounded" />
          </div>
        </motion.div>
      )}
    </div>
  )
}

// 3. Scroll Reveal Mini Preview
export function ScrollRevealMiniPreview({ isHovered }: { isHovered: boolean }) {
  const [revealKey, setRevealKey] = useState(0)

  useEffect(() => {
    if (isHovered) {
      setRevealKey(k => k + 1)
    }
  }, [isHovered])

  return (
    <div className="w-full h-36 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl p-3 flex flex-col justify-between overflow-hidden">
      <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <motion.div
          key={`bar-${revealKey}`}
          initial={{ width: '20%' }}
          animate={{ width: isHovered ? '95%' : '40%' }}
          transition={{ duration: 0.6 }}
          className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
        />
      </div>

      <div className="space-y-1.5">
        {[0, 1, 2].map(idx => (
          <motion.div
            key={`${revealKey}-${idx}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
              delay: idx * 0.12
            }}
            className="h-6 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700/60 px-2 flex items-center justify-between"
          >
            <div className="h-1.5 w-16 bg-indigo-500/70 rounded" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 4. Drag Reorder Mini Preview
export function DragReorderMiniPreview({ isHovered }: { isHovered: boolean }) {
  const [order, setOrder] = useState([1, 2, 3])

  useEffect(() => {
    if (!isHovered) return
    const interval = setInterval(() => {
      setOrder(prev => (prev[0] === 1 ? [2, 1, 3] : [1, 2, 3]))
    }, 1100)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="w-full h-36 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl p-3 flex flex-col justify-center gap-2 overflow-hidden">
      {order.map((id, index) => (
        <motion.div
          key={id}
          layout
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className={`h-7 rounded-lg border px-2 flex items-center justify-between text-[11px] ${
            id === 1 && isHovered
              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
              : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <GripVertical className="w-3 h-3 text-neutral-400" />
            <span className="font-semibold">Task #{id}</span>
          </div>
          <span className="font-mono text-[9px] text-neutral-400">pos {index + 1}</span>
        </motion.div>
      ))}
    </div>
  )
}

// 5. Gesture Swipe Mini Preview
export function GestureSwipeMiniPreview({ isHovered }: { isHovered: boolean }) {
  const [swiped, setSwiped] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      setSwiped(false)
      return
    }
    const interval = setInterval(() => {
      setSwiped(prev => !prev)
    }, 1300)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="w-full h-36 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl p-3 relative flex items-center justify-center overflow-hidden">
      {/* Background card */}
      <div className="w-28 h-24 rounded-xl bg-neutral-300 dark:bg-neutral-700/80 absolute scale-90 translate-y-2 opacity-60" />

      {/* Top card */}
      <motion.div
        animate={
          swiped
            ? { x: 120, rotate: 18, opacity: 0 }
            : { x: 0, rotate: isHovered ? 4 : 0, opacity: 1 }
        }
        transition={{ type: 'spring', stiffness: 320, damping: 25 }}
        className="w-28 h-24 rounded-xl bg-gradient-to-tr from-neutral-800 to-neutral-900 text-white p-2.5 flex flex-col justify-between shadow-xl relative border border-white/15"
      >
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-bold tracking-wider text-neutral-400">PROFILE</span>
          {isHovered && !swiped && (
            <span className="text-[8px] font-bold text-emerald-400 border border-emerald-400/80 rounded px-1 rotate-[-10deg]">
              LIKE
            </span>
          )}
        </div>
        <div className="space-y-1">
          <div className="h-1.5 w-16 bg-white/80 rounded" />
          <div className="h-1 w-10 bg-white/40 rounded" />
        </div>
        <div className="flex justify-end">
          <Heart className="w-3 h-3 text-red-400 fill-red-400" />
        </div>
      </motion.div>
    </div>
  )
}
