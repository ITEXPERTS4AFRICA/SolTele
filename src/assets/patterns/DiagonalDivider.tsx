import { useSafeId } from '../../lib/useSafeId'

/** Props for the diagonal section divider. */
export interface DiagonalDividerProps {
  /** Direction of the diagonal slope ('left-to-right' rises right, 'right-to-left' rises left). */
  direction?: 'up-right' | 'up-left'
  /** Fill class for the incoming lower section (e.g. 'fill-bg' or 'fill-brand-ink'). */
  fillClassName?: string
  /** Extra classes on the wrapper. */
  className?: string
  /** Show the glowing green trace and moving data packets along the cut. */
  withTrace?: boolean
}

/**
 * Signature motif #1 & #5:
 * Diagonal section cut (~-8° visual rhythm inspired by the sliced S monogram)
 * with a double-green gradient trace and animated data packets flowing along the edge.
 */
export function DiagonalDivider({
  direction = 'up-right',
  fillClassName = 'fill-bg',
  className = '',
  withTrace = true,
}: DiagonalDividerProps) {
  const id = useSafeId('diag')
  const polygon =
    direction === 'up-right' ? '0,72 1440,8 1440,76 0,76' : '0,8 1440,72 1440,76 0,76'
  const line =
    direction === 'up-right'
      ? { x1: 0, y1: 72, x2: 1440, y2: 8 }
      : { x1: 0, y1: 8, x2: 1440, y2: 72 }

  return (
    <div className={`pointer-events-none relative -mt-px w-full overflow-hidden leading-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 76" preserveAspectRatio="none" className="block h-10 w-full sm:h-14 lg:h-16">
        <defs>
          <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#063d2d" stopOpacity="0.15" />
            <stop offset="0.25" stopColor="#0b5a44" stopOpacity="0.8" />
            <stop offset="0.55" stopColor="#39d94a" stopOpacity="1" />
            <stop offset="0.85" stopColor="#0b5a44" stopOpacity="0.8" />
            <stop offset="1" stopColor="#063d2d" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <polygon points={polygon} className={`${fillClassName} transition-colors duration-500`} />

        {withTrace && (
          <>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={`url(#${id}-line)`}
              strokeWidth="1.6"
            />
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#39d94a"
              strokeWidth="2.4"
              strokeDasharray="10 110"
              strokeLinecap="square"
              className="motion-loop animate-flow"
            />
          </>
        )}
      </svg>
    </div>
  )
}

