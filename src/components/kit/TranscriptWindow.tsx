import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT_EXPO } from '../../lib/motion'

type Step =
  | { kind: 'borrower'; text: string }
  | { kind: 'agent'; text: string }
  | { kind: 'tool'; name: string; result: string }
  | { kind: 'check'; text: string }

const SCRIPT: Step[] = [
  { kind: 'borrower', text: 'Hey, I missed my payment on the 15th. Can I split it across the next two months?' },
  { kind: 'agent', text: 'You can. Your balance is $412.18. I can set $206.09 on Oct 1 and Nov 1, drafted from your checking on file. Want me to set that up?' },
  { kind: 'tool', name: 'payment_plan.create', result: '2 installments · $206.09 · ACH ending 4417' },
  { kind: 'borrower', text: 'Yes please.' },
  { kind: 'agent', text: 'Done. Confirmation and the full terms are in your inbox. Nothing else is due until Oct 1.' },
  { kind: 'check', text: 'Reg F frequency check passed · quiet hours respected · plan within policy P-114' },
]

const STEP_DELAY = 1050

// Scripted replay of a real exchange. Steps stagger in while the window is on
// screen and the script resets when it leaves, so every scroll-through replays.
export default function TranscriptWindow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduce) {
      setCount(SCRIPT.length)
      return
    }
    if (!inView) {
      setCount(0)
      return
    }
    if (count >= SCRIPT.length) return
    const t = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 350 : STEP_DELAY)
    return () => window.clearTimeout(t)
  }, [inView, count, reduce])

  return (
    <div ref={ref} className="bg-[#F4F3F3] p-3 sm:p-4">
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-200">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
            Live transcript
          </p>
          <p className="text-xs text-[#191919]/40 tabular-nums">SMS · acct ····4417</p>
        </div>
        <div className="px-4 sm:px-5 py-5 min-h-[380px] sm:min-h-[400px] flex flex-col gap-3">
          <AnimatePresence>
            {SCRIPT.slice(0, count).map((step, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className={
                  step.kind === 'borrower'
                    ? 'self-end max-w-[85%] sm:max-w-[70%]'
                    : 'self-start max-w-[85%] sm:max-w-[70%]'
                }
              >
                {step.kind === 'borrower' && (
                  <div className="bg-[#191919] text-white text-sm leading-relaxed px-4 py-2.5 rounded-2xl rounded-br-md">
                    {step.text}
                  </div>
                )}
                {step.kind === 'agent' && (
                  <div className="bg-[#F4F3F3] text-[#191919] text-sm leading-relaxed px-4 py-2.5 rounded-2xl rounded-bl-md">
                    {step.text}
                  </div>
                )}
                {step.kind === 'tool' && (
                  <div className="border border-gray-200 px-4 py-2.5 rounded-xl">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#191919]/40 font-medium">
                      {step.name}
                    </p>
                    <p className="mt-1 text-sm text-[#191919] tabular-nums">{step.result}</p>
                  </div>
                )}
                {step.kind === 'check' && (
                  <p className="text-xs text-[#191919]/45 leading-relaxed pt-1">{step.text}</p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-gray-200">
          <p className="text-sm text-[#191919]/35 select-none">Reply as borrower</p>
          <span className="w-8 h-8 rounded-lg bg-[#191919] flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </span>
        </div>
      </div>
    </div>
  )
}
