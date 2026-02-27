import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import AnimatedSection from '@/components/common/AnimatedSection'
import { Target, Lightbulb, Users, ShieldCheck } from 'lucide-react'

function PageHeader() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold tracking-wider text-secondary uppercase">
              Who We Are
            </p>
            <h1 className="text-4xl font-bold text-primary sm:text-5xl">
              About LifeRoot Sciences
            </h1>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
              An interdisciplinary team of consultants and researchers at the intersection
              of artificial intelligence, data science, and life sciences.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

function CompanyStory() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <div>
              <p className="mb-2 text-sm font-semibold tracking-wider text-secondary uppercase">
                Our Story
              </p>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Where Computation Meets Biology
              </h2>
              <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  LifeRoot Sciences was founded on a simple observation: the most impactful
                  discoveries in modern biology and medicine happen at the intersection of
                  disciplines. The convergence of AI, advanced analytics, and deep domain
                  knowledge in the life sciences creates opportunities that no single
                  specialty can unlock alone.
                </p>
                <p>
                  We are a team of consultants and researchers providing end-to-end support
                  across AI, data science, and the life sciences — from molecular biology and
                  microbiology/virology to computational modeling, omics, and biomarker
                  discovery.
                </p>
                <p>
                  Based in India, we work with biotech firms, pharmaceutical companies,
                  healthcare organizations, and academic research groups worldwide, offering
                  consulting, research support, and data & AI product development.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, label: 'Research-First Approach', desc: 'Every engagement begins with rigorous scientific inquiry' },
                { icon: Lightbulb, label: 'Interdisciplinary Expertise', desc: 'AI + life sciences + biostatistics under one roof' },
                { icon: Users, label: 'Collaborative Model', desc: 'We work as an extension of your research team' },
                { icon: ShieldCheck, label: 'Evidence-Based', desc: 'Decisions grounded in data, validated by domain knowledge' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-primary">{item.label}</h3>
                  <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}

function ResearchApproach() {
  const principles = [
    {
      title: 'Understand the Science',
      description:
        'We begin with a deep dive into the biological, clinical, or computational context of your challenge — ensuring that every model, analysis, or recommendation is scientifically grounded.',
    },
    {
      title: 'Apply Rigorous Methods',
      description:
        'Whether it is statistical modeling, machine learning, or omics analysis, we apply reproducible, peer-reviewed methodologies. Our work is designed to withstand scrutiny.',
    },
    {
      title: 'Deliver Actionable Insight',
      description:
        'Research is only valuable when it drives decision-making. We translate complex analyses into clear, actionable outputs — from publication-ready figures to strategic recommendations.',
    },
  ]

  return (
    <section className="bg-neutral-50 py-20">
      <Container>
        <SectionHeading
          overline="Our Methodology"
          title="A Research-First Approach"
          subtitle="We combine scientific rigor with computational precision to deliver evidence-based solutions across every engagement."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {principles.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 0.1}>
              <div className="relative rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
                <p className="mt-3 text-neutral-500 leading-relaxed">{p.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ValueProposition() {
  const values = [
    {
      title: 'Deep Domain Expertise',
      description:
        'Our team spans computational biology, bioinformatics, biostatistics, molecular biology, microbiology, AI/ML, and more — allowing us to address problems that require genuinely interdisciplinary thinking.',
    },
    {
      title: 'End-to-End Support',
      description:
        'From literature review and experimental design through data analysis, modeling, and scientific writing, we support the full research lifecycle.',
    },
    {
      title: 'Scientific Rigor',
      description:
        'We hold ourselves to publication-grade standards. Every analysis is reproducible, every conclusion is evidence-based, and every deliverable is built to withstand peer review.',
    },
  ]

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          overline="Why LifeRoot Sciences"
          title="Built for Scientific Impact"
          subtitle="We combine depth of expertise with breadth of capability to address the most complex challenges in research and healthcare."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="rounded-xl border-l-4 border-secondary bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-primary">{v.title}</h3>
                <p className="mt-3 text-neutral-500 leading-relaxed">{v.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHeader />
      <CompanyStory />
      <ResearchApproach />
      <ValueProposition />
    </>
  )
}
