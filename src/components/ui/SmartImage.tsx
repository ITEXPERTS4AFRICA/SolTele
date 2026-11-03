import { useState } from 'react'
import type { ResponsiveImage } from '../../assets/images'
import { SMark } from '../../assets/patterns'

/** Props for the progressive image component with skeleton state. */
export interface SmartImageProps {
  image: ResponsiveImage
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
  /** Apply the signature diagonal corner cut mask. */
  cut?: 'none' | 'tr' | 'both'
  /** Render a dark green gradient overlay on top of the image. */
  overlay?: boolean
}

/**
 * Progressive WebP image with a professional skeleton shimmer + S-mark pulse
 * while loading, smooth fade-in, and optional diagonal corner cut.
 */
export function SmartImage({
  image,
  alt,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  className = '',
  imgClassName = '',
  cut = 'none',
  overlay = true,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false)

  const cutClass = cut === 'tr' ? 'cut-tr' : cut === 'both' ? 'cut-both' : ''

  return (
    <div className={`relative overflow-hidden rounded-md bg-brand-deep/40 ${cutClass} ${className}`}>
      {/* Professional loading skeleton */}
      {!loaded && (
        <div
          className="skeleton absolute inset-0 z-10 flex items-center justify-center bg-brand-ink/80"
          aria-hidden="true"
        >
          <SMark className="h-10 w-10 text-brand-neon/40 motion-loop animate-pulse" mono />
        </div>
      )}

      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[transform,opacity,filter] duration-700 ease-out ${
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-sm'
        } ${imgClassName}`}
      />

      {overlay && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-deep/25 to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

