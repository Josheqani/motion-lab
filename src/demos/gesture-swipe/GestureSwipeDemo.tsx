import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence, type PanInfo } from 'motion/react'
import {
  Heart,
  X,
  Star,
  RotateCcw,
  MapPin,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Sliders,
  Undo2
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface Profile {
  id: string
  name: string
  role: string
  location: string
  experience: string
  imageUrl: string
  tags: string[]
  bio: string
}

const INITIAL_PROFILES: Profile[] = [
  {
    id: 'p1',
    name: 'Aria Sterling',
    role: 'Staff Motion Designer',
    location: 'Stockholm, Sweden',
    experience: '8 yrs exp',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tags: ['Framer Motion', 'WebGL', 'Physics Engines', 'GSAP'],
    bio: 'Pioneering micro-interactions and tactile physics systems that bridge tactile real-world dynamics with browser canvas.'
  },
  {
    id: 'p2',
    name: 'Devon Vance',
    role: 'Creative Technologist',
    location: 'London, UK',
    experience: '6 yrs exp',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tags: ['Three.js', 'Shader Graph', 'React 19', 'GPU Compositing'],
    bio: 'Crafting spatial audio-visual installations and high-velocity web experiences running at rock-solid 120fps.'
  },
  {
    id: 'p3',
    name: 'Mira Tanaka',
    role: 'Principal Design Engineer',
    location: 'Kyoto, Japan',
    experience: '10 yrs exp',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    tags: ['Design Systems', 'Figma Tokens', 'Fluid Typography', 'Accessibility'],
    bio: 'Specializing in enterprise design systems where kinetic brand expression and strict WCAG 2.2 accessibility coexist.'
  },
  {
    id: 'p4',
    name: 'Julian O’Connor',
    role: '3D Interaction Specialist',
    location: 'Berlin, Germany',
    experience: '5 yrs exp',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    tags: ['WebGPU', 'Spline', 'Interactive Shaders', 'Gesture Math'],
    bio: 'Merging gestural kinematics with programmable fragment shaders for bleeding-edge consumer product launches.'
  },
  {
    id: 'p5',
    name: 'Soraya Chen',
    role: 'Kinetic Typography Architect',
    location: 'San Francisco, CA',
    experience: '7 yrs exp',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    tags: ['Variable Fonts', 'Spring Curves', 'SVG Paths', 'Interactive Storytelling'],
    bio: 'Creating expressive responsive typography that flexes, breathes, and reacts fluidly to user scroll and touch velocities.'
  }
]

// Single Interactive Card Component
function TinderCard({
  profile,
  isTop,
  onSwipe,
  reducedMotion
}: {
  profile: Profile
  isTop: boolean
  onSwipe: (dir: 'left' | 'right' | 'up') => void
  reducedMotion: boolean
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Rotate based on X displacement
  const rotate = useTransform(x, [-260, 260], [-24, 24])

  // Stamp opacities
  const likeOpacity = useTransform(x, [20, 110], [0, 1])
  const nopeOpacity = useTransform(x, [-20, -110], [0, 1])
  const superlikeOpacity = useTransform(y, [-30, -120], [0, 1])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xThreshold = 100
    const yThreshold = 100
    const velocityThreshold = 400

    if (info.offset.y < -yThreshold || info.velocity.y < -velocityThreshold) {
      onSwipe('up')
    } else if (info.offset.x > xThreshold || info.velocity.x > velocityThreshold) {
      onSwipe('right')
    } else if (info.offset.x < -xThreshold || info.velocity.x < -velocityThreshold) {
      onSwipe('left')
    }
  }

  return (
    <motion.div
      style={isTop && !reducedMotion ? { x, y, rotate } : undefined}
      drag={isTop && !reducedMotion ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
      className={`absolute inset-0 rounded-3xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 bg-neutral-900 text-white shadow-2xl select-none ${
        isTop ? 'cursor-grab' : 'pointer-events-none'
      }`}
    >
      {/* Profile Background Image */}
      <img
        src={profile.imageUrl}
        alt={profile.name}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Gradient vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

      {/* LIKE Stamp indicator */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-6 left-6 border-3 border-emerald-400 text-emerald-400 bg-neutral-950/60 backdrop-blur-md font-extrabold text-sm sm:text-base px-3 py-1 rounded-xl rotate-[-16deg] pointer-events-none tracking-wider shadow-lg"
      >
        LIKE
      </motion.div>

      {/* NOPE Stamp indicator */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-6 right-6 border-3 border-rose-500 text-rose-500 bg-neutral-950/60 backdrop-blur-md font-extrabold text-sm sm:text-base px-3 py-1 rounded-xl rotate-[16deg] pointer-events-none tracking-wider shadow-lg"
      >
        NOPE
      </motion.div>

      {/* SUPERLIKE Stamp indicator */}
      <motion.div
        style={{ opacity: superlikeOpacity }}
        className="absolute top-6 left-1/2 -translate-x-1/2 border-3 border-blue-400 text-blue-400 bg-neutral-950/60 backdrop-blur-md font-extrabold text-sm sm:text-base px-3 py-1 rounded-xl pointer-events-none tracking-wider shadow-lg"
      >
        SUPERLIKE
      </motion.div>

      {/* Profile Card Footer Information */}
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 space-y-3 pointer-events-none">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{profile.name}</span>
              <CheckCircle2 className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
            </h3>
            <p className="text-sm font-medium text-neutral-300 flex items-center gap-1.5 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>{profile.role}</span>
            </p>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white">
            {profile.experience}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-neutral-400 flex items-center gap-1 mr-1">
            <MapPin className="w-3 h-3 text-red-400" />
            <span>{profile.location}</span>
          </span>
          {profile.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-800/80 text-neutral-300 border border-white/10 backdrop-blur-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function GestureSwipeDemo() {
  const [deck, setDeck] = useState<Profile[]>(INITIAL_PROFILES)
  const [history, setHistory] = useState<{ profile: Profile; action: 'left' | 'right' | 'up' }[]>([])
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up' | null>(null)
  const { reducedMotion } = useTheme()

  const activeProfile = deck[0]

  const handleSwipe = (dir: 'left' | 'right' | 'up') => {
    if (!activeProfile) return

    setExitDirection(dir)
    setHistory(prev => [{ profile: activeProfile, action: dir }, ...prev])

    setTimeout(() => {
      setDeck(prev => prev.slice(1))
      setExitDirection(null)
    }, 180)
  }

  const handleUndo = () => {
    if (history.length === 0) return
    const lastItem = history[0]
    if (lastItem) {
      setDeck(prev => [lastItem.profile, ...prev])
      setHistory(prev => prev.slice(1))
    }
  }

  const handleReset = () => {
    setDeck(INITIAL_PROFILES)
    setHistory([])
    setExitDirection(null)
  }

  // Count stats
  const likesCount = history.filter(h => h.action === 'right').length
  const nopesCount = history.filter(h => h.action === 'left').length
  const superlikesCount = history.filter(h => h.action === 'up').length

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center space-y-5">
      {/* Top Deck Status Bar */}
      <div className="w-full flex items-center justify-between text-xs px-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Remaining: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{deck.length}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="text-emerald-500 font-bold">+{likesCount}</span>
          <span className="text-rose-500 font-bold">-{nopesCount}</span>
          <span className="text-blue-500 font-bold">★{superlikesCount}</span>
        </div>
      </div>

      {/* Main Card Stack Stage */}
      <div className="relative w-full aspect-[3/4] max-h-[500px]">
        <AnimatePresence>
          {deck.length > 0 ? (
            deck
              .slice(0, 3)
              .reverse()
              .map((profile, i, arr) => {
                const isTop = i === arr.length - 1
                const indexFromTop = arr.length - 1 - i

                // Background stack depth offsets
                const scale = 1 - indexFromTop * 0.05
                const yOffset = indexFromTop * 14
                const opacity = 1 - indexFromTop * 0.18

                // Exit physics for top card
                const exitX =
                  exitDirection === 'right' ? 450 : exitDirection === 'left' ? -450 : 0
                const exitY = exitDirection === 'up' ? -400 : 0
                const exitRotate =
                  exitDirection === 'right' ? 25 : exitDirection === 'left' ? -25 : 0

                return (
                  <motion.div
                    key={profile.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{
                      scale,
                      y: yOffset,
                      opacity,
                      transition: { type: 'spring', stiffness: 350, damping: 28 }
                    }}
                    exit={{
                      x: reducedMotion ? 0 : exitX,
                      y: reducedMotion ? 0 : exitY,
                      rotate: reducedMotion ? 0 : exitRotate,
                      opacity: 0,
                      transition: { duration: 0.22 }
                    }}
                    className="absolute inset-0"
                    style={{ zIndex: i }}
                  >
                    <TinderCard
                      profile={profile}
                      isTop={isTop}
                      onSwipe={handleSwipe}
                      reducedMotion={reducedMotion}
                    />
                  </motion.div>
                )
              })
          ) : (
            /* Empty Deck State */
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl"
            >
              <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-neutral-900 dark:text-white">
                  Deck Review Completed!
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-[220px]">
                  You have reviewed all candidate profiles in this stack.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 w-full text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Liked candidates:</span>
                  <span className="font-mono font-bold text-emerald-500">{likesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Passed profiles:</span>
                  <span className="font-mono font-bold text-rose-500">{nopesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Superlikes:</span>
                  <span className="font-mono font-bold text-blue-500">{superlikesCount}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Stack</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex items-center justify-center gap-3 pt-2">
        {/* Undo Button */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handleUndo}
          disabled={history.length === 0}
          aria-label="Undo last swipe"
          className="w-11 h-11 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-amber-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
        >
          <Undo2 className="w-4 h-4" />
        </motion.button>

        {/* Nope Button */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => handleSwipe('left')}
          disabled={deck.length === 0}
          aria-label="Dislike / Pass profile"
          className="w-13 h-13 rounded-full border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-neutral-800 text-rose-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Superlike Button */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => handleSwipe('up')}
          disabled={deck.length === 0}
          aria-label="Superlike profile"
          className="w-11 h-11 rounded-full border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-neutral-800 text-blue-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
        >
          <Star className="w-5 h-5" />
        </motion.button>

        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => handleSwipe('right')}
          disabled={deck.length === 0}
          aria-label="Like profile"
          className="w-13 h-13 rounded-full border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-neutral-800 text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
        >
          <Heart className="w-6 h-6 fill-current" />
        </motion.button>
      </div>

      <p className="text-[11px] text-neutral-400 text-center flex items-center gap-1">
        <Sliders className="w-3 h-3" />
        <span>Drag left, right, or up — or use circular action triggers</span>
      </p>
    </div>
  )
}
