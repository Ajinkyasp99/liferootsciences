import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-secondary text-white hover:bg-secondary-dark focus-visible:ring-secondary',
  secondary:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary',
  ghost:
    'text-secondary hover:bg-neutral-100 focus-visible:ring-secondary',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
