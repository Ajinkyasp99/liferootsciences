const colorMap = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
}

export default function Badge({ children, color = 'blue', className = '' }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-sm font-medium ${colorMap[color] || colorMap.blue} ${className}`}
    >
      {children}
    </span>
  )
}
