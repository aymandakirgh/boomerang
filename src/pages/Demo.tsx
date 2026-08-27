import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Section } from '../components/Section'
import Reveal from '../components/kit/Reveal'
import { RING_MS, TRACE_MS } from '../lib/motion'

const EXPECT = [
  'Thirty minutes with an engineer, not a deck.',
  'Live agents negotiating on a sample of your loan tape.',
  'The audit trail for every exchange you watched.',
  'An honest read on fit, including where we are wrong for you.',
]

type Phase = 'idle' | 'spin' | 'ring' | 'check' | 'done'

// Two-beat confirmation: the spinner's arc closes into a full circle, and only
// after RING_MS has fully elapsed does the check trace. Two legible events, no
// overlap. The spin is never stopped explicitly; once the arc closes there is
// nothing left to halt, so nothing can jerk.
function LoaderCheck({ phase }: { phase: Phase }) {
  // The spin carries through the ring phase: once the arc has closed into a
  // full circle, rotation is invisible, so stopping it at 'check' cannot jerk.
  const spinning = phase === 'spin' || phase === 'ring'
  return (
    <span className="relative inline-block w-5 h-5" aria-hidden>
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spinning
            ? { repeat: Infinity, duration: 0.9, ease: 'linear' }
            : { duration: 0 }
        }
      >
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="56.5"
          initial={false}
          animate={{ strokeDashoffset: phase === 'spin' ? 42 : 0 }}
          transition={{ duration: RING_MS / 1000, ease: [0.77, 0, 0.175, 1] }}
        />
      </motion.svg>
      <svg viewBox="0 0 24 24" fill="none" className="absolute inset-0 w-5 h-5">
        <motion.path
          d="M7.5 12.5l3 3 6-6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase === 'check' || phase === 'done' ? 1 : 0 }}
          transition={{ duration: TRACE_MS / 1000, ease: [0.77, 0, 0.175, 1] }}
        />
      </svg>
    </span>
  )
}

export default function Demo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const reduce = useReducedMotion()

  useEffect(() => {
    if (phase === 'spin') {
      const t = window.setTimeout(() => setPhase('ring'), 900)
      return () => window.clearTimeout(t)
    }
    if (phase === 'ring') {
      const t = window.setTimeout(() => setPhase('check'), RING_MS)
      return () => window.clearTimeout(t)
    }
    if (phase === 'check') {
      const t = window.setTimeout(() => setPhase('done'), TRACE_MS + 300)
      return () => window.clearTimeout(t)
    }
  }, [phase])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phase !== 'idle') return
    setPhase(reduce ? 'done' : 'spin')
  }

  const busy = phase !== 'idle' && phase !== 'done'

  return (
    <main>
      <Section className="pt-36 sm:pt-44 pb-24 sm:pb-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
              Book a demo
            </p>
            <h1 className="mt-4 font-serif font-normal text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tighter text-[#191919]">
              Watch it work your book.
            </h1>
            <p className="mt-6 max-w-md text-sm md:text-base text-[#191919]/70 leading-relaxed">
              Bring a slice of your portfolio and a skeptic from compliance. Both leave with
              something to read.
            </p>
            <div className="mt-10 border-t border-gray-200">
              {EXPECT.map((line, i) => (
                <div key={i} className="grid grid-cols-[48px_1fr] gap-3 py-4 border-b border-gray-200">
                  <p className="text-sm text-[#191919]/40 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-[#F4F3F3] p-6 sm:p-10 relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {phase === 'done' ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    className="min-h-[420px] flex flex-col justify-center"
                  >
                    <p className="font-serif font-normal text-3xl sm:text-4xl leading-tight tracking-tight text-[#191919]">
                      Got it. We reply within one business day.
                    </p>
                    <p className="mt-4 text-sm text-[#191919]/60 leading-relaxed max-w-sm">
                      A calendar link and a short prep note are on their way. If it is urgent, write
                      to hello@boomerang.finance and say so.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    exit={{ opacity: 0, transition: { duration: 0.24, ease: [0.5, 0, 1, 1] } }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <label htmlFor="name" className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        required
                        autoComplete="name"
                        className="mt-2 w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder:text-[#191919]/30 outline-none focus:border-[#191919]/40 transition-colors duration-200"
                        placeholder="Dana Whitfield"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                        Work email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="mt-2 w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder:text-[#191919]/30 outline-none focus:border-[#191919]/40 transition-colors duration-200"
                        placeholder="dana@firstmeridian.bank"
                      />
                    </div>
                    <div>
                      <label htmlFor="institution" className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                        Institution
                      </label>
                      <input
                        id="institution"
                        required
                        className="mt-2 w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder:text-[#191919]/30 outline-none focus:border-[#191919]/40 transition-colors duration-200"
                        placeholder="First Meridian Bank"
                      />
                    </div>
                    <div>
                      <label htmlFor="notes" className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                        What should we be ready for?
                      </label>
                      <textarea
                        id="notes"
                        rows={4}
                        className="mt-2 w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder:text-[#191919]/30 outline-none focus:border-[#191919]/40 transition-colors duration-200 resize-none"
                        placeholder="Auto portfolio, 40k accounts, early-stage collections first."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={busy}
                      className="mt-2 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200 disabled:opacity-80 cursor-pointer"
                    >
                      {busy && <LoaderCheck phase={phase} />}
                      {busy ? 'Sending' : 'Request the demo'}
                    </button>
                    <p className="text-xs text-[#191919]/40 leading-relaxed">
                      Demo requests go to a human. This concept site stores nothing.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  )
}
