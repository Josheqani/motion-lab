export const scrollRevealCode = `import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, type Variants } from 'motion/react'

// Container orchestrating staggered revelation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

// Child item spring reveal variant
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 24,
    },
  },
}

export function ScrollRevealSection({ items, once = false }: { items: any[]; once?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress for animated meter
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30 })

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 origin-left z-50"
      />

      <div ref={containerRef} className="h-[600px] overflow-y-auto space-y-12 p-6">
        {/* Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {items.map(item => (
            <motion.div key={item.id} variants={cardVariants} className="p-6 rounded-2xl bg-neutral-900">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}`
