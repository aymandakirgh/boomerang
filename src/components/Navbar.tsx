import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Logo from './Logo'
import { EASE_OUT_EXPO, OUT } from '../lib/motion'

const LINKS = [
  { label: 'Product', to: '/product' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Company', to: '/company' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()

  // Route change closes the menu; an open menu locks body scroll.
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-14 py-4 sm:py-5">
      <nav className="relative flex items-center justify-between">
        <Link to="/" className="relative z-[70] flex items-center gap-2.5" aria-label="Boomerang home">
          <Logo className="w-6 h-6 text-[#191919]" />
          <span className="font-semibold text-base tracking-tight text-[#191919]">Boomerang</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${
                  isActive ? 'text-[#191919]' : 'text-[#191919]/70 hover:text-[#191919]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/demo"
            className="hidden sm:inline-block px-5 py-2.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200"
          >
            Book A Demo
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative z-[70] md:hidden w-10 h-10 -mr-2 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-[#191919]"
              animate={{ rotate: open ? 45 : 0, y: open ? 3.25 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#191919]"
              animate={{ rotate: open ? -45 : 0, y: open ? -3.25 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: OUT }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="h-full flex flex-col justify-center px-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium mb-6">
                Menu
              </p>
              {[...LINKS, { label: 'Book A Demo', to: '/demo' }].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    className="group flex items-baseline justify-between py-3 border-b border-gray-200"
                  >
                    <span className="font-serif text-4xl leading-tight tracking-tight text-[#191919]">
                      {link.label}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-200 self-center" />
                  </Link>
                </motion.div>
              ))}
              <p className="mt-10 text-sm text-[#191919]/50">hello@boomerang.finance</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
