import { motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { MORPH } from '../../lib/motion'

// Expanding rows. Already on screen and morphing in place, so height rides the
// MORPH spring (heavy damping, no wobble), not an ease-out.
export function AccordionItem({
  title,
  meta,
  children,
  defaultOpen = false,
}: {
  title: string
  meta?: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const reduce = useReducedMotion()
  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-left cursor-pointer"
      >
        <span className="flex items-baseline gap-4 min-w-0">
          {meta && <span className="text-sm text-[#191919]/40 tabular-nums shrink-0">{meta}</span>}
          <span className="font-serif text-xl sm:text-2xl leading-tight tracking-tight text-[#191919]">
            {title}
          </span>
        </span>
        <span className="relative w-4 h-4 shrink-0" aria-hidden>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-[#191919]" />
          <motion.span
            className="absolute left-1/2 top-0 -translate-x-1/2 h-4 w-px bg-[#191919]"
            animate={{ scaleY: open ? 0 : 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2, ease: 'easeInOut' }}
          />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={reduce ? { duration: 0 } : MORPH}
        className="overflow-hidden"
      >
        <div className="pb-6 sm:pb-8">{children}</div>
      </motion.div>
    </div>
  )
}
