import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from '../../@types/user'
import { userApi } from '../../api/userApi'

interface UserState {
  users: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
  searchQuery: string
  currentPage: number
  itemsPerPage: number
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 10,
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await userApi.getAll()
  return response.data
})

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id: number) => {
  const response = await userApi.getById(id)
  return response.data
})

export const createUser = createAsyncThunk(
  'user/createUser',
  async (user: Omit<User, 'id'>) => {
    const response = await userApi.create(user)
    return response.data
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, user }: { id: number; user: Partial<User> }) => {
    const response = await userApi.update(id, user)
    return response.data
  }
)

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: number) => {
  await userApi.delete(id)
  return id
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null
    },
    clearError: (state) => {
      state.error = null
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedUser = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch user'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload)
      })
  },
})

export const { clearSelectedUser, clearError, setSearchQuery, setCurrentPage, setItemsPerPage } = userSlice.actions
export default userSlice.reducer
