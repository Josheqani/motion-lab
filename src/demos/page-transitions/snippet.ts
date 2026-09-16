export const pageTransitionsCode = `import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Variants supporting dynamic direction (+1 = right to left, -1 = left to right)
const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(4px)',
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    filter: 'blur(4px)',
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
}

export function PageTransitionsDemo() {
  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage(([prev]) => [prev + newDirection, newDirection])
  }

  return (
    <div className="relative overflow-hidden w-full max-w-xl">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          {/* Active view content */}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}`
