import { motion } from 'framer-motion'
import { useSafeId } from '../../lib/useSafeId'

/** Props of the vector S monogram. */
export interface SMarkProps {
  className?: string
  /** Animate the strokes drawing in (loader). */
  draw?: boolean
  /** Single colour rendering (watermarks): uses currentColor instead of the logo gradients. */
  mono?: boolean
}

/**
 * Vector reinterpretation of the SolTele monogram: a ring sliced along the
 * logo diagonal (dark half / neon half) holding the S. Used for watermarks,
 * the loader and decorative accents.
 */
export function SMark({ className, draw = false, mono = false }: SMarkProps) {
  const id = useSafeId('smark')
  const ring = mono ? 'currentColor' : `url(#${id}-ring)`
  const s = mono ? 'currentColor' : `url(#${id}-s)`
  const drawProps = draw
    ? {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
      }
    : {}

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-ring`} gradientUnits="userSpaceOnUse" x1="15.4" y1="30" x2="84.6" y2="70">
          <stop offset="0" stopColor="#063d2d" />
          <stop offset="0.49" stopColor="#0b5a44" />
          <stop offset="0.51" stopColor="#22c55e" />
          <stop offset="1" stopColor="#39d94a" />
        </linearGradient>
        <linearGradient id={`${id}-s`} gradientUnits="userSpaceOnUse" x1="30" y1="22" x2="70" y2="78">
          <stop offset="0" stopColor="#39d94a" />
          <stop offset="0.55" stopColor="#22c55e" />
          <stop offset="1" stopColor="#0b5a44" />
        </linearGradient>
        <mask id={`${id}-cut`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <line x1="18" y1="105" x2="82" y2="-5" stroke="#000" strokeWidth="7" />
        </mask>
      </defs>
      <g mask={`url(#${id}-cut)`}>
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={ring}
          strokeWidth="9"
          transform="rotate(-60 50 50)"
          {...drawProps}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />
      </g>
      <motion.path
        d="M63 33 C59 29 54 28 49 28 C41 28 35 32 35 39 C35 46 42 48 50 50 C58 52 65 54 65 61 C65 68 59 72 51 72 C45 72 40 70 37 67"
        fill="none"
        stroke={s}
        strokeWidth="8.5"
        strokeLinecap="butt"
        {...drawProps}
        transition={{ duration: 1, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  )
}

