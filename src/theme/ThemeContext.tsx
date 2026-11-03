import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './useTheme'

export type { Theme, ThemeContextValue } from './useTheme'

const STORAGE_KEY = 'soltele-theme'

/** Stored choice first, then the OS preference, falling back to dark. */
function detectTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

/**
 * Theme provider: system detection, localStorage persistence and a premium
 * transition (circular View Transition reveal, with a colour cross fade fallback).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(detectTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  /* Follow OS changes while the user has not made an explicit choice. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return
      } catch {
        /* ignore */
      }
      setTheme(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      const root = document.documentElement
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const commit = () => {
        applyTheme(next)
        setTheme(next)
      }

      if (reduce) return commit()

      if (typeof document.startViewTransition === 'function') {
        const x = origin?.x ?? window.innerWidth - 40
        const y = origin?.y ?? 40
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
        root.style.setProperty('--vt-x', `${x}px`)
        root.style.setProperty('--vt-y', `${y}px`)
        root.style.setProperty('--vt-r', `${r}px`)
        document.startViewTransition(commit)
        return
      }

      root.classList.add('theme-fade')
      commit()
      window.setTimeout(() => root.classList.remove('theme-fade'), 500)
    },
    [theme],
  )

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
