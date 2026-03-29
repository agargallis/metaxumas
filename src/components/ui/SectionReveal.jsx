import { motion } from 'motion/react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const presets = {
  fadeUp: {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden:  { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
}

export default function SectionReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.65,
  className = '',
  threshold = 0.12,
}) {
  const { ref, animate } = useScrollReveal({ threshold })
  const variants = presets[variant] || presets.fadeUp

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={animate}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Stagger container for lists of items */
export function StaggerReveal({ children, className = '', staggerDelay = 0.1 }) {
  const { ref, animate } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animate}
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Child item for use inside StaggerReveal */
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
