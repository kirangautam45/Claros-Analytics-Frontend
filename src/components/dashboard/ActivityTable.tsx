import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Trophy, Medal } from 'lucide-react'

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
      return (
        <span className='text-gray-300 ml-1'>
          <ChevronUp className='w-3 h-3' />
        </span>
      )
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className='w-3 h-3 text-blue-500 ml-1' />
    ) : (
      <ChevronDown className='w-3 h-3 text-blue-500 ml-1' />
    )
  }

  const getRankBadge = (index: number) => {
    if (index === 0)
      return (
        <Trophy className='w-4 h-4 text-yellow-500' />
      )
    if (index === 1)
      return (
        <Medal className='w-4 h-4 text-gray-400' />
      )
    if (index === 2)
      return (
        <Medal className='w-4 h-4 text-amber-600' />
      )
    return null
  }

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200'>
      <div className='px-4 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50'>
        <div className='flex items-center justify-between'>
          <h3 className='text-base sm:text-lg font-semibold text-gray-900'>
            User Activity Overview
          </h3>
          <span className='text-xs text-gray-400'>
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
                  return 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                if (completionRate >= 40)
                  return 'bg-gradient-to-r from-amber-400 to-amber-500'
                return 'bg-gradient-to-r from-red-400 to-red-500'
              }

              return (
                <tr
                  key={activity.id}
                  className='hover:bg-blue-50/50 transition-colors group'
                >
                  <td className='px-4 sm:px-6 py-4'>
                    <div className='flex items-center justify-center w-6 h-6'>
                      {getRankBadge(index) || (
                        <span className='text-xs text-gray-400 font-medium'>
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className='px-4 sm:px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div
                        className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600
                          flex items-center justify-center text-white text-sm font-semibold shrink-0'
                      >
                        {activity.name.charAt(0)}
                      </div>
                      <span className='text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors'>
                        {activity.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-4 sm:px-6 py-4 hidden sm:table-cell'>
                    <span className='text-sm text-gray-500'>{activity.email}</span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-center'>
                    <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700'>
                      {activity.posts}
                    </span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-center hidden md:table-cell'>
                    <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700'>
                      {activity.comments}
                    </span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 text-center'>
                    <span className='text-sm font-medium text-gray-700'>
                      <span className='text-emerald-600'>{activity.completedTodos}</span>
                      <span className='text-gray-400'>/</span>
                      <span>{activity.todos}</span>
                    </span>
                  </td>
                  <td className='px-4 sm:px-6 py-4 hidden sm:table-cell'>
                    <div className='flex items-center gap-2'>
                      <div className='flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden'>
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-semibold w-10 text-right ${
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
