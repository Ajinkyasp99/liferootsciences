export default function SectionHeading({ overline, title, subtitle, align = 'center', className = '' }) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  return (
    <div className={`mb-12 ${alignClass} ${className}`}>
      {overline && (
        <p className="mb-2 text-sm font-semibold tracking-wider text-secondary uppercase">
          {overline}
        </p>
      )}
      <h2 className="text-3xl font-bold text-primary sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-3xl text-lg text-neutral-500 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
