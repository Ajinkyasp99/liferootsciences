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
  BarChart3,
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

function PrimaryEngagement() {
  return (
    <section className="py-20">
      <Container>
        <AnimatedSection>
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-8 text-white shadow-xl sm:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <div className="lg:w-1/2">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium">
                  <Package size={16} />
                  Primary Focus
                </div>
                <h2 className="text-3xl font-bold sm:text-4xl">Data & AI Product Development</h2>
                <p className="mt-4 text-lg text-white/80 leading-relaxed">
                  Our core expertise lies in building end-to-end data pipelines, ML models, and 
                  AI-driven tools tailored specifically for life sciences and healthcare applications. 
                  We transform complex scientific challenges into scalable, intelligent solutions.
                </p>
                <Button 
                  to="/services" 
                  size="lg" 
                  className="mt-6 text-primary hover:bg-neutral-100"
                >
                  Explore Services
                </Button>
              </div>
              <div className="lg:w-1/2">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: BrainCircuit, title: 'ML Model Development', desc: 'Custom models for prediction, classification, and pattern recognition' },
                    { icon: Package, title: 'Data Pipeline Design', desc: 'Scalable ETL and data engineering for research workflows' },
                    { icon: BarChart3, title: 'Predictive Analytics', desc: 'Forecasting and trend analysis for decision support' },
                    { icon: FlaskConical, title: 'Custom AI Solutions', desc: 'Bespoke tools for your specific research needs' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                        <item.icon size={20} />
                      </div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

function SecondaryEngagements() {
  const types = [
    {
      icon: Handshake,
      title: 'Consulting',
      description:
        'Strategic advisory for research design, data strategy, and AI integration. We help you define the right approach.',
      features: ['Feasibility assessments', 'Research strategy', 'Technology selection'],
    },
    {
      icon: FlaskConical,
      title: 'Research Support',
      description:
        'Hands-on support for ongoing research — from literature review to manuscript preparation.',
      features: ['Literature review', 'Statistical analysis', 'Scientific writing'],
    },
  ]

  return (
    <section className="bg-neutral-50 py-16">
      <Container>
        <SectionHeading
          overline="Additional Services"
          title="Also Available"
          subtitle="Complementary engagement options to support your research journey."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {types.map((type, i) => (
            <AnimatedSection key={type.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-primary to-primary-light p-8 text-white shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <type.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{type.title}</h3>
                <p className="mt-3 text-white/80 leading-relaxed">{type.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {type.features.map((f) => (
                    <li key={f} className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
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
        'We begin with a thorough consultation to understand your research question, data landscape, and desired outcomes.',
      activities: [
        'Initial consultation & scoping',
        'Requirements gathering',
        'Feasibility assessment',
        'Proposal development',
      ],
    },
    {
      icon: Search,
      title: 'Research & Analysis',
      description:
        'Our team conducts literature review, data exploration, and preliminary analyses to build a solid foundation.',
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
        'We apply rigorous computational and statistical methods — building models, running simulations, and validating results.',
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
        'We deliver publication-ready outputs with full documentation — including reproducible code and detailed reports.',
      activities: [
        'Final report & documentation',
        'Data visualizations & figures',
        'Knowledge transfer',
        'Ongoing support',
      ],
    },
  ]

  return (
    <section className="bg-neutral-50 py-20">
      <Container>
        <SectionHeading
          overline="Our Process"
          title="From Question to Deliverable"
          subtitle="A structured, four-phase workflow designed for reproducibility, rigor, and clear communication."
        />
        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Step number badge */}
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-neutral-400">
                  {i + 1}
                </div>

                <div className="p-6">
                  {/* Icon - consistent with other pages */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <step.icon size={28} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{step.description}</p>

                  {/* Activities as tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.activities.map((a) => (
                      <span 
                        key={a} 
                        className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connection arrow for desktop */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-neutral-300 lg:block">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
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
            <Button to="/contact" size="lg" className="shrink-0 text-primary hover:bg-neutral-100">
              Start Project
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
      <PrimaryEngagement />
      <SecondaryEngagements />
      <ProcessTimeline />
      <CTABand />
    </>
  )
}
