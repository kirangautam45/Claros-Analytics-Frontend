import { useEffect, useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from './useStore'
import {
  fetchPosts,
  setPostSearchQuery,
  clearPostError,
} from '../store/slices/postSlice'
import { useDebounce } from './useDebounce'

export function usePosts() {
  const dispatch = useAppDispatch()
  const { posts, loading, error, searchQuery } = useAppSelector(
    (state) => state.post
  )
  const { users } = useAppSelector((state) => state.user)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.title
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [posts, debouncedSearchQuery]
  )

  const getUserName = useCallback(
    (userId: number) => {
      const user = users.find((u) => u.id === userId)
      return user?.name ?? `User ${userId}`
    },
    [users]
  )

  const handleSearch = useCallback(
    (value: string) => {
      dispatch(setPostSearchQuery(value))
    },
    [dispatch]
  )

  const handleClearError = useCallback(() => {
    dispatch(clearPostError())
  }, [dispatch])

  const handleRetry = useCallback(() => {
    dispatch(clearPostError())
    dispatch(fetchPosts())
  }, [dispatch])

  return {
    posts,
    filteredPosts,
    searchTerm: searchQuery,
    isLoading: loading,
    error,
    getUserName,
    handleSearch,
    handleClearError,
    handleRetry,
  }
}
