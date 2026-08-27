import Logo from '../components/Logo'
import { PillLink } from '../components/kit/ArrowLink'
import Reveal from '../components/kit/Reveal'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center px-5 sm:px-8 md:px-14">
      <div className="mx-auto max-w-6xl w-full py-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <Logo className="w-5 h-5 text-[#191919]/40" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
              404
            </p>
          </div>
          <h1 className="mt-6 font-serif font-normal text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tighter text-[#191919] max-w-3xl">
            This one didn’t come back.
          </h1>
          <p className="mt-6 max-w-md text-sm md:text-base text-[#191919]/70 leading-relaxed">
            The page you threw is not returning. The rest of the site catches fine.
          </p>
          <div className="mt-10">
            <PillLink to="/">Back to home</PillLink>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
