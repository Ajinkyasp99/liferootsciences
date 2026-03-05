import Container from '@/components/common/Container'
import AnimatedSection from '@/components/common/AnimatedSection'
import Badge from '@/components/common/Badge'
import { skillCategories } from '@/data/skills'

function PageHeader() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold tracking-wider text-secondary uppercase">
              Depth & Breadth
            </p>
            <h1 className="text-4xl font-bold text-primary sm:text-5xl">Expertise & Skills</h1>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
              A comprehensive skill set spanning AI, data science, computational biology,
              life sciences, and clinical research — all drawn from real-world consulting
              and research experience.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

function SkillCategory({ category, index, fullWidth = false }) {
  return (
    <AnimatedSection delay={index * 0.08} className={`h-full ${fullWidth ? 'lg:col-span-2' : ''}`}>
      <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <category.icon size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-primary">{category.title}</h3>
            <p className="text-sm text-neutral-400">{category.skills.length} skills</p>
          </div>
        </div>
        <div className="flex flex-wrap content-start gap-2">
          {category.skills.map((skill) => (
            <Badge key={skill} color={category.color}>
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function Expertise() {
  const fullWidthIds = ['computational-biology', 'life-sciences']

  return (
    <>
      <PageHeader />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {skillCategories.map((cat, i) => (
              <SkillCategory
                key={cat.id}
                category={cat}
                index={i}
                fullWidth={fullWidthIds.includes(cat.id)}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
