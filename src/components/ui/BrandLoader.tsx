import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircuitPagne, SignalRings, SMark } from '../../assets/patterns'
import { logoFull, logoFullDark, logoMark } from '../../assets/images'
import { useTranslation } from '../../i18n/useTranslation'
import { useTheme } from '../../theme/useTheme'
import { siteConfig } from '../../config/site'

/** Props for the startup BrandLoader overlay. */
export interface BrandLoaderProps {
  /** Called once the loader completes. */
  onDone?: () => void
}

/**
 * Signature startup loader featuring the official SolTele logo:
 * adapts to Light mode (white canvas, black text) and Dark mode (deep forest canvas, white text).
 */
export function BrandLoader({ onDone }: BrandLoaderProps) {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 100
      : 0,
  )

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      const id = window.setTimeout(() => {
        setVisible(false)
        onDone?.()
      }, 150)
      return () => window.clearTimeout(id)
    }

    const start = performance.now()
    const duration = 900
    let raf = 0

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - ratio, 3)
      setProgress(Math.round(eased * 100))
      if (ratio < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => {
          setVisible(false)
          onDone?.()
        }, 160)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  const stepIndex = progress < 40 ? 0 : progress < 85 ? 1 : 2
  const currentStep = t.loader.steps[stepIndex] ?? t.loader.steps[0]
  const logoSrc = theme === 'dark' ? logoFullDark || logoFull : logoFull || logoFullDark

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="soltele-loader"
          role="status"
          aria-live="polite"
          aria-label={t.loader.label}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-4%',
            transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white text-fg dark:bg-[#041b12] dark:text-white"
        >
          {/* Subtle Circuit-Pagne background */}
          <CircuitPagne className="text-[#063d2d]/[0.03] dark:text-brand-neon/[0.05]" size={72} />

          {/* Pulsing signal rings around the official SolTele logo */}
          <div className="relative flex h-52 w-72 items-center justify-center">
            <SignalRings
              className="absolute inset-0 h-full w-full text-[#063d2d]/20 dark:text-brand-neon/40"
              rings={3}
              pulses={2}
              emitter={false}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative z-10 flex items-center justify-center px-4"
            >
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={siteConfig.brand.full}
                  width={260}
                  height={120}
                  className="h-24 w-auto object-contain sm:h-28"
                />
              ) : logoMark ? (
                <img src={logoMark} alt="" width={72} height={72} className="h-20 w-20 object-contain" />
              ) : (
                <SMark className="h-20 w-20" draw />
              )}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-64 max-w-[80vw]">
            <div className="flex items-center justify-between font-mono text-[11px] text-muted dark:text-gray-300">
              <span className="truncate pr-2">{currentStep}</span>
              <span className="font-semibold text-[#063d2d] dark:text-brand-neon">{progress}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-xs bg-fg/10 dark:bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#063d2d] via-[#15803d] to-[#22c55e]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
