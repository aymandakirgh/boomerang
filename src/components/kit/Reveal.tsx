import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT_EXPO } from '../../lib/motion'

// Arrival reveal: the element was not on screen, so it takes the ease-out-expo
// family. delay staggers siblings; y stays small so it reads as settling, not flying.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  )
}
