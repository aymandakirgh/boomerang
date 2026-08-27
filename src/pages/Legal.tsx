import { Navigate, useParams } from 'react-router-dom'
import { Section } from '../components/Section'
import Reveal from '../components/kit/Reveal'

const DOCS: Record<string, { title: string; updated: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    title: 'Privacy',
    updated: 'Last updated August 2026',
    sections: [
      {
        h: 'What this site collects',
        p: 'This is a concept site. It sets no cookies, runs no analytics, and stores nothing you type. The demo form renders a confirmation locally and sends nothing anywhere.',
      },
      {
        h: 'What the product collects',
        p: 'In production, Boomerang processes borrower conversations on behalf of financial institutions under written data processing agreements. Institutions own their data. Recordings and transcripts live in the institution’s tenancy, under its keys and its retention schedule.',
      },
      {
        h: 'Questions',
        p: 'Write to privacy@boomerang.finance and a person answers.',
      },
    ],
  },
  terms: {
    title: 'Terms',
    updated: 'Last updated August 2026',
    sections: [
      {
        h: 'This site',
        p: 'The content here describes a product concept. Figures, quotes, and institution references are illustrative. Nothing on this site is an offer, a guarantee of performance, or compliance advice.',
      },
      {
        h: 'The product',
        p: 'Production use of Boomerang is governed by a master service agreement negotiated with each institution, including service levels, security commitments, and model governance terms.',
      },
      {
        h: 'Contact',
        p: 'Questions about these terms go to legal@boomerang.finance.',
      },
    ],
  },
}

export default function Legal() {
  const { doc } = useParams()
  const content = doc ? DOCS[doc] : undefined
  if (!content) return <Navigate to="/404" replace />

  return (
    <main>
      <Section className="pt-36 sm:pt-44 pb-24 sm:pb-32">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
            Legal
          </p>
          <h1 className="mt-4 font-serif font-normal text-4xl sm:text-6xl leading-[1.05] tracking-tighter text-[#191919]">
            {content.title}
          </h1>
          <p className="mt-4 text-sm text-[#191919]/50">{content.updated}</p>
        </Reveal>
        <div className="mt-12 max-w-2xl border-t border-gray-200">
          {content.sections.map((section, i) => (
            <Reveal key={section.h} delay={i * 0.05}>
              <div className="py-8 border-b border-gray-200">
                <h2 className="font-serif font-normal text-2xl leading-tight tracking-tight text-[#191919]">
                  {section.h}
                </h2>
                <p className="mt-3 text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">
                  {section.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  )
}
