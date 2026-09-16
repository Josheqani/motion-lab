import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { PageTransitionsDemo } from './PageTransitionsDemo'
import { pageTransitionsCode } from './snippet'
import { DemoInfo } from '../../types'

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

export default function PageTransitionsPage() {
  const [resetKey, setResetKey] = useState(0)

  return (
    <DemoLayout
      demo={pageTransitionsDemoInfo}
      onReset={() => setResetKey(k => k + 1)}
      nextDemo={{ title: 'Shared Layout Animation', route: '/demos/shared-layout' }}
    >
      <PageTransitionsDemo key={resetKey} />
    </DemoLayout>
  )
}
