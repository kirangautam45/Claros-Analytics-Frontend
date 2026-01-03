import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
  color: 'teal' | 'cyan' | 'emerald' | 'amber' | 'slate'
}

const colorConfig = {
  teal: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-teal-500 to-teal-600',
    iconShadow: 'shadow-teal-500/30',
    accent: 'text-teal-600',
    bar: 'bg-linear-to-r from-teal-400 to-teal-600',
  },
  cyan: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-cyan-500 to-cyan-600',
    iconShadow: 'shadow-cyan-500/30',
    accent: 'text-cyan-600',
    bar: 'bg-linear-to-r from-cyan-400 to-cyan-600',
  },
  emerald: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-emerald-500 to-emerald-600',
    iconShadow: 'shadow-emerald-500/30',
    accent: 'text-emerald-600',
    bar: 'bg-linear-to-r from-emerald-400 to-emerald-600',
  },
  amber: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-amber-500 to-amber-600',
    iconShadow: 'shadow-amber-500/30',
    accent: 'text-amber-600',
    bar: 'bg-linear-to-r from-amber-400 to-amber-600',
  },
  slate: {
    bg: 'bg-white',
    iconBg: 'bg-linear-to-br from-slate-500 to-slate-600',
    iconShadow: 'shadow-slate-500/30',
    accent: 'text-slate-600',
    bar: 'bg-linear-to-r from-slate-400 to-slate-600',
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
