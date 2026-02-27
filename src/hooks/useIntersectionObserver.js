import { useState, useEffect } from 'react'

export default function useIntersectionObserver(ref, { threshold = 0.1, triggerOnce = true } = {}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, triggerOnce])

  return isVisible
}
