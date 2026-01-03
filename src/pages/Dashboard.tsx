import { useMemo } from 'react'
import {
  Users,
  FileText,
  MessageSquare,
  ClipboardList,
  CheckCircle,
} from 'lucide-react'
import { Header } from '@/components/Header'
import {
  StatCard,
  SimpleBarChart,
  ProgressRing,
  ActivityTable,
  DonutChart,
  DashboardHeader,
} from '@/components/dashboard'
import { LoadingSpinner, ErrorMessage } from '@/components/common'
import { useDashboard } from '@/hooks'

export function DashboardPage() {
  const {
    stats,
    userActivities,
    postsPerUser,
    todoCompletionPerUser,
    isLoading,
    error,
    handleClearError,
    handleRetry,
  } = useDashboard()

  // Donut chart data for todo status
  const todoStatusData = useMemo(() => {
    if (!stats) return []
    return [
      { label: 'Completed', value: stats.completedTodos, color: '#10b981' },
      {
        label: 'Pending',
        value: stats.totalTodos - stats.completedTodos,
        color: '#f59e0b',
      },
    ]
  }, [stats])

  if (isLoading) {
    return (
      <div className='flex flex-col h-screen'>
        <Header title='Dashboard' />
        <div className='flex-1 flex items-center justify-center bg-gray-50'>
          <LoadingSpinner size='lg' text='Loading dashboard data...' />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col h-screen'>
        <Header title='Dashboard' />
        <div className='flex-1 p-6 bg-gray-50'>
          <ErrorMessage
            error={error}
            onDismiss={handleClearError}
            onRetry={handleRetry}
          />
        </div>
      </div>
    )
  }

  const todoCompletionRate = stats
    ? Math.round((stats.completedTodos / stats.totalTodos) * 100)
    : 0

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header title='Dashboard' />
      <div className='flex-1 p-3 sm:p-6 overflow-auto'>
        <div className='max-w-7xl mx-auto space-y-4 sm:space-y-6'>
          {/* Dashboard Header with Welcome */}
          <DashboardHeader />

          {/* Stats Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4'>
            <StatCard
              title='Total Users'
              value={stats?.totalUsers || 0}
              icon={<Users className='w-5 h-5' />}
              color='cyan'
            />
            <StatCard
              title='Total Posts'
              value={stats?.totalPosts || 0}
              icon={<FileText className='w-5 h-5' />}
              color='sky'
            />
            <StatCard
              title='Comments'
              value={stats?.totalComments || 0}
              icon={<MessageSquare className='w-5 h-5' />}
              color='emerald'
            />
            <StatCard
              title='Total Todos'
              value={stats?.totalTodos || 0}
              icon={<ClipboardList className='w-5 h-5' />}
              color='amber'
            />
            <StatCard
              title='Completed'
              value={stats?.completedTodos || 0}
              icon={<CheckCircle className='w-5 h-5' />}
              color='slate'
            />
          </div>

          {/* Charts Row */}
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6'>
            {/* Posts per User Chart */}
            <SimpleBarChart
              data={postsPerUser.map((u) => ({ name: u.name, value: u.posts }))}
              title='Top Users by Posts'
              color='cyan'
            />

            {/* Todo Completion Rate */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-4'>
                Todo Completion Rate
              </h3>
              <div className='flex flex-col items-center'>
                <ProgressRing
                  percentage={todoCompletionRate}
                  size={160}
                  mobileSize={120}
                  label='Overall'
                />
                <div className='mt-4 flex gap-4 text-xs sm:text-sm'>
                  <span className='flex items-center gap-1.5'>
                    <span className='w-2.5 h-2.5 rounded-full bg-emerald-500' />
                    <span className='text-gray-600'>
                      {stats?.completedTodos} done
                    </span>
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <span className='w-2.5 h-2.5 rounded-full bg-amber-500' />
                    <span className='text-gray-600'>
                      {(stats?.totalTodos || 0) - (stats?.completedTodos || 0)}{' '}
                      pending
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Todo Status Donut Chart */}
            <DonutChart
              data={todoStatusData}
              title='Todo Distribution'
              centerValue={stats?.totalTodos || 0}
              centerLabel='Total Todos'
            />

            {/* Todos by User */}
            <SimpleBarChart
              data={todoCompletionPerUser.map((u) => ({
                name: u.name,
                value: u.completed,
              }))}
              title='Top Users by Completions'
              color='sky'
            />
          </div>

          {/* Activity Table */}
          <ActivityTable activities={userActivities} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
