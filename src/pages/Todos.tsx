import { useEffect, useMemo, useState, useCallback } from 'react'
import { Header } from '@/components/Header'
import { SearchInput, Pagination } from '@/components/dashboard'
import { LoadingSpinner, ErrorMessage } from '@/components/common'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  fetchTodos,
  setTodoSearchQuery,
  setTodoFilter,
  clearTodoError,
} from '@/store/slices/todoSlice'
import { fetchUsers } from '@/store/slices/userSlice'
import { useDebounce } from '@/hooks/useDebounce'
import { CheckCircle2, XCircle } from 'lucide-react'

type FilterType = 'all' | 'completed' | 'pending'

export function TodosPage() {
  const dispatch = useAppDispatch()
  const { todos, loading, error, searchQuery, filter } = useAppSelector(
    (state) => state.todo
  )
  const { users } = useAppSelector((state) => state.user)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchTodos())
    }
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
  }, [dispatch, todos.length, users.length])

  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const pending = total - completed
    return { total, completed, pending }
  }, [todos])

  const filteredTodos = useMemo(() => {
    let result = todos

    if (filter === 'completed') {
      result = result.filter((t) => t.completed)
    } else if (filter === 'pending') {
      result = result.filter((t) => !t.completed)
    }

    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase()
      result = result.filter((t) => {
        const user = users.find((u) => u.id === t.userId)
        return (
          t.title.toLowerCase().includes(search) ||
          user?.name.toLowerCase().includes(search)
        )
      })
    }

    return result
  }, [todos, filter, debouncedSearch, users])

  const paginatedTodos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredTodos.slice(start, start + itemsPerPage)
  }, [filteredTodos, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage)

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    return user?.name || `User ${userId}`
  }

  const handleSearch = useCallback(
    (value: string) => {
      dispatch(setTodoSearchQuery(value))
      setCurrentPage(1)
    },
    [dispatch]
  )

  const handleFilterChange = (newFilter: FilterType) => {
    dispatch(setTodoFilter(newFilter))
    setCurrentPage(1)
  }

  const handleClearError = () => {
    dispatch(clearTodoError())
  }

  const handleRetry = () => {
    dispatch(clearTodoError())
    dispatch(fetchTodos())
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Todos" />
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
              <p className="text-3xl font-bold text-green-500">{stats.completed}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
              <p className="text-3xl font-bold text-orange-500">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search todos..."
            />
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              {(['all', 'completed', 'pending'] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    filter === f
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Error State */}
          {error && (
            <ErrorMessage
              error={error}
              onDismiss={handleClearError}
              onRetry={handleRetry}
            />
          )}

          {/* Loading State */}
          {loading && <LoadingSpinner size="lg" text="Loading todos..." />}

          {/* Table */}
          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-36">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedTodos.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        No todos found
                      </td>
                    </tr>
                  ) : (
                    paginatedTodos.map((todo) => (
                      <tr key={todo.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-500">{todo.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {getUserName(todo.userId)}
                        </td>
                        <td className={`px-6 py-4 text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                          {todo.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                              todo.completed ? 'text-green-600' : 'text-orange-500'
                            }`}
                          >
                            {todo.completed ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Completed</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                <span className="hidden sm:inline">Pending</span>
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredTodos.length}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(value) => {
                  setItemsPerPage(value)
                  setCurrentPage(1)
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodosPage
