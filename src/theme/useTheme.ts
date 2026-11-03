import { createContext, useContext } from 'react'

/** Colour themes. Dark is the signature look; light is the airy daytime variant. */
export type Theme = 'dark' | 'light'

/** Value exposed by the theme context. */
export interface ThemeContextValue {
  theme: Theme
  /** Toggles the theme; `origin` (viewport coords) centres the circular reveal. */
  toggleTheme: (origin?: { x: number; y: number }) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Access the current theme and the toggle function. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
