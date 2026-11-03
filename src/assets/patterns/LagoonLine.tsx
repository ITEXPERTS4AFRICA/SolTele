import { useSafeId } from '../../lib/useSafeId'

/** Props of the Abidjan Plateau skyline and Ébrié Lagoon wave motif. */
export interface LagoonLineProps {
  className?: string
  /** Optional variant: 'hero' is taller with full skyline, 'footer' is sleeker. */
  variant?: 'hero' | 'footer'
}

/**
 * Signature motif #4 & #5:
 * Stylized silhouette of the Abidjan Plateau skyline and ripples of the Ébrié Lagoon,
 * with blinking green antenna beacons and data packets travelling along the wave lines.
 */
export function LagoonLine({ className = '', variant = 'hero' }: LagoonLineProps) {
  const id = useSafeId('lagoon')
  const beacons = [
    { x: 180, y: 42, delay: '0s' },
    { x: 310, y: 28, delay: '0.6s' },
    { x: 468, y: 18, delay: '1.3s' },
    { x: 590, y: 34, delay: '0.3s' },
    { x: 742, y: 14, delay: '1.8s' },
    { x: 896, y: 26, delay: '0.9s' },
    { x: 1064, y: 22, delay: '1.5s' },
    { x: 1210, y: 38, delay: '0.4s' },
  ]

  return (
    <div className={`pointer-events-none relative w-full overflow-hidden select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 96"
        fill="none"
         preserveAspectRatio="none"
        className={variant === 'hero' ? 'h-16 w-full sm:h-20 lg:h-24' : 'h-12 w-full sm:h-16'}
      >
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#063d2d" stopOpacity="0.2" />
            <stop offset="0.3" stopColor="#0b5a44" stopOpacity="0.65" />
            <stop offset="0.5" stopColor="#39d94a" stopOpacity="0.85" />
            <stop offset="0.7" stopColor="#0b5a44" stopOpacity="0.65" />
            <stop offset="1" stopColor="#063d2d" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`${id}-fill`} x1="720" y1="10" x2="720" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0b5a44" stopOpacity="0.38" />
            <stop offset="1" stopColor="#041b12" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Stylized Plateau towers silhouette */}
        <path
          d="M0 78 L95 78 L95 62 L130 62 L130 78 L165 78 L165 44 L195 44 L195 78 L280 78 L280 54 L298 54 L298 30 L322 30 L322 78 L410 78 L410 48 L448 48 L448 20 L488 20 L488 78 L560 78 L560 36 L618 36 L618 78 L700 78 L700 28 L728 16 L756 28 L756 78 L830 78 L830 50 L878 50 L878 28 L914 28 L914 78 L990 78 L990 56 L1045 56 L1045 24 L1082 24 L1082 78 L1175 78 L1175 40 L1240 40 L1240 78 L1330 78 L1330 58 L1375 58 L1375 78 L1440 78 L1440 96 L0 96 Z"
          fill={`url(#${id}-fill)`}
        />

        {/* Skyline crisp contour */}
        <path
          d="M0 78 L95 78 L95 62 L130 62 L130 78 L165 78 L165 44 L195 44 L195 78 L280 78 L280 54 L298 54 L298 30 L322 30 L322 78 L410 78 L410 48 L448 48 L448 20 L488 20 L488 78 L560 78 L560 36 L618 36 L618 78 L700 78 L700 28 L728 16 L756 28 L756 78 L830 78 L830 50 L878 50 L878 28 L914 28 L914 78 L990 78 L990 56 L1045 56 L1045 24 L1082 24 L1082 78 L1175 78 L1175 40 L1240 40 L1240 78 L1330 78 L1330 58 L1375 58 L1375 78 L1440 78"
          stroke={`url(#${id}-sky)`}
          strokeWidth="1.2"
        />

        {/* Ébrié Lagoon wave lines */}
        <path
          d="M0 84 Q 180 79, 360 84 T 720 84 T 1080 84 T 1440 84"
          stroke="#39d94a"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <path
          d="M0 90 Q 240 85, 480 90 T 960 90 T 1440 90"
          stroke="#39d94a"
          strokeOpacity="0.6"
          strokeWidth="1.2"
          strokeDasharray="6 18"
          className="motion-loop animate-flow"
        />

        {/* Blinking antenna nodes on top of towers */}
        {beacons.map((b, idx) => (
          <g key={idx}>
            <line x1={b.x} y1={b.y} x2={b.x} y2={b.y + 6} stroke="#39d94a" strokeOpacity="0.6" strokeWidth="1" />
            <circle cx={b.x} cy={b.y} r="4.5" fill="#39d94a" fillOpacity="0.22" />
            <circle
              cx={b.x}
              cy={b.y}
              r="2"
              fill="#39d94a"
              className="motion-loop animate-blink"
              style={{ animationDelay: b.delay }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

