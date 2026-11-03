import { motion } from 'framer-motion'

/** Props for the standardized section header. */
export interface SectionHeaderProps {
  eyebrow: string
  titleLead: string
  titleAccent: string
  titleTail?: string
  intro?: string
  align?: 'left' | 'center'
  /** Force light text when placed on a permanently dark surface. */
  onDark?: boolean
  className?: string
}

/**
 * Reusable section heading:
 * Clean uppercase eyebrow (no bullet/dot prefix) + bold Sora title with
 * black/white lead and green gradient keyword.
 */
export function SectionHeader({
  eyebrow,
  titleLead,
  titleAccent,
  titleTail,
  intro,
  align = 'left',
  onDark = false,
  className = '',
}: SectionHeaderProps) {
  const center = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      <div className={`eyebrow ${onDark ? '!text-brand-neon' : ''} ${center ? 'justify-center' : ''}`}>
        <span>{eyebrow}</span>
      </div>

      <h2
        className={`mt-2.5 font-display text-3xl font-extrabold leading-[1.08] tracking-tightest sm:text-4xl lg:text-[42px] ${
          onDark ? 'text-white' : 'text-fg'
        }`}
      >
        <span>{titleLead} </span>
        <span className="text-gradient">{titleAccent}</span>
        {titleTail ? <span> {titleTail}</span> : null}
      </h2>

      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-[17px] ${
            onDark ? 'text-gray-300' : 'text-muted'
          }`}
        >
          {intro}
        </p>
      )}
    </motion.div>
  )
}
