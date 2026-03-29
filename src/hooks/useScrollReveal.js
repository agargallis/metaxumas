import { useInView } from 'react-intersection-observer'

/**
 * Hook for scroll-triggered reveal animations.
 * Returns ref and animation variants for use with motion/react.
 *
 * @param {object} options - InView options
 * @returns {{ ref, inView, variants }}
 */
export function useScrollReveal(options = {}) {
  const { ref, inView } = useInView({
    threshold: options.threshold ?? 0.12,
    triggerOnce: options.triggerOnce ?? true,
    rootMargin: options.rootMargin ?? '0px 0px -60px 0px',
    ...options,
  })

  const fadeUp = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  const fadeIn = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  const slideLeft = {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  const slideRight = {
    hidden:  { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  const staggerContainer = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  }

  return {
    ref,
    inView,
    variants: { fadeUp, fadeIn, slideLeft, slideRight, staggerContainer },
    animate: inView ? 'visible' : 'hidden',
  }
}

export default useScrollReveal
