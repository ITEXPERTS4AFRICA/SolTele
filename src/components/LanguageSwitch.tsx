import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import type { Lang } from '../i18n/LanguageContext'
import { useSafeId } from '../lib/useSafeId'

/** Props for the FR | EN language selector. */
export interface LanguageSwitchProps {
  /** Force dark surface styling (e.g. Header over Hero or Footer). */
  onDark?: boolean
  className?: string
}

/**
 * Bilingual FR | EN switch with Lucide Globe icon and a sliding active indicator.
 * Switching updates the entire UI and `<html lang>` immediately without page reload.
 */
export function LanguageSwitch({ onDark = false, className = '' }: LanguageSwitchProps) {
  const { lang, setLang, t } = useTranslation()
  const pillId = useSafeId('lang-pill')
  const langs: Lang[] = ['fr', 'en']

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className={`inline-flex h-9 items-center gap-1 rounded border px-1.5 font-mono text-xs transition-colors duration-300 ${
        onDark
          ? 'border-white/15 bg-white/[0.06] text-white'
          : 'border-fg/15 bg-surface/80 text-fg dark:border-white/15 dark:bg-white/[0.06] dark:text-white'
      } ${className}`}
    >
      <Globe
        className={`ml-1 h-3.5 w-3.5 shrink-0 ${onDark ? 'text-brand-neon' : 'text-accent-strong'}`}
        aria-hidden="true"
      />
      <div className="relative flex items-center">
        {langs.map((code, idx) => {
          const active = lang === code
          return (
            <span key={code} className="inline-flex items-center">
              {idx > 0 && (
                <span className="mx-0.5 select-none opacity-30" aria-hidden="true">
                  |
                </span>
              )}
              <button
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={active}
                className={`relative z-10 rounded-xs px-2 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  active
                    ? 'text-[#041b12]'
                    : onDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-muted hover:text-fg'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={pillId}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className=" -z-10 absolute inset-0 rounded-xs bg-brand-neon shadow-glow-sm"
                  />
                )}
                {code.toUpperCase()}
              </button>
            </span>
          )
        })}
      </div>
    </div>
  )
}

