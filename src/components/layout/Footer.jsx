import { Link } from 'react-router-dom'
import Container from '@/components/common/Container'
import { siteConfig } from '@/data/siteConfig'
import { navLinks } from '@/data/navigation'
// 
export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-sm font-bold">
                LR
              </div>
              <span className="text-lg font-bold">
                LifeRoot <span className="font-normal text-secondary-light">Sciences</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-white/90">
              Industries
            </h4>
            <ul className="space-y-2">
              {siteConfig.industries.map((industry) => (
                <li key={industry} className="text-sm text-white/60">
                  {industry}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-white/90">
              Location
            </h4>
            <p className="text-sm text-white/60">{siteConfig.location}</p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary-dark"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} LifeRoot Sciences. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
