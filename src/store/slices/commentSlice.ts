import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Comment } from '../../@types/comment'
import { commentApi } from '../../api/commentApi'

interface CommentState {
  comments: Comment[]
  loading: boolean
  error: string | null
  searchQuery: string
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  searchQuery: '',
}

export const fetchComments = createAsyncThunk('comment/fetchComments', async () => {
  const response = await commentApi.getAll()
  return response.data
})

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearCommentError: (state) => {
      state.error = null
    },
    setCommentSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch comments'
      })
  },
})

export const { clearCommentError, setCommentSearchQuery } = commentSlice.actions
export default commentSlice.reducer
