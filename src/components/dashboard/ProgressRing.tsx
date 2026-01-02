interface ProgressRingProps {
  percentage: number
  size?: number
  mobileSize?: number
  strokeWidth?: number
  label?: string
  showGlow?: boolean
}

export function ProgressRing({
  percentage,
  size = 160,
  mobileSize = 120,
  strokeWidth = 12,
  label,
  showGlow = true,
}: ProgressRingProps) {
  const normalizedPercentage = Math.min(100, Math.max(0, percentage))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset =
    circumference - (normalizedPercentage / 100) * circumference

  const mobileRadius = (mobileSize - strokeWidth) / 2
  const mobileCircumference = mobileRadius * 2 * Math.PI
  const mobileStrokeDashoffset =
    mobileCircumference - (normalizedPercentage / 100) * mobileCircumference

  const getColor = () => {
    if (normalizedPercentage >= 70) return { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.3)' }
    if (normalizedPercentage >= 40) return { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)' }
    return { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)' }
  }

  const color = getColor()

  const getStatusText = () => {
    if (normalizedPercentage >= 70) return 'Excellent'
    if (normalizedPercentage >= 40) return 'Good'
    return 'Needs Attention'
  }

  return (
    <div className='flex flex-col items-center'>
      {/* Desktop version */}
      <div className='hidden sm:block relative'>
        <svg width={size} height={size} className='transform -rotate-90'>
          <defs>
            <linearGradient id='progressGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor={color.stroke} stopOpacity='0.8' />
              <stop offset='100%' stopColor={color.stroke} stopOpacity='1' />
            </linearGradient>
            {showGlow && (
              <filter id='glow'>
                <feGaussianBlur stdDeviation='3' result='coloredBlur' />
                <feMerge>
                  <feMergeNode in='coloredBlur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
            )}
          </defs>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke='#f3f4f6'
            strokeWidth={strokeWidth}
            fill='none'
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke='url(#progressGradient)'
            strokeWidth={strokeWidth}
            fill='none'
            strokeLinecap='round'
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className='transition-all duration-700 ease-out'
            filter={showGlow ? 'url(#glow)' : undefined}
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span
            className='text-4xl font-bold'
            style={{ color: color.stroke }}
          >
            {normalizedPercentage}%
          </span>
          {label && (
            <span className='text-xs text-gray-500 mt-1 font-medium'>{label}</span>
          )}
          <span
            className='text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full'
            style={{
              backgroundColor: color.glow,
              color: color.stroke,
            }}
          >
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Mobile version */}
      <div className='sm:hidden relative'>
        <svg
          width={mobileSize}
          height={mobileSize}
          className='transform -rotate-90'
        >
          <defs>
            <linearGradient id='progressGradientMobile' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor={color.stroke} stopOpacity='0.8' />
              <stop offset='100%' stopColor={color.stroke} stopOpacity='1' />
            </linearGradient>
          </defs>
          <circle
            cx={mobileSize / 2}
            cy={mobileSize / 2}
            r={mobileRadius}
            stroke='#f3f4f6'
            strokeWidth={strokeWidth - 2}
            fill='none'
          />
          <circle
            cx={mobileSize / 2}
            cy={mobileSize / 2}
            r={mobileRadius}
            stroke='url(#progressGradientMobile)'
            strokeWidth={strokeWidth - 2}
            fill='none'
            strokeLinecap='round'
            strokeDasharray={mobileCircumference}
            strokeDashoffset={mobileStrokeDashoffset}
            className='transition-all duration-700 ease-out'
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span
            className='text-2xl font-bold'
            style={{ color: color.stroke }}
          >
            {normalizedPercentage}%
          </span>
          {label && (
            <span className='text-[10px] text-gray-500 mt-1'>{label}</span>
          )}
        </div>
      </div>
    </div>
  )
}
