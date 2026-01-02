import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
  color: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'pink'
}

const colorConfig = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    icon: 'bg-blue-500 text-white',
    border: 'border-blue-200',
    accent: 'text-blue-600',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    icon: 'bg-emerald-500 text-white',
    border: 'border-emerald-200',
    accent: 'text-emerald-600',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    icon: 'bg-purple-500 text-white',
    border: 'border-purple-200',
    accent: 'text-purple-600',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
    icon: 'bg-orange-500 text-white',
    border: 'border-orange-200',
    accent: 'text-orange-600',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
    icon: 'bg-cyan-500 text-white',
    border: 'border-cyan-200',
    accent: 'text-cyan-600',
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-50 to-pink-100',
    icon: 'bg-pink-500 text-white',
    border: 'border-pink-200',
    accent: 'text-pink-600',
  },
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  const config = colorConfig[color]

  return (
    <div
      className={`
        ${config.bg} ${config.border}
        rounded-xl border p-3 sm:p-4
        shadow-sm hover:shadow-md
        transform hover:-translate-y-0.5
        transition-all duration-200 ease-out
        cursor-default
      `}
    >
      <div className='flex items-start justify-between'>
        <div className='flex-1 min-w-0'>
          <p className='text-xs sm:text-sm font-medium text-gray-600 truncate'>
            {title}
          </p>
          <p className={`text-xl sm:text-2xl font-bold ${config.accent} mt-1`}>
            {value.toLocaleString()}
          </p>
        </div>
        <div
          className={`
            ${config.icon}
            p-2 sm:p-2.5 rounded-lg
            shadow-sm
            shrink-0
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
