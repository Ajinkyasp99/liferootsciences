import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import useScrollPosition from '@/hooks/useScrollPosition'
import { navLinks } from '@/data/navigation'
import Container from '@/components/common/Container'
import Button from '@/components/common/Button'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollY = useScrollPosition()
  const location = useLocation()
  const scrolled = scrollY > 20
  
  // Normalize pathname by removing basename for comparison
  const normalizedPathname = location.pathname.replace('/liferootsciences', '') || '/'

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled
          ? 'border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
        }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              LR
            </div>
            <span className="text-lg font-bold text-primary">
              LifeRoot <span className="font-normal text-secondary">Sciences</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${normalizedPathname === link.path
                    ? 'text-secondary'
                    : 'text-neutral-600 hover:text-primary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button to="/contact" size="sm">
              Get in Touch
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </Container>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
