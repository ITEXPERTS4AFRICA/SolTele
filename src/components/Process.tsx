import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Compass, LifeBuoy, Search, Wrench } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'
import { CircuitPagne, SignalRings } from '../assets/patterns'
import { SectionHeader } from './ui/SectionHeader'
import { useSpotlight } from '../hooks/useSpotlight'

/**
 * Method section:
 * 4-step timeline (Audit → Conception → Déploiement → Support) linked by a
 * scroll-driven animated circuit trace with glowing nodes.
 */
export function Process() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const onSpotlight = useSpotlight<HTMLDivElement>()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 35%'],
  })
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  })

  const steps = [
    {
      num: '01',
      icon: Search,
      title: t.process.steps.audit.title,
      text: t.process.steps.audit.text,
    },
    {
      num: '02',
      icon: Compass,
      title: t.process.steps.design.title,
      text: t.process.steps.design.text,
    },
    {
      num: '03',
      icon: Wrench,
      title: t.process.steps.deploy.title,
      text: t.process.steps.deploy.text,
    },
    {
      num: '04',
      icon: LifeBuoy,
      title: t.process.steps.support.title,
      text: t.process.steps.support.text,
    },
  ]

  return (
    <section
      id="methode"
      ref={sectionRef}
      className="on-forest relative overflow-hidden bg-gradient-to-b from-[#041b12] via-[#063d2d]/85 to-[#041b12] py-16 text-white sm:py-24"
    >
      <CircuitPagne className="text-brand-neon/[0.045]" size={64} />
      <SignalRings
        className="pointer-events-none absolute -left-28 top-1/2 h-96 w-96 -translate-y-1/2 text-brand-neon/15"
        rings={4}
        pulses={2}
      />

      <div className="container-x relative z-10">
        <SectionHeader
          eyebrow={t.process.eyebrow}
          titleLead={t.process.titleLead}
          titleAccent={t.process.titleAccent}
          intro={t.process.intro}
          align="center"
          onDark
        />

        <div className="relative mt-14">
          {/* Desktop horizontal scroll-driven circuit line */}
          <div
            className="pointer-events-none absolute top-9 right-12 left-12 hidden h-[2px] bg-white/10 lg:block"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleX: lineScale }}
              className="h-full w-full origin-left bg-gradient-to-r from-[#063d2d] via-[#22c55e] to-[#39d94a] shadow-glow-sm"
            />
          </div>

          {/* Mobile/Tablet vertical scroll-driven circuit line */}
          <div
            className="pointer-events-none absolute top-6 bottom-6 left-6 w-[2px] bg-white/10 lg:hidden"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-[#063d2d] via-[#22c55e] to-[#39d94a] shadow-glow-sm"
            />
          </div>

          <ol className="grid gap-6 lg:grid-cols-4">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.li
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="relative pl-14 lg:pl-0"
                >
                  {/* Circuit node badge */}
                  <div className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border border-brand-neon/50 bg-[#041b12] text-brand-neon shadow-glow-sm lg:relative lg:mx-auto lg:h-16 lg:w-16">
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
                    <span className="absolute -top-1 -right-1 rounded-xs bg-brand-neon px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#041b12]">
                      {step.num}
                    </span>
                  </div>

                  {/* Step card */}
                  <div
                    onPointerMove={onSpotlight}
                    className="spotlight cut-tr group rounded-md border border-white/12 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-neon/55 hover:bg-white/[0.07] hover:shadow-glow-sm lg:mt-6 lg:text-center"
                    style={{ '--cut': '14px' } as React.CSSProperties}
                  >
                    <div className="relative z-10">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-brand-neon">
                        {t.process.step} {step.num}
                      </span>
                      <h3 className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-300 sm:text-sm">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

