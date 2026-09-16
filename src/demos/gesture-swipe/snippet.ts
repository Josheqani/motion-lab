export const gestureSwipeCode = `import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence, type PanInfo } from 'motion/react'

export function SwipeCard({ item, onSwipe }: { item: any; onSwipe: (dir: 'left' | 'right') => void }) {
  const x = useMotionValue(0)
  
  // Transform horizontal drag into subtle tilt rotation
  const rotate = useTransform(x, [-200, 200], [-22, 22])
  
  // Dynamic opacity overlays for swipe verdicts
  const likeOpacity = useTransform(x, [20, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1])

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100
    const velocityThreshold = 500

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      onSwipe('right')
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      onSwipe('left')
    }
  }

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 select-none"
    >
      {/* LIKE Stamp overlay */}
      <motion.div style={{ opacity: likeOpacity }} className="absolute top-6 left-6 border-2 border-emerald-400 text-emerald-400 font-bold px-3 py-1 rounded-lg rotate-[-15deg]">
        LIKE
      </motion.div>

      {/* NOPE Stamp overlay */}
      <motion.div style={{ opacity: nopeOpacity }} className="absolute top-6 right-6 border-2 border-rose-500 text-rose-500 font-bold px-3 py-1 rounded-lg rotate-[15deg]">
        NOPE
      </motion.div>

      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover pointer-events-none" />
    </motion.div>
  )
}`
