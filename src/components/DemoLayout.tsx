import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Sparkles, BookOpen, RotateCcw, ChevronRight } from 'lucide-react'
import { CodePanel } from './CodePanel'
import { DemoInfo } from '../types'
import { useTheme } from '../context/ThemeContext'

interface DemoLayoutProps {
  demo: DemoInfo
  children: ReactNode
  onReset?: () => void
  nextDemo?: { title: string; route: string }
}

export function DemoLayout({
  demo,
  children,
  onReset,
  nextDemo
}: DemoLayoutProps) {
  const { reducedMotion } = useTheme()
  const githubSourceUrl = `https://github.com/Josheqani/motion-lab/blob/main/${demo.sourceFile}`

  return (
    <div className="min-h-screen pb-20">
      {/* Top Header / Breadcrumbs */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Showcase</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                {demo.category}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {demo.badge}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {demo.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
                {demo.description}
              </p>
            </div>

            <a
              href={githubSourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-sm self-start md:self-auto"
            >
              <span>View source</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>

          {/* Key tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {demo.keyFeatures.map(feat => (
              <span
                key={feat}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Section 1: Live Interactive Demo Area */}
        <section aria-labelledby="live-demo-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 id="live-demo-heading" className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                Live Interactive Demo
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {reducedMotion && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  Reduced motion active
                </span>
              )}

              {onReset && (
                <button
                  onClick={onReset}
                  aria-label="Reset demo state"
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset demo</span>
                </button>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4 sm:p-8 relative min-h-[420px] flex items-center justify-center overflow-hidden shadow-inner">
            {children}
          </div>
        </section>

        {/* Section 2: Technique Explanation */}
        <section
          aria-labelledby="technique-heading"
          className="rounded-2xl p-5 sm:p-6 border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/40 dark:bg-indigo-950/20"
        >
          <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
            <BookOpen className="w-4 h-4" />
            <h3 id="technique-heading">How It Works</h3>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            {demo.techniqueExplanation}
          </p>
        </section>

        {/* Section 3: Code Panel */}
        <section aria-labelledby="code-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 id="code-heading" className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Animation Implementation
            </h3>
            <a
              href={githubSourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>{demo.sourceFile}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <CodePanel
            code={demo.codeSnippet}
            filename={demo.sourceFile.split('/').pop() || 'Snippet.tsx'}
            title={demo.title}
          />
        </section>

        {/* Bottom Pagination / Next Demo */}
        {nextDemo && (
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
            <Link
              to={nextDemo.route}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 font-semibold text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>Next Demo: {nextDemo.title}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
