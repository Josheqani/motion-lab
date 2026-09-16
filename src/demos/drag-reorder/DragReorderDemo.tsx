import { useState } from 'react'
import { Reorder, AnimatePresence, motion } from 'motion/react'
import {
  GripVertical,
  Plus,
  Trash2,
  CheckCircle,
  Circle,
  Sparkles,
  RotateCcw,
  Code,
  Tag,
  AlertCircle
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export interface BacklogTask {
  id: string
  title: string
  category: 'Core Engine' | 'Animations' | 'Accessibility' | 'Performance'
  priority: 'Urgent' | 'High' | 'Medium' | 'Low'
  points: number
  completed: boolean
  assignee: {
    name: string
    avatar: string
  }
}

const INITIAL_TASKS: BacklogTask[] = [
  {
    id: 'task-1',
    title: 'Profile 120fps gesture spring dampening formulas',
    category: 'Performance',
    priority: 'Urgent',
    points: 5,
    completed: false,
    assignee: {
      name: 'Alex Rivers',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'task-2',
    title: 'Calibrate FLIP layoutId geometry delta calculations',
    category: 'Core Engine',
    priority: 'High',
    points: 8,
    completed: false,
    assignee: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'task-3',
    title: 'Audit WCAG 2.2 prefers-reduced-motion fallback paths',
    category: 'Accessibility',
    priority: 'High',
    points: 3,
    completed: true,
    assignee: {
      name: 'Kenji Sato',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'task-4',
    title: 'Implement directional velocity handoff on drag release',
    category: 'Animations',
    priority: 'Medium',
    points: 5,
    completed: false,
    assignee: {
      name: 'Maya Chen',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'task-5',
    title: 'Synthesize micro-interaction sound effect triggers',
    category: 'Animations',
    priority: 'Low',
    points: 2,
    completed: false,
    assignee: {
      name: 'Lucas Morel',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80'
    }
  }
]

const PRIORITY_STYLES: Record<BacklogTask['priority'], string> = {
  Urgent: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900',
  High: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900',
  Medium: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900',
  Low: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
}

export function DragReorderDemo() {
  const [tasks, setTasks] = useState<BacklogTask[]>(INITIAL_TASKS)
  const [showJson, setShowJson] = useState<boolean>(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<BacklogTask['priority']>('High')
  const { reducedMotion } = useTheme()

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask: BacklogTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: 'Core Engine',
      priority: newTaskPriority,
      points: 3,
      completed: false,
      assignee: {
        name: 'You (Developer)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      }
    }

    setTasks(prev => [newTask, ...prev])
    setNewTaskTitle('')
  }

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const toggleTaskCompleted = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const resetTasks = () => {
    setTasks(INITIAL_TASKS)
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-5">
      {/* Controls / Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Drag handle to reorder
          </span>
          <span className="text-[11px] font-mono text-neutral-400">({tasks.length} items)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJson(!showJson)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
              showJson
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>State Inspector</span>
          </button>

          <button
            onClick={resetTasks}
            title="Reset to default order"
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Order Array Inspector (Collapsible) */}
      <AnimatePresence>
        {showJson && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-2xl bg-neutral-900 text-neutral-200 font-mono text-xs border border-neutral-800 shadow-md">
              <p className="text-neutral-400 font-bold mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
                Live Reorder.Group internal values array:
              </p>
              <pre className="text-emerald-400 overflow-x-auto">
                {JSON.stringify(tasks.map((t, idx) => ({ order: idx + 1, id: t.id, title: t.title })), null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline Add Task Bar */}
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          placeholder="Add new task to the queue..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
        />

        <select
          value={newTaskPriority}
          onChange={e => setNewTaskPriority(e.target.value as BacklogTask['priority'])}
          className="px-3 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
        >
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          type="submit"
          disabled={!newTaskTitle.trim()}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </form>

      {/* Reorder Group Container */}
      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={setTasks}
        className="space-y-2.5 w-full select-none"
      >
        <AnimatePresence initial={false}>
          {tasks.map(task => (
            <Reorder.Item
              key={task.id}
              value={task}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
              whileDrag={{
                scale: reducedMotion ? 1 : 1.03,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
                cursor: 'grabbing',
                zIndex: 50,
              }}
              transition={{
                type: 'spring' as const,
                stiffness: 420,
                damping: 32,
              }}
              className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-700 transition-colors"
            >
              {/* Left Drag Handle & Content */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  aria-label="Drag handle"
                  className="p-1.5 rounded-lg text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-grab active:cursor-grabbing transition-colors"
                >
                  <GripVertical className="w-4 h-4" />
                </div>

                <button
                  onClick={() => toggleTaskCompleted(task.id)}
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                  className="text-neutral-400 hover:text-emerald-500 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs sm:text-sm font-semibold truncate transition-all ${
                      task.completed
                        ? 'line-through text-neutral-400 dark:text-neutral-500'
                        : 'text-neutral-900 dark:text-white'
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[task.priority]}`}>
                      {task.priority}
                    </span>

                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5 text-neutral-400" />
                      {task.category}
                    </span>

                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                      {task.points} pts
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Assignee & Delete Action */}
              <div className="flex items-center gap-2.5 ml-2 shrink-0">
                <img
                  src={task.assignee.avatar}
                  alt={task.assignee.name}
                  title={task.assignee.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-neutral-300 dark:ring-neutral-700 hidden sm:inline-block"
                />

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label="Delete task"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}
