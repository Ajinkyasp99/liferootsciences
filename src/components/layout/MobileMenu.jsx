import { Link, useLocation, useHref } from 'react-router-dom'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import { navLinks } from '@/data/navigation'
import Button from '@/components/common/Button'
import { useEffect } from 'react'

export default function MobileMenu({ open, onClose }) {
  const location = useLocation()
  const href = useHref(location.pathname)
  
  // Get the pathname without basename for comparison
  const normalizedPathname = location.pathname.replace('/liferootsciences', '') || '/'

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (open) {
      onClose()
    }
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between px-6 sm:h-20">
              <span className="text-lg font-bold text-primary">Menu</span>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      normalizedPathname === link.path
                        ? 'bg-neutral-100 text-secondary'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 px-4">
                <Button to="/contact" className="w-full">
                  Get in Touch
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
