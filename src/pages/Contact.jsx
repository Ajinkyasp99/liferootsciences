import { useState } from 'react'
import Container from '@/components/common/Container'
import AnimatedSection from '@/components/common/AnimatedSection'
import Button from '@/components/common/Button'
import { siteConfig } from '@/data/siteConfig'
import { MapPin, Mail, Globe, Clock } from 'lucide-react'

function PageHeader() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold tracking-wider text-secondary uppercase">
              Start a Conversation
            </p>
            <h1 className="text-4xl font-bold text-primary sm:text-5xl">Contact Us</h1>
            <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
              Whether you are exploring a new research direction, need support on an active project,
              or want to discuss a custom engagement — we would be glad to hear from you.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    industry: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.industry) e.industry = 'Industry is required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) {
      setErrors(v)
      return
    }
    setErrors({})
    setLoading(true)
    setSubmitError(null)

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxGcvOnYEjQKfPyGcL1DJVi8_J_pPeHVGkQJM-XxOhFPf3qxQW2r3C10myxqbNuOWfe/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          organization: form.organization,
          industry: form.industry,
          subject: form.subject,
          message: form.message
        })
      });

      // Google Apps Script no-cors mode results in an opaque response.
      // We assume success if the fetch doesn't throw.
      setSubmitted(true)
    } catch (err) {
      console.error("Submission error:", err)
      setSubmitError("Something went wrong. Please try again or contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Mail size={28} />
        </div>
        <h3 className="text-xl font-semibold text-green-800">Thank You</h3>
        <p className="mt-2 text-green-700">
          Your inquiry has been received. We will get back to you shortly.
        </p>
      </div>
    )
  }

  const fieldClasses = (field) =>
    `w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary ${errors[field] ? 'border-red-300 bg-red-50' : 'border-neutral-300 bg-white'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {submitError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          {submitError}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Your name"
            disabled={loading}
            className={fieldClasses('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@example.com"
            disabled={loading}
            className={fieldClasses('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">Organization</label>
          <input
            type="text"
            value={form.organization}
            onChange={handleChange('organization')}
            placeholder="Company or institution"
            disabled={loading}
            className={fieldClasses('organization')}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Industry <span className="text-red-400">*</span>
          </label>
          <select
            value={form.industry}
            onChange={handleChange('industry')}
            disabled={loading}
            className={fieldClasses('industry')}
          >
            <option value="">Select an industry</option>
            {siteConfig.industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
            <option value="Academic / Research">Academic / Research</option>
            <option value="Other">Other</option>
          </select>
          {errors.industry && <p className="mt-1 text-xs text-red-500">{errors.industry}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
          Subject <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={handleChange('subject')}
          placeholder="How can we help?"
          disabled={loading}
          className={fieldClasses('subject')}
        />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={handleChange('message')}
          placeholder="Tell us about your project or research challenge..."
          disabled={loading}
          className={fieldClasses('message')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <div className="pt-2 flex justify-center">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Inquiry'
          )}
        </Button>
      </div>
    </form>
  )
}

function ContactInfo() {
  const info = [
    { icon: MapPin, label: 'Location', value: 'India' },
    { icon: Globe, label: 'Industries', value: 'Biotech, Healthcare, Pharmaceuticals' },
    { icon: Clock, label: 'Engagement', value: 'Consulting, Research Support, Data & AI' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-primary">Let's Collaborate</h3>
        <p className="mt-3 text-neutral-500 leading-relaxed">
          We work with research institutions, biotech companies, pharmaceutical firms,
          healthcare organizations, and academic groups. Whether you need a quick
          consultation or a long-term research partnership, we are here to help.
        </p>
      </div>

      <div className="space-y-4">
        {info.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <item.icon size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-700">{item.label}</p>
              <p className="text-sm text-neutral-500">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
        <h4 className="text-sm font-semibold text-primary">Enterprise & Research Inquiries</h4>
        <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
          For large-scale engagements, ongoing research support contracts, or multi-project
          partnerships, please describe your needs in the form and we will arrange a
          dedicated consultation.
        </p>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <>
      <PageHeader />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <AnimatedSection className="lg:col-span-3">
              <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
                <h2 className="mb-6 text-2xl font-bold text-primary">Send Us an Inquiry</h2>
                <ContactForm />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="lg:col-span-2">
              <ContactInfo />
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  )
}
