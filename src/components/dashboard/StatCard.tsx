import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
  color: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'pink'
}

const colorConfig = {
  blue: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-blue-500 to-blue-600',
    iconShadow: 'shadow-blue-500/30',
    accent: 'text-blue-600',
    bar: 'bg-linear-to-r from-blue-400 to-blue-600',
  },
  green: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-emerald-500 to-emerald-600',
    iconShadow: 'shadow-emerald-500/30',
    accent: 'text-emerald-600',
    bar: 'bg-linear-to-r from-emerald-400 to-emerald-600',
  },
  purple: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-purple-500 to-purple-600',
    iconShadow: 'shadow-purple-500/30',
    accent: 'text-purple-600',
    bar: 'bg-linear-to-r from-purple-400 to-purple-600',
  },
  orange: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-orange-500 to-orange-600',
    iconShadow: 'shadow-orange-500/30',
    accent: 'text-orange-600',
    bar: 'bg-linear-to-r from-orange-400 to-orange-600',
  },
  cyan: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-cyan-500 to-cyan-600',
    iconShadow: 'shadow-cyan-500/30',
    accent: 'text-cyan-600',
    bar: 'bg-linear-to-r from-cyan-400 to-cyan-600',
  },
  pink: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-pink-500 to-pink-600',
    iconShadow: 'shadow-pink-500/30',
    accent: 'text-pink-600',
    bar: 'bg-linear-to-r from-pink-400 to-pink-600',
  },
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  const config = colorConfig[color]

  return (
    <div
      className={`
        ${config.bg}
        relative overflow-hidden
        rounded-2xl border border-gray-100 p-4 sm:p-5
        shadow-sm hover:shadow-lg
        transform hover:-translate-y-1 hover:scale-[1.02]
        transition-all duration-300 ease-out
        cursor-default group
      `}
    >
      {/* Decorative gradient bar at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${config.bar}`} />

      <div className='flex items-start justify-between'>
        <div className='flex-1 min-w-0'>
          <p className='text-xs sm:text-sm font-medium text-gray-500 truncate uppercase tracking-wide'>
            {title}
          </p>
          <p className={`text-2xl sm:text-3xl font-bold ${config.accent} mt-2 tracking-tight`}>
            {value.toLocaleString()}
          </p>
        </div>
        <div
          className={`
            ${config.iconBg}
            p-2.5 sm:p-3 rounded-xl
            shadow-lg ${config.iconShadow}
            shrink-0 text-white
            group-hover:scale-110 transition-transform duration-300
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
