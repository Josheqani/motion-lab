import { DemoInfo } from '../types'
import { pageTransitionsCode } from './page-transitions/snippet'
import { sharedLayoutCode } from './shared-layout/snippet'
import { scrollRevealCode } from './scroll-reveal/snippet'
import { dragReorderCode } from './drag-reorder/snippet'
import { gestureSwipeCode } from './gesture-swipe/snippet'

export const pageTransitionsDemoInfo: DemoInfo = {
  id: 'page-transitions',
  title: 'Directional Page Transitions',
  route: '/demos/page-transitions',
  category: 'Transitions',
  badge: 'AnimatePresence',
  shortDescription: 'Multi-route directional slide + fade animations using AnimatePresence.',
  description: 'Production-grade view transitions combining directional spring translation, synchronized opacity fades, and blur softening.',
  techniqueExplanation: 'This pattern leverages Framer Motion’s AnimatePresence paired with custom direction parameters. When transitioning between views, the coordinate delta determines whether the incoming surface enters from the right (+48px) or left (-48px) while smoothly dismissing the outgoing view. When reduced motion is preferred, spatial translation is bypassed in favor of clean alpha cross-fades to ensure zero vertigo.',
  sourceFile: 'src/demos/page-transitions/PageTransitionsDemo.tsx',
  keyFeatures: [
    'AnimatePresence custom direction props',
    'Bidirectional spring translation',
    'Blur + alpha cross-fade',
    'Interactive mode toggle (wait vs popLayout)',
    'Accessibility reduced-motion compliance'
  ],
  codeSnippet: pageTransitionsCode,
}

export const sharedLayoutDemoInfo: DemoInfo = {
  id: 'shared-layout',
  title: 'Shared Layout Grid to Modal',
  route: '/demos/shared-layout',
  category: 'Layout',
  badge: 'layoutId',
  shortDescription: 'Instagram-style photo grid morphing seamlessly into full modal views with layoutId.',
  description: 'Seamlessly morph thumbnail cards into a rich modal view and back again using Framer Motion layoutId synchronizations.',
  techniqueExplanation: 'By assigning matching layoutId attributes across different components in the React tree, Framer Motion automatically calculates the geometry delta between thumbnail and modal states using the FLIP (First, Last, Invert, Play) technique. Nested motion elements like images and headings simultaneously morph their dimensions and positioning with zero layout jump or manual coordinate math.',
  sourceFile: 'src/demos/shared-layout/SharedLayoutDemo.tsx',
  keyFeatures: [
    'Matching layoutId across different DOM hierarchies',
    'GPU-accelerated FLIP bounding rect calculation',
    'Coordinated image, title, and container morphing',
    'Backdrop blur fade with AnimatePresence',
    'Escape key & backdrop dismissal back to grid cell'
  ],
  codeSnippet: sharedLayoutCode,
}

export const scrollRevealDemoInfo: DemoInfo = {
  id: 'scroll-reveal',
  title: 'Scroll-Triggered Reveal',
  route: '/demos/scroll-reveal',
  category: 'Scroll',
  badge: 'whileInView & useInView',
  shortDescription: 'Orchestrated scroll entrance effects using whileInView and staggerChildren.',
  description: 'Choreograph elements entering the viewport using staggered spring variants, scroll progress meters, and programmatic useInView detection.',
  techniqueExplanation: 'This pattern orchestrates entrance choreographies using Framer Motion’s whileInView and staggerChildren variants. As elements cross negative viewport root margins (-60px), children cascade into view with spring momentum. Concurrently, useScroll and useSpring provide a continuous top scroll indicator, while useInView triggers statistical counters once their bounding boxes enter the visible viewport.',
  sourceFile: 'src/demos/scroll-reveal/ScrollRevealDemo.tsx',
  keyFeatures: [
    'whileInView with negative root margins (-60px)',
    'Orchestrated staggerChildren & delayChildren cascade',
    'useScroll & useSpring top meter synchronization',
    'Programmatic useInView for performance metrics',
    'Interactive dynamic re-triggering vs once toggle'
  ],
  codeSnippet: scrollRevealCode,
}

export const dragReorderDemoInfo: DemoInfo = {
  id: 'drag-reorder',
  title: 'Drag-to-Reorder List',
  route: '/demos/drag-reorder',
  category: 'Gestures',
  badge: 'Reorder.Group',
  shortDescription: 'Fluid drag-and-drop list reordering with elevation lift and layout settling.',
  description: 'Interactive list reordering utilizing Framer Motion Reorder primitives with vertical constraints, drag elevations, and spring settling.',
  techniqueExplanation: 'Framer Motion’s Reorder.Group and Reorder.Item primitives orchestrate continuous reordering by tracking bounding-box intersections along the Y axis. Neighboring items execute automatic FLIP displacements to create space for the held card. Upon touch or mouse release, the selected item snaps gracefully into place with spring kinematics while updating the underlying data array.',
  sourceFile: 'src/demos/drag-reorder/DragReorderDemo.tsx',
  keyFeatures: [
    'Reorder.Group & Reorder.Item primitives',
    'Axis-constrained Y dragging',
    'whileDrag elevation, scale, and cursor handling',
    'Automatic FLIP displacement of neighboring items',
    'State synchronization and item deletion with AnimatePresence'
  ],
  codeSnippet: dragReorderCode,
}

export const gestureSwipeDemoInfo: DemoInfo = {
  id: 'gesture-swipe',
  title: 'Gesture Swipe Cards',
  route: '/demos/gesture-swipe',
  category: 'Gestures',
  badge: 'drag="x" & onDragEnd',
  shortDescription: 'Tinder-style card stack with rotational torque, dynamic stamps, and velocity-based card ejection.',
  description: 'Physical gesture-driven card deck utilizing continuous motion value transforms, rotational tilt, dynamic stamp reveals, and velocity ejection.',
  techniqueExplanation: 'This pattern binds pointer drags to Framer Motion’s useMotionValue. The horizontal delta dynamically maps via useTransform to rotational tilt (-24° to +24°) and stamp opacity curves (LIKE / NOPE / SUPERLIKE). Upon release, onDragEnd evaluates whether either displacement distance or exit velocity exceeded dismissal thresholds. When ejected, background cards animate forward with spring physics to occupy the top of the stack.',
  sourceFile: 'src/demos/gesture-swipe/GestureSwipeDemo.tsx',
  keyFeatures: [
    'Continuous useMotionValue drag tracking',
    'useTransform for rotational torque & verdict stamps',
    'Velocity and distance threshold detection in onDragEnd',
    'Background stack depth interpolation (scale, Y offset, opacity)',
    'Full undo/rewind stack history with accessible button fallbacks'
  ],
  codeSnippet: gestureSwipeCode,
}

export const ALL_DEMOS: DemoInfo[] = [
  pageTransitionsDemoInfo,
  sharedLayoutDemoInfo,
  scrollRevealDemoInfo,
  dragReorderDemoInfo,
  gestureSwipeDemoInfo,
]
