import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { GestureSwipeDemo } from './GestureSwipeDemo'
import { gestureSwipeDemoInfo } from '../demosData'

export default function GestureSwipePage() {
  const [resetKey, setResetKey] = useState(0)

  return (
    <DemoLayout
      demo={gestureSwipeDemoInfo}
      onReset={() => setResetKey(k => k + 1)}
      nextDemo={{ title: 'Page Transitions', route: '/demos/page-transitions' }}
    >
      <GestureSwipeDemo key={resetKey} />
    </DemoLayout>
  )
}
