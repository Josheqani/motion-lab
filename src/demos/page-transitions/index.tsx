import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { PageTransitionsDemo } from './PageTransitionsDemo'
import { pageTransitionsDemoInfo } from '../demosData'

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
