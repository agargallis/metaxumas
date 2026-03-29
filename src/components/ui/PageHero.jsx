import { motion } from 'motion/react'
import { cn } from '../../lib/utils'

const ease = [0.22, 1, 0.36, 1]

export default function PageHero({ label, title, subtitle, className = '' }) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-90 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(234,196,142,0.30) 0%, rgba(246,230,206,0.18) 42%, transparent 74%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-[8%] top-16 hidden h-28 w-28 rounded-full opacity-70 blur-2xl lg:block"
        style={{ background: 'radial-gradient(circle, rgba(232,184,116,0.16) 0%, transparent 72%)' }}
      />
      <div
        className="pointer-events-none absolute right-[10%] top-12 hidden h-36 w-36 rounded-full opacity-70 blur-2xl lg:block"
        style={{ background: 'radial-gradient(circle, rgba(193,122,98,0.12) 0%, transparent 72%)' }}
      />

      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pt-20">
        {label ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="label-upper mb-4"
          >
            {label}
          </motion.p>
        ) : null}

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.07, ease }}
          className="heading-section mx-auto max-w-[48rem] text-[rgba(31,18,9,0.92)]"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22, ease }}
          className="shimmer-line mx-auto mt-6 w-16 origin-center"
        />

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease }}
            className="body-lead mx-auto mt-5 max-w-[40rem] text-[rgba(47,29,15,0.62)]"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  )
}
