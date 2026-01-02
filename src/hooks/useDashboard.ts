import { useEffect, useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from './useStore'
import { fetchUsers, setSearchQuery, clearError } from '../store/slices/userSlice'
import {
  fetchPosts,
  setPostSearchQuery,
  clearPostError,
  createPost,
  updatePost,
  deletePost,
} from '../store/slices/postSlice'
import {
  fetchComments,
  setCommentSearchQuery,
  clearCommentError,
} from '../store/slices/commentSlice'
import type { Post } from '../@types'
import { useDebounce } from './useDebounce'

export function useDashboard() {
  const dispatch = useAppDispatch()
  const { users, loading: userLoading, error: userError, searchQuery } = useAppSelector((state) => state.user)
  const {
    posts,
    loading: postLoading,
    operationLoading,
    error: postError,
    searchQuery: postSearchQuery,
  } = useAppSelector((state) => state.post)
  const {
    comments,
    loading: commentLoading,
    error: commentError,
    searchQuery: commentSearchQuery,
  } = useAppSelector((state) => state.comment)

  const debouncedUserSearch = useDebounce(searchQuery, 300)
  const debouncedPostSearch = useDebounce(postSearchQuery, 300)
  const debouncedCommentSearch = useDebounce(commentSearchQuery, 300)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
    if (posts.length === 0) {
      dispatch(fetchPosts())
    }
    if (comments.length === 0) {
      dispatch(fetchComments())
    }
  }, [dispatch, users.length, posts.length, comments.length])

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(debouncedUserSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedUserSearch.toLowerCase()) ||
          user.username.toLowerCase().includes(debouncedUserSearch.toLowerCase())
      ),
    [users, debouncedUserSearch]
  )

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(debouncedPostSearch.toLowerCase()) ||
          post.body.toLowerCase().includes(debouncedPostSearch.toLowerCase())
      ),
    [posts, debouncedPostSearch]
  )

  const filteredComments = useMemo(
    () =>
      comments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(debouncedCommentSearch.toLowerCase()) ||
          comment.email.toLowerCase().includes(debouncedCommentSearch.toLowerCase()) ||
          comment.body.toLowerCase().includes(debouncedCommentSearch.toLowerCase())
      ),
    [comments, debouncedCommentSearch]
  )

  const handleSearch = useCallback(
    (value: string) => {
      dispatch(setSearchQuery(value))
    },
    [dispatch]
  )

  const handlePostSearch = useCallback(
    (value: string) => {
      dispatch(setPostSearchQuery(value))
    },
    [dispatch]
  )

  const handleCommentSearch = useCallback(
    (value: string) => {
      dispatch(setCommentSearchQuery(value))
    },
    [dispatch]
  )

  const handleClearError = useCallback(() => {
    dispatch(clearError())
    dispatch(clearPostError())
    dispatch(clearCommentError())
  }, [dispatch])

  const handleRetry = useCallback(() => {
    dispatch(clearError())
    dispatch(clearPostError())
    dispatch(clearCommentError())
    dispatch(fetchUsers())
    dispatch(fetchPosts())
    dispatch(fetchComments())
  }, [dispatch])

  const handleCreatePost = useCallback(
    async (data: Omit<Post, 'id'>) => {
      return dispatch(createPost(data)).unwrap()
    },
    [dispatch]
  )

  const handleUpdatePost = useCallback(
    async (data: Post) => {
      return dispatch(updatePost({ id: data.id, post: data })).unwrap()
    },
    [dispatch]
  )

  const handleDeletePost = useCallback(
    async (id: number) => {
      return dispatch(deletePost(id)).unwrap()
    },
    [dispatch]
  )

  return {
    users,
    filteredUsers,
    posts,
    filteredPosts,
    comments,
    filteredComments,
    searchTerm: searchQuery,
    postSearchTerm: postSearchQuery,
    commentSearchTerm: commentSearchQuery,
    isLoading: userLoading || postLoading || commentLoading,
    operationLoading,
    error: userError || postError || commentError,
    handleSearch,
    handlePostSearch,
    handleCommentSearch,
    handleClearError,
    handleRetry,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
  }
}
