import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { GestureSwipeDemo } from './GestureSwipeDemo'
import { gestureSwipeCode } from './snippet'
import { DemoInfo } from '../../types'

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
