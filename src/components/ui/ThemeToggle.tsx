import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useTheme } from '../../theme/useTheme'
import { useTranslation } from '../../i18n/useTranslation'

/** Props for the Sun/Moon theme switcher button. */
export interface ThemeToggleProps {
  /** Force dark-surface styling (e.g. inside the Hero header or Footer). */
  onDark?: boolean
  className?: string
}

/**
 * Sun ↔ Moon theme switcher with smooth rotation, subtle green halo,
 * and circular View Transition reveal anchored to the click coordinates.
 */
export function ThemeToggle({ onDark = false, className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    toggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? t.a11y.switchToLight : t.a11y.switchToDark}
      title={isDark ? t.theme.light : t.theme.dark}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded border transition-all duration-300 hover:border-brand-neon/60 hover:shadow-glow-sm ${
        onDark
          ? 'border-white/15 bg-white/[0.06] text-white hover:bg-white/10'
          : 'border-fg/15 bg-surface/80 text-fg hover:bg-surface dark:border-white/15 dark:bg-white/[0.06] dark:text-white'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -65, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 65, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-flex text-brand-neon"
          >
            <Sun className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 65, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -65, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-flex text-brand-deep group-hover:text-brand-green"
          >
            <Moon className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

