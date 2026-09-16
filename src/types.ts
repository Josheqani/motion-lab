export interface DemoInfo {
  id: string
  title: string
  route: string
  category: 'Transitions' | 'Layout' | 'Scroll' | 'Gestures'
  badge: string
  description: string
  shortDescription: string
  techniqueExplanation: string
  sourceFile: string
  keyFeatures: string[]
  codeSnippet: string
}
