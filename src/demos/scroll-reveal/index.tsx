import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { ScrollRevealDemo } from './ScrollRevealDemo'
import { scrollRevealDemoInfo } from '../demosData'

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
