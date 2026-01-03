import { useState, useMemo } from 'react'
import {
  ChevronUp,
  ChevronDown,
  Trophy,
  Medal,
  Users,
  ArrowUpDown,
} from 'lucide-react'

interface UserActivity {
  id: number
  name: string
  email: string
  posts: number
  comments: number
  todos: number
  completedTodos: number
}

interface ActivityTableProps {
  activities: UserActivity[]
}

type SortKey = 'name' | 'posts' | 'comments' | 'todos' | 'completionRate'
type SortDirection = 'asc' | 'desc'

export function ActivityTable({ activities }: ActivityTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('posts')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) => {
      let aValue: number | string
      let bValue: number | string

      if (sortKey === 'name') {
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
      } else if (sortKey === 'completionRate') {
        aValue = a.todos > 0 ? a.completedTodos / a.todos : 0
        bValue = b.todos > 0 ? b.completedTodos / b.todos : 0
      } else {
        aValue = a[sortKey]
        bValue = b[sortKey]
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [activities, sortKey, sortDirection])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('desc')
    }
  }

  const renderSortIcon = (columnKey: SortKey) => {
    if (sortKey !== columnKey) {
      return <ArrowUpDown className='w-3 h-3 text-gray-300 ml-1' />
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className='w-3.5 h-3.5 text-cyan-500 ml-1' />
    ) : (
      <ChevronDown className='w-3.5 h-3.5 text-cyan-500 ml-1' />
    )
  }

  const getRankBadge = (index: number) => {
    if (index === 0)
      return (
        <div className='w-6 h-6 rounded-full bg-linear-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-sm'>
          <Trophy className='w-3.5 h-3.5 text-white' />
        </div>
      )
    if (index === 1)
      return (
        <div className='w-6 h-6 rounded-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-sm'>
          <Medal className='w-3.5 h-3.5 text-white' />
        </div>
      )
    if (index === 2)
      return (
        <div className='w-6 h-6 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-sm'>
          <Medal className='w-3.5 h-3.5 text-white' />
        </div>
      )
    return null
  }

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300'>
      <div className='px-5 sm:px-6 py-5 border-b border-gray-100 bg-linear-to-r from-cyan-50 via-cyan-50 to-sky-50'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2.5 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg shadow-cyan-500/20'>
              <Users className='w-5 h-5 text-white' />
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900'>
                User Activity Overview
              </h3>
              <p className='text-xs text-gray-500 mt-0.5'>
                Track user engagement and progress
              </p>
            </div>
          </div>
          <span className='text-xs font-semibold text-cyan-600 bg-cyan-100 px-3 py-1.5 rounded-full'>
            {activities.length} users
          </span>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50/50 border-b border-gray-100'>
            <tr>
              <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-8'>
                #
              </th>
              <th
                className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors'
                onClick={() => handleSort('name')}
              >
                <span className='flex items-center'>
                  User
                  {renderSortIcon('name')}
                </span>
              </th>
              <th className='px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell'>
                Email
              </th>
              <th
                className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors'
                onClick={() => handleSort('posts')}
              >
                <span className='flex items-center justify-center'>
                  Posts
                  {renderSortIcon('posts')}
                </span>
              </th>
              <th
                className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell cursor-pointer hover:text-gray-700 transition-colors'
                onClick={() => handleSort('comments')}
              >
                <span className='flex items-center justify-center'>
                  Comments
                  {renderSortIcon('comments')}
                </span>
              </th>
              <th
                className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors'
                onClick={() => handleSort('todos')}
              >
                <span className='flex items-center justify-center'>
                  Todos
                  {renderSortIcon('todos')}
                </span>
              </th>
              <th
                className='px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:text-gray-700 transition-colors'
                onClick={() => handleSort('completionRate')}
              >
                <span className='flex items-center justify-center'>
                  Progress
                  {renderSortIcon('completionRate')}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-50'>
            {sortedActivities.map((activity, index) => {
              const completionRate =
                activity.todos > 0
                  ? Math.round((activity.completedTodos / activity.todos) * 100)
                  : 0

              const getProgressColor = () => {
                if (completionRate >= 70)
                  return 'bg-linear-to-r from-emerald-400 to-emerald-500'
                if (completionRate >= 40)
                  return 'bg-linear-to-r from-amber-400 to-amber-500'
                return 'bg-linear-to-r from-red-400 to-red-500'
              }

              return (
                <tr
                  key={activity.id}
                  className='hover:bg-cyan-50/50 transition-all duration-200 group'
                >
                  <td className='px-4 sm:px-6 py-4'>
                    <div className='flex items-center justify-center'>
                      {getRankBadge(index) || (
                        <span className='w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-semibold'>
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className='px-4 sm:px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div
                        className='w-9 h-9 rounded-xl bg-linear-to-br from-cyan-400 to-cyan-600
                          flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm'
                      >
                        {activity.name.charAt(0)}
                      </div>
                      <span className='text-sm font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors'>
                        {activity.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-4 sm:px-6 py-4 hidden sm:table-cell'>
                    <span className='text-sm text-gray-500'>
                      {activity.email}
                    </span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-center'>
                    <span className='inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-100 text-cyan-700'>
                      {activity.posts}
                    </span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-center hidden md:table-cell'>
                    <span className='inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-100 text-cyan-700'>
                      {activity.comments}
                    </span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-center'>
                    <span className='text-sm font-semibold text-gray-700'>
                      <span className='text-emerald-600'>
                        {activity.completedTodos}
                      </span>
                      <span className='text-gray-300 mx-0.5'>/</span>
                      <span>{activity.todos}</span>
                    </span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 hidden sm:table-cell'>
                    <div className='flex items-center gap-3'>
                      <div className='flex-1 h-2 bg-gray-100 rounded-full overflow-hidden'>
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${getProgressColor()}`}
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold w-10 text-right ${
                          completionRate >= 70
                            ? 'text-emerald-600'
                            : completionRate >= 40
                            ? 'text-amber-600'
                            : 'text-red-500'
                        }`}
                      >
                        {completionRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {activities.length === 0 && (
        <div className='text-center py-12 text-gray-400'>
          No activity data available
        </div>
      )}
    </div>
  )
}
