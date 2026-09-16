export const sharedLayoutCode = `import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface CardItem {
  id: string
  title: string
  category: string
  imageUrl: string
  author: string
}

export function SharedLayoutDemo({ items }: { items: CardItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const activeItem = items.find(i => i.id === selectedId)

  return (
    <div className="relative">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <motion.div
            key={item.id}
            layoutId={\`card-container-\${item.id}\`}
            onClick={() => setSelectedId(item.id)}
            className="cursor-pointer overflow-hidden rounded-2xl bg-neutral-900"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <motion.img
              layoutId={\`card-image-\${item.id}\`}
              src={item.imageUrl}
              alt={item.title}
              className="w-full aspect-square object-cover"
            />
            <div className="p-3">
              <motion.h4 layoutId={\`card-title-\${item.id}\`} className="font-bold text-sm">
                {item.title}
              </motion.h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal Morph */}
      <AnimatePresence>
        {activeItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                layoutId={\`card-container-\${activeItem.id}\`}
                className="w-full max-w-lg bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <motion.img
                  layoutId={\`card-image-\${activeItem.id}\`}
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-6 space-y-3">
                  <motion.h3 layoutId={\`card-title-\${activeItem.id}\`} className="text-2xl font-bold">
                    {activeItem.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 }}
                    className="text-neutral-400 text-sm"
                  >
                    Smooth layout transitions preserve physical presence across UI states.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}`
