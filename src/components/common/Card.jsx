export default function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`rounded-xl border border-neutral-200 bg-white p-6 shadow-sm ${
        hover ? 'transition-shadow duration-300 hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
