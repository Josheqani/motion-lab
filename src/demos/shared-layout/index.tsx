import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { SharedLayoutDemo } from './SharedLayoutDemo'
import { sharedLayoutDemoInfo } from '../demosData'

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
