import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Check, Copy, Code2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface CodePanelProps {
  code: string
  language?: string
  filename?: string
  title?: string
}

export function CodePanel({
  code,
  language = 'tsx',
  filename = 'AnimationSnippet.tsx',
  title = 'Key Animation Implementation'
}: CodePanelProps) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code', err)
    }
  }

  const customDarkStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '1.25rem 1.5rem',
      fontSize: '0.875rem',
      fontFamily: 'var(--font-mono)',
      lineHeight: '1.7',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'transparent',
      fontFamily: 'var(--font-mono)',
    }
  }

  const customLightStyle = {
    ...oneLight,
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '1.25rem 1.5rem',
      fontSize: '0.875rem',
      fontFamily: 'var(--font-mono)',
      lineHeight: '1.7',
    },
    'code[class*="language-"]': {
      ...oneLight['code[class*="language-"]'],
      background: 'transparent',
      fontFamily: 'var(--font-mono)',
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-400/80 dark:bg-red-500/60 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80 dark:bg-amber-500/60 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80 dark:bg-emerald-500/60 inline-block" />
          </div>
          <Code2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span className="font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            {filename}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 hidden sm:inline">
            — {title}
          </span>
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-200/60 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax Highlighting Container */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? customDarkStyle : customLightStyle}
          showLineNumbers
          lineNumberStyle={{
            minWidth: '2.5rem',
            paddingRight: '1rem',
            color: theme === 'dark' ? '#52525b' : '#a1a1aa',
            fontSize: '0.75rem',
            userSelect: 'none'
          }}
          customStyle={{
            margin: 0,
            background: 'transparent'
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
