import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  Heart,
  Share2,
  Bookmark,
  MapPin,
  Camera,
  Calendar,
  Maximize2
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface GalleryItem {
  id: string
  title: string
  tag: string
  location: string
  camera: string
  date: string
  likes: number
  imageUrl: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  description: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'nordic-aurora',
    title: 'Arctic Aurora Borealis',
    tag: 'Landscape',
    location: 'Tromsø, Norway',
    camera: 'Sony A7R V • 24mm f/1.4',
    date: 'Oct 2025',
    likes: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80',
    author: {
      name: 'Freja Lindqvist',
      handle: '@freja_lens',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    description: 'Captured during a sudden geomagnetic storm above the Arctic fjords. The emerald ribbon expanded over 45 minutes with crisp clarity against freezing crystalline skies.'
  },
  {
    id: 'cyber-neo-tokyo',
    title: 'Rainy Neon Shinjuku',
    tag: 'Street',
    location: 'Tokyo, Japan',
    camera: 'Fujifilm X-T5 • 35mm f/2.0',
    date: 'Nov 2025',
    likes: 2840,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
    author: {
      name: 'Kenji Sato',
      handle: '@kenji_shinjuku',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    description: 'Asphalt reflections soaked in vibrant cyberpunk hues. The neon signage creates dynamic light pools amidst pedestrian umbrellas at midnight in Kabukicho.'
  },
  {
    id: 'minimal-brutalist',
    title: 'Brutalist Concrete Curve',
    tag: 'Architecture',
    location: 'Valencia, Spain',
    camera: 'Leica Q3 • 28mm f/1.7',
    date: 'Dec 2025',
    likes: 932,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    author: {
      name: 'Elena Rostova',
      handle: '@elena_arch',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    description: 'Geometry and shadow interacting along sweeping poured concrete curves. The natural Mediterranean sun generates precise volumetric contrasts across raw plaster surfaces.'
  },
  {
    id: 'desert-dune-mist',
    title: 'Whispering Dune Ridges',
    tag: 'Aerial',
    location: 'Namib Desert, Namibia',
    camera: 'DJI Mavic 3 Pro • Hasselblad',
    date: 'Jan 2026',
    likes: 1890,
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    author: {
      name: 'Tariq Mansoor',
      handle: '@tariq_aerial',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    description: 'Morning marine fog rolling inland from the Atlantic across the towering red dunes of Sossusvlei, producing sharp ridges of knife-edge chiaroscuro.'
  },
  {
    id: 'analog-coffee-still',
    title: 'Morning Brew Ritual',
    tag: 'Editorial',
    location: 'Kyoto, Japan',
    camera: 'Hasselblad 500C/M • 80mm f/2.8',
    date: 'Feb 2026',
    likes: 760,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    author: {
      name: 'Maya Chen',
      handle: '@maya_rituals',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    description: 'Slow pour-over extraction caught with warm ambient directional beam. Tactile ceramic glaze and roasted bean steam captured on Kodak Portra 400 analog stock.'
  },
  {
    id: 'alpine-granite-peak',
    title: 'The Granite Needle',
    tag: 'Adventure',
    location: 'Chamonix, France',
    camera: 'Nikon Z8 • 70-200mm f/2.8',
    date: 'Feb 2026',
    likes: 2150,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    author: {
      name: 'Lucas Morel',
      handle: '@lucas_alps',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    },
    description: 'Golden hour cresting the Aiguille du Midi. First snow clinging to vertiginous fissures in 3,800m granite pillars while valley clouds pool below.'
  }
]

export function SharedLayoutDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})
  const { reducedMotion } = useTheme()

  const selectedItem = GALLERY_ITEMS.find(item => item.id === selectedId)

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Spring configuration for layout morphing
  const springTransition = reducedMotion
    ? { duration: 0.15 }
    : { type: 'spring' as const, stiffness: 360, damping: 32 }

  return (
    <div className="w-full max-w-4xl mx-auto py-2">
      {/* Informative Hint Banner */}
      <div className="mb-5 flex items-center justify-between px-1">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Click any thumbnail to experience seamless <code className="text-indigo-600 dark:text-indigo-400 font-mono">layoutId</code> container morphing:
        </p>
        <span className="text-[11px] font-mono text-neutral-400">
          {GALLERY_ITEMS.length} gallery items
        </span>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GALLERY_ITEMS.map(item => {
          const isLiked = !!likedMap[item.id]

          return (
            <motion.article
              key={item.id}
              layoutId={reducedMotion ? undefined : `card-box-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              transition={springTransition}
              whileHover={reducedMotion ? {} : { y: -4 }}
              className="group cursor-pointer rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs hover:shadow-xl dark:hover:shadow-neutral-950/50 transition-shadow flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <motion.img
                  layoutId={reducedMotion ? undefined : `card-img-${item.id}`}
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  transition={springTransition}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-neutral-900/70 text-white backdrop-blur-md border border-white/10 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-1.5 rounded-full bg-neutral-900/70 text-white backdrop-blur-md flex items-center justify-center">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <motion.h4
                    layoutId={reducedMotion ? undefined : `card-title-${item.id}`}
                    transition={springTransition}
                    className="font-bold text-neutral-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1"
                  >
                    {item.title}
                  </motion.h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.author.avatar}
                      alt={item.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                      {item.author.name}
                    </span>
                  </div>

                  <button
                    onClick={(e) => toggleLike(item.id, e)}
                    aria-label={`Like ${item.title}`}
                    className="flex items-center gap-1 text-xs text-neutral-500 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="font-mono text-[11px]">{item.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Expanded Modal Morph Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-neutral-950/70 backdrop-blur-md cursor-pointer"
            />

            {/* Morphing Modal Surface */}
            <motion.div
              layoutId={reducedMotion ? undefined : `card-box-${selectedItem.id}`}
              transition={springTransition}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-y-auto z-10 flex flex-col"
            >
              {/* Modal Hero Image */}
              <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden shrink-0">
                <motion.img
                  layoutId={reducedMotion ? undefined : `card-img-${selectedItem.id}`}
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  transition={springTransition}
                  className="w-full h-full object-cover"
                />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedId(null)}
                  aria-label="Close modal (Esc)"
                  className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/70 text-white hover:bg-neutral-950 transition-colors backdrop-blur-md border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-neutral-900/80 text-white backdrop-blur-md border border-white/15">
                    {selectedItem.tag}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Author & Action Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.08 }}
                  className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedItem.author.avatar}
                      alt={selectedItem.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                    />
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
                        {selectedItem.author.name}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {selectedItem.author.handle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLike(selectedItem.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                        likedMap[selectedItem.id]
                          ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedMap[selectedItem.id] ? 'fill-red-500' : ''}`} />
                      <span>{selectedItem.likes + (likedMap[selectedItem.id] ? 1 : 0)}</span>
                    </button>

                    <button
                      aria-label="Bookmark item"
                      className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <button
                      aria-label="Share item"
                      className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>

                {/* Title & Story */}
                <div className="space-y-2">
                  <motion.h3
                    layoutId={reducedMotion ? undefined : `card-title-${selectedItem.id}`}
                    transition={springTransition}
                    className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white"
                  >
                    {selectedItem.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.12 }}
                    className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed"
                  >
                    {selectedItem.description}
                  </motion.p>
                </div>

                {/* Technical Specs Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.16 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Camera className="w-4 h-4 text-indigo-500" />
                    <div>
                      <p className="text-neutral-400 text-[10px] uppercase font-bold">Equipment</p>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">{selectedItem.camera}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <div>
                      <p className="text-neutral-400 text-[10px] uppercase font-bold">Coordinates</p>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">{selectedItem.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="text-neutral-400 text-[10px] uppercase font-bold">Captured</p>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">{selectedItem.date}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
