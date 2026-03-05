import Container from '@/components/common/Container'
import Button from '@/components/common/Button'
import AnimatedSection from '@/components/common/AnimatedSection'
import AnimatedBackground from '@/components/home/AnimatedBackground'
import { ArrowRight, FlaskConical, HeartPulse, Pill } from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary py-24 sm:py-32 lg:py-40">
      {/* 3D Animated Background */}
      <AnimatedBackground />
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/50" />
      
      <Container className="relative z-10">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold tracking-wider text-secondary-light uppercase">
              Research-Driven Consulting
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              AI, Data Science &{' '}
              <span className="text-secondary-light">Life Sciences</span>{' '}
              Research Consulting
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
              End-to-end support across artificial intelligence, computational biology,
              biostatistics, and life sciences — from molecular research to data-driven discovery.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button to="/services" size="lg">
                Explore Services <ArrowRight size={18} />
              </Button>
              <Button to="/contact" variant="secondary" size="lg" className="border-white/30 text-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

function TrustIndicators() {
  const stats = [
    { value: '80+', label: 'Areas of Expertise' },
    { value: '5+', label: 'Service Domains' },
    { value: '3', label: 'Industries Served' },
    { value: 'End-to-End', label: 'Research Support' },
  ]

  return (
    <section className="relative -mt-12 z-10">
      <Container>
        <AnimatedSection>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-md"
              >
                <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

function IndustryGrid() {
  const industries = [
    {
      icon: FlaskConical,
      title: 'Biotech & Life Sciences',
      description:
        'Supporting biotech R&D with computational biology, omics analysis, molecular modeling, and AI-driven discovery pipelines.',
    },
    {
      icon: HeartPulse,
      title: 'Healthcare & Medicine',
      description:
        'Powering clinical research with biostatistics, medical data analysis, biomarker discovery, and evidence-based consulting.',
    },
    {
      icon: Pill,
      title: 'Pharmaceuticals',
      description:
        'Accelerating drug development through predictive modeling, genomics, systems biology, and AI-augmented research workflows.',
    },
  ]

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <AnimatedSection>
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-wider text-secondary uppercase">
              Industries We Serve
            </p>
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">
              Focused on What Matters
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
              Our expertise is purpose-built for organizations where science, data, and
              precision converge.
            </p>
          </div>
        </AnimatedSection>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {industries.map((industry, i) => (
            <AnimatedSection key={industry.title} delay={i * 0.1}>
              <div className="group rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-secondary/30 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                  <industry.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-primary">{industry.title}</h3>
                <p className="mt-3 text-neutral-500 leading-relaxed">{industry.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-light py-20">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Accelerate Your Research?
            </h2>
            <p className="mt-4 text-lg text-white/70">
              From initial concept to final deliverable — we bring scientific rigor and
              computational precision to every engagement.
            </p>
            <div className="mt-8">
              <Button to="/contact" size="lg" className="text-primary hover:bg-neutral-100">
                Start a Conversation
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <IndustryGrid />
      <CTASection />
    </>
  )
}
