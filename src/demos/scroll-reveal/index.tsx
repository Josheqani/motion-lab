import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { ScrollRevealDemo } from './ScrollRevealDemo'
import { scrollRevealCode } from './snippet'
import { DemoInfo } from '../../types'

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

export default function ScrollRevealPage() {
  const [resetKey, setResetKey] = useState(0)

  return (
    <DemoLayout
      demo={scrollRevealDemoInfo}
      onReset={() => setResetKey(k => k + 1)}
      nextDemo={{ title: 'Drag-to-Reorder List', route: '/demos/drag-reorder' }}
    >
      <ScrollRevealDemo key={resetKey} />
    </DemoLayout>
  )
}
