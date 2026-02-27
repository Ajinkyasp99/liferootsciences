import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import AnimatedSection from '@/components/common/AnimatedSection'
import Button from '@/components/common/Button'
import {
  MessageSquare,
  Search,
  FlaskConical,
  Handshake,
  FileText,
  BrainCircuit,
  Package,
} from 'lucide-react'

function PageHeader() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold tracking-wider text-secondary uppercase">
              How We Work
            </p>
            <h1 className="text-4xl font-bold text-primary sm:text-5xl">Engagement Model</h1>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
              Flexible engagement options designed to meet you where you are — whether you need
              strategic consulting, hands-on research support, or end-to-end product development.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

function EngagementTypes() {
  const types = [
    {
      icon: Handshake,
      title: 'Consulting',
      description:
        'Strategic advisory for research design, data strategy, and AI integration. We help you define the right approach before committing resources.',
      features: [
        'Feasibility assessments',
        'Research strategy',
        'Technology selection',
        'Study design review',
      ],
    },
    {
      icon: FlaskConical,
      title: 'Research Support',
      description:
        'Hands-on support for ongoing research — from literature review and data analysis to manuscript preparation and visualization.',
      features: [
        'Literature review',
        'Statistical analysis',
        'Data visualization',
        'Scientific writing',
      ],
    },
    {
      icon: BrainCircuit,
      title: 'Data & AI Product Development',
      description:
        'End-to-end development of data pipelines, ML models, and AI-driven tools tailored to life sciences and healthcare applications.',
      features: [
        'ML model development',
        'Data pipeline design',
        'Predictive analytics',
        'Custom AI solutions',
      ],
    },
  ]

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          overline="Engagement Options"
          title="Choose Your Model"
          subtitle="We adapt our approach to fit your needs — from lightweight advisory to full-scale research partnerships."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {types.map((type, i) => (
            <AnimatedSection key={type.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <type.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-primary">{type.title}</h3>
                <p className="mt-3 flex-1 text-neutral-500 leading-relaxed">{type.description}</p>
                <ul className="mt-6 space-y-2 border-t border-neutral-100 pt-6">
                  {type.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ProcessTimeline() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Problem Understanding',
      description:
        'We begin with a thorough consultation to understand your research question, data landscape, and desired outcomes. This phase ensures alignment before any work begins.',
      activities: [
        'Initial consultation & scoping',
        'Requirements gathering',
        'Feasibility assessment',
        'Proposal & timeline development',
      ],
    },
    {
      icon: Search,
      title: 'Research & Analysis',
      description:
        'Our team conducts literature review, data exploration, and preliminary analyses to build a solid foundation for the engagement.',
      activities: [
        'Literature review & synthesis',
        'Data collection & cleaning',
        'Exploratory data analysis',
        'Hypothesis formulation',
      ],
    },
    {
      icon: FlaskConical,
      title: 'Modeling & Validation',
      description:
        'We apply rigorous computational and statistical methods — building models, running simulations, and validating results against domain knowledge.',
      activities: [
        'Statistical / ML modeling',
        'Cross-validation & testing',
        'Domain expert review',
        'Iterative refinement',
      ],
    },
    {
      icon: FileText,
      title: 'Delivery & Documentation',
      description:
        'We deliver publication-ready outputs with full documentation — including reproducible code, detailed reports, and presentation-quality figures.',
      activities: [
        'Final report & documentation',
        'Data visualizations & figures',
        'Knowledge transfer',
        'Ongoing support options',
      ],
    },
  ]

  return (
    <section className="bg-neutral-50 py-20">
      <Container>
        <SectionHeading
          overline="Our Process"
          title="From Question to Deliverable"
          subtitle="A structured, four-phase workflow designed for reproducibility, rigor, and clear communication at every stage."
        />
        <div className="mx-auto max-w-3xl">
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1}>
              <div className="relative flex gap-6 pb-12 last:pb-0">
                {i < steps.length - 1 && (
                  <div className="absolute top-14 left-6 h-[calc(100%-3.5rem)] w-px bg-neutral-300" />
                )}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md">
                  <step.icon size={20} />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-secondary uppercase">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-primary">{step.title}</h3>
                  <p className="mt-2 text-neutral-500 leading-relaxed">{step.description}</p>
                  <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {step.activities.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

function CTABand() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-light py-16">
      <Container>
        <AnimatedSection>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to Start a Project?
              </h2>
              <p className="mt-2 text-white/70">
                Tell us about your research challenge and we will design the right engagement.
              </p>
            </div>
            <Button to="/contact" size="lg" className="shrink-0 bg-white text-primary hover:bg-neutral-100">
              Get in Touch
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

export default function EngagementModel() {
  return (
    <>
      <PageHeader />
      <EngagementTypes />
      <ProcessTimeline />
      <CTABand />
    </>
  )
}
