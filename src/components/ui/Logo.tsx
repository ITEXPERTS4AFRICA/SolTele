import { logoFull, logoFullDark } from '../../assets/images'
import { useTheme } from '../../theme/useTheme'
import { siteConfig } from '../../config/site'

/** Props for the SolTele brand lockup. */
export interface LogoProps {
  /** Force dark-background variant (Header over Hero, Footer, Mobile menu). */
  onDark?: boolean
  /** Kept for API compatibility; the full official logo already includes SOLUTIONS TELECOM. */
  showBaseline?: boolean
  /** Size preset. */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Renders the official SolTele logo image (3D S + OLTELE + SOLUTIONS TELECOM).
 * Automatically uses the dark-surface variant (`logoFullDark`) on dark backgrounds
 * and the original light-surface variant (`logoFull`) on light backgrounds.
 */
export function Logo({ onDark = false, size = 'md', className = '' }: LogoProps) {
  const { theme } = useTheme()
  const useDarkVariant = onDark || theme === 'dark'
  const src = useDarkVariant ? logoFullDark || logoFull : logoFull || logoFullDark

  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
  }[size]

  return (
    <span className={`group inline-flex items-center select-none ${className}`}>
      <img
        src={src}
        alt={siteConfig.brand.full}
        width={240}
        height={110}
        decoding="async"
        fetchPriority="high"
        className={`${heightClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-[0_2px_10px_rgba(57,217,74,0.22)]`}
      />
    </span>
  )
}
