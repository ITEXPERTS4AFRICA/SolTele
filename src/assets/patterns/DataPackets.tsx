/** Props of the animated data packets overlay. */
export interface DataPacketsProps {
  className?: string
}

/**
 * Signature motif #5:
 * Discreet green data packets travelling along 45° and horizontal circuit lines.
 * Automatically disabled when `prefers-reduced-motion: reduce` is active.
 */
export function DataPackets({ className = '' }: DataPacketsProps) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none motion-loop ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#39d94a" strokeOpacity="0.18" strokeWidth="1">
        <path d="M 40 340 L 180 200 L 420 200 L 520 100 L 760 100" />
        <path d="M 80 80 L 220 80 L 320 180 L 580 180 L 680 280 L 780 280" />
        <path d="M 140 360 L 300 360 L 400 260 L 640 260" />
      </g>
      <g stroke="#39d94a" strokeWidth="2" strokeLinecap="square">
        <path
          d="M 40 340 L 180 200 L 420 200 L 520 100 L 760 100"
          strokeDasharray="8 220"
          className="animate-flow"
        />
        <path
          d="M 80 80 L 220 80 L 320 180 L 580 180 L 680 280 L 780 280"
          strokeDasharray="6 240"
          className="animate-flow"
          style={{ animationDelay: '-2.2s', animationDuration: '7.5s' }}
        />
        <path
          d="M 140 360 L 300 360 L 400 260 L 640 260"
          strokeDasharray="10 200"
          className="animate-flow"
          style={{ animationDelay: '-4.1s', animationDuration: '5.5s' }}
        />
      </g>
      {/* Circuit nodes */}
      <g fill="#39d94a" fillOpacity="0.55">
        <circle cx="180" cy="200" r="2.5" />
        <circle cx="420" cy="200" r="2.5" />
        <circle cx="520" cy="100" r="2.5" />
        <circle cx="320" cy="180" r="2.5" />
        <circle cx="580" cy="180" r="2.5" />
        <circle cx="400" cy="260" r="2.5" />
      </g>
    </svg>
  )
}

