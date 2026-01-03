import { Trophy, Award, Medal } from 'lucide-react'

interface BarChartData {
  name: string
  value: number
}

interface SimpleBarChartProps {
  data: BarChartData[]
  title: string
  color?: 'cyan' | 'sky' | 'emerald'
  showRank?: boolean
  limit?: number
}

const colorConfig = {
  cyan: {
    bar: 'bg-linear-to-r from-cyan-400 via-cyan-500 to-cyan-600',
    bg: 'bg-cyan-100/50',
    text: 'text-cyan-600',
    badge: 'bg-cyan-500',
    glow: 'shadow-cyan-500/20',
  },
  sky: {
    bar: 'bg-linear-to-r from-sky-400 via-sky-500 to-sky-600',
    bg: 'bg-sky-100/50',
    text: 'text-sky-600',
    badge: 'bg-sky-500',
    glow: 'shadow-sky-500/20',
  },
  emerald: {
    bar: 'bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600',
    bg: 'bg-emerald-100/50',
    text: 'text-emerald-600',
    badge: 'bg-emerald-500',
    glow: 'shadow-emerald-500/20',
  },
}

const getRankIcon = (index: number) => {
  if (index === 0) return <Trophy className='w-3.5 h-3.5 text-yellow-500' />
  if (index === 1) return <Award className='w-3.5 h-3.5 text-gray-400' />
  if (index === 2) return <Medal className='w-3.5 h-3.5 text-amber-600' />
  return null
}

export function SimpleBarChart({
  data,
  title,
  color = 'cyan',
  showRank = true,
  limit = 5,
}: SimpleBarChartProps) {
  const displayData = data.slice(0, limit)
  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const config = colorConfig[color]
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-lg ${config.glow} transition-all duration-300`}>
      <div className='flex items-center justify-between mb-5'>
        <h3 className='text-base sm:text-lg font-bold text-gray-900'>
          {title}
        </h3>
        <span className={`text-xs ${config.text} font-semibold px-2.5 py-1 rounded-full ${config.bg}`}>
          {total.toLocaleString()} total
        </span>
      </div>
      <div className='space-y-4'>
        {displayData.map((item, index) => {
          const percentage = Math.round((item.value / maxValue) * 100)
          const rankIcon = getRankIcon(index)
          return (
            <div
              key={index}
              className='group'
            >
              <div className='flex items-center gap-2.5 mb-2'>
                {showRank && (
                  <div
                    className={`
                      w-6 h-6 rounded-lg text-xs font-bold
                      flex items-center justify-center shrink-0
                      ${index < 3 ? 'bg-gray-50' : 'bg-gray-100 text-gray-500'}
                    `}
                  >
                    {rankIcon || (index + 1)}
                  </div>
                )}
                <span className='text-sm text-gray-700 font-medium truncate flex-1'>
                  {item.name}
                </span>
                <span className={`text-sm font-bold ${config.text} tabular-nums`}>
                  {item.value.toLocaleString()}
                </span>
              </div>
              <div className={`h-3 ${config.bg} rounded-full overflow-hidden`}>
                <div
                  className={`
                    h-full ${config.bar} rounded-full
                    transition-all duration-700 ease-out
                    group-hover:brightness-110
                  `}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
      {data.length === 0 && (
        <div className='text-center text-gray-400 py-10 text-sm'>
          No data available
        </div>
      )}
    </div>
  )
}
