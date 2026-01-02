interface DonutChartData {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  data: DonutChartData[]
  title: string
  size?: number
  mobileSize?: number
  strokeWidth?: number
  centerLabel?: string
  centerValue?: string | number
}

export function DonutChart({
  data,
  title,
  size = 180,
  mobileSize = 140,
  strokeWidth = 24,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const calculateSegments = (chartSize: number, chartStrokeWidth: number) => {
    const radius = (chartSize - chartStrokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    let accumulatedOffset = 0

    return data.map((item) => {
      const percentage = total > 0 ? (item.value / total) * 100 : 0
      const segmentLength = (percentage / 100) * circumference
      const offset = accumulatedOffset
      accumulatedOffset += segmentLength

      return {
        ...item,
        percentage,
        strokeDasharray: `${segmentLength} ${circumference - segmentLength}`,
        strokeDashoffset: -offset,
        radius,
        circumference,
      }
    })
  }

  const desktopSegments = calculateSegments(size, strokeWidth)
  const mobileSegments = calculateSegments(mobileSize, strokeWidth - 4)

  const renderChart = (
    chartSize: number,
    chartStrokeWidth: number,
    segments: ReturnType<typeof calculateSegments>,
    idSuffix: string
  ) => (
    <svg width={chartSize} height={chartSize} className='transform -rotate-90'>
      <defs>
        {data.map((item, index) => (
          <linearGradient
            key={`gradient-${idSuffix}-${index}`}
            id={`donutGradient-${idSuffix}-${index}`}
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
          >
            <stop offset='0%' stopColor={item.color} stopOpacity='0.8' />
            <stop offset='100%' stopColor={item.color} stopOpacity='1' />
          </linearGradient>
        ))}
      </defs>
      {/* Background circle */}
      <circle
        cx={chartSize / 2}
        cy={chartSize / 2}
        r={segments[0]?.radius || (chartSize - chartStrokeWidth) / 2}
        stroke='#f3f4f6'
        strokeWidth={chartStrokeWidth}
        fill='none'
      />
      {/* Segments */}
      {segments.map((segment, index) => (
        <circle
          key={index}
          cx={chartSize / 2}
          cy={chartSize / 2}
          r={segment.radius}
          stroke={`url(#donutGradient-${idSuffix}-${index})`}
          strokeWidth={chartStrokeWidth}
          fill='none'
          strokeDasharray={segment.strokeDasharray}
          strokeDashoffset={segment.strokeDashoffset}
          className='transition-all duration-700 ease-out'
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
          }}
        />
      ))}
    </svg>
  )

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200'>
      <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-4'>
        {title}
      </h3>

      <div className='flex flex-col items-center'>
        {/* Desktop chart */}
        <div className='hidden sm:block relative'>
          {renderChart(size, strokeWidth, desktopSegments, 'desktop')}
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            {centerValue !== undefined && (
              <span className='text-3xl font-bold text-gray-900'>
                {typeof centerValue === 'number'
                  ? centerValue.toLocaleString()
                  : centerValue}
              </span>
            )}
            {centerLabel && (
              <span className='text-xs text-gray-500 font-medium'>
                {centerLabel}
              </span>
            )}
          </div>
        </div>

        {/* Mobile chart */}
        <div className='sm:hidden relative'>
          {renderChart(mobileSize, strokeWidth - 4, mobileSegments, 'mobile')}
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            {centerValue !== undefined && (
              <span className='text-2xl font-bold text-gray-900'>
                {typeof centerValue === 'number'
                  ? centerValue.toLocaleString()
                  : centerValue}
              </span>
            )}
            {centerLabel && (
              <span className='text-[10px] text-gray-500'>{centerLabel}</span>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className='mt-4 grid grid-cols-2 gap-2 w-full'>
          {data.map((item, index) => (
            <div key={index} className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full shrink-0'
                style={{ backgroundColor: item.color }}
              />
              <span className='text-xs text-gray-600 truncate'>{item.label}</span>
              <span className='text-xs font-semibold text-gray-900 ml-auto'>
                {total > 0 ? Math.round((item.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
