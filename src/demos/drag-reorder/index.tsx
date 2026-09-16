import { useState } from 'react'
import { DemoLayout } from '../../components/DemoLayout'
import { DragReorderDemo } from './DragReorderDemo'
import { dragReorderCode } from './snippet'
import { DemoInfo } from '../../types'

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
