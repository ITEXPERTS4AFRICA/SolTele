import { useSafeId } from '../../lib/useSafeId'

/** Props of the Circuit Pagne texture. */
export interface CircuitPagneProps {
  className?: string
  /** Tile size in px. */
  size?: number
}

/**
 * "Circuit Pagne" signature texture: West African woven geometry (diamonds,
 * zigzags, 45° lines) drawn as printed circuit traces with glowing nodes.
 * Inline repeatable SVG pattern, colour driven by `currentColor`.
 */
export function CircuitPagne({ className = '', size = 64 }: CircuitPagneProps) {
  const id = useSafeId('pagne')
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" viewBox="0 0 64 64">
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
            {/* diamond lattice */}
            <path d="M32 8 L56 32 L32 56 L8 32 Z" opacity="0.55" />
            {/* woven zigzag */}
            <path d="M16 32 L24 24 L32 32 L40 24 L48 32" opacity="0.8" />
            <path d="M24 40 L32 48 L40 40" opacity="0.45" />
            {/* 45° traces joining neighbouring tiles */}
            <path d="M0 0 L8 8 M64 0 L56 8 M0 64 L8 56 M64 64 L56 56" opacity="0.7" />
            <path d="M32 0 V8 M32 56 V64 M0 32 H8 M56 32 H64" opacity="0.7" />
          </g>
          <g fill="currentColor">
            <circle cx="32" cy="32" r="1.9" />
            <circle cx="32" cy="8" r="1.3" />
            <circle cx="32" cy="56" r="1.3" />
            <circle cx="8" cy="32" r="1.3" />
            <circle cx="56" cy="32" r="1.3" />
            <rect x="22.5" y="22.5" width="3" height="3" transform="rotate(45 24 24)" opacity="0.9" />
            <rect x="38.5" y="22.5" width="3" height="3" transform="rotate(45 40 24)" opacity="0.9" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

