import { useEffect, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchUsers, setSearchQuery, clearError } from '../store/slices/userSlice'

export function useDashboard() {
  const dispatch = useAppDispatch()
  const { users, loading, error, searchQuery } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = useCallback(
    (value: string) => {
      dispatch(setSearchQuery(value))
    },
    [dispatch]
  )

  const handleClearError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleRetry = useCallback(() => {
    dispatch(clearError())
    dispatch(fetchUsers())
  }, [dispatch])

  return {
    users,
    filteredUsers,
    searchTerm: searchQuery,
    isLoading: loading,
    error,
    handleSearch,
    handleClearError,
    handleRetry,
  }
}
