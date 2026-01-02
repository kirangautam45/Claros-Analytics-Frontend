interface BarChartData {
  name: string
  value: number
}

interface SimpleBarChartProps {
  data: BarChartData[]
  title: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
  showRank?: boolean
  limit?: number
}

const colorConfig = {
  blue: {
    bar: 'bg-gradient-to-r from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
  },
  green: {
    bar: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  purple: {
    bar: 'bg-gradient-to-r from-purple-400 to-purple-600',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
  },
  orange: {
    bar: 'bg-gradient-to-r from-orange-400 to-orange-600',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
  },
}

export function SimpleBarChart({
  data,
  title,
  color = 'blue',
  showRank = true,
  limit,
}: SimpleBarChartProps) {
  const displayData = limit ? data.slice(0, limit) : data
  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const config = colorConfig[color]
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900'>
          {title}
        </h3>
        <span className='text-xs text-gray-400 font-medium'>
          Total: {total.toLocaleString()}
        </span>
      </div>
      <div className='space-y-3 max-h-80 overflow-y-auto pr-1'>
        {displayData.map((item, index) => {
          const percentage = Math.round((item.value / maxValue) * 100)
          return (
            <div
              key={index}
              className='group relative'
            >
              <div className='flex items-center gap-2 mb-1'>
                {showRank && (
                  <span
                    className={`
                      w-5 h-5 rounded-full text-xs font-bold
                      flex items-center justify-center
                      ${index === 0 ? config.bar + ' text-white' : 'bg-gray-100 text-gray-500'}
                    `}
                  >
                    {index + 1}
                  </span>
                )}
                <span className='text-xs sm:text-sm text-gray-700 font-medium truncate flex-1'>
                  {item.name}
                </span>
                <span className={`text-xs sm:text-sm font-bold ${config.text}`}>
                  {item.value.toLocaleString()}
                </span>
              </div>
              <div className={`h-2.5 ${config.bg} rounded-full overflow-hidden`}>
                <div
                  className={`
                    h-full ${config.bar} rounded-full
                    transition-all duration-500 ease-out
                    group-hover:opacity-80
                  `}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className='absolute -right-1 top-0 opacity-0 group-hover:opacity-100 transition-opacity'>
                <span className='text-[10px] text-gray-400'>{percentage}%</span>
              </div>
            </div>
          )
        })}
      </div>
      {data.length === 0 && (
        <div className='text-center text-gray-400 py-8 text-sm'>
          No data available
        </div>
      )}
    </div>
  )
}
