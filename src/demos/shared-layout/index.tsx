import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { SharedLayoutDemo } from './SharedLayoutDemo'
import { sharedLayoutCode } from './snippet'
import { DemoInfo } from '../../types'

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

export default function SharedLayoutPage() {
  const [resetKey, setResetKey] = useState(0)

  return (
    <DemoLayout
      demo={sharedLayoutDemoInfo}
      onReset={() => setResetKey(k => k + 1)}
      nextDemo={{ title: 'Scroll-Triggered Reveal', route: '/demos/scroll-reveal' }}
    >
      <SharedLayoutDemo key={resetKey} />
    </DemoLayout>
  )
}
