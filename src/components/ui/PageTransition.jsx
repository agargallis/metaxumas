import { motion } from 'motion/react'

export default function PageTransition({ children }) {
  return (
    <motion.div
      className="page-content-flow"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
