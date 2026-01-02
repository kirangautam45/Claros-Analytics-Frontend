import { useState } from 'react'
import { RefreshCw, Calendar, Clock } from 'lucide-react'

interface DashboardHeaderProps {
  onRefresh: () => void
  isLoading?: boolean
}

export function DashboardHeader({
  onRefresh,
  isLoading,
}: DashboardHeaderProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleRefresh = () => {
    onRefresh()
    setLastUpdated(new Date())
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className='bg-linear-to-r from-slate-800 to-slate-900 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-xl sm:text-2xl font-bold text-white'>
            {getGreeting()}! 👋
          </h1>
          <p className='text-slate-300 text-sm mt-1'>
            Here&apos;s what&apos;s happening with your analytics today
          </p>
          <div className='flex items-center gap-4 mt-3 text-xs text-slate-400'>
            <span className='flex items-center gap-1'>
              <Calendar className='w-3.5 h-3.5' />
              {formatDate(new Date())}
            </span>
            <span className='flex items-center gap-1'>
              <Clock className='w-3.5 h-3.5' />
              {formatTime(lastUpdated)}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='text-right hidden sm:block'>
            <p className='text-[10px] text-slate-400 uppercase tracking-wide'>
              Last updated
            </p>
            <p className='text-sm text-slate-200 font-medium'>
              {formatTime(lastUpdated)}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className={`
              flex items-center gap-2 px-4 py-2.5
              bg-white/10 hover:bg-white/20
              text-white rounded-lg
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              border border-white/10
            `}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            <span className='text-sm font-medium'>
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
