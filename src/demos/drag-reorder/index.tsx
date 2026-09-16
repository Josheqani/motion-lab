import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { DragReorderDemo } from './DragReorderDemo'
import { dragReorderDemoInfo } from '../demosData'

export default function DragReorderPage() {
  const [resetKey, setResetKey] = useState(0)

  return (
    <DemoLayout
      demo={dragReorderDemoInfo}
      onReset={() => setResetKey(k => k + 1)}
      nextDemo={{ title: 'Gesture Swipe Cards', route: '/demos/gesture-swipe' }}
    >
      <DragReorderDemo key={resetKey} />
    </DemoLayout>
  )
}
