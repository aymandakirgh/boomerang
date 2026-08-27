import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', to: '/product' },
      { label: 'Solutions', to: '/solutions' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/company' },
      { label: 'Book a demo', to: '/demo' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/legal/privacy' },
      { label: 'Terms', to: '/legal/terms' },
    ],
  },
]

// Each wordmark letter lifts on hover on a small spring. One layer, no stacks:
// the restrained cousin of the letter-stack hover pattern.
function LiftWordmark() {
  const reduce = useReducedMotion()
  const letters = 'Boomerang'.split('')
  return (
    <div
      aria-label="Boomerang"
      className="font-serif font-normal text-[#191919] tracking-tighter leading-none select-none text-[clamp(3.5rem,14vw,12rem)] flex"
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={reduce ? undefined : { y: '-0.08em' }}
          transition={{ type: 'spring', stiffness: 600, damping: 30, mass: 0.6 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-5 sm:px-8 md:px-14 pt-16 sm:pt-20 pb-8 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1fr_auto]">
          <div className="max-w-xs">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <Logo className="w-6 h-6 text-[#191919]" />
              <span className="font-semibold text-base tracking-tight text-[#191919]">
                Boomerang
              </span>
            </Link>
            <p className="mt-4 text-sm text-[#191919]/60 leading-relaxed">
              Conversational AI for financial institutions. Every borrower answered,
              every conversation on the record.
            </p>
            <a
              href="mailto:hello@boomerang.finance"
              className="mt-4 inline-block text-sm text-[#191919]/70 hover:text-[#191919] border-b border-[#191919]/20 hover:border-[#191919] transition-colors duration-200"
            >
              hello@boomerang.finance
            </a>
          </div>
          <div className="flex gap-12 sm:gap-16 flex-wrap">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-[#191919]/70 hover:text-[#191919] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20 overflow-hidden">
          <LiftWordmark />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#191919]/50">
            © 2026 Boomerang Technologies, Inc. Concept site.
          </p>
          <p className="text-xs text-[#191919]/50">New York · London</p>
        </div>
      </div>
    </footer>
  )
}
