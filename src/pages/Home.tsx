import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BoomerangVideoBg from '../components/BoomerangVideoBg'
import CtaBand from '../components/CtaBand'
import { Section, SectionHeading } from '../components/Section'
import { QuietLink } from '../components/kit/ArrowLink'
import Counter from '../components/kit/Counter'
import Marquee from '../components/kit/Marquee'
import Reveal from '../components/kit/Reveal'
import ScrambleText from '../components/kit/ScrambleText'
import SwapWord from '../components/kit/SwapWord'

const FEATURES = [
  { num: '01', label: 'Conversational', to: '/product' },
  { num: '02', label: 'Connected', to: '/product' },
  { num: '03', label: 'Compliant', to: '/solutions' },
]

const STATS = [
  { value: 71, suffix: '%', label: 'of conversations resolved with no human touch' },
  { value: 38, suffix: 's', label: 'median first response, around the clock' },
  { value: 100, suffix: '%', label: 'of turns logged, cited, and exportable' },
]

const MARQUEE_WORDS = ['Collections', 'Servicing', 'Onboarding', 'Verification', 'Retention', 'Recovery']

const STEPS = [
  {
    num: '01',
    title: 'Reach',
    body: 'Agents open the conversation on the channel each borrower actually answers, at an hour their jurisdiction allows.',
  },
  {
    num: '02',
    title: 'Resolve',
    body: 'They negotiate plans, take payments, verify identity, and answer account questions inside the policy you set.',
  },
  {
    num: '03',
    title: 'Report',
    body: 'Every turn lands in your systems with the policy citation that allowed it. Your auditors read the same record you do.',
  },
]

const CHANNELS = [
  {
    name: 'Email',
    line: 'Full threads, not blasts. Agents read the history and reply in context.',
  },
  {
    name: 'SMS',
    line: 'Where borrowers answer. Frequency caps and quiet hours enforced per state.',
  },
  {
    name: 'Voice',
    line: 'Inbound and outbound calls with barge-in, recording, and live transcripts.',
  },
]

export default function Home() {
  return (
    <main>
      {/* First viewport: spec-locked composition. Classes and copy are the contract. */}
      <section className="relative flex flex-col items-center overflow-hidden h-screen">
        <BoomerangVideoBg />

        <div className="relative z-10 flex flex-col items-center text-center pt-24 sm:pt-26 md:pt-32 px-4 sm:px-6">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-[#191919] font-normal">
            Build lasting
            <br />
            relationships.
          </h1>
          <p className="max-w-sm sm:max-w-md mt-5 sm:mt-6 md:mt-8 text-sm md:text-base text-[#191919]/70 leading-relaxed">
            Conversational AI platform for modern financial institutions — agents that handle the
            full borrower lifecycle across email, SMS, and voice.
          </p>
          <Link
            to="/demo"
            className="mt-6 sm:mt-8 md:mt-10 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200"
          >
            Book A Demo
          </Link>
        </div>

        <div className="relative z-10 mt-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 border-b-0 pt-8 sm:pt-12 md:pt-16 px-5 sm:px-8 md:px-12 pb-0 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-16">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                  What do we do?
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-normal leading-tight tracking-tight">
                  Conversations that <br className="hidden sm:block" />
                  build momentum
                </h2>
              </div>
              <div className="flex items-end">
                <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">
                  Conversational AI built for regulated financial institutions. Agents that hold a
                  real conversation, plug into the systems you run, and show their work.
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 md:mt-10 h-px bg-gray-200 w-full" />

            <div className="grid sm:grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-8">
              {FEATURES.map((feature) => (
                <Link
                  to={feature.to}
                  key={feature.num}
                  className="group bg-[#F4F3F3] hover:bg-[#eaeaea] transition-all duration-200 cursor-pointer px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between"
                >
                  <p className="text-sm">
                    <span className="text-[#191919]/40">{feature.num}</span>
                    <span className="mx-2 text-[#191919]/30">/</span>
                    <span className="font-medium">{feature.label}</span>
                  </p>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats: flat tiles, one oversized numeral each. */}
      <Section className="py-20 sm:py-28">
        <div className="grid sm:grid-cols-3 gap-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="bg-[#F4F3F3] px-6 sm:px-8 py-10 sm:py-12 h-full">
                <p className="font-serif font-normal text-5xl sm:text-6xl md:text-7xl leading-none tracking-tighter text-[#191919]">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-sm text-[#191919]/60 leading-relaxed max-w-[26ch]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Marquee band: the work, oversized. */}
      <div className="border-y border-gray-200 py-6 sm:py-8">
        <Marquee seconds={30}>
          {MARQUEE_WORDS.map((word) => (
            <span key={word} className="inline-flex items-baseline">
              <span className="font-serif font-normal text-4xl sm:text-6xl md:text-7xl leading-none tracking-tighter text-[#191919] px-6 sm:px-10">
                {word}
              </span>
              <span className="text-[#191919]/25 text-2xl sm:text-4xl select-none" aria-hidden>
                /
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* How it works. The one scramble moment on the site: noise resolving into signal. */}
      <Section className="py-24 sm:py-32">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
          How it works
        </p>
        <h2 className="mt-3 font-serif font-normal text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#191919]">
          <ScrambleText text="From first touch to paid in full." />
        </h2>
        <div className="mt-12 sm:mt-16 border-t border-gray-200">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="grid sm:grid-cols-[80px_240px_1fr] gap-2 sm:gap-8 py-8 sm:py-10 border-b border-gray-200">
                <p className="text-sm text-[#191919]/40 tabular-nums">{step.num}</p>
                <h3 className="font-serif font-normal text-2xl sm:text-3xl leading-tight tracking-tight text-[#191919]">
                  {step.title}
                </h3>
                <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed max-w-xl">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Channels preview. */}
      <Section className="pb-24 sm:pb-32">
        <SectionHeading
          label="Channels"
          title={
            <>
              One agent across{' '}
              <SwapWord words={['email.', 'SMS.', 'voice.']} className="text-[#191919]" />
            </>
          }
          body="The same agent, the same memory, the same policy, on whichever channel the borrower picks up. Switch mid-conversation and nothing is lost."
        />
        <div className="mt-12 grid sm:grid-cols-3 gap-3">
          {CHANNELS.map((channel, i) => (
            <Reveal key={channel.name} delay={i * 0.08}>
              <Link
                to="/product"
                className="group block bg-[#F4F3F3] hover:bg-[#eaeaea] transition-colors duration-200 px-6 sm:px-8 py-8 sm:py-10 h-full"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-normal text-2xl sm:text-3xl leading-tight tracking-tight text-[#191919]">
                    {channel.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
                <p className="mt-4 text-sm text-[#191919]/60 leading-relaxed">{channel.line}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <QuietLink to="/product">See the full product</QuietLink>
        </Reveal>
      </Section>

      <CtaBand />
    </main>
  )
}
