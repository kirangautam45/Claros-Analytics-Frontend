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
import { fetchTodos, clearTodoError } from '../store/slices/todoSlice'
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
  const { todos, loading: todoLoading, error: todoError } = useAppSelector((state) => state.todo)

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
    if (todos.length === 0) {
      dispatch(fetchTodos())
    }
  }, [dispatch, users.length, posts.length, comments.length, todos.length])

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

  // Dashboard stats
  const stats = useMemo(() => {
    const completedTodos = todos.filter((t) => t.completed).length
    return {
      totalUsers: users.length,
      totalPosts: posts.length,
      totalComments: comments.length,
      totalTodos: todos.length,
      completedTodos,
    }
  }, [users.length, posts.length, comments.length, todos])

  // Posts per user for chart
  const postsPerUser = useMemo(() => {
    const userPostCounts = users.map((user) => ({
      name: user.name.split(' ')[0], // First name only for chart
      posts: posts.filter((p) => p.userId === user.id).length,
    }))
    return userPostCounts.sort((a, b) => b.posts - a.posts)
  }, [users, posts])

  // Todo completion per user for chart
  const todoCompletionPerUser = useMemo(() => {
    const userTodoCounts = users.map((user) => {
      const userTodos = todos.filter((t) => t.userId === user.id)
      return {
        name: user.name.split(' ')[0],
        completed: userTodos.filter((t) => t.completed).length,
        total: userTodos.length,
      }
    })
    return userTodoCounts.sort((a, b) => b.completed - a.completed)
  }, [users, todos])

  // User activities for table
  const userActivities = useMemo(() => {
    return users.map((user) => {
      const userTodos = todos.filter((t) => t.userId === user.id)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        posts: posts.filter((p) => p.userId === user.id).length,
        comments: comments.filter((c) => {
          const post = posts.find((p) => p.id === c.postId)
          return post?.userId === user.id
        }).length,
        todos: userTodos.length,
        completedTodos: userTodos.filter((t) => t.completed).length,
      }
    })
  }, [users, posts, comments, todos])

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
    dispatch(clearTodoError())
  }, [dispatch])

  const handleRetry = useCallback(() => {
    dispatch(clearError())
    dispatch(clearPostError())
    dispatch(clearCommentError())
    dispatch(clearTodoError())
    dispatch(fetchUsers())
    dispatch(fetchPosts())
    dispatch(fetchComments())
    dispatch(fetchTodos())
  }, [dispatch])

  const handleCreatePost = useCallback(
    async (data: Omit<Post, 'id'>) => {
      return dispatch(createPost(data)).unwrap()
    },
    [dispatch]
  )

  const handleUpdatePost = useCallback(
    async (data: Post & { isLocal?: boolean }) => {
      return dispatch(updatePost({ id: data.id, post: data, isLocal: data.isLocal })).unwrap()
    },
    [dispatch]
  )

  const handleDeletePost = useCallback(
    async (id: number, isLocal?: boolean) => {
      return dispatch(deletePost({ id, isLocal })).unwrap()
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
    todos,
    stats,
    postsPerUser,
    todoCompletionPerUser,
    userActivities,
    searchTerm: searchQuery,
    postSearchTerm: postSearchQuery,
    commentSearchTerm: commentSearchQuery,
    isLoading: userLoading || postLoading || commentLoading || todoLoading,
    operationLoading,
    error: userError || postError || commentError || todoError,
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
