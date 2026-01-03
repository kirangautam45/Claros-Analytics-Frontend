import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { AxiosResponse } from 'axios'
import { configureStore } from '@reduxjs/toolkit'
import postReducer, {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  clearPostError,
  setPostSearchQuery,
} from '../postSlice'
import { postApi } from '../../../api/postApi'
import type { Post } from '../../../@types/post'

const mockAxiosResponse = <T>(data: T): AxiosResponse<T> =>
  ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: {} },
  } as AxiosResponse<T>)

// Mock the API
vi.mock('../../../api/postApi', () => ({
  postApi: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

const mockPosts: Post[] = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
]

interface PostState {
  posts: Post[]
  selectedPost: Post | null
  loading: boolean
  operationLoading: boolean
  error: string | null
  searchQuery: string
}

const createTestStore = (preloadedPostState?: Partial<PostState>) =>
  configureStore({
    reducer: { post: postReducer },
    preloadedState: preloadedPostState
      ? {
          post: {
            posts: [],
            selectedPost: null,
            loading: false,
            operationLoading: false,
            error: null,
            searchQuery: '',
            ...preloadedPostState,
          },
        }
      : undefined,
  })

type TestStore = ReturnType<typeof createTestStore>

describe('postSlice', () => {
  let store: TestStore

  beforeEach(() => {
    vi.clearAllMocks()
    store = createTestStore()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().post
      expect(state.posts).toEqual([])
      expect(state.loading).toBe(false)
      expect(state.operationLoading).toBe(false)
      expect(state.error).toBeNull()
      expect(state.searchQuery).toBe('')
    })
  })

  describe('reducers', () => {
    it('should handle clearPostError', () => {
      store = createTestStore({ error: 'Some error' })

      store.dispatch(clearPostError())
      expect(store.getState().post.error).toBeNull()
    })

    it('should handle setPostSearchQuery', () => {
      store.dispatch(setPostSearchQuery('test query'))
      expect(store.getState().post.searchQuery).toBe('test query')
    })
  })

  describe('fetchPosts async thunk', () => {
    it('should handle pending state', () => {
      const action = { type: fetchPosts.pending.type }
      const state = postReducer(undefined, action)

      expect(state.loading).toBe(true)
      expect(state.error).toBeNull()
    })

    it('should handle fulfilled state', async () => {
      vi.mocked(postApi.getAll).mockResolvedValue(mockAxiosResponse(mockPosts))

      await store.dispatch(fetchPosts())

      const state = store.getState().post
      expect(state.loading).toBe(false)
      expect(state.posts).toEqual(mockPosts)
      expect(state.error).toBeNull()
    })

    it('should handle rejected state with API error', async () => {
      const errorMessage = 'Network Error'
      vi.mocked(postApi.getAll).mockRejectedValue(new Error(errorMessage))

      await store.dispatch(fetchPosts())

      const state = store.getState().post
      expect(state.loading).toBe(false)
      expect(state.error).toBe(errorMessage)
    })

    it('should handle rejected state with default error message', async () => {
      vi.mocked(postApi.getAll).mockRejectedValue({})

      await store.dispatch(fetchPosts())

      const state = store.getState().post
      expect(state.error).toBe('Failed to fetch posts')
    })
  })

  describe('createPost async thunk', () => {
    const newPost = { userId: 1, title: 'New Post', body: 'New Body' }

    it('should handle pending state', () => {
      const action = { type: createPost.pending.type }
      const state = postReducer(undefined, action)

      expect(state.operationLoading).toBe(true)
      expect(state.error).toBeNull()
    })

    it('should handle fulfilled state', async () => {
      const createdPost = { id: 3, ...newPost }
      vi.mocked(postApi.create).mockResolvedValue(mockAxiosResponse(createdPost))

      await store.dispatch(createPost(newPost))

      const state = store.getState().post
      expect(state.operationLoading).toBe(false)
      expect(state.posts[0]).toEqual(createdPost)
    })

    it('should handle rejected state', async () => {
      vi.mocked(postApi.create).mockRejectedValue(new Error('Create failed'))

      await store.dispatch(createPost(newPost))

      const state = store.getState().post
      expect(state.operationLoading).toBe(false)
      expect(state.error).toBe('Create failed')
    })
  })

  describe('updatePost async thunk', () => {
    beforeEach(() => {
      store = createTestStore({ posts: mockPosts })
    })

    it('should handle pending state', () => {
      const action = { type: updatePost.pending.type }
      const state = postReducer(undefined, action)

      expect(state.operationLoading).toBe(true)
      expect(state.error).toBeNull()
    })

    it('should handle fulfilled state', async () => {
      const updatedPost = {
        id: 1,
        userId: 1,
        title: 'Updated Title',
        body: 'Body 1',
      }
      vi.mocked(postApi.update).mockResolvedValue(mockAxiosResponse(updatedPost))

      await store.dispatch(
        updatePost({ id: 1, post: { title: 'Updated Title' } })
      )

      const state = store.getState().post
      expect(state.operationLoading).toBe(false)
      expect(state.posts.find((p) => p.id === 1)?.title).toBe('Updated Title')
    })

    it('should handle rejected state', async () => {
      vi.mocked(postApi.update).mockRejectedValue(new Error('Update failed'))

      await store.dispatch(updatePost({ id: 1, post: { title: 'Updated' } }))

      const state = store.getState().post
      expect(state.operationLoading).toBe(false)
      expect(state.error).toBe('Update failed')
    })
  })

  describe('deletePost async thunk', () => {
    beforeEach(() => {
      store = createTestStore({ posts: mockPosts })
    })

    it('should handle pending state', () => {
      const action = { type: deletePost.pending.type }
      const state = postReducer(undefined, action)

      expect(state.operationLoading).toBe(true)
      expect(state.error).toBeNull()
    })

    it('should handle fulfilled state', async () => {
      vi.mocked(postApi.delete).mockResolvedValue(mockAxiosResponse(null))

      await store.dispatch(deletePost(1))

      const state = store.getState().post
      expect(state.operationLoading).toBe(false)
      expect(state.posts.find((p) => p.id === 1)).toBeUndefined()
      expect(state.posts).toHaveLength(1)
    })

    it('should handle rejected state', async () => {
      vi.mocked(postApi.delete).mockRejectedValue(new Error('Delete failed'))

      await store.dispatch(deletePost(1))

      const state = store.getState().post
      expect(state.operationLoading).toBe(false)
      expect(state.error).toBe('Delete failed')
    })
  })

  describe('error recovery', () => {
    it('should clear error and retry fetch successfully', async () => {
      // First, simulate a failed fetch
      vi.mocked(postApi.getAll).mockRejectedValueOnce(
        new Error('Network Error')
      )
      await store.dispatch(fetchPosts())
      expect(store.getState().post.error).toBe('Network Error')

      // Clear the error
      store.dispatch(clearPostError())
      expect(store.getState().post.error).toBeNull()

      // Retry successfully
      vi.mocked(postApi.getAll).mockResolvedValueOnce(mockAxiosResponse(mockPosts))
      await store.dispatch(fetchPosts())

      const state = store.getState().post
      expect(state.error).toBeNull()
      expect(state.posts).toEqual(mockPosts)
    })
  })
})
