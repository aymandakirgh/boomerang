import { useState } from 'react'
import { Link } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import { Section, SectionHeading } from '../components/Section'
import { AccordionItem } from '../components/kit/Accordion'
import Reveal from '../components/kit/Reveal'
import Segmented from '../components/kit/Segmented'

type Billing = 'monthly' | 'annual'

const TIERS = [
  {
    name: 'Pilot',
    monthly: 1500,
    included: '5,000 conversations / mo',
    blurb: 'One channel, one policy pack. Prove it on a slice of the book.',
    features: ['Email, SMS, or voice', 'One policy pack', 'Audit trail export', 'Slack support'],
    highlight: false,
  },
  {
    name: 'Scale',
    monthly: 4500,
    included: '25,000 conversations / mo',
    blurb: 'Every channel, every stage of the lifecycle, your whole portfolio.',
    features: [
      'Email, SMS, and voice',
      'Unlimited policy packs',
      'Core, LOS, and CRM integrations',
      'Per-jurisdiction controls',
      'Dedicated success engineer',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    monthly: null,
    included: 'Custom volume',
    blurb: 'Multi-portfolio servicers and banks with their own model risk teams.',
    features: [
      'Everything in Scale',
      'On-prem or VPC deployment',
      'Custom model governance reviews',
      'SLA with named responders',
    ],
    highlight: false,
  },
] as const

const FAQ = [
  {
    q: 'What counts as a conversation?',
    a: 'One borrower, one topic, however many turns and channels it takes. A payment plan negotiated over six SMS messages and a confirmation email is one conversation. We think metering by message punishes good service.',
  },
  {
    q: 'Do you charge per seat?',
    a: 'No. Your whole team can read transcripts, tune policy, and pull reports. You pay for conversations handled, because that is the thing that saves you money.',
  },
  {
    q: 'What happens when we go over the included volume?',
    a: 'Overage is billed at the same effective rate as your tier, never a penalty rate. If you run over two months in a row we will suggest the cheaper tier for your volume ourselves.',
  },
  {
    q: 'How long does implementation take?',
    a: 'Pilots go live in two to three weeks: one integration, one policy pack, one channel. Full deployments typically land inside a quarter, with the compliance review running in parallel.',
  },
  {
    q: 'Where does our data live?',
    a: 'In your cloud tenancy by default, encrypted with your keys. Recordings and transcripts are retained on your storage under your retention schedule. Enterprise can deploy fully on-prem.',
  },
  {
    q: 'Can we cap what the agents are allowed to do?',
    a: 'That is the whole design. Agents act inside the policy packs you author: dollar limits, plan lengths, contact windows, escalation triggers. Anything outside policy goes to a human, with context.',
  },
]

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [volume, setVolume] = useState(10000)

  // Annual pays for ten months. Displayed as the monthly-equivalent figure.
  const price = (monthly: number) => (billing === 'annual' ? Math.round((monthly * 10) / 12) : monthly)

  const suggested = volume <= 5000 ? TIERS[0] : volume <= 25000 ? TIERS[1] : TIERS[2]
  const estimate = suggested.monthly === null ? null : price(suggested.monthly)

  return (
    <main>
      <Section className="pt-36 sm:pt-44 pb-16 sm:pb-20">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
            Pricing
          </p>
          <h1 className="mt-4 font-serif font-normal text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tighter text-[#191919] max-w-3xl">
            Priced per conversation, not per seat.
          </h1>
          <p className="mt-6 max-w-md text-sm md:text-base text-[#191919]/70 leading-relaxed">
            You pay for handled conversations. Reading, reporting, and tuning policy are free for
            everyone on your team.
          </p>
        </Reveal>
      </Section>

      {/* Configurator: one live number. */}
      <Section className="pb-16 sm:pb-20">
        <Reveal>
          <div className="bg-[#F4F3F3] px-6 sm:px-10 py-10 sm:py-12">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                  Estimate
                </p>
                <p className="mt-2 text-sm text-[#191919]/70">
                  <span className="font-medium text-[#191919] tabular-nums">
                    {volume.toLocaleString('en-US')}
                  </span>{' '}
                  conversations a month
                </p>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={1000}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="ink-range mt-6"
                  aria-label="Monthly conversation volume"
                />
                <div className="flex justify-between text-xs text-[#191919]/40 tabular-nums mt-1">
                  <span>1k</span>
                  <span>25k</span>
                  <span>50k</span>
                </div>
              </div>
              <div className="md:text-right">
                <p className="text-sm text-[#191919]/50">
                  Fits <span className="text-[#191919] font-medium">{suggested.name}</span>
                </p>
                <p className="font-serif font-normal leading-none tracking-tighter text-[#191919] text-6xl sm:text-7xl mt-2 transition-all duration-200 tabular-nums">
                  {estimate === null ? 'Let’s talk' : fmt(estimate)}
                </p>
                {estimate !== null && (
                  <p className="text-sm text-[#191919]/50 mt-2">
                    per month{billing === 'annual' ? ', billed annually' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Tiers. */}
      <Section className="pb-20 sm:pb-28">
        <Reveal className="flex items-center justify-between flex-wrap gap-4">
          <Segmented<Billing>
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'annual', label: 'Annual · 2 months free' },
            ]}
            value={billing}
            onChange={setBilling}
          />
        </Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-3 items-stretch">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <div
                className={`flex flex-col h-full px-6 sm:px-8 py-8 sm:py-10 ${
                  tier.highlight
                    ? 'bg-[#191919] text-white'
                    : 'bg-[#F4F3F3] text-[#191919]'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h2 className="font-serif font-normal text-2xl sm:text-3xl tracking-tight">
                    {tier.name}
                  </h2>
                  {tier.highlight && (
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium">
                      Most chosen
                    </span>
                  )}
                </div>
                <p className={`mt-2 text-sm leading-relaxed ${tier.highlight ? 'text-white/60' : 'text-[#191919]/60'}`}>
                  {tier.blurb}
                </p>
                <p className="mt-8 font-serif font-normal text-5xl sm:text-6xl leading-none tracking-tighter tabular-nums">
                  {tier.monthly === null ? 'Custom' : fmt(price(tier.monthly))}
                </p>
                <p className={`mt-2 text-sm ${tier.highlight ? 'text-white/60' : 'text-[#191919]/60'}`}>
                  {tier.monthly === null ? tier.included : `per month · ${tier.included}`}
                </p>
                <ul
                  className={`mt-8 border-t ${
                    tier.highlight ? 'border-white/15' : 'border-gray-200'
                  }`}
                >
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={`py-3 text-sm border-b ${
                        tier.highlight
                          ? 'border-white/15 text-white/80'
                          : 'border-gray-200 text-[#191919]/70'
                      }`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    to="/demo"
                    className={`block text-center px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      tier.highlight
                        ? 'bg-white text-[#191919] hover:bg-white/90'
                        : 'bg-[#191919] text-white hover:bg-[#191919]/90'
                    }`}
                  >
                    {tier.monthly === null ? 'Talk to us' : 'Start with ' + tier.name}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <p className="text-sm text-[#191919]/50">
            All tiers include the full audit trail. Compliance is not an add-on.
          </p>
        </Reveal>
      </Section>

      {/* FAQ. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <SectionHeading label="Questions" title="Asked in every deal." />
        <Reveal className="mt-12">
          <div className="border-b border-gray-200 max-w-3xl">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} title={item.q}>
                <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed max-w-2xl">
                  {item.a}
                </p>
              </AccordionItem>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </main>
  )
}
