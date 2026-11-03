import { useEffect, useRef, useState } from 'react'
import { siteConfig, type StatConfig } from '../config/site'
import { useInView } from '../hooks/useInView'
import { useTranslation } from '../i18n/useTranslation'

/** Single animated counter item. */
function StatCounter({ stat, label }: { stat: StatConfig; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { threshold: 0.25 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || typeof stat.value !== 'number') return
    const target = stat.value
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    const start = performance.now()
    const duration = reduce ? 1 : 1350

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, stat.value])

  const formatted =
    stat.display ?? `${stat.prefix ?? ''}${count}${stat.suffix ?? ''}`

  return (
    <div
      ref={ref}
      className="group relative flex flex-col justify-between rounded border border-fg/10 bg-[#f7faf8]/90 px-4 py-3.5 transition-colors duration-300 hover:border-brand-green/50 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-neon/45 dark:hover:bg-white/[0.06]"
    >
      <div className="flex items-baseline gap-1 font-mono text-2xl font-bold tracking-tight text-[#063d2d] dark:text-brand-neon sm:text-3xl">
        <span>{formatted}</span>
      </div>
      <span className="mt-1 text-xs font-medium text-muted dark:text-gray-300 sm:text-[13px]">
        {label}
      </span>
    </div>
  )
}

/**
 * Animated 3-metric band displayed in the Hero section.
 * Values are centralized in `src/config/site.ts`.
 */
export function Stats() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {siteConfig.stats.map((stat) => (
        <StatCounter key={stat.id} stat={stat} label={t.stats[stat.id]} />
      ))}
    </div>
  )
}
