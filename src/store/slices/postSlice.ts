import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Post } from '../../@types/post'
import { postApi } from '../../api/postApi'

interface LocalPost extends Post {
  isLocal?: boolean
}

interface PostState {
  posts: LocalPost[]
  selectedPost: LocalPost | null
  loading: boolean
  operationLoading: boolean
  error: string | null
  searchQuery: string
  nextLocalId: number
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  operationLoading: false,
  error: null,
  searchQuery: '',
  nextLocalId: 1000,
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const response = await postApi.getAll()
  return response.data
})

export const fetchPostById = createAsyncThunk('post/fetchPostById', async (id: number) => {
  const response = await postApi.getById(id)
  return response.data
})

export const createPost = createAsyncThunk(
  'post/createPost',
  async (post: Omit<Post, 'id'>) => {
    const response = await postApi.create(post)
    return response.data
  }
)

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ id, post, isLocal }: { id: number; post: Partial<Post>; isLocal?: boolean }) => {
    if (isLocal) {
      // For locally created posts, just return the updated data without API call
      return { id, ...post } as Post
    }
    const response = await postApi.update(id, post)
    return response.data
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ id, isLocal }: { id: number; isLocal?: boolean }) => {
    if (!isLocal) {
      await postApi.delete(id)
    }
    return id
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null
    },
    clearPostError: (state) => {
      state.error = null
    },
    setPostSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch posts'
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedPost = action.payload
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch post'
      })
      .addCase(createPost.pending, (state) => {
        state.operationLoading = true
        state.error = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.operationLoading = false
        // Mark as local and assign a unique local ID to avoid conflicts
        const localPost: LocalPost = {
          ...action.payload,
          id: state.nextLocalId,
          isLocal: true,
        }
        state.nextLocalId += 1
        state.posts.unshift(localPost)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.operationLoading = false
        state.error = action.error.message || 'Failed to create post'
      })
      .addCase(updatePost.pending, (state) => {
        state.operationLoading = true
        state.error = null
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.operationLoading = false
        const index = state.posts.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          // Preserve the isLocal flag when updating
          state.posts[index] = {
            ...action.payload,
            isLocal: state.posts[index].isLocal,
          }
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.operationLoading = false
        state.error = action.error.message || 'Failed to update post'
      })
      .addCase(deletePost.pending, (state) => {
        state.operationLoading = true
        state.error = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.operationLoading = false
        state.posts = state.posts.filter((p) => p.id !== action.payload)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.operationLoading = false
        state.error = action.error.message || 'Failed to delete post'
      })
  },
})

export const { clearSelectedPost, clearPostError, setPostSearchQuery } = postSlice.actions
export default postSlice.reducer
