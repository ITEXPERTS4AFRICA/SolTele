/** Props of the signal rings motif. */
export interface SignalRingsProps {
  className?: string
  /** Number of static concentric rings. */
  rings?: number
  /** Number of animated pulses emanating from the centre. */
  pulses?: number
  /** Show the glowing emitter dot at the centre. */
  emitter?: boolean
}

/**
 * "Signal rings" signature motif: concentric circles pulsing slowly from a
 * point, the symbol of connectivity. Pulses are hidden with reduced motion.
 */
export function SignalRings({ className = '', rings = 4, pulses = 3, emitter = true }: SignalRingsProps) {
  const step = 48 / rings
  return (
    <svg viewBox="0 0 100 100" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor">
        {Array.from({ length: rings }, (_, i) => (
          <circle
            key={`r${i}`}
            cx="50"
            cy="50"
            r={step * (i + 1)}
            strokeWidth="0.25"
            opacity={0.55 - i * (0.4 / rings)}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {Array.from({ length: pulses }, (_, i) => (
          <circle
            key={`p${i}`}
            className="motion-loop animate-pulse-ring"
            cx="50"
            cy="50"
            r="32"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animationDelay: `${(i * 4.5) / pulses}s`,
            }}
          />
        ))}
      </g>
      {emitter && (
        <>
          <circle cx="50" cy="50" r="3.2" fill="currentColor" opacity="0.25" />
          <circle cx="50" cy="50" r="1.4" fill="currentColor" />
        </>
      )}
    </svg>
  )
}

