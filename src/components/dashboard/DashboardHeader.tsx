import { Calendar, Clock, Sparkles, TrendingUp } from 'lucide-react'

export function DashboardHeader() {
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

  const now = new Date()

  return (
    <div className='relative overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-5 sm:p-8 shadow-xl'>
      {/* Animated background shapes */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse' />
        <div className='absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-700' />
        <div className='absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full blur-xl' />
      </div>

      <div className='relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <Sparkles className='w-5 h-5 text-yellow-300 animate-pulse' />
            <span className='text-xs font-medium text-white/80 uppercase tracking-wider'>
              Analytics Dashboard
            </span>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-white tracking-tight'>
            {getGreeting()}!
          </h1>
          <p className='text-white/70 text-sm sm:text-base mt-2 max-w-md'>
            Here&apos;s what&apos;s happening with your analytics today
          </p>
          <div className='flex flex-wrap items-center gap-3 sm:gap-4 mt-4'>
            <span className='flex items-center gap-1.5 text-xs sm:text-sm text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm'>
              <Calendar className='w-3.5 h-3.5' />
              {formatDate(now)}
            </span>
            <span className='flex items-center gap-1.5 text-xs sm:text-sm text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm'>
              <Clock className='w-3.5 h-3.5' />
              {formatTime(now)}
            </span>
          </div>
        </div>

        {/* Stats preview card */}
        <div className='hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20'>
          <div className='p-3 bg-white/20 rounded-lg'>
            <TrendingUp className='w-6 h-6 text-white' />
          </div>
          <div>
            <p className='text-white/70 text-xs font-medium'>Activity Status</p>
            <p className='text-white text-lg font-bold'>All Systems Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}
