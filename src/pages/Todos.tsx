import { useEffect, useMemo, useState, useCallback } from 'react'
import { Header } from '@/components/Header'
import { SearchInput, Pagination } from '@/components/dashboard'
import { LoadingSpinner, ErrorMessage, Modal, ConfirmDialog } from '@/components/common'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  setTodoSearchQuery,
  setTodoFilter,
  clearTodoError,
} from '@/store/slices/todoSlice'
import { useDebounce } from '@/hooks/useDebounce'
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react'

type FilterType = 'all' | 'completed' | 'pending'

export function TodosPage() {
  const dispatch = useAppDispatch()
  const { todos, loading, operationLoading, error, searchQuery, filter } = useAppSelector(
    (state) => state.todo
  )
  const { users } = useAppSelector((state) => state.user)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<{ id: number; title: string; userId: number; completed: boolean } | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ title: '', userId: 1 })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchTodos())
    }
  }, [dispatch, todos.length])

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

  const handleOpenCreate = () => {
    setEditingTodo(null)
    setFormData({ title: '', userId: 1 })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (todo: { id: number; title: string; userId: number; completed: boolean }) => {
    setEditingTodo(todo)
    setFormData({ title: todo.title, userId: todo.userId })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    try {
      if (editingTodo) {
        await dispatch(
          updateTodo({
            id: editingTodo.id,
            todo: { ...formData, completed: editingTodo.completed },
          })
        ).unwrap()
      } else {
        await dispatch(
          createTodo({ ...formData, completed: false })
        ).unwrap()
      }
      setIsModalOpen(false)
    } catch {
      // Error handled by Redux
    }
  }

  const handleToggleComplete = async (todo: { id: number; completed: boolean }) => {
    await dispatch(
      updateTodo({
        id: todo.id,
        todo: { completed: !todo.completed },
      })
    )
  }

  const handleDelete = async () => {
    if (deleteId) {
      await dispatch(deleteTodo(deleteId))
      setDeleteId(null)
    }
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
      <div className="flex-1 p-6 overflow-auto">
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
            <div className="flex items-center gap-2">
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
              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Todo
              </button>
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedTodos.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
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
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                              todo.completed ? 'text-green-600' : 'text-orange-500'
                            }`}
                          >
                            {todo.completed ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Completed
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                Pending
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEdit(todo)}
                              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteId(todo.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTodo ? 'Edit Todo' : 'Add Todo'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign to User
            </label>
            <select
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {editingTodo && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="completed"
                checked={editingTodo.completed}
                onChange={() => handleToggleComplete(editingTodo)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="completed" className="text-sm text-gray-700">
                Mark as completed
              </label>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={operationLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {operationLoading ? 'Saving...' : editingTodo ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Todo"
        message="Are you sure you want to delete this todo? This action cannot be undone."
        confirmText="Delete"
        isLoading={operationLoading}
      />
    </div>
  )
}

export default TodosPage
