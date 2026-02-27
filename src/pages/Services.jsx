import { useState } from 'react'
import Container from '@/components/common/Container'
import AnimatedSection from '@/components/common/AnimatedSection'
import Badge from '@/components/common/Badge'
import { services } from '@/data/services'
import { ChevronDown, ChevronUp } from 'lucide-react'

function PageHeader() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold tracking-wider text-secondary uppercase">
              What We Do
            </p>
            <h1 className="text-4xl font-bold text-primary sm:text-5xl">Our Services</h1>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
              Comprehensive consulting and research support across AI, data science,
              computational biology, biostatistics, and life sciences.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

function ServiceCategory({ service, index }) {
  const [expanded, setExpanded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <section className={isEven ? 'bg-white' : 'bg-neutral-50'}>
      <Container className="py-16 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <AnimatedSection className={!isEven ? 'lg:order-2' : ''}>
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <service.icon size={28} />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">{service.title}</h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">{service.fullDescription}</p>

              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary-dark transition-colors"
              >
                {expanded ? 'Show less' : 'Learn more'}
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {expanded && (
                <div className="mt-6 space-y-6 border-t border-neutral-200 pt-6">
                  <div>
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Problems We Solve</h4>
                    <p className="mt-2 text-neutral-500 leading-relaxed">{service.problemsSolved}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Who It's For</h4>
                    <p className="mt-2 text-neutral-500 leading-relaxed">{service.targetAudience}</p>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className={!isEven ? 'lg:order-1' : ''}>
            <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h3 className="mb-5 text-sm font-semibold text-primary uppercase tracking-wider">
                Capabilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.subServices.map((sub) => (
                  <Badge key={sub} color={service.color}>
                    {sub}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <PageHeader />
      {services.map((service, i) => (
        <ServiceCategory key={service.id} service={service} index={i} />
      ))}
    </>
  )
}
