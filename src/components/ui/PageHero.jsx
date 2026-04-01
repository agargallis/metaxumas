import { motion } from 'motion/react'
import { cn } from '../../lib/utils'
const heroMark = 'https://i.imgur.com/bVglvSP.png'

const ease = [0.22, 1, 0.36, 1]

export default function PageHero({
  label,
  title,
  subtitle,
  className = '',
  minimal = false,
  imageSrc = heroMark,
  imageAlt = '',
}) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {!minimal ? <div className="absolute inset-0" style={{ background: 'var(--bg)' }} /> : null}

      {!minimal ? (
        <>
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
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        </>
      ) : null}

      <div
        className={cn(
          'relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6',
          minimal ? 'pb-6 pt-8 sm:pb-8 sm:pt-14' : 'pb-14 pt-8 sm:pb-16 sm:pt-14',
        )}
      >
        {imageSrc ? (
          <motion.img
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            src={imageSrc}
            alt={imageAlt}
            className={cn(
              'hero-mark-float mx-auto w-auto object-contain',
              minimal ? 'mb-5 h-16 sm:h-[5.5rem]' : 'mb-6 h-16 sm:h-[5.5rem]',
            )}
            style={{ filter: 'drop-shadow(0 14px 28px rgba(175,120,36,0.12))' }}
          />
        ) : null}

        {label ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className={cn('label-upper', minimal ? 'mb-3' : 'mb-4')}
          >
            {label}
          </motion.p>
        ) : null}

        {title ? (
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.07, ease }}
            className={cn(
              'mx-auto max-w-[48rem] text-[rgba(31,18,9,0.92)]',
              minimal ? 'font-display text-[clamp(2.5rem,5vw,4.3rem)] leading-[0.96] tracking-[-0.03em]' : 'heading-section',
            )}
          >
            {title}
          </motion.h1>
        ) : null}

        {!minimal ? (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="shimmer-line mx-auto mt-6 w-16 origin-center"
          />
        ) : null}
      </div>
    </section>
  )
}








