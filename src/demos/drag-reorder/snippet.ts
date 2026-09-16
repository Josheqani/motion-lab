export const dragReorderCode = `import { useState } from 'react'
import { Reorder, motion, AnimatePresence } from 'motion/react'
import { GripVertical, Trash2 } from 'lucide-react'

interface TaskItem {
  id: string
  title: string
  priority: 'urgent' | 'high' | 'normal'
}

export function DragReorderList() {
  const [items, setItems] = useState<TaskItem[]>([
    { id: '1', title: 'Refactor motion orchestrator', priority: 'urgent' },
    { id: '2', title: 'Implement FLIP layout transitions', priority: 'high' },
    { id: '3', title: 'Audit reduced-motion accessibility', priority: 'normal' },
  ])

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="space-y-3 w-full max-w-md"
    >
      <AnimatePresence initial={false}>
        {items.map(item => (
          <Reorder.Item
            key={item.id}
            value={item}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileDrag={{
              scale: 1.03,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
              cursor: 'grabbing',
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800"
          >
            <div className="flex items-center gap-3">
              <GripVertical className="cursor-grab text-neutral-500" />
              <span>{item.title}</span>
            </div>
            <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}>
              <Trash2 className="w-4 h-4 text-neutral-500 hover:text-red-400" />
            </button>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  )
}`
